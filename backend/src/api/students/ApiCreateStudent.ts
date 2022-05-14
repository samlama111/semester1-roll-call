import { ApiCall } from "tsrpc";
import { ReqCreateStudent, ResCreateStudent } from "../../shared/protocols/students/PtlCreateStudent";

export async function ApiCreateStudent(call: ApiCall<ReqCreateStudent, ResCreateStudent>) {
    // TODO
    call.error('API Not Implemented');
}