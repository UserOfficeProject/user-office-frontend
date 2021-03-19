/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();

const path = require('path');

const { generate, loadContext } = require('@graphql-codegen/cli');

async function generateSdk() {
  const ctx = await loadContext(
    path.join(__dirname, '..', 'codegen_template.yml')
  );

  await generate(ctx);
}

generateSdk().catch((e) => {
  // error text is printed by the codegen tool in most cases
  // print error only if it's something unrelated to codegen
  if (e.name !== 'ListrError') {
    console.error(e);
  }
  process.exit(1);
});
