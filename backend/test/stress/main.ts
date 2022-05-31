import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'
import { check, group } from 'k6'
import http from 'k6/http'

const baseUrl = 'http://3.71.128.229'
// eslint-disable-next-line max-len
const validJwt = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZmOGUxY2IxNTY0MTQ2M2M2ZGYwZjMzMzk0YjAzYzkyZmNjODg5YWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbHNkLWF1dGgiLCJhdWQiOiJsc2QtYXV0aCIsImF1dGhfdGltZSI6MTY1Mjc3MTgzMywidXNlcl9pZCI6Ijlsek52MTE5SklldFVpWnlFdElzRnZKY0gwRTMiLCJzdWIiOiI5bHpOdjExOUpJZXRVaVp5RXRJc0Z2SmNIMEUzIiwiaWF0IjoxNjUzOTg1NzA2LCJleHAiOjE2NTM5ODkzMDYsImVtYWlsIjoibmFkZWNoMkB2eWRlY2guY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm5hZGVjaDJAdnlkZWNoLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.U-0z8JMudqFxgHTv0zaRJZoJLDaSxe_9AyHfXgkv5vHbaFKGvGG1nTGWl2Q6_2_GHGWzAFtv212U0GKbh2pbHe-gy1-NC5jweveAcBBbIOQ8KNp1FN4L3wzQENW3Db3ndOtaVO0N5bGgzRJz0sjpQr2YcKdjEftuI7d6A1n2q9CqYPc81CCNHDfVoQeGPLBnwWpIF5G4remlavYNVOXwtxA99c4XmLxSArJxKSoHodH54nJFrfsv0BWkR0rQ4_3lSeNMBpOdIF_YeNicjLVusqmprZVovJ3k4Xa7JWmw_K37ZUEW5fHLNYB5Fq5AoeZH0_d-poqtTN9tkRUVEoKCMg'

export function handleSummary(data) {
    return {
        stdout: textSummary(data, { indent: ' ', enableColor: true }),
        'result.html': htmlReport(data)
    }
}

export const options = {
    stages: [
        { duration: '10s', target: 50 },
        // { duration: '10s', target: 200 },
        { duration: '10s', target: 0 },
    ]
}

export default () => {
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    group('Get teacher roll call check', () => {
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
            'request should not be succesful': (response) => !response.json().isSucc,
        })
    })
    
    let currentEnrollmentId = ''
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

    group('Get teacher roll call check', () => {
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
            'roll-call is started': (response) => !response.json().res.enrollment.roll_call_started,
        })
    })
    // group('Get classes check', () => {
    //     const url = `${baseUrl}/classes/GetClasses`
    //     const payload = {
    //         jwtToken: validJwt,
    //     }
    //     const res = http.post(url, JSON.stringify(payload), params)
    //     check(res, {
    //         'status code should be 200': (response) => response.status === 200,
    //     })
    //     check(res, {
    //         'request should be succesful': (response) => response.json().isSucc,
    //     })
    //     check(res, {
    //         'response should have gotten the right course': (response) => response.json().res.classes.length > 0,
    //     })
    // })

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

    // sleep(1)
}
