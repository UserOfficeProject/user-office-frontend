import React, { KeyboardEvent } from 'react';

interface WithPreventSubmitProps {
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => false | undefined;
  multiline?: boolean;
}

const withPreventSubmit = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & WithPreventSubmitProps> => ({
  onKeyDown,
  multiline,
  ...props
}: WithPreventSubmitProps) => (
  <WrappedComponent
    {...(props as P)}
    multiline={multiline}
    onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
      const response = onKeyDown?.(event);
      if (!multiline && event.key.toLowerCase() === 'enter') {
        event.preventDefault();

        return false;
      }

      return response;
    }}
  />
);

export default withPreventSubmit;
