import { config } from '@gateway/config';
import { AxiosService } from '@gateway/services/axios';
import { IAuth } from '@jobhunt-microservices/jobhunt-shared';
import axios, { AxiosResponse } from 'axios';

export let axiosAuthInstance: ReturnType<typeof axios.create>;

class AuthService {
  axiosService: AxiosService;

  constructor() {
    this.axiosService = new AxiosService(`${config.AUTH_BASE_URL}/api/v1/auth`, 'auth');
    axiosAuthInstance = this.axiosService.axios;
  }

  async getCurrentUser(): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosAuthInstance.get('/current-user');
    return response;
  }

  async getRefreshToken(): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosAuthInstance.get('/refresh-token');
    return response;
  }

  async changePassword(currentPassword: string, newPassword: string) {
    const response: AxiosResponse = await axiosAuthInstance.put('/change-password', {
      currentPassword,
      newPassword
    });
    return response;
  }

  async signup(payload: IAuth) {
    const response: AxiosResponse = await axiosAuthInstance.post('/signup', payload);
    return response;
  }

  async signin(payload: IAuth) {
    const response: AxiosResponse = await axiosAuthInstance.post('/signin', payload);
    return response;
  }

  async resendEmail(payload: { authId: number; email: string }) {
    const response: AxiosResponse = await axiosAuthInstance.post('/resend-email', payload);
    return response;
  }

  async forgotPassword(email: string) {
    const response: AxiosResponse = await axiosAuthInstance.put('/forgot-password', { email });
    return response;
  }

  async resetPassword(token: string, password: string, confirmPassword: string) {
    const response: AxiosResponse = await axiosAuthInstance.put(`/reset-password/${token}`, { password, confirmPassword });
    return response;
  }

  async getGigs(query: string, from: string, size: string, type: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosAuthInstance.get(`/search/gig/${from}/${size}/${type}?${query}`);
    return response;
  }

  async getGig(gigId: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosAuthInstance.get(`/search/gig/${gigId}`);
    return response;
  }

  async seed(count: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosAuthInstance.put(`/seed/${count}`);
    return response;
  }
}

export const authService = new AuthService();
