/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios';
import type {
	AxiosInstance,
	AxiosResponse,
	AxiosRequestHeaders,
	InternalAxiosRequestConfig,
} from 'axios';
/* 
import store from '../../presentation/store';
import { resetUser } from '../../presentation/store/modules/user.module'; */

interface IAxiosRequestConfig extends InternalAxiosRequestConfig {}

interface IGetApiFunction<R> {
	(url: string, config?: IAxiosRequestConfig): Promise<R>;
}

interface IApiFunction<T, R> {
	(url: string, data?: T, config?: IAxiosRequestConfig): Promise<R>;
}

interface IAxiosInstance extends AxiosInstance {
	get: IGetApiFunction<any>;
	delete: IApiFunction<any, any>;
	post: IApiFunction<any, any>;
	put: IApiFunction<any, any>;
	patch: IApiFunction<any, any>;
}

const instance: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_APP_API_URL,
	headers: {
		Accept: 'text/plain',
		'Content-Type': 'application/json',
	},
}) as IAxiosInstance;

instance.interceptors.request.use(
	async (config: IAxiosRequestConfig) => {
		const token = localStorage.getItem('token');
		config.headers = {
			...config.headers,
			Authorization: `Bearer ${token}`,
		} as AxiosRequestHeaders;

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error: AxiosError) => {
		if (error.response?.status === 401 || error.response?.status === 403) {
			/* store.dispatch(resetUser()); */
			/* 	localStorage.removeItem('token'); */
		}

		return Promise.reject(error);
	}
);

export default instance;
