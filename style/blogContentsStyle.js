// 마크다운으로 읽어온 내용을 HTML로 변환하여 tailwind를 사용한 스타일링
function styleMarkdown(text) {
    const html = marked.parse(text);
    const tempDiv = document.createElement('div');
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

    document.getElementById('contents').innerHTML = tempDiv.innerHTML;
}