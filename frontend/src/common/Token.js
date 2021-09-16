export class Token {

    static getTokenConfig(getState) {

        // Get token from state
        const token = getState().auth.token;

        // Headers
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // If token, add to headers config
        if (token) {
            config.headers['Authorization'] = `Token ${token}`
        }

        return config

    }
}

export default Token

