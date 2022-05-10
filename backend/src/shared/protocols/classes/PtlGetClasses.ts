import { ObjectId } from "mongodb";
import { DbClass } from "../../db/DbClass";
import { BaseConf, BaseRequest, BaseResponse } from "../base";

export interface ReqGetClasses extends BaseRequest {
    teacher_id: ObjectId;
}

export interface ResGetClasses extends BaseResponse {
    classes: DbClass[];
}

export const conf: BaseConf = {
    
}