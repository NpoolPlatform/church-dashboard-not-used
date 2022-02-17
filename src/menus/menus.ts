import { uid } from 'quasar'
interface MenuItem {
  menuId: string
  label: string
  caption: string
  icon: string
  target: string
  level: number
  children: Array<MenuItem>
}

const MainDrawerMenus = [
  {
    menuId: uid(),
    label: '应用',
    caption: '管理应用',
    icon: 'pending',
    target: '/applications',
    level: 0,
    children: [
      {
        menuId: uid(),
        label: '应用管理',
        caption: '管理应用',
        icon: 'perm_identity',
        target: '/applications/applications',
        level: 1,
        children: []
      }, {
        menuId: uid(),
        label: '应用短信模板',
        caption: '管理应用短信模板',
        icon: 'perm_identity',
        target: '/applications/sms/template',
        level: 1,
        children: []
      }, {
        menuId: uid(),
        label: '应用邮件模板',
        caption: '管理应用邮件模板',
        icon: 'perm_identity',
        target: '/applications/email/template',
        level: 1,
        children: []
      }, {
        menuId: uid(),
        label: '应用内联系',
        caption: '管理应用内联系地址',
        icon: 'perm_identity',
        target: '/applications/contacts',
        level: 1,
        children: []
      }, {
        menuId: uid(),
        label: '国际化',
        caption: '管理应用支持语言',
        icon: 'perm_identity',
        target: '/applications/languages',
        level: 1,
        children: []
      }
    ]
  }, {
    menuId: uid(),
    label: '审核',
    caption: '管理审核项目',
    icon: 'reviews',
    target: '/review',
    level: 0,
    children: [
      {
        menuId: uid(),
        label: 'KYC',
        caption: '管理身份审核',
        icon: 'perm_identity',
        target: '/review/kyc',
        level: 1,
        children: []
      }, {
        menuId: uid(),
        label: '商品',
        caption: '审核商品上下架',
        icon: 'format_list_numbered',
        target: '/review/good',
        level: 1,
        children: []
      }, {
        menuId: uid(),
        label: '提现地址',
        caption: '审核体现地址设置',
        icon: 'format_list_numbered',
        target: '/review/withdraw',
        level: 1,
        children: []
      }, {
        menuId: uid(),
        label: '提现请求',
        caption: '审核提现请求',
        icon: 'format_list_numbered',
        target: '/review/withdraw/address',
        level: 1,
        children: []
      }
    ]
  }, {
    menuId: uid(),
    label: 'API',
    caption: '管理API授权',
    icon: 'perm_identity',
    target: '/apis',
    level: 0,
    children: []
  }, {
    menuId: uid(),
    label: '用户与角色',
    caption: '管理用户、角色以及资源授权',
    icon: 'reviews',
    target: '/users',
    level: 0,
    children: [
      {
        menuId: uid(),
        label: '用户列表',
        caption: '查看全部用户',
        icon: 'format_list_numbered',
        target: '/users/users',
        level: 1,
        children: []
      }, {
        menuId: uid(),
        label: '角色列表',
        caption: '查看全部角色',
        icon: 'format_list_numbered',
        target: '/users/roles',
        level: 1,
        children: []
      }, {
        menuId: uid(),
        label: '角色用户',
        caption: '管理角色用户',
        icon: 'format_list_numbered',
        target: '/users/roleusers',
        level: 1,
        children: []
      }, {
        menuId: uid(),
        label: '角色授权',
        caption: '管理角色访问权限',
        icon: 'format_list_numbered',
        target: '/users/roleauths',
        level: 1,
        children: []
      }, {
        menuId: uid(),
        label: '鉴权历史',
        caption: '查看鉴权历史',
        icon: 'format_list_numbered',
        target: '/users/auth/histories',
        level: 1,
        children: []
      }
    ]
  }, {
    menuId: uid(),
    label: '国际化',
    caption: '管理国际化语言支持',
    icon: 'language',
    target: '/internationalization',
    level: 0,
    children: []
  }, {
    menuId: uid(),
    label: '商品',
    caption: '管理商品信息与收益地址',
    icon: 'format_list_numbered',
    target: '/goods',
    level: 0,
    children: [{
      menuId: uid(),
      label: '商品管理',
      caption: '管理算力商品',
      icon: 'format_list_numbered',
      target: '/goods/goods',
      level: 1,
      children: []
    }, {
      menuId: uid(),
      label: '商品收益地址管理',
      caption: '管理算力商品收益地址',
      icon: 'format_list_numbered',
      target: '/goods/payments',
      level: 1,
      children: []
    }, {
      menuId: uid(),
      label: '限额设置',
      caption: '管理热钱包限额',
      icon: 'format_list_numbered',
      target: '/goods/limits',
      level: 1,
      children: []
    }]
  }, {
    menuId: uid(),
    label: '报表和账单',
    caption: 'APP、商品、用户收支明细',
    icon: 'format_list_numbered',
    target: '/goods',
    level: 0,
    children: []
  }
]

export {
  MenuItem,
  MainDrawerMenus
}
