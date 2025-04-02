import React from 'react';
import styled from 'styled-components';

interface CardProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

const StyledCard = styled.div<CardProps>`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.elevation.shadow200};
  cursor: ${props => props.onClick ? 'pointer' : 'default'};
`;

export const Card: React.FC<CardProps> = ({ children, onClick }) => {
  return (
    <StyledCard onClick={onClick}>
      {children}
    </StyledCard>
  );
}; 