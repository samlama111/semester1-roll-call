import { Global } from "./Global"

export const getCourseByTeacherId = async (teacherId: string | undefined, errorFunction: (errorMessage: string) => void) => {
    const courses = await Global.collection('Course').find({
        teacher_id: teacherId
    }).toArray()

    if(!courses) {
        errorFunction('No classes found')
        return []
    }

    return courses
}