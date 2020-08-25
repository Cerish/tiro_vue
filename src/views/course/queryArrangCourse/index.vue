<template>
<div class="queryClassContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">查询课程</span>
            <div class="operation">
                <!-- <el-button type="primary" size="small">返回</el-button> -->
                <el-button type="primary" size="small" @click="handlerCreate" v-if="isAdmin()">创建课程</el-button>
            </div>
        </el-header>
        <section class="custom-line"></section>
        <el-main>
            <section class="query">
                <el-form :inline="true" :model="queryForm" ref="queryForm" size="small">
                    <el-form-item label="班级名" prop="className" v-if="isTeacherOrAdmin()">
                        <el-input v-model="queryForm.className" placeholder="请输入班级名"></el-input>
                    </el-form-item>
                    <el-form-item label="学分" prop="credit">
                        <el-input v-model="queryForm.credit" placeholder="请输入学分"></el-input>
                    </el-form-item>
                    <el-form-item label="课程名" prop="name">
                        <el-input v-model="queryForm.name" placeholder="请输入课程名"></el-input>
                    </el-form-item>
                    <el-form-item label="教师" prop="teacherName">
                        <el-input v-model="queryForm.teacherName" placeholder="请输入教师名"></el-input>
                    </el-form-item>
                    <el-form-item label="院系" prop="collegeId" v-if="isTeacherOrAdmin()">
                        <el-select v-model="queryForm.collegeId" clearable placeholder="请选择院系" @change="handlerCollegeChange">
                            <el-option v-for="(college,index) in this.collegeList" :label="college.nameZh" :value="Number(college.id)" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="专业" prop="majorId" v-if="isTeacherOrAdmin()">
                        <el-select v-model="queryForm.majorId" clearable placeholder="请选择专业">
                            <el-option v-for="(major,index) in this.majorList" :label="major.nameZh" :value="Number(major.id)" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学期" prop="semester">
                        <el-input v-model="queryForm.semester" placeholder="请输入学期"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handlerQuery">查询</el-button>
                        <el-button type="primary" @click="handlerReset('queryForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </section>
            <section class="queryTable">
                <el-table :data="tableData" border style="width: 100%;" stripe>
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="name" label="课程名" min-width="2"></el-table-column>
                    <el-table-column prop="teacherName" label="授课教师" min-width="2"></el-table-column>
                    <el-table-column prop="credit" label="学分" min-width="1"></el-table-column>
                    <el-table-column prop="semester" label="学期" min-width="1"></el-table-column>
                    <el-table-column label="上课时间" min-width="2">
                        <template slot-scope="scope">
                            {{'周' + weekList[scope.row.weekDay] + ' '+ scope.row.lessonStart + '-' +scope.row.lessonEnd + '节'}}
                        </template>
                    </el-table-column>
                    <el-table-column label="上课周数" min-width="2">
                        <template slot-scope="scope">
                            {{ scope.row.weekStart + '-' + scope.row.weekEnd +'周'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="上课地点" min-width="2"></el-table-column>
                    <el-table-column prop="className" label="班级" min-width="2"></el-table-column>
                    <el-table-column prop="major.nameZh" label="专业" min-width="2"></el-table-column>
                    <el-table-column prop="major.collegeNameZh" label="院系" min-width="2"></el-table-column>
                    <!-- <el-table-column prop="createTime" label="创建日期"></el-table-column> -->
                    <el-table-column label="操作" min-width="3" v-if="isAdmin()">
                        <template slot-scope="scope">
                            <section class="table-op">
                                <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </section>
                        </template>
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
import {queryCourseByPage} from '@/views/api.js';
export default {
    name: 'queryArrangCourse',
    mixins: [mixin],
    data() {
        return {
            queryForm: {
                name: '',
                credit: '',
                className: '',
                collegeId: '',
                semester: '',
                majorId: '',
                teacherName: '',
            },
            
            tableData: [],
            pageSizes: [5, 10, 20, 50], // 每页显示的条数,可选
            currentPageSize: 10,
            total: -1, // 总条数
            currentPage: 1, // 当前页
            roleType: -1,
            weekList: {
                '1': '一',
                '2': '二',
                '3': '三',
                '4': '四',
                '5': '五',
                '6': '六',
                '7': '日',
            },
        }
    },
    methods: {
        handlerCollegeChange(value) {
            if(value) {
                this.queryMajorByCollege(value);
            }else {
                this.queryAllMajor();
            }
        },
        handlerQuery() {
            console.log('queryForm', this.queryForm)
            if (this.currentPage !== 1) {
                this.currentPage = 1
            } else {
                this.query()
            }
        },
        handlerCreate() {
            this.$router.push({
                name: 'createArrangCourse'
            })
        },
        handlerReset(formName) {
            this.$refs[formName].resetFields()
        },
        handleEdit(index, row) {
            console.log(index, row)
            this.$router.push({
                name: 'editArrangCourse',
                query: {
                    id: row.id
                }
            })
        },
        // 删除一个课程
        handleDelete(index, row) {
            console.log('row.id', row.arrangCourseId)
            this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteArrangCourseById({ arrangCourseId: row.arrangCourseId }).then((res) => {
                    console.log('delete success', res)
                    if (res.code === 10000) {
                        this.showMsg(1, '删除成功')
                        this.query()
                    } else {
                        let failedMsg = res.message ? res.message : '删除失败,服务器异常'
                        this.showMsg(4, failedMsg)
                    }
                }).catch(err => {
                    console.log('delete err', err)
                    this.showMsg(4, '删除失败,服务器异常')
                })
            }).catch(() => {
                this.showMsg(3, '已取消删除')
            });
        },
        // 修改每页条数
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.currentPageSize = val
            if (this.currentPage !== 1) {
                this.currentPage = 1
            } else {
                this.query()
            }
        },
        // 改变当前页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val
            this.query()
        },
        // 查询数据
        query() {
            let sendData = {
                page: this.currentPage,
                size: this.currentPageSize,
            }
            if (this.queryForm.className) {
                sendData.className = this.queryForm.className
            }
            if (this.queryForm.name) {
                sendData.name = this.queryForm.name
            }
            if (this.queryForm.teacherName) {
                sendData.teacherName = this.queryForm.teacherName
            }
            if (this.queryForm.collegeId) {
                sendData['major.collegeId'] = this.queryForm.collegeId;
            }
            if (this.queryForm.majorId) {
                sendData['major.id'] = this.queryForm.majorId;
            }
            if (this.queryForm.credit) {
                sendData.credit = this.queryForm.credit
            }
            if (this.queryForm.semester) {
                sendData.semester = this.queryForm.semester
            }
            let uri = this.isStudent() ? `/student/course` : `/course/`;
            console.log('sendData', sendData);
            
            queryCourseByPage(uri, sendData).then((res) => {
                console.log('query success', res);
                this.tableData = res.data;
                this.total = res.total;
            }).catch(err => {
                console.log('query class success', err)
                this.showMsg(4, '查询失败,服务器异常')
            })
            
        },
        initData() {
            this.queryCollege();
            this.queryAllMajor();
            this.query()
        }
    },
    mounted() {
        this.initData();
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
