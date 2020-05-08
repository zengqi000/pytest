#coding=utf-8
import unittest
from selenium import webdriver
from time import sleep

class TestCase11(unittest.TestCase):
    def setUp(self) -> None:
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
    def Test_case_001(self):
        url = 'http://212.64.65.77:31595/#/org-structure'
        self.driver.get(url)
        self.driver.implicitly_wait(10)
        self.driver.find_element_by_xpath('/html/body/div[1]/div[2]/div[2]/div[2]/div/div[2]/div[3]/div/div[1]/button[2]').click()
        self.driver.find_element_by_xpath('/html/body/div[3]/div[2]/div/div/div[2]/div/div[1]/div[2]/table/tbody/tr/td[2]/div/div/form/div/div/div[1]/input').send_keys("开始")

    def tearDown(self) -> None:
        sleep(10)
        self.driver.close()

if __name__ == '__main__':
    suit = unittest.TestSuite()
    suit.addTest(TestCase11('Test_case_001'))
    runner = unittest.TextTestRunner()
    runner.run(suit)
#















