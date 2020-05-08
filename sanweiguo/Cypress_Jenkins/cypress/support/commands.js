// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

//创建机构分类
Cypress.Commands.add('createOrgCategory',(name,beizhu)=>{
    cy.visit('/')
    cy.get('.btn-wrap > .ivu-btn-success').click()
    cy.get('.btn-wrap > .ivu-btn').should('contain','新增分类').click()
    //点击新增分类
    //cy.get('.btn-wrap > .ivu-btn').click()
    cy.get('.ivu-form-item-required > .ivu-form-item-content > .ivu-input-wrapper > .ivu-input').type(name)//输入分类名称
    cy.get(':nth-child(2) > .ivu-form-item-content > .ivu-input-wrapper > .ivu-input').type(beizhu)//输入备注
    cy.get('.ivu-btn-primary').click()//点击确定
    
})
//删除机构分类
Cypress.Commands.add('deleteOrgCategory',()=>{
    cy.contains('删除').click()
    cy.get('.ivu-modal-confirm-footer > .ivu-btn-primary').click()
    
    
})

//创建子机构
Cypress.Commands.add('createZiJigou',(name,beizhu,jigou,num)=>{
    cy.createOrgCategory(name,beizhu)
    cy.visit('/')
    //添加
    cy.get('.btn-wrap > :nth-child(2)').click()//点击创建子机构
    //输入机构名称
    cy.get('.add-suborg input[placeholder="请输入机构名称"]').type(jigou)
    //输入编制人数
    cy.get('.add-suborg input[placeholder="请输入编制人数"]').type(num)
    //输入机构分类
    cy.get('.ivu-table-body .ivu-table-row > td:nth-child(3) >.ivu-table-cell > div:nth-child(1) > .form-item >.ivu-form-item > .ivu-form-item-content').click()
    .contains(name)
    .click()
    cy.contains('确定').click()
})
//删除子机构
Cypress.Commands.add('deleteZiJigou',(jigouname)=>{
    cy.visit('/')
    cy.get('.search-wrap > .input > .ivu-input').clear().type(jigouname) //搜索框输入
    cy.get('.search-wrap > .ivu-btn-success').click() //搜索子机构
    cy.contains('删除').click()
    cy.get('.ivu-modal-confirm-footer > .ivu-btn-primary').click()
})

//新增员工分类
Cypress.Commands.add('createEmpCategory',(fenlei,beizhu)=>{
    cy.visit('/')
    cy.contains('员工管理').click()
    //新增员工分类      
    //点击员工分类
    cy.get('.operates > .btns > .ivu-btn-success').click()
    //点击新增分类
    cy.get('.add-btn > .ivu-btn').click()
    //输入分类名称
    cy.get('.ivu-form-item-required > .ivu-form-item-content > .ivu-input-wrapper > .ivu-input').type(fenlei)
    //输入备注
    cy.get(':nth-child(2) > .ivu-form-item-content > .ivu-input-wrapper > .ivu-input').type(beizhu)
    //点击确定
    cy.get('.btns > .ivu-btn-success').click()
})
//新增员工
Cypress.Commands.add('createRmp',(fenlei,beizhu,username,zhiji,gangwei,num,phone)=>{
    cy.createEmpCategory(fenlei,beizhu)
    cy.visit('/')
    cy.contains('员工管理').click()
    //点击新增员工
    cy.get('a.ivu-btn-default').click()
    //员工姓名
    cy.get(':nth-child(1) > :nth-child(1) > .form-item > .ivu-form-item-content > .form-control > .ivu-input').type(username)
    //证件类型
    cy.get(':nth-child(1) > :nth-child(2) > .form-item > .ivu-form-item-content > .form-control > .ivu-select-selection > div > .ivu-select-placeholder').click()
    cy.contains('中国护照')
    .click()
    //职级
    cy.get(':nth-child(2) > :nth-child(1) > .form-item > .ivu-form-item-content > .form-control > .ivu-input').type(zhiji)
    //岗位名称
    cy.get(':nth-child(2) > :nth-child(2) > .form-item > .ivu-form-item-content > .form-control > .ivu-input').type(gangwei)
    //机构名称
    cy.get('.ivu-dropdown-rel > .ivu-input-wrapper > .ivu-input').click()
    cy.contains('机构正牛').click()
    //证件号码      
    cy.get(':nth-child(3) > :nth-child(2) > .form-item > .ivu-form-item-content > .form-control > .ivu-input').type(num)
    //手机号码
    cy.get(':nth-child(4) > :nth-child(1) > .form-item > .ivu-form-item-content > .form-control > .ivu-input').type(phone)
    //合同类型
    cy.get(':nth-child(4) > :nth-child(2) > .form-item > .ivu-form-item-content > .form-control > .ivu-select-selection > div > .ivu-select-placeholder').click()
    cy.contains('劳动合同')
    .click()
    //员工分类
    cy.get(':nth-child(5) > :nth-child(1) > .form-item > .ivu-form-item-content > .form-control > .ivu-select-selection > div > .ivu-select-placeholder').click()
    cy.contains(fenlei)
    .click()
    //入职日期
    cy.get(':nth-child(5) > :nth-child(2) > .form-item > .ivu-form-item-content > .form-control > .ivu-date-picker-rel > .ivu-input-wrapper > .ivu-input').click()
    .type('2020-04-20').click()
    //联系地址
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
   





})







