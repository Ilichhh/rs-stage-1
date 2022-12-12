import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi-redirect-production.up.railway.app/', {
            apiKey: 'c7157de2efaa49a9ac85a89b0354810c',
        });
    }
}

export default AppLoader;
