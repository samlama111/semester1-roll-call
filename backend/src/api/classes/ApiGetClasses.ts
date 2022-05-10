import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { ReqGetClasses, ResGetClasses } from "../../shared/protocols/classes/PtlGetClasses";

export async function ApiGetClasses(call: ApiCall<ReqGetClasses, ResGetClasses>) {
    if (!call.req.teacher_id) {
        call.error('Please provide teacher_id');
        return;
    }

    // query db for this teacher's classes
    const courses = await Global.collection('Course').find({
        teacher_id: call.req.teacher_id
    }).toArray()

    // get class info from Course objects
    const classInfo = courses.map(({class_name, class_id}) => {
        return {
            name: class_name,
            _id: class_id
        }
    })

    if(!courses) {
        call.error('No classes found')
        return
    }

    call.succ({
        classes: classInfo,
    });
}