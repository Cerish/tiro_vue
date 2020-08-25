import _this from '@/main.js';
import {queryMajorByPage,queryMajorByCollegeId,
    queryTeacherByCollegeId,
     queryClassByPage, queryClassByMajorId, queryClassByCollegeId} from '@/views/api.js'
export default {
    data() {
        return {
            collegeList: [],
            majorList: [],
            classList: [],
            teacherList: []
        }
    },
    methods: {
        // 初始化 学院数据
        queryCollege() {
            if(this.$store.getters.college.length > 0) {
                this.collegeList = this.$store.getters.college;
            } else {
                this.$store.dispatch('setCollege').then((res) => {
                    this.collegeList = res;
                }).catch((error) => {
                    console.log('setCollege', error)
                })
            }
        },
        // 查找全部的 major 列表
        queryAllMajor() {
            queryMajorByPage().then(res => {
                this.majorList = res.data;
            }).catch(err => {
                console.log( "error queryAllMajor" + err);
            })
        },
        // 根据collegeId 查找 major
        queryMajorByCollege(collegeId) {
            queryMajorByCollegeId(collegeId).then(res => {
                this.majorList = res;
            }).catch(err => {
                console.log( "error queryMajorByCollege" + err);
            })
        },
        // 根据collegeId 查找 tracher
        queryTeacher(collegeId) {
            queryTeacherByCollegeId(collegeId).then(res => {
                this.teacherList = res;
            }).catch(err => {
                console.log( "error queryTeacher" + err);
            })
        },
        // 查询所有的 class
        queryAllClass() {
            queryClassByPage().then(res => {
                this.classList = res.data;
            }).catch(err => {
                console.log( "error queryClassByPage" + err);
            })
        },
        // 根据majorId 查找 Class
        queryClassByMajor(majorId) {
            queryClassByMajorId(majorId).then((res) => {
                this.classList = res;
            }).catch(err => {
                console.log( "error queryClass" + err);
            });
        },
        // 根据majorId 查找 Class
        queryClassByCollege(collegeId) {
            queryClassByCollegeId(collegeId).then((res) => {
                this.classList = res;
            }).catch(err => {
                console.log( "error queryClass" + err);
            });
        },
    }
}