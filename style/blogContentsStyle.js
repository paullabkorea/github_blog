// 마크다운으로 읽어온 내용을 HTML로 변환하여 tailwind를 사용한 스타일링
function styleMarkdown(kinds, text, title_info = null) {

    // console.log(kinds)
    // console.log(text)
    // console.log(title_info)

    const tempDiv = document.createElement('div');
    const html = marked.parse(text);
    tempDiv.innerHTML = html;

    tempDiv.querySelectorAll('h1').forEach(h1 => h1.classList.add('text-2xl', 'font-bold', 'mb-6', 'mt-8', 'border-b', 'border-gray-400', 'pb-2'));
    tempDiv.querySelectorAll('h2').forEach(h2 => h2.classList.add('text-xl', 'font-semibold', 'mb-4', 'mt-6', 'border-b', 'border-gray-400', 'pb-2'));
    tempDiv.querySelectorAll('h3').forEach(h3 => h3.classList.add('text-lg', 'font-semibold', 'mb-4', 'mt-6', 'border-b', 'border-gray-400', 'pb-2'));
    tempDiv.querySelectorAll('h4').forEach(h4 => h4.classList.add('text-base', 'font-semibold', 'mb-4', 'mt-6', 'border-b', 'border-gray-400', 'pb-2'));
    tempDiv.querySelectorAll('h5').forEach(h5 => h5.classList.add('text-sm', 'font-semibold', 'mb-4', 'mt-6', 'border-b', 'border-gray-400', 'pb-2'));
    tempDiv.querySelectorAll('h6').forEach(h6 => h6.classList.add('text-xs', 'font-semibold', 'mb-4', 'mt-6', 'border-b', 'border-gray-400', 'pb-2'));
    tempDiv.querySelectorAll('p').forEach(p => p.classList.add('mb-4', 'leading-relaxed', 'text-gray-700', 'text-base', 'font-light', 'tracking-wide', 'text-justify'));
    tempDiv.querySelectorAll('img').forEach(img => img.classList.add('my-4', 'rounded', 'shadow-md', 'mx-auto', 'block', 'max-w-full', 'h-auto', 'align-middle', 'border-none', 'border-gray-200', 'transition', 'duration-100', 'ease-in-out', 'transform', 'hover:-translate-y-1', 'hover:scale-105', 'hover:shadow-xl', 'hover:border-gray-400', 'hover:border-2', 'hover:rounded-lg', 'hover:z-10'));
    tempDiv.querySelectorAll('a').forEach(a => a.classList.add('text-blue-700', 'underline', 'hover:text-blue-900', 'hover:no-underline', 'transition', 'duration-100', 'ease-in-out', 'transform', 'hover:-translate-y-1', 'hover:scale-105'));
    tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('list-disc', 'list-inside', 'mb-4', 'pl-4', 'text-gray-700', 'text-base', 'font-light', 'tracking-wide', 'text-justify'));
    tempDiv.querySelectorAll('ol').forEach(ol => ol.classList.add('list-decimal', 'list-inside', 'mb-4', 'pl-4', 'text-gray-700', 'text-base', 'font-light', 'tracking-wide', 'text-justify'));
    tempDiv.querySelectorAll('li').forEach(li => li.classList.add('mb-2', 'leading-relaxed', 'text-gray-700', 'text-base', 'font-light', 'tracking-wide', 'text-justify'));
    tempDiv.querySelectorAll('blockquote').forEach(blockquote => blockquote.classList.add('border-l-4', 'border-gray-400', 'pl-4', 'mb-4'));
    tempDiv.querySelectorAll('pre').forEach(pre => pre.classList.add('bg-gray-100', 'p-4', 'rounded', 'mb-4', 'text-sm', 'font-mono', 'overflow-auto', 'whitespace-pre-wrap', 'break-words', 'text-justify', 'shadow-md', 'max-w-full', 'h-auto', 'align-middle', 'border-none', 'border-gray-200'));
    tempDiv.querySelectorAll('code').forEach(code => code.classList.add('font-mono', 'text-sm', 'bg-gray-100', 'p-1'));
    tempDiv.querySelectorAll('table').forEach(table => table.classList.add('table-auto', 'border-collapse', 'border', 'border-gray-400', 'mb-4', 'shadow-md', 'max-w-full', 'h-auto', 'align-middle', 'border-none', 'border-gray-200'));
    tempDiv.querySelectorAll('thead').forEach(thead => thead.classList.add('bg-gray-100'));
    tempDiv.querySelectorAll('th').forEach(th => th.classList.add('border', 'px-4', 'py-2', 'font-semibold', 'text-sm', 'uppercase', 'text-gray-700'));
    tempDiv.querySelectorAll('tbody').forEach(tbody => tbody.classList.add('text-center'));
    tempDiv.querySelectorAll('td').forEach(td => td.classList.add('border', 'px-4', 'py-2', 'text-sm', 'text-gray-700'));

    if (kinds === 'post') {
        const title_section = document.createElement('div');

        // title
        const title = document.createElement('h1');
        title.classList.add('text-4xl', 'font-bold', 'mb-6', 'mt-4', 'border-b', 'border-gray-400', 'pb-2');
        // console.log(title_info)
        title.textContent = title_info.title;
        title_section.appendChild(title);

        // image
        const image = document.createElement('img');
        image.src = title_info.thumbnail;
        image.alt = title_info.title;
        image.classList.add('w-full', 'h-48', 'object-cover', 'object-center', 'my-4', 'rounded', 'shadow-md', 'mx-auto', 'block', 'max-w-full', 'h-auto', 'align-middle', 'border-none', 'border-gray-200', 'mb-2');
        title_section.appendChild(image);

        // date과 category를 담는 div
        const date_category = document.createElement('div');
        date_category.classList.add('flex', 'justify-end', 'mb-4');
        title_section.appendChild(date_category);

        // category
        const category = document.createElement('div');
        category.classList.add('text-sm', 'text-white', 'font-light', 'tracking-wide', 'text-justify');
        category.textContent = 'category: ' + title_info.category;
        date_category.appendChild(category);

        // date
        const date = document.createElement('div');
        date.classList.add('text-sm', 'text-white', 'font-light', 'tracking-wide', 'text-justify', 'ml-4');
        date.textContent = 'date: ' + formatDate(title_info.date);
        date_category.appendChild(date);


        // section styling
        title_section.classList.add('w-full', 'mb-8', 'shadow-md', 'text-white', 'bg-[#22272e]', 'rounded-lg', 'p-4', 'pl-8', 'pr-8', 'max-w-full', 'h-auto', 'align-middle', 'border-none', 'border-gray-200');

        tempDiv.insertBefore(title_section, tempDiv.firstChild);
    } else if (kinds === 'menu') {
    }

    document.getElementById('contents').innerHTML = tempDiv.innerHTML;
}

