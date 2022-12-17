export interface Source {
    id: string;
    name: string;
}

export interface Article {
    urlToImage: string;
    author: string;
    source: {
        name: string;
    };
    publishedAt: string;
    title: string;
    description: string;
    url: string;
}

export interface SourceDate {
    sources: Source[];
}

export interface ArticlesDate {
    articles: Article[];
}

export type CallbackFunc<T> = (data: T) => void;

export type RequestParameters = {
    apiKey: string;
};

export type Endpoint = 'sources' | 'everything';

export type EndpointParameters = {
    endpoint: Endpoint;
    options?: {
        sources: string;
    };
};
