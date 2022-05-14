import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { ReqGetCourses, ResGetCourses } from "../../shared/protocols/courses/PtlGetCourses";

export async function ApiGetCourses(call: ApiCall<ReqGetCourses, ResGetCourses>) {
    const teacherId = call.currentUserId,
    dbCourses = Global.collection('Course')

    const courses = call.req.class_id ? await dbCourses.find({
        teacher_id: teacherId, class_id: call.req.class_id}).toArray() :
        await dbCourses.find({teacher_id: teacherId}).toArray()

    if(!courses) {
        call.error('No courses found')
        return
    }

    call.succ({
        courses,
    });
}