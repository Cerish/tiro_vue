<template>
<div class="queryTeacherContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">查询教师</span>
            <div class="operation">
                <!-- <el-button type="primary" size="small">返回</el-button> -->
                <el-button type="primary" size="small" @click="handlerCreate">创建教师</el-button>
            </div>
        </el-header>
        <section class="custom-line"></section>
        <el-main>
            <section class="query">
                <el-form :inline="true" :model="queryForm" ref="queryForm" size="small">
                    <el-form-item label="名字" prop="username">
                        <el-input v-model="queryForm.username" placeholder="请输入名字"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-select v-model="queryForm.gender" clearable placeholder="请选择性别">
                            <el-option v-for="(item,index) in this.genderList" :label="item.name" :value="item.value" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职称" prop="titleId">
                        <el-select v-model="queryForm.titleId" clearable placeholder="请选择职称">
                            <el-option v-for="(title,index) in this.titleList" :label="title.nameZh" :value="title.id" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="院系" prop="collegeId">
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
                    <el-table-column prop="username" label="姓名" min-width="1"></el-table-column>
                    <el-table-column label="性别" min-width="1">
                        <template slot-scope="scope">
                            <div>{{scope.row.gender == 0 ? '男' : scope.row.gender == '1' ? '女' : '保密'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="age" label="年龄" min-width="1"></el-table-column>
                    <el-table-column label="生日" min-width="2">
                        <template slot-scope="scope">
                            <div>{{dateFormat(scope.row.birth, 'yyyy-MM-dd')}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mobile" label="手机" min-width="2"></el-table-column>
                    <el-table-column prop="idCard" label="身份证号" min-width="3"></el-table-column>
                    <el-table-column prop="titleNameZh" label="职称" min-width="2"></el-table-column>
                    <el-table-column prop="collegeName" label="院系" min-width="2"></el-table-column>
                    <el-table-column label="操作" min-width="3">
                        <template slot-scope="scope">
                            <section class="table-op">
                                <el-button size="mini" type="success" @click="handleEdit(scope.row)">编辑</el-button>
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
import {queryTeacherByPage, queryTitle} from '@/views/api.js';
import mixin from '@/mixins/mixin.js';
export default {
    name: 'queryTeacher',
    mixins: [mixin],
    data() {
        return {
            queryForm: {
                collegeId: '',
                username: '',
                gender: '',
                titleId: '',
                mobile: ''
            },
            collegeList: [],
            genderList: [
                {name: '男', value: 0},
                {name: '女', value: 1},
                {name: '保密', value: 2}
            ],
            titleList: [],
            tableData: [],
            pageSizes: [5, 10, 20, 50], // 每页显示的条数,可选
            currentPageSize: 10,
            total: -1, // 总条数
            currentPage: 1 // 当前页

        }
    },
    methods: {
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
                name: 'createTeacher'
            })
        },
        handlerReset(formName) {
            this.$refs[formName].resetFields()
        },
        handleEdit(row) {
            this.$router.push({
                name: 'editTeacher',
                query: {
                    id: row.id
                }
            })
        },
        handleDelete(index, row) {
            console.log('row.id', row.id)
            this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteTeacherById({ teacherId: row.id }).then((res) => {
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
            let sendData = {
                page: this.currentPage,
                size: this.currentPageSize
            }
            console.log(this.queryForm.username)
            console.log(this.queryForm.username !== '')
            if(this.queryForm.collegeId) sendData.collegeId = this.queryForm.collegeId;
            if(this.queryForm.username !== '') sendData.username = this.queryForm.username;
            if(this.queryForm.gender !== '') sendData.gender = this.queryForm.gender;
            if(this.queryForm.titleId) sendData.titleId = this.queryForm.titleId;

            console.log('sendData', sendData)
            queryTeacherByPage(sendData).then((res) => {
                this.tableData = res.data;
                this.total = res.total;
                console.log('queryTeacherByPage', res)
                
            }).catch(err => {
                console.log('error queryTeacherByPage', err)
                this.showMsg(4, '教师列表查询失败')
            })
        },
        initData() {
            this.queryCollege();
            queryTitle().then(res => {
                this.titleList = res;
            });
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
.queryTeacherContainer {
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
