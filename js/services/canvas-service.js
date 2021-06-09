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
	const lines = getLines()
	const selectedLineIdx = getSelectedLineIdx()
	lines.forEach((line, idx) => {
		const { txt, size, align, txtColor, strokeColor, top } = line

		// determine text position
		const x = gElCanvas.width / 2
		const y = idx === 0 ? top : idx === 1 ? gElCanvas.height - top / 2 : gElCanvas.height / 2

		gCtx.textAlign = align
		gCtx.lineWidth = 2
		gCtx.font = `${size}px Impact`
		gCtx.fillStyle = txtColor
		gCtx.fillText(txt, x, y)
		gCtx.strokeStyle = strokeColor
		gCtx.strokeText(txt, x, y)

		if (idx === selectedLineIdx) {
			gCtx.rect(30, y - size - 10, gElCanvas.width - 60, 100)
			gCtx.stroke()
		}
		// else {
		// 	gCtx.strokeStyle = 'rgba(0,0,0,0)'
		// 	gCtx.rect(30, y - size - 10, gElCanvas.width - 60, 100)
		// 	gCtx.stroke()
		// }
	})
}
