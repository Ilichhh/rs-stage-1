import type { RequestParameters, EndpointParameters, CallbackFunc } from './../../types/types';

class Loader {
    baseLink: string;
    options: RequestParameters;

    constructor(baseLink: string, options: RequestParameters) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>({ endpoint, options }: EndpointParameters, callback: CallbackFunc<T>) {
        if (!callback) console.error('No callback for GET response');
        this.load('GET', { endpoint, options }, callback);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl({ endpoint, options }: EndpointParameters) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(method: string, { endpoint, options }: EndpointParameters, callback: CallbackFunc<T>) {
        fetch(this.makeUrl({ endpoint, options }), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
