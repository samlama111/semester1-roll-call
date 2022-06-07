import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'
import { check, group, sleep } from 'k6'
import http from 'k6/http'
import { Rate, Trend } from 'k6/metrics'

const baseUrl = 'http://3.71.128.229'
// eslint-disable-next-line max-len
const validJwt = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZmOGUxY2IxNTY0MTQ2M2M2ZGYwZjMzMzk0YjAzYzkyZmNjODg5YWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbHNkLWF1dGgiLCJhdWQiOiJsc2QtYXV0aCIsImF1dGhfdGltZSI6MTY1Mjc3MTgzMywidXNlcl9pZCI6Ijlsek52MTE5SklldFVpWnlFdElzRnZKY0gwRTMiLCJzdWIiOiI5bHpOdjExOUpJZXRVaVp5RXRJc0Z2SmNIMEUzIiwiaWF0IjoxNjUzOTk5ODExLCJleHAiOjE2NTQwMDM0MTEsImVtYWlsIjoibmFkZWNoMkB2eWRlY2guY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm5hZGVjaDJAdnlkZWNoLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.0CyVNolrUrTQaInFYCVS9uR34EBmoDge7sy8RyL4nm1YeXBp54IOLQkq7YnO0RY4d0FzMV4LNctGUFEJ-UjycFDJjO1xOHCNGduKACtdiq771DDQkAJkj4sgrf-goQxfQ_dvrPuKSeTrtYztjEH4hyScEVRJFus235dlYOL6Qj_6wOunZ2kUEhtFXUk0Vx-HUxykRgt1AFX1bHNpYisn-e4l980k-44wANzLjWisFYzmPSeXuhLA-uB9spKQxYcI7I7Hv5XU2JJylGzsJexr8CBUN41f-vf4x7qbkQ9KCn66F_XUEgAwmCBI5Jj7z62tomFExLJMpiw4YWcum-__-A'

const getCoursesErrorRate = new Rate('errors')
const getCoursesTrend = new Trend('Get courses')

export function handleSummary(data) {
    return {
        stdout: textSummary(data, { indent: ' ', enableColor: true }),
        'stress_getCourses.html': htmlReport(data)
    }
}

export const options = {
    stages: [
        { duration: '30s', target: 25 },
        { duration: '30s', target: 25 },
        { duration: '30s', target: 50 },
        { duration: '30s', target: 50 },
        { duration: '30s', target: 100 },
        { duration: '30s', target: 100 },
        { duration: '30s', target: 200 },
        { duration: '30s', target: 200 },
        { duration: '30s', target: 400 },
        { duration: '30s', target: 400 },
        { duration: '2m', target: 0 },
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
