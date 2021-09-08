import { VNode } from "vue"

export interface IMessageOptions {
  id?: string;
  message: string;
  duration?: number;
  center?: boolean;
  showClose?: boolean;
  type?: string;
  zIndex?: number;
  offset?: number;
  onClose?: () => void;
}

export type MessageParams = IMessageOptions | string;
export type TypeMessageParams<T extends ComponentType> = { type: T } & Omit<IMessageOptions, 'type'> | string

export interface IMessage {
  options?: MessageParams;
  success: (options?: TypeMessageParams<'success'>) => void;
  warning: (options?: TypeMessageParams<'warning'>) => void;
  error: (options?: TypeMessageParams<'error'>) => void;
  info: (options?: TypeMessageParams<'info'>) => void;
}

export type MessageQueue = { vm: VNode }[]