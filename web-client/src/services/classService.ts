import { client } from '../client'

// teacher can get his classes
export async function getClasses(teacherId: string) {
    const res = await client.callApi('classes/GetClasses', {
        teacher_id: teacherId
    })
    return res
}

// get active enrollment where the student has not enrolled yet
export async function getEnrollment() {
    const res = await client.callApi('roll-call/GetRollCall', {
        student_id: '6274e9d4ed42132c92834a73'
    })
    return res
}

// student can enroll in active enrollment
export async function enroll() {
    const res = await client.callApi('roll-call/Enroll', {
        student_id: '6274e9d4ed42132c92834a73',
        enrollment_id: '627514deed42132c92834a85'
    })
    return res
}

// teacher can start roll call
export async function startRollCall() {
    return client.callApi('roll-call/StartRollCall', { course_id: 'xxx', class_id: 'xxx' })
}

// teacher can end roll call
export async function endRollCall() {
    return client.callApi('roll-call/EndRollCall', { enrollment_id: 'xxx' })
}
