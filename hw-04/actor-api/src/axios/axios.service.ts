import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class AxiosService {
	private axiosInstance : AxiosInstance
	constructor(
		@Inject()
		private configService: ConfigService
	) {
		this.axiosInstance = axios.create({
			baseURL: this.configService.get<string>("API_URL")
		})

		// this.axiosInstance.interceptors.request.use(config => {
		// 	const secretKey = this.generateKey(config.url);

		// 	config.headers['Authorization'] = `Bearer ${secretKey}`;

		// 	return config;
		// })
	}

	private generateKey(url: string) {
		return url + Date.now() + this.configService.get<string>("API_KEY")
	}

	async get(url: string, params? : any) {
		return this.axiosInstance.get(url, {params});
	}
}
