import { getTranslation, ResourceId } from '@esss-swap/duo-localisation';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Edit from '@material-ui/icons/Edit';
import GetAppIcon from '@material-ui/icons/GetApp';
import Visibility from '@material-ui/icons/Visibility';
import MaterialTable, { Column } from 'material-table';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

import { DefaultQueryParams } from 'components/common/SuperMaterialTable';
import { UserContext } from 'context/UserContextProvider';
import { Proposal, ProposalsFilter } from 'generated/sdk';
import { useInstrumentScientistCallsData } from 'hooks/call/useInstrumentScientistCallsData';
import { useLocalStorage } from 'hooks/common/useLocalStorage';
import { useInstrumentsData } from 'hooks/instrument/useInstrumentsData';
import { useDownloadPDFProposal } from 'hooks/proposal/useDownloadPDFProposal';
import { useProposalsData } from 'hooks/proposal/useProposalsData';
import { useProposalStatusesData } from 'hooks/settings/useProposalStatusesData';
import { setSortDirectionOnSortColumn } from 'utils/helperFunctions';
import { tableIcons } from 'utils/materialIcons';
import {
  absoluteDifference,
  average,
  getGrades,
  standardDeviation,
} from 'utils/mathFunctions';

import ProposalFilterBar from './ProposalFilterBar';
import { ProposalUrlQueryParamsType } from './ProposalPage';

