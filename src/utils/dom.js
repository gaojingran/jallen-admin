

/**
 * 获取滚动条宽度
 */
let scrollBarWidth = 0;
export const getScrollBarWidth = () => {
  if (scrollBarWidth) {
    return scrollBarWidth;
  } else {
    const scrollDiv = document.createElement("div");
    scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
    document.body.appendChild(scrollDiv);
    scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollBarWidth;
  }
}
