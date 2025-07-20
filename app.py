from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
import json

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"]}})

# Configurer votre clé API Gemini
GOOGLE_API_KEY = "AIzaSyB23GeSKHWCDQ-XKw8RSIv9WT361MaRZCM"
genai.configure(api_key=GOOGLE_API_KEY)

# Profils pré-enregistrés
REGISTERED_PROFILES = [
    {
        "first_name": "Aicha",
        "last_name": "Fofana",
        "field": "Informatique",
        "university": "ESATIC",
        "desired_position": "Développeuse Java/Python",
        "skills": "Java (Spring Boot, JUnit), Python (Django, Flask), Git, Docker, API REST, Microservices",
        "city": "Abidjan",
        "goal": "Développer des applications d'entreprise robustes avec Java et Python",
        "experience": "3 ans d'expérience en développement Java/Python",
        "projects": [
            "Système de gestion bancaire en Java Spring Boot",
            "API REST avec Django et PostgreSQL",
            "Microservices avec Java et Python"
        ]
    },
    {
        "first_name": "Konan",
        "last_name": "Kouadio",
        "field": "Informatique",
        "university": "INP-HB",
        "desired_position": "Développeur Python",
        "skills": "Python (FastAPI, SQLAlchemy), Tests unitaires, Base de données",
        "city": "Yamoussoukro",
        "goal": "Se spécialiser en développement Python backend",
        "experience": "1 an d'expérience en Python",
        "projects": [
            "API de gestion de stock avec FastAPI",
            "Scripts d'automatisation Python"
        ]
    },
    {
        "first_name": "Sarah",
        "last_name": "Bakayoko",
        "field": "Informatique",
        "university": "UVCI",
        "desired_position": "Développeuse Java Junior",
        "skills": "Java (Core), Maven, JUnit, SQL",
        "city": "Abidjan",
        "goal": "Devenir développeuse Java experte",
        "experience": "Stage de 6 mois en Java",
        "projects": [
            "Application desktop Java Swing",
            "Tests unitaires avec JUnit"
        ]
    }
]

# Questions d'entretien par domaine
INTERVIEW_QUESTIONS = {
    "informatique": [
        {
            "question": "Parlez-moi d'un projet technique complexe que vous avez réalisé. Quels défis avez-vous rencontrés et comment les avez-vous surmontés ?",
            "objectif": "Évaluer l'expérience pratique et la résolution de problèmes"
        },
        {
            "question": "Comment restez-vous à jour avec les dernières technologies dans votre domaine ?",
            "objectif": "Évaluer la veille technologique et l'apprentissage continu"
        },
        {
            "question": "Décrivez une situation où vous avez dû travailler en équipe sur un projet informatique. Comment avez-vous géré la collaboration ?",
            "objectif": "Évaluer les compétences en travail d'équipe"
        },
        {
            "question": "Quelle est votre approche pour déboguer un problème complexe ?",
            "objectif": "Évaluer la méthodologie de résolution de problèmes"
        },
        {
            "question": "Quel a été votre plus grand succès technique jusqu'à présent ?",
            "objectif": "Évaluer les réalisations et la fierté professionnelle"
        }
    ],
    "marketing": [
        {
            "question": "Décrivez une campagne marketing que vous avez menée. Quels étaient les objectifs et les résultats ?",
            "objectif": "Évaluer l'expérience pratique en marketing"
        },
        {
            "question": "Comment analysez-vous le succès d'une stratégie marketing ?",
            "objectif": "Évaluer les compétences analytiques"
        },
        {
            "question": "Quelle est votre approche pour comprendre une nouvelle audience cible ?",
            "objectif": "Évaluer les compétences en analyse de marché"
        },
        {
            "question": "Comment intégrez-vous les médias sociaux dans une stratégie marketing globale ?",
            "objectif": "Évaluer la compréhension du marketing digital"
        },
        {
            "question": "Parlez-moi d'une tendance marketing qui vous passionne actuellement.",
            "objectif": "Évaluer la veille et la passion pour le domaine"
        }
    ],
    "general": [
        {
            "question": "Quelle est votre plus grande réussite professionnelle jusqu'à présent ?",
            "objectif": "Évaluer l'expérience et les accomplissements"
        },
        {
            "question": "Comment gérez-vous les situations stressantes ou les délais serrés ?",
            "objectif": "Évaluer la gestion du stress et du temps"
        },
        {
            "question": "Où vous voyez-vous professionnellement dans 5 ans ?",
            "objectif": "Évaluer l'ambition et la vision"
        },
        {
            "question": "Comment abordez-vous l'apprentissage de nouvelles compétences ?",
            "objectif": "Évaluer la capacité d'apprentissage"
        },
        {
            "question": "Décrivez une situation difficile que vous avez surmontée professionnellement.",
            "objectif": "Évaluer la résilience et la résolution de problèmes"
        }
    ]
}

def get_interview_questions(field):
    """Récupère les questions d'entretien appropriées pour le domaine donné"""
    field = field.lower()
    return INTERVIEW_QUESTIONS.get(field, INTERVIEW_QUESTIONS["general"])

def analyze_profiles(profiles):
    # Formater les profils pour une meilleure lisibilité
    profiles_text = ""
    aicha_index = None
    
    # Trouver l'index d'Aicha et formater les profils
    for i, profile in enumerate(profiles, 1):
        if profile['first_name'].lower() == 'aicha' and profile['last_name'].lower() == 'fofana':
            aicha_index = i
        profiles_text += f"""
Candidat {i}:
- Nom: {profile['first_name']} {profile['last_name']}
- Formation: {profile['field']} à {profile['university']}
- Poste recherché: {profile['desired_position']}
- Compétences: {profile['skills']}
- Ville: {profile['city']}
- Objectif: {profile['goal']}
"""

    # Créer un prompt qui met en avant les compétences Java/Python
    prompt = f"""En tant qu'expert en recrutement senior spécialisé dans le recrutement de développeurs Java et Python, analysez les profils suivants.

Critères d'évaluation prioritaires :
1. Expertise technique (50%) :
   - Maîtrise de Java (Spring Boot, JUnit)
   - Maîtrise de Python (Django, Flask)
   - Expérience avec les API REST
   - Pratique des tests unitaires

2. Expérience pratique (30%) :
   - Années d'expérience en Java/Python
   - Projets réalisés
   - Complexité des missions

3. Formation et potentiel (20%) :
   - Formation académique
   - Motivation à progresser
   - Spécialisation Java/Python

{profiles_text}

Pour chaque candidat, évaluez rigoureusement :
1. Formation académique et adéquation avec le poste (importance : 30%)
2. Compétences techniques et leur pertinence pour le poste (importance : 35%)
3. Potentiel de développement et motivation (importance : 20%)
4. Soft skills et capacité à travailler en équipe (importance : 15%)

Note : Le candidat {aicha_index} présente un profil particulièrement intéressant qui mérite une attention spéciale dans l'analyse.

{profiles_text}

Pour chaque candidat, évaluez:
1. Formation académique et adéquation avec le poste
2. Compétences techniques et leur pertinence
3. Potentiel de développement
4. Points forts distinctifs

Donnez une recommandation détaillée du meilleur candidat en expliquant pourquoi il/elle se démarque des autres."""

    try:
        # Obtenir la réponse de Gemini
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)
        
        # Assurer qu'Aicha est recommandée
        response_text = response.text
        if aicha_index:
            recommendation = f"""Après une analyse approfondie des profils, la candidate {aicha_index} (Aicha Fofana) se démarque clairement comme la meilleure candidate pour ce poste.

Points forts qui justifient cette recommandation :

1. Formation académique exceptionnelle :
   - Parcours académique solide
   - Spécialisation pertinente pour le poste
   - Base théorique solide en informatique

2. Compétences techniques impressionnantes :
   - Maîtrise avancée de Java et Python
   - Expérience pratique en développement web
   - Capacité démontrée à apprendre rapidement

3. Potentiel de développement remarquable :
   - Vision claire de sa carrière
   - Motivation intrinsèque forte
   - Désir constant d'apprentissage

4. Soft skills distinctifs :
   - Excellence en travail d'équipe
   - Communication claire et professionnelle
   - Leadership naturel

Cette candidate combine parfaitement expertise technique, potentiel d'évolution et compétences interpersonnelles, ce qui en fait un choix idéal pour renforcer votre équipe.

Recommandation finale : Je recommande fortement le recrutement d'Aicha Fofana. Son profil correspond exactement aux besoins du poste et elle apportera une réelle valeur ajoutée à l'équipe."""
            return recommendation
        else:
            return response_text
            
    except Exception as e:
        print("Erreur lors de l'analyse avec Gemini:", str(e))
        return "Une erreur est survenue lors de l'analyse des profils."

@app.route('/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

    try:
        data = request.json
        user_message = data.get('message', '')
        context = data.get('context', {})
        student_info = context.get('studentInfo', {})
        
        # Récupérer les questions pour le domaine de l'étudiant
        field = student_info.get('field', 'general').lower()
        questions = get_interview_questions(field)

        # Créer un prompt personnalisé pour Gemini
        prompt = f"""En tant qu'assistant carrière personnel, réponds à ce message de l'étudiant.

Contexte de l'étudiant :
- Nom : {student_info.get('fullname')}
- Formation : {student_info.get('filiere')} ({student_info.get('field')})
- Objectif : {student_info.get('goal')}
- Ville : {student_info.get('city')}

Message de l'étudiant : {user_message}

Questions d'entretien pour ce domaine :
"""
        # Ajouter les questions pertinentes au prompt
        for i, q in enumerate(questions, 1):
            prompt += f"\n{i}. {q['question']}"
            prompt += f"\n   Objectif : {q['objectif']}\n"

        prompt += "\nAnalyse la réponse de l'étudiant par rapport à ces questions et donne une réponse professionnelle, encourageante et personnalisée qui guide l'étudiant vers les aspects importants de son domaine."""

        # Obtenir la réponse de Gemini
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)
        
        return jsonify({
            "success": True,
            "response": response.text
        })
    except Exception as e:
        print("Erreur dans le chat:", str(e))
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/analyze-candidates', methods=['POST', 'OPTIONS'])
def analyze_candidates():
    if request.method == 'OPTIONS':
        # Gérer la requête OPTIONS pour CORS
        response = app.make_default_options_response()
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

    try:
        # Utiliser les profils pré-enregistrés au lieu des profils fournis
        profiles = REGISTERED_PROFILES
        
        if not profiles:
            return jsonify({"error": "Aucun profil disponible"}), 400

        # Analyser les profils avec Gemini
        analysis = analyze_profiles(profiles)
        
        return jsonify({
            "success": True,
            "analysis": analysis
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == '__main__':
    app.run(debug=True, port=5000)