const ProposalTableInstrumentScientist: React.FC = () => {
  const { user } = useContext(UserContext);
  const [urlQueryParams, setUrlQueryParams] = useQueryParams<
    ProposalUrlQueryParamsType
  >({
    call: NumberParam,
    instrument: NumberParam,
    proposalStatus: NumberParam,
    questionId: StringParam,
    compareOperator: StringParam,
    value: StringParam,
    dataType: StringParam,
    ...DefaultQueryParams,
  });

  // NOTE: proposalStatusId has default value 2 because for Instrument Scientist default view should be all proposals in FEASIBILITY_REVIEW status
  const [proposalFilter, setProposalFilter] = React.useState<ProposalsFilter>({
    callId: urlQueryParams.call,
    instrumentId: urlQueryParams.instrument,
    proposalStatusId: urlQueryParams.proposalStatus || 2,
  });
  const { instruments, loadingInstruments } = useInstrumentsData();
  const { calls, loadingCalls } = useInstrumentScientistCallsData(user.id);
  const {
    proposalStatuses,
    loadingProposalStatuses,
  } = useProposalStatusesData();

  const { loading, proposalsData } = useProposalsData({
    proposalStatusId: proposalFilter.proposalStatusId,
    instrumentId: proposalFilter.instrumentId,
    callId: proposalFilter.callId,
  });

  const downloadPDFProposal = useDownloadPDFProposal();
  const [localStorageValue, setLocalStorageValue] = useLocalStorage<
    Column<Proposal>[] | null
  >('proposalColumnsInstrumentScientist', null);

  /**
   * NOTE: Custom action buttons are here because when we have them inside actions on the material-table
   * and selection flag is true they are not working properly.
   */
  const RowActionButtons = (rowData: Proposal) => {
    const iconButtonStyle = { padding: '7px' };

    const showEdit = rowData.technicalReview && rowData.technicalReview.status;

    return (
      <>
        <Tooltip
          title={
            showEdit
              ? 'Edit technical review'
              : 'View proposal and technical review'
          }
        >
          <Link
            to={`/ProposalReviewUserOfficer/${rowData.id}`}
            style={{ color: 'inherit', textDecoration: 'inherit' }}
          >
            <IconButton data-cy="view-proposal" style={iconButtonStyle}>
              {showEdit ? <Edit /> : <Visibility />}
            </IconButton>
          </Link>
        </Tooltip>

        <Tooltip title="Download proposal as pdf">
          <IconButton
            data-cy="download-proposal"
            onClick={() => downloadPDFProposal([rowData.id], rowData.title)}
            style={iconButtonStyle}
          >
            <GetAppIcon />
          </IconButton>
        </Tooltip>
      </>
    );
  };

  let columns: Column<Proposal>[] = [
    {
      title: 'Actions',
      cellStyle: { padding: 0, minWidth: 120 },
      sorting: false,
      removable: false,
      render: RowActionButtons,
    },
    { title: 'Proposal ID', field: 'shortCode' },
    {
      title: 'Title',
      field: 'title',
      ...{ width: 'auto' },
    },
    {
      title: 'Time(Days)',
      field: 'technicalReview.timeAllocation',
      hidden: false,
    },
    {
      title: 'Technical status',
      render: rowData =>
        rowData.technicalReview
          ? getTranslation(rowData.technicalReview.status as ResourceId)
          : '',
    },
    {
      title: 'Submitted',
      render: rowData => (rowData.submitted ? 'Yes' : 'No'),
    },
    { title: 'Status', field: 'status.name' },
    {
      title: 'Deviation',
      field: 'deviation',
      hidden: true,
      render: (rowData: Proposal): number =>
        standardDeviation(getGrades(rowData.reviews)),
      customSort: (a: Proposal, b: Proposal) =>
        (standardDeviation(getGrades(a.reviews)) || 0) -
        (standardDeviation(getGrades(b.reviews)) || 0),
    },
    {
      title: 'Absolute Difference',
      field: 'absolute',
      hidden: true,
      render: (rowData: Proposal): number =>
        absoluteDifference(getGrades(rowData.reviews)),
      customSort: (a: Proposal, b: Proposal) =>
        (absoluteDifference(getGrades(a.reviews)) || 0) -
        (absoluteDifference(getGrades(b.reviews)) || 0),
    },
    {
      title: 'Average Score',
      field: 'average',
      hidden: true,
      render: (rowData: Proposal): number =>
        average(getGrades(rowData.reviews)),
      customSort: (a: Proposal, b: Proposal) =>
        (average(getGrades(a.reviews)) || 0) -
        (average(getGrades(b.reviews)) || 0),
    },
    {
      title: 'Final Status',
      field: 'finalStatus',
      render: (rowData: Proposal): string =>
        rowData.finalStatus
          ? getTranslation(rowData.finalStatus as ResourceId)
          : '',
    },
    {
      title: 'Instrument',
      render: (rowData: Proposal): string =>
        rowData.instrument ? rowData.instrument.name : '-',
    },
    {
      title: 'Call',
      render: (rowData: Proposal): string =>
        rowData.call ? rowData.call.shortCode : '-',
      hidden: true,
    },
    {
      title: 'SEP',
      render: (rowData: Proposal): string =>
        rowData.sep ? rowData.sep.code : '-',
      hidden: true,
    },
  ];

  // NOTE: We are remapping only the hidden field because functions like `render` can not be stringified.
  if (localStorageValue) {
    columns = columns.map(column => ({
      ...column,
      hidden: localStorageValue.find(
        localStorageValueItem => localStorageValueItem.title === column.title
      )?.hidden,
    }));
  }

  columns = setSortDirectionOnSortColumn(
    columns,
    urlQueryParams.sortColumn,
    urlQueryParams.sortDirection
  );

  const GetAppIconComponent = (): JSX.Element => <GetAppIcon />;

  return (
    <>
      <ProposalFilterBar
        calls={{ data: calls, isLoading: loadingCalls }}
        instruments={{ data: instruments, isLoading: loadingInstruments }}
        proposalStatuses={{
          data: proposalStatuses,
          isLoading: loadingProposalStatuses,
        }}
        setProposalFilter={setProposalFilter}
        filter={proposalFilter}
      />
      <MaterialTable
        icons={tableIcons}
        title={'Proposals'}
        columns={columns}
        data={proposalsData}
        isLoading={loading}
        options={{
          search: true,
          searchText: urlQueryParams.search || undefined,
          selection: true,
          debounceInterval: 400,
          columnsButton: true,
        }}
        onSearchChange={searchText => {
          setUrlQueryParams({ search: searchText ? searchText : undefined });
        }}
        onChangeColumnHidden={columnChange => {
          const proposalColumns = columns.map(
            (proposalColumn: Column<Proposal>) => ({
              hidden:
                proposalColumn.title === columnChange.title
                  ? columnChange.hidden
                  : proposalColumn.hidden,
              title: proposalColumn.title,
            })
          );

          setLocalStorageValue(proposalColumns);
        }}
        onOrderChange={(orderedColumnId, orderDirection) => {
          setUrlQueryParams &&
            setUrlQueryParams({
              sortColumn: orderedColumnId >= 0 ? orderedColumnId : undefined,
              sortDirection: orderDirection ? orderDirection : undefined,
            });
        }}
        actions={[
          {
            icon: GetAppIconComponent,
            tooltip: 'Download proposals in PDF',
            onClick: (event, rowData): void => {
              downloadPDFProposal(
                (rowData as Proposal[]).map(row => row.id),
                (rowData as Proposal[])[0].title
              );
            },
            position: 'toolbarOnSelect',
          },
        ]}
      />
    </>
  );
};

export default ProposalTableInstrumentScientist;
