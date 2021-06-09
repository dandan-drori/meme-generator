var gKeywords = { happy: 12, 'funny puk': 1 }
var gImgs = [{ id: 1, url: 'img/popo.jpg', keywords: ['happy'] }]
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
		{
			txt: '',
			size: 60,
			align: 'center',
			txtColor: 'white',
			strokeColor: 'black',
			top: 100,
		},
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

function setLineText(idx, text) {
	gMeme.lines[idx].txt = text
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
	gMeme.selectedLineIdx = idx === 0 ? 1 : 0
	const elInput = document.querySelector('input[name="meme-text"]')
	elInput.value = gMeme.lines[gMeme.selectedLineIdx].txt
}
