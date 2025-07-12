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

const FETCH_PRODUCT_BY_SLUG_QUERY = defineQuery(`*[_type=='product' && slug.current==$productSlug] | order(name asc)`)


const FETCH_BRAND_BY_SLUG_QUERY = defineQuery(`*[_type=='product' && slug.current==$slug]{

  "brandName":brand->title
}`)

const MY_ORDERS_QUERY =
  defineQuery(`*[_type == 'order' && clerkUserId == $userId] | order(orderData desc){
  ...,
  "products":
    products[]{
      ...,product->
  }
}`);


const GET_ALL_BLOG = defineQuery(
  `*[_type == 'blog'] | order(publishedAt desc)[0...$quantity]{
  ...,
     blogcategories[]->{
    title
}
    }
  `
);

const SINGLE_BLOG_QUERY =
  defineQuery(`*[_type == "blog" && slug.current == $slug][0]{
  ...,
    author->{
    name,
    image,
  },
  blogcategories[]->{
    title,
    "slug": slug.current,
  },
}`);

const BLOG_CATEGORIES = defineQuery(
  `*[_type == "blog"]{
     blogcategories[]->{
    ...
    }
  }`
);

const OTHERS_BLOG_QUERY = defineQuery(`*[
  _type == "blog"
  && defined(slug.current)
  && slug.current != $slug
]|order(publishedAt desc)[0...$quantity]{
...
  publishedAt,
  title,
  mainImage,
  slug,
  author->{
    name,
    image,
  },
  categories[]->{
    title,
    "slug": slug.current,
  }
}`);


export {
  FETCH_PRODUCTS_QUERY,
  FETCH_BRANDS_QUERY,
  FETCH_LATEST_BLOGS,
  FETCH_HOT_DEALS_QUERY,
  FETCH_PRODUCTS_BY_CATEGORY,
  FETCH_PRODUCT_BY_SLUG_QUERY,
  FETCH_BRAND_BY_SLUG_QUERY,
  MY_ORDERS_QUERY,
  GET_ALL_BLOG,
  SINGLE_BLOG_QUERY,
  BLOG_CATEGORIES, OTHERS_BLOG_QUERY
}
