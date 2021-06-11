'use strict'

var gImgs = [
	{
		id: 1,
		url: 'img/MEMES/1.jpg',
		keywords: ['trump', 'president', 'leader'],
	},
	{
		id: 2,
		url: 'img/MEMES/2.jpg',
		keywords: ['dog', 'dogs', 'lick', 'love'],
	},
	{
		id: 3,
		url: 'img/MEMES/3.jpg',
		keywords: ['baby', 'dog', 'bed', 'sleep'],
	},
	{
		id: 4,
		url: 'img/MEMES/4.jpg',
		keywords: [
			'sleep',
			'cat',
			'mouse',
			'cute',
			'kitten',
			'whisker',
			'fur',
			'eye',
			'pet',
			'little',
			'sit',
			'domestic',
			'animal',
			'curiosity',
			'young',
			'looking',
			'funny',
			'hair',
			'laptop',
			'lazy',
			'mammal',
		],
	},
	{
		id: 5,
		url: 'img/MEMES/5.jpg',
		keywords: ['baby', 'fist', 'success'],
	},
	{
		id: 6,
		url: 'img/MEMES/6.jpg',
		keywords: ['hands', 'big', 'size'],
	},
	{
		id: 7,
		url: 'img/MEMES/7.jpg',
		keywords: ['surprised', 'shocked', 'kid'],
	},
	{
		id: 8,
		url: 'img/MEMES/8.jpg',
		keywords: ['more', 'fake'],
	},
	{
		id: 9,
		url: 'img/MEMES/9.jpg',
		keywords: ['evil', 'mean'],
	},
	{
		id: 10,
		url: 'img/MEMES/10.jpg',
		keywords: ['laughing', 'laugh', 'crazy'],
	},
	{
		id: 11,
		url: 'img/MEMES/11.jpg',
		keywords: ['together', 'wrestling', 'fight', 'hug'],
	},
	{
		id: 12,
		url: 'img/MEMES/12.jpg',
		keywords: ['you', 'choose', 'fingers'],
	},
	{
		id: 13,
		url: 'img/MEMES/13.jpg',
		keywords: ['toast', 'glass', 'wine', 'leonardo', 'dicaprio'],
	},
	{
		id: 14,
		url: 'img/MEMES/14.jpg',
		keywords: ['what if', 'i told you', 'sunglasses'],
	},
	{
		id: 15,
		url: 'img/MEMES/15.jpg',
		keywords: ['one does not simply'],
	},
	{
		id: 16,
		url: 'img/MEMES/16.jpg',
		keywords: ['laughing', 'hilarious', 'joke'],
	},
	{
		id: 17,
		url: 'img/MEMES/17.jpg',
		keywords: ['putin', 'fingers', 'peace'],
	},
	{
		id: 18,
		url: 'img/MEMES/18.jpg',
		keywords: ['buzz lightyear', 'woody', 'toystory'],
	},
]
var gMeme = {
	selectedImgId: 5,
	selectedLineIdx: 0,
	lines: [
		{
			txt: '',
			size: 60,
			align: 'center',
			txtColor: 'white',
			strokeColor: 'black',
			fontStyle: 'Impact',
			top: 100,
		},
	],
}
const KEYWORDS_KEY = 'keywords'
var gKeywordsCountMap
const SAVED_KEY = 'saved-memes'
var gSavedImages

function initKeywordsMap() {
	if (loadFromStorage(KEYWORDS_KEY)) {
		gKeywordsCountMap = loadFromStorage(KEYWORDS_KEY)
		return
	}
	gKeywordsCountMap = {
		trump: 0,
		president: 0,
		leader: 0,
		dog: 0,
		dogs: 0,
		lick: 0,
		love: 0,
		baby: 0,
		bed: 0,
		sleep: 0,
		cat: 0,
		keyboard: 0,
		fist: 0,
		success: 0,
		hands: 0,
		big: 0,
		size: 0,
		surprised: 0,
		shocked: 0,
		kid: 0,
		more: 0,
		fake: 0,
		evil: 0,
		mean: 0,
		laughing: 0,
		laugh: 0,
		crazy: 0,
		together: 0,
		wrestling: 0,
		fight: 0,
		hug: 0,
		you: 0,
		choose: 0,
		fingers: 0,
		toast: 0,
		glass: 0,
		wine: 0,
		leonardo: 0,
		dicaprio: 0,
		'what if': 0,
		'i told you': 0,
		sunglasses: 0,
		'one does not simply': 0,
		hilarious: 0,
		joke: 0,
		putin: 0,
		peace: 0,
		'buzz lightyear': 0,
		woody: 0,
		toystory: 0,
	}
}

