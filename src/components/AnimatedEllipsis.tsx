import React, { HTMLProps } from 'react';

function AnimatedEllipsis(props: HTMLProps<HTMLSpanElement>) {
  return <span {...props} className="ellipsisAnimation"></span>;
}

export default AnimatedEllipsis;
