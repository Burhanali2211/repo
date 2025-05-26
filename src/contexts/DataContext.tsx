
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
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Website Redesign',
      status: 'in-progress',
      progress: 75,
      client: 'TechCorp',
      description: 'Complete website overhaul with modern design',
      startDate: '2024-01-15',
      budget: 15000
    },
    {
      id: '2',
      name: 'Mobile App Development',
      status: 'completed',
      progress: 100,
      client: 'StartupXYZ',
      description: 'React Native mobile application',
      startDate: '2023-12-01',
      endDate: '2024-01-20',
      budget: 25000
    },
    {
      id: '3',
      name: 'Brand Identity',
      status: 'pending',
      progress: 20,
      client: 'Fashion Co',
      description: 'Complete brand identity and logo design',
      startDate: '2024-01-25',
      budget: 8000
    }
  ]);

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Project Brief.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      projectId: '1',
      url: '#'
    },
    {
      id: '2',
      name: 'Design Mockups.fig',
      type: 'Figma',
      size: '15.2 MB',
      uploadDate: '2024-01-18',
      projectId: '1',
      url: '#'
    }
  ]);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 'INV-001',
      projectId: '1',
      projectName: 'Website Redesign',
      amount: 7500,
      status: 'pending',
      dueDate: '2024-02-15',
      issueDate: '2024-01-15'
    },
    {
      id: 'INV-002',
      projectId: '2',
      projectName: 'Mobile App Development',
      amount: 25000,
      status: 'paid',
      dueDate: '2024-01-25',
      issueDate: '2024-01-20'
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      from: 'Project Manager',
      to: 'Client',
      content: 'The website design review is scheduled for tomorrow at 2 PM. Please review the latest mockups.',
      timestamp: '2024-01-22T10:30:00Z',
      read: false
    },
    {
      id: '2',
      from: 'Admin',
      to: 'Client',
      content: 'Invoice #INV-001 has been generated and sent to your email.',
      timestamp: '2024-01-21T15:45:00Z',
      read: true
    }
  ]);

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
