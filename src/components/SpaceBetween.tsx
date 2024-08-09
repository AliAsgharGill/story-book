import React from 'react';
import { Space } from 'antd';

export interface SpaceBetweenProps {
  direction: 'horizontal' | 'vertical';
  justify: 'start' | 'center' | 'end' | 'space-between';
  children: React.ReactNode;
}

const SpaceBetween: React.FC<SpaceBetweenProps> = ({ direction, justify, children }) => {
  return (
    <Space
      direction={direction}
      style={{
        display: 'flex',
        justifyContent: justify,
        width: '100%',
      }}
    >
      {children}
    </Space>
  );
};

export default SpaceBetween;
