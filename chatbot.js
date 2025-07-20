// chatbot.js

document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // État de l'entretien
    let currentQuestionIndex = -1; // -1 signifie que l'entretien n'a pas encore commencé
    let interviewStarted = false;

    // Récupérer TOUTES les informations de l'étudiant depuis sessionStorage
    const studentFullname = sessionStorage.getItem('studentFullname') || 'cher étudiant(e)';
    const studentEmail = sessionStorage.getItem('studentEmail') || 'votre email';
    const studentPhone = sessionStorage.getItem('studentPhone') || 'votre numéro de téléphone';
    const studentField = sessionStorage.getItem('studentField') || 'votre domaine d\'étude';
    const studentFiliere = sessionStorage.getItem('studentFiliere') || 'votre filière';
    const studentCity = sessionStorage.getItem('studentCity') || 'votre ville';
    const studentDob = sessionStorage.getItem('studentDob') || 'votre date de naissance';
    const studentGoal = sessionStorage.getItem('studentGoal') || 'vos objectifs de carrière';
    const studentAdditionalInfo = sessionStorage.getItem('studentAdditionalInfo') || 'informations complémentaires';


    // Fonction pour ajouter l'indicateur de chargement
    function addLoadingIndicator() {
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('message-bubble', 'p-3', 'rounded-lg', 'max-w-fit', 'mb-2', 'shadow-sm', 'bot-message', 'bg-blue-100', 'text-blue-900', 'mr-auto', 'flex', 'items-center', 'space-x-2');
        loadingDiv.id = 'loading-indicator';
        
        loadingDiv.innerHTML = `
            <div class="flex space-x-1">
                <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0s"></div>
                <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
            </div>
        `;
        
        chatMessages.appendChild(loadingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Fonction pour retirer l'indicateur de chargement
    function removeLoadingIndicator() {
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
    }

    // Fonction pour ajouter un message au chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message-bubble', 'p-3', 'rounded-lg', 'mb-2', 'shadow-sm', 'flex');

        const innerDiv = document.createElement('div');
        innerDiv.classList.add('flex', 'items-start', 'space-x-2', 'max-w-[80%]');

        if (sender === 'user') {
            messageDiv.classList.add('justify-end');
            innerDiv.innerHTML = `
                <div class="flex flex-col items-end">
                    <div class="bg-blue-500 text-white p-3 rounded-lg shadow-md">
                        <p class="text-[15px] leading-relaxed whitespace-pre-wrap">${text}</p>
                    </div>
                    <span class="text-xs text-gray-500 mt-1">Vous</span>
                </div>
                <div class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                    ${studentFullname[0]}
                </div>
            `;
        } else { // sender === 'bot'
            messageDiv.classList.add('justify-start');
            innerDiv.innerHTML = `
                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    O
                </div>
                <div class="flex flex-col">
                    <div class="bg-blue-100 text-blue-900 p-3 rounded-lg shadow-md">
                        <p class="text-[15px] leading-relaxed whitespace-pre-wrap">${text}</p>
                    </div>
                    <span class="text-xs text-gray-500 mt-1">ORIA</span>
                </div>
            `;
        }

        messageDiv.appendChild(innerDiv);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Message d'accueil personnalisé du chatbot
    const initialBotMessage = `Bonjour ${studentFullname} ! 👋 Bienvenue à votre entretien virtuel avec Nova Jobs.

Je suis ORIA, votre assistant d'entretien IA spécialisé. Je vois que vous êtes en ${studentFiliere} (${studentField}). 
    
Je vais vous poser une série de questions pour mieux comprendre votre profil, vos compétences et vos aspirations. Cet entretien nous permettra de :
1. Évaluer vos compétences techniques et soft skills
2. Comprendre vos objectifs de carrière
3. Identifier les opportunités qui correspondent le mieux à votre profil

Objectif actuel mentionné : "${studentGoal}"

Êtes-vous prêt(e) à commencer l'entretien ? Dites-moi "oui" quand vous voulez que je pose la première question.`;
    
    addMessage(initialBotMessage, 'bot');


    // Fonction pour gérer l'envoi de message
    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // Désactiver l'input pendant le traitement
        userInput.disabled = true;
        sendButton.disabled = true;

        // Afficher le message de l'utilisateur
        addMessage(message, 'user');
        userInput.value = '';

        // Passez toutes les informations de l'étudiant à la fonction de réponse
        const studentInfo = {
            fullname: studentFullname,
            email: studentEmail,
            phone: studentPhone,
            field: studentField,
            filiere: studentFiliere,
            city: studentCity,
            dob: studentDob,
            goal: studentGoal,
            additionalInfo: studentAdditionalInfo
        };

        // Afficher l'indicateur de chargement
        addLoadingIndicator();

        try {
            const botResponse = await getGeminiResponse(message, studentInfo);
            removeLoadingIndicator();
            addMessage(botResponse, 'bot');
        } catch (error) {
            removeLoadingIndicator();
            addMessage("Désolé, une erreur est survenue. Veuillez réessayer plus tard.", 'bot');
            console.error('Erreur:', error);
        } finally {
            // Réactiver l'input
            userInput.disabled = false;
            sendButton.disabled = false;
            userInput.focus();
        }
    }

    // Fonction pour obtenir une réponse de Gemini via le backend Flask
    async function getGeminiResponse(userMessage, studentInfo) {
        try {
            // Si l'utilisateur répond "oui" et que l'entretien n'a pas commencé, on initialise
            if (!interviewStarted && userMessage.toLowerCase().includes('oui')) {
                interviewStarted = true;
                currentQuestionIndex = 0;
                return "Super ! Commençons l'entretien. Voici ma première question :\n\n" +
                       "Parlez-moi de votre parcours et de ce qui vous a amené(e) à choisir le domaine " +
                       `${studentInfo.field}. Qu'est-ce qui vous passionne particulièrement dans ce domaine ?`;
            }

            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    context: {
                        studentInfo: studentInfo,
                        interviewState: {
                            currentQuestionIndex: currentQuestionIndex,
                            interviewStarted: interviewStarted
                        }
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();
            
            // Si l'entretien est en cours, on passe à la question suivante
            if (interviewStarted && data.response) {
                currentQuestionIndex++;
                
                // Si on a atteint la fin de l'entretien
                if (currentQuestionIndex >= 5) {
                    interviewStarted = false;
                    return data.response + "\n\nMerci pour cet entretien ! J'ai une bonne compréhension de votre profil et de vos compétences. Je vais analyser vos réponses et vous donner un retour détaillé. Souhaitez-vous avoir un résumé de notre discussion ?";
                }
            }
            
            return data.response;
        } catch (error) {
            console.error('Erreur lors de l\'appel à Gemini:', error);
            return "Désolé, une erreur est survenue. Veuillez réessayer plus tard.";
        }
    }

    // Écouteur d'événement pour le bouton Envoyer
    sendButton.addEventListener('click', sendMessage);

    // Écouteur d'événement pour la touche Entrée dans le champ de texte
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});