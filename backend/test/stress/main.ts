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
    const getCoursePayload = {
        "jwtToken": "",
        "currentUserId": "6AZdlTepanQnDDXk1AYdvIRNiUt2",
        "class_id": "62955eda489c8f9699595871"
    }

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


    /* group('Get teacher roll call check', () => {
        const url = `${baseUrl}/roll-call/TeacherGetRollCall`
        const payload = {
            course_id: '627f6d82947aa50a97eb8755',
            currentUserId: '628126b4e69cdde1bf8b591b',
            jwtToken: ''
        }
        const res = http.post(url, JSON.stringify(payload), params)
        check(res, {
            'status code should be 200': (response) => response.status === 200,
        })
        check(res, {
            'request should not be succesful': (response) => !response.json().isSucc,
        })
    }) */
    
    /* let currentEnrollmentId = ''
    group('Start roll call', () => {
        const url = `${baseUrl}/roll-call/StartRollCall`
        const payload = {
            course_id: '627f6d82947aa50a97eb8755',
            jwtToken: validJwt
        }
        const res = http.post(url, JSON.stringify(payload), params)
        currentEnrollmentId = res.json().isSucc ? res.json().res.roll_call._id : ''
        check(res, {
            'status code should be 200': (response) => response.status === 200,
        })
        check(res, {
            'request should be succesful': (response) => response.json().isSucc,
        })
        check(res, {
            'roll-call is started': (response) => response.json().res.roll_call.roll_call_started,
        })
    })

    group('Get teacher roll call check again', () => {
        const url = `${baseUrl}/roll-call/TeacherGetRollCall`
        const payload = {
            course_id: '627f6d82947aa50a97eb8755',
            jwtToken: validJwt
        }
        const res = http.post(url, JSON.stringify(payload), params)
        check(res, {
            'status code should be 200': (response) => response.status === 200,
        })
        check(res, {
            'request should be succesful': (response) => response.json().isSucc,
        })
    })
    group('End roll call', () => {
        // console.log(currentEnrollmentId)
        const url = `${baseUrl}/roll-call/EndRollCall`
        const payload = {
            course_id: '627f6d82947aa50a97eb8755',
            enrollment_id: currentEnrollmentId,
            jwtToken: validJwt
        }
        const res = http.post(url, JSON.stringify(payload), params)
        // console.log(res.json().res.enrollment)
        check(res, {
            'status code should be 200': (response) => response.status === 200,
        })
        check(res, {
            'request should be succesful': (response) => response.json().isSucc,
        })
        check(res, {
            'roll-call is stopped': (response) => !response.json().res.enrollment.roll_call_started,
        })
    }) */
    /* group('Get classes check', () => {
         const url = `${baseUrl}/classes/GetClasses`
         const payload = {
             jwtToken: validJwt,
         }
         const res = http.post(url, JSON.stringify(payload), params)
         check(res, {
             'status code should be 200': (response) => response.status === 200,
         })
         check(res, {
             'request should be succesful': (response) => response.json().isSucc,
         })
         check(res, {
             'response should have gotten the right course': (response) => response.json().res.classes.length > 0,
         })
     }) */

    // group('Get courses check', () => {
    //     const url = `${baseUrl}/courses/GetCourses`
    //     const payload = {
    //         jwtToken: validJwt,
    //         class_id: '6274198e8f24d2c629f56959'
    //     }
    //     const res = http.post(url, JSON.stringify(payload), params)
    //     check(res, {
    //         'status code should be 200': (response) => response.status === 200,
    //     })
    //     check(res, {
    //         'request should be succesful': (response) => response.json().isSucc,
    //     })
    //     check(res, {
    //         'response should have gotten the right course': (response) => response.json().res.courses.length > 0,
    //     })
    // })

    // group('Get student roll call check', () => {
    //     const url = `${baseUrl}/roll-call/GetRollCall`
    //     const payload = {}
    //     const res = http.post(url, payload, params)
    //     console.log(res.json())
    //     check(res, {
    //         'status code should be 200': (response) => response.status === 200,
    //     })
    // })

    // group('Create course', () => {
    //     const url = `${baseUrl}/courses/CreateCourse`
    //     const payload = {}
    //     const res = http.post(url, payload, params)
    //     check(res, {
    //         'status code should be 200': (response) => response.status === 200,
    //     })
    // })

    // kinda same as the above
    // group('Student enroll', () => {
    //     const url = `${baseUrl}/roll-call/Enroll`
    //     const payload = {}
    //     const res = http.post(url, payload, params)
    //     check(res, {
    //         'status code should be 200': (response) => response.status === 200,
    //     })
    // })
}
