var gKeywords = { happy: 12, 'funny puk': 1 }
var gImgs = [{ id: 1, url: 'img/popo.jpg', keywords: ['happy'] }]
var gMeme = {
	selectedImgId: 5,
	selectedLineIdx: 0,
	lines: [
		{
			txt: 'I never eat Falafel',
			size: 60,
			align: 'center',
			txtColor: 'white',
			strokeColor: 'black',
		},
	],
}

function getSelectedImgId() {
	return gMeme.selectedImgId
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
