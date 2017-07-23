const PACE = 170;
let currentMargin = 0;

const setControlsPosition = () => {
  const controlsRightElement = document.getElementsByClassName('controls-right')[0];  
  const distanceToLeft = document.getElementsByClassName('chaordic')[0].offsetWidth - 230;
  controlsRightElement.style.left = distanceToLeft + 'px';
}

const handleControlsClick = (ev) => {
  const productList = document.getElementsByClassName('product-list')[0];
  const style = productList.currentStyle || window.getComputedStyle(productList);
  const containerWidth = +style.width.slice(0, -2);
  const rightLimit = -1 * (containerWidth/2);

  if (ev.target.classList.contains('left')) {
    currentMargin = (currentMargin + PACE >= 0) ? 0 : currentMargin + PACE;
    productList.setAttribute('style', `transform: translate(${currentMargin}px)`);
  } else {
    currentMargin = (currentMargin - PACE < rightLimit) ? rightLimit : currentMargin - PACE ;
    productList.setAttribute('style', `transform: translate(${currentMargin}px)`);
  }
}

const addControlEvents = () =>
  [].forEach.call(document.getElementsByClassName('controls-icon'), element => element.addEventListener('click', handleControlsClick));
