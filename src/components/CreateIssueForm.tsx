import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useIssueStore } from '../store/issueStore';
import { IssueFormData, IssueType, IssuePriority, IssueSeverity, IssueStatus } from '../types/issue';

const Container = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.heading.h1};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.dark};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.elevation.shadow200};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const Label = styled.label`
  font-size: ${props => props.theme.typography.body2.medium};
  font-weight: 500;
  color: ${props => props.theme.colors.dark};
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

const TextArea = styled.textarea`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body1.regular};
  font-family: ${props => props.theme.typography.fontFamily};
  min-height: 150px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.elevation.shadow100};
  }
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

const Button = styled.button`
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

const initialFormData: IssueFormData = {
  title: '',
  description: '',
  type: 'TASK',
  priority: 'MEDIUM',
  severity: 'MINOR',
  status: 'OPEN',
  reporter: 'current-user', // TODO: Replace with actual user
  labels: [],
};

export const CreateIssueForm = () => {
  const navigate = useNavigate();
  const createIssue = useIssueStore((state: { createIssue: (data: IssueFormData) => void }) => state.createIssue);
  const [formData, setFormData] = useState<IssueFormData>(initialFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createIssue(formData);
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Container>
      <Title>Create New Issue</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter issue title"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter issue description"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="type">Type</Label>
          <Select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="BUG">Bug</option>
            <option value="FEATURE">Feature</option>
            <option value="IMPROVEMENT">Improvement</option>
            <option value="TASK">Task</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="priority">Priority</Label>
          <Select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="severity">Severity</Label>
          <Select
            id="severity"
            name="severity"
            value={formData.severity}
            onChange={handleChange}
          >
            <option value="MINOR">Minor</option>
            <option value="MAJOR">Major</option>
            <option value="CRITICAL">Critical</option>
            <option value="BLOCKER">Blocker</option>
          </Select>
        </FormGroup>

        <Button type="submit">Create Issue</Button>
      </Form>
    </Container>
  );
}; 