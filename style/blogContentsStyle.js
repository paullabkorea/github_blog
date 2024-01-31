// 마크다운으로 읽어온 내용을 HTML로 변환하여 tailwind를 사용한 스타일링
function styleMarkdown(kinds, text, title_info = null) {

    // console.log(kinds)
    // console.log(text)
    // console.log(title_info)

    const tempDiv = document.createElement('div');
    const html = marked.parse(text);
    tempDiv.innerHTML = html;

    tempDiv.querySelectorAll('h1').forEach(h1 => h1.classList.add(...posth1Style.split(" ")));
    tempDiv.querySelectorAll('h2').forEach(h2 => h2.classList.add(...posth2Style.split(" ")));
    tempDiv.querySelectorAll('h3').forEach(h3 => h3.classList.add(...posth3Style.split(" ")));
    tempDiv.querySelectorAll('h4').forEach(h4 => h4.classList.add(...posth4Style.split(" ")));
    tempDiv.querySelectorAll('h5').forEach(h5 => h5.classList.add(...posth5Style.split(" ")));
    tempDiv.querySelectorAll('h6').forEach(h6 => h6.classList.add(...posth6Style.split(" ")));

    tempDiv.querySelectorAll('p').forEach(p => p.classList.add(...postpStyle.split(" ")));
    tempDiv.querySelectorAll('img').forEach(img => img.classList.add(...postimgStyle.split(" ")));
    tempDiv.querySelectorAll('a').forEach(a => a.classList.add(...postaStyle.split(" ")));

    tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add(...postulStyle.split(" ")));
    tempDiv.querySelectorAll('ol').forEach(ol => ol.classList.add(...postolStyle.split(" ")));
    tempDiv.querySelectorAll('li').forEach(li => li.classList.add(...postliStyle.split(" ")));

    tempDiv.querySelectorAll('blockquote').forEach(blockquote => blockquote.classList.add(...postblockquoteStyle.split(" ")));
    tempDiv.querySelectorAll('pre').forEach(pre => pre.classList.add(...postpreStyle.split(" ")));
    tempDiv.querySelectorAll('code').forEach(code => code.classList.add(...postcodeStyle.split(" ")));

    tempDiv.querySelectorAll('table').forEach(table => table.classList.add(...posttableStyle.split(" ")));
    tempDiv.querySelectorAll('thead').forEach(thead => thead.classList.add(...posttheadStyle.split(" ")));
    tempDiv.querySelectorAll('th').forEach(th => th.classList.add(...postthStyle.split(" ")));
    tempDiv.querySelectorAll('tbody').forEach(tbody => tbody.classList.add(...posttbodyStyle.split(" ")));
    tempDiv.querySelectorAll('td').forEach(td => td.classList.add(...posttdStyle.split(" ")));

    tempDiv.querySelectorAll('hr').forEach(hr => hr.classList.add(...posthrStyle.split(" ")));
    tempDiv.querySelectorAll('em').forEach(em => em.classList.add(...postemStyle.split(" ")));
    tempDiv.querySelectorAll('strong').forEach(strong => strong.classList.add(...poststrongStyle.split(" ")));


    if (kinds === 'post') {
        // 일반 마크다운 블로그 포스트
        const title_section = document.createElement('div');

        // title
        const title = document.createElement('h1');
        title.classList.add(...posttitleStyle.split(" "));
        // console.log(title_info)
        title.textContent = title_info.title;
        title_section.appendChild(title);

        // image
        const image = document.createElement('img');
        image.src = title_info.thumbnail;
        image.alt = title_info.title;
        image.classList.add(...postimgtitleStyle.split(" "));
        title_section.appendChild(image);

        // date과 category를 담는 div
        const date_category = document.createElement('div');
        date_category.classList.add(...postdatecategoryDivStyle.split(" "));
        title_section.appendChild(date_category);

        // category
        // category는 클릭하면 해당 카테고리의 블로그 리스트를 렌더링
        const category = document.createElement('a');
        category.classList.add(...postcategoryStyle.split(" "));
        category.textContent = 'category: ' + title_info.category;

        category.onclick = (event) => {
            event.preventDefault();
            // console.log('click')
            search(title_info.category)
            const url = new URL(origin);
            url.searchParams.set('search', title_info.category);
            window.history.pushState({}, '', url);
        }

        date_category.appendChild(category);

        // date
        const date = document.createElement('div');
        date.classList.add(...postdateStyle.split(" "));
        date.textContent = 'date: ' + formatDate(title_info.date);
        date_category.appendChild(date);


        // section styling
        title_section.classList.add(...postsectionStyle.split(" "));

        tempDiv.insertBefore(title_section, tempDiv.firstChild);
    } else if (kinds === 'menu') {
    }


    // innerHTML을 사용하면 click이벤트가 사라지므로, appendChild를 사용하여 렌더링
    const contentsDiv = document.getElementById('contents');
    while (contentsDiv.firstChild) {
        contentsDiv.removeChild(contentsDiv.firstChild);
    }
    contentsDiv.appendChild(tempDiv);

    hljs.highlightAll();
}

