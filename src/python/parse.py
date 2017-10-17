#! /usr/bin/python

from HTMLParser import HTMLParser
import json

filename = "staples-center-image.svg"

staplesCenter = open(filename, "r").read()

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
parser.feed(staplesCenter)



json_data = json.dumps(data)

print(json_data)