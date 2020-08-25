import {getRequest, postRequest, putRequest, deleteRequest} from '@/utils/api.js';

const role = {
    '1': 'admin',
    '2': 'teacher',
    '4': 'student',
    '5': 'visitor'
}

// ==================================== auth ==========================================
export const authUserPwd = () => postRequest(`/auth/login`);
export const authMObileCode = () => postRequest(`/auth/sms`);
export const logout = () => postRequest(`/auth/logout`);


// ==================================== class ==========================================
// 分页查询班级
export const queryClassByPage = (data) => getRequest('/class/', data);
// 分页查询班级
export const deleteClassById = (id) => {deleteRequest(`/class/${id}`)};
// 根据 id 查询班级
export const queryClassById = (id) => getRequest(`/class/${id}`);
// 根据 Id 更新班级信息
export const updateClassById = (data) => putRequest(`/class/`, data);
// 添加一个班级
export const addClass = (data) => postRequest(`/class/`, data);


// ==================================== student ==========================================
// 获取学生列表
export const queryStudentByPage = (data) => getRequest('/student/', data);
// 根据 id 获取学生信息
export const queryStudentById = (id) => getRequest(`/student/${id}`);
// 添加一个学生
export const addStudent = (data) => postRequest(`/student/`, data);
// 删除一个学生
export const deleteStudentById = (id) => deleteRequest(`/student/${id}`);
// 更新一个学生信息
export const updateStudentById = (data) => putRequest(`/student/`, data);

// ==================================== teacher ==========================================
// 获取teacher列表
export const queryTeacherByPage = (data) => getRequest('/teacher/', data);
// 根据 id 获取teacher信息
export const queryTeacherById = (id) => getRequest(`/teacher/${id}`);
// 添加一个teacher
export const addTeacher = (data) => postRequest(`/teacher/`, data);
// 删除一个teacher
export const deleteTeacherById = (id) => deleteRequest(`/teacher/${id}`);
// 更新一个teacher信息
export const updateTeacherById = (data) => putRequest(`/teacher/`, data);

// ==================================== visitor ==========================================
// 根据 id 获取 visitor 信息
export const queryVisitorById = (id) => getRequest(`/visitor/${id}`);


// ==================================== admin ==========================================
// 根据 id 获取 admin 信息
export const queryAdminById = (id) => getRequest(`/admin/${id}`);


// ==================================== course ==========================================
// 获取course列表
export const queryCourseByPage = (uri, data) => getRequest(uri, data);
// 根据 id 获取course信息
export const queryCourseById = (id) => getRequest(`/course/${id}`);
// 添加一个course
export const addCourse = (data) => postRequest(`/course/`, data);
// 删除一个course
export const deleteCourseById = (id) => deleteRequest(`/course/${id}`);
// 更新一个course信息
export const updateCourseById = (data) => putRequest(`/course/`, data);

// ==================================== score ==========================================
// 获取Score列表
export const queryScoreByPage = (uri ,data) => getRequest(uri, data);
// 根据 id 获取Score信息
export const queryScoreById = (id) => getRequest(`/score/${id}`);
// 添加一个Score
export const addScore = (data) => postRequest(`/score/`, data);
// 删除一个Score
export const deleteScoreById = (id) => deleteRequest(`/score/${id}`);
// 更新一个Score信息
export const updateScoreById = (data) => putRequest(`/score/`, data);

// ==================================== role ==========================================
export const queryAllRole = () => getRequest(`/role/`);
export const queryRoleById = (id) => getRequest(`/role/${id}`);

// ==================================== detail ==========================================
export const queryUserDetailById = (data) => getRequest(`/user/detail/`, data);
export const queryUserFriend = (data) => getRequest(`/user/friend/`, data);

// ==================================== 可能公用的列表 ==========================================
// ======================= class ========================
// 根据 collegeId 查class列表
export const queryClassByCollegeId = (id) => getRequest(`/class/college/${id}`);
// 根据 majorId 查 class 列表
export const queryClassByMajorId = (id) => getRequest(`/class/major/${id}`);

// ========================= student ===========================
// 根据 classId 查学生
export const queryStudentByClassId = (id) => getRequest(`/student/class/${id}`);

// ========================= major ===========================
// 根据 collegeId 查专业
export const queryMajorByCollegeId = (id) => getRequest(`/major/college/${id}`);
// 查询全部的专业
export const queryMajorByPage = () => getRequest(`/major/`);

// ========================= teacher ===========================
// 根据 collegeId 查教师
export const queryTeacherByCollegeId = (id) => getRequest(`/teacher/college/${id}`);

// 查询职称列表
export const queryTitle = () => getRequest(`/title/`);

// 更新密码
export const changePwd = (roleId, data) =>putRequest(`/${role[roleId]}/changePwd`, data);