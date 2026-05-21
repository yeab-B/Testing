
import http from 'k6/http';

export const options = {
    scenarios: {
        constant_request_rate: {
            executor: 'constant-arrival-rate',
            rate: 50,
            timeUnit: '1s',
            duration: '1m',
            preAllocatedVUs: 10,
            maxVUs: 100,
        },
    },

    thresholds: {
        http_req_duration: [
            'p(90)<400',
            'p(95)<500',
            'p(99)<1000',
        ],
    },
};

export default function () {
    http.get('https://test.k6.io/');
}