# 해당 파일은 테스트용도이며 실제 서비스에는 포함되지 않습니다.
# blog 폴더에 [20240101]_[title0101]_[test]_[]_[테스트용입니다]_[].md 파일부터 [20241230]_[title1230]_[test]_[]_[테스트용입니다]_[].md까지 원하는 월을 선택해 생성해주는 파일입니다.
# 동시에 data 폴더에 local_blogList.json 파일을 생성해주는 파일입니다.
# 원하는 월은 python 파일에서 input 함수로 입력받습니다.

"""
# 테스트용입니다.

---

* `20240101_[title0101]_[test]_[]_[테스트용입니다]_[]`.md 파일입니다.
```python
def hello():
    print('하이라이팅 테스트입니다.')
```
"""

import os
import json
import datetime
import random

# 날짜 생성
start_date = datetime.date(2024, 1, 1)
end_date = datetime.date(2024, 12, 30)
delta = datetime.timedelta(days=1)
category = [
    "python",
    "ai",
    "javascript",
    "react",
    "django",
    "unity",
    "c",
    "c++",
    "SQL",
    "AWS",
]
lorem = "테스트용 로렘입숨입니다. 글자수가 많은 것부터 글자수가 적은 것까지 테스트하고 있습니다. 위니브 블로그는 베타이며 정식 런칭은 3월 즈음에 할 수 있을 것으로 보입니다."
test_img = ["","thumb1.webp", "thumb2.webp", "thumb3.webp", "default.png"]
date_list = []
input_month = int(input("몇 월을 생성하시겠습니까? "))

if input_month < 1 or input_month > 12:
    while start_date <= end_date:
        date_list.append(start_date)
        start_date += delta

    # 파일 생성
    for date in date_list:
        if date.month == input_month:
            # f-string 사용
            file_name = f'[{date.strftime("%Y%m%d")}]_[title{date.strftime("%m%d")}]_[{random.choice(category)}]_[{random.choice(test_img)}]_[{lorem[0:random.randint(5, 40)]}]_[].md'
            file_text = f"""
# 테스트용입니다.

* `{date.strftime("%Y%m%d")}_{file_name}` 파일입니다.

```python
def hello():
    print('하이라이팅 테스트입니다.')
```

```javascript
function hello() {{
    console.log('하이라이팅 테스트입니다.');
}}
```
"""
            # 경로를 ../blog로 설정하여 파일 생성
            with open(f"../blog/{file_name}", "w", encoding="utf-8") as f:
                f.write(file_text)

# 파일 목록 읽기
blog_list = os.listdir("../blog")

# json 파일 생성
with open("local_blogList.json", "w", encoding="utf-8") as f:
    json.dump(
        [{"name": file, "download_url": f"/blog/{file}"} for file in blog_list],
        f,
        ensure_ascii=False,
        indent=4,
    )
