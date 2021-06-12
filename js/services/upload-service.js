'use strict'
// on submit call to this function
function uploadImg(elForm, ev) {
	ev.preventDefault()
	document.getElementById('imgData').value = gElCanvas.toDataURL('image/jpeg')

	// A function to be called if request succeeds
	function onSuccess(uploadedImgUrl) {
		uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
		document.querySelector('.share-container').innerHTML = `
        <a class="share-link" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
	}
	let inputVal = elForm.querySelector('input').value
	elForm.querySelector('.btn-share').style.opacity = '0'
	doUploadImg(elForm, onSuccess, inputVal)
}

function doUploadImg(elForm, onSuccess) {
	var formData = new FormData(elForm)
	fetch('//ca-upload.com/here/upload.php', {
		method: 'POST',
		body: formData,
	})
		.then(function (res) {
			return res.text()
		})
		.then(onSuccess)
		.catch(function (err) {
			console.error(err)
		})
}
