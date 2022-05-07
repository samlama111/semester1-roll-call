import { ObjectId } from "mongodb";
import { BaseRequest, BaseResponse, BaseConf } from "../base";
import {DbEnrollment} from "../../db/DbEnrollment";

export interface ReqGetRollCall extends BaseRequest {
    student_id: ObjectId;
}

export interface ResGetRollCall extends BaseResponse {
    roll_call_id: ObjectId
}

export const conf: BaseConf = {
    
}