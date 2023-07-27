const generaMenu = (resultMenu, router, parent_id) => {
    router.forEach(item => {
        if (item.parent_id === parent_id) {
            const menu = {
                path: item.path,
                name: item.name,
                component: item.component,
                type: item.type,
                name: item.name,
                sort: item.sort,
                parent_id: item.parent_id,
                id: item.id,
                children: [],
                title: item.title,
                icon: item.icon,
            };

            generaMenu(menu.children, router, item.id);
            resultMenu.push(menu);
        }
    });
};

module.exports = generaMenu;

const generaGroup = (resultGroup, groups, parent_id) => {
    groups.forEach(item => {
        if (item.parent_id === parent_id) {
            const group = {
                id: item.id,
                name: item.name,
                children: [],
            };

            generaGroup(group.children, groups, item.id);
            resultGroup.push(group);
        }
    });
};

module.exports = {
    generaMenu,
    generaGroup,
};
