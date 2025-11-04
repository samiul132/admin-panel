// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const filesList = document.getElementById('filesList');
    const uploadAllBtn = document.getElementById('uploadAllBtn');
    const uploadAllContainer = document.getElementById('uploadAllContainer');
    const totalFilesEl = document.getElementById('totalFiles');
    const totalSizeEl = document.getElementById('totalSize');
    const imageCountEl = document.getElementById('imageCount');
    const docCountEl = document.getElementById('docCount');

    let files = [];

    // Check if elements exist
    if (!dropZone || !fileInput) {
        console.error('Required elements not found');
        return;
    }

    dropZone.addEventListener('click', () => fileInput.click());

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('drag-over', 'border-indigo-500');
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('drag-over', 'border-indigo-500');
        });
    });

    dropZone.addEventListener('drop', (e) => {
        const droppedFiles = e.dataTransfer.files;
        handleFiles(droppedFiles);
    });

    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    function handleFiles(newFiles) {
        [...newFiles].forEach(file => {
            if (file.size <= 10 * 1024 * 1024) {
                files.push(file);
                addFileToList(file);
            } else {
                alert(`${file.name} is too large. Maximum size is 10MB.`);
            }
        });
        updateStats();
        if (files.length > 0) {
            uploadAllContainer.classList.remove('hidden');
        }
    }

    function addFileToList(file) {
        const fileId = Date.now() + Math.random();
        const fileSize = formatFileSize(file.size);
        const fileIcon = getFileIcon(file.type);
        
        const fileCard = document.createElement('div');
        fileCard.className = 'file-card bg-white rounded-xl p-4 shadow-sm relative animate-slide-up';
        fileCard.id = `file-${fileId}`;
        fileCard.innerHTML = `
            <button onclick="window.removeFile('${fileId}')" class="absolute top-2 right-2 w-6 h-6 bg-red-50 hover:bg-red-100 rounded-full flex items-center justify-center transition-colors group z-10">
                <i class="fas fa-times text-xs text-red-500 group-hover:text-red-600"></i>
            </button>
            
            <div class="flex flex-col items-center text-center">
                <div class="w-16 h-16 bg-gradient-to-br ${fileIcon.bg} rounded-xl flex items-center justify-center mb-3">
                    <i class="${fileIcon.icon} text-2xl ${fileIcon.color}"></i>
                </div>
                <h4 class="font-semibold text-sm text-gray-900 truncate w-full mb-1" title="${file.name}">${file.name}</h4>
                <p class="text-xs text-gray-500 mb-3">${fileSize}</p>
                
                <div class="w-full">
                    <div class="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div id="progress-${fileId}" class="progress-bar h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style="width: 0%"></div>
                    </div>
                    <div id="status-${fileId}" class="text-xs text-gray-500 mt-2">Ready</div>
                </div>
            </div>
        `;
        
        filesList.appendChild(fileCard);
    }

    function getFileIcon(fileType) {
        if (fileType.startsWith('image/')) {
            return { icon: 'fas fa-image', color: 'text-blue-600', bg: 'from-blue-50 to-blue-100' };
        } else if (fileType === 'application/pdf') {
            return { icon: 'fas fa-file-pdf', color: 'text-red-600', bg: 'from-red-50 to-red-100' };
        } else if (fileType.startsWith('video/')) {
            return { icon: 'fas fa-video', color: 'text-purple-600', bg: 'from-purple-50 to-purple-100' };
        } else if (fileType.includes('word') || fileType.includes('document')) {
            return { icon: 'fas fa-file-word', color: 'text-blue-700', bg: 'from-blue-50 to-blue-100' };
        } else if (fileType.includes('sheet') || fileType.includes('excel')) {
            return { icon: 'fas fa-file-excel', color: 'text-green-600', bg: 'from-green-50 to-green-100' };
        } else {
            return { icon: 'fas fa-file', color: 'text-gray-600', bg: 'from-gray-50 to-gray-100' };
        }
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    }

    // Make removeFile globally accessible
    window.removeFile = function(fileId) {
        const fileElement = document.getElementById(`file-${fileId}`);
        if (!fileElement) return;
        
        fileElement.style.opacity = '0';
        fileElement.style.transform = 'scale(0.8)';
        setTimeout(() => {
            fileElement.remove();
            const index = files.findIndex((f, i) => {
                return document.querySelectorAll('.file-card')[i]?.id === `file-${fileId}`;
            });
            if (index > -1) files.splice(index, 1);
            updateStats();
            if (files.length === 0) {
                uploadAllContainer.classList.add('hidden');
            }
        }, 300);
    }

    function updateStats() {
        totalFilesEl.textContent = files.length;
        const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
        totalSizeEl.textContent = formatFileSize(totalBytes);
        
        const images = files.filter(f => f.type.startsWith('image/')).length;
        const docs = files.filter(f => !f.type.startsWith('image/') && !f.type.startsWith('video/')).length;
        
        imageCountEl.textContent = images;
        docCountEl.textContent = docs;
    }

    uploadAllBtn.addEventListener('click', () => {
        files.forEach((file, index) => {
            setTimeout(() => uploadFile(file, index), index * 300);
        });
    });

    function uploadFile(file, index) {
        const fileCards = document.querySelectorAll('.file-card');
        if (!fileCards[index]) return;
        
        const fileId = fileCards[index].id.split('-')[1];
        const progressBar = document.getElementById(`progress-${fileId}`);
        const statusText = document.getElementById(`status-${fileId}`);
        
        if (!progressBar || !statusText) return;
        
        statusText.textContent = 'Uploading...';
        statusText.classList.add('text-indigo-600', 'font-semibold');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 25;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                progressBar.style.width = '100%';
                statusText.textContent = 'Complete!';
                statusText.classList.remove('text-indigo-600');
                statusText.classList.add('text-green-600');
            } else {
                progressBar.style.width = progress + '%';
                statusText.textContent = `${Math.round(progress)}%`;
            }
        }, 200);
    }
});