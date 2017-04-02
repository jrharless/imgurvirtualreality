import requests

command, arguments = "search", ["jojos bizzare adventure"]
r = requests.post('http://127.0.0.1:5000', data={'command': command, 'arguments': arguments})
print(r.text)
