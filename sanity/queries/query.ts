import { defineQuery } from "next-sanity"

const FETCH_PRODUCTS_QUERY = defineQuery(`*[_type=='product' && variant==$variant]{
  ...,
    "categories":categories[]->title
}`)


const FETCH_BRANDS_QUERY = defineQuery(`*[_type=='brand'] | order(title asc)`)

const FETCH_LATEST_BLOGS = defineQuery(`*[_type=='blog' && isLatest==true] | order(name asc){
  ...,
  "blogcategories":blogcategories[]->{title}
}`)


const FETCH_HOT_DEALS_QUERY = defineQuery(`*[_type=='product' && status=='hot'] | order(name asc){

   ...,
    "categories":categories[]->title
}`)

const FETCH_PRODUCTS_BY_CATEGORY = defineQuery(` *[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc){
        ...,"categories": categories[]->title}`)

export {
  FETCH_PRODUCTS_QUERY,
  FETCH_BRANDS_QUERY,
  FETCH_LATEST_BLOGS,
  FETCH_HOT_DEALS_QUERY,
  FETCH_PRODUCTS_BY_CATEGORY
}
