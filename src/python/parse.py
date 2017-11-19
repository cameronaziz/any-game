#! /usr/bin/python
# -*- coding: UTF-8 -*-

from HTMLParser import HTMLParser
import json
import Tkinter, tkFileDialog
import os,os.path

root = Tkinter.Tk()
root.withdraw()
file_name = tkFileDialog.askopenfilename()
seatingChartSVG = open(file_name, "r").read()
data = []
class HTMLParser(HTMLParser):
	def handle_starttag(self, tag, attrs):
		if tag == 'polygon':
			for attribute, value in attrs:
				if attribute == 'points':
					item = {"points": value}
					item["name"] = len(data)
					data.append(item)


parser = HTMLParser()
parser.feed(seatingChartSVG)

short_name = file_name.rsplit('/', 1)[1]
curfilePath = os.path.abspath(__file__)
curDir = os.path.abspath(os.path.join(curfilePath, os.pardir))
json_data = json.dumps(data)
saved_file = short_name.rsplit('.')[0] + ".txt"

file = open(curDir + "/output/" + saved_file,"w")
file.write(json_data)
file.close

print('\n')
print('\nParse is complete.')
print(short_name + " has been parsed.\n\nThe following file has been created:\n" + curDir + "/output/" + saved_file + " has been created.")
print('\n')
