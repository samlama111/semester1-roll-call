import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { ReqGetCourses, ResGetCourses } from "../../shared/protocols/courses/PtlGetCourses";

export async function ApiGetCourses(call: ApiCall<ReqGetCourses, ResGetCourses>) {
    // TODO: refactor/make prettier :--) 
    let courses
    if (call.req.class_id) {
        // query db for this teacher's classes
        courses = await Global.collection('Course').find({
            teacher_id: call.currentUserId,
            class_id: call.req.class_id
        }).toArray()
    }
    else {
        // query db for this teacher's classes
        courses = await Global.collection('Course').find({
            teacher_id: call.currentUserId
        }).toArray()
    }

    if(!courses) {
        call.error('No courses found')
        return
    }

    call.succ({
        courses: courses,
    });
}