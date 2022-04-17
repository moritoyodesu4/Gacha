// 2本指での操作を禁止（ピンチイン、ピンチアウト）
const preventTwoFinger = () => {
  document.body.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });

  document.body.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });
};

// ダブルタップ禁止
const preventDoubleTap = () => {
  let t = 0;
  document.documentElement.addEventListener('touchend', (e) => {
    const now = new Date().getTime();
    if ((now - t) < 350) {
      e.preventDefault();
    }
    t = now;
  }, false);
};

export {
  preventTwoFinger,
  preventDoubleTap,
};
