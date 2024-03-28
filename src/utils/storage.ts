const storage = {
    clearToken: () => {
        localStorage.removeItem('token');
    },
    getToken: () => {
        let parsedJson: any;
        parsedJson = JSON.parse(localStorage.getItem('token'));

        //Backwards Compatibility for existing tokens
        if (typeof parsedJson === 'object') {
            return parsedJson?.token;
        }

        return parsedJson;
    },
    setToken: (token: string) => {
        localStorage.setItem('token', JSON.stringify(token));
    },
};

export default storage;