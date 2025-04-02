import React from 'react';
import styled from 'styled-components';

interface CardProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

const StyledCard = styled.div<{ onClick?: (e: React.MouseEvent) => void }>`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.elevation.shadow200};
  cursor: ${props => props.onClick ? 'pointer' : 'default'};
  transition: all 0.2s;

  &:hover {
    transform: ${props => props.onClick ? 'translateY(-2px)' : 'none'};
    box-shadow: ${props => props.onClick ? props.theme.elevation.shadow300 : props.theme.elevation.shadow200};
  }
`;

export const Card: React.FC<CardProps> = ({ children, onClick }) => {
  return (
    <StyledCard onClick={onClick}>
      {children}
    </StyledCard>
  );
}; 