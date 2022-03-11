const result = document.querySelector('.result')

const fetchProduct = async () => {
  result.innerHTML = `<h2>Loading...</h2>`
  try {
    // const id = '?id=1'
    const id = window.location.search
    const {
    data: { fields },
    } = await axios.get(`/api/3-z-complete${id}`)
    const { name, price, description, img, colors, category} = fields
    result.innerHTML = `<h1 class="title">${name}</h1>
  <article class="product">
    <img class="product-img"
    src="${img[0].url}"
    alt="${name}"
    />
    <div class="product-info">
      <h5 class="title">${name}</h5>
      <h5 class="price">$${price}</h5>
      <p class="description">${description}</p>
      <ul class="colors">$${colors}</ul>
      <h5 class="category">$${category}</h5>
    </div>
  </article>`
  } catch (error) {
    result.innerHTML = `<h2>${error.response.data}</h2>`
  }
}

fetchProduct()
