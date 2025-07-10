import { client } from "../lib/client";
import { sanityFetch } from "../lib/live";
import { FETCH_BRANDS_QUERY, FETCH_HOT_DEALS_QUERY, FETCH_LATEST_BLOGS, FETCH_PRODUCTS_BY_CATEGORY, FETCH_PRODUCTS_QUERY } from "./query";

const getCategories = async (quantity?: number) => {
  try {
    const query = quantity
      ? `*[_type == 'category'] | order(name asc) [0...$quantity] {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`
      : `*[_type == 'category'] | order(name asc) {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`;
    const { data } = await sanityFetch({
      query,
      params: quantity ? { quantity } : {},
    });
    return data;

  } catch (error) {
    console.error("Error fetching categories", error)
    return []
  }
}

const getBrands = async () => {
  try {

    const { data } = await sanityFetch({ query: FETCH_BRANDS_QUERY })
    return data

  } catch (error) {
    console.error("Error fetching brands", error)
    return []
  }
}

const getLatestBlogs = async () => {
  try {

    const { data } = await sanityFetch({ query: FETCH_LATEST_BLOGS })
    return data

  } catch (error) {
    console.error("Error fetching blogs", error)
    return []
  }
}

const getHotDeals = async () => {
  try {

    const { data } = await sanityFetch({ query: FETCH_HOT_DEALS_QUERY })
    return data ?? []

  } catch (error) {
    console.error("Error fetching hot deals", error)
    return []
  }
}




export { getCategories, getBrands, getLatestBlogs, getHotDeals }
