import { ObjectId } from "mongodb";
import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { DbStudent } from "../../shared/db/DbStudent";
import { ReqCreateStudent, ResCreateStudent } from "../../shared/protocols/students/PtlCreateStudent";

export async function ApiCreateStudent(call: ApiCall<ReqCreateStudent, ResCreateStudent>) {
    if (!call.req.email || !call.req.firstname || !call.req.lastname) {
        call.error('Please provide correct student data')
        return
    }

    const newStudent: DbStudent = {
        _id: new ObjectId(),
        uid: call.currentUserId as string,
        firstname: call.req.firstname,
        lastname: call.req.lastname,
        email: call.req.email
    }
     
    const res = await Global.collection('Student').insertOne(newStudent)

    if(!res.acknowledged) {
        call.error('Create was not successful')
        return
    }

    call.succ({
        student: newStudent
    })
}