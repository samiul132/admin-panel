function copyIcon(iconName, prefix) {
    let iconTag;
    
    if (prefix === 'bi') {
        iconTag = `<i class="${iconName}"></i>`;
    } else if (prefix === 'fas' || prefix === 'fab') {
        iconTag = `<i class="${prefix} ${iconName}"></i>`; 
    } else {
        iconTag = `<i class="${prefix} ${iconName}"></i>`; 
    }
    
    navigator.clipboard.writeText(iconTag).then(() => {
        showToast('Copied: ' + iconTag);
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('opacity-0');
    toast.classList.add('opacity-100');

    setTimeout(() => {
        toast.classList.remove('opacity-100');
        toast.classList.add('opacity-0');
    }, 3000); 
}