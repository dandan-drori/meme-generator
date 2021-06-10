var gElCanvas
var gCtx

function createCanvas() {
	gElCanvas = document.querySelector('.canvas')
	gCtx = gElCanvas.getContext('2d')
}

function drawImage() {
	const id = getSelectedImgId()
	const url = getImgUrlById(id)
	const img = new Image()
	img.src = url
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
		// const x = gElCanvas.width / 2
		const x =
			align === 'left' ? 100 : align === 'right' ? gElCanvas.width - 100 : gElCanvas.width / 2
		const y =
			idx === 0 ? top : idx === 1 ? gElCanvas.height - top / 2 : gElCanvas.height / 2 - 100 + top

		gCtx.textAlign = align
		gCtx.lineWidth = 2
		gCtx.font = `${size}px Impact`
		// CALCULATE SIZE ACCORDING TO TEXT LENGTH
		// gCtx.font = `${size - txt.length * 0.9}px Impact`
		gCtx.fillStyle = txtColor
		// MEASURE TEXT BEFORE WRITING IT
		// if (gCtx.measureText(txt).width > 430) {
		// gCtx.font = `${size - 10}px Impact`
		// }
		gCtx.fillText(txt, x, y)
		gCtx.strokeStyle = strokeColor
		gCtx.strokeText(txt, x, y)

		// highlight selected text
		if (idx === selectedLineIdx) {
			gCtx.strokeRect(30, y - size - 10, gElCanvas.width - 60, 40 + size)
		}
	})
}
