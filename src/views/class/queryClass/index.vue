<template>
<div class="queryClassContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">查询班级</span>
            <div class="operation">
                <!-- <el-button type="primary" size="small">返回</el-button> -->
                <el-button type="primary" size="small" @click="handlerCreate">创建班级</el-button>
            </div>
        </el-header>
        <section class="custom-line"></section>
        <el-main>
            <section class="query">
                <el-form :inline="true" :model="queryClassForm" ref="queryClassForm" size="small">
                    <el-form-item label="班级名称" prop="name">
                        <el-input v-model="queryClassForm.name" placeholder="请输入班级名"></el-input>
                    </el-form-item>
                    <el-form-item label="班主任名称" prop="teacherName">
                        <el-input v-model="queryClassForm.teacherName" placeholder="请输入班主任名称"></el-input>
                    </el-form-item>
                    <el-form-item label="班长名称" prop="studentName">
                        <el-input v-model="queryClassForm.studentName" placeholder="请输入班长名称"></el-input>
                    </el-form-item>
                    <el-form-item label="所属院系" prop="collegeId">
                        <el-select v-model="queryClassForm.collegeId" filterable  clearable placeholder="请选择院系">
                            <el-option v-for="(college,index) in this.collegeList" :label="college.nameZh" :value="college.id" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属专业" prop="majorId">
                        <el-select v-model="queryClassForm.majorId" filterable  clearable placeholder="请选择专业">
                            <el-option v-for="(major,index) in this.majorList" :label="major.nameZh" :value="major.id" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属班级" prop="classId">
                        <el-select v-model="queryClassForm.classId" filterable  clearable placeholder="请选择专业">
                            <el-option v-for="(aclass,index) in this.classList" :label="aclass.name" :value="aclass.id" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handlerQuery()">查询</el-button>
                        <el-button type="primary" @click="handlerReset('queryClassForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </section>
            <section class="queryTable">
                <el-table :data="tableData" border style="width: 100%;" stripe>
                    <el-table-column type="index" label="#" min-width="1"></el-table-column>
                    <el-table-column prop="name" label="班级名称" min-width="1"></el-table-column>
                    <el-table-column prop="major.collegeNameZh" label="院系" min-width="1"></el-table-column>
                    <el-table-column prop="major.nameZh" label="专业" min-width="1"></el-table-column>
                    <el-table-column prop="teacherName" label="班主任" min-width="1"></el-table-column>
                    <el-table-column prop="studentName" label="班长" min-width="1"></el-table-column>
                    <el-table-column label="操作" min-width="1">
                        <template slot-scope="scope">
                            <section class="table-op">
                                <el-button size="mini" type="success" @click="handleEdit(scope.row.id)">编辑</el-button>
                                <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
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
import { queryClassByPage, deleteClassById } from '@/views/api.js'
export default {
    name: 'queryClass',
    data() {
        return {
            queryClassForm: {
                name: '',
                teacherName: '',
                studentName: '',
                collegeId: '',
                majorId: ''
            },
            collegeList: [],
            majorList: [],
            classList: [],
            tableData: [],
            pageSizes: [5, 10, 20, 50], // 每页显示的条数,可选
            currentPageSize: 5,
            total: -1, // 总条数
            currentPage: 1 // 当前页

        }
    },
    methods: {
        handlerCreate() {
            this.$router.push({
                name: 'createClass'
            })
        },
        handlerReset(formName) {
            this.$refs[formName].resetFields()
        },
        handleEdit(id) {
            this.$router.push({
                name: 'editClass',
                query: {
                    id: id
                }
            })
        },
        handleDelete(id) {
            console.log('row.id', id)
            this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteClassById(1000).then((res) => {
                    console.log('delete class success', res)
                    
                }).catch(err => {
                    console.log('delete class err', err)
                    this.showMsg(4, '删除失败,服务器异常')
                })
            }).catch(() => {
                this.showMsg(3, '已取消删除')
            });
        },
        handleSizeChange(val) {
            this.currentPageSize = val;
            this.query();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.query();
        },
        handlerQuery() {
            if (this.currentPage !== 1) {
                this.currentPage = 1;
            }
            this.query();
        },
        query() {
            let sendData = {
                page: this.currentPage,
                size: this.currentPageSize,
                name: this.queryClassForm.name,
                teacherName: this.queryClassForm.teacherName,
                studentName: this.queryClassForm.studentName,
                collegeId: this.queryClassForm.collegeId ? this.queryClassForm.collegeId : 0,
                majorId: this.queryClassForm.majorId ? this.queryClassForm.majorId : 0,
            };
            queryClassByPage(sendData).then((res) => {
                this.tableData = res.data;
                this.total = res.total;
            }).catch(err => {
                this.showMsg(4, "获取Class数据失败");
            })
        },
        initData() {
            if(this.$store.getters.college.length > 0) {
                this.collegeList = this.$store.getters.college;
            } else {
                this.$store.dispatch('setCollege').then((res) => {
                    this.collegeList = res;
                }).catch((error) => {
                    console.log('setCollege', error)
                })
            }
            if(this.$store.getters.major.length > 0) {
                this.majorList = this.$store.getters.major;
            } else {
                this.$store.dispatch('setMajor').then((res) => {
                    this.majorList = res;
                }).catch((error) => {
                    console.log('setMajor', error)
                })
            }
            this.query();
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
