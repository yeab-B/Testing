// ============================
// QUESTION 8
// question8.js
// ============================

import http from 'k6/http';

export const options = {
    stages: [
        { duration: '5m', target: 20 },
        { duration: '10m', target: 20 },
        { duration: '2m', target: 0 },
    ],

    thresholds: {
        http_req_failed: ['rate<0.10'],
        http_req_duration: [
            'avg<15000',
            'p(90)<10000',
            'p(95)<12000',
            'p(99)<15000',
        ],
    },
};

export default function () {
    http.get('https://test.k6.io/');
}