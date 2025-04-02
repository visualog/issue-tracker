import React from 'react';
import styled from 'styled-components';
import { useIssueStore } from '../store/issueStore';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const Label = styled.label`
  font-size: ${props => props.theme.typography.body2.medium};
  color: ${props => props.theme.colors.dark};
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body1.regular};
  font-family: ${props => props.theme.typography.fontFamily};
  background-color: ${props => props.theme.colors.white};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.elevation.shadow100};
  }
`;

const SortButton = styled.button<{ active: boolean }>`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.white};
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.dark};
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body2.medium};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.primary}22;
  }
`;

export type SortField = 'createdAt' | 'updatedAt' | 'priority' | 'severity' | 'status';
export type SortOrder = 'asc' | 'desc';

export const SortOptions = () => {
  const { sortField, sortOrder, setSortField, setSortOrder } = useIssueStore();

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value as SortField);
  };

  return (
    <Container>
      <Label>정렬:</Label>
      <Select value={sortField} onChange={handleFieldChange}>
        <option value="createdAt">생성일</option>
        <option value="updatedAt">수정일</option>
        <option value="priority">우선순위</option>
        <option value="severity">심각도</option>
        <option value="status">상태</option>
      </Select>
      <SortButton
        active={sortOrder === 'asc'}
        onClick={() => setSortOrder('asc')}
      >
        오름차순
      </SortButton>
      <SortButton
        active={sortOrder === 'desc'}
        onClick={() => setSortOrder('desc')}
      >
        내림차순
      </SortButton>
    </Container>
  );
}; 