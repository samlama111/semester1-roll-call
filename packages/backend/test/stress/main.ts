import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js'
import { check, sleep } from 'k6'
import http from 'k6/http'
import { Rate, Trend } from 'k6/metrics'

const baseUrl = 'http://3.71.128.229'

const getCoursesErrorRate = new Rate('errors')
const getCoursesTrend = new Trend('Get courses')

export function handleSummary(data) {
    return {
        stdout: textSummary(data, { indent: ' ', enableColor: true }),
        // 'result3_supercluster.html': htmlReport(data)
    }
}

export const options = {
    stages: [
        { duration: '30s', target: 30 },
        // { duration: '10s', target: 200 },
        // { duration: '10s', target: 0 },
    ]
}

export default () => {
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const urlGetCourses = `${baseUrl}/course/GetCourses`

    const requests = {
        'Get courses': {
            method: 'POST',
            url: urlGetCourses,
            params
        }
    }

    const responses = http.batch(requests)
    const getCourses = responses['Get courses']

    check(getCourses, {
        'status is 200': (r) => r.status === 200,
    }) || getCoursesErrorRate.add(1)

    getCoursesTrend.add(getCourses.timings.duration)

    sleep(1)
}
