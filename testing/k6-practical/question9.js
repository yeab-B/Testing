// ============================
// QUESTION 9
// question9.js
// ============================

import http from 'k6/http';

export const options = {
    stages: [
        { duration: '5m', target: 20 },
        { duration: '5m', target: 50 },
        { duration: '5m', target: 50 },
    ],

    thresholds: {
        http_req_failed: ['rate<0.10'],
    },
};

export default function () {
    http.get('https://test.k6.io/');
}