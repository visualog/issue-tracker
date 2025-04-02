import React from 'react';
import styled from 'styled-components';
import { useIssueStore } from '../store/issueStore';
import { IssueFilter as IssueFilterType } from '../types/issue';

const Container = styled.div`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.elevation.shadow200};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Title = styled.h2`
  font-size: ${props => props.theme.typography.heading.h2};
  color: ${props => props.theme.colors.dark};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
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

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.elevation.shadow100};
  }
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body1.regular};
  font-family: ${props => props.theme.typography.fontFamily};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.elevation.shadow100};
  }
`;

const DateRange = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

export const IssueFilter = () => {
  const { filter, setFilter } = useIssueStore();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      dateRange: {
        ...filter.dateRange,
        [name]: value ? new Date(value) : undefined,
      },
    });
  };

  return (
    <Container>
      <Title>필터</Title>
      <FilterGrid>
        <FilterGroup>
          <Label htmlFor="status">상태</Label>
          <Select
            id="status"
            name="status"
            value={filter.status || ''}
            onChange={handleChange}
          >
            <option value="">전체</option>
            <option value="OPEN">열림</option>
            <option value="IN_PROGRESS">진행 중</option>
            <option value="RESOLVED">해결됨</option>
            <option value="CLOSED">닫힘</option>
          </Select>
        </FilterGroup>

        <FilterGroup>
          <Label htmlFor="priority">우선순위</Label>
          <Select
            id="priority"
            name="priority"
            value={filter.priority || ''}
            onChange={handleChange}
          >
            <option value="">전체</option>
            <option value="LOW">낮음</option>
            <option value="MEDIUM">중간</option>
            <option value="HIGH">높음</option>
            <option value="CRITICAL">긴급</option>
          </Select>
        </FilterGroup>

        <FilterGroup>
          <Label htmlFor="severity">심각도</Label>
          <Select
            id="severity"
            name="severity"
            value={filter.severity || ''}
            onChange={handleChange}
          >
            <option value="">전체</option>
            <option value="MINOR">경미</option>
            <option value="MAJOR">주요</option>
            <option value="CRITICAL">심각</option>
            <option value="BLOCKER">차단</option>
          </Select>
        </FilterGroup>

        <FilterGroup>
          <Label htmlFor="type">타입</Label>
          <Select
            id="type"
            name="type"
            value={filter.type || ''}
            onChange={handleChange}
          >
            <option value="">전체</option>
            <option value="BUG">버그</option>
            <option value="FEATURE">기능</option>
            <option value="IMPROVEMENT">개선</option>
            <option value="TASK">작업</option>
          </Select>
        </FilterGroup>

        <FilterGroup>
          <Label htmlFor="assignee">담당자</Label>
          <Input
            id="assignee"
            name="assignee"
            type="text"
            value={filter.assignee || ''}
            onChange={handleChange}
            placeholder="담당자 이름"
          />
        </FilterGroup>

        <FilterGroup>
          <Label htmlFor="reporter">보고자</Label>
          <Input
            id="reporter"
            name="reporter"
            type="text"
            value={filter.reporter || ''}
            onChange={handleChange}
            placeholder="보고자 이름"
          />
        </FilterGroup>

        <FilterGroup>
          <Label>기간</Label>
          <DateRange>
            <Input
              type="date"
              name="start"
              value={filter.dateRange?.start ? new Date(filter.dateRange.start).toISOString().split('T')[0] : ''}
              onChange={handleDateChange}
            />
            <Input
              type="date"
              name="end"
              value={filter.dateRange?.end ? new Date(filter.dateRange.end).toISOString().split('T')[0] : ''}
              onChange={handleDateChange}
            />
          </DateRange>
        </FilterGroup>
      </FilterGrid>
    </Container>
  );
}; 