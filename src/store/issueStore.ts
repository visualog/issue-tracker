import { create } from 'zustand';
import { Issue, IssueFormData, IssueFilter, Comment } from '../types/issue';

interface IssueStore {
  issues: Issue[];
  selectedIssues: string[];
  filter: IssueFilter;
  searchQuery: string;
  
  // Actions
  createIssue: (data: IssueFormData) => void;
  updateIssue: (id: string, data: IssueFormData) => void;
  deleteIssue: (id: string) => void;
  selectIssue: (id: string) => void;
  deselectIssue: (id: string) => void;
  setFilter: (filter: IssueFilter) => void;
  setSearchQuery: (query: string) => void;
  
  // Comment Actions
  addComment: (issueId: string, content: string, author: string) => void;
  updateComment: (issueId: string, commentId: string, content: string) => void;
  deleteComment: (issueId: string, commentId: string) => void;
  
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
  searchQuery: '',
  
  createIssue: (data: IssueFormData) => {
    const newIssue: Issue = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      comments: [],
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

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },
  
  addComment: (issueId: string, content: string, author: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      author,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state: IssueStore) => ({
      issues: state.issues.map((issue: Issue) =>
        issue.id === issueId
          ? {
              ...issue,
              comments: [...issue.comments, newComment],
              updatedAt: new Date(),
            }
          : issue
      ),
    }));
  },

  updateComment: (issueId: string, commentId: string, content: string) => {
    set((state: IssueStore) => ({
      issues: state.issues.map((issue: Issue) =>
        issue.id === issueId
          ? {
              ...issue,
              comments: issue.comments.map((comment: Comment) =>
                comment.id === commentId
                  ? { ...comment, content, updatedAt: new Date() }
                  : comment
              ),
              updatedAt: new Date(),
            }
          : issue
      ),
    }));
  },

  deleteComment: (issueId: string, commentId: string) => {
    set((state: IssueStore) => ({
      issues: state.issues.map((issue: Issue) =>
        issue.id === issueId
          ? {
              ...issue,
              comments: issue.comments.filter((comment: Comment) => comment.id !== commentId),
              updatedAt: new Date(),
            }
          : issue
      ),
    }));
  },
  
  get filteredIssues() {
    const { issues, filter, searchQuery } = get();
    let filtered = issues;

    // Apply filters
    if (filter.status) {
      filtered = filtered.filter((issue) => issue.status === filter.status);
    }
    if (filter.priority) {
      filtered = filtered.filter((issue) => issue.priority === filter.priority);
    }
    if (filter.severity) {
      filtered = filtered.filter((issue) => issue.severity === filter.severity);
    }
    if (filter.type) {
      filtered = filtered.filter((issue) => issue.type === filter.type);
    }
    if (filter.assignee) {
      filtered = filtered.filter((issue) => issue.assignee === filter.assignee);
    }
    if (filter.reporter) {
      filtered = filtered.filter((issue) => issue.reporter === filter.reporter);
    }
    if (filter.dateRange) {
      filtered = filtered.filter((issue) => {
        const issueDate = new Date(issue.createdAt);
        if (filter.dateRange?.start && issueDate < filter.dateRange.start) return false;
        if (filter.dateRange?.end && issueDate > filter.dateRange.end) return false;
        return true;
      });
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((issue) => {
        return (
          issue.title.toLowerCase().includes(query) ||
          issue.description.toLowerCase().includes(query) ||
          issue.reporter.toLowerCase().includes(query) ||
          (issue.assignee?.toLowerCase() || '').includes(query) ||
          issue.comments.some((comment) =>
            comment.content.toLowerCase().includes(query) ||
            comment.author.toLowerCase().includes(query)
          )
        );
      });
    }

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