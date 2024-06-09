import routes from "../consts/api_routes";
import apiRequest from "./config";

export const createCategory = (name) => {
  return apiRequest('post', routes.ADMIN_CATEGORY, {}, { name });
}

export const deleteCategory = (id) => {
  return apiRequest('delete', routes.ADMIN_CATEGORY, { data: { id } });
}

export const updateCategory = (id, name) => {
  return apiRequest('put', routes.ADMIN_CATEGORY, {}, { id, name });
}

export const getAllCategories = () => {
  return apiRequest('get', routes.CATEGORY);
}

