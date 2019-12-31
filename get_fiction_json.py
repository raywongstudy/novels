from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
from time import sleep

import re #for get name number
import json
import io #for file 
# Here for the headless options
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-gpu')
chrome_options.add_argument('--disable-dev-shm-usage')

def getTxt(driver):
	sleep(.5)
	text_ = driver.find_element_by_css_selector("#txt")
	text_ = text_.get_attribute('innerHTML')
	text_ = text_.replace("如果您觉得本书还不错，请粘贴以下网址分享给你的(QQ、微信或微博好友)，支持作者！<br>https://m.mingrenteahouse.com/shu/33112.html<button class=\"btn\" data-clipboard-text=\"https://m.mingrenteahouse.com/shu/33112.html#这本小说超级好看\">复制</button>","")
	text_ = text_.replace("<a href=\"javascript:posterror();\" style=\"text-align:center;color:red;\">『如果章节错误，点此举报』</a><br>第(1/2)页<br><br>","")
	text_ = text_.replace("<br><br>(本章未完,请翻页)第(2/2)页<br>","")
	return text_

def clickNext(driver):
	next_btn = driver.find_element_by_css_selector("#pb_next")
	next_btn.click()

def getChapterName(driver):
	name_ = driver.find_element_by_css_selector("#chaptername")
	return name_.get_attribute('innerText')

if __name__ == '__main__':

	driver = webdriver.Chrome(chrome_options=chrome_options)

	driver.get('https://m.mingrenteahouse.com/chapter.html?1#mybookid=33112&bookid=58637&chapterid=25307469')

	driver.implicitly_wait(10)

	data_lists = []
	data_list = ''
	try:
		for i in range(400):
			print('try:',i)#show current times

			#get fiction content
			text = getTxt(driver)
			name = getChapterName(driver)
			chapter = int(re.findall('\d+',name)[0])
			print('chapter:',chapter)

			if(text.find('(本章未完,请翻页)') > 0):
				clickNext(driver)
				text_2 = getTxt(driver)
				text = text + text_2

			data_list = {
				'name' : name,
				'chapter' : chapter,
				'content' : text
			}
			data_lists.append(data_list)
			clickNext(driver)

	except:
		print("fail")

	with open('fiction_data.json','w',encoding="utf-8") as outfile:
		json.dump(data_lists, outfile, ensure_ascii=False, indent=4)

	driver.quit()






