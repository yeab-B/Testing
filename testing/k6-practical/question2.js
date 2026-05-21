import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';

const users = new SharedArray('users', function () {
    return JSON.parse(open('./users.json'));
});

export const options = {
    vus: users.length,
    iterations: users.length,

    thresholds: {
        http_req_failed: ['rate<1'],
        http_req_duration: [
            'p(90)<2000',
            'p(95)<2500',
            'p(99)<3000',
        ],
    },
};

export default function () {

    const user = users[__VU - 1];

    const payload = {
        login: user.username,
        password: user.password,
    };

    const params = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    let res = http.post(
        'https://httpbin.org/post',
        payload,
        params
    );

    check(res, {
        'response received': (r) => r.status > 0,
    });
}