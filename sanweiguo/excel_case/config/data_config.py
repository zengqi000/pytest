'''
配置excel，获取excel内字段名称

'''

import json
import os

class global_var:
    id = 0
    case_name = 1
    is_run = 2
    url =3
    request_way = 4
    header = 5
    data = 6
    expect = 7
    result = 8
    is_pass = 9
    count = 10

def get_id():
    return global_var.id
def get_case_name():
    return global_var.case_name
def get_is_run():
    return global_var.is_run
def get_url():
    return global_var.url
def get_request_way():
    return global_var.request_way
def get_header():
    return global_var.header
def get_data():
    return global_var.data
def get_expect():
    return global_var.expect
def get_result():
    return global_var.result
def get_is_pass():
    return global_var.is_pass
def get_count():
    return global_var.count

