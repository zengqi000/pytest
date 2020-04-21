import json
from excel_case.config.get_file import GetFile

# import os
# path1=os.path.abspath('.')   #表示当前所处的文件夹的绝对路径
class OperationJson:
    def __init__(self):
        self.data = self.read_data()
    #读取json文件
    def read_data(self,kworld=None):
        json_file = GetFile().new_file('D:/py/sanweiguo/excel_case/data')
        # json_file = GetFile().new_file('../data')
        with open(json_file,encoding='UTF-8') as fp:
            data = json.load(fp)
            return data
    #通过关键字获取数据
    def get_data(self,kworld):
        return self.data[kworld]
if __name__ == '__main__':

    a=OperationJson().get_data('yes')
    print(a)
    print(type(a))
