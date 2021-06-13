'use strict'

var gElCanvas
var gCtx
var gIsLocalImage = false
var gOnImgReady
var gEv
var gIsMarkForExport = false

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

function resizeCanvas(elContainer, elImg) {
	gElCanvas.height = elContainer.offsetHeight
	if (!elImg) gElCanvas.width = elContainer.offsetWidth
	else gElCanvas.width = elImg.naturalWidth / (elImg.naturalHeight / elContainer.offsetHeight)
}

function drawText() {
	const lines = getLines()
	const selectedLineIdx = getSelectedLineIdx()
	lines.forEach((line, idx) => {
		const { txt, size, align, txtColor, strokeColor, fontStyle, top } = line

		// determine text position
		const x =
			align === 'left' ? 100 : align === 'right' ? gElCanvas.width - 100 : gElCanvas.width / 2
		const y =
			idx === 0 ? top : idx === 1 ? gElCanvas.height - top / 2 : gElCanvas.height / 2 - 100 + top

		gCtx.textAlign = align
		gCtx.lineWidth = 2

		// calculate size according to text length
		const w = window.innerWidth
		const factor = w < 400 ? 2 : w < 600 ? 1.8 : w < 800 ? 1.3 : w < 1000 ? 1.1 : 0.9
		var fontSize = size - txt.length * factor
		if (fontSize < 25) fontSize = 30
		gCtx.font = `${fontSize}px ${fontStyle}`
		gCtx.fillStyle = txtColor
		gCtx.fillText(txt, x, y)
		gCtx.strokeStyle = strokeColor
		gCtx.strokeText(txt, x, y)

		// highlight selected text
		if (!gIsMarkForExport && idx === selectedLineIdx) {
			gCtx.strokeStyle = 'black'
			gCtx.strokeRect(30, y - fontSize - 10, gElCanvas.width - 60, 20 + fontSize)
		}
	})
}

function renderCanvas() {
	if (!gIsLocalImage) {
		drawImage()
		return
	}
	drawLocalImage()
}

function drawLocalImage() {
	var img = new Image()
	img.onload = gOnImgReady.bind(null, img)
	img.src = gEv.target.result
	img.onload = () => {
		gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
		drawText()
	}
}

function markForExport() {
	gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
	gIsMarkForExport = true
	renderCanvas()
}

function getCanvas() {
	return gElCanvas
}
