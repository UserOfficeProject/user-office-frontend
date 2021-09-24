import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';

// NOTE: The icon is taken from: https://materialdesignicons.com/
const EsiIcon: React.FC = (props) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
        <path d="M482 391H30c-16.569 0-30 13.431-30 30 0 16.567 13.431 30 30 30h452c16.569 0 30-13.433 30-30 0-16.569-13.431-30-30-30zM391 136.308V196c0 8.291-6.709 15-15 15s-15-6.709-15-15v-78.928c-9.591-5.074-19.651-9.333-30-12.997V226c0 8.291-6.709 15-15 15s-15-6.709-15-15V76c0-8.276-6.724-15-15-15h-60c-8.276 0-15 6.724-15 15v150c0 8.291-6.709 15-15 15s-15-6.709-15-15V104.076c-10.349 3.664-20.409 7.923-30 12.997V196c0 8.291-6.709 15-15 15s-15-6.709-15-15v-59.692C66.44 177.364 31 242.459 31 316v45h450v-45c0-73.541-35.44-138.636-90-179.692z" />
      </svg>
    </SvgIcon>
  );
};

export default EsiIcon;
