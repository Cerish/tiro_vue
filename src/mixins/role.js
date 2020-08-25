import role from '@/utils/config/role.js';
import {mapGetters} from 'vuex';
export default {
    computed:{
        ...mapGetters({
            user: 'user'
        })
    },
    methods: {
        isStudent() {
            return this.user.roleId == role.type.STUDENT;
        },
        isTeacher() {
            return this.user.roleId == role.type.TEACHER;
        },
        isAdmin() {
            return this.user.roleId == role.type.ADMIN;
        },
        isVisitor() {
            return this.user.roleId == role.type.VISITOR;
        },
        isTeacherOrAdmin() {
            return this.user.roleId == role.type.TEACHER || this.user.roleId == role.type.ADMIN;
        },
        
    }
}
