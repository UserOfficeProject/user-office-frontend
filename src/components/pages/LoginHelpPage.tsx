import parse from 'html-react-parser';
import React from 'react';

import { PageName } from 'generated/sdk';
import { useGetPageContent } from 'hooks/admin/useGetPageContent';
import { ContentContainer } from 'styles/StyledComponents';

const LoginHelpPage: React.FC = () => {
  const [loadingPage, pageContent] = useGetPageContent(PageName.LOGINHELPPAGE);

  return (
    <ContentContainer>
      {loadingPage ? null : parse(pageContent)}
    </ContentContainer>
  );
};

export default LoginHelpPage;
