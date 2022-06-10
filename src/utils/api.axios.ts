import axios, {AxiosRequestConfig} from "axios";

const KEY = 'b4fb0adb438146059f9205712220906'
const BASE_URL = 'http://api.weatherapi.com/v1/current.json?'


export const axiosInstance = axios.create({baseURL: BASE_URL});

const stringifyParams = (params:Record<string,string>)=>Object.keys(params).reduce((acc, key)=>{
    return `${acc}${key}=${params[key]}&`
},'')

export const createGETRequest = <T>(config?: AxiosRequestConfig) => {
    const preparedUrl = `?${stringifyParams(config?.params)}&key=${KEY}`

    return axiosInstance.get<T>(preparedUrl, {...config});
};