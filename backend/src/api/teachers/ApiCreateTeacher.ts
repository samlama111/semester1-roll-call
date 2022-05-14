import { ObjectId } from "mongodb";
import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { DbTeacher } from "../../shared/db/DbTeacher";
import { ReqCreateTeacher, ResCreateTeacher } from "../../shared/protocols/teachers/PtlCreateTeacher";

export async function ApiCreateTeacher(call: ApiCall<ReqCreateTeacher, ResCreateTeacher>) {
    if (!call.req.email || !call.req.firstname) {
        call.error('Please provide correct teacher data')
        return
    }

    const newTeacher: DbTeacher = {
        _id: new ObjectId(),
        uid: call.currentUserId as string,
        firstname: call.req.firstname,
        lastname: call.req.lastname,
        email: call.req.email
    }
     
    const res = await Global.collection('Teacher').insertOne(newTeacher)

    if(!res.acknowledged) {
        call.error('Create was not successful')
        return
    }

    call.succ({
        teacher: newTeacher
    })
}