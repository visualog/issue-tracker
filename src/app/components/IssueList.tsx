'use client'

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useIssueStore } from '../store/issueStore';
import { Issue } from '../types/issue';
import { Badge } from './common/Badge';
import { Card } from './common/Card';
import { IssueFilter } from './IssueFilter';
import { SearchBar } from './SearchBar';
import { SortOptions } from './SortOptions';

const Container = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.heading.h1};
  color: ${props => props.theme.colors.dark};
`;

const CreateButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body1.medium};
  font-family: ${props => props.theme.typography.fontFamily};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.primary}dd;
    box-shadow: ${props => props.theme.elevation.shadow200};
  }
`;

const SearchContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'HIGH':
      return '#FF4D4F';
    case 'MEDIUM':
      return '#FAAD14';
    case 'LOW':
      return '#52C41A';
    default:
      return '#8C8C8C';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'CRITICAL':
      return '#FF4D4F';
    case 'MAJOR':
      return '#FAAD14';
    case 'MINOR':
      return '#52C41A';
    default:
      return '#8C8C8C';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'OPEN':
      return '#1890FF';
    case 'IN_PROGRESS':
      return '#FAAD14';
    case 'RESOLVED':
      return '#52C41A';
    case 'CLOSED':
      return '#8C8C8C';
    default:
      return '#8C8C8C';
  }
};

export const IssueList = () => {
  const { filteredIssues } = useIssueStore();

  return (
    <Container>
      <Header>
        <Title>이슈 목록</Title>
        <Link href="/create">
          <CreateButton>새 이슈</CreateButton>
        </Link>
      </Header>

      <SearchContainer>
        <SearchBar />
      </SearchContainer>

      <ControlsContainer>
        <IssueFilter />
        <SortOptions />
      </ControlsContainer>

      <Grid>
        {filteredIssues.map((issue: Issue) => (
          <Card key={issue.id}>
            <h3>{issue.title}</h3>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <Badge backgroundColor={getPriorityColor(issue.priority)} color="#FFFFFF">
                {issue.priority}
              </Badge>
              <Badge backgroundColor={getSeverityColor(issue.severity)} color="#FFFFFF">
                {issue.severity}
              </Badge>
              <Badge backgroundColor={getStatusColor(issue.status)} color="#FFFFFF">
                {issue.status}
              </Badge>
            </div>
            <p style={{ marginBottom: '8px' }}>{issue.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>담당자: {issue.assignee || '미지정'}</span>
              <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}; 