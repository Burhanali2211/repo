// React type declarations
import * as React from 'react';

declare module 'react' {
  // Re-export React types
  export = React;
  export as namespace React;

  // Hooks
  export function useState<T>(initialState: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>];
  export function useEffect(effect: React.EffectCallback, deps?: React.DependencyList): void;
  export function useContext<T>(context: React.Context<T>): T;
  export function useReducer<R extends React.Reducer<unknown, unknown>, I>(
    reducer: R,
    initialArg: I,
    init?: (arg: I) => React.ReducerState<R>
  ): [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>];
  export function useCallback<T extends (...args: unknown[]) => unknown>(
    callback: T,
    deps: React.DependencyList
  ): T;
  export function useMemo<T>(factory: () => T, deps: React.DependencyList | undefined): T;
  export function useRef<T>(initialValue: T): React.MutableRefObject<T>;
  export function useRef<T>(initialValue: T | null): React.RefObject<T>;
  export function useRef<T = undefined>(): React.MutableRefObject<T | undefined>;

  // Event types
  export interface FormEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
  }

  export interface SyntheticEvent<T = Element, E = Event> extends BaseSyntheticEvent<E, EventTarget & T, EventTarget> {
    // Additional synthetic event properties if needed
    readonly currentTarget: EventTarget & T;
  }

  export interface BaseSyntheticEvent<E = object, C = unknown, T = unknown> {
    nativeEvent: E;
    currentTarget: C;
    target: T;
    bubbles: boolean;
    cancelable: boolean;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    preventDefault(): void;
    isDefaultPrevented(): boolean;
    stopPropagation(): void;
    isPropagationStopped(): boolean;
    persist(): void;
    timeStamp: number;
    type: string;
  }

  // Component types
  export type FC<P = Record<string, unknown>> = FunctionComponent<P>;

  export interface FunctionComponent<P = Record<string, unknown>> {
    (props: P, context?: unknown): ReactElement<unknown, unknown> | null;
    propTypes?: WeakValidationMap<P>;
    contextTypes?: ValidationMap<unknown>;
    defaultProps?: Partial<P>;
    displayName?: string;
  }

  export type ReactElement<P = unknown, T extends string | JSXElementConstructor<unknown> = string | JSXElementConstructor<unknown>> = {
    type: T;
    props: P;
    key: Key | null;
  };

  export type JSXElementConstructor<P> = ((props: P) => ReactElement | null) | (new (props: P) => Component<P, unknown>);

  export type Key = string | number;

  export type WeakValidationMap<T> = {
    [K in keyof T]?: null extends T[K]
    ? Validator<T[K] | null | undefined>
    : undefined extends T[K]
    ? Validator<T[K] | null | undefined>
    : Validator<T[K]>;
  };

  export type ValidationMap<T> = {
    [K in keyof T]?: Validator<T[K]>;
  };

  export type Validator<T> = {
    (props: { [key: string]: unknown }, propName: string, componentName: string, location: string, propFullName: string): Error | null;
    [key: string]: unknown;
  };
}
