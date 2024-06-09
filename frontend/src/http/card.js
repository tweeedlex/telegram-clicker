import routes from "../consts/api_routes";
import apiRequest from "./config";

export const createCard = (name, categoryId, initialPrice, initialIncome) => {
  return apiRequest('post', routes.ADMIN_CARD, {}, { name, categoryId, initialPrice, initialIncome });
}

export const getCards = (categoryId) => {
  return apiRequest('get', routes.CARD, { params: { categoryId } });
}