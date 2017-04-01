import requests

command, arguments = "search", ["dog memes"]
r = requests.post('http://127.0.0.1:5000', data={'command': command, 'arguments': arguments})
print(r.text)
