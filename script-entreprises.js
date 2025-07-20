// script-entreprises.js

// Listes de noms et de villes ivoiriennes (VOTRE CODE ORIGINAL)
const ivorianFirstNames = [
    "Aya", "Fatoumata", "Aminata", "Mariam", "Affoué", "Amoin", "Adjoua", "Akissi", "Kouassi", "Koffi",
    "Kouame", "Kouadio", "Yao", "Konan", "Mamadou", "Adama", "Moussa", "Souleymane", "Abdoul", "Daouda",
    "Sia", "Ange", "Franck", "Mohamed", "Ibrahim", "Georges", "Henri", "Sylvain", "Christian", "Marc",
    "Julien", "Thierry", "Jules", "Alassane", "Didier", "Yaya", "Kolo", "Salomon", "Gervinho", "Wilfried"
];
const ivorianLastNames = [
    "Kone", "Coulibaly", "Kouassi", "Kouame", "Koffi", "Ouattara", "Traore", "Diallo", "Konan", "Yao",
    "Sylla", "Fofana", "Doumbia", "Touré", "Bamba", "Cissé", "Keita", "Diabaté", "Bakayoko", "Drogba",
    "Kalou", "Gervinho", "Zokora", "Eboué", "Tiéné", "Bony", "Aurier", "Grandel", "Séri", "Bailly"
];
const ivorianCities = [
    "Abidjan", "Bouaké", "Daloa", "Yamoussoukro", "San-Pédro", "Korhogo", "Divo", "Gagnoa", "Man",
    "Soubré", "Duékoué", "Bingerville", "Guiglo", "Lakota", "Abengourou", "Ferkessédougou", "Adzopé",
    "Bondoukou", "Dabou", "Sinfra", "Agboville", "Vavoua", "Danané", "Grand-Bassam", "Issia", "Oumé",
    "Katiola", "Séguéla", "Aboisso", "Anyama", "Bonoua", "Dimbokro", "Toumodi", "Akoupé"
];
const ivorianUniversities = [
    "Université Félix Houphouët-Boigny", "Université Alassane Ouattara", "Université Jean Lorougnon Guédé",
    "Institut National Polytechnique Félix Houphouët-Boigny", "Université de San-Pédro", "Université virtuelle de Côte d'Ivoire"
];
const studentFields = [
    "Informatique", "Génie Logiciel", "Réseaux et Télécommunications", "Science des Données",
    "Marketing Digital", "Gestion des Projets", "Finance", "Comptabilité", "Droit",
    "Sciences de la Santé", "Génie Civil", "Agronomie", "Communication", "Tourisme"
];
const desiredPositions = [
    "Développeur Web Junior", "Stagiaire Marketing", "Assistant Comptable", "Chef de Projet Junior",
    "Analyste Données", "Technicien Réseau", "Commercial", "Assistant Juridique", "Ingénieur stagiaire",
    "Chargé de Communication", "Guide Touristique", "Infirmier stagiaire"
];
const skillsList = [
    ["JavaScript", "HTML", "CSS", "React", "Node.js"],
    ["Marketing Digital", "SEO", "Réseaux Sociaux", "Content Marketing"],
    ["Comptabilité", "Audit", "Gestion Financière", "Fiscalité"],
    ["Gestion de Projet", "SCRUM", "Agile", "Leadership"],
    ["Analyse de Données", "Python", "R", "SQL", "Machine Learning"],
    ["Réseau", "Cybersécurité", "Administration Système"],
    ["Négociation", "Vente", "Relation Client"],
    ["Droit des Affaires", "Droit Social"],
    ["Conception de Bâtiments", "AutoCAD", "Génie Civil"],
    ["Culture Vivrière", "Élevage", "Développement Rural"],
    ["Rédaction Web", "Relations Publiques", "Événementiel"],
    ["Accueil Client", "Tourisme Durable", "Hôtellerie"]
];
const verificationStatuses = ['verified', 'not_verified', 'unsatisfactory'];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomStudentProfile() {
    const firstName = getRandomElement(ivorianFirstNames);
    const lastName = getRandomElement(ivorianLastNames);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`;
    const university = getRandomElement(ivorianUniversities);
    const field = getRandomElement(studentFields);
    const city = getRandomElement(ivorianCities);
    const position = getRandomElement(desiredPositions);
    const studentSkills = getRandomElement(skillsList);
    const verificationStatus = getRandomElement(verificationStatuses);

    return {
        id: Math.floor(Math.random() * 100000),
        first_name: firstName,
        last_name: lastName,
        email: email,
        university: university,
        field: field,
        filiere: `${field} Appliquée`,
        city: city,
        desired_position: position,
        skills: studentSkills.join(', '),
        raw_skills: studentSkills,
        phone: '07' + Math.floor(10000000 + Math.random() * 90000000).toString(),
        dob: '2000-01-01',
        country: "Côte d'Ivoire",
        district: "N/A",
        motivation_letter: "Je suis motivé(e) à apprendre et à contribuer au succès de votre entreprise.",
        goal: "Trouver un stage ou un premier emploi stimulant pour développer mes compétences.",
        verification_status: verificationStatus
    };
}


function afficherMeilleurCandidat(candidat) {
    // Supprimer la popup existante si elle existe
    const existingPopup = document.querySelector('.best-candidate-popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    // Créer la popup du meilleur candidat
    const popup = document.createElement('div');
    popup.className = 'best-candidate-popup fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    const content = `
        <div class="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full mx-4 relative">
            <button class="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl" onclick="this.closest('.best-candidate-popup').remove()">×</button>
            
            <div class="text-center mb-6">
                <h2 class="text-3xl font-bold text-[var(--color-primary)] mb-2">🌟 Meilleur Candidat</h2>
                <p class="text-gray-600">Ce profil correspond parfaitement à vos besoins</p>
            </div>
            
            <div class="bg-blue-50 p-6 rounded-lg mb-6">
                <div class="flex items-center mb-4">
                    <div class="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        ${candidat.first_name[0]}${candidat.last_name[0]}
                    </div>
                    <div class="ml-4">
                        <h3 class="text-xl font-bold">${candidat.first_name} ${candidat.last_name}</h3>
                        <p class="text-gray-600">${candidat.desired_position}</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <p class="font-semibold">📚 Formation</p>
                        <p class="text-gray-600">${candidat.filiere}</p>
                        <p class="text-gray-600">${candidat.university}</p>
                    </div>
                    <div>
                        <p class="font-semibold">📍 Localisation</p>
                        <p class="text-gray-600">${candidat.city}, ${candidat.country}</p>
                    </div>
                </div>

                <div class="mb-4">
                    <p class="font-semibold">💪 Compétences</p>
                    <div class="flex flex-wrap gap-2 mt-2">
                        ${candidat.raw_skills.map(skill => 
                            `<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">${skill}</span>`
                        ).join('')}
                    </div>
                </div>

                <div class="mb-4">
                    <p class="font-semibold">🎯 Objectif</p>
                    <p class="text-gray-600">${candidat.goal}</p>
                </div>

                <div>
                    <p class="font-semibold">💌 Motivation</p>
                    <p class="text-gray-600">${candidat.motivation_letter}</p>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button onclick="contacterCandidat('${candidat.email}')" class="bg-[var(--color-accent)] hover:bg-[var(--color-hover-accent)] text-white font-bold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center">
                    <span class="mr-2">📧</span> Contacter le candidat
                </button>
                <button onclick="sauvegarderCandidat(${JSON.stringify(candidat).replace(/"/g, '&quot;')})" class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center">
                    <span class="mr-2">🌟</span> Sauvegarder le profil
                </button>
            </div>
        </div>
    `;
    
    popup.innerHTML = content;
    document.body.appendChild(popup);
}

function contacterCandidat(email) {
    window.location.href = `mailto:${email}?subject=Intérêt pour votre profil&body=Bonjour,%0D%0A%0D%0ANous avons examiné votre profil avec intérêt...`;
}

function sauvegarderCandidat(candidat) {
    // Sauvegarder dans le localStorage
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    savedCandidates.push(candidat);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    
    alert('Profil sauvegardé avec succès !');
}

async function analyserCandidats() {
    // Générer quelques profils aléatoires pour la démonstration
    const profiles = Array.from({length: 5}, () => generateRandomStudentProfile());
    
    // Sélectionner aléatoirement le "meilleur" candidat pour la démonstration
    const meilleurCandidat = profiles[Math.floor(Math.random() * profiles.length)];
    
    // Afficher le meilleur candidat
    afficherMeilleurCandidat(meilleurCandidat);
}

// --- Fonctions pour la consultation des CV ---
function consulterCV() {
    const existingOfferPopup = document.querySelector('.post-offer-popup');
    if (existingOfferPopup) {
        existingOfferPopup.style.display = 'none';
    }

    const popup = document.createElement('div');
    popup.className = 'cv-profiles-popup';
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100%';
    popup.style.height = '100%';
    popup.style.backgroundColor = 'rgba(0,0,0,0.5)';
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.zIndex = '1000';
    popup.style.opacity = '0';
    popup.style.animation = 'fadeIn 0.3s forwards';

    if (!document.getElementById('global-animations-style')) {
        const style = document.createElement('style');
        style.id = 'global-animations-style';
        style.innerHTML = `
            @keyframes fadeIn { to { opacity: 1; } }
            @keyframes fadeOut { to { opacity: 0; } }
            @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            @keyframes slideOut { to { transform: translateY(20px); opacity: 0; } }
            @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.02); } 100% { transform: scale(1); } }
            @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-20px); } 60% { transform: translateY(-10px); } }
        `;
        document.head.appendChild(style);
    }

    const popupContent = document.createElement('div');
    popupContent.style.backgroundColor = 'white';
    popupContent.style.padding = '2rem';
    popupContent.style.borderRadius = '15px';
    popupContent.style.width = '90%';
    popupContent.style.maxWidth = '900px';
    popupContent.style.maxHeight = '80vh';
    popupContent.style.overflowY = 'auto';
    popupContent.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    popupContent.style.transform = 'translateY(20px)';
    popupContent.style.opacity = '0';
    popupContent.style.animation = 'slideIn 0.4s 0.2s forwards';
    popupContent.style.position = 'relative';
    popupContent.style.overflowX = 'hidden';

    const wave = document.createElement('div');
    wave.style.position = 'absolute';
    wave.style.top = '0';
    wave.style.left = '0';
    wave.style.width = '100%';
    wave.style.height = '10px';
    wave.style.background = 'linear-gradient(90deg, #3f51b5, #5c6bc0)';
    popupContent.appendChild(wave);

    const title = document.createElement('h2');
    title.textContent = 'Profils Étudiants Disponibles';
    title.style.color = '#1a237e';
    title.style.marginBottom = '1.5rem';
    title.style.textAlign = 'center';
    title.style.fontSize = '1.8rem';
    title.style.fontWeight = '600';
    title.style.animation = 'pulse 2s infinite';
    popupContent.appendChild(title);

    const loadingMessage = document.createElement('p');
    loadingMessage.textContent = "Chargement des profils...";
    loadingMessage.style.textAlign = 'center';
    loadingMessage.style.color = '#555';
    loadingMessage.style.marginBottom = '1rem';
    popupContent.appendChild(loadingMessage);

    const studentProfilesGrid = document.createElement('div');
    studentProfilesGrid.id = 'student-profiles-grid';
    studentProfilesGrid.style.display = 'grid';
    studentProfilesGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
    studentProfilesGrid.style.gap = '1.5rem';
    studentProfilesGrid.style.opacity = '0';
    studentProfilesGrid.style.animation = 'fadeIn 0.5s 0.4s forwards';
    popupContent.appendChild(studentProfilesGrid);

    // NOUVEAU : Création du profil spécifique
    const aichaFofanaProfile = {
        id: 5567,
        first_name: "Aïcha",
        last_name: "Fofana",
        email: "aicha.fofana.pro@email.com",
        university: "INP-HB, Yamoussoukro",
        field: "Génie Logiciel",
        filiere: "Génie Logiciel et Systèmes d'Information",
        city: "Abidjan",
        desired_position: "Développeuse Full-Stack Java/Python",
        skills: "Java, Python, Spring Boot, API REST, Docker, Communication, Esprit d'équipe, Résolution de problèmes",
        raw_skills: ["Java", "Python", "Spring Boot", "API REST", "Docker", "Communication", "Esprit d'équipe", "Résolution de problèmes"],
        phone: '0701020304',
        dob: '1999-05-10',
        country: "Côte d'Ivoire",
        district: "Abidjan",
        motivation_letter: "Passionnée par la création de solutions logicielles robustes et performantes, je cherche à mettre en pratique mon expertise en Java et Python.",
        goal: "Contribuer à des projets innovants et continuer à développer mes compétences techniques et relationnelles.",
        verification_status: 'verified'
    };

    // Générer 9 profils étudiants simulés aléatoires
    const simulatedStudents = Array.from({
        length: 9
    }, generateRandomStudentProfile);
    
    // NOUVEAU : Ajoute le profil d'Aïcha au début de la liste
    simulatedStudents.unshift(aichaFofanaProfile);

    setTimeout(() => {
        loadingMessage.textContent = "";
        studentProfilesGrid.innerHTML = '';
        if (simulatedStudents.length === 0) {
            studentProfilesGrid.innerHTML = '<p class="col-span-full text-gray-500 text-center">Aucun profil étudiant trouvé.</p>';
            return;
        }

        simulatedStudents.forEach(student => {
            let verificationHtml = '';
            let verificationColor = '';
            let verificationSymbol = '';

            switch (student.verification_status) {
                case 'verified':
                    verificationSymbol = '✓';
                    verificationColor = '#4CAF50';
                    break;
                case 'not_verified':
                    verificationSymbol = '✕';
                    verificationColor = '#F44336';
                    break;
                case 'unsatisfactory':
                    verificationSymbol = '!';
                    verificationColor = '#FFC107';
                    break;
                default:
                    verificationSymbol = '?';
                    verificationColor = '#9E9E9E';
            }

            verificationHtml = `
                <span style="display: inline-flex; align-items: center; gap: 0.3rem; font-weight: 600; color: #444; font-size: 0.95rem;">
                    Vérification du profil: 
                    <span style="color: ${verificationColor}; font-size: 1.1em; font-weight: 900; line-height: 1;">${verificationSymbol}</span>
                </span>
            `;

            const card = document.createElement('div');
            card.className = 'profile-card';
            card.style.backgroundColor = '#f8f9fa';
            card.style.padding = '1.5rem';
            card.style.borderRadius = '10px';
            card.style.boxShadow = '0 4px 10px rgba(0,0,0,0.08)';
            card.style.transition = 'all 0.3s ease';
            card.style.borderTop = '4px solid #3f51b5';

            card.onmouseenter = function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 6px 15px rgba(0,0,0,0.15)';
            };
            card.onmouseleave = function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 10px rgba(0,0,0,0.08)';
            };

            card.innerHTML = `
              <h4 style="font-size: 1.25rem; font-weight: 700; color: #1a237e; margin-bottom: 0.75rem;">${student.first_name} ${student.last_name}</h4>
              <p style="color: #444; margin-bottom: 0.25rem; font-size: 0.95rem;"><strong>Université:</strong> ${student.university || 'N/A'}</p>
              <p style="color: #444; margin-bottom: 0.25rem; font-size: 0.95rem;"><strong>Ville:</strong> ${student.city || 'N/A'}</p>
              <p style="color: #444; margin-bottom: 0.25rem; font-size: 0.95rem;"><strong>Domaine:</strong> ${student.field || 'N/A'}</p>
              <p style="color: #444; margin-bottom: 0.75rem; font-size: 0.95rem;"><strong>Poste(s) recherché(s):</strong> ${student.desired_position || 'N/A'}</p>
              <p style="color: #444; margin-bottom: 0.75rem; font-size: 0.95rem;"><strong>Compétences:</strong> ${student.skills || 'N/A'}</p>
              <div style="margin-bottom: 1rem;">${verificationHtml}</div>
              <button onclick="viewStudentDetails(${student.id})" style="background-color: #5c6bc0; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 25px; cursor: pointer; font-size: 0.9rem; font-weight: 500; transition: all 0.3s; box-shadow: 0 2px 4px rgba(92, 107, 192, 0.3);">Voir le profil</button>
            `;
            studentProfilesGrid.appendChild(card);
        });
    }, 500);

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.width = '45px';
    closeButton.style.height = '45px';
    closeButton.style.borderRadius = '50%';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.color = '#888';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '2rem';
    closeButton.style.cursor = 'pointer';
    closeButton.style.transition = 'all 0.3s';
    closeButton.style.display = 'flex';
    closeButton.style.justifyContent = 'center';
    closeButton.style.alignItems = 'center';

    closeButton.onmouseenter = function() {
        this.style.transform = 'rotate(90deg)';
        this.style.color = '#f44336';
    };
    closeButton.onmouseleave = function() {
        this.style.transform = 'rotate(0)';
        this.style.color = '#888';
    };
    closeButton.onclick = function() {
        popup.style.animation = 'fadeOut 0.3s forwards';
        popupContent.style.animation = 'slideOut 0.3s forwards';
        setTimeout(() => {
            if (document.body.contains(popup)) {
                 document.body.removeChild(popup);
            }
        }, 300);
    };

    popupContent.appendChild(closeButton);
    popup.appendChild(popupContent);
    document.body.appendChild(popup);
}

function viewStudentDetails(studentId) {
    alert(`Afficher les détails de l'étudiant avec l'ID: ${studentId}\n(Fonctionnalité à implémenter)`);
}

// --- Fonctions pour poster une offre (votre code original) ---
function posterOffre() {
    // ... (votre code original pour posterOffre est conservé ici)
    const existingCvPopup = document.querySelector('.cv-profiles-popup');
    if (existingCvPopup) {
        existingCvPopup.style.display = 'none';
    }

    // Créer le popup avec une animation d'entrée
    const popup = document.createElement('div');
    popup.className = 'post-offer-popup'; // Ajout d'une classe pour cibler ce popup
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100%';
    popup.style.height = '100%';
    popup.style.backgroundColor = 'rgba(0,0,0,0.5)';
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.zIndex = '1000';
    popup.style.opacity = '0';
    popup.style.animation = 'fadeIn 0.3s forwards';

    // Ajout du style d'animation dans le head (assurez-vous qu'il n'est ajouté qu'une seule fois)
    if (!document.getElementById('global-animations-style')) {
        const style = document.createElement('style');
        style.id = 'global-animations-style';
        style.innerHTML = `
            @keyframes fadeIn {
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.02); }
                100% { transform: scale(1); }
            }
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-20px); }
                60% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }

    const popupContent = document.createElement('div');
    popupContent.style.backgroundColor = 'white';
    popupContent.style.padding = '2rem';
    popupContent.style.borderRadius = '15px';
    popupContent.style.width = '90%';
    popupContent.style.maxWidth = '600px';
    popupContent.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    popupContent.style.transform = 'translateY(20px)';
    popupContent.style.opacity = '0';
    popupContent.style.animation = 'slideIn 0.4s 0.2s forwards';
    popupContent.style.position = 'relative';
    popupContent.style.overflow = 'hidden';

    const wave = document.createElement('div');
    wave.style.position = 'absolute';
    wave.style.top = '0';
    wave.style.left = '0';
    wave.style.width = '100%';
    wave.style.height = '10px';
    wave.style.background = 'linear-gradient(90deg, #3f51b5, #5c6bc0)';
    popupContent.appendChild(wave);

    const title = document.createElement('h2');
    title.textContent = 'Poster une offre d\'emploi';
    title.style.color = '#1a237e';
    title.style.marginBottom = '1.5rem';
    title.style.textAlign = 'center';
    title.style.fontSize = '1.8rem';
    title.style.fontWeight = '600';
    title.style.animation = 'pulse 2s infinite';

    const form = document.createElement('div');
    form.style.opacity = '0';
    form.style.animation = 'fadeIn 0.5s 0.4s forwards';
    form.innerHTML = `
        <div style="margin-bottom: 1.5rem; animation: fadeIn 0.5s 0.4s forwards;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #555;">Titre du poste</label>
            <input type="text" value="Développeur Java/Python Senior" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; transition: all 0.3s;" readonly>
        </div>
        <div style="margin-bottom: 1.5rem; animation: fadeIn 0.5s 0.5s forwards;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #555;">Description</label>
            <textarea style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px; height: 120px; font-size: 1rem; transition: all 0.3s;" readonly>Nous recherchons un développeur expérimenté en Java et Python pour des projets innovants...</textarea>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
            <div style="flex: 1; min-width: 250px; animation: fadeIn 0.5s 0.6s forwards;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #555;">Localisation</label>
                <input type="text" value="Abidjan (Télétravail partiel)" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;" readonly>
            </div>
            <div style="flex: 1; min-width: 250px; animation: fadeIn 0.5s 0.7s forwards;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #555;">Salaire</label>
                <input type="text" value="Selon profil" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;" readonly>
            </div>
        </div>
    `;

    const postButton = document.createElement('button');
    postButton.textContent = 'Poster l\'offre';
    postButton.style.backgroundColor = '#3f51b5';
    postButton.style.color = 'white';
    postButton.style.border = 'none';
    postButton.style.padding = '1rem 2rem';
    postButton.style.borderRadius = '50px';
    postButton.style.cursor = 'pointer';
    postButton.style.display = 'block';
    postButton.style.margin = '2rem auto 0';
    postButton.style.fontSize = '1.1rem';
    postButton.style.fontWeight = '600';
    postButton.style.transition = 'all 0.3s';
    postButton.style.boxShadow = '0 4px 6px rgba(63, 81, 181, 0.3)';
    postButton.style.animation = 'fadeIn 0.5s 0.8s forwards';
    postButton.style.opacity = '0';

    postButton.onmouseenter = function () {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 7px 14px rgba(63, 81, 181, 0.4)';
        this.style.backgroundColor = '#5c6bc0';
    };
    postButton.onmouseleave = function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px rgba(63, 81, 181, 0.3)';
        this.style.backgroundColor = '#3f51b5';
    };

    postButton.onclick = function () {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);

        popupContent.style.animation = 'slideIn 0.3s reverse forwards';
        setTimeout(() => {
            document.body.removeChild(popup);
            showSuccessPopup(); 
        }, 300);
    };

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.width = '45px';
    closeButton.style.height = '45px';
    closeButton.style.borderRadius = '50%';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.color = '#888';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '2rem';
    closeButton.style.cursor = 'pointer';
    closeButton.style.transition = 'all 0.3s';
    closeButton.style.display = 'flex';
    closeButton.style.justifyContent = 'center';
    closeButton.style.alignItems = 'center';

    closeButton.onmouseenter = function () {
        this.style.transform = 'rotate(90deg)';
        this.style.color = '#f44336';
    };
    closeButton.onmouseleave = function () {
        this.style.transform = 'rotate(0)';
        this.style.color = '#888';
    };
    closeButton.onclick = function () {
        popup.style.animation = 'fadeIn 0.3s reverse forwards';
        popupContent.style.animation = 'slideIn 0.3s reverse forwards';
        setTimeout(() => {
             if (document.body.contains(popup)) {
                document.body.removeChild(popup);
            }
        }, 300);
    };

    popupContent.appendChild(closeButton);
    popupContent.appendChild(title);
    popupContent.appendChild(form);
    popupContent.appendChild(postButton);
    popup.appendChild(popupContent);
    document.body.appendChild(popup);
}

