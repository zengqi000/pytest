describe('权限系统UI自动化测试', function () {
    beforeEach(() => {
       // cy.viewport('iphone-6')  // Set viewport to 375px x 667px 需要手机模式访问时
        // 浏览器模式访问时，可按照自己的需要设置窗口大小，如 cy.viewport(1920,1100)
        //访问10057商场C端首页
        cy.visit('http://212.64.65.77:31181/#/user/authority')
    })
    var r=Math.floor(Math.random()*500)
    var r1=Math.floor(Math.random()*360)
    var myList= ["一","乙","二","十","丁","厂","七","卜","人","士","工","土","才","寸","下","大","丈","与","万","上",
        "小","口","巾","山","千","乞","川","亿","个","勺","久","凡","及","夕","丸","么","广","亡","门","义","之","尸","弓","己","已","子","卫","也","女","飞","刃","习","叉","马","乡","丰",
        "王","井","开","夫","天","无","元","专","云","扎","艺","木","五","支","厅","不","太","犬","区","历","尤","友","匹","车",
        "巨","牙","屯","比","互","切","瓦","止","少","日","中","冈","贝","内","水","见","午","牛","手","毛","气","升","长","仁",
        "什","片","仆","化","仇","币","仍","仅","斤","爪","反","介","父","从","今","凶","分","乏","公","仓","月","氏","勿","欠","风","丹","匀","乌","凤","勾","文","六","方","火","为","斗",
        "忆","订","计","户","认","心","尺","引","丑","巴","孔","队","办","以","允","予","劝","双","书","幻","玉","刊","示","末",
        "未","击","打","巧","正","扑","扒","功","扔","去","甘","世","古","节","本","术","可","丙","左","厉","右","石","布","龙",
        "平","灭","轧","东","卡","北","占","业","旧","帅","归","且","旦","目","叶","甲","申","叮","电","号","田","由","史","只",
        "付","仗","代","仙","们","仪","白","仔","他","斥","瓜","乎","丛","令","用","甩","印","乐","句","匆","册","犯","外","处",
        "冬","鸟","务","包","饥","主","市","立","闪","兰","半","汁","汇","头","汉","宁","穴","它","讨","写","让","礼","训","必",
        "议","讯","记","永","司","尼","民","出","辽","奶","奴","加","召","皮","边","发","孕","圣","对","台","矛","纠","母","幼",
        "丝","式","刑","动","扛","寺","吉","扣","考","托","老","执","巩","圾","扩","扫","地","扬","场","耳","共","芒","亚","芝",
        "朽","朴","机","权","过","臣","再","协","西","压","厌","在","有","百","存","而","页","匠","夸","夺","灰","达","列","死",
        "成","夹","轨","邪","划","迈","毕","至","此","贞","师","尘","尖","劣","光","当","早","吐","吓","虫","曲","团","同","吊",
        "吃","因","吸","吗","屿","帆","岁","回","岂","刚","则","肉","网","年","朱","先","丢","舌","竹","迁","乔","伟","传","乒",
        "乓","休","伍","伏","优","伐","延","件","任","伤","价","份","华","仰","仿","伙","伪","自","血","向","似","后","行","舟"]
    // it('管理员权限-角色管理-新增-修改-删除', function(){
    //     //点击管理员权限
    //     cy.get('.ivu-menu-submenu-title').contains('管理员权限').click() 
    //     //-----新增角色-----      
    //     //点击角色管理
    //     cy.get('.ivu-menu-item').contains('角色管理').click()
    //     cy.get('.ivu-menu-item').parent('角色管理').should('not.contain','断言通过')
    //     //点击添加角色
    //     cy.get('.add-btn > .ivu-btn > span').contains('添加角色').click()
        
    //     //输入角色名称和角色描述
    //     cy.contains('删除')
    //     var name="测试"+myList[r]+myList[r1]
    //     cy.get('.modal-form > :nth-child(1) > .ivu-form-item-content > .ivu-input-wrapper > .ivu-input').type(name)
    //     cy.get(':nth-child(2) > .ivu-form-item-content > .ivu-input-wrapper > .ivu-input').type('自动化测试')
    //     //点击确定
    //     cy.get('.modal-form > .btns > .ivu-btn-success > span').click()

        // //-----查看角色-----
        // //点击查看
        // cy.get(':nth-child(1) > .ivu-table-column-RTEZWZ > .ivu-table-cell > .ivu-row > :nth-child(1) > a').click()
        // //cy.get('.ivu-row > :nth-child(1) > a').click()
        // //点击取消
        // cy.get('.role-auth-modal-wrap > .btns > .btn').click()
        // //----修改角色-----
        // //点击修改
        // cy.get(':nth-child(1) > .ivu-table-column-N2yaq7 > .ivu-table-cell > .ivu-row > .ivu-col-push-2 > a').click
        // //cy.get('.ivu-col-push-2 > a').click()
        // //修改角色名称
        // cy.get('.modal-form > :nth-child(1) > .ivu-form-item-content > .ivu-input-wrapper > .ivu-input').type("修改")
        // //点击确定
        // cy.get('.modal-form > .btns > .ivu-btn-success > span').click()
        // // -----删除角色----
        // 点击删除
        // cy.contains('删除').click()
        //  //确定删除操作
        // cy.get('.ivu-btn-primary').click()




        
        
    // })

    // it('管理员功能权限-添加子分类-删除', function () {
    //     //点击管理员权限
    //     cy.get('.ivu-menu-submenu-title').contains('管理员权限').click()         
    //     //点击管理员功能权限
    //     cy.get('.ivu-menu-item').contains('管理员功能权限').click()
    //     //添加子分类
    //     cy.get('.btn-wrap > .btn').contains("添加子分类").click()
    //     //输入分类名称
    //     var fenlei = '自动化测试'+myList[r]+myList[r1]
    //     cy.get('.category > .ivu-form > .ivu-form-item-required > .ivu-form-item-content > .ivu-input-wrapper > .ivu-input').type(fenlei)
    //     //输入备注
    //     cy.get('.category > .ivu-form > .remark > .ivu-form-item-content > .ivu-input-wrapper > .ivu-input').type("自动化测试")
    //     //点击确定
    //     cy.get('[data-v-6cbb5df7=""] > .ivu-modal-wrap > .ivu-modal > .ivu-modal-content > .ivu-modal-footer > .ivu-btn-primary').click()
    //     //删除操作
    //     cy.contains(fenlei).click()
    //     cy.get('.ivu-btn-error').click()
    //     cy.get('.ivu-modal-confirm-footer > .ivu-btn-primary').click()
    // })

    it('管理员权限-角色管理-新增-修改-删除', function(){
        cy.get(':nth-child(53) > li > .ivu-tree-title > span').click()
        cy.get('.btn-wrap > :nth-child(4)').click()
        cy.get('.ivu-select-input').click()
        cy.get('.ivu-modal-body>.auth-modal>.ivu-form-label-right > [data-v-f9f1805a=""][data-v-f9f1805a=""]>.ivu-form-item>.ivu-form-item-content>.ivu-select-default>.ivu-select-dropdown>.ivu-select-dropdown-list > li:nth-child(3)')
        .click().eq(1).click()

    })


})

