const api = 'http://roberval.chaordicsystems.com/challenge/challenge.json';

// Templates
const chaordicTemplate = `
  <div class="chaordic-reference col"></div>
  
  <div class="chaordic-recommendation col">
    <div class="controls-left">
      <img src="img/arrow-left.png" alt="" class="controls-icon left">  
    </div>

    <div class="controls-right">
      <img src="img/arrow-right.png" alt="" class="controls-icon right">
    </div>
  </div>
`;

const errorTemplate = `
  <div class="error-container">
  </div>
`;

const X = (res) => onReady(res.data);

var script = document.createElement('script');
script.src = api;
document.getElementsByTagName('head')[0].appendChild(script);


const addProduct = (item, parentElement) => {
  const { oldPrice, productInfo } = item;
  
  let oldPriceElement = '';
  if (oldPrice) {
    oldPriceElement = `
      <div class="product-oldprice">
        De: ${item.oldPrice}
      </div>
    `; 
  }
  
  const paymentConditions = (productInfo)
    ? productInfo.paymentConditions 
    : '';

  const priceElement = `
    ${oldPriceElement}
    <div class="product-price">
      Por: <span class="price-value">${item.price}</span>
      <div class="price-payment">${paymentConditions}</div>
    </div>
  `;
  
  const el = document.createElement('div');
  parentElement.appendChild(el);
  el.classList.add('product');
  el.innerHTML = `
    <div class="product-img">
      <a href="${item.detailUrl}">
        <img src="http:${item.imageName}" alt="${item.name}" />
      </a>
    </div>
    <div class="product-details">
      <div class="product-title">
        ${elipsis(item.name)}
      </div>
      ${priceElement}  
    </div>
  `;
} 


const onReady = (data) => {
  const mainElement = document.getElementsByClassName('chaordic-content')[0];
  if (data.recommendation) {
    mainElement.innerHTML = chaordicTemplate;
    loadRecommendation(data)
  } else {
    mainElement.innerHTML = errorTemplate;
  }
}

const loadRecommendation = ({ reference, recommendation }) => {  
  let el = document.getElementsByClassName('chaordic-reference');
  addProduct(reference.item, el[0]);
  
  const productListElement = document.createElement('div');
  productListElement.setAttribute('class', 'product-list');
  for (let product of recommendation) {
    addProduct(product, productListElement);
  };
  
  document.getElementsByClassName('chaordic-recommendation')[0]
    .appendChild(productListElement);
  
  setControlsPosition();
  addControlEvents();
  window.addEventListener('resize', setControlsPosition);
}
