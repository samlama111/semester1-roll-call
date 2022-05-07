import { ObjectId } from "mongodb";
import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { ReqGetRollCall, ResGetRollCall } from "../../shared/protocols/roll-call/PtlGetRollCall";

export async function ApiGetRollCall(call: ApiCall<ReqGetRollCall, ResGetRollCall>) {
    if (!call.req.student_id) {
        call.error('Please provide student_id')
        return
    }

    const roll_call = await Global.collection('Course').aggregate(
        [
            {
                $match: { student_ids: call.req.student_id,  },
            },
            { $addFields: { last: { $last: "$enrollments" } } },
            { $match: { "last.roll_call_started": true,
            "last.enrolled_student_ids": {$nin : [call.req.student_id]} ,
            }
            }
        ]
    ).toArray()

    if(!roll_call || roll_call.length <= 0) {
        call.error('Student is already enrolled, or no ongoing roll call found')
        return
    }

    call.succ({
        roll_call_id: roll_call[0].last._id
    })
}