import React from 'react';
import styled from 'styled-components';
import { useIssueStore } from '../store/issueStore';

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  padding-left: ${props => props.theme.spacing.xl};
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.body1.regular};
  font-family: ${props => props.theme.typography.fontFamily};
  background-color: ${props => props.theme.colors.white};
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.elevation.shadow100};
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: ${props => props.theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.secondary};
  font-size: ${props => props.theme.typography.body1.regular};
`;

export const SearchBar = () => {
  const { setSearchQuery } = useIssueStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Container>
      <SearchIcon>🔍</SearchIcon>
      <SearchInput
        type="text"
        placeholder="이슈 검색..."
        onChange={handleSearch}
      />
    </Container>
  );
}; 