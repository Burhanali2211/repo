// Type definitions for external modules

// React Router DOM
declare module 'react-router-dom' {
  import React from 'react';

  export interface NavigateOptions {
    replace?: boolean;
    state?: unknown;
  }

  export interface NavigateFunction {
    (to: string, options?: NavigateOptions): void;
    (delta: number): void;
  }

  export function useNavigate(): NavigateFunction;
  export function Navigate(props: { to: string, replace?: boolean }): JSX.Element;

  export const BrowserRouter: React.FC<{ children?: React.ReactNode }>;
  export const Routes: React.FC<{ children?: React.ReactNode }>;
  export const Route: React.FC<{
    path: string;
    element: React.ReactNode;
  }>;
  export const Link: React.FC<{
    to: string;
    className?: string;
    children?: React.ReactNode;
  }>;
}

// Lucide React
declare module 'lucide-react' {
  import React from 'react';

  export interface IconProps {
    color?: string;
    size?: string | number;
    className?: string;
    onClick?: () => void;
  }

  // Define all icons used in the dashboard
  export const LayoutDashboard: React.FC<IconProps>;
  export const FolderOpen: React.FC<IconProps>;
  export const FileText: React.FC<IconProps>;
  export const MessageSquare: React.FC<IconProps>;
  export const Settings: React.FC<IconProps>;
  export const LogOut: React.FC<IconProps>;
  export const Bell: React.FC<IconProps>;
  export const Search: React.FC<IconProps>;
  export const User: React.FC<IconProps>;
  export const Heart: React.FC<IconProps>;
  export const Star: React.FC<IconProps>;
  export const AlertCircle: React.FC<IconProps>;
  export const Plus: React.FC<IconProps>;
  export const Edit: React.FC<IconProps>;
  export const Trash2: React.FC<IconProps>;
  export const Eye: React.FC<IconProps>;
  export const X: React.FC<IconProps>;
  export const Check: React.FC<IconProps>;
}
