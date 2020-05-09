# coding:utf-8
import json, glob, os, time, re, sys
import requests
import smtplib
from email.mime.text import MIMEText
from email.header import Header
from email.mime.multipart import MIMEMultipart
from selenium import webdriver
from email.mime.image import MIMEImage
from email.mime.application import MIMEApplication

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

    def send_mail(self, title, path, receiver,path1):
        # 第三方 SMTP 服务
        mail_host = "smtp.mxhichina.com"  # 设置服务器
        mail_user = "zhaobaode@sanweiguoye.onaliyun.com"  # 用户名
        mail_pass = "26678ac2"  # 口令
        sender = 'zhaobaode@sanweiguoye.onaliyun.com'
        # 设置邮件接收人列表
        receivers = list(receiver)
        #打开文件
        driver = webdriver.Chrome()
        driver.get(path)
        time.sleep(2)
        driver.save_screenshot(path1+'\\image.png')
        driver.quit()

        # 创建一个带附件的实例
        message = MIMEMultipart()
        message['From'] = Header("EHR_SIT_UI", 'utf-8')
        message['To'] = Header("相关负责人", 'utf-8')
        message['Subject'] = Header(title, 'utf-8')
        # 以html格式构建邮件内容
        send_str = '<html><body>'
        send_str += f'<center>自动化报告截图-详细报至测试服务器{path}查看！</center>'
        # html中以<img>标签添加图片，align和width可以调整对齐方式及图片的宽度
        send_str += '<img src="cid:image1" alt="image1" align="center" width=100% >'
        send_str += '<center>上边是一张图片</center>'
        send_str += '</body></html>'

        # 添加邮件内容
        content = MIMEText(send_str, _subtype='html', _charset='utf8')
        message.attach(content)

        # 构建并添加图像对象
        img1 = MIMEImage(open(path1+'\\image.png', 'rb').read(), _subtype='octet-stream')
        img1.add_header('Content-ID', 'image1')
        message.attach(img1)

        otherStyleTime = time.strftime("%Y%m%d%H%M%S", time.localtime(time.time()))
        # # 如果不想直接在邮件中展示图片，可以以附件形式添加
        # img = MIMEImage(open(path1+'\\image.png', 'rb').read(), _subtype='octet-stream')
        # img.add_header('Content-Disposition', 'attachment', filename=otherStyleTime+'-Report.png')
        # message.attach(img)

        #附件为html文件
        # path22 = self.get_new_file()
        # html = MIMEApplication(open(path22, 'rb').read(), _subtype='octet-stream')
        # html.add_header('Content-Disposition', 'attachment', filename=otherStyleTime+'-Report.html')
        # # html["Content-Type"] = 'application/octet-stream'
        # # html["Content-Disposition"] = 'attachment; filename="EHR_UI_report.html"'
        # message.attach(html)
        # print(path22)

        pdfFile = self.get_new_file()
        pdfApart = MIMEApplication(open(pdfFile, 'rb').read())
        pdfApart.add_header('Content-Disposition', 'attachment', filename=pdfFile)
        message.attach(pdfApart)


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
    #获取最新的文件
    def get_new_file(self):
        #远程电脑
        #path = 'C:/autotest/project/EHR_SIT_UI/cypress/results'
        #本地
        path = 'D:/gittest/pytest/sanweiguo/Cypress_Jenkins/cypress/results'
        #获取文件夹中的所有文件
        lists = os.listdir(path)
        #对获取的文件根据修改时间进行排序
        lists.sort(key=lambda x:os.path.getmtime(path +'\\'+x))
        #把目录和文件名合成一个路径get_
        file_new = os.path.join(path,lists[-1])
        return file_new

    # 发送报告
    def send_report(self):
        #获取当前路径
        path = os.path.split(os.path.realpath(__file__))[0]
        #创建selenium_pic路径
        try:
            os.mkdir(path+'/cypress/selenium_pic')
        finally:
            ll = [
                (path+r'\cypress\results', 'EHR_SIT_UI-自动化报告',
                 'http://118.25.188.8:8080/jenkins/job/EHR_SIT_UI/build?token=2020',
                 ('xuyuan@sanweiguoye.onaliyun.com','cengqi@sanweiguoye.onaliyun.com'),path+r'\cypress\selenium_pic')]

            for i, j, z, x, m in ll:
                f1 = dingHook().search_all_files_return_by_time_reversed(i)
                # print(f1[0])
                Logger().write(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) + '   报告文件路径：' + f1[0] + '\n')

                with open(f1[0], encoding='UTF-8') as f:
                    f2 = f.read()
                    # 正则表达式提取相关参数
                    re_list = re.findall(r'tests&quot;:(.*?),&quot;passes&quot;:(.*?),&quot;pending&quot;:0,&quot;failures&quot;:(.*?)', f2, re.S)
                    case_count=re_list[0][0]
                    case_pass=re_list[0][1]
                    case_fail=int(case_count)-int(case_pass)
                    #print(case_count,case_fail)
                    f.close()

                try:
                    if  case_fail != 0:
                        # # 发送钉钉机器人
                        # dingHook().markdown( '【异常】'+j, f'用例总数：{case_count}，通过数：{case_pass},失败数：{case_fail}',
                        #                      '详细报告可查看邮件！')
                        # 失败发送邮件
                        dingHook().send_mail(r'【异常】' + j, f1[0], x, m)
                    else:
                        # dingHook().markdown('【正常】'+j, f'用例总数：{case_count}，通过数：{case_pass}，失败数：{case_fail}',
                        #                     f'详细报告可查看邮件！')
                        dingHook().send_mail(r'【正常】' + j, f1[0], x, m)
                    print('11')
                except Exception as e:
                    # print(e+'\n','！！！执行异常！！！')
                    Logger().write(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) + e + '\n', '！！！执行异常！！！\n')
                    print('22')

                else:
                    # print(j+'-->脚本运行完成')
                    Logger().write(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) + '   ' + j + '-->脚本运行完成\n')


if __name__ == '__main__':
    dingHook().send_report()

   # print (dingHook().get_new_file())