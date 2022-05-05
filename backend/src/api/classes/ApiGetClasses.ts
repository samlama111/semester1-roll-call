import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { ReqGetClasses, ResGetClasses } from "../../shared/protocols/classes/PtlGetClasses";

export async function ApiGetClasses(call: ApiCall<ReqGetClasses, ResGetClasses>) {
    if (!call.req.teacher_id) {
        call.error('Please provide teacher ID');
        return;
    }

    // query db for this teacher's classes
    const classes = await Global.collection('Class').find({
        teacher_ids: call.req.teacher_id
    }).toArray()

    call.succ({
        classes: classes,
    });
}