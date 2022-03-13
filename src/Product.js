import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

const Product = () => {
  const [loading, setLoading] = useState(true)
  const [finalProduct, setProduct] = useState(null)
  const { productID } = useParams()

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/api/products?id=${productID}`)
      setProduct(data)
    } catch (error) {}
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <section className='section section-center'>
        <h2>Loading...</h2>
      </section>
    )
  }
  const { fields } = finalProduct
  const { name, stock, description, price, imgages, colors, category } = fields

  return (
    <section className='section section-center'>
      <Link to='/' className='link'>
        Back Home
      </Link>
      <div>
        <div className='title'>
          <div className='title-underline'></div>
        </div>
        <article className='single-product'>
          <img className='single-product-img' src={imgages[0].url} alt={name} />
          <div>
            <h5>{stock}</h5>
            <h5 className='price'>${price}</h5>
            <h5>{colors}</h5>
            <h5>{category}</h5>
            <h5>{name}</h5>
            <p>{description}</p>
          </div>
        </article>
      </div>
    </section>
  )
}

export default Product
