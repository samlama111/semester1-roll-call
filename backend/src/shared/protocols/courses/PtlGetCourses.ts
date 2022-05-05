import { ObjectId } from "mongodb";
import { DbCourse } from "../../db/DbCourse";
import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqGetCourses extends BaseRequest {
    teacher_id: ObjectId;
}

export interface ResGetCourses extends BaseResponse {
    courses: DbCourse[];
}

export const conf: BaseConf = {
    
}