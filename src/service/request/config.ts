let BASE_URL: string;

if (process.env.NODE_ENV === 'development') {
    BASE_URL = '';
} else if (process.env.NODE_ENV === 'production') {
    BASE_URL = '';
} else {
    BASE_URL = '';
}

export { BASE_URL };
