class Api {
  private baseLink: string;

  constructor(baselink: string) {
    this.baseLink = baselink;
  }

  public async getCars() {
    const request = await fetch(`${this.baseLink}/garage?_page=1&limit=7`);
    const response = await request.json();
    console.log(response);
    return response;
  }
}

export default Api;
