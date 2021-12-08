import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import PublishIcon from '@material-ui/icons/Publish';
import React, { ChangeEvent } from 'react';

const getFileContents = (file: File) => {
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    console.log(reader.result);
  };
};

export default function ImportTemplatePage() {
  const onFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      console.log(getFileContents(file));
    }
  };

  return (
    <Container>
      <h1>Import Template</h1>
      <label>
        <input
          accept="application/json"
          style={{ display: 'none' }}
          type="file"
          multiple={false}
          onChange={onFileSelected}
        />
        <Button variant="outlined" component="span">
          <PublishIcon /> Attach file
        </Button>
      </label>
    </Container>
  );
}
