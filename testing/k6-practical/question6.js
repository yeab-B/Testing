
import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 40,
    duration: '45s',

    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: [
            'p(90)<60000',
            'p(95)<60000',
            'p(99)<60000',
        ],
    },
};

export default function () {

    let res = http.get(
        'https://pokeapi.co/api/v2/pokemon/ditto'
    );

    check(res, {
        'status 200': (r) => r.status === 200,
    });
}