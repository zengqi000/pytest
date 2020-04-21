import cx_Oracle
class Operation_Oracle:
    def __init__(self):
        self.db = self.connect()

    #连接数据库
    def connect(self):
        con = cx_Oracle.connect()
        return con
    #执行sql语句
    def run_sql(self,sql,rol=None):
        cursor = self.db.cursor()
        cursor.execute(sql)
        if rol !=None:
            data = cursor.fatchone()[rol]
            self.db.close()
            return data
        else:
            self.db.close()