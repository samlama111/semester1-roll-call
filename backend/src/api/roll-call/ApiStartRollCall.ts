import { ObjectId } from "mongodb";
import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { ReqStartRollCall, ResStartRollCall } from "../../shared/protocols/roll-call/PtlStartRollCall";

export async function ApiStartRollCall(call: ApiCall<ReqStartRollCall, ResStartRollCall>) {
    if (!call.req.course_id) {
        call.error('Please provide class_id and course_id')
        return
    }

    const currentDate = new Date().toISOString()
    const res = await Global.collection('Course').updateOne(
        { 
            _id: call.req.course_id
        },
        { 
            $push: {
                "enrollments": {
                    _id: new ObjectId(),
                    date: currentDate,
                    roll_call_started: true,
                    enrolled_student_ids: [],
                }
            }
        }
    )

    if(!res.acknowledged) {
        call.error('Role call could not be started')
        return
    }

    call.succ({
        message: 'Role call started'
    })
}