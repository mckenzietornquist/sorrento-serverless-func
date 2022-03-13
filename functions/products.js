require('dotenv').config()
const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
.base('appqFAFqIcuMirJ6V')
.table('products')

exports.handler = async (event, context, cb) => {
  const { id } = event.queryStringParameters
  
  if (id) {
    try {
      const product = await airtable.retrieve(id)
      const singleProduct = product.fields;
      const finalProduct = { id, ...singleProduct };
      if (finalProduct.error) {
        return {
          header: {
            "access-Control-Allow-Origin": "*",
          },
          statusCode: 404,
          body: `No product with id: ${id}`,
        }
      }
      return {
        header: {
          "access-Control-Allow-Origin": "*",
        },
        statusCode: 200,
        body: JSON.stringify(finalProduct),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Server Error`,
      }
    }
  }
  try {
    const { records } = await airtable.list()
    const products = records.map((product) => {
      const { id } = product
      const { name, img, price } = product.fields
      const url = img[0].url
      return { id, name, url, price }
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