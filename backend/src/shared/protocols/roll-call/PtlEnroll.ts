import { ObjectId } from "mongodb";
import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqEnroll extends BaseRequest {
    enrollment_id: ObjectId;
    student_id: ObjectId;
    location: {
        lat: number;
        long: number;
    }
}

export interface ResEnroll extends BaseResponse {
    message: string
}

export const conf: BaseConf = {

}