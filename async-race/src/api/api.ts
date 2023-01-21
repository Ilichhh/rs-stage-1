import { Car, Cars } from '../types/types';

class Api {
  private baseLink: string;

  constructor(baselink: string) {
    this.baseLink = baselink;
  }

  public async getCars(page?: number, limit?: number): Promise<Cars> {
    const request: Response = await fetch(`${this.baseLink}/garage?_page=${page}&_limit=${limit}`);
    const response: Car[] = await request.json();
    const totalCount: string = <string>request.headers.get('X-Total-Count');
    const result: Cars = { items: response, count: +totalCount };
    return result;
  }

  public async getCar(id: number): Promise<Car> {
    const request: Response = await fetch(`${this.baseLink}/garage/${id}`);
    const response: Car = await request.json();
    return response;
  }

  public async createCar(name: string, color: string): Promise<void> {
    const data: string = JSON.stringify({ name, color });
    await fetch(`${this.baseLink}/garage`, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async updateCar(id: number, name: string, color: string): Promise<void> {
    const data: string = JSON.stringify({ name, color });
    await fetch(`${this.baseLink}/garage/${id}`, {
      method: 'PUT',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async deleteCar(id: number): Promise<void> {
    await fetch(`${this.baseLink}/garage/${id}`, { method: 'DELETE' });
  }

  public async engineStart(id: number) {
    const request: Response = await fetch(`${this.baseLink}/engine?id=${id}&status=started`, { method: 'PATCH' });
    const response = await request.json();
    console.log(response);
  }

  public async engineStop(id: number) {
    const request: Response = await fetch(`${this.baseLink}/engine?id=${id}&status=stopped`, { method: 'PATCH' });
    const response = await request.json();
    console.log(response);
  }

  public async drive(id: number) {
    const request: Response = await fetch(`${this.baseLink}/engine?id=${id}&status=drive`, { method: 'PATCH' });
    let response;
    if (request.status === 200) response = await request.json();
    return response || { success: false };
  }
}

export default Api;
