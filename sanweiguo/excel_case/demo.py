#coding=utf-8
import requests

# url = 'http://150.158.115.43:30243/guowy-authority-webapp/role/105/authorizeSystem'
# header = {"Content-Type": "application/json","charset":"UTF-8","Accept":"application/json"}
# re = requests.get(url,header)
# print(re.text)
# print(re.status_code)
# print(type(re.text))
import unittest
from selenium import webdriver
from time import sleep

class TestCase11(unittest.TestCase):
    def setUp(self) -> None:
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
    def Test_case_001(self):
        url = 'http://150.158.115.43:31828/index.html#/user/authority'
        self.driver.get(url)
        self.driver.implicitly_wait(10)
    def tearDown(self) -> None:
        self.driver.close()

if __name__ == '__main__':
    suit = unittest.TestSuite()
    suit.addTest(TestCase11('Test_case_001'))
    runner = unittest.TextTestRunner()
    runner.run(suit)

















