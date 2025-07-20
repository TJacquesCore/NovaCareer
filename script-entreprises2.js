function posterOffre() {
  // Créer le popup avec une animation d'entrée
  const popup = document.createElement('div');
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

  // Ajout du style d'animation dans le head
  const style = document.createElement('style');
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
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-20px); }
      60% { transform: translateY(-10px); }
    }
  `;
  document.head.appendChild(style);

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
    <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
      <div style="flex: 1; animation: fadeIn 0.5s 0.6s forwards;">
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #555;">Localisation</label>
        <input type="text" value="Paris (Hybride)" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;" readonly>
      </div>
      <div style="flex: 1; animation: fadeIn 0.5s 0.7s forwards;">
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

    popupContent.style.animation = 'fadeIn 0.3s reverse forwards';
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
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fadeIn {
      to { opacity: 1; }
    }
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-20px); }
      60% { transform: translateY(-10px); }
    }
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);

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
