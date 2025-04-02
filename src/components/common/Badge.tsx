import React from 'react';
import styled from 'styled-components';

interface BadgeProps {
  backgroundColor?: string;
  color?: string;
  children: React.ReactNode;
}

const StyledBadge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background-color: ${props => props.backgroundColor || props.theme.colors.primary};
  color: ${props => props.color || props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.caption.medium};
  font-family: ${props => props.theme.typography.fontFamily};
`;

export const Badge: React.FC<BadgeProps> = ({ backgroundColor, color, children }) => {
  return (
    <StyledBadge backgroundColor={backgroundColor} color={color}>
      {children}
    </StyledBadge>
  );
}; 