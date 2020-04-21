import xlrd
from xlutils.copy import copy
from excel_case.config.get_file import GetFile
# import os
# path1=os.path.abspath('.')   #表示当前所处的文件夹的绝对路径
class OperationExcel:
    def __init__(self,file_name = None,sheet_id = None):
        if file_name:
            self.file_name = file_name
            self.sheet_id = sheet_id
            self.data = self.get_data()
        else:
            self.file_name = GetFile().new_file('D:/py/sanweiguo/excel_case/case')
            # self.file_name = GetFile().new_file('../case')
            self.sheet_id = 0
            self.data = self.get_data()
    def get_data(self):
        data = xlrd.open_workbook(self.file_name)
        tables = data.sheet_by_index(self.sheet_id)
        return tables
    #获取单元格的行数
    def get_lines(self):
        tables = self.data
        return tables.nrows
    #获取某一个单元格的内容
    def get_cell_value(self,row,rol):
        return self.data.cell_value(row,rol)
    #判断预期结果是否在实际结果内
    def is_contain(self,str_one,str_two):
        flag = None
        if str_one in str_two:
            flag = '通过'
        else: flag = "失败"
        return flag
    #写入数据
    def write_value(self,row,rol,value,file_name=None):
        read_data = xlrd.open_workbook(self.file_name)
        write_data = copy(read_data)
        sheet_data = write_data.get_sheet(0)
        sheet_data.write(row,rol,value)
        if file_name:
            write_data.save(file_name)
        else:
            write_data.save(self.file_name)
# if __name__ =='__main__':
#     a = OperationExcel().write_value(2,15,2121)
#     print(a)


