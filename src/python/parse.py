#! /usr/bin/python
# -*- coding: UTF-8 -*-

from HTMLParser import HTMLParser
import json
import Tkinter, tkFileDialog

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

json_data = json.dumps(data)
saved_file = short_name + ".txt"

file = open(saved_file,"w")
file.write(json_data)
file.close

print(short_name + " has been parsed and " + saved_file + " has been created.")


