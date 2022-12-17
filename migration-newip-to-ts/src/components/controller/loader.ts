import type { RequestParameters, EndpointParameters, CallbackFunc } from './../../types/types';

class Loader {
    private baseLink: string;
    private options: RequestParameters;

    constructor(baseLink: string, options: RequestParameters) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>({ endpoint, options }: EndpointParameters, callback: CallbackFunc<T>): void {
        this.load('GET', { endpoint, options }, callback);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl({ endpoint, options }: EndpointParameters): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: string, { endpoint, options }: EndpointParameters, callback: CallbackFunc<T>): void {
        fetch(this.makeUrl({ endpoint, options }), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