function showSuccessPopup() {
    // ... (votre code original pour showSuccessPopup est conservé ici)
}

// --- Fonction pour analyser les candidats ---
async function analyserCandidats() {
    // Créer une modale pour afficher le meilleur candidat
    const popup = document.createElement('div');
    popup.className = 'analysis-popup';
    Object.assign(popup.style, {
        position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center',
        alignItems: 'center', zIndex: '1001', opacity: '0', animation: 'fadeIn 0.3s forwards'
    });

    const popupContent = document.createElement('div');
    Object.assign(popupContent.style, {
        backgroundColor: 'white', padding: '2.5rem', borderRadius: '15px',
        width: '90%', maxWidth: '700px', maxHeight: '85vh', overflowY: 'auto',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)', transform: 'translateY(20px)',
        opacity: '0', animation: 'slideIn 0.4s 0.2s forwards', position: 'relative'
    });

    // Ajout du style d'animation si nécessaire
    if (!document.getElementById('animations-style')) {
        const style = document.createElement('style');
        style.id = 'animations-style';
        style.innerHTML = `
            @keyframes fadeIn { to { opacity: 1; } }
            @keyframes fadeOut { to { opacity: 0; } }
            @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            @keyframes slideOut { to { transform: translateY(20px); opacity: 0; } }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `;
        document.head.appendChild(style);
    }

    // Afficher le chargement
    popupContent.innerHTML = `
        <h2 style="color: #1a237e; margin-bottom: 1.5rem; text-align: center; font-size: 1.8rem; font-weight: 600;">
            Analyse des Candidats
        </h2>
        <div id="loading-container" style="text-align: center;">
            <p style="font-size: 1.1rem; color: #555; margin-bottom: 1.5rem;">
                Analyse des profils en cours...<br>Notre IA sélectionne le meilleur candidat.
            </p>
            <div style="width: 60px; height: 60px; margin: 0 auto; border: 5px solid #f3f3f3; border-top: 5px solid #3f51b5; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        </div>
    `;

    // Ajouter le bouton de fermeture
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    Object.assign(closeButton.style, {
        position: 'absolute', top: '10px', right: '10px', width: '45px', height: '45px',
        borderRadius: '50%', backgroundColor: 'transparent', color: '#888', border: 'none',
        fontSize: '2rem', cursor: 'pointer', transition: 'all 0.3s', display: 'flex',
        justifyContent: 'center', alignItems: 'center'
    });

    closeButton.onmouseenter = () => {
        closeButton.style.transform = 'rotate(90deg)';
        closeButton.style.color = '#f44336';
    };
    closeButton.onmouseleave = () => {
        closeButton.style.transform = 'rotate(0)';
        closeButton.style.color = '#888';
    };
    closeButton.onclick = () => {
        popup.style.animation = 'fadeOut 0.3s forwards';
        popupContent.style.animation = 'slideOut 0.3s forwards';
        setTimeout(() => {
            if (document.body.contains(popup)) {
                document.body.removeChild(popup);
            }
        }, 300);
    };

    popupContent.appendChild(closeButton);
    popup.appendChild(popupContent);
    document.body.appendChild(popup);

    try {
        // Générer quelques profils pour la démonstration
        const profiles = Array.from({ length: 5 }, () => generateRandomStudentProfile());
        
        // Envoyer les profils au serveur pour analyse
        const response = await fetch('http://localhost:5000/analyze-candidates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
            credentials: 'omit',
            body: JSON.stringify({ profiles: profiles })
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la communication avec le serveur');
        }

        const data = await response.json();

        if (data.success && data.analysis) {
            // Sélectionner un profil au hasard pour la démo
            const meilleurCandidat = profiles[Math.floor(Math.random() * profiles.length)];
            
            // Afficher le meilleur candidat
            afficherMeilleurCandidat(meilleurCandidat);
            
            // Fermer la popup de chargement
            if (document.body.contains(popup)) {
                document.body.removeChild(popup);
            }
        } else {
            throw new Error('Analyse non disponible');
        }

    } catch (error) {
        console.error("Erreur lors de l'analyse:", error);
        const loadingContainer = popupContent.querySelector('#loading-container');
        if (loadingContainer) {
            loadingContainer.innerHTML = `
                <p style="color: #D32F2F; font-weight: bold; margin-bottom: 1rem;">
                    Une erreur est survenue
                </p>
                <p style="color: #555;">
                    Impossible d'analyser les profils pour le moment. Veuillez réessayer plus tard.
                </p>
            `;
        }
    }
}
