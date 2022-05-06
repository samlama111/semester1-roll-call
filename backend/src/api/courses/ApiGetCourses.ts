import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { ReqGetCourses, ResGetCourses } from "../../shared/protocols/courses/PtlGetCourses";

export async function ApiGetCourses(call: ApiCall<ReqGetCourses, ResGetCourses>) {
    if (!call.req.teacher_id) {
        call.error('Please provide teacher_id');
        return;
    }

    // query db for this teacher's classes
    const courses = await Global.collection('Course').find({
        teacher_ids: call.req.teacher_id
    }).toArray()

    if(!courses) {
        call.error('No courses found')
        return
    }

    call.succ({
        courses: courses,
    });
}