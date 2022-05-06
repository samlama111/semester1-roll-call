import { ObjectId } from "mongodb";
import { BaseRequest, BaseResponse, BaseConf } from "../base";
import {DbEnrollment} from "../../db/DbEnrollment";

export interface ReqEnroll extends BaseRequest {
    enrollment_id: ObjectId;
    student_id: ObjectId;
}

export interface ResEnroll extends BaseResponse {
    message: string
}

export const conf: BaseConf = {

}