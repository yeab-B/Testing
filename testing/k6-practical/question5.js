
import http from 'k6/http';
import { Counter } from 'k6/metrics';

export const options = {
    vus: 50,
    duration: '15s',
};

const retrySuccess = new Counter('retry_success');

function requestWithRetry(url, retries = 3) {

    let response;

    for (let i = 0; i < retries; i++) {

        response = http.get(url);

        if (response.status === 200) {
            retrySuccess.add(1);
            return response;
        }
    }

    return response;
}

export default function () {
    requestWithRetry('https://test.k6.io/');
}