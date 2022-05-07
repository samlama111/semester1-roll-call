import { ApiCall } from "tsrpc";
import { ReqGetByClass, ResGetByClass } from "../../shared/protocols/attendance/PtlGetByClass";

export async function ApiGetByClass(call: ApiCall<ReqGetByClass, ResGetByClass>) {
    // TODO
    call.error('API Not Implemented');
}