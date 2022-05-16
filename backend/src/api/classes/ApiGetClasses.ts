import { ApiCall } from "tsrpc";
import { getCourseByTeacherId } from "../../db/Course";
import { ReqGetClasses, ResGetClasses } from "../../shared/protocols/classes/PtlGetClasses";

export async function ApiGetClasses(call: ApiCall<ReqGetClasses, ResGetClasses>) {
    // query db for this teacher's classes
    const courses = await getCourseByTeacherId(call.currentUserId, call.error)

    // get class info from Course objects
    const classInfo = courses.map(({class_name, class_id}) => {
        return {
            name: class_name,
            _id: class_id
        }
    })

    call.succ({
        classes: classInfo,
    });
}