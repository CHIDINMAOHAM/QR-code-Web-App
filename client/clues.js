const backendURL = 'https://qrcodescavengerhuntwebapp.onrender.com'; //Render backend URL

document.addEventListener('DOMContentLoaded', displaySavedClues);

const audio = new Audio('client/330046__paulmorek__beep-03-positive.wav'); //  path to your sound file

// Flag to check if user interaction has occurred
let userInteractionOccurred = false;

// Allow audio playback on user interaction
document.querySelector('.scan-qr-btn').addEventListener('click', () => {
    // Try playing the sound in a muted way
    audio.muted = true;
    audio.play().then(() => {
        // If playback succeeds, mark user interaction
        userInteractionOccurred = true;
        audio.pause();
        audio.muted = false;
        console.log('User interaction registered. Ready to play sound on QR detection.');
    }).catch((error) => {
        console.error('Error during user interaction:', error);
    });
});

// Allow audio playback on user interaction
document.querySelector('#find-clues-btn').addEventListener('click', () => {
    // Try playing the sound in a muted way
    audio.muted = true;
    audio.play().then(() => {
        // If playback succeeds, mark user interaction
        userInteractionOccurred = true;
        audio.pause();
        audio.muted = false;
        console.log('User interaction registered. Ready to play sound on QR detection.');
    }).catch((error) => {
        console.error('Error during user interaction:', error);
    });
});

async function displaySavedClues() {
    const cluesList = document.getElementById('clues-list');
    const teamName = sessionStorage.getItem('teamName');

    try {
        // Make a GET request to fetch clues for the team
        const response = await fetch(`${backendURL}/clues/${teamName}`);
        const clues = await response.json();

        if (clues.length === 0) {
            cluesList.innerHTML = `
                <p>Tu n'as pas encore trouvé d'indices!</p>
                <div>
                    <a href="scanner.html" class="btn">Scannez un QR</a>
                </div>
            `;
            document.getElementById('find-clues-btn').style.display = 'none';
        } else {
            cluesList.innerHTML = '';
            clues.forEach((clue, index) => {
                const li = document.createElement('li');
                li.classList.add('clue-item'); // Add a class for the clue item
                li.innerHTML = `
                    Clue ${index + 1}: ${clue.text}
                `;
                cluesList.appendChild(li);
            });
        }
        
    } catch (error) {
        console.error('Error fetching clues:', error);
        cluesList.innerHTML = '<p>Erreur de chargement des indices. Veuillez réessayer plus tard..</p>';
    }
}

