/**
 * 防抖函数
 * @param {Function} fn 需要防抖的函数
 * @param {number} [delay=500] 延迟时间(ms)
 * @param {boolean} [immediate=false] 是否立即执行
 * @returns {Function} 防抖处理后的函数
 */
export function debounce(fn, delay = 500, immediate = false) {
  let timer = null;
  let isInvoked = false;

  return function(...args) {
    const context = this;
    
    // 清除已有定时器
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // 立即执行分支
    if (immediate && !isInvoked) {
      fn.apply(context, args);
      isInvoked = true;
    }

    // 设置新定时器
    timer = setTimeout(() => {
      if (!immediate) {
        fn.apply(context, args);
      }
      isInvoked = false;
      timer = null;
    }, delay);
  };
}

// 带取消功能的版本
export function cancelableDebounce(fn, delay = 500) {
  let timer = null;
  
  const debounced = function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
  
  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  
  return debounced;
}