import React from 'react';
import styled from 'styled-components';

interface BadgeProps {
  backgroundColor: string;
  color: string;
  children: React.ReactNode;
}

const StyledBadge = styled.span<{ backgroundColor: string; color: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
`;

export const Badge: React.FC<BadgeProps> = ({ backgroundColor, color, children }) => {
  return (
    <StyledBadge backgroundColor={backgroundColor} color={color}>
      {children}
    </StyledBadge>
  );
}; 