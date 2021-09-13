import { TextFieldProps } from '@material-ui/core';
import React, { KeyboardEvent } from 'react';

interface WithHandleEnterProps {
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => false | undefined;
  onEnter: (value: string) => void;
}
/**
 * Returns modified WrapperComponent which will has onEnter callback
 * @param WrappedComponent
 */
const withHandleEnter = <P extends TextFieldProps>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & WithHandleEnterProps> => {
  return function withHandleEnterComponent({
    onEnter,
    ...props
  }: WithHandleEnterProps) {
    return (
      <WrappedComponent
        {...(props as P)}
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key.toLowerCase() === 'enter') {
            onEnter(event.currentTarget.value);
          }
        }}
      />
    );
  };
};

export default withHandleEnter;
