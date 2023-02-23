// 普通用户菜单
export let userMenu = [
    {
        title: '首页',
        icon: 'el-icon-setting',
        path: '/'
    },
    {
        title: '废品类型图鉴',
        icon: 'el-icon-setting',
        path: '/classification'
    },
    {
        title: '废品回收',
        icon: 'el-icon-setting',
        path: '/recycle'
    },
    {
        title: '成为回收员',
        icon: 'el-icon-setting',
        path: '/recycler'
    },
    // {
    //     title: '地址管理',
    //     icon: 'el-icon-setting',
    //     path: '/index'
    // },
]

// 回收员菜单
export let recyclerMenu = [
    {
        title: '订单列表',
        icon: 'el-icon-setting',
        path: '/recycler/order'
    },
    {
        title: '我的订单',
        icon: 'el-icon-setting',
        path: '/recycler/receive'
    },
    {
        title: '我的信息',
        icon: 'el-icon-setting',
        path: '/recycler/info'
    },
]

export let adminMenu = [
    {
        title: '用户管理',
        icon: 'el-icon-setting',
        path: '/admin/userInfo'
    },
    {
        title: '回收员审核',
        icon: 'el-icon-setting',
        path: '/admin/recycler'
    },
    {
        title: '订单管理',
        icon: 'el-icon-setting',
        path: '/admin/order'
    },
    {
        title: '废品类型图鉴管理',
        icon: 'el-icon-setting',
        path: '/admin/classification'
    },
    {
        title: '公告栏管理',
        icon: 'el-icon-setting',
        path: '/admin/announcement'
    },
    {
        title: '轮播图管理',
        icon: 'el-icon-setting',
        path: '/admin/rotograph'
    },
]