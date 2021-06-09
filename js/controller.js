function init() {
	createCanvas()
	onResizeCanvas()
	drawImage()
	window.addEventListener('resize', onResizeCanvas)
}

function onResizeCanvas() {
	const elContainer = document.querySelector('.canvas-container')
	resizeCanvas(elContainer)
}

function onChangeText(text) {
	const idx = getSelectedLineIdx()
	setLineText(idx, text)
	drawImage()
}

function onUpdateMeme(imgSrc) {
	const imgFileName = imgSrc.split('MEMES/')[1]
	const imgId = imgFileName[0]
	setSelectedImgId(imgId)
	drawImage()
}

function onIncreaseFont() {
	increaseFont()
	drawImage()
}

function onDecreaseFont() {
	decreaseFont()
	drawImage()
}

function onMoveLineUp() {
	moveLineUp()
	drawImage()
}

function onMoveLineDown() {
	moveLineDown()
	drawImage()
}

function onSwitchLine() {
	switchLine()
	drawImage()
}
