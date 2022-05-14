import { ServiceProto } from 'tsrpc-proto';
import { ReqGetByCourse, ResGetByCourse } from './attendance/PtlGetByCourse';
import { ReqGetClasses, ResGetClasses } from './classes/PtlGetClasses';
import { ReqGetCourses, ResGetCourses } from './courses/PtlGetCourses';
import { ReqEndRollCall, ResEndRollCall } from './roll-call/PtlEndRollCall';
import { ReqEnroll, ResEnroll } from './roll-call/PtlEnroll';
import { ReqGetRollCall, ResGetRollCall } from './roll-call/PtlGetRollCall';
import { ReqStartRollCall, ResStartRollCall } from './roll-call/PtlStartRollCall';
import { ReqCreateStudent, ResCreateStudent } from './students/PtlCreateStudent';
import { ReqCreateTeacher, ResCreateTeacher } from './teachers/PtlCreateTeacher';

export interface ServiceType {
    api: {
        "attendance/GetByCourse": {
            req: ReqGetByCourse,
            res: ResGetByCourse
        },
        "classes/GetClasses": {
            req: ReqGetClasses,
            res: ResGetClasses
        },
        "courses/GetCourses": {
            req: ReqGetCourses,
            res: ResGetCourses
        },
        "roll-call/EndRollCall": {
            req: ReqEndRollCall,
            res: ResEndRollCall
        },
        "roll-call/Enroll": {
            req: ReqEnroll,
            res: ResEnroll
        },
        "roll-call/GetRollCall": {
            req: ReqGetRollCall,
            res: ResGetRollCall
        },
        "roll-call/StartRollCall": {
            req: ReqStartRollCall,
            res: ResStartRollCall
        },
        "students/CreateStudent": {
            req: ReqCreateStudent,
            res: ResCreateStudent
        },
        "teachers/CreateTeacher": {
            req: ReqCreateTeacher,
            res: ResCreateTeacher
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 13,
    "services": [
        {
            "id": 9,
            "name": "attendance/GetByCourse",
            "type": "api",
            "conf": {}
        },
        {
            "id": 0,
            "name": "classes/GetClasses",
            "type": "api",
            "conf": {}
        },
        {
            "id": 1,
            "name": "courses/GetCourses",
            "type": "api",
            "conf": {}
        },
        {
            "id": 4,
            "name": "roll-call/EndRollCall",
            "type": "api",
            "conf": {}
        },
        {
            "id": 5,
            "name": "roll-call/Enroll",
            "type": "api",
            "conf": {}
        },
        {
            "id": 6,
            "name": "roll-call/GetRollCall",
            "type": "api",
            "conf": {}
        },
        {
            "id": 7,
            "name": "roll-call/StartRollCall",
            "type": "api",
            "conf": {}
        },
        {
            "id": 10,
            "name": "students/CreateStudent",
            "type": "api",
            "conf": {}
        },
        {
            "id": 11,
            "name": "teachers/CreateTeacher",
            "type": "api",
            "conf": {}
        }
    ],
    "types": {
        "attendance/PtlGetByCourse/ReqGetByCourse": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "course_id",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    }
                }
            ]
        },
        "base/BaseRequest": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "jwtToken",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 1,
                    "name": "currentUserId",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "attendance/PtlGetByCourse/ResGetByCourse": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 2,
                    "name": "attendance",
                    "type": {
                        "type": "Reference",
                        "target": "../models/CourseAttendance/CourseAttendance"
                    }
                }
            ]
        },
        "base/BaseResponse": {
            "type": "Interface"
        },
        "../models/CourseAttendance/CourseAttendance": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "attendance_info",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
                    }
                },
                {
                    "id": 1,
                    "name": "student_info",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Interface",
                            "properties": [
                                {
                                    "id": 0,
                                    "name": "student",
                                    "type": {
                                        "type": "Reference",
                                        "target": "../db/DbStudent/DbStudent"
                                    }
                                },
                                {
                                    "id": 1,
                                    "name": "enrolled",
                                    "type": {
                                        "type": "Array",
                                        "elementType": {
                                            "type": "Boolean"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "id": 2,
                    "name": "course_name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "class_name",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "../db/DbStudent/DbStudent": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../db/DbUser/DbUser"
                    }
                }
            ]
        },
        "../db/DbUser/DbUser": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../db/DbBaseEntity/DbBaseEntity"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "uid",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "firstname",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "lastname",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "email",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "../db/DbBaseEntity/DbBaseEntity": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "_id",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    }
                },
                {
                    "id": 1,
                    "name": "create",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "time",
                                "type": {
                                    "type": "String"
                                }
                            },
                            {
                                "id": 1,
                                "name": "uid",
                                "type": {
                                    "type": "Reference",
                                    "target": "?mongodb/ObjectId"
                                }
                            }
                        ]
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "update",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "time",
                                "type": {
                                    "type": "String"
                                }
                            },
                            {
                                "id": 1,
                                "name": "uid",
                                "type": {
                                    "type": "Reference",
                                    "target": "?mongodb/ObjectId"
                                }
                            }
                        ]
                    },
                    "optional": true
                }
            ]
        },
        "classes/PtlGetClasses/ReqGetClasses": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "classes/PtlGetClasses/ResGetClasses": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "classes",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../db/DbClass/DbClass"
                        }
                    }
                }
            ]
        },
        "../db/DbClass/DbClass": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../db/DbBaseEntity/DbBaseEntity"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "courses/PtlGetCourses/ReqGetCourses": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 1,
                    "name": "class_id",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    },
                    "optional": true
                }
            ]
        },
        "courses/PtlGetCourses/ResGetCourses": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "courses",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../db/DbCourse/DbCourse"
                        }
                    }
                }
            ]
        },
        "../db/DbCourse/DbCourse": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../db/DbBaseEntity/DbBaseEntity"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "teacher_id",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "class_id",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    }
                },
                {
                    "id": 5,
                    "name": "class_name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 6,
                    "name": "enrollments",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../db/DbEnrollment/DbEnrollment"
                        }
                    }
                },
                {
                    "id": 9,
                    "name": "students",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "../db/DbStudent/DbStudent"
                        }
                    }
                },
                {
                    "id": 8,
                    "name": "campus_id",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    }
                }
            ]
        },
        "../db/DbEnrollment/DbEnrollment": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../db/DbBaseEntity/DbBaseEntity"
                    }
                }
            ],
            "properties": [
                {
                    "id": 2,
                    "name": "date",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "roll_call_started",
                    "type": {
                        "type": "Boolean"
                    }
                },
                {
                    "id": 5,
                    "name": "enrolled_student_ids",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
                    }
                }
            ]
        },
        "roll-call/PtlEndRollCall/ReqEndRollCall": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "enrollment_id",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    }
                },
                {
                    "id": 1,
                    "name": "course_id",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    }
                }
            ]
        },
        "roll-call/PtlEndRollCall/ResEndRollCall": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "enrollment",
                    "type": {
                        "type": "Reference",
                        "target": "../db/DbEnrollment/DbEnrollment"
                    }
                }
            ]
        },
        "roll-call/PtlEnroll/ReqEnroll": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "enrollment_id",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    }
                },
                {
                    "id": 2,
                    "name": "location",
                    "type": {
                        "type": "Reference",
                        "target": "../models/Location/Location"
                    }
                }
            ]
        },
        "../models/Location/Location": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "lat",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "long",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "roll-call/PtlEnroll/ResEnroll": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "message",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "roll-call/PtlGetRollCall/ReqGetRollCall": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "roll-call/PtlGetRollCall/ResGetRollCall": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 2,
                    "name": "course_info",
                    "type": {
                        "type": "Partial",
                        "target": {
                            "type": "Reference",
                            "target": "../db/DbCourse/DbCourse"
                        }
                    }
                },
                {
                    "id": 3,
                    "name": "roll_call_id",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    }
                },
                {
                    "id": 4,
                    "name": "is_student_enrolled",
                    "type": {
                        "type": "Boolean"
                    }
                }
            ]
        },
        "roll-call/PtlStartRollCall/ReqStartRollCall": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "course_id",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    }
                }
            ]
        },
        "roll-call/PtlStartRollCall/ResStartRollCall": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 1,
                    "name": "roll_call",
                    "type": {
                        "type": "Reference",
                        "target": "../db/DbEnrollment/DbEnrollment"
                    }
                }
            ]
        },
        "students/PtlCreateStudent/ReqCreateStudent": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "firstname",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "lastname",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "email",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "students/PtlCreateStudent/ResCreateStudent": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "student",
                    "type": {
                        "type": "Reference",
                        "target": "../db/DbStudent/DbStudent"
                    }
                }
            ]
        },
        "teachers/PtlCreateTeacher/ReqCreateTeacher": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "firstname",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "lastname",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "email",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "teachers/PtlCreateTeacher/ResCreateTeacher": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "teacher",
                    "type": {
                        "type": "Reference",
                        "target": "../db/DbTeacher/DbTeacher"
                    }
                }
            ]
        },
        "../db/DbTeacher/DbTeacher": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "../db/DbUser/DbUser"
                    }
                }
            ]
        }
    }
};