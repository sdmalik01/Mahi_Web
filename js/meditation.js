// MindEase - Meditation & Breathing Exercise

let meditationActive = false;
let meditationPaused = false;
let breathInterval = null;
let progressInterval = null;
let breathCount = 0;
let elapsedTime = 0;
let duration = 3; // minutes
let breathSpeed = 6; // seconds per breath cycle
let soundEnabled = false;

const breathingCircle = document.getElementById('breathingCircle');
const breathingText = document.getElementById('breathingText');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const progressSection = document.getElementById('progressSection');
const instructions = document.getElementById('instructions');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    if (breathingCircle) {
        updateDuration();
        updateBreathSpeed();
    }
});

function startMeditation() {
    if (meditationActive) return;
    
    meditationActive = true;
    meditationPaused = false;
    breathCount = 0;
    elapsedTime = 0;
    
    // Update UI
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    stopBtn.style.display = 'inline-block';
    instructions.style.display = 'none';
    progressSection.style.display = 'block';
    
    // Start breathing animation
    startBreathing();
    
    // Start progress tracking
    updateProgress();
    progressInterval = setInterval(updateProgress, 1000);
    
    showToast('Meditation started. Focus on your breath.', 'success');
}

function pauseMeditation() {
    if (!meditationActive) return;
    
    meditationPaused = !meditationPaused;
    
    if (meditationPaused) {
        pauseBtn.innerHTML = '▶️ Resume';
        breathingCircle.classList.add('paused');
        breathingText.textContent = 'Paused';
        clearInterval(breathInterval);
        clearInterval(progressInterval);
        showToast('Meditation paused', 'warning');
    } else {
        pauseBtn.innerHTML = '⏸️ Pause';
        breathingCircle.classList.remove('paused');
        startBreathing();
        progressInterval = setInterval(updateProgress, 1000);
        showToast('Meditation resumed', 'success');
    }
}

function stopMeditation() {
    if (!meditationActive) return;
    
    meditationActive = false;
    meditationPaused = false;
    
    // Clear intervals
    clearInterval(breathInterval);
    clearInterval(progressInterval);
    
    // Reset UI
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
    stopBtn.style.display = 'none';
    progressSection.style.display = 'none';
    instructions.style.display = 'block';
    
    // Reset circle
    breathingCircle.className = 'breathing-circle';
    breathingText.textContent = 'Get Ready';
    
    // Show completion message
    if (elapsedTime > 0) {
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        showToast(`Great session! You meditated for ${minutes}m ${seconds}s`, 'success', 5000);
    }
    
    // Reset counters
    breathCount = 0;
    elapsedTime = 0;
    updateProgress();
}

function startBreathing() {
    let isInhaling = true;
    breathCount = 0;
    
    // Get current speed setting
    const speedSelect = document.getElementById('breathSpeed');
    const speed = speedSelect.value;
    
    // Remove all animation classes
    breathingCircle.className = 'breathing-circle';
    
    // Add appropriate animation class
    breathingCircle.classList.add(`breathe-${speed}`);
    
    // Update text
    updateBreathText(isInhaling);
    
    // Set interval for text updates
    const halfCycle = (breathSpeed * 1000) / 2;
    
    breathInterval = setInterval(() => {
        if (!meditationPaused) {
            isInhaling = !isInhaling;
            updateBreathText(isInhaling);
            
            if (isInhaling) {
                breathCount++;
                document.getElementById('breathCount').textContent = breathCount;
            }
        }
    }, halfCycle);
}

function updateBreathText(isInhaling) {
    if (isInhaling) {
        breathingText.textContent = 'Breathe In';
        breathingText.style.color = '#6366f1';
    } else {
        breathingText.textContent = 'Breathe Out';
        breathingText.style.color = '#8b5cf6';
    }
}

function updateProgress() {
    if (meditationPaused) return;
    
    elapsedTime++;
    
    const totalSeconds = duration * 60;
    const progressPercent = (elapsedTime / totalSeconds) * 100;
    
    // Update progress bar
    document.getElementById('progressFill').style.width = progressPercent + '%';
    
    // Update time display
    const currentMinutes = Math.floor(elapsedTime / 60);
    const currentSeconds = elapsedTime % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalSecs = totalSeconds % 60;
    
    document.getElementById('currentTime').textContent = 
        `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
    document.getElementById('totalTime').textContent = 
        `${totalMinutes}:${totalSecs.toString().padStart(2, '0')}`;
    
    // Check if meditation is complete
    if (elapsedTime >= totalSeconds) {
        stopMeditation();
        showToast('🎉 Meditation complete! Well done!', 'success', 5000);
    }
}

function updateDuration() {
    const select = document.getElementById('duration');
    duration = parseInt(select.value);
    
    const totalSeconds = duration * 60;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    if (document.getElementById('totalTime')) {
        document.getElementById('totalTime').textContent = 
            `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

function updateBreathSpeed() {
    const select = document.getElementById('breathSpeed');
    const speed = select.value;
    
    switch(speed) {
        case 'slow':
            breathSpeed = 8;
            break;
        case 'medium':
            breathSpeed = 6;
            break;
        case 'fast':
            breathSpeed = 4;
            break;
    }
    
    // If meditation is active, restart breathing with new speed
    if (meditationActive && !meditationPaused) {
        clearInterval(breathInterval);
        startBreathing();
    }
}

function toggleSound() {
    const checkbox = document.getElementById('soundToggle');
    soundEnabled = checkbox.checked;
    
    if (soundEnabled) {
        showToast('Background sound enabled (simulated)', 'success');
        // In a real app, you would play ambient sound here
    } else {
        showToast('Background sound disabled', 'success');
        // Stop sound
    }
}