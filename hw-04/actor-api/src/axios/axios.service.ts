import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import * as crypto from 'crypto';
import { Request } from 'express';

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

		this.axiosInstance.interceptors.request.use(config => {
			const {time, token} = this.generateToken(config.url);

			config.headers['Authorization'] = `Bearer ${token}`;
			config.headers['time'] = time;

			return config;
		})
	}

	private generateToken(url: string) {
		const apiKey = this.configService.get<string>("API_KEY");
		const time = Date.now();
		const token = crypto.createHash('sha256').update(url + time + apiKey).digest('hex');
		return {time, token}
	}

	async get(req: Request) {
		try {
			const result = await this.axiosInstance.get(req.originalUrl);
			return result.data;
		} catch(error) {
			return error.message + " from external service";
		}
	}
}