function getSelectedImgId() {
	return gMeme.selectedImgId
}

function setSelectedImgId(id) {
	gMeme.selectedImgId = id
}

function getLines() {
	return gMeme.lines
}

function getSelectedLineIdx() {
	return gMeme.selectedLineIdx
}

function setLineText(text) {
	gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function increaseFont() {
	if (gMeme.lines[gMeme.selectedLineIdx].size > 100) return
	gMeme.lines[gMeme.selectedLineIdx].size += 5
}

function decreaseFont() {
	if (gMeme.lines[gMeme.selectedLineIdx].size < 30) return
	gMeme.lines[gMeme.selectedLineIdx].size -= 5
}

function moveLineUp() {
	const diff = gMeme.selectedLineIdx === 1 ? -10 : 10
	gMeme.lines[gMeme.selectedLineIdx].top -= diff
}

function moveLineDown() {
	const diff = gMeme.selectedLineIdx === 1 ? -10 : 10
	gMeme.lines[gMeme.selectedLineIdx].top += diff
}

function switchLine(jumpToIdx) {
	if (jumpToIdx) {
		gMeme.selectedLineIdx = jumpToIdx
	} else {
		const idx = gMeme.selectedLineIdx
		if (idx >= gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
		else gMeme.selectedLineIdx++
	}

	// update input to show correct line
	const elInput = document.querySelector('input[name="meme-text"]')
	elInput.value = gMeme.lines[gMeme.selectedLineIdx].txt
}

function getImgUrlById(id) {
	return gImgs[id - 1].url
}

function addLine() {
	const newLine = {
		txt: '',
		size: 60,
		align: 'center',
		txtColor: 'white',
		strokeColor: 'black',
		fontStyle: 'Impact',
		top: 100,
	}
	gMeme.lines.push(newLine)
	return gMeme.lines.indexOf(newLine)
}

function deleteLine() {
	gMeme.lines[gMeme.selectedLineIdx].txt = ''
}

function setFillColor(color) {
	gMeme.lines[gMeme.selectedLineIdx].txtColor = color
}

function setStrokeColor(color) {
	gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}

function setTxtAlignment(alignment) {
	gMeme.lines[gMeme.selectedLineIdx].align = alignment
}

function setFilter(search) {
	gImgs.forEach(img => {
		var flag
		img.keywords.forEach(keyword => {
			if (keyword.toLowerCase().startsWith(search.toLowerCase())) {
				flag = true
				if (search) gKeywordsCountMap[keyword]++
			}
		})
		if (flag) {
			img.passedSearch = true
		} else img.passedSearch = false
	})
	saveToStorage(KEYWORDS_KEY, gKeywordsCountMap)
}

function getImgs() {
	return gImgs
}

function getKeywordsMap() {
	return gKeywordsCountMap
}

function getGMeme() {
	return gMeme
}

function setSavedMemes() {
	gSavedImages = loadFromStorage(SAVED_KEY) || []
}

function getSavedMemes() {
	let memes = []
	if (loadFromStorage(SAVED_KEY)) {
		memes = loadFromStorage(SAVED_KEY)
	}
	return memes
}

function setFontStyle(fontStyle) {
	var formattedStyle = fontStyle.charAt(0) + fontStyle.substring(1).toLowerCase()
	gMeme.lines[gMeme.selectedLineIdx].fontStyle = x
}
