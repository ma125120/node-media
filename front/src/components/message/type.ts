
export enum MessageEnum {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error',
}

export type MessageOptions = {
  message: string,
  id?: string,
  type: MessageEnum,
  customClass?: string,
  duration?: number,
  offset?: number,
  iconClass?: string,
} & any

export type Instance = {
  el: HTMLElement,
  options: MessageOptions,
  close: Function,
}

export type MessageItem = (options: MessageOptions) => Instance

export type MessageType = {
  [MessageEnum.success]: MessageItem,
  [MessageEnum.info]: MessageItem,
  [MessageEnum.warning]: MessageItem,
  [MessageEnum.error]: MessageItem,
}