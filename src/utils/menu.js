import {getRequest} from "./api";

export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        return;
    }
    getRequest("/system/config/menu").then(data => {
        if (data) {
            let fmtRoutes = formatRoutes(data);
            router.addRoutes(fmtRoutes);
            store.commit('initRoutes', fmtRoutes);
            // store.dispatch('connect');
        }
    })
}
export const formatRoutes = (routes) => {
    let fmRoutes = [];
    routes.forEach(router => {
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;
        if (children && children instanceof Array) {
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            meta: meta,
            children: children,
            component: (resolve) => {
                if (component.startsWith("Java")) {
                    require(['../views/java/' + component + '.vue'], resolve);
                } else if (component.startsWith("Spring")) {
                    require(['../views/spring/' + component + '.vue'], resolve);
                } else if (component.startsWith("Vue")) {
                    require(['../views/vue/' + component + '.vue'], resolve);
                } 
            }
        }
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}