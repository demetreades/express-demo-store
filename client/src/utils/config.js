let API_ENDPOINT;

if (process.env.NODE_ENV === 'production') {
	API_ENDPOINT = 'https://express-demo-store.herokuapp.com'
}

if (process.env.NODE_ENV === 'development') {
	API_ENDPOINT = 'http://localhost:5000'
}

export default API_ENDPOINT;
