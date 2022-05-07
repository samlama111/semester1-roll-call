import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { ReqGetCourses, ResGetCourses } from "../../shared/protocols/courses/PtlGetCourses";

export async function ApiGetCourses(call: ApiCall<ReqGetCourses, ResGetCourses>) {
    if (!call.req.teacher_id) {
        call.error('Please provide teacher_id');
        return;
    }

    let courses
    if (call.req.class_id) {
        // query db for this teacher's classes
        courses = await Global.collection('Course').find({
            teacher_ids: call.req.teacher_id,
            class_ids: call.req.class_id
        }).toArray()
    }
    else {
        // query db for this teacher's classes
        courses = await Global.collection('Course').find({
            teacher_ids: call.req.teacher_id
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