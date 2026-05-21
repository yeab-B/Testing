// question1.js

import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 50,
    duration: '30s',

    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: [
            'p(90)<400',
            'p(95)<500',
            'p(99)<1000',
        ],
    },
};

export default function () {

    let res = http.get('https://test.k6.io/');

    check(res, {
        'status is 200': (r) => r.status === 200,
    });
}