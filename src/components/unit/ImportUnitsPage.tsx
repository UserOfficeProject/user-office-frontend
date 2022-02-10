import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React from 'react';
import { UnitMergeReview } from 'units/UnitMergeReview';

import { SelectImportFile } from 'components/common/SelectImportFile';
import { UnitsImportWithValidation } from 'generated/sdk';
import { StyledPaper } from 'styles/StyledComponents';
import useDataApiWithFeedback from 'utils/useDataApiWithFeedback';

export const getFileContents = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      resolve(reader.result as string);
    };
  });
};

export default function ImportUnitsPage() {
  const { api } = useDataApiWithFeedback();
  const [validationResult, setValidationResult] =
    React.useState<UnitsImportWithValidation | null>(null);

  return (
    <Container>
      <StyledPaper>
        <Typography variant="h5" component="h5">
          Import units
        </Typography>
        {validationResult ? (
          <UnitMergeReview
            data={validationResult}
            onBack={() => setValidationResult(null)}
          />
        ) : (
          <SelectImportFile
            onFileSelected={(json) => {
              api()
                .validateUnitsImport({ unitsAsJson: json })
                .then(({ validateUnitsImport }) => {
                  const result = validateUnitsImport.validationResult;
                  if (result) {
                    setValidationResult(result);
                  }
                });
            }}
          />
        )}
      </StyledPaper>
    </Container>
  );
}
