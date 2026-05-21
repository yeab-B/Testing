// ============================
// QUESTION 10
// question10.js
// ============================

import http from 'k6/http';

export const options = {
    stages: [
        { duration: '10s', target: 30 },
        { duration: '30s', target: 30 },
        { duration: '10s', target: 10 },
    ],

    thresholds: {
        http_req_failed: ['rate<0.10'],
        http_req_duration: [
            'p(95)<15000',
        ],
    },
};

export default function () {
    http.get('https://test.k6.io/');
}