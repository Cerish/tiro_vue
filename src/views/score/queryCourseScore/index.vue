<template>
<div class="queryClassContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">查询成绩</span>
            <div class="operation">
                <!-- <el-button type="primary" size="small">返回</el-button> -->
                <el-button type="primary" size="small" @click="handlerExport">导出成绩</el-button>
            </div>
        </el-header>
        <section class="custom-line"></section>
        <el-main>
            <section class="query">
                <el-form :inline="true" :model="queryForm" ref="queryForm" size="small">
                    <el-form-item label="班级名" prop="className" v-if="isTeacherOrAdmin()">
                        <el-input v-model="queryForm.className" placeholder="请输入班级名"></el-input>
                    </el-form-item>
                    <el-form-item label="学生名" prop="studentName" v-if="isTeacherOrAdmin()">
                        <el-input v-model="queryForm.studentName" placeholder="请输入学生名"></el-input>
                    </el-form-item>
                    <el-form-item label="学期" prop="semester">
                        <el-input v-model="queryForm.semester" placeholder="请输入学期"></el-input>
                    </el-form-item>
                    <el-form-item label="学分" prop="credit">
                        <el-input v-model="queryForm.credit" placeholder="请输入学分"></el-input>
                    </el-form-item>
                    <el-form-item label="课程名" prop="courseName">
                        <el-input v-model="queryForm.courseName" placeholder="请输入课程名"></el-input>
                    </el-form-item>
                    <el-form-item label="教师" prop="teacherName" v-if="isTeacherOrAdmin()">
                        <el-input v-model="queryForm.teacherName" placeholder="请输入教师名"></el-input>
                    </el-form-item>
                    <el-form-item label="院系" prop="college" v-if="isTeacherOrAdmin()">
                        <el-select v-model="queryForm.collegeId" clearable placeholder="请选择院系">
                            <el-option v-for="(college,index) in this.collegeList" :label="college.nameZh" :value="Number(college.id)" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handlerQuery">查询</el-button>
                        <el-button type="primary" @click="handlerReset('queryForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </section>
            <section class="queryTable">
                <el-table :data="tableData" border style="width: 100%;" stripe>
                    <el-table-column type="index" min-width="1"></el-table-column>
                    <el-table-column prop="courseName" label="课程名" min-width="2"></el-table-column>
                    <el-table-column prop="studentName" label="学生" min-width="2"></el-table-column>
                    <el-table-column prop="studentNo" label="学号" min-width="2"></el-table-column>
                    <el-table-column prop="credit" label="学分" min-width="1"></el-table-column>
                    <el-table-column prop="score" label="分数" min-width="1"></el-table-column>
                    <el-table-column prop="teacherName" label="授课教师" min-width="2"></el-table-column>
                    <el-table-column prop="semester" label="学期" min-width="1"></el-table-column>
                    <el-table-column prop="className" label="班级" min-width="3"></el-table-column>
                    <el-table-column prop="majorName" label="专业" min-width="2"></el-table-column>
                    <el-table-column prop="collegeName" label="院系" min-width="2"></el-table-column>
                    <el-table-column label="操作" min-width="4" v-if="isTeacher()">
                        <div slot-scope="scope"  v-if="user.userId == scope.row.teacherId">
                            <section class="table-op">
                                <!-- <div v-if="checkScore(scope.$index, scope.row)"><el-button size="mini" type="primary" @click="handleCreate(scope.$index, scope.row)">采录成绩</el-button></div> -->
                                <div>
                                    <el-button size="mini" type="success" @click="handleEdit(scope.row)">编辑</el-button>
                                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                                </div>
                            </section>
                        </div>
                        <div v-else>
                            <template>
                                <section class="table-op">
                                    <div>该学生的老师才可以进行操作</div>
                                </section>
                            </template>
                        </div>
                        
                    </el-table-column>
                </el-table>
            </section>
            <section class="queryPagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="this.pageSizes" :page-size="this.currentPageSize" layout="total, sizes,prev, pager, next, jumper" :total="this.total"></el-pagination>
            </section>
        </el-main>
    </el-container>
