require('dotenv').config()
const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appqFAFqIcuMirJ6V')
  .table('products')

exports.handler = async (event, context, cb) => {
  try {
    const {records} = await airtable.list()
    const products = records.map((product)=>{
      const {id} = product;
      const {name, price, image, colors, description, category} = product.fields
      const url = image[0].url
      return {id,name, price, url, colors, description, category}
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

