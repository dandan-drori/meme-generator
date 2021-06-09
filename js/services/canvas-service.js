var gElCanvas
var gCtx

function createCanvas() {
	gElCanvas = document.querySelector('.canvas')
	gCtx = gElCanvas.getContext('2d')
}

function drawImage() {
	const id = getSelectedImgId()
	const img = new Image()
	img.src = `img/MEMES/${id}.jpg`
	img.onload = () => {
		gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
		drawText()
	}
}

function resizeCanvas(elContainer) {
	gElCanvas.width = elContainer.offsetWidth
	gElCanvas.height = elContainer.offsetHeight
}

function drawText() {
	// get line properties to draw
	const lines = getLines()
	const idx = getSelectedLineIdx()
	const { txt, size, align, txtColor, strokeColor } = lines[idx]

	// gCtx.textAlign = 'center'
	var x, y

	switch (align) {
		case 'left':
			x = 10
			y = 10
			break
		case 'right':
			x = gElCanvas.width - 10
			break
		// default:
		// x = 150
		// break
	}
	x = 120
	y = 100
	console.log('gElCanvas.width', gElCanvas.width)
	gCtx.lineWidth = 2
	gCtx.font = `${size}px Impact`
	gCtx.fillStyle = txtColor
	gCtx.fillText(txt, x, y)
	gCtx.strokeStyle = strokeColor
	gCtx.strokeText(txt, x, y)
}
