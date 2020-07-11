import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
  color?: string;
  textColor?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  title,
  className,
  color = '#ff9000',
  textColor = '#312e38',
}) => {
  return (
    <Container
      className={className}
      color={color}
      textColor={textColor}
      tabIndex={0}
    >
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
