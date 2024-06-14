import routes from "../consts/apiRoutes";
import apiRequest from "./config";

const urlParams = new URLSearchParams(window.location.search);
const from = urlParams.get('from');

let fromUrlParam = ''
if (from) {
    fromUrlParam = `?from=${from}`
}

export const validateInitData = () => {
    return apiRequest('get', routes.VALIDATE_INIT_DATA + fromUrlParam);
}

export const syncMoney = async (money, dispatch, telegramData, setTelegramData) => {
    const user = await apiRequest('post', routes.USER_MONEY + fromUrlParam, {}, {money});
    console.log("sync money", user)
    dispatch(setTelegramData({...telegramData, user}));
}

export const getMoneyInfo = () => {
    return apiRequest('get', routes.USER_MONEY);
}