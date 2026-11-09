function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(sec => sec.classList.add('hidden'));

    // Show target section
    document.getElementById(sectionId).classList.remove('hidden');

    // Update Header Title
    const titles = {
        'dashboard': 'ড্যাশবোর্ড',
        'students': 'শিক্ষার্থীদের তথ্য',
        'attendance': 'QR কোড হাজিরা',
        'routine': 'ক্লাস রুটিন',
        'results': 'পরীক্ষার ফলাফল',
        'fees': 'বেতন ও ফি ব্যবস্থাপনা',
        'notices': 'স্কুলের নোটিশ',
        'chat': 'শিক্ষক-অভিভাবক চ্যাট'
    };
    document.getElementById('page-title').innerText = titles[sectionId] || 'ম্যানেজমেন্ট সিস্টেম';

    // Initialize QR Scanner if attendance section is opened
    if(sectionId === 'attendance') {
        initQRScanner();
    }
}

// QR Scanner Initialization Function
function initQRScanner() {
    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
    scanner.addListener('scan', function (content) {
        alert('হাজিরা সফল: ' + content);
        let log = document.getElementById('attendance-log');
        let li = document.createElement('li');
        li.className = "text-green-600 font-medium";
        li.innerText = `✔ ${content} - উপস্থিত (${new Date().toLocaleTimeString()})`;
        log.prepend(li);
    });
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
        } else {
            console.error('কোনো ক্যামেরা পাওয়া যায়নি।');
        }
    }).catch(function (e) {
        console.error(e);
    });
}