function styleJupyter(kinds, text, title_info = null) {
    const tempDiv = document.createElement('div');
    const html = convertIpynvToHtml(text);
    // const html = marked.parse(text);
    tempDiv.innerHTML = html;

    tempDiv.querySelectorAll('.markdown-cell').forEach(markdownCell => {
        markdownCell.querySelectorAll('h1').forEach(h1 => h1.classList.add(...posth1Style.split(" ")));
        markdownCell.querySelectorAll('h2').forEach(h2 => h2.classList.add(...posth2Style.split(" ")));
        markdownCell.querySelectorAll('h3').forEach(h3 => h3.classList.add(...posth3Style.split(" ")));
        markdownCell.querySelectorAll('h4').forEach(h4 => h4.classList.add(...posth4Style.split(" ")));
        markdownCell.querySelectorAll('h5').forEach(h5 => h5.classList.add(...posth5Style.split(" ")));
        markdownCell.querySelectorAll('h6').forEach(h6 => h6.classList.add(...posth6Style.split(" ")));

        markdownCell.querySelectorAll('p').forEach(p => p.classList.add(...postpStyle.split(" ")));
        markdownCell.querySelectorAll('img').forEach(img => img.classList.add(...postimgStyle.split(" ")));
        markdownCell.querySelectorAll('a').forEach(a => a.classList.add(...postaStyle.split(" ")));

        markdownCell.querySelectorAll('ul').forEach(ul => ul.classList.add(...postulStyle.split(" ")));
        markdownCell.querySelectorAll('ol').forEach(ol => ol.classList.add(...postolStyle.split(" ")));
        markdownCell.querySelectorAll('li').forEach(li => li.classList.add(...postliStyle.split(" ")));

        markdownCell.querySelectorAll('blockquote').forEach(blockquote => blockquote.classList.add(...postblockquoteStyle.split(" ")));
        markdownCell.querySelectorAll('pre').forEach(pre => pre.classList.add(...postpreStyle.split(" ")));
        markdownCell.querySelectorAll('code').forEach(code => code.classList.add(...postcodeStyle.split(" ")));

        markdownCell.querySelectorAll('table').forEach(table => table.classList.add(...posttableStyle.split(" ")));
        markdownCell.querySelectorAll('thead').forEach(thead => thead.classList.add(...posttheadStyle.split(" ")));
        markdownCell.querySelectorAll('th').forEach(th => th.classList.add(...postthStyle.split(" ")));
        markdownCell.querySelectorAll('tbody').forEach(tbody => tbody.classList.add(...posttbodyStyle.split(" ")));
        markdownCell.querySelectorAll('td').forEach(td => td.classList.add(...posttdStyle.split(" ")));

        markdownCell.querySelectorAll('hr').forEach(hr => hr.classList.add(...posthrStyle.split(" ")));
        markdownCell.querySelectorAll('em').forEach(em => em.classList.add(...postemStyle.split(" ")));
        markdownCell.querySelectorAll('strong').forEach(strong => strong.classList.add(...poststrongStyle.split(" ")));

    });

    tempDiv.querySelectorAll('pre').forEach(pre => {
        pre.classList.add(...notebookpreStyle.split(" "));

        // 복사 버튼 생성
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.classList.add(...notebookcopyButtonStyle.split(" "));

        // 복사 버튼 클릭 이벤트, pre에 텍스트가 있는 경우에만 활성화
        copyButton.addEventListener('click', async function (event) {
            event.stopPropagation(); // 이벤트 버블링을 막습니다.
            try {
                await navigator.clipboard.writeText(pre.textContent);
                alert('Copied!');
            } catch (err) {
                console.error('Failed to copy text: ', err);
                alert('Copy failed.');
            }
        });

        // pre 요소 안에 버튼 삽입
        pre.appendChild(copyButton);
    });

    const contentsDiv = document.getElementById('contents');
    while (contentsDiv.firstChild) {
        contentsDiv.removeChild(contentsDiv.firstChild);
    }
    // 노트북 다운로드 버튼 추가
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Notebook Download';
    downloadButton.classList.add(...notebookdownloadButtonStyle.split(" "));
    downloadButton.addEventListener('click', function (event) {
        event.stopPropagation(); // 이벤트 버블링을 막습니다.
        const blob = new Blob([text], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = title_info.title + '.ipynb';
        a.click();
        window.URL.revokeObjectURL(url);
    });
    contentsDiv.appendChild(downloadButton);
    contentsDiv.appendChild(tempDiv);
    hljs.highlightAll();
}
