import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { sleep, check, group } from 'k6'
import http from 'k6/http'

const baseUrl = 'http://3.71.128.229'

export function handleSummary(data) {
    return {
        stdout: textSummary(data, { indent: ' ', enableColor: true }),
        'result.html': htmlReport(data)
    }
}

export const options = {
    stages: [
        { duration: '10s', target: 500 },
        { duration: '10s', target: 2000 },
        { duration: '10s', target: 0 },
    ]
}

export default () => {
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    group('Get classes check', () => {
        const url = `${baseUrl}/classes/GetClasses`
        const payload = {}
        const res = http.post(url, payload, params)
        check(res, {
            
        })
    })

    group('Get courses check', () => {
        const url = `${baseUrl}/courses/GetCourses`
        const payload = {}
        const res = http.post(url, payload, params)
    })

    group('Get student roll call check', () => {
        const url = `${baseUrl}/roll-call/GetRollCall`
        const payload = {}
        const res = http.post(url, payload, params)
    })

    group('Get teacher roll call check', () => {
        const url = `${baseUrl}/roll-call/TeacherGetRollCall`
        const payload = {}
        const res = http.post(url, payload, params)
    })

    group('Create course', () => {
        const url = `${baseUrl}/courses/CreateCourse`
        const payload = {}
        const res = http.post(url, payload, params)
    })

    // not appropriate to test, bc one course can only have one 
    // active role call, i.e. we'd need a ton of existing test data
    // else we could just do it anyway and check for specific error
    group('Start roll call', () => {
        const url = `${baseUrl}/roll-call/StartRollCall`
        const payload = {}
        const res = http.post(url, payload, params)
    })

    // kinda same as the above
    group('Student enroll', () => {
        const url = `${baseUrl}/roll-call/Enroll`
        const payload = {}
        const res = http.post(url, payload, params)
    })

    sleep(1)
}
