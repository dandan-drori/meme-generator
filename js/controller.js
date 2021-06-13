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
                        <img src="${img.url}" onclick="onUpdateMeme(this, ${img.id})"/>
                    </article>`
		}
	})
	document.querySelector('.gallery').innerHTML = strHtmls.join('')
}

function onResizeCanvas(elImg) {
	const elContainer = document.querySelector('.canvas-container')
	resizeCanvas(elContainer, elImg)
	renderCanvas()
}

function onChangeText(text) {
	setLineText(text)
	renderCanvas()
}

function onUpdateMeme(elImg, imgId) {
	setSelectedImgId(imgId)
	showImageEditor(elImg)
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

function showImageEditor(elImg) {
	document.querySelector('.main-content').style.display = 'none'
	document.querySelector('.image-editor').style.display = 'flex'
	createCanvas()
	onResizeCanvas(elImg)
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
	const imgContent = gElCanvas.toDataURL('image/jpeg')
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
		containerW > 500
			? 8
			: containerW > 450
			? 7
			: containerW > 400
			? 6
			: containerW > 350
			? 5
			: containerW > 300
			? 4
			: containerW > 250
			? 3
			: 2
	for (let i = 0; i < wordsToRenderCount * 3; i += 3) {
		cropped.push(keywords[i])
	}
	const strHtmls = cropped.map(keyword => {
		const count = keywordsMap[keyword]
		let fontSize = count + 16
		if (fontSize > 25) fontSize = 25
		let fontWeight = count * 10 + 400
		if (fontWeight > 700) fontWeight = 700
		return `
		<article style="font-size:${fontSize}px; font-weight: ${fontWeight};" 
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
		elSavedMemes.innerHTML = '<p class="empty-msg">No saved memes :(</p>'
		return
	}

	const strHtmls = savedMemes.map(memeUrl => {
		return `
		<article style="position: relative;">
			<img src="${memeUrl}" />
			<button onclick="onRemoveSavedMeme(this)" class="btn-delete-saved">X</button>
			<button onclick="onDownloadSavedMeme(event)" class="btn-download-saved">
				<a href="#" download="my-img.jpg" class="download-saved-link">
					<img src="../img/ICONS/download.png" class="download-saved-img"/>
				</a>
			</button>
		</article>
		`
	})
	elSavedMemes.innerHTML = strHtmls.join('')
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
	document.querySelector('.save-meme .btn-save').style.display = 'block'
	elBtn.classList.toggle('hidden')
}

function onRemoveSavedMeme(elBtn) {
	const elArticle = elBtn.parentNode
	const elImg = elArticle.childNodes[1]
	const url = elImg.src
	const idx = gSavedMemes.findIndex(imgUrl => imgUrl === url)
	if (idx === -1) return
	gSavedMemes.splice(idx, 1)
	saveToStorage(SAVED_KEY, gSavedMemes)
	renderSavedMemes()
}

function onDownloadSavedMeme(ev) {
	const elLink = ev.target
	const elBtn = elLink.parentNode
	const elArticle = elBtn.parentNode
	const elImg = elArticle.childNodes[0]
	const url = elImg.src
	elLink.href = url
}

function toggleMobileMenu() {
	document.querySelector('.nav-list').classList.toggle('open')
	document.body.classList.toggle('menu-open')
	document.querySelector('.line').classList.toggle('menu-open')
}

// TODO:
// 4. fix saved-memes - save the gMeme to localStorage with each imageUrl to
// allow opening the canvas from there
// 7. add functionality to the "more" button
// 10. fix proportions on mobile

// IN PROGRESS:
// 3. fix image-editor - make 2 rows for buttons, fix fontStyle styling

// DONE:
// 1. fix renderSavedMemes to use map and strHtmls
// 2. fix canvas height - make it fit to screen height
// 5. fix search img - make it search icon and then apply padding / absolute
// 6. add styling to mobile menu
// 8. fix keywords font-size scaling (define specific sizes)
// 9. backdrop
