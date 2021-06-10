var gKeywordsCountMap = { happy: 12, 'funny puk': 1 }
var gImgs = [
	{
		id: 1,
		url: 'img/MEMES/1.jpg',
		keywords: ['trump'],
	},
	{
		id: 2,
		url: 'img/MEMES/2.jpg',
		keywords: ['dogs'],
	},
	{
		id: 3,
		url: 'img/MEMES/3.jpg',
		keywords: ['baby and dog'],
	},
	{
		id: 4,
		url: 'img/MEMES/4.jpg',
		keywords: ['cat on keyboard'],
	},
	{
		id: 5,
		url: 'img/MEMES/5.jpg',
		keywords: ['baby success'],
	},
	{
		id: 6,
		url: 'img/MEMES/6.jpg',
		keywords: ['that big'],
	},
	{
		id: 7,
		url: 'img/MEMES/7.jpg',
		keywords: ['surprised'],
	},
	{
		id: 8,
		url: 'img/MEMES/8.jpg',
		keywords: ['tell me more'],
	},
	{
		id: 9,
		url: 'img/MEMES/9.jpg',
		keywords: ['evil'],
	},
	{
		id: 10,
		url: 'img/MEMES/10.jpg',
		keywords: ['laughing'],
	},
	{
		id: 11,
		url: 'img/MEMES/11.jpg',
		keywords: ['together'],
	},
	{
		id: 12,
		url: 'img/MEMES/12.jpg',
		keywords: ['you'],
	},
	{
		id: 13,
		url: 'img/MEMES/13.jpg',
		keywords: ['toast'],
	},
	{
		id: 14,
		url: 'img/MEMES/14.jpg',
		keywords: ['what if i told you'],
	},
	{
		id: 15,
		url: 'img/MEMES/15.jpg',
		keywords: ['one does not simply'],
	},
	{
		id: 16,
		url: 'img/MEMES/16.jpg',
		keywords: ['laughing at you'],
	},
	{
		id: 17,
		url: 'img/MEMES/17.jpg',
		keywords: ['putin'],
	},
	{
		id: 18,
		url: 'img/MEMES/18.jpg',
		keywords: ['Buzz lightyear'],
	},
]
var gMeme = {
	selectedImgId: 5,
	selectedLineIdx: 0,
	lines: [
		{
			txt: '',
			size: 60,
			align: 'center',
			txtColor: 'white',
			strokeColor: 'black',
			top: 100,
		},
		// {
		// 	txt: '',
		// 	size: 60,
		// 	align: 'center',
		// 	txtColor: 'white',
		// 	strokeColor: 'black',
		// 	top: 100,
		// },
	],
}

function getSelectedImgId() {
	return gMeme.selectedImgId
}

function setSelectedImgId(id) {
	gMeme.selectedImgId = id
}

function getLines() {
	return gMeme.lines
}

function getSelectedLineIdx() {
	return gMeme.selectedLineIdx
}

function setLineText(text) {
	gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function increaseFont() {
	gMeme.lines[gMeme.selectedLineIdx].size += 5
}

function decreaseFont() {
	gMeme.lines[gMeme.selectedLineIdx].size -= 5
}

function moveLineUp() {
	gMeme.lines[gMeme.selectedLineIdx].top -= 10
}

function moveLineDown() {
	gMeme.lines[gMeme.selectedLineIdx].top += 10
}

function switchLine() {
	const idx = gMeme.selectedLineIdx
	if (gMeme.lines.length !== 1) {
		gMeme.selectedLineIdx = idx === 0 ? 1 : 0
	}
	const elInput = document.querySelector('input[name="meme-text"]')
	elInput.value = gMeme.lines[gMeme.selectedLineIdx].txt
}

function getImgUrlById(id) {
	return gImgs[id - 1].url
}

function addLine() {
	const newLine = {
		txt: '',
		size: 60,
		align: 'center',
		txtColor: 'white',
		strokeColor: 'black',
		top: 100,
	}
	gMeme.lines.push(newLine)
}

function deleteLine() {
	const idx = gMeme.selectedLineIdx
	gMeme.lines.splice(idx, 1)
}
