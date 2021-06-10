function init() {}

function onResizeCanvas() {
	const elContainer = document.querySelector('.canvas-container')
	resizeCanvas(elContainer)
	drawImage()
}

function onChangeText(text) {
	setLineText(text)
	drawImage()
}

function onUpdateMeme(imgSrc) {
	const imgFileName = imgSrc.split('MEMES/')[1]
	const imgId = imgFileName.split('.')[0]
	setSelectedImgId(imgId)
	showImageEditor()
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

function showImageEditor() {
	document.querySelector('.gallery').style.display = 'none'
	document.querySelector('.image-editor').style.display = 'flex'
	createCanvas()
	onResizeCanvas()
	window.addEventListener('resize', onResizeCanvas)
	// drawImage()
}

function onAddLine() {
	addLine()
	drawImage()
}

function onDeleteLine() {
	deleteLine()
	switchLine()
	drawImage()
}
