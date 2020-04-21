'''
获取excel内的测试用例内容

'''
from excel_case.operation.operation_excel import OperationExcel
from excel_case.operation.operation_json import OperationJson
from excel_case.config import data_config
import json
class GetData:
    def __init__(self):
        self.opera_excel = OperationExcel()
    #获取excel行数，也就是case的个数
    def get_case_lines(self):
        return self.opera_excel.get_lines()
    #获取是否执行
    def get_is_run(self,row):
        Flag = None
        rol = data_config.get_is_run()
        run_model = self.opera_excel.get_cell_value(row,rol)
        if run_model =='yes':
            Flag = True
        else:
            Flag = False
        return Flag
    #获取url
    def get_request_url(self,row):
        rol = data_config.get_url()
        url = self.opera_excel.get_cell_value(row,rol)
        return url
    #获取请求方式
    def get_request_method(self,row):
        rol = data_config.get_request_way()
        request_method = self.opera_excel.get_cell_value(row,rol)
        return request_method
    #获取是否携带header
    def is_header(self,row):
        rol = data_config.get_header()
        header = self.opera_excel.get_cell_value(row,rol)
        if header == 'no':
            return None
        else:
            try:
                #return eval(header)
                return OperationJson().get_data('yes')
            except:
                return '异常处理绕过验证函数参数是否有效'
    #获取请求数据
    def get_request_data(self,row):
        rol = data_config.get_data()
        data = self.opera_excel.get_cell_value(row,rol)
        if data == '':
            return None
        else:
            return data
    #通过关键字拿到请求参数
    def get_data_for_json(self,row):
        opera_json = OperationJson()
        request_data = opera_json.get_data(self.get_request_data(row))
        return request_data
    #获取预期结果
    def get_expect_data(self,row):
        rol = data_config.get_expect()
        expect_data = self.opera_excel.get_cell_value(row,rol)
        return expect_data

    def get_case_name(self,row):
        rol = data_config.get_case_name()
        case_name = self.opera_excel.get_cell_value(row,rol)
        return case_name

    def get_result(self,row):
        rol = data_config.get_result()
        result = self.opera_excel.get_cell_value(row,rol)
        return result


if __name__ =='__main__':
    print(GetData().get_case_lines())
