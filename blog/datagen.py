# 해당 파일은 테스트용도이며 실제 서비스에는 포함되지 않습니다.
# [20240101]_[title0101]_[test]_[]_[테스트용입니다]_[].md 파일부터 [20241230]_[title1230]_[test]_[]_[테스트용입니다]_[].md까지 원하는 월을 선택해 생성해주는 파일입니다.
# 원하는 월은 python 파일에서 input 함수로 입력받습니다.
# 파일 안에 들어가는 텍스트는 아래와 같습니다.

"""
# 테스트용입니다.

---

* 20240101_[title0101]_[test]_[]_[테스트용입니다]_[].md 파일입니다.
"""

import os
import datetime
import random

# 날짜 생성
start_date = datetime.date(2024, 1, 1)
end_date = datetime.date(2024, 12, 30)
delta = datetime.timedelta(days=1)
date_list = []
input_month = int(input("몇 월을 생성하시겠습니까? "))

while start_date <= end_date:
    date_list.append(start_date)
    start_date += delta

# 파일 생성
for date in date_list:
    if date.month == input_month:
        # f-string 사용
        file_name = f'[{date.strftime("%Y%m%d")}]_[title{date.strftime("%m%d")}]_[test]_[]_[테스트용입니다]_[].md'
        file_text = f"""
# 테스트용입니다.

---

* {date.strftime("%Y%m%d")}_{file_name} 파일입니다.
"""
        with open(file_name, "w", encoding="utf-8") as f:
            f.write(file_text)
