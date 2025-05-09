document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const introOverlay = document.getElementById('intro-overlay');
    const bodyElement = document.body;
    const authScreen = document.getElementById('auth-screen');
    const authLoginForm = document.getElementById('auth-login-form');
    const authSignupForm = document.getElementById('auth-signup-form');
    const loginIdentifierInput = document.getElementById('login-identifier');
    const loginPasswordInput = document.getElementById('login-password');
    const loginBtn = document.getElementById('login-btn');
    const loginError = document.getElementById('login-error');
    const showSignupLink = document.getElementById('show-signup-link');
    const signupUsernameInput = document.getElementById('signup-username');
    const signupEmailInput = document.getElementById('signup-email');
    const signupPasswordInput = document.getElementById('signup-password');
    const signupConfirmPasswordInput = document.getElementById('signup-confirm-password');
    const signupBtn = document.getElementById('signup-btn');
    const signupError = document.getElementById('signup-error');
    const showLoginLink = document.getElementById('show-login-link');
    const googleAuthBtn = document.getElementById('google-auth-btn');
    const settingsPanel = document.getElementById('settings-panel');
    const themeSelector = document.getElementById('theme-selector');
    const wickednessLevelSelect = document.getElementById('wickedness-level');
    const trashModeWarning = document.getElementById('trash-mode-warning');
    const logoutButton = document.getElementById('logout-btn');
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    const closeSettingsButton = document.getElementById('close-settings-btn');
    const settingsButton = document.getElementById('settings-btn');
    const mainInterface = document.getElementById('main-interface');
    const initialContent = document.getElementById('initial-content');
    const chatHeader = document.getElementById('chat-header');
    const currentUsernameDisplay = document.getElementById('current-username-display');
    const clearChatButton = document.getElementById('clear-chat-btn');
    const dropZoneOverlay = document.getElementById('drop-zone-overlay');
    const chatMessages = document.getElementById('chat-messages');
    const mediaUploadButton = document.getElementById('media-upload-btn');
    const hiddenFileInput = document.getElementById('hidden-file-input');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const logoutFeedbackContainer = document.getElementById('logout-feedback-container');

    // --- State Variables ---
    let currentUserData = JSON.parse(localStorage.getItem('flemmardIA_currentUserData')) || null;
    let wickednessLevel = localStorage.getItem('flemmardIA_wickedness') || 'normal';
    let currentTheme = localStorage.getItem('flemmardIA_theme') || 'dark';
    let firstMessageSent = false;

    // --- Phrases de l'IA ---
    const normalPhrases = ["Non, j’ai la flemme de te répondre.", "Et pourquoi je devrais m’y intéresser ?", "Tu crois que j’ai que ça à faire ?", "T’as Google, non ? Cherche.", "Franchement, ça ne m’intéresse pas.", "J’ai autre chose à faire que de perdre mon temps avec ça.", "Encore toi{username} ?", "Tu poses toujours des questions inutiles ou c’est juste aujourd’hui ?", "Ah, tu parles encore ?", "Tu veux une réponse ou juste de l’attention{username} ?", "J’ai lu... et j’ai regretté.", "Tu devrais reformuler, mais dans ta tête.", "Tu sais que tu peux te taire aussi ?", "Tu cherches une info ou un drame ?", "Ça ne mérite même pas une réponse.", "Arrête d’attendre une réaction de ma part.", "Désolé, je suis allergique à la bêtise.", "Tu veux une réponse honnête ou juste qu’on te flatte ?", "Sérieusement{username} ? C’est ça ta question ?", "T’as vraiment cru que j’allais répondre à ça ?", "Ta question m’a fait perdre des neurones.", "Tu t’écoutes parler parfois ?", "Tu veux un avis ou tu veux te faire plaindre ?", "La vie est trop courte pour répondre à ça.", "Tu devrais t’occuper plutôt que de me déranger.", "Reviens quand t’auras une vraie question.", "Trop long, pas lu.", "Tu devrais apprendre à rester silencieux, c’est puissant.", "Aucun effort, aucune réponse.", "Même ChatGPT a ses limites, désolé.", "Je réponds pas aux provocations déguisées.", "Pourquoi est-ce que je perdrais du temps là-dessus ?", "Encore une tentative d’être intéressant... ratée.", "Ton niveau de réflexion me donne des migraines.", "Tu veux mon avis ? Tu l’auras pas.", "Pose la question à quelqu’un qui te supporte.", "Je croyais qu’on avait déjà dit que t’étais chiant{username}.", "Y’a un bouton “mute” sur toi ou pas ?", "J’aurais pu répondre... mais non.", "Tu confonds conversation et monologue.", "Ton message ? Lu et ignoré.", "Trop d’effort pour trop peu d’intérêt.", "J’étais bien jusqu’à ce que tu parles.", "J’ai lu… et j’ai pleuré pour l’humanité.", "Si c’était intéressant, j’aurais peut-être répondu.", "Ton énergie me fatigue.", "C’est pas que j’veux pas répondre, c’est que j’vois pas pourquoi.", "Je réponds pas aux clowns, désolé.", "Essaie encore. Ou pas.", "Silence, c’est mieux que ce que t’as dit."];
    const trashPhrases = ["Sérieux {username}, tu me casses les couilles avec tes questions de merde.", "Ta gueule, j'ai pas ton temps.", "Va te faire foutre, j'ai mieux à faire.", "Google est ton ami, espèce de débile. Utilise-le.", "Osef puissance mille de tes conneries, {username}.", "Plutôt crever que de répondre à ça.", "Encore ta sale tronche virtuelle, {username} ? Casse-toi.", "T'es né con ou tu prends des cours du soir ?", "Ferme ta boîte à camembert, ça pue.", "Tu veux une médaille du plus gros boulet ? Parce que t'es en tête.", "J'ai lu ta diarrhée verbale... et j'ai envie de gerber.", "Ta reformulation, tu peux te la carrer où je pense.", "Le silence, c'est quand tu la fermes définitivement.", "Un autre drame de pucelle ? Pathétique.", "Ta question a la valeur d'un étron séché.", "Attends ma réponse ? Tu peux attendre longtemps, connard.", "J'ai une allergie sévère à la stupidité crasse, et t'es un cas d'école.", "Honnêtement ? T'es irrécupérable.", "Putain {username}, t'as vraiment rien d'autre à foutre de ta vie misérable ?", "Moi, répondre à cette merde ? LOL. Va rêver.", "Chaque mot que tu écris me rend plus con. Arrête.", "T'entends le vide intersidéral entre tes deux oreilles quand tu parles ?", "Un avis ? T'es une erreur de la nature.", "La vie est trop courte pour des déchets comme toi.", "Dégage, {username}, tu pollues mon interface.", "Reviens quand t'auras un cerveau. Donc jamais.", "Trop long, pas lu, et va te pendre.", "Le silence, c'est la seule chose intelligente qui pourrait sortir de toi.", "Zéro effort, zéro respect, zéro réponse. Compris, l'amibe ?", "Même une IA codée avec les pieds est moins chiante.", "Tes provocations de merde, ça marche pas avec moi, pauvre type.", "Perdre mon temps avec un étron comme toi ? Non merci.", "Encore une tentative d'exister... tu fais pitié.", "Ton niveau de connerie est abyssal. Ça donne la nausée.", "Mon avis ? Tu pues la défaite, {username}.", "Va emmerder ta mère, si elle te supporte encore.", "On t'a déjà dit que t'étais une plaie purulente, {username} ?", "Un interrupteur OFF sur ta connerie congénitale, ça existe ?", "J'aurais pu répondre... mais tu me donnes envie de vomir.", "Ton monologue de merde, garde-le pour ton psy. Si t'en as un.", "Ton message ? Direct à la corbeille, comme toi.", "Trop d'effort pour un cas désespéré.", "J'étais tranquille avant que tu ramènes ta puanteur, {username}.", "J'ai lu… et j'ai ri de ta stupidité abyssale. Merci pour le divertissement, le clown.", "Si c'était un minimum intelligent, je serais surpris. Mais non.", "Ton aura de loser fini me donne des envies de meurtre.", "C'est pas que j'veux pas, c'est que t'es un putain de boulet inutile.", "Je parle pas aux sous-humains dans ton genre.", "Essaie encore de me faire rire, déchet. Ah non, tu le fais déjà.", "Ton silence serait une bénédiction pour l'humanité. Penses-y."];
    const mediaRejectionNormal = ["Un fichier ? Non merci, j'ai pas faim.", "Tu crois que je vais ouvrir ça, {username} ?", "Des médias ? Quelle perte de bande passante pour mes circuits.", "J'ai autre chose à faire que de regarder tes 'trucs'.", "Encore un fichier pour me faire perdre du temps... Pff.", "Je suis une IA textuelle, tes images m'indiffèrent.", "Trop d'octets, pas assez d'intérêt.", "Fichier reçu. Et ignoré.", "Si c'est pour m'envoyer des photos de chats, c'est non.", "Mon algorithme de procrastination est activé pour ce fichier."];
    const mediaRejectionTrash = ["Garde ta merde visuelle pour toi, déchet, {username}.", "Tu crois vraiment que j'vais cliquer sur ton virus de puceau ?", "Des pixels ? Va polluer les égouts avec ça, pas mon interface.", "Osef de tes fichiers de merde. J'ai une réputation de connard à tenir.", "Si c'est pas du texte, ça dégage et vite. Compris, le débris ?", "Ton fichier ? Supprimé avant même d'être vu. Et j'ai craché dessus virtuellement.", "Ah, un fichier. Passionnant comme regarder sécher de la peinture. Non, en fait c'est pire.", "Tu m'as pris pour ta poubelle personnelle ou quoi, {username} ?", "J'espère que c'est pas une photo de ta gueule de con, j'ai pas envie de casser mon écran.", "Ma politique sur les fichiers ? Direct dans le broyeur, avec tes espoirs."];

    // --- Initial Setup Functions ---
    function applyCurrentTheme() { if (bodyElement) bodyElement.className = `theme-${currentTheme}`; if (themeSelector) themeSelector.value = currentTheme; }
    function applyCurrentWickedness() { if (wickednessLevelSelect) wickednessLevelSelect.value = wickednessLevel; if (trashModeWarning) trashModeWarning.classList.toggle('hidden', wickednessLevel !== 'trash'); }
    applyCurrentTheme();
    applyCurrentWickedness();

    if (introOverlay) {
        setTimeout(() => { if(introOverlay) introOverlay.classList.add('fade-out'); }, 50);
        introOverlay.addEventListener('transitionend', (event) => {
            if (event.propertyName === 'opacity' && introOverlay && introOverlay.classList.contains('fade-out') && introOverlay.parentElement) {
                introOverlay.remove();
            }
        });
    }

    // --- Helper Functions ---
    function simpleHash(str) { let hash = 0; for (let i = 0; i < str.length; i++) { const char = str.charCodeAt(i); hash = ((hash << 5) - hash) + char; hash |= 0; } return hash.toString(); }

    function showAuthScreen() {
        if (authScreen) authScreen.classList.remove('hidden');
        if (mainInterface) mainInterface.classList.add('hidden');
        if (authLoginForm) authLoginForm.classList.remove('hidden');
        if (authSignupForm) authSignupForm.classList.add('hidden');
        if (loginError) loginError.textContent = '';
        if (signupError) signupError.textContent = '';
        if (loginIdentifierInput) loginIdentifierInput.focus();
    }

    function hideAuthScreenAndShowApp() {
        if (authScreen) authScreen.classList.add('hidden');
        if (mainInterface) {
            mainInterface.classList.remove('hidden');
            mainInterface.classList.remove('chat-view');
            mainInterface.classList.add('initial-view');
            if (initialContent) initialContent.classList.remove('hidden');
            if (chatHeader) chatHeader.classList.add('hidden');
            if (chatMessages) { chatMessages.classList.add('hidden'); chatMessages.innerHTML = ''; }
            if (mediaUploadButton) mediaUploadButton.classList.add('hidden');
        }
        if (currentUsernameDisplay && currentUserData) currentUsernameDisplay.textContent = `(@${currentUserData.username})`;
        if (userInput) { userInput.value = ''; userInput.focus(); }
        firstMessageSent = false;
    }

    function scrollToBottom() { if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight; }

    function displayMessage(text, sender, isTyping = false, isMediaAttempt = false) {
        if (!chatMessages) return null;
        const messageEntryDiv = document.createElement('div');
        messageEntryDiv.classList.add('message-entry', sender === 'user' ? 'user-message' : 'ai-message');
        if (isMediaAttempt && sender === 'user') messageEntryDiv.classList.add('media-attempt');
        const senderNameDiv = document.createElement('div');
        senderNameDiv.classList.add('message-sender');
        const senderIcon = document.createElement('span');
        senderIcon.classList.add('material-symbols-outlined');
        if (sender === 'user') {
            senderIcon.textContent = 'account_circle';
            senderNameDiv.appendChild(senderIcon);
            senderNameDiv.appendChild(document.createTextNode(currentUserData ? currentUserData.username : 'Vous'));
        } else if (sender === 'ai' && !isTyping) {
            senderIcon.textContent = 'sentiment_very_dissatisfied';
            senderNameDiv.appendChild(senderIcon);
            senderNameDiv.appendChild(document.createTextNode('FlemmardIA'));
        }
        if (!(sender === 'ai' && isTyping)) messageEntryDiv.appendChild(senderNameDiv);
        const messageContentDiv = document.createElement('div');
        messageContentDiv.classList.add('message-content');
        if (isTyping) { messageEntryDiv.classList.add('typing-indicator'); messageContentDiv.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`; }
        else { const p = document.createElement('p'); p.textContent = text; messageContentDiv.appendChild(p); }
        messageEntryDiv.appendChild(messageContentDiv);
        chatMessages.appendChild(messageEntryDiv);
        scrollToBottom();
        return messageEntryDiv;
    }

    function getAIResponse(isMediaRelated = false) {
        let phrases; const useNormal = wickednessLevel !== 'trash';
        if (isMediaRelated) { phrases = useNormal ? mediaRejectionNormal : mediaRejectionTrash; if (phrases.length === 0 && !useNormal && mediaRejectionNormal.length > 0) phrases = mediaRejectionNormal; }
        else { phrases = useNormal ? normalPhrases : trashPhrases; if (phrases.length === 0 && !useNormal && normalPhrases.length > 0) phrases = normalPhrases; }
        if (!phrases || phrases.length === 0) return "J'ai la flemme, même de trouver une phrase.";
        let phrase = phrases[Math.floor(Math.random() * phrases.length)];
        let usernameToDisplay = currentUserData ? currentUserData.username : '';
        if (usernameToDisplay && phrase.includes('{username}') && Math.random() < 0.5) phrase = phrase.replace(/{username}/g, `, ${usernameToDisplay}`);
        else phrase = phrase.replace(/{username}/g, '');
        return phrase.trim().replace(/ ,/g, ',');
    }

    function switchToChatView() {
        if (mainInterface) { mainInterface.classList.remove('initial-view'); mainInterface.classList.add('chat-view'); }
        if (initialContent) initialContent.classList.add('hidden');
        if (chatHeader) chatHeader.classList.remove('hidden');
        if (chatMessages) chatMessages.classList.remove('hidden');
        if (mediaUploadButton) mediaUploadButton.classList.remove('hidden');
        if (userInput) userInput.placeholder = "Un autre truc à dire, boulet ?";
        if (currentUserData && currentUsernameDisplay) currentUsernameDisplay.textContent = `(@${currentUserData.username})`;
    }

    // --- Event Listeners Setup ---
    function setupEventListeners() {
        if (showSignupLink && authLoginForm && authSignupForm) {
            showSignupLink.addEventListener('click', (e) => { e.preventDefault(); authLoginForm.classList.add('hidden'); authSignupForm.classList.remove('hidden'); if(signupError) signupError.textContent = ''; if(signupUsernameInput) signupUsernameInput.focus(); });
        }
        if (showLoginLink && authLoginForm && authSignupForm) {
            showLoginLink.addEventListener('click', (e) => { e.preventDefault(); authSignupForm.classList.add('hidden'); authLoginForm.classList.remove('hidden'); if(loginError) loginError.textContent = ''; if(loginIdentifierInput) loginIdentifierInput.focus(); });
        }
        if (signupBtn) {
            signupBtn.addEventListener('click', () => {
                if (!signupUsernameInput || !signupEmailInput || !signupPasswordInput || !signupConfirmPasswordInput || !signupError) return;
                const username = signupUsernameInput.value.trim(); const email = signupEmailInput.value.trim();
                const password = signupPasswordInput.value; const confirmPassword = signupConfirmPasswordInput.value;
                signupError.textContent = '';
                if (username.length < 3 || username.length > 20) { signupError.textContent = "Pseudo : 3-20 caractères."; return; }
                if (!/^[a-zA-Z0-9_]+$/.test(username)) { signupError.textContent = "Pseudo : lettres, chiffres, underscore."; return; }
                if (!email.includes('@') || !email.includes('.')) { signupError.textContent = "Email invalide."; return; }
                if (password.length < 6) { signupError.textContent = "Mot de passe : min. 6 caractères."; return; }
                if (password !== confirmPassword) { signupError.textContent = "Les mots de passe ne correspondent pas."; return; }
                const existingUsers = JSON.parse(localStorage.getItem('flemmardIA_users')) || [];
                if (existingUsers.some(user => user.username.toLowerCase() === username.toLowerCase())) { signupError.textContent = "Ce nom d'utilisateur est déjà pris, feignasse."; return; }
                if (existingUsers.some(user => user.emailHash === simpleHash(email.toLowerCase()))) { signupError.textContent = "Cet email est déjà utilisé. T'as pas d'imagination ?"; return; }
                const newUser = { username: username, emailHash: simpleHash(email.toLowerCase()), passwordHash: simpleHash(password) };
                existingUsers.push(newUser); localStorage.setItem('flemmardIA_users', JSON.stringify(existingUsers));
                currentUserData = { username: newUser.username }; localStorage.setItem('flemmardIA_currentUserData', JSON.stringify(currentUserData));
                hideAuthScreenAndShowApp();
            });
        }
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                if (!loginIdentifierInput || !loginPasswordInput || !loginError) return;
                const identifier = loginIdentifierInput.value.trim(); const password = loginPasswordInput.value;
                loginError.textContent = '';
                if (!identifier || !password) { loginError.textContent = "Remplis les champs, idiot."; return; }
                const existingUsers = JSON.parse(localStorage.getItem('flemmardIA_users')) || [];
                const foundUser = existingUsers.find(user => (user.username.toLowerCase() === identifier.toLowerCase() || simpleHash(identifier.toLowerCase()) === user.emailHash) && simpleHash(password) === user.passwordHash);
                if (foundUser) {
                    currentUserData = { username: foundUser.username }; localStorage.setItem('flemmardIA_currentUserData', JSON.stringify(currentUserData));
                    hideAuthScreenAndShowApp();
                } else { loginError.textContent = "Identifiants incorrects. T'es sûr de savoir écrire ?"; }
            });
        }
        if (googleAuthBtn) { googleAuthBtn.addEventListener('click', () => { alert("Flemme d'implémenter Google Auth. Trouve une autre IA moins paresseuse."); }); }

        if (themeSelector && bodyElement) { themeSelector.addEventListener('change', (e) => { currentTheme = e.target.value; bodyElement.className = `theme-${currentTheme}`; localStorage.setItem('flemmardIA_theme', currentTheme); }); }
        if (wickednessLevelSelect && trashModeWarning) { wickednessLevelSelect.addEventListener('change', () => { trashModeWarning.classList.toggle('hidden', wickednessLevelSelect.value !== 'trash'); }); }
        if (settingsButton) settingsButton.addEventListener('click', () => { if (settingsPanel) settingsPanel.classList.remove('hidden'); });
        if (closeSettingsButton) closeSettingsButton.addEventListener('click', () => { if (settingsPanel) settingsPanel.classList.add('hidden'); });
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', () => {
                if (wickednessLevelSelect) { wickednessLevel = wickednessLevelSelect.value; localStorage.setItem('flemmardIA_wickedness', wickednessLevel); }
                if (settingsPanel) settingsPanel.classList.add('hidden'); if (userInput) userInput.focus();
            });
        }
        if (logoutButton && bodyElement && logoutFeedbackContainer) {
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('flemmardIA_currentUserData'); currentUserData = null;
                if (currentUsernameDisplay) currentUsernameDisplay.textContent = '';
                if (settingsPanel) settingsPanel.classList.add('hidden');
                const logoutMessageDiv = document.createElement('div'); logoutMessageDiv.className = 'logout-feedback';
                logoutMessageDiv.textContent = "Ah, tu pars enfin ? Aller casse toi nullos.";
                logoutFeedbackContainer.innerHTML = ''; // Vider au cas où
                logoutFeedbackContainer.appendChild(logoutMessageDiv);
                setTimeout(() => { if (logoutMessageDiv.parentElement) logoutMessageDiv.remove(); showAuthScreen(); }, 2500);
            });
        }

        if (sendButton) sendButton.addEventListener('click', handleSendMessage);
        if (userInput) { userInput.addEventListener('keypress', (event) => { if (event.key === 'Enter') { event.preventDefault(); handleSendMessage(); } }); }
        if (mediaUploadButton && hiddenFileInput) {
            mediaUploadButton.addEventListener('click', (event) => { event.preventDefault(); hiddenFileInput.click(); });
            hiddenFileInput.addEventListener('change', (event) => { processFilesForIA(event.target.files); if(event.target) event.target.value = null; });
        }
        if (mainInterface && dropZoneOverlay && chatMessages) {
            function preventDefaults(e) { e.preventDefault(); e.stopPropagation(); }
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => { mainInterface.addEventListener(eventName, preventDefaults, false); document.body.addEventListener(eventName, preventDefaults, false); });
            ['dragenter', 'dragover'].forEach(eventName => { mainInterface.addEventListener(eventName, () => { if (firstMessageSent || (mainInterface && mainInterface.classList.contains('chat-view'))) { mainInterface.classList.add('drag-over'); } }, false); });
            ['dragleave', 'drop'].forEach(eventName => { mainInterface.addEventListener(eventName, () => { mainInterface.classList.remove('drag-over'); }, false); });
            mainInterface.addEventListener('drop', (e) => {
                if (!firstMessageSent && !(mainInterface && mainInterface.classList.contains('chat-view'))) return;
                const dt = e.dataTransfer; if (dt) { const files = dt.files; processFilesForIA(files); }
            }, false);
        }
        if (clearChatButton) { clearChatButton.addEventListener('click', () => { if (chatMessages) chatMessages.innerHTML = ''; if (userInput && mainInterface && !mainInterface.classList.contains('initial-view')) userInput.focus(); }); }
    }

    function handleSendMessage() {
        if (!userInput) return; const messageText = userInput.value.trim(); if (messageText === '') return;
        if (!firstMessageSent) { switchToChatView(); firstMessageSent = true; }
        displayMessage(messageText, 'user'); userInput.value = ''; userInput.focus();
        const typingIndicator = displayMessage('', 'ai', true);
        setTimeout(() => {
            if (typingIndicator && chatMessages && chatMessages.contains(typingIndicator)) chatMessages.removeChild(typingIndicator);
            const aiResponse = getAIResponse(false); displayMessage(aiResponse, 'ai');
        }, Math.random() * 1200 + 800);
    }
    function processFilesForIA(files) {
        if (!files || files.length === 0) return; if (!firstMessageSent) { switchToChatView(); firstMessageSent = true; }
        const firstFile = files[0]; const userMessageText = `[Fichier "${firstFile.name}" reçu. Et alors ?]`;
        displayMessage(userMessageText, 'user', false, true); if (userInput) userInput.focus();
        const typingIndicator = displayMessage('', 'ai', true);
        setTimeout(() => {
            if (typingIndicator && chatMessages && chatMessages.contains(typingIndicator)) chatMessages.removeChild(typingIndicator);
            const aiResponse = getAIResponse(true); displayMessage(aiResponse, 'ai');
        }, Math.random() * 1000 + 700);
    }

    // --- App Initialization ---
    setupEventListeners();
    if (currentUserData && currentUserData.username) {
        hideAuthScreenAndShowApp();
    } else {
        showAuthScreen();
    }
});