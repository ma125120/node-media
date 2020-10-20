import { merge, indexManage } from '../utils';
import { MessageEnum, MessageItem, MessageType, MessageOptions } from './type'

let instance;
const instances = [];
let seed = 1;

const Message: MessageType & any = function(options: MessageOptions) {
  if (window === undefined) return;

  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options,
    };
  }
  const id = 'message_' + seed++;
  let verticalOffset = options.offset || 20
  instances.forEach((item) => {
    verticalOffset += item.el.offsetHeight + 16
  })

  options = merge(
    {
      id,
      zIndex: indexManage.add(),
      duration: 3000,
      verticalOffset,
    },
    options,
  );

  const container = document.createElement('div');
  container.innerHTML = `<div id="${options.id}" class="flex flex-v-center n-message n-message--${
    options.type
  } ${options.customClass || ''}" style="top: ${verticalOffset}px; z-index: ${options.zIndex}">
    <i class="n-icon-${options.iconClass || options.type}"></i>
    <p class="n-message__content">${options.message || '信息'}</p>
  </div>`;
  const instance = {
    el: container.querySelector(".n-message"),
    options,
    close() {
      Message.close(options.id, options.onClose);
    },
  };
  document.body.appendChild(instance.el);
  instances.push(instance);
  setTimeout(() => {
    instance.el.classList.add(`n-message__enter`)
  })
  if (options.duration) {
    setTimeout(() => {
      instance.close();
    }, options.duration || 3000);
  }
  
  return instance;
};

['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options,
      };
    }
    options.type = type;
    return Message(options);
  };
});

Message.close = function(id, userOnClose) {
  const len = instances.length;
  let index = -1;
  let removedHeight;
  for (let i = 0; i < len; i++) {
    if (id === instances[i].options.id) {
      const dom: HTMLElement = instances[i].el
      removedHeight = dom.offsetHeight
      index = i;
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      dom.classList.remove('n-message__enter')
      setTimeout(() => {
        dom.remove()
      }, 500)
      instances.splice(i, 1);
      break;
    }
  }
  if (len <= 1 || index === -1 || index > instances.length - 1) return;
  for (let i = index; i < len - 1; i++) {
    const dom = instances[i].el;
    dom.style.top = parseInt(dom.style.top, 10) - removedHeight - 16 + 'px';
  }
};

Message.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};

export default Message;