</div>
</template>

<script>
import mixin from '@/mixins/mixin.js';
import {queryScoreByPage, deleteScoreById} from '@/views/api.js';
export default {
    name: 'queryArrangCourse',
    mixins: [mixin],
    data() {
        return {
            queryForm: {
                className: '',
                collegeId: '',
                courseName: '',
                teacherName: '',
                studentName: '',
                semester: '',
                credit: ''
            },
            tableData: [],
            pageSizes: [5, 10, 20, 50], // 每页显示的条数,可选
            currentPageSize: 10,
            total: -1, // 总条数
            currentPage: 1, // 当前页
            roleType: -1

        }
    },
    methods: {
        handlerQuery() {
            // console.log('queryForm', this.queryForm)
            if (this.currentPage !== 1) {
                this.currentPage = 1
            } else {
                this.query()
            }
        },
        handleCreate(index, row) {
            // console.log('handleCreate', index, row)
            this.$router.push({
                name: 'createCourseScore',
                query: {
                    arrangCourseId: row.arrangCourseId,
                    studentId: row.studentId
                }
            })
        },
        handlerExport() {
            console.log('handlerExport.....')
        },
        handlerReset(formName) {
            this.$refs[formName].resetFields()
        },
        handleEdit(row) {
            // console.log(index, row)
            this.$router.push({
                name: 'editCourseScore',
                query: {
                    id: row.id
                }
            })
        },
        handleDelete(row) {
            this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteScoreById(row.id).then((res) => {
                    console.log('delete success', res);
                    this.query();
                    this.showMsg(1, '删除成功');
                }).catch(err => {
                    console.log('delete err', err);
                })
            });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.currentPageSize = val
            if (this.currentPage !== 1) {
                this.currentPage = 1
            } else {
                this.query()
            }
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val
            this.query()
        },
        query() {
            console.log("开始时间"+new Date());
            let sendData = {
                page: this.currentPage,
                size: this.currentPageSize
            }
            if (this.queryForm.className) {
                sendData.className = this.queryForm.className
            }
            if (this.queryForm.collegeId) {
                sendData.collegeId = this.queryForm.collegeId
            }
            if (this.queryForm.courseName) {
                sendData.courseName = this.queryForm.courseName
            }
            if (this.queryForm.teacherName) {
                sendData.teacherName = this.queryForm.teacherName
            }
            if (this.queryForm.studentName) {
                sendData.studentName = this.queryForm.studentName
            }
            if (this.queryForm.semester) {
                sendData.semester = this.queryForm.semester
            }
            if (this.queryForm.credit) {
                sendData.credit = this.queryForm.credit
            }
            console.log('sendData', sendData);
            let uri = this.isStudent() ? `/student/score`: `/score/`;
            queryScoreByPage(uri, sendData).then(res => {
                console.log("结束时间"+new Date());
                console.log(res);
                this.tableData = res.data;
                this.total = res.total;
            }).catch(err => {
                console.log('error queryScoreByPage' + err);
            })
        },
        initData() {
            this.queryCollege();
            this.query();
        }
    },
    mounted() {
        this.initData()
    }
}
</script>

<style>
/*覆盖elementUI*/

.el-table th>.cell,
.el-table td>.cell {
    text-align: center;
}
</style>

<style lang="scss" scoped>
.queryClassContainer {
    .head {
        margin: 8px 0;
        height: 40px !important;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        .title {
            font-size: 18px;
            font-weight: 440;
        }
        .operation {
            display: flex;
            align-items: center;
        }
    }
    .custom-line {
        border-top: 1px solid #DDD;
        width: 100%;
    }
    .query {
        display: flex;
        justify-content: center;
    }
    .queryTable {
        .table-op {
            text-align: center;
        }
    }
    .queryPagination {
        display: flex;
        justify-content: center;
        margin: 30px 0;
    }
}
</style>
