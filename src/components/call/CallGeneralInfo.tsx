import DateFnsUtils from '@date-io/date-fns';
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Field, useFormikContext } from 'formik';
import { TextField } from 'formik-material-ui';
import { KeyboardDatePicker } from 'formik-material-ui-pickers';
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';

import FormikDropdown, { Option } from 'components/common/FormikDropdown';
import { FeatureContext } from 'context/FeatureContextProvider';
import {
  AllocationTimeUnits,
  CreateCallMutationVariables,
  FeatureId,
  GetTemplatesQuery,
  ProposalWorkflow,
  UpdateCallMutationVariables,
} from 'generated/sdk';
import { ExcludeNull } from 'utils/utilTypes';

const CallGeneralInfo: React.FC<{
  templates: ExcludeNull<GetTemplatesQuery['templates']>;
  esiTemplates: ExcludeNull<GetTemplatesQuery['templates']>;
  loadingTemplates: boolean;
  proposalWorkflows: ProposalWorkflow[];
  loadingProposalWorkflows: boolean;
}> = ({
  loadingProposalWorkflows,
  proposalWorkflows,
  templates,
  esiTemplates,
  loadingTemplates,
}) => {
  const { features } = useContext(FeatureContext);

  const proposalWorkflowOptions = proposalWorkflows.map((proposalWorkflow) => ({
    text: proposalWorkflow.name,
    value: proposalWorkflow.id,
  }));

  const allocationTimeUnitOptions = Object.values(AllocationTimeUnits).map(
    (key) => ({
      text: key,
      value: key,
    })
  );

  const formik = useFormikContext<
    CreateCallMutationVariables | UpdateCallMutationVariables
  >();
  const { startCall, endCall } = formik.values;

  useEffect(() => {
    if (endCall && endCall < startCall) {
      formik.setFieldValue('endCall', startCall);
      /** NOTE: Set field untouched because if we try to update the endCall before startCall and then
       *  set startCall after endCall it can show error message even though we update the endCall automatically.
       */
      formik.setFieldTouched('endCall', false);
    }
  }, [startCall, endCall, formik]);

  function validateRefNumFormat(input: string) {
    let errorMessage;
    const regExp = /^[a-z|\d]+{digits:[1-9]+}$/;
    const prefixRegex = /[a-z|\d]+{/;
    const parameterRegex = /{digits:[1-9]+}/;

    if (input && !input.match(regExp)) {
      if (!input.match(prefixRegex)) {
        errorMessage = 'Invalid prefix.';
      } else if (!input.match(parameterRegex)) {
        errorMessage = 'Invalid parameter.';
      } else {
        errorMessage = 'Invalid format.';
      }
    }

    return errorMessage;
  }

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    })
  )(TableCell);

  const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    })
  )(TableRow);

  function populateTable(format: string, refNumber: string) {
    return { format, refNumber };
  }

  const rows = [
    populateTable('abc{digits:3}', 'abc001, abc002, abc003'),
    populateTable('211{digits:5}', '21100001, 21100002, 21100003'),
  ];

  return (
    <>
      <Field
        name="shortCode"
        label="Short Code"
        id="short-code-input"
        type="text"
        component={TextField}
        margin="normal"
        inputProps={{ maxLength: '20' }}
        fullWidth
        required
        data-cy="short-code"
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Field
          name="startCall"
          label="Start"
          id="start-call-input"
          format="yyyy-MM-dd"
          component={KeyboardDatePicker}
          margin="normal"
          fullWidth
          required
          data-cy="start-date"
        />

        <Field
          name="endCall"
          label="End"
          id="end-call-input"
          format="yyyy-MM-dd"
          component={KeyboardDatePicker}
          margin="normal"
          fullWidth
          minDate={startCall}
          required
          data-cy="end-date"
        />
        <Field
          name="referenceNumberFormat"
          validate={validateRefNumFormat}
          label="Reference number format"
          id="reference-number-format-input"
          type="text"
          component={TextField}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickOpen}>
                  <HelpIcon />
                </IconButton>
                <Dialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                  color="primary"
                >
                  <DialogContent dividers>
                    <Typography gutterBottom color="inherit" variant="body1">
                      A reference number format determines how reference numbers
                      are generated. It consists of a <strong>prefix </strong>
                      and <strong> digits parameter</strong>.<br></br>
                      <br></br>
                      The<strong> prefix</strong> can contain alphanumeric
                      characters and is what all generated reference numbers
                      will begin with. For example, <code>21a</code>.<br></br>
                      <br></br>
                      The <strong> digits parameter</strong> is a numerical
                      value that determines how many digits a proposal&apos;s
                      sequence number is, including padding.It is written as
                      <code>{'{digits:x}'}</code>, where x is a the value of the
                      number. For example, if parameter is 6 (
                      <code>{'{digits:6}'}</code>), the first proposal will be
                      numbered 000001, the second 000002, and so on.
                      <h3>Valid examples</h3>
                      <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                          <TableHead>
                            <StyledTableRow>
                              <StyledTableCell>
                                <strong>Format</strong>
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                <strong>Generated reference numbers</strong>
                              </StyledTableCell>
                            </StyledTableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <StyledTableRow key={row.format}>
                                <StyledTableCell component="th" scope="row">
                                  {row.format}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  {row.refNumber}
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </InputAdornment>
            ),
          }}
          margin="normal"
          fullWidth
          data-cy="reference-number-format"
        />
      </MuiPickersUtilsProvider>
      <FormikDropdown
        name="templateId"
        label="Call template"
        loading={loadingTemplates}
        noOptionsText="No templates"
        items={templates.map((template) => ({
          text: template.name,
          value: template.templateId,
        }))}
        InputProps={{ 'data-cy': 'call-template' }}
        required
      />
      {features.get(FeatureId.RISK_ASSESSMENT)?.isEnabled && (
        <FormikDropdown
          name="esiTemplateId"
          label="ESI template"
          loading={loadingTemplates}
          noOptionsText="No templates"
          items={esiTemplates.map((template) => ({
            text: template.name,
            value: template.templateId,
          }))}
          InputProps={{ 'data-cy': 'call-esi-template' }}
          required
        />
      )}

      <FormikDropdown
        name="proposalWorkflowId"
        label="Proposal workflow"
        loading={loadingProposalWorkflows}
        noOptionsText="No proposal workflows"
        items={proposalWorkflows.length > 0 ? proposalWorkflowOptions : []}
        InputProps={{
          'data-cy': 'call-workflow',
        }}
        required
      />

      <FormikDropdown
        name="allocationTimeUnit"
        label="Allocation time unit"
        items={allocationTimeUnitOptions as Option[]}
        InputProps={{ 'data-cy': 'allocation-time-unit' }}
      />
      <Field
        name="title"
        label="Title (public)"
        id="title-input"
        type="text"
        component={TextField}
        margin="normal"
        fullWidth
        inputProps={{ maxLength: '100' }}
        data-cy="title"
      />
      <Field
        name="description"
        label="Description (public)"
        id="description-input"
        type="text"
        component={TextField}
        margin="normal"
        multiline
        fullWidth
        data-cy="description"
      />
    </>
  );
};

CallGeneralInfo.propTypes = {
  loadingProposalWorkflows: PropTypes.bool.isRequired,
  proposalWorkflows: PropTypes.array.isRequired,
  loadingTemplates: PropTypes.bool.isRequired,
  templates: PropTypes.array.isRequired,
};

export default CallGeneralInfo;
export interface DialogTitleProps extends WithStyles {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}
