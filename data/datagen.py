# 해당 파일은 테스트용도이며 실제 서비스에는 포함되지 않습니다.
# blog폴더에 파일 목록을 읽어 local_blogList.json 파일을 생성해주는 파일입니다.
# 데이터 형식
"""
[
    {
        "name": "[20240118]_[title_test]_[python]_[]_[파이썬은 놀라운 언어입니다.]_[].md",
        "download_url": "/blog/[20240118]_[title_test]_[python]_[]_[파이썬은 놀라운 언어입니다.]_[].md"
    },
    {
        "name": "[20240119]_[title_test2]_[django]_[test.png]_[파이썬은 정말 재미있습니다.]_[].md",
        "download_url": "/blog/[20240119]_[title_test2]_[django]_[test.png]_[파이썬은 정말 재미있습니다.]_[].md"
    }
]
"""

import os
import json

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
