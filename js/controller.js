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
	// renderCanvas()
}
