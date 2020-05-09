#!/usr/bin/python3
import smtplib
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.utils import formataddr

my_sender = '787466095@qq.com'  # 发件人邮箱账号
my_pass = 'wglhoejoiwtlbbgh'  # 发件人邮箱密码(注意这个密码不是QQ邮箱的密码，是在QQ邮箱的SMTP中生成的授权码)
my_user = '787466095@qq.com'  # 收件人邮箱账号，我这边发送给自己

def mail():


    # 创建一个带附件的实例
    message = MIMEMultipart()

    message.attach(MIMEText('邮件正文', 'plain', 'utf-8'))  # 填写邮件内容
    message['From'] = formataddr(["FromRunoob", my_sender])  # 括号里的对应发件人邮箱昵称、发件人邮箱账号
    message['To'] = formataddr(["FK", my_user])  # 括号里的对应收件人邮箱昵称、收件人邮箱账号
    message['Subject'] = "发送邮件测试"  # 邮件的主题，也可以说是标题

    #附件
    att = MIMEApplication(open('C:/Users/lenovo/Desktop/mochawesome.html', 'rb').read())
    att["Content-Type"] = 'application/octet-stream'
    att["Content-Disposition"] = 'attachment; filename="Log.html"'
    message.attach(att)

    server = smtplib.SMTP_SSL("smtp.qq.com", 465)  # 发件人邮箱中的SMTP服务器，端口是25
    server.login(my_sender, my_pass)  # 括号中对应的是发件人邮箱账号、邮箱密码
    server.sendmail(my_sender, [my_user, ], message.as_string())  # 括号中对应的是发件人邮箱账号、收件人邮箱账号、发送邮件
    server.quit()  # 关闭连接


ret = mail()
