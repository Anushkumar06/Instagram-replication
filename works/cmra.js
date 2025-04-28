document.addEventListener('DOMContentLoaded', function () {
    const startWebcamButton = document.getElementById('start-webcam');
    const uploadFileInput = document.getElementById('upload-file');
    const captureButton = document.getElementById('capture-button');
    const webcamElement = document.getElementById('webcam');
    const canvasElement = document.getElementById('canvas');
    const uploadedImageElement = document.getElementById('uploaded-image');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const uploadModal = document.getElementById('upload-modal');
    const uploadModalImage = document.getElementById('upload-modal-image');
    const filterModal = document.getElementById('filter-modal');
    const filterPreviewImage = document.getElementById('filter-preview-image');
    const closeButton = document.querySelector('.close-button');
    const closeUploadButton = document.querySelector('.close-upload-button');
    const closeFilterButton = document.querySelector('.close-filter-button');
    const useButton = document.getElementById('use-button');
    const retryButton = document.getElementById('retry-button');
    const applyFilterCaptureButton = document.getElementById('apply-filter-capture');
    const confirmUploadButton = document.getElementById('confirm-upload');
    const retryUploadButton = document.getElementById('retry-upload');
    const applyFilterUploadButton = document.getElementById('apply-filter-upload');
    const uploadImageButton = document.getElementById('upload-image'); // Updated button
    const discardFilteredImageButton = document.getElementById('discard-filtered-image');
    const uploadStatus = document.getElementById('upload-status');

    const grayscaleSlider = document.getElementById('grayscale');
    const blurSlider = document.getElementById('blur');
    const contrastSlider = document.getElementById('contrast');
    const brightnessSlider = document.getElementById('brightness');

    let stream = null;
    let currentImageDataURL = '';
    let originalImageURL = '';

    function applyFilters() {
        const grayscale = grayscaleSlider.value;
        const blur = blurSlider.value;
        const contrast = contrastSlider.value;
        const brightness = brightnessSlider.value;

        filterPreviewImage.style.filter = `
            grayscale(${grayscale}%) 
            blur(${blur}px) 
            contrast(${contrast}%) 
            brightness(${brightness}%)
        `;
    }

    grayscaleSlider.addEventListener('input', applyFilters);
    blurSlider.addEventListener('input', applyFilters);
    contrastSlider.addEventListener('input', applyFilters);
    brightnessSlider.addEventListener('input', applyFilters);

    function resetToHomePage() {
        window.location.href = 'home page.html'; // Redirect to the home page
    }

    function showUploadModalWithImage(imageURL) {
        uploadModalImage.src = imageURL;
        uploadModalImage.style.display = 'block';
        uploadStatus.textContent = 'Filtered image is ready!';
        confirmUploadButton.style.display = 'block';
        uploadedImageElement.style.display = 'none';
        webcamElement.style.display = 'none';
        canvasElement.style.display = 'none';
        uploadModal.style.display = 'block';
    }

    startWebcamButton.addEventListener('click', function () {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (mediaStream) {
                webcamElement.srcObject = mediaStream;
                stream = mediaStream;
                webcamElement.style.display = 'block';
            })
            .catch(function (error) {
                console.error('Error accessing webcam: ', error);
            });
    });

    uploadFileInput.addEventListener('change', function () {
        const file = uploadFileInput.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (allowedTypes.includes(file.type)) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    originalImageURL = e.target.result;
                    uploadModalImage.src = originalImageURL;
                    uploadModalImage.style.display = 'block';
                    uploadStatus.textContent = 'Image is being processed...';
                    confirmUploadButton.style.display = 'block';
                    uploadedImageElement.style.display = 'none';
                    webcamElement.style.display = 'none';
                    canvasElement.style.display = 'none';
                    uploadModal.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                uploadStatus.textContent = 'Invalid file format. Please upload a JPEG, PNG, or GIF image.';
                uploadModalImage.style.display = 'none';
                confirmUploadButton.style.display = 'none';
                uploadedImageElement.style.display = 'none';
                webcamElement.style.display = 'none';
                canvasElement.style.display = 'none';
                uploadModal.style.display = 'block';
            }
        }
    });

    captureButton.addEventListener('click', function () {
        if (stream) {
            const canvasContext = canvasElement.getContext('2d');
            canvasElement.width = webcamElement.videoWidth;
            canvasElement.height = webcamElement.videoHeight;
            canvasContext.drawImage(webcamElement, 0, 0);

            currentImageDataURL = canvasElement.toDataURL('image/png');
            modalImage.src = currentImageDataURL;
            filterPreviewImage.src = currentImageDataURL;
            webcamElement.style.display = 'none';
            canvasElement.style.display = 'none';
            uploadedImageElement.style.display = 'none';
            modal.style.display = 'block';
        } else {
            alert('Please start the webcam first.');
        }
    });

    applyFilterCaptureButton.addEventListener('click', function () {
        filterPreviewImage.src = currentImageDataURL;
        filterModal.style.display = 'block';
    });

    applyFilterUploadButton.addEventListener('click', function () {
        filterPreviewImage.src = uploadModalImage.src;
        filterModal.style.display = 'block';
    });

    uploadImageButton.addEventListener('click', function () {
        // Redirect to success page after simulating the upload
        window.location.href = 'success.html';
    });

    discardFilteredImageButton.addEventListener('click', function () {
        filterModal.style.display = 'none';
        resetToHomePage();
    });

    useButton.addEventListener('click', function () {
        // Redirect to success page after using the captured image
        window.location.href = 'success.html';
    });

    retryButton.addEventListener('click', function () {
        modal.style.display = 'none';
        webcamElement.style.display = 'block';
        canvasElement.style.display = 'none';
        uploadedImageElement.style.display = 'none';
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (mediaStream) {
                webcamElement.srcObject = mediaStream;
                stream = mediaStream;
            })
            .catch(function (error) {
                console.error('Error accessing webcam: ', error);
            });
    });

    confirmUploadButton.addEventListener('click', function () {
        alert('Image confirmed!');
        // Redirect to success page
        window.location.href = 'success.html';
    });

    retryUploadButton.addEventListener('click', function () {
        uploadModal.style.display = 'none';
        uploadFileInput.value = '';
        uploadedImageElement.style.display = 'none';
        webcamElement.style.display = 'none';
        canvasElement.style.display = 'none';
        startWebcamButton.style.display = 'block';
        uploadFileInput.style.display = 'block';
    });

    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
        resetToHomePage();
    });

    closeUploadButton.addEventListener('click', function () {
        uploadModal.style.display = 'none';
        resetToHomePage();
    });

    closeFilterButton.addEventListener('click', function () {
        filterModal.style.display = 'none';
        resetToHomePage();
    });
});
