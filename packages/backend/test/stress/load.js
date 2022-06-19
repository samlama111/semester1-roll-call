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
        // 'stress_getCourses.html': htmlReport(data)
    }
}

export const options = {
    stages: [
        { duration: '30s', target: 50 },
    ]
}

export default () => {
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const urlGetCourses = `${baseUrl}/courses/GetCourses`
    const getCoursePayload = JSON.stringify({
        jwtToken: '',
        currentUserId: '6AZdlTepanQnDDXk1AYdvIRNiUt2',
        class_id: '62955eda489c8f9699595871'
    })

    const requests = {
        'Get courses': {
            method: 'POST',
            url: urlGetCourses,
            params, 
            body: getCoursePayload
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
