describe('EHR系统', function () {

    beforeEach('每个用例之前运行一次',function () {
        cy.visit('http://212.64.65.77:31595/#/org-structure')   //访问页面
        cy.wait(10)

    })
    var myList = ["一","乙","二","十","丁","厂","七","卜","人","士","工","土","才","寸","下","大","丈","与","万","上",
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
    var r=Math.floor(Math.random()*100)
    var r1=Math.floor(Math.random()*360)
    var r2=Math.floor(Math.random()*360)
    var r3=Math.floor(Math.random()*100)
    var r4=Math.floor(Math.random()*100)
    var r5=Math.floor(Math.random()*100)
    var r6=Math.floor(Math.random()*100)
    var r7=Math.floor(Math.random()*100)
    var r8=Math.floor(Math.random()*100)
    var r9=Math.floor(Math.random()*100)
    var r10=Math.floor(Math.random()*100)
    var r11=Math.floor(Math.random()*100)
    it('组织架构-查询-', function() {
        cy.get('.search-wrap > .input > .ivu-input')
        .type('机构')
        cy.get('.search-wrap > .ivu-btn-success').click()//查询
        cy.get('.search-wrap > .ivu-btn-default').click()//重置
    })
    
    it("组织架构-创建--修改-机构分类",function(){
        //创建机构分类
        //点击机构分类
        cy.get('.btn-wrap > .ivu-btn-success').click()
        cy.get('.btn-wrap > .ivu-btn').should('contain','新增分类').click()
        //点击新增分类
        //cy.get('.btn-wrap > .ivu-btn').click()
        var name = "测试"+myList[r]+myList[r1]
        var beizhu = "备注"+myList[r]+myList[r1]
        cy.get('.ivu-form-item-required > .ivu-form-item-content > .ivu-input-wrapper > .ivu-input').type(name)//输入分类名称
        cy.get(':nth-child(2) > .ivu-form-item-content > .ivu-input-wrapper > .ivu-input').type(beizhu)//输入备注
        cy.get('.ivu-btn-primary').click()//点击确定
        cy.contains('添加成功')
        cy.contains('修改').click()//修改
        var editName = "测试"+myList[r1]+myList[r]
        var beizhu1 = "备注"+myList[r1]+myList[r]
        cy.get('.ivu-form-item-required > .ivu-form-item-content > .ivu-input-wrapper > .ivu-input').clear().type(editName)//分类名称
        cy.get(':nth-child(2) > .ivu-form-item-content > .ivu-input-wrapper > .ivu-input').clear().type(beizhu1)
        cy.get('.ivu-btn-primary').click()//点击确定
        cy.contains('修改成功')
        // cy.contains('删除').click()
        // cy.get('.ivu-modal-confirm-footer > .ivu-btn-primary').click()
        // cy.contains('删除成功')
    })
    it('组织架构-创建-修改-机构子分类',function(){
        //添加
        cy.get('.btn-wrap > :nth-child(2)').click()//点击创建子机构
        var jigou = "机构"+myList[r1]+myList[r]
        //输入机构名称
        cy.get('.add-suborg input[placeholder="请输入机构名称"]').type(jigou)
        //cy.get('.ivu-table-body .ivu-table-row > td:nth-child(2) >.ivu-table-cell > div:nth-child(1) > .form-item >.ivu-form-item > .ivu-form-item-content > .ivu-input-wrapper > .ivu-input').type(jigou)//输入机构分类
        //输入编制人数
        cy.get('.add-suborg input[placeholder="请输入编制人数"]').type(r3)
        //cy.get('.ivu-table-body .ivu-table-row > td:nth-child(5) >.ivu-table-cell > div:nth-child(1) > .form-item >.ivu-form-item > .ivu-form-item-content >.ivu-input-wrapper  > .ivu-input').type(r3)
        //输入机构分类
        cy.get('.ivu-table-body .ivu-table-row > td:nth-child(3) >.ivu-table-cell > div:nth-child(1) > .form-item >.ivu-form-item > .ivu-form-item-content').click()
        .contains('测试元元')
        .click()
        cy.contains('确定').click()
        //修改
        cy.contains('修改').click()
        //输入新的机构名称
        var editName = "测试"+myList[r1]+myList[r4]
        cy.get('.edit-suborg input[placeholder="请输入机构名称"]').clear().type(editName)
        //点击确定
        cy.get('.edit-suborg > .ivu-modal-wrap > .ivu-modal > .ivu-modal-content > .ivu-modal-footer > .ivu-btn-primary').click()
        // //删除
        // cy.contains('删除').click()
        // cy.get('.ivu-modal-confirm-footer > .ivu-btn-primary').click()
    })

    it('员工管理-新增员工分类',function(){
        // //进入员工管理页面
        cy.contains('员工管理').click()     
        //新增员工分类      
        //点击员工分类
        cy.get('.operates > .btns > .ivu-btn-success').click()
        //点击新增分类
        cy.get('.add-btn > .ivu-btn').click()
        var fenlei = "测试"+myList[r]+myList[r4]
        var beizhu = "测试"+myList[r]+myList[r4]
        //输入分类名称
        cy.get('.ivu-form-item-required > .ivu-form-item-content > .ivu-input-wrapper > .ivu-input').type(fenlei)
        //输入备注
        cy.get(':nth-child(2) > .ivu-form-item-content > .ivu-input-wrapper > .ivu-input').type(beizhu)
        //点击确定
        cy.get('.btns > .ivu-btn-success').click()
    })

    it('员工管理-新增、修改、查看员工',function(){
        cy.contains('员工管理').click()
        //点击新增员工
        cy.get('a.ivu-btn-default').click()
        //员工姓名
        var username = "张"+myList[r2]+myList[r4]
        cy.get(':nth-child(1) > :nth-child(1) > .form-item > .ivu-form-item-content > .form-control > .ivu-input').type(username)
        //证件类型
        cy.get(':nth-child(1) > :nth-child(2) > .form-item > .ivu-form-item-content > .form-control > .ivu-select-selection > div > .ivu-select-placeholder').click()
        cy.contains('中国护照')
        .click()
        //职级
        var zhiji = "职级"+myList[r2]+myList[r4]
        cy.get(':nth-child(2) > :nth-child(1) > .form-item > .ivu-form-item-content > .form-control > .ivu-input').type(zhiji)
        //岗位名称
        var gangwei = "岗位"+myList[r2]+myList[r4]
        cy.get(':nth-child(2) > :nth-child(2) > .form-item > .ivu-form-item-content > .form-control > .ivu-input').type(gangwei)
        //机构名称
        cy.get('.ivu-dropdown-rel > .ivu-input-wrapper > .ivu-input').click()
        cy.contains('机构正牛').click()
        //证件号码
        var num ='135'+Math.floor(Math.random()*100000000)
        cy.get(':nth-child(3) > :nth-child(2) > .form-item > .ivu-form-item-content > .form-control > .ivu-input').type(num)


        //手机号码
        var phone =Date.parse(new Date())/100
        window.phone = phone
        cy.get(':nth-child(4) > :nth-child(1) > .form-item > .ivu-form-item-content > .form-control > .ivu-input').type(phone)
        //合同类型
        cy.get(':nth-child(4) > :nth-child(2) > .form-item > .ivu-form-item-content > .form-control > .ivu-select-selection > div > .ivu-select-placeholder').click()
        cy.contains('劳动合同')
        .click()
        //员工分类
        cy.get(':nth-child(5) > :nth-child(1) > .form-item > .ivu-form-item-content > .form-control > .ivu-select-selection > div > .ivu-select-placeholder').click()
        cy.contains('合同工')
        .click()
        //入职日期
        cy.get(':nth-child(5) > :nth-child(2) > .form-item > .ivu-form-item-content > .form-control > .ivu-date-picker-rel > .ivu-input-wrapper > .ivu-input').click()
        .type('2020-04-20').click()
        //联系地址
        //cy.get(':nth-child(7) > .ivu-col > .form-item > .ivu-form-item-content > .form-control > .ivu-input').type('江西省瑞昌市')
        cy.get('.card input[placeholder="请输入联系地址"]').click().type('江西省瑞昌市')
        //性别
        cy.get('.ivu-select-placeholder').click()
        cy.contains('男')
        .click()
        //出生日期
        cy.get(':nth-child(6) > :nth-child(2) > .form-item > .ivu-form-item-content > .form-control > .ivu-date-picker-rel > .ivu-input-wrapper > .ivu-input').click()
        .type('2020-04-20').click()
        //确定提交
        cy.get('.btn').click().click()
        //查看员工
        cy.contains('查看').click()
        cy.get(':nth-child(1) > :nth-child(1) > .val').should('contain',username)
        //修改姓名
        cy.contains('员工管理').click()
        cy.contains('修改').click()
        //员工姓名
        var username1 = "张"+myList[r2]+myList[r5]
        window.username1 = username1
        cy.get(':nth-child(1) > :nth-child(1) > .form-item > .ivu-form-item-content > .form-control > .ivu-input').clear().type(username1)
        //确定提交
        cy.get('.btn').click()
        cy.contains('查看').click()
        cy.get(':nth-child(1) > :nth-child(1) > .val').should('contain',username1)
    })

    it('员工账号-停用-启用,重置密码',function(){
        cy.contains('员工账号').click()
        //输入新增的员工账号
        cy.get(':nth-child(3) > .ivu-input')
        .click()
        .type(phone)
        //点击查询
        cy.get(':nth-child(9) > .ivu-btn-success').click()
        //停用
        cy.get('.danger').contains('停用').click()
        //点击确定停用
        cy.get('.ivu-modal-confirm-footer > .ivu-btn-primary').click()
        //启用
        cy.get('.ivu-table-row >:nth-child(10)> .ivu-table-cell > div > :nth-child(1)').click()
        cy.get('.ivu-modal-confirm-footer > .ivu-btn-primary').click()
        //重置密码
        cy.get('.ivu-table-cell > div > :nth-child(3)').click()
        cy.get('.ivu-modal-confirm-footer > .ivu-btn-primary').click()
        //授权
        cy.get('.ivu-table-cell > div > :nth-child(2)').click()
        //勾选第一个角色名称
        cy.get(':nth-child(2) > .ivu-form-item-content > .ivu-checkbox-group > :nth-child(1)').click()
        cy.get('.empower > .ivu-modal-wrap > .ivu-modal > .ivu-modal-content > .ivu-modal-footer > .ivu-btn-primary').click()
    

    })

    it('员工离职、查看离职信息',function(){
        cy.contains('员工管理').click()
        cy.wait(6)
        //点击第一位员工离职
        cy.get(':nth-child(1) > td:nth-child(10)> .ivu-table-cell > .ivu-row > :nth-child(2) > :nth-child(2) > .btn-danger').click()
        //选中离职类型
        cy.get('.ivu-select-placeholder').click()
        cy.contains('主动离职')
        .click()
        //申请日期
        cy.get(':nth-child(1) > :nth-child(2) > .form-item > .ivu-form-item-content > .form-control > .ivu-date-picker-rel > .ivu-input-wrapper > .ivu-input').click()
        .type('2020-05-04').click()
        cy.get('.bread-crumb').click()
        //最后工作日期
        cy.get(':nth-child(2) > :nth-child(2) > .form-item > .ivu-form-item-content > .form-control > .ivu-date-picker-rel > .ivu-input-wrapper > .ivu-input').click()
        .type('2020-05-04').click()
        cy.get('.bread-crumb').click()
        //离职日期
        cy.get(':nth-child(1) > .form-item > .ivu-form-item-content > .form-control > .ivu-date-picker-rel > .ivu-input-wrapper > .ivu-input').click()
        .type('2020-05-04').click()
        cy.get('.bread-crumb').click()
        //薪资结算日期
        cy.get(':nth-child(3) > :nth-child(2) > .form-item > .ivu-form-item-content > .form-control > .ivu-date-picker-rel > .ivu-input-wrapper > .ivu-input').click()
        .type('2020-05-04').click()
        cy.get('.bread-crumb').click()
        //离职原因
        cy.get(':nth-child(1) > .ivu-checkbox > .ivu-checkbox-input').click()
        //确定提交
        cy.get('.btn').click()
        //查看离职员工信息
        cy.visit('http://212.64.65.77:31595/#/employee-manager')
        //切换显示离职
        cy.get('.ivu-switch').click()
        //点击查看
        cy.get(':nth-child(1) > td:nth-child(10)> .ivu-table-cell > .ivu-row > .ivu-col > a').click()
        //点击离职信息
        cy.get('.ivu-tabs-nav > :nth-child(3)').click()
        //断言
        cy.get('[style="visibility: visible;"] > .card > .ivu-card-body > .base-info > :nth-child(1) > :nth-child(1) > .val').should('contain',username1)
    })




})
