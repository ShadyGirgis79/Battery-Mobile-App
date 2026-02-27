import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

interface ToRightArrowIconProps extends SvgProps {
  width?: number | string;
  height?: number | string;
}

const ToRightArrowIcon = ({ width = 24, height = 24, ...props }: ToRightArrowIconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008"
      stroke="white"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ToRightArrowIcon;