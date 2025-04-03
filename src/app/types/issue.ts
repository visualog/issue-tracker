export type IssueStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type IssuePriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type IssueSeverity = 'MINOR' | 'MAJOR' | 'CRITICAL' | 'BLOCKER';
export type IssueType = 'BUG' | 'FEATURE' | 'IMPROVEMENT' | 'TASK' | 'UI' | 'SECURITY' | 'PERFORMANCE' | 'DOCUMENTATION';

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  type: IssueType;
  priority: IssuePriority;
  severity: IssueSeverity;
  status: IssueStatus;
  reporter: string;
  assignee: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  labels: string[];
}

export interface IssueFormData {
  title: string;
  description: string;
  type: Issue['type'];
  priority: Issue['priority'];
  severity: Issue['severity'];
  status: Issue['status'];
  reporter: string;
  assignee: string;
  labels: string[];
}

export interface IssueFilter {
  status?: Issue['status'][];
  priority?: Issue['priority'][];
  severity?: Issue['severity'][];
  type?: Issue['type'][];
} 