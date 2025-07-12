import { client } from "../lib/client";
import { sanityFetch } from "../lib/live";
import { BLOG_CATEGORIES, FETCH_BRAND_BY_SLUG_QUERY, FETCH_BRANDS_QUERY, FETCH_HOT_DEALS_QUERY, FETCH_LATEST_BLOGS, FETCH_PRODUCT_BY_SLUG_QUERY, FETCH_PRODUCTS_BY_CATEGORY, FETCH_PRODUCTS_QUERY, GET_ALL_BLOG, MY_ORDERS_QUERY, OTHERS_BLOG_QUERY, SINGLE_BLOG_QUERY } from "./query";

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


const getProductsBySlugs = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: FETCH_PRODUCT_BY_SLUG_QUERY, params: {
        productSlug: slug
      }
    })
    return data ?? []

  } catch (error) {
    console.error("Error fetching products", error)
    return []
  }
}

const getBrandBySlug = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: FETCH_BRAND_BY_SLUG_QUERY, params: {
        slug: slug
      }
    })
    return data ?? []

  } catch (error) {
    console.error("Error fetching products", error)
    return []
  }
}


const getMyOrders = async (userId: string) => {
  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });
    return orders?.data || null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

const getAllBlogs = async (quantity: number) => {
  try {
    const { data } = await sanityFetch({
      query: GET_ALL_BLOG,
      params: { quantity },
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getSingleBlog = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: SINGLE_BLOG_QUERY,
      params: { slug },
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getBlogCategories = async () => {
  try {
    const { data } = await sanityFetch({
      query: BLOG_CATEGORIES,
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getOthersBlog = async (slug: string, quantity: number) => {
  try {
    const { data } = await sanityFetch({
      query: OTHERS_BLOG_QUERY,
      params: { slug, quantity },
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};


export { getCategories, getBrands, getLatestBlogs, getHotDeals, getProductsBySlugs, getBrandBySlug, getMyOrders, getAllBlogs, getSingleBlog, getBlogCategories, getOthersBlog }
