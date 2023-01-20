import { Car } from '../types/types';

class Api {
  private baseLink: string;

  constructor(baselink: string) {
    this.baseLink = baselink;
  }

  public async getCars(): Promise<Car[]> {
    const request: Response = await fetch(`${this.baseLink}/garage?_page=1&limit=7`);
    const response: Car[] = await request.json();
    console.log(response);
    return response;
  }

  public async getCar(id: number): Promise<Car> {
    const request: Response = await fetch(`${this.baseLink}/garage/${id}`);
    const response: Car = await request.json();
    return response;
  }

  public async createCar(name: string, color: string): Promise<void> {
    const data = JSON.stringify({ name, color });
    await fetch(`${this.baseLink}/garage`, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async updateCar(id: number, name: string, color: string): Promise<void> {
    const data = JSON.stringify({ name, color });
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
}

export default Api;