function styleJupyter(kinds, text, title_info = null) {
    const tempDiv = document.createElement('div');
    const html = convertIpynvToHtml(text);
    // const html = marked.parse(text);
    tempDiv.innerHTML = html;

    tempDiv.querySelectorAll('.markdown-cell').forEach(markdownCell => {
        markdownCell.querySelectorAll('h1').forEach(h1 => h1.classList.add('text-2xl', 'font-bold', 'mb-6', 'mt-8', 'border-b', 'border-gray-400', 'pb-2'));
        markdownCell.querySelectorAll('h2').forEach(h2 => h2.classList.add('text-xl', 'font-semibold', 'mb-4', 'mt-6', 'border-b', 'border-gray-400', 'pb-2'));
        markdownCell.querySelectorAll('h3').forEach(h3 => h3.classList.add('text-lg', 'font-semibold', 'mb-4', 'mt-6', 'border-b', 'border-gray-400', 'pb-2'));
        markdownCell.querySelectorAll('h4').forEach(h4 => h4.classList.add('text-base', 'font-semibold', 'mb-4', 'mt-6', 'border-b', 'border-gray-400', 'pb-2'));
        markdownCell.querySelectorAll('h5').forEach(h5 => h5.classList.add('text-sm', 'font-semibold', 'mb-4', 'mt-6', 'border-b', 'border-gray-400', 'pb-2'));
        markdownCell.querySelectorAll('h6').forEach(h6 => h6.classList.add('text-xs', 'font-semibold', 'mb-4', 'mt-6', 'border-b', 'border-gray-400', 'pb-2'));
        markdownCell.querySelectorAll('p').forEach(p => p.classList.add('mb-4', 'leading-relaxed', 'text-gray-700', 'text-base', 'font-light', 'tracking-wide', 'text-justify'));
        markdownCell.querySelectorAll('img').forEach(img => img.classList.add('my-4', 'rounded', 'shadow-md', 'mx-auto', 'block', 'max-w-full', 'h-auto', 'align-middle', 'border-none', 'border-gray-200', 'transition', 'duration-100', 'ease-in-out', 'transform', 'hover:-translate-y-1', 'hover:scale-105', 'hover:shadow-xl', 'hover:border-gray-400', 'hover:border-2', 'hover:rounded-lg', 'hover:z-10'));
        markdownCell.querySelectorAll('a').forEach(a => a.classList.add('text-blue-700', 'underline', 'hover:text-blue-900', 'hover:no-underline', 'transition', 'duration-100', 'ease-in-out', 'transform', 'hover:-translate-y-1', 'hover:scale-105'));
        markdownCell.querySelectorAll('ul').forEach(ul => ul.classList.add('list-disc', 'list-inside', 'mb-4', 'pl-4', 'text-gray-700', 'text-base', 'font-light', 'tracking-wide', 'text-justify'));
        markdownCell.querySelectorAll('ol').forEach(ol => ol.classList.add('list-decimal', 'list-inside', 'mb-4', 'pl-4', 'text-gray-700', 'text-base', 'font-light', 'tracking-wide', 'text-justify'));
        markdownCell.querySelectorAll('li').forEach(li => li.classList.add('mb-2', 'leading-relaxed', 'text-gray-700', 'text-base', 'font-light', 'tracking-wide', 'text-justify'));
        markdownCell.querySelectorAll('blockquote').forEach(blockquote => blockquote.classList.add('border-l-4', 'border-gray-400', 'pl-4', 'mb-4'));
        markdownCell.querySelectorAll('pre').forEach(pre => pre.classList.add('bg-gray-100', 'p-4', 'rounded', 'mb-4', 'text-sm', 'font-mono', 'overflow-auto', 'whitespace-pre-wrap', 'break-words', 'text-justify', 'shadow-md', 'max-w-full', 'h-auto', 'align-middle', 'border-none', 'border-gray-200'));
        markdownCell.querySelectorAll('code').forEach(code => code.classList.add('font-mono', 'text-sm', 'bg-gray-100', 'p-1'));
        markdownCell.querySelectorAll('table').forEach(table => table.classList.add('table-auto', 'border-collapse', 'border', 'border-gray-400', 'mb-4', 'shadow-md', 'max-w-full', 'h-auto', 'align-middle', 'border-none', 'border-gray-200'));
        markdownCell.querySelectorAll('thead').forEach(thead => thead.classList.add('bg-gray-100'));
        markdownCell.querySelectorAll('th').forEach(th => th.classList.add('border', 'px-4', 'py-2', 'font-semibold', 'text-sm', 'uppercase', 'text-gray-700'));
        markdownCell.querySelectorAll('tbody').forEach(tbody => tbody.classList.add('text-center'));
        markdownCell.querySelectorAll('td').forEach(td => td.classList.add('border', 'px-4', 'py-2', 'text-sm', 'text-gray-700'));

    });

    tempDiv.querySelectorAll('pre').forEach(pre => {
        pre.classList.add('bg-gray-100', 'relative', 'p-4', 'rounded', 'mb-4', 'text-sm', 'font-mono', 'overflow-auto', 'whitespace-pre-wrap', 'break-words', 'text-justify', 'shadow-md', 'max-w-full', 'h-auto', 'align-middle', 'border-gray-200', 'hover:border-gray-600', 'hover:border', 'hover:z-10', 'hover:-translate-y-0.5', 'hover:-translate-x-0.5');

        // 복사 버튼 생성
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.classList.add('copy-button', 'absolute', 'top-2', 'right-2', 'p-2', 'text-sm', 'font-semibold', 'text-white', 'bg-gray-600', 'rounded', 'hover:bg-gray-700', 'hover:shadow-md');

        // 복사 버튼 클릭 이벤트
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
    contentsDiv.appendChild(tempDiv);
    hljs.highlightAll();
}
