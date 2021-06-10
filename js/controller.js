function init() {
	setFilter('')
	renderKeywords()
	renderGallery()
}

function renderGallery() {
	const imgs = getImgs()
	var strHtmls = imgs.map(img => {
		if (img.passedSearch) {
			return `<article>
                        <img src="${img.url}" onclick="onUpdateMeme(${img.id})"/>
                    </article>`
		}
	})
	document.querySelector('.gallery').innerHTML = strHtmls.join('')
}

function onResizeCanvas() {
	const elContainer = document.querySelector('.canvas-container')
	resizeCanvas(elContainer)
	drawImage()
}

function onChangeText(text) {
	setLineText(text)
	drawImage()
}

function onUpdateMeme(imgId) {
	setSelectedImgId(imgId)
	showImageEditor()
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
	document.querySelector('.main-content').style.display = 'none'
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

function downloadImg(elLink) {
	var imgContent = gElCanvas.toDataURL('image/jpeg')
	elLink.href = imgContent
}

function onImgInput(ev) {
	loadImageFromInput(ev, drawImage)
}

function loadImageFromInput(ev, onImageReady) {
	document.querySelector('.share-container').innerHTML = ''
	var reader = new FileReader()

	reader.onload = function (ev) {
		var img = new Image()
		img.onload = onImageReady.bind(null, img)
		img.src = ev.target.result
		img.onload = () => {
			gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
			drawText()
		}
	}
	reader.readAsDataURL(ev.target.files[0])
}

function onSetFilter(search) {
	setFilter(search)
	renderGallery()
}

function renderKeywords() {
	const keywordsMap = getKeywordsMap()
	const keywords = Object.keys(keywordsMap)
	// TODO: get most searched (find max in keywordsMap)
	let cropped = []
	for (let i = 0; i < 6 * 3; i += 3) {
		cropped.push(keywords[i])
	}
	const strHtmls = cropped.map(keyword => {
		const count = keywordsMap[keyword]
		return `<article style="font-size:${16 + count}px; font-weight: ${
			400 + count * 10
		};" onclick="onSetFilter('${keyword}')">
                    ${keyword}
                </article>`
	})
	document.querySelector('.keywords-container').innerHTML = strHtmls.join('')
}
