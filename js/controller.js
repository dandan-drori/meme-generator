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
}

function onAddLine() {
	addLine()
	switchLine()
	drawImage()
	focusInput()
}

function onDeleteLine() {
	deleteLine()
	switchLine()
	drawImage()
	focusInput()
}

function onSetFillColor(color) {
	setFillColor(color)
	drawImage()
}

function onSetStrokeColor(color) {
	setStrokeColor(color)
	drawImage()
}

function onSetTxtAlignment(alignment) {
	setTxtAlignment(alignment)
	drawImage()
}

function focusInput() {
	document.querySelector('input[name=meme-text]').focus()
}
