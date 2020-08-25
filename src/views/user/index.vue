<template>
<div class="queryClassContainer">
    <el-container>
        <el-header style="" class="head">
            <span class="title">查询用户</span>
            <div class="operation">
                <!-- <el-button type="primary" size="small">返回</el-button> -->
                <!-- <el-button type="primary" size="small" @click="handlerCreate">创建教务员</el-button> -->
            </div>
        </el-header>
        <section class="custom-line"></section>
        <el-main>
            <section class="query">
                <el-form :inline="true" :model="queryForm" ref="queryForm" size="small">
                    <el-form-item label="姓名" prop="realName">
                        <el-input v-model="queryForm.realName" placeholder="请输入名字" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="账号" prop="userName">
                        <el-input v-model="queryForm.userName" placeholder="请输入账号" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="角色" prop="roleId">
                        <el-select v-model="queryForm.roleId" clearable placeholder="请选择角色">
                            <el-option v-for="(role,index) in this.roleList" :label="role.nameZh" :value="role.id" :key="index"></el-option>
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
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="realName" label="姓名" width="100"></el-table-column>
                    <el-table-column prop="genderValue" label="性别" width="100"></el-table-column>
                    <el-table-column prop="roleName" label="角色" width="100"></el-table-column>
                    <el-table-column prop="userName" label="账号"></el-table-column>
                    <el-table-column prop="accountStatus" label="账号状态"></el-table-column>
                    <el-table-column prop="createTime" label="创建日期"></el-table-column>
                    <el-table-column label="操作" width="270">
                        <template slot-scope="scope">
                            <section class="table-op">
                                <el-button v-if="scope.row.isDisabled" size="mini" type="primary" @click="handleAbleAccount(scope.$index, scope.row)">启动</el-button>
                                <el-button v-else size="mini" type="warning" @click="handleDisableAccount(scope.$index, scope.row)">禁用</el-button>
                                <el-button size="mini" type="success" @click="handleResetPassword(scope.$index, scope.row)">重置密码</el-button>
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
import {queryAllRole} from '@/views/api.js';
export default {
    name: 'queryUser',
    data() {
        return {
            queryForm: {
                roleId: '',
                acdemicDeanNo: '',
                realName: ''
            },
            roleList: [],
            tableData: [],
            pageSizes: [2, 5, 10], // 每页显示的条数,可选
            currentPageSize: 10,
            total: 0, // 总条数
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
                name: 'createAcdemic'
            })
        },
        handlerReset(formName) {
            this.$refs[formName].resetFields()
        },
        handleResetPassword(index, row) {
            console.log(index, row)
            this.$router.push({
                name: 'resetPassword',
                query: {
                    userId: row.userId
                }
            })
        },
        handleDisableAccount(index, row) {
            // 禁用账号
            console.log('禁用handleDisableAccount row.userId', row.userId)
            disableUser({ userId: row.userId }).then((res) => {
                console.log('delete success', res)
                if (res.code === 10000) {
                    this.showMsg(1, '账号已禁用')
                    this.query()
                } else {
                    let failedMsg = res.message ? res.message : '禁用账号失败,服务器异常'
                    this.showMsg(4, failedMsg)
                }
            }).catch(err => {
                console.log('delete err', err)
                this.showMsg(4, '禁用账号失败,服务器异常')
            })
        },
        handleAbleAccount(index, row) {
            // 启用账号
            console.log('启用handleAbleAccount row.userId', row.userId)
            enableUser({ userId: row.userId }).then((res) => {
                console.log('delete success', res)
                if (res.code === 10000) {
                    this.showMsg(1, '账号已启用')
                    this.query()
                } else {
                    let failedMsg = res.message ? res.message : '启用账号失败,服务器异常'
                    this.showMsg(4, failedMsg)
                }
            }).catch(err => {
                console.log('delete err', err)
                this.showMsg(4, '启用账号失败,服务器异常')
            })
        },
        handleDelete(index, row) {
            console.log('row.userId', row.userId)
            this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteUserById({ userId: row.userId }).then((res) => {
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
                currentPage: this.currentPage,
                pageSize: this.currentPageSize
            }
            if (this.queryForm.roleName) {
                sendData.roleName = this.queryForm.roleName
            }
            if (this.queryForm.userName) {
                sendData.userName = this.queryForm.userName
            }
            if (this.queryForm.realName) {
                sendData.realName = this.queryForm.realName
            }
            console.log('sendData', sendData)
            queryUser(sendData).then((res) => {
                console.log('query class success', res)
                if (res.code === 10000) {
                    // this.showMsg(1, '查询成功')
                    let data = res.data
                    if (data) {
                        this.total = data.count
                        if (data.rows) {
                            _.map(data.rows, (item) => {
                                item.createTime = moment(item.createTime).format('YYYY-MM-DD')
                                return item
                            })
                            this.tableData = data.rows
                        }
                    }
                } else {
                    // 失败
                    let failedMsg = res.message ? res.message : '查询失败,服务器异常'
                    this.showMsg(4, failedMsg)
                }
            }).catch(err => {
                console.log('query class success', err)
                this.showMsg(4, '查询失败,服务器异常')
            })
        },
        initData() {
            queryAllRole().then(res => {
                console.log(res);
                this.roleList = res;
            }).catch(err => {
                console.log("error queryAllRole" + err);
            })
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
