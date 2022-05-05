import { ApiCall } from "tsrpc";
import { server } from "..";
import { Global } from "../db/Global";
import { ReqGetClasses, ResGetClasses } from "../shared/protocols/PtlGetClasses";

export async function ApiGetClasses(call: ApiCall<ReqGetClasses, ResGetClasses>) {
    if (!call.req.teacher_id) {
        call.error('Please provide teacher ID');
        return;
    }

    // query db for this teacher's classes
    const classes = await Global.collection('Class').find({
        teachers: call.req.teacher_id
    }).toArray();

    server.logger.log(classes)

    call.succ({
        classes: classes,
    });
}