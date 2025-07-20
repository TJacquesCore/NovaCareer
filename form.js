document.addEventListener('DOMContentLoaded', function() {
    console.log('Form JS loaded');

    // Données de pré-remplissage
    const defaultData = {
        firstName: "Kouassi",
        lastName: "Yao",
        email: "kouassi.yao@email.com",
        phone: "0707070707",
        dob: "2000-01-01",
        country: "Côte d'Ivoire",
        city: "Abidjan",
        district: "Cocody",
        university: "Université Félix Houphouët-Boigny",
        field: "informatique",
        filiere: "Génie Logiciel",
        desiredPosition: "Développeur Full Stack",
        skills: "JavaScript, Python, React, Node.js, PHP",
        motivationLetter: "Je suis passionné par le développement web et je souhaite mettre mes compétences au service d'une entreprise innovante.",
        goal: "Mon objectif est de devenir un développeur full stack expert et de participer à des projets innovants dans le domaine du web.",
        additionalInfo: "J'ai déjà réalisé plusieurs projets personnels en utilisant différentes technologies web."
    };

    // Pré-remplir le formulaire
    Object.keys(defaultData).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.value = defaultData[key];
        }
    });
    
    document.getElementById('studentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');

        // Récupérer toutes les données du formulaire
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            dob: document.getElementById('dob').value,
            country: document.getElementById('country').value.trim(),
            city: document.getElementById('city').value.trim(),
            district: document.getElementById('district').value.trim(),
            university: document.getElementById('university').value.trim(),
            field: document.getElementById('field').value,
            filiere: document.getElementById('filiere').value.trim(),

            desiredPosition: document.getElementById('desiredPosition').value.trim(),
            skills: document.getElementById('skills').value.trim(),
            motivationLetter: document.getElementById('motivationLetter').value.trim(),
            goal: document.getElementById('goal').value.trim(),
            additionalInfo: document.getElementById('additionalInfo').value.trim()
        };

        // Vérifier que les champs requis sont remplis
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'dob', 'country', 'city', 'university', 'field', 'filiere', 'goal'];
        const emptyFields = requiredFields.filter(field => !formData[field]);
        
        if (emptyFields.length > 0) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        try {
            // Sauvegarder les données dans le localStorage
            localStorage.setItem('studentProfile', JSON.stringify(formData));
            console.log('Data saved:', formData);

            // Créer et afficher un message de succès
            const successMessage = document.createElement('div');
            successMessage.className = 'fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50';
            successMessage.innerHTML = `
                <div class="bg-white p-8 rounded-xl shadow-2xl transform transition-all duration-300 scale-0">
                    <div class="text-center">
                        <div class="mb-4">
                            <svg class="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                            </svg>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-800 mb-4">Inscription réussie !</h2>
                        <p class="text-gray-600 mb-8">Redirection vers votre assistant personnel...</p>
                        <div class="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
                    </div>
                </div>
            `;

            document.body.appendChild(successMessage);

            // Animer l'apparition du message
            setTimeout(() => {
                const popup = successMessage.querySelector('div');
                popup.classList.remove('scale-0');
                popup.classList.add('scale-100');
            }, 10);

            // Rediriger vers le chatbot après 2 secondes
            setTimeout(() => {
                window.location.href = 'chatbot.html';
            }, 2000);

        } catch (error) {
            console.error('Error:', error);
            alert('Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.');
        }
    });
});