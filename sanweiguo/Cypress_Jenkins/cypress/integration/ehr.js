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

describe('EHR系统', function() {
    beforeEach('每个用例之前运行一次',function () {
        cy.visit('/')   //访问页面
        cy.wait(10)
        cy.fixture('data.json').as('data')
    })    
    it('创建-修改-删除机构分类',function(){
        var name = '分类'+this.data.myList[r11]+this.data.myList[r5]
        var beizhu = "备注"+this.data.myList[r5]+this.data.myList[r1]
        cy.createOrgCategory(name,beizhu) //创建机构分类
        cy.contains('修改').click() //修改
        cy.get('.ivu-form-item-required > .ivu-form-item-content > .ivu-input-wrapper > .ivu-input').clear().type(name)//分类名称
        cy.get(':nth-child(2) > .ivu-form-item-content > .ivu-input-wrapper > .ivu-input').clear().type(beizhu)
        cy.get('.ivu-btn-primary').click()//点击确定
        cy.contains('修改成功')
        cy.deleteOrgCategory()
        cy.contains('删除成功')
    })  
    it('创建机构分类时分类名称相同', function(){   
        var name = '分类'+this.data.myList[r2]+this.data.myList[r5]
        var beizhu = "备注"+this.data.myList[r3]+this.data.myList[r1]
        var beizhu1 = "备注"+this.data.myList[r6]+this.data.myList[r1]
        cy.createOrgCategory(name,beizhu) //创建一个机构分类
        cy.createOrgCategory(name,beizhu)    //再创建相同的机构分类
        //点击取消
        cy.get('.ivu-btn-text').click()
        //断言确定按钮存在
        cy.get('.ivu-btn-primary').should('be.visible')     
        //删除机构分类   
        cy.deleteOrgCategory()
        cy.contains('删除成功')
    })
    it('创建-修改-删除子机构',function(){
        var jigou = "机构"+this.data.myList[r1]+this.data.myList[r] //子机构名称
        var name = "分类"+this.data.myList[r1]+this.data.myList[r]  //分类名称
        var beizhu = "备注"+this.data.myList[r3]+this.data.myList[r1] 
        var num = Math.floor(Math.random()*10)
        cy.createZiJigou(name,beizhu,jigou,num)     //创建子机构
        cy.get('.search-wrap > .input > .ivu-input').type(jigou) //搜索框输入
        cy.get('.search-wrap > .ivu-btn-success').click() //搜索添加的子机构
        //修改
        cy.contains('修改').click()
        //输入新的机构名称
        var editName = "测试"+this.data.myList[r1]+this.data.myList[r4]
        cy.get('.edit-suborg input[placeholder="请输入机构名称"]').clear().type(editName)
        //点击确定
        cy.get('.edit-suborg > .ivu-modal-wrap > .ivu-modal > .ivu-modal-content > .ivu-modal-footer > .ivu-btn-primary').click()
        //断言
        cy.get('.search-wrap > .input > .ivu-input').clear().type(editName) //搜索框输入
        cy.get('.search-wrap > .ivu-btn-success').click() //搜索添加的子机构
        cy.get('.ivu-table-row > td:nth-child(3) > .ivu-table-cell > .ivu-table-cell-tooltip > .ivu-tooltip-rel > .ivu-table-cell-tooltip-content')
        .should('contain',editName)
        cy.deleteZiJigou(editName)

    })

    it('员工管理-新增员工分类时分类名称相同',function(){
        var fenlei = "测试"+this.data.myList[r]+this.data.myList[r4]
        var beizhu = "测试"+this.data.myList[r]+this.data.myList[r4]
        cy.createEmpCategory(fenlei,beizhu)
    })
    it('员工管理-新增、修改、查看员工',function(){
        var username = "张"+this.data.myList[r2]+this.data.myList[r4]
        var zhiji = "职级"+this.data.myList[r2]+this.data.myList[r4]
        var gangwei = "岗位"+this.data.myList[r2]+this.data.myList[r4]
        var num ='135'+Math.floor(Math.random()*100000000)
        var phone =Date.parse(new Date())/100
        window.phone = phone
        var username1 = "张"+this.data.myList[r2]+this.data.myList[r5]
        window.username1 = username1
        var fenlei = "测试"+this.data.myList[r]+this.data.myList[r4]
        var beizhu = "测试"+this.data.myList[r]+this.data.myList[r4]
        cy.createRmp(fenlei,beizhu,username,zhiji,gangwei,num,phone)
        //查看员工
        cy.contains('查看').click()
        cy.get(':nth-child(1) > :nth-child(1) > .val').should('contain',username)
        //修改姓名
        cy.contains('员工管理').click()
        cy.contains('修改').click()
        //员工姓名
        cy.get(':nth-child(1) > :nth-child(1) > .form-item > .ivu-form-item-content > .form-control > .ivu-input').clear().type(username1)
        //确定提交
        cy.get('.btn').click()
        cy.contains('查看').click()
        cy.get(':nth-child(1) > :nth-child(1) > .val').should('contain',username1)
    })
    
    it('员工账号-停用-启用-授权-重置密码',function(){
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
        cy.visit('/')
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
