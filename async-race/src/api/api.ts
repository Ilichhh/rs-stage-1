// eslint-disable-next-line object-curly-newline
import { Car, Cars, CarEngine, CarDrive, Winner, Winners } from '../types/types';

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

  public async engineStart(id: number): Promise<CarEngine> {
    const request: Response = await fetch(`${this.baseLink}/engine?id=${id}&status=started`, { method: 'PATCH' });
    const response: CarEngine = await request.json();
    return response;
  }

  public async engineStop(id: number): Promise<CarEngine> {
    const request: Response = await fetch(`${this.baseLink}/engine?id=${id}&status=stopped`, { method: 'PATCH' });
    const response: CarEngine = await request.json();
    return response;
  }

  public async drive(id: number): Promise<CarDrive> {
    const request: Response = await fetch(`${this.baseLink}/engine?id=${id}&status=drive`, { method: 'PATCH' });
    let response: CarDrive;
    if (request.status === 200) {
      response = await request.json();
      return response;
    }
    return { success: false };
  }

  public async getWinner(id: number) {
    try {
      const request: Response = await fetch(`${this.baseLink}/winner/${id}`);
      const response: Winner = await request.json();
      return response;
    } catch {
      return null;
    }
  }

  public async getWinners(page?: number, limit?: number): Promise<Winners> {
    const request: Response = await fetch(`${this.baseLink}/winners?_page=${page}&_limit=${limit}`);
    const response = await request.json();

    const totalCount: string = <string>request.headers.get('X-Total-Count');
    const result: Winners = { items: response, count: +totalCount };
    return result;
  }

  public async createWinner(winner: Winner) {
    const data: string = JSON.stringify(winner);
    await fetch(`${this.baseLink}/winners`, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async updateWinner(winner: Winner) {
    const data: string = JSON.stringify({ wins: winner.wins, time: winner.time });
    await fetch(`${this.baseLink}/winners/${winner.id}`, {
      method: 'PUT',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async deleteWinner(id: number) {
    await fetch(`${this.baseLink}/winners/${id}`, { method: 'DELETE' });
  }
}

export default Api;
