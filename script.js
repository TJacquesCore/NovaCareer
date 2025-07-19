// Interaction pour le menu hamburger (responsivité)
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

navSlide();

// Interaction pour le bouton "Commencer votre recherche" (sur la section hero)
document.getElementById('start-search-button').addEventListener('click', function() {
    // Simule un défilement vers la section des offres ou du profil
    document.getElementById('offers').scrollIntoView({ behavior: 'smooth' });
});

// --- Logique pour l'Upload de CV ---
const cvFileInput = document.getElementById('cvFile');
const fileNameSpan = document.getElementById('fileName');
const uploadCvBtn = document.getElementById('uploadCvBtn');
const uploadMessageDiv = document.getElementById('uploadMessage');

cvFileInput.addEventListener('change', function() {
    if (this.files.length > 0) {
        fileNameSpan.textContent = this.files[0].name;
        uploadCvBtn.disabled = false; // Active le bouton d'envoi
    } else {
        fileNameSpan.textContent = 'Aucun fichier choisi';
        uploadCvBtn.disabled = true; // Désactive le bouton d'envoi
    }
});

uploadCvBtn.addEventListener('click', function() {
    if (cvFileInput.files.length > 0) {
        const file = cvFileInput.files[0];
        // Simule un upload
        uploadMessageDiv.textContent = `"${file.name}" a été envoyé avec succès pour analyse !`;
        uploadMessageDiv.className = 'upload-message success';
        // Ici, en production, vous enverriez le fichier à un serveur via Fetch API
        // Exemple (conceptuel):
        // const formData = new FormData();
        // formData.append('cv', file);
        // fetch('/api/upload-cv', {
        //     method: 'POST',
        //     body: formData
        // }).then(response => response.json())
        //   .then(data => console.log(data))
        //   .catch(error => console.error('Erreur:', error));
    } else {
        uploadMessageDiv.textContent = 'Veuillez choisir un fichier CV.';
        uploadMessageDiv.className = 'upload-message error';
    }
});

// --- Logique pour le Chatbot IA ---
const chatInput = document.getElementById('chatInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const chatMessagesDiv = document.getElementById('chatMessages');

sendMessageBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userMessageText = chatInput.value.trim();
    if (userMessageText === '') return;

    // Ajoute le message de l'utilisateur
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user-message';
    userMessageDiv.textContent = userMessageText;
    chatMessagesDiv.appendChild(userMessageDiv);

    chatInput.value = ''; // Vide l'input
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight; // Défile vers le bas

    // Simule une réponse du bot après un court délai
    setTimeout(() => {
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'message bot-message';
        let botResponse = "Je n'ai pas compris votre question. Pouvez-vous reformuler ?";

        if (userMessageText.toLowerCase().includes('stage')) {
            botResponse = "Pour les stages, je peux vous aider à trouver des offres adaptées à votre profil et optimiser votre CV.";
        } else if (userMessageText.toLowerCase().includes('emploi')) {
            botResponse = "Concernant les emplois, je peux vous recommander des postes en fonction de vos compétences et des tendances du marché.";
        } else if (userMessageText.toLowerCase().includes('cv')) {
            botResponse = "Je peux analyser votre CV pour en améliorer la cohérence et la crédibilité. Téléchargez-le dans la section 'Upload CV'.";
        } else if (userMessageText.toLowerCase().includes('profil')) {
            botResponse = "Votre profil est votre carte d'identité sur la plateforme. Assurez-vous qu'il est complet pour des recommandations précises.";
        } else if (userMessageText.toLowerCase().includes('merci') || userMessageText.toLowerCase().includes('salut')) {
            botResponse = "De rien ! N'hésitez pas si vous avez d'autres questions.";
        }

        botMessageDiv.textContent = botResponse;
        chatMessagesDiv.appendChild(botMessageDiv);
        chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight; // Défile vers le bas
    }, 1000); // Réponse après 1 seconde
}

// --- Logique pour le filtrage des offres ---
const searchOffersInput = document.getElementById('searchOffers');
const offerTypeSelect = document.getElementById('offerType');
const offerDomainSelect = document.getElementById('offerDomain');
const offersListContainer = document.getElementById('offersList');
const allOfferCards = offersListContainer.querySelectorAll('.offer-card'); // Récupère toutes les cartes d'offres

function filterOffers() {
    const searchTerm = searchOffersInput.value.toLowerCase();
    const selectedType = offerTypeSelect.value;
    const selectedDomain = offerDomainSelect.value;

    allOfferCards.forEach(card => {
        const cardTitle = card.querySelector('h4').textContent.toLowerCase();
        const cardCompany = card.querySelector('.company').textContent.toLowerCase();
        const cardType = card.dataset.type; // Récupère la valeur de l'attribut data-type
        const cardDomain = card.dataset.domain; // Récupère la valeur de l'attribut data-domain

        const matchesSearch = cardTitle.includes(searchTerm) || cardCompany.includes(searchTerm);
        const matchesType = selectedType === 'all' || cardType === selectedType;
        const matchesDomain = selectedDomain === 'all' || cardDomain === selectedDomain;

        if (matchesSearch && matchesType && matchesDomain) {
            card.style.display = 'block'; // Affiche la carte
        } else {
            card.style.display = 'none'; // Cache la carte
        }
    });
}

// Ajoute les écouteurs d'événements pour les filtres
searchOffersInput.addEventListener('input', filterOffers);
offerTypeSelect.addEventListener('change', filterOffers);
offerDomainSelect.addEventListener('change', filterOffers);

// Initialise les filtres au chargement de la page
filterOffers();

// Gère les clics sur les boutons "Postuler" (simulation)
offersListContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('apply-btn')) {
        const offerTitle = event.target.closest('.offer-card').querySelector('h4').textContent;
        alert(`Vous avez postulé à l'offre : "${offerTitle}". Votre candidature est en cours de traitement !`);
    }
});