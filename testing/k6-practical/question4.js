
import http from 'k6/http';

export const options = {
    scenarios: {
        ramping_rate: {
            executor: 'ramping-arrival-rate',
            startRate: 10,
            timeUnit: '1s',

            stages: [
                { target: 100, duration: '20s' },
                { target: 100, duration: '30s' },
                { target: 20, duration: '20s' },
            ],

            preAllocatedVUs: 50,
            maxVUs: 1000,
        },
    },

    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: [
            'p(90)<10000',
            'p(95)<15000',
            'p(99)<20000',
        ],
    },
};

export default function () {
    http.get('https://test.k6.io/');
}