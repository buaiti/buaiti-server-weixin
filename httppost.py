#!/usr/bin/env python3
#-*- coding: utf-8 -*-

import urllib.request,urllib.parse
#
import http.client
import json
#

# params = {"tuwenlist":[{"title":"中文编码1","description":"中文编码1",
# "picUrl" : "http://weizhifeng.net/images/tech/composer.png",
#     "url" : "http://tv.sohu.com"},{"title":"中文编码2","description":"中文编码1",
# "picUrl" : "http://weizhifeng.net/images/tech/composer.png",
#     "url" : "http://tv.sohu.com"},{"title":"中文编码3","description":"中文编码1",
# "picUrl" : "http://weizhifeng.net/images/tech/composer.png",
#     "url" : "http://tv.sohu.com"},{"title":"中文编码4","description":"中文编码1",
# "picUrl" : "http://weizhifeng.net/images/tech/composer.png",
#     "url" : "http://tv.sohu.com"}]}

list = []
params = {"tuwenlist":list}

for line in open("url1.csv",encoding="utf-8"):
    line = line.split('|')
    info = {"title":line[3],"description":line[3],"picUrl" : line[5],"url" : line[4]}
    list.append(info)
    print(line[3])
    print(line[4])
    print(line[5])
    

params = json.JSONEncoder().encode(params)
 
 
headers = {"Content-type":"text/plain",
      'Content-Length': len(params)}
 
print(params)
print(len(params))
 
conn = http.client.HTTPConnection("ponyccemma.duapp.com")
conn.request("POST", "/puttuwen", params, headers)
r1 = conn.getresponse()
print(r1.status, r1.reason)
data = r1.read()
print(data)
conn.close()