
import http from 'k6/http';

export const options = {
    vus: 30,
    duration: '20s',
};

export default function () {
    http.get(
        'https://jsonplaceholder.typicode.com/posts'
    );
}