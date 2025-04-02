import { create } from 'zustand';
import { Issue, IssueFormData, IssueFilter } from '../types/issue';

interface IssueStore {
  issues: Issue[];
  selectedIssues: string[];
  filter: IssueFilter;
  
  // Actions
  createIssue: (data: IssueFormData) => void;
  updateIssue: (id: string, data: IssueFormData) => void;
  deleteIssue: (id: string) => void;
  selectIssue: (id: string) => void;
  deselectIssue: (id: string) => void;
  setFilter: (filter: IssueFilter) => void;
  
  // Filtered issues
  filteredIssues: Issue[];
}

type SetState = (
  partial: IssueStore | Partial<IssueStore> | ((state: IssueStore) => IssueStore | Partial<IssueStore>),
  replace?: boolean
) => void;

type GetState = () => IssueStore;

export const useIssueStore = create<IssueStore>((set: SetState, get: GetState) => ({
  issues: [],
  selectedIssues: [],
  filter: {},
  
  createIssue: (data: IssueFormData) => {
    const newIssue: Issue = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set((state: IssueStore) => ({
      issues: [...state.issues, newIssue],
    }));
  },
  
  updateIssue: (id: string, data: IssueFormData) => {
    set((state: IssueStore) => ({
      issues: state.issues.map((issue: Issue) =>
        issue.id === id
          ? { ...issue, ...data, updatedAt: new Date() }
          : issue
      ),
    }));
  },
  
  deleteIssue: (id: string) => {
    set((state: IssueStore) => ({
      issues: state.issues.filter((issue: Issue) => issue.id !== id),
      selectedIssues: state.selectedIssues.filter((issueId) => issueId !== id),
    }));
  },
  
  selectIssue: (id: string) => {
    set((state: IssueStore) => ({
      selectedIssues: [...state.selectedIssues, id],
    }));
  },
  
  deselectIssue: (id: string) => {
    set((state: IssueStore) => ({
      selectedIssues: state.selectedIssues.filter((issueId) => issueId !== id),
    }));
  },
  
  setFilter: (filter: IssueFilter) => {
    set({ filter });
  },
  
  get filteredIssues() {
    const { issues, filter } = get();
    return issues.filter((issue) => {
      if (filter.status && issue.status !== filter.status) return false;
      if (filter.priority && issue.priority !== filter.priority) return false;
      if (filter.severity && issue.severity !== filter.severity) return false;
      if (filter.type && issue.type !== filter.type) return false;
      if (filter.assignee && issue.assignee !== filter.assignee) return false;
      if (filter.reporter && issue.reporter !== filter.reporter) return false;
      if (filter.dateRange) {
        const issueDate = new Date(issue.createdAt);
        if (filter.dateRange.start && issueDate < filter.dateRange.start) return false;
        if (filter.dateRange.end && issueDate > filter.dateRange.end) return false;
      }
      return true;
    });
  },
})); 