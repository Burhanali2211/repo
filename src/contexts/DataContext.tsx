
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Project {
  id: string;
  name: string;
  status: 'in-progress' | 'completed' | 'pending';
  progress: number;
  client: string;
  description: string;
  startDate: string;
  endDate?: string;
  budget: number;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  projectId: string;
  url: string;
}

interface Invoice {
  id: string;
  projectId: string;
  projectName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  issueDate: string;
}

interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface DataContextType {
  projects: Project[];
  documents: Document[];
  invoices: Invoice[];
  messages: Message[];
  updateProject: (id: string, updates: Partial<Project>) => void;
  addDocument: (doc: Omit<Document, 'id'>) => void;
  deleteDocument: (id: string) => void;
  sendMessage: (content: string) => void;
  markMessageAsRead: (id: string) => void;
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }

  // Ensure context has all required properties with safe defaults
  return {
    projects: context.projects || [],
    documents: context.documents || [],
    invoices: context.invoices || [],
    messages: context.messages || [],
    updateProject: context.updateProject || (() => { }),
    addDocument: context.addDocument || (() => { }),
    deleteDocument: context.deleteDocument || (() => { }),
    sendMessage: context.sendMessage || (() => { }),
    markMessageAsRead: context.markMessageAsRead || (() => { }),
    refreshData: context.refreshData || (() => { }),
    ...context
  };
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  const [documents, setDocuments] = useState<Document[]>([]);

  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const [messages, setMessages] = useState<Message[]>([]);

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project =>
      project.id === id ? { ...project, ...updates } : project
    ));
  };

  const addDocument = (doc: Omit<Document, 'id'>) => {
    const newDoc: Document = {
      ...doc,
      id: Date.now().toString()
    };
    setDocuments(prev => [...prev, newDoc]);
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const sendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      from: 'Client',
      to: 'Project Manager',
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const markMessageAsRead = (id: string) => {
    setMessages(prev => prev.map(msg =>
      msg.id === id ? { ...msg, read: true } : msg
    ));
  };

  const refreshData = () => {
    // Simulate data refresh
    console.log('Refreshing dashboard data...');
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update project progress
      setProjects(prev => prev.map(project => {
        if (project.status === 'in-progress' && Math.random() > 0.8) {
          const newProgress = Math.min(project.progress + 1, 100);
          const newStatus = newProgress === 100 ? 'completed' : 'in-progress';
          return { ...project, progress: newProgress, status: newStatus };
        }
        return project;
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <DataContext.Provider value={{
      projects,
      documents,
      invoices,
      messages,
      updateProject,
      addDocument,
      deleteDocument,
      sendMessage,
      markMessageAsRead,
      refreshData
    }}>
      {children}
    </DataContext.Provider>
  );
};
