import { ApiCall } from "tsrpc";
import { getCoursesByTeacherClassId, getCoursesByTeacherId } from "../../db/Course";
import { ReqGetCourses, ResGetCourses } from "../../shared/protocols/courses/PtlGetCourses";

export async function ApiGetCourses(call: ApiCall<ReqGetCourses, ResGetCourses>) {
    const courses = call.req.class_id 
        ? await getCoursesByTeacherClassId(call.currentUserId, call.req.class_id, call.error)
        : await getCoursesByTeacherId(call.currentUserId, call.error)

    call.succ({
        courses,
    });
}