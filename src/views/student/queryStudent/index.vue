<template>
<div class="queryClassContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">查询学生</span>
            <div class="operation">
                <!-- <el-button type="primary" size="small">返回</el-button> -->
                <el-button type="primary" size="small" @click="handlerCreate">创建学生</el-button>
            </div>
        </el-header>
        <section class="custom-line"></section>
        <el-main>
            <section class="query">
                <el-form :inline="true" :model="queryForm" ref="queryForm" size="small">
                    <el-form-item label="班级名" prop="className">
                        <el-input v-model="queryForm.className" placeholder="请输入班级名"></el-input>
                    </el-form-item>
                    <el-form-item label="学号" prop="studentNo">
                        <el-input v-model="queryForm.studentNo" placeholder="请输入学号"></el-input>
                    </el-form-item>
                    <el-form-item label="院系" prop="collegeId">
                        <el-select v-model="queryForm.collegeId" filterable clearable placeholder="请选择院系">
                            <el-option v-for="(college,index) in this.collegeList" :label="college.nameZh" :value="Number(college.id)" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="专业" prop="major">
                        <el-select v-model="queryForm.majorId" filterable clearable placeholder="请选择院系">
                            <el-option v-for="(major,index) in this.majorList" :label="major.nameZh" :value="Number(major.id)" :key="index"></el-option>
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
                    <el-table-column prop="username" label="姓名" min-width="1"></el-table-column>
                    <el-table-column prop="gender" label="性别" min-width="1"></el-table-column>
                    <el-table-column prop="age" label="年龄" min-width="1"></el-table-column>
                    <el-table-column label="生日" min-width="2">
                        <template slot-scope="scope">
                            <div>{{dateFormat(scope.row.birth, 'yyyy-MM-dd')}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="idCard" label="身份证号" min-width="3"></el-table-column>
                    <el-table-column prop="studentNo" label="学号" min-width="2"></el-table-column>
                    <el-table-column prop="className" label="班级" min-width="2"></el-table-column>
                    <el-table-column prop="majorName" label="专业" min-width="2"></el-table-column>
                    <el-table-column prop="collegeName" label="院系" min-width="2"></el-table-column>
                    <el-table-column label="入学时间" min-width="2">
                        <template slot-scope="scope">
                            <div>{{dateFormat(scope.row.admissionTime, 'yyyy-MM-dd')}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="3">
                        <template slot-scope="scope">
                            <section class="table-op">
                                <el-button size="mini" type="success" @click="handleEdit(scope.row.id)">编辑</el-button>
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
import {queryStudentByPage, queryMajorByCollegeId} from '@/views/api.js';
import mixin from '@/mixins/mixin.js'
export default {
    name: 'queryClass',
    mixins: [mixin],
    watch:{
        'queryForm.collegeId': {
            // 不能使用箭头函数， this指向问题
            handler: function(val) {
                if(val) {
                    this.queryForm.majorId = '';
                    this.queryMajorByCollege(val);
                }else {
                    this.queryAllMajor();
                }
            },
            deep: true
        }
    },
    data() {
        return {
            queryForm: {
                className: '',
                majorId: '',
                collegeId: '',
                classId: '',
            },
            tableData: [],
            pageSizes: [5, 10, 20, 50], // 每页显示的条数,可选
            currentPageSize: 10,
            total: -1, // 总条数
            currentPage: 1 // 当前页

        }
    },
    methods: {
        handlerQuery() {
            if (this.currentPage !== 1) {
                this.currentPage = 1
            } else {
                this.query()
            }
        },
        handlerCreate() {
            this.$router.push({
                name: 'createStudent'
            })
        },
        handlerReset(formName) {
            this.$refs[formName].resetFields()
        },
        handleEdit(id) {
            this.$router.push({
                name: 'editStudent',
                query: {
                    id: id
                }
            })
        },
        handleDelete(index, row) {
            console.log('row.id', row.studentId)
            this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteStudentById({ studentId: row.studentId }).then((res) => {
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
        handleSizeChange(val) {
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
            let params = {
                page: this.currentPage,
                size: this.currentPageSize,
            }
            if(this.queryForm.className) {
                params.className = this.queryForm.className;
            }
            if(this.queryForm.studentNo) {
                params.studentNo = this.queryForm.studentNo;
            }
            if(this.queryForm.collegeId) {
                params.collegeId = this.queryForm.collegeId;
            }
            if(this.queryForm.majorId) {
                params.majorId = this.queryForm.majorId;
            }
            
            queryStudentByPage(params).then(res => {
                this.tableData = res.data;
                this.total = res.total;
            }).catch(err => {
                console.log("获取学生数据失败" + err);
            })
        },
        initData() {
            // // 初始化 学院数据
            // if(this.$store.getters.college.length > 0) {
            //     this.collegeList = this.$store.getters.college;
            // } else {
            //     this.$store.dispatch('setCollege').then((res) => {
            //         this.collegeList = res;
            //     }).catch((error) => {
            //         console.log('setCollege', error)
            //     })
            // }
            this.queryCollege();
            this.queryAllMajor();
            this.query()
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
