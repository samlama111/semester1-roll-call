import { ObjectId } from "mongodb";
import { DbEnrollment } from "../../db/DbEnrollment";
import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqEndRollCall extends BaseRequest {
    enrollment_id: ObjectId;
    student_id: ObjectId;
}

export interface ResEndRollCall extends BaseResponse {
    enrollment: DbEnrollment;
}

export const conf: BaseConf = {
    
}