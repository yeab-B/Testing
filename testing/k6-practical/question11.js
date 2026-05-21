// ============================
// QUESTION 11
// question11.js
// ============================

import http from 'k6/http';

export const options = {
    vus: 20,
    duration: '1m',

    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<15000'],
    },
};

export default function () {
    http.get('https://test.k6.io/');
}