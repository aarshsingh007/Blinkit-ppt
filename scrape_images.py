import requests
import re
import os
import urllib.request

url = "https://medium.com/design-bootcamp/enhancing-the-user-experience-of-blinkit-app-a-ux-ui-case-study-8bc70ff6a0e4"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
response = requests.get(url, headers=headers)

if response.status_code == 200:
    os.makedirs('assets/screenshots', exist_ok=True)
    # Find all image URLs containing miro.medium.com
    html = response.text
    image_urls = re.findall(r'src="(https://miro.medium.com/v2/[^"]+)"', html)
    
    # Filter to get high res and deduplicate
    unique_urls = []
    for src in image_urls:
        if 'resize:fit:' in src:
            src = src.split('resize:fit:')[0] + 'resize:fit:1200' + src.split('resize:fit:')[1][src.split('resize:fit:')[1].find('/'):] if 'resize:fit:' in src else src
        if src not in unique_urls:
            unique_urls.append(src)
            
    count = 1
    for src in unique_urls:
        try:
            urllib.request.urlretrieve(src, f'assets/screenshots/img_{count}.jpg')
            print(f"Downloaded img_{count}.jpg")
            count += 1
        except Exception as e:
            print(f"Failed to download {src}: {e}")
else:
    print(f"Failed to fetch {url}. Status code: {response.status_code}")
