'use strict'

function init() {
	initKeywordsMap()
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
	renderCanvas()
}

function onChangeText(text) {
	setLineText(text)
	renderCanvas()
}

function onUpdateMeme(imgId) {
	setSelectedImgId(imgId)
	showImageEditor()
}

function onIncreaseFont() {
	increaseFont()
	renderCanvas()
}

function onDecreaseFont() {
	decreaseFont()
	renderCanvas()
}

function onMoveLineUp() {
	moveLineUp()
	renderCanvas()
}

function onMoveLineDown() {
	moveLineDown()
	renderCanvas()
}

function onSwitchLine() {
	switchLine()
	renderCanvas()
}

function showImageEditor() {
	document.querySelector('.main-content').style.display = 'none'
	document.querySelector('.image-editor').style.display = 'flex'
	createCanvas()
	onResizeCanvas()
	window.addEventListener('resize', onResizeCanvas)
	document.querySelector('input[name=meme-text]').focus()
}

function onAddLine() {
	const idx = addLine()
	switchLine(idx)
	renderCanvas()
	focusInput()
}

function onDeleteLine() {
	deleteLine()
	switchLine()
	renderCanvas()
	focusInput()
}

function onSetFillColor(color) {
	setFillColor(color)
	renderCanvas()
}

function onSetStrokeColor(color) {
	setStrokeColor(color)
	renderCanvas()
}

function onSetTxtAlignment(alignment) {
	setTxtAlignment(alignment)
	renderCanvas()
}

function focusInput() {
	document.querySelector('input[name=meme-text]').focus()
}

function downloadImg(elLink) {
	var imgContent = gElCanvas.toDataURL('image/jpeg')
	elLink.href = imgContent
}

function onImgInput(ev) {
	loadImageFromInput(ev, renderCanvas)
}

function loadImageFromInput(ev, onImageReady) {
	gIsLocalImage = true
	gOnImgReady = onImageReady
	document.querySelector('.share-container').innerHTML = ''
	var reader = new FileReader()

	reader.onload = function (ev) {
		gEv = ev
		renderCanvas()
	}
	reader.readAsDataURL(ev.target.files[0])
}

function onSetFilter(search) {
	setFilter(search)
	renderGallery()
	renderKeywords()
}

function renderKeywords() {
	const keywordsMap = getKeywordsMap()
	const keywords = Object.keys(keywordsMap)
	// TODO: get most searched (find max in keywordsMap)
	let cropped = []
	var containerW = document.querySelector('.keywords-container').clientWidth
	let wordsToRenderCount =
		containerW > 400 ? 6 : containerW > 350 ? 5 : containerW > 300 ? 4 : containerW > 250 ? 3 : 2
	for (let i = 0; i < wordsToRenderCount * 3; i += 3) {
		cropped.push(keywords[i])
	}
	const strHtmls = cropped.map(keyword => {
		const count = keywordsMap[keyword]
		const fontSize = count <= 400 ? 16 + count / 20 : 36
		const fontWeight = count <= 300 ? 400 + count : 700
		return `<article style="font-size:${fontSize}px; font-weight: ${fontWeight};" 
                onclick="onSetFilter('${keyword}')">
                    ${keyword}
                </article>`
	})
	document.querySelector('.keywords-container').innerHTML = strHtmls.join('')
}

function hideImageEditor() {
	if (location.pathname === '/saved.html') {
		location.href = 'index.html'
		return
	}

	document.querySelector('.main-content').style.display = 'block'
	document.querySelector('.image-editor').style.display = 'none'
	window.removeEventListener('resize', onResizeCanvas)
	resetCanvas()
}

function resetCanvas() {
	gMeme.lines.forEach(line => (line.txt = ''))
	gMeme.selectedLineIdx = 0
	document.querySelector('input[name=meme-text]').value = ''
}

function onSaveMeme() {
	const canvas = getCanvas()
	const imgContent = canvas.toDataURL('image/jpeg')
	var memes = getSavedMemes()
	memes.push(imgContent)
	saveToStorage(SAVED_KEY, memes)
}

function initSavedMemes() {
	setSavedMemes()
	renderSavedMemes()
}

function renderSavedMemes() {
	const savedMemes = getSavedMemes()
	const elSavedMemes = document.querySelector('.saved-images')

	if (!savedMemes || !savedMemes.length) {
		elSavedMemes.innerHTML = 'No saved memes'
		return
	}

	savedMemes.forEach(memeUrl => {
		const image = new Image()
		image.src = memeUrl
		const article = document.createElement('article')
		article.appendChild(image)
		elSavedMemes.appendChild(article)
	})
}

function onSetFontStyle(fontStyle) {
	setFontStyle(fontStyle)
	renderCanvas()
}

function onViewMoreActions(elBtn) {
	markForExport()
	document.querySelector('.inputs form .btn-download').classList.toggle('transition')
	document.querySelector('.inputs form .btn-upload').classList.toggle('transition')
	document.querySelector('.inputs form .btn-share').classList.toggle('transition')
	elBtn.classList.toggle('hidden')
}
