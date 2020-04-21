'''
封装接口请求方式get/post/delete

'''

import requests
import json
class ApiRunMain(object):
    def post_main(self,url,data,header=None):
        res = None
        if header!=None:
            res = requests.post(url = url,data = data,headers = header).json()
        else:
            res = requests.post(url = url,data = data).json()
        return res
    def get_main(self,url,data=None,header=None):
        res = None
        if header!=None:
            res = requests.get(url = url,headers = header).json()
        else:
            res = requests.get(url = url).json()
        return res
    def delete_main(self,url,header=None):
        res = None
        if header != None:
            res = requests.get(url = url, headers = header).json()
        else:
            res = requests.get(url = url).json()
        return res
    def put_main(self,url,data,header=None):
        res = None
        if header!=None:
            res = requests.put(url = url,data = data,headers = header).json()
        else:
            res = requests.put(url = url,data = data).json()
        return res
    def run_main(self,method,url,data=None,header=None):
        res = None
        if method == 'post':
            res = self.post_main(url,data,header)
        elif method == 'get':
            res = self.get_main(url,data=data,header=header)
        elif method =='put':
            res = self.get_main(url, data=data, header=header)
        else:
            res = self.delete_main(url,header)
        return res
if __name__=='__main__':
    method = 'get'
    url = 'http://192.168.6.131:8080/systemInfo'
    header = {"Content-Type": "application/json", "charset":"UTF-8"}
    data = {
                "description": "",
                "name": "",
                "code": "",
                "parentId": 0,
                "createId": 0,
                "createName": "",
                "createTime": 0,
                "id": 0,
                "orderBy": "",
                "pageNum": 0,
                "pageSize": 0,
                "status": 0,
                "updateId": 0,
                "updateName": "",
                "updateTime": 0,
                "whereExt": {}
            }
    da = json.dumps(data)
    print(type(header))
    print(type(data))
    print(type(da))

    res = ApiRunMain().run_main(method=method,url=url,data=da,header=header)
    #res = ApiRunMain().get_main(url=url)
    print (res)


