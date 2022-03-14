require('dotenv').config()
const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
.base('appqFAFqIcuMirJ6V')
.table('products')

exports.handler = async (event, context, cb) => {
  const { id } = event.queryStringParameters
  
  if (id) {
    try {
      const product = await airtable.retrieve(id);
      if (product.error) {
        return {
          statusCode: 404,
          body: `No product with id: ${id}`,
        };
      }
      const formatProduct = { id: product.id, ...product.fields };
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        statusCode: 200,
        body: JSON.stringify(formatProduct),
      };
    } catch (error) {
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        statusCode: 500,
        body: `Server Error`,
      }
    }
  }
  try {
    const { records } = await airtable.list()
    const products = records.map((product) => {
      const { id } = product
      const { name, images, price, colors, category, description, } = product.fields
      const image = images[0].url
      return { id, name, image, price, colors, description, category }
    })
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Server Error',
    }
  }
}