﻿# coding:utf-8
import json, glob, os, time, re, sys
import requests
import smtplib
from email.mime.text import MIMEText
from email.header import Header
from email.mime.multipart import MIMEMultipart

class Logger():
    def __init__(self, fileN="python_sendreport.log"):
        self.terminal = sys.stdout
        self.log = open(fileN, "a")

    def write(self, message):
        self.terminal.write(message)
        self.log.write(message)

    def flush(self):
        pass


class dingHook(object):
    # 钉钉发送markdown方法
    def markdown(self, project, text, text1):
        self.url = "https://oapi.dingtalk.com/robot/send?access_token=b06808858af9dfdc2b227289681134cf6d84ad4276749777151a201da5c22665"
        data = {
            "msgtype": "markdown",
            "markdown": {
                "title": "运行报告,请查看！",
                "text": f'### **{project}**\n' +
                        f"> {text}\n\n" +
                        # "> ![screenshot](https://gw.alicdn.com/tfs/TB1ut3xxbsrBKNjSZFpXXcXhFXa-846-786.png)\n"+
                        f"> ##### {text1} \n"
                # "> ###### 具体可查看邮件[链接](C:/Users/lenovo/Desktop/12.html) \n"
            },
            "at": {
                "atMobiles": [
                    "18601763587",
                    ""
                ],
                "isAtAll": False
            }
        }
        data = json.dumps(data).encode(encoding='UTF8')
        head = {"Content-Type": "application/json"}
        response = requests.post(self.url, data=data, headers=head)
        # 调用钉钉返回结果转json格式
        res_code = json.loads(response.text)
        # print(res_code['errcode'])
        if res_code['errcode'] == 0:
            # print('钉钉消息推送成功！')
            Logger().write(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) + '   ' + "钉钉消息推送成功\n")

        else:
            print('钉钉消息推送失败!')
            Logger().write(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) + "钉钉消息推送失败\n")

    def send_mail(self, title, path, receiver):
        # 第三方 SMTP 服务
        mail_host = "smtp.mxhichina.com"  # 设置服务器
        mail_user = "zhaobaode@sanweiguoye.onaliyun.com"  # 用户名
        mail_pass = "26678ac2"  # 口令
        sender = 'zhaobaode@sanweiguoye.onaliyun.com'
        # 设置邮件接收人列表
        receivers = list(receiver)
        # with open(path, encoding='UTF-8') as f:
        #     h = f.read()
        #     f.close()
        # 创建一个带附件的实例
        message = MIMEMultipart()
        message['From'] = Header("测试服务器", 'utf-8')
        message['To'] = Header("相关负责人", 'utf-8')
        subject = title
        message['Subject'] = Header(subject, 'utf-8')
        # 邮件正文内容
        message.attach(MIMEText(f'{title},请及时查收附件！', 'plain', 'utf-8'))
        # 构造附件1，
        att1 = MIMEText(open(path, 'rb').read(), 'base64', 'utf-8')
        att1["Content-Type"] = 'application/octet-stream'
        # 这里的filename可以任意写，写什么名字，邮件中显示什么名字
        att1["Content-Disposition"] = f'attachment; filename={path[-27:]}'
        message.attach(att1)
        # message = MIMEText(h, 'html', 'utf-8')
        try:
            server = smtplib.SMTP_SSL(host=mail_host)  # 在阿里云上python2.7以上需要使用SSL协议
            server.connect(mail_host, port=465)  # 阿里云25 和80 端口均被使用 465端口使用 SSL协议
            server.login(mail_user, mail_pass)
            server.sendmail(sender, receivers, message.as_string())
            server.close()
            # print(title + "-->邮件发送成功")
            Logger().write(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) + '   ' + title + "-->邮件发送成功\n")
        # except smtplib.SMTPException:
        except Exception as e:
            # print(e+"Error: 无法发送邮件")
            Logger().write(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) + e + "Error: 无法发送邮件\n")

    # 文件倒序
    def search_all_files_return_by_time_reversed(self, path, reverse=True):
        return sorted(glob.glob(os.path.join(path, '*')),
                      key=lambda x: time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(os.path.getctime(x))),
                      reverse=reverse)

    # 发送报告
    def send_report(self):
        ll = [
            (r'C:\autotest\project\EHR_SIT_UI\cypress\results', 'EHR_SIT_UI-自动化报告',
             'http://118.25.188.8:8080/jenkins/job/EHR_SIT_UI/build?token=2020',
             ('xuyuan@sanweiguoye.onaliyun.com', 'cengqi@sanweiguoye.onaliyun.com','zhaobaode@sanweiguoye.onaliyun.com')
             )
        ]

        for i, j, z, x in ll:
            f1 = dingHook().search_all_files_return_by_time_reversed(i)
            # print(f1[0])
            Logger().write(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) + '   报告文件路径：' + f1[0] + '\n')

            with open(f1[0], encoding='UTF-8') as f:
                f2 = f.read()
                # 正则表达式提取相关参数
                re_list = re.findall(r'tests="(.*?)" failures="(.*?)"', f2, re.S)
                case_count=re_list[0][0]
                case_fail=re_list[0][1]
                print(case_count,case_fail)
                f.close()

            try:
                if  int(case_fail) !=0:
                    # 发送钉钉机器人
                    dingHook().markdown( '【异常】'+j, f'用例总数：{case_count}，失败数：{case_fail}', '请及时查看邮件构建日志！')
                    # 失败发送邮件
                    #dingHook().send_mail(r'【异常】' + j, f1[0], x)
                else:
                    dingHook().markdown('【正常】'+j, f'用例总数：{case_count}，失败数：{case_fail}', f'详细报告至测试服务器{i}同目录下cypress\\videos下查看运行视频!')
            except Exception as e:
                # print(e+'\n','！！！执行异常！！！')
                Logger().write(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) + e + '\n', '！！！执行异常！！！\n')

            else:
                # print(j+'-->脚本运行完成')
                Logger().write(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) + '   ' + j + '-->脚本运行完成\n')


if __name__ == '__main__':
    dingHook().send_report()
