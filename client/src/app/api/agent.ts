import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.interceptors.response.use(async response => {
    await sleep();
    return response
}, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;
    switch(status) {
        case 400: 
        if(data.errors){
            const modelStateErrors: string[] = [];
            for(const key in data.errors) {
                if(data.errors[key]) {
                    modelStateErrors.push(data.errors[key]);
                }
            }
            throw modelStateErrors.flat();
        }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            router.navigate('/server-error', {state: {error: data}})
            break;
        default:
            break;  
    }
    return Promise.reject(error.response);
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const catalog = {
    list: () => requests.get("products"),
    details: (id: number) => requests.get(`products/${id}`)
}

const testErrors = {
    get400Error: () => requests.get("buggy/bad-request"),
    get401Error: () => requests.get("buggy/unauthorised"),
    get404Error: () => requests.get("buggy/not-found"),
    get500Error: () => requests.get("buggy/server-error"),
    getValidationError: () => requests.get("buggy/validation-error"),
}

const basket = {
    getBasket: () => requests.get("basket"),
    addItem : (productId: number, quantity=1) => requests.post(`basket?quantity=${quantity}&productId=${productId}`, {}),
    removeItem : (quantity=1, productId: number) => requests.delete(`basket?quantity=${quantity}&productId=${productId}`)
}

const agent = {
    catalog,
    testErrors,
    basket
}

export default agent