import type { ReactElement, WeakValidationMap, ValidationMap } from 'react';

declare module 'react' {
  interface StatelessComponent<P = Record<string, unknown>> {
    (props: P, context?: unknown): ReactElement<unknown, unknown> | null;
    propTypes?: WeakValidationMap<P>;
    contextTypes?: ValidationMap<unknown>;
    defaultProps?: Partial<P>;
    displayName?: string;
  }
  interface FunctionComponent<P = Record<string, unknown>> {
    (props: P, context?: unknown): ReactElement<unknown, unknown> | null;
    propTypes?: WeakValidationMap<P>;
    contextTypes?: ValidationMap<unknown>;
    defaultProps?: Partial<P>;
    displayName?: string;
  }

  type FC<P = Record<string, unknown>> = FunctionComponent<P>;
}

declare module 'lucide-react' {
  import React from 'react';

  interface IconProps extends React.SVGAttributes<SVGElement> {
    color?: string;
    size?: string | number;
  }

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

declare module 'react-router-dom' {
  import { ComponentType } from 'react';

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
  export const BrowserRouter: ComponentType<{ children?: React.ReactNode }>;
  export const Routes: ComponentType<{ children?: React.ReactNode }>;
  export const Route: ComponentType<{
    path: string;
    element: React.ReactNode;
  }>;
  export const Link: ComponentType<{
    to: string;
    className?: string;
    children?: React.ReactNode;
  }>;
}
