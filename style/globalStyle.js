// menu style
const menuListStyle = `md:ml-10 text-base leading-snug text-surface hover:text-graylv3 font-medium capitalize`;

// mobile menu style
const mobileMenuStyle = `m-0 block py-4 px-6`;

// blog style과 notebook style
const posth1Style = `text-2xl font-bold mb-6 mt-8 border-b border-gray-400 pb-2`;
const posth2Style = `text-xl font-semibold mb-4 mt-6 border-b border-gray-400 pb-2`;
const posth3Style = `text-lg font-semibold mb-4 mt-6 border-b border-gray-400 pb-2`;
const posth4Style = `text-base font-semibold mb-4 mt-6 border-b border-gray-400 pb-2`;
const posth5Style = `text-sm font-semibold mb-4 mt-6 border-b border-gray-400 pb-2`;
const posth6Style = `text-xs font-semibold mb-4 mt-6 border-b border-gray-400 pb-2`;

const postpStyle = `mb-4 leading-relaxed text-gray-700 text-base font-light tracking-wide text-justify`;
const postimgStyle = `my-4 rounded shadow-md mx-auto block max-w-full h-auto align-middle border-none border-gray-200 transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:border-gray-400 hover:border-2 hover:rounded-lg hover:z-10`;
const postaStyle = `text-blue-700 underline hover:text-blue-900 hover:no-underline transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-105`;

const postulStyle = `list-disc list-inside mb-4 pl-4 text-gray-700 text-base font-light tracking-wide text-justify`;
const postolStyle = `list-decimal list-inside mb-4 pl-4 text-gray-700 text-base font-light tracking-wide text-justify`;
const postliStyle = `mb-2 leading-relaxed text-gray-700 text-base font-light tracking-wide text-justify`;

const postblockquoteStyle = `border-l-4 border-gray-400 pl-4 mb-4`;
const postpreStyle = `bg-gray-100 p-4 rounded mb-4 text-sm font-mono overflow-auto whitespace-pre-wrap break-words text-justify shadow-md max-w-full h-auto align-middle border-none border-gray-200`;
const postcodeStyle = `font-mono text-sm bg-gray-100 p-1`;

const posttableStyle = `table-auto border-collapse border border-gray-400 mb-4 shadow-md max-w-full h-auto align-middle border-none border-gray-200`;
const posttheadStyle = `bg-gray-100`;
const postthStyle = `border px-4 py-2 font-semibold text-sm uppercase text-gray-700`;
const posttbodyStyle = `text-center`;
const posttdStyle = `border px-4 py-2 text-sm text-gray-700`;

const posthrStyle = `my-4 border-gray-400 border-2 rounded-lg`;
const postemStyle = `text-base font-light italic`;
const poststrongStyle = `text-base font-bold`;

// blog에 최상단 제목과 이미지 날짜 카테고리를 표시하는 부분
const postcategoryStyle = `bg-activation text-primary text-sm font-medium px-3 py-1.5 rounded-lg tracking-wide`;
const posttitleStyle = `md:text-[40px] md:leading-[56px] text-[32px] leading-[40px] font-bold my-3`;

const postauthordateDivStyle = `md:mb-8 mb-6 h-fit`;
const postauthorDivStyle = `inline-block`;
const postauthorImgStyle = `inline w-8 h-8 rounded-full object-cover object-center mr-2 border-2 border-activation overflow-hidden`;
const postauthorStyle = `inline text-sm font-semibold text-black mr-2`;
const postdateStyle = `inline-block text-graylv3 text-sm font-normal`;
const postimgtitleStyle = `w-full max-h-[520px] object-cover object-center my-4 rounded-2xl mx-auto block max-w-full align-middle`;
const postsectionStyle = `w-full mb-10 md:mb-[60px] max-w-full h-auto align-middle`;

// notebook에 code cell을 표시하는 부분
const notebookpreStyle = `bg-gray-100 relative p-4 rounded mb-[12px] text-sm font-mono overflow-auto whitespace-pre-wrap break-words text-justify shadow-md max-w-full h-auto align-middle border-gray-200 hover:border-gray-600 hover:border hover:z-10 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:mb-[10.5px]`;
const notebookcopyButtonStyle = `copy-button absolute top-2 right-2 p-2 text-sm font-semibold text-white bg-gray-600 rounded hover:bg-gray-700 hover:shadow-md`;
const notebookdownloadButtonStyle = `download-button p-2 text-sm font-semibold text-white bg-gray-600 rounded hover:bg-gray-700 hover:shadow-md`;

// bloglist 목록 스타일
const bloglistFirstCardStyle = `lg:col-span-3 md:col-span-2 col-span-1 h-auto rounded overflow-hidden bg-white transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex md:flex-row flex-col flex-1 md:mb-[20px] cursor-pointer`;
const bloglistFirstCardImgStyle = `w-full object-cover object-center rounded-2xl overflow-hidden md:h-auto h-[200px] md:w-[49%] lg:w-[52%] shrink-0 mr-8`;
const bloglistFirstCardDescriptionStyle = `text-graylv4 text-base font-normal leading-snug md:max-h-40 md:line-clamp-[7] line-clamp-3 mb-3`;

const bloglistCardStyle = `lg:max-w-sm overflow-hidden bg-white transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-poitner col-span-1 w-auto`;
const bloglistCardImgStyle = `w-full h-[200px] object-cover object-center rounded-2xl overflow-hidden`;

const bloglistCardBodyStyle = `py-4`;
const bloglistCardTitleStyle = `font-bold text-2xl mb-3`;
const bloglistCardCategoryStyle = `inline-block bg-activation text-primary md:text-sm font-medium mb-3 px-3 py-1.5 rounded-lg`;
const bloglistCardDescriptionStyle = `text-graylv4 text-base font-normal leading-snug h-16 line-clamp-3 mb-3`;
const bloglistCardAuthorDivStyle = `inline-block`;
const bloglistCardAuthorImgStyle = `inline w-8 h-8 rounded-full object-cover object-center mr-2 border-2 border-activation overflow-hidden`;
const bloglistCardAuthorStyle = `inline text-sm font-semibold text-black mr-2`;
const bloglistCardDateStyle = `text-graylv3 text-sm inline-block font-normal`;

// 검색창 스타일
const searchInputStyle = `absolute top-20 right-8 w-[220px] h-10 rounded-md border border-gray-300 pl-2 text-base font-bold text-gray-600 outline-none box-border transition duration-300 ease-in-out shadow-none bg-white bg-clip-padding`;
