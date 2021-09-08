import { VNode} from 'vue'

export interface INotifyOptions {
  id?: string;
  title: string;
  type?: string;
  duration?: number;
  position?: string;
  offset?: number;
  showClose?: boolean;
  iconClass?: string;
  onClose?: () => void;
}

export type NotifyParams = INotifyOptions | string;

export type NotifyQueue = VNode[]