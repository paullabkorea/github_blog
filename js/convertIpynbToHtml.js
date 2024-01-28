function convertIpynvToHtml(fileContent) {
    const notebook = JSON.parse(fileContent);
    const cells = notebook.cells;
    let htmlContent = '';

    cells.forEach(cell => {
        if (cell.cell_type === 'markdown') {
            // 마크다운 셀 처리
            const markdownText = cell.source.join('');
            const markdownTextConverted = convertSourceToImage(markdownText);
            const markdownTextConvertedImg = marked.parse(markdownTextConverted);
            // const markdownTextConverted = styleMarkdown('', markdownText);
            if (markdownTextConvertedImg !== '' && markdownTextConvertedImg !== undefined) {
                htmlContent += `<div class="markdown-cell">${markdownTextConvertedImg}</div>`;
            }
        } else if (cell.cell_type === 'code') {
            // 코드 셀 처리
            const codeText = escapeHtml(cell.source.join(''));
            htmlContent += `<pre class="code-cell"><code class="language-python">${codeText}</code></pre>`;

            // 코드 출력 처리
            if (cell.outputs && cell.outputs.length > 0) {
                cell.outputs.forEach(output => {
                    // output.data가 존재하는지 확인
                    if (output.data) {
                        if (output.output_type === 'execute_result' || output.output_type === 'display_data' || output.output_type === 'stream') {
                            if (output.data['text/html']) {
                                htmlContent += output.data['text/html'].join('');
                            } else if (output.data['text/plain']) {
                                htmlContent += `<pre>${output.data['text/plain'].join('')}</pre>`;
                            } else if (output.data['image/png']) {
                                htmlContent += `<img src="data:image/png;base64,${output.data['image/png'].join('')}" alt="output image" />`;
                            } else if (output.data['image/jpeg']) {
                                htmlContent += `<img src="data:image/jpeg;base64,${output.data['image/jpeg'].join('')}" alt="output image" />`;
                            }
                        }
                    } else if (output.output_type === 'error') {
                        htmlContent += `<pre class="error">${output.traceback.join('')}</pre>`;
                    }
                });
            }
        }
    });

    return htmlContent;
}

function convertSourceToImage(source) {
    // Base64 이미지 데이터 식별을 위한 정규 표현식
    const base64ImageRegex = /!\[.*?\]\(data:image\/(png|jpeg);base64,(.*?)\)/g;

    // 이미지 데이터를 찾고, 각 매치에 대해 이미지 태그 생성
    return source.replace(base64ImageRegex, (match, fileType, imageData) => {
        return `<img src="data:image/${fileType};base64,${imageData}" alt="Embedded Image" />`;
    });
}

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}