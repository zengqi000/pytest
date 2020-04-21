import re
from excel_case.config.api_run_main import ApiRunMain
from excel_case.config.get_data import GetData
from excel_case.operation.operation_excel import OperationExcel
from excel_case.config.data_config import global_var
from excel_case.operation.operation_json import OperationJson
import json

host = 'http://150.158.115.43:30243'
class RunTest:
    def __init__(self):
        self.run_method = ApiRunMain()
        self.data = GetData()

    def go_on_run(self):
        rows_count = self.data.get_case_lines()
        for row in range(1,rows_count):
            url = host+self.data.get_request_url(row)
            method = self.data.get_request_method(row)
            is_run = self.data.get_is_run(row)
            data = self.data.get_data_for_json(row)

            header = self.data.is_header(row)

            name = self.data.get_case_name(row)
            expect = self.data.get_expect_data(row)
            result_rol = global_var.result
            is_pass_rol = global_var.is_pass
            if is_run:
                res = '接口未发送请求，请检查url是否正确'
                is_pass= 'False'
                try:
                    #发送接口请求，并把返回结果转换为字符格式
                    res = str(self.run_method.run_main(method,url,data,header))
                    #正则去掉字符串中所有的标点符号
                    #预期结果
                    re_expect = re.sub('\W+','',expect)
                    #实际结果
                    re_res = re.sub('\W+','',res)
                    #判断实际结果是否包含预期结果
                    is_pass = str(OperationExcel().is_contain(re_expect,re_res))
                    if is_pass =='失败':
                        print("========================错误信息======================")
                        print("url:"+url)
                        print("请求参数为：")
                        print(data)
                        print("header:"+header)
                        print(type(header))
                except:
                    print("======错误信息=======")
                    print(res)
                    print("url:" + url)
                    print("请求参数为：")
                    print(data)
                    print(header)
                    print(type(data))
                    print(type(header))
                    #print("header:" + header)
               #写入数据（实际结果）
                OperationExcel().write_value(row,result_rol,res)
               #写入数据（是否通过）
                OperationExcel().write_value(row,is_pass_rol,is_pass)
                print('用例名称：'+name+'--------通过')
                print("实际结果："+res)
if __name__ == '__main__':
    run = RunTest()
    run.go_on_run()








