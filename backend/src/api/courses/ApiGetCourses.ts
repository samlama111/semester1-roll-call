import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { ReqGetCourses, ResGetCourses } from "../../shared/protocols/courses/PtlGetCourses";

export async function ApiGetCourses(call: ApiCall<ReqGetCourses, ResGetCourses>) {
    if (!call.req.teacher_id) {
        call.error('Please provide teacher ID');
        return;
    }

    // query db for this teacher's classes
    const courses = await Global.collection('Course').find({
        teacher_ids: call.req.teacher_id
    }).toArray()

    call.succ({
        courses: courses,
    });
}