import React from 'react';
import styled from 'styled-components';
import { useIssueStore } from '../store/issueStore';

const Container = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  min-width: 120px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const IssueFilter = () => {
  const { filters, setFilters } = useIssueStore();

  const handleFilterChange = (filterType: string, values: string[]) => {
    setFilters({ [filterType]: values });
  };

  return (
    <Container>
      <Label>
        상태
        <Select
          multiple
          value={filters.status}
          onChange={(e) => handleFilterChange('status', Array.from(e.target.selectedOptions, option => option.value))}
        >
          <option value="OPEN">열림</option>
          <option value="IN_PROGRESS">진행 중</option>
          <option value="RESOLVED">해결됨</option>
          <option value="CLOSED">닫힘</option>
        </Select>
      </Label>

      <Label>
        우선순위
        <Select
          multiple
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', Array.from(e.target.selectedOptions, option => option.value))}
        >
          <option value="HIGH">높음</option>
          <option value="MEDIUM">중간</option>
          <option value="LOW">낮음</option>
        </Select>
      </Label>

      <Label>
        심각도
        <Select
          multiple
          value={filters.severity}
          onChange={(e) => handleFilterChange('severity', Array.from(e.target.selectedOptions, option => option.value))}
        >
          <option value="CRITICAL">심각</option>
          <option value="MAJOR">주요</option>
          <option value="MINOR">경미</option>
          <option value="TRIVIAL">사소</option>
        </Select>
      </Label>

      <Label>
        유형
        <Select
          multiple
          value={filters.type}
          onChange={(e) => handleFilterChange('type', Array.from(e.target.selectedOptions, option => option.value))}
        >
          <option value="BUG">버그</option>
          <option value="FEATURE">기능</option>
          <option value="UI">UI</option>
          <option value="SECURITY">보안</option>
          <option value="PERFORMANCE">성능</option>
          <option value="DOCUMENTATION">문서</option>
        </Select>
      </Label>
    </Container>
  );
}; 