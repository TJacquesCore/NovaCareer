// script-entreprises.js

// Listes de noms et de villes ivoiriennes
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
    const studentSkills = getRandomElement(skillsList); // Obtenez le tableau de compétences
    const verificationStatus = getRandomElement(verificationStatuses);

    return {
        id: Math.floor(Math.random() * 100000), // ID aléatoire pour l'exemple
        first_name: firstName,
        last_name: lastName,
        email: email,
        university: university,
        field: field,
        filiere: `${field} Appliquée`, // Exemple de filière
        city: city,
        desired_position: position,
        skills: studentSkills.join(', '), // Joindre pour l'affichage
        raw_skills: studentSkills, // Garder le tableau pour des traitements futurs si besoin
        phone: '07' + Math.floor(10000000 + Math.random() * 90000000).toString(), // Numéro de téléphone ivoirien simulé
        dob: '2000-01-01', // Date de naissance simulée
        country: "Côte d'Ivoire",
        district: "N/A",
        motivation_letter: "Je suis motivé(e) à apprendre et à contribuer au succès de votre entreprise.",
        goal: "Trouver un stage ou un premier emploi stimulant pour développer mes compétences.",
        verification_status: verificationStatus
    };
}


// --- Fonctions pour la consultation des CV ---
function consulterCV() {
    // Masquer les autres sections si elles sont visibles
    const existingOfferPopup = document.querySelector('.post-offer-popup'); // Si vous ajoutez une classe au popup d'offre
    if (existingOfferPopup) {
        existingOfferPopup.style.display = 'none';
    }

    // Créer le popup/modal pour les profils CV
    const popup = document.createElement('div');
    popup.className = 'cv-profiles-popup'; // Ajout d'une classe pour cibler ce popup
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
    popupContent.style.maxWidth = '900px'; // Plus large pour les cartes de profils
    popupContent.style.maxHeight = '80vh'; // Limite la hauteur
    popupContent.style.overflowY = 'auto'; // Ajoute un scroll si nécessaire
    popupContent.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    popupContent.style.transform = 'translateY(20px)';
    popupContent.style.opacity = '0';
    popupContent.style.animation = 'slideIn 0.4s 0.2s forwards';
    popupContent.style.position = 'relative';
    popupContent.style.overflowX = 'hidden'; // Pour la vague

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
    loadingMessage.textContent = "Chargement des profils simulés...";
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

    // Générer 10 profils étudiants simulés
    const simulatedStudents = Array.from({ length: 10 }, generateRandomStudentProfile);

    // Simuler un petit délai pour le "chargement"
    setTimeout(() => {
        loadingMessage.textContent = ""; // Masque le message de chargement
        studentProfilesGrid.innerHTML = ''; // Vide la grille actuelle
        if (simulatedStudents.length === 0) {
            studentProfilesGrid.innerHTML = '<p class="col-span-full text-gray-500 text-center">Aucun profil étudiant trouvé pour le moment.</p>';
            return;
        }

        simulatedStudents.forEach(student => {
            let verificationHtml = '';
            let verificationColor = '';
            let verificationSymbol = '';

            switch (student.verification_status) {
                case 'verified':
                    verificationSymbol = '✓';
                    verificationColor = '#4CAF50'; // Vert
                    break;
                case 'not_verified':
                    verificationSymbol = '✕';
                    verificationColor = '#F44336'; // Rouge
                    break;
                case 'unsatisfactory':
                    verificationSymbol = '!';
                    verificationColor = '#FFC107'; // Jaune
                    break;
                default:
                    verificationSymbol = '?';
                    verificationColor = '#9E9E9E'; // Gris par défaut
            }

            verificationHtml = `
                <span style="display: inline-flex; align-items: center; gap: 0.3rem; font-weight: 600; color: #444; font-size: 0.95rem;">
                    Vérification du profil: 
                    <span style="color: ${verificationColor}; font-size: 1.1em; font-weight: 900; line-height: 1;">${verificationSymbol}</span>
                </span>
            `;


            const card = document.createElement('div');
            card.className = 'profile-card';
            card.style.backgroundColor = '#f8f9fa'; // Un fond plus clair pour les cartes
            card.style.padding = '1.5rem';
            card.style.borderRadius = '10px';
            card.style.boxShadow = '0 4px 10px rgba(0,0,0,0.08)';
            card.style.transition = 'all 0.3s ease';
            card.style.borderTop = '4px solid #3f51b5'; // Bordure supérieure colorée

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
    }, 1000); // Délai d'1 seconde

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '15px';
    closeButton.style.right = '15px';
    closeButton.style.width = '40px';
    closeButton.style.height = '40px';
    closeButton.style.borderRadius = '50%';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.color = '#888';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '1.5rem';
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
            document.body.removeChild(popup);
        }, 300);
    };

    popupContent.appendChild(closeButton);
    popup.appendChild(popupContent);
    document.body.appendChild(popup);
}

// Fonction pour afficher les détails (peut ouvrir une modale ou rediriger)
function viewStudentDetails(studentId) {
    alert(`Afficher les détails de l'étudiant avec l'ID: ${studentId}\n(Implémentation à faire : ouvrir une modale ou une page dédiée avec plus de détails simulés ou réels)`);
    // Dans une application réelle, vous feriez un appel fetch pour récupérer les détails de l'étudiant par ID
    // Exemple d'affichage détaillé dans la console pour l'instant:
    // const student = simulatedStudents.find(s => s.id === studentId);
    // if (student) console.log(student);
}

// --- Fonctions pour poster une offre (issues de script-entreprises2.js) ---
function posterOffre() {
    // Masquer les autres sections si elles sont visibles
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
                <input type="text" value="Paris (Hybride)" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;" readonly>
            </div>
            <div style="flex: 1; min-width: 250px; animation: fadeIn 0.5s 0.7s forwards;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #555;">Salaire</label>
                <input type="text" value="60K-80K€ + BSPCE" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;" readonly>
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
            showSuccessPopup(); // Le style est conservé donc l’animation fonctionne
        }, 300);
    };

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '15px';
    closeButton.style.right = '15px';
    closeButton.style.width = '40px';
    closeButton.style.height = '40px';
    closeButton.style.borderRadius = '50%';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.color = '#888';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '1.5rem';
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
            document.body.removeChild(popup);
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
    // Le style d'animation global est déjà ajouté par posterOffre ou consulterCV
    const successPopup = document.createElement('div');
    successPopup.style.position = 'fixed';
    successPopup.style.top = '0';
    successPopup.style.left = '0';
    successPopup.style.width = '100%';
    successPopup.style.height = '100%';
    successPopup.style.backgroundColor = 'rgba(0,0,0,0.7)';
    successPopup.style.display = 'flex';
    successPopup.style.justifyContent = 'center';
    successPopup.style.alignItems = 'center';
    successPopup.style.zIndex = '1000';
    successPopup.style.opacity = '0';
    successPopup.style.animation = 'fadeIn 0.4s forwards';

    const successContent = document.createElement('div');
    successContent.style.backgroundColor = 'white';
    successContent.style.padding = '3rem';
    successContent.style.borderRadius = '15px';
    successContent.style.textAlign = 'center';
    successContent.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
    successContent.style.maxWidth = '500px';
    successContent.style.width = '90%';
    successContent.style.transform = 'scale(0.8)';
    successContent.style.animation = 'bounce 0.6s 0.3s forwards, pulse 2s 1.5s infinite';

    const successIcon = document.createElement('div');
    successIcon.style.fontSize = '5rem';
    successIcon.style.color = '#4CAF50';
    successIcon.style.marginBottom = '1.5rem';
    successIcon.style.animation = 'bounce 0.6s forwards';
    successIcon.innerHTML = '✓';

    const successText = document.createElement('h2');
    successText.textContent = 'Offre postée avec succès !';
    successText.style.color = '#1a237e';
    successText.style.marginBottom = '1rem';
    successText.style.fontSize = '1.8rem';

    const successSubtext = document.createElement('p');
    successSubtext.textContent = 'Votre offre pour "Développeur Java/Python" est maintenant visible par nos talents.';
    successSubtext.style.color = '#666';
    successSubtext.style.marginBottom = '2rem';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Super !';
    closeButton.style.backgroundColor = '#4CAF50';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.padding = '0.8rem 2rem';
    closeButton.style.borderRadius = '50px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '1.1rem';
    closeButton.style.fontWeight = '600';
    closeButton.style.transition = 'all 0.3s';
    closeButton.style.boxShadow = '0 4px 6px rgba(76, 175, 80, 0.3)';

    closeButton.onmouseenter = function () {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 7px 14px rgba(76, 175, 80, 0.4)';
    };
    closeButton.onmouseleave = function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px rgba(76, 175, 80, 0.3)';
    };
    closeButton.onclick = function () {
        successPopup.style.animation = 'fadeIn 0.3s reverse forwards';
        setTimeout(() => {
            document.body.removeChild(successPopup);
        }, 300);
    };

    successContent.appendChild(successIcon);
    successContent.appendChild(successText);
    successContent.appendChild(successSubtext);
    successContent.appendChild(closeButton);
    successPopup.appendChild(successContent);
    document.body.appendChild(successPopup);
}

// Les fonctions analyserCandidats() restent les mêmes
function analyserCandidats() {
    alert("Analyse intelligente des candidats en fonction des offres (fonctionnalité à développer).");
    // Pas de modifications du DOM ici pour éviter les conflits avec les popups
}