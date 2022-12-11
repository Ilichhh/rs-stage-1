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

export interface CallbackFunc<T> {
    (data: T): void;
}

export interface RequestParameters {
    apiKey: string;
    category?: 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';
    language?: 'ar' | 'de' | 'en' | 'es' | 'fr' | 'he' | 'it' | 'nl' | 'no' | 'pt' | 'ru' | 'sv' | 'ud' | 'zh';
}

export interface EndpointParameters {
    endpoint: 'sources' | 'everything';
    options?: {
        sources: string;
    };
}
