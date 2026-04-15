//===============================================================================//
//=================================CONFIGURATION=================================//
//===============================================================================//
const CLE_API = "MotDePasseSecret123";
const FORMS_ID = "GAcq9M6HUEm7UwTL1_9iyU-EhTH0AWRIqNthZ4jF8b9URVM1UDJEWUxWU0FNQ0g5UFJYOEk0SDI1Ui4u"; 

const MAGASINS = {
    'MAG000': { nom: 'Magasin Test' },
    'MAG001': { nom: 'Magasin Test1' }
};


//==============================================================================//
//====================================Page 1====================================//
//==============================================================================//

//----------------------------Récupérer les éléments----------------------------//


const id_mag = document.getElementById("id_mag");
const btnValider = document.getElementById("valider");
const erreurIdInconnu = document.getElementById("erreur_id_inconnu");
const erreurIdVide = document.getElementById("erreur_id_vide");


//----------------------------------Interactions----------------------------------//

if (btnValider && id_mag && erreurIdInconnu && erreurIdVide) {

    // Enlever le message d'erreur lorsqu'une modification est faite dans la barre de ID

    id_mag.addEventListener("input", function() {
        erreurIdInconnu.style.display = "none";
        erreurIdVide.style.display = "none";
    });

    // Fonction de validation quand on clique sur "Valider"

    btnValider.onclick = function() {
        const magasinID = id_mag.value.trim().toUpperCase(); // Récupère l'ID et le met en majuscules
        // Cacher le message d'erreur au cas où il était affiché
        erreurIdInconnu.style.display = "none";   
        erreurIdVide.style.display = "none"; 
        
            
        // Vérifier que l'ID n'est pas vide
        if (!magasinID) {
            erreurIdVide.style.display = "flex";
            return;
        }
            
        // Vérifier que l'ID existe dans le dictionnaire MAGASINS
        if (!MAGASINS[magasinID]) {
            erreurIdInconnu.style.display = "flex";
            return;
            }
            
        // Si tout est OK, sauvegarder l'ID et rediriger vers page 2
        
        localStorage.setItem('magasinID', magasinID);
        window.location.href = 'page2.html';
    };
}

//==============================================================================//
//====================================Page 2====================================//
//==============================================================================//

// Vérifier qu'on est sur la page 2
if (document.getElementById('cms')) {
    
    // Récupérer le magasin de la page 1
    const magasinID = localStorage.getItem('magasinID');
    
    if (!magasinID) {
        alert('Veuillez d\'abord sélectionner un magasin');
        window.location.href = 'index.html';
    }
    
    // Variables globales pour stocker toutes les valeurs
    let cms = "";
    let qte = 1;
    let emplacement = "";
    let ot = "";
    let typeMouvement = "";
    let datePrelevement = "";
    let nomTechnicien = "";
    let commentairesTechnicien = "";

//=============================Récupérer les éléments=============================//


//--------------------------------------cms--------------------------------------//

const btnScanQR = document.getElementById("btnScanQR");
const qrReaderDiv = document.getElementById("qrReader");
const inputCms = document.getElementById("cms");

if (btnScanQR && qrReaderDiv && inputCms) {

    let html5QrCode; // Variable pour stocker l'instance du scanner
    let isScanning = false; // Pour savoir si on est en train de scanner
   
    btnScanQR.onclick = function() {
        
        // Vider l'input ET la variable quand on clique pour rescanner
        inputCms.value = "";
        cms = ""; // ✅ Réinitialiser la variable aussi
        
        if (!isScanning) {
            // ===== DÉMARRER LE SCAN =====
            qrReaderDiv.style.display = 'block';
            btnScanQR.textContent = '🛑 Arrêter le scan';
            isScanning = true;
            
            html5QrCode = new Html5Qrcode("qrReader");
            
            html5QrCode.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 }
                },
                (decodedText) => {
                    // ===== QR CODE DÉTECTÉ =====
                    inputCms.value = decodedText; // Mettre dans l'input
                    cms = inputCms.value;
                    
                    
                    // Arrêter automatiquement le scan
                    html5QrCode.stop().then(() => {
                        qrReaderDiv.style.display = 'none';
                        btnScanQR.textContent = '📷 Scanner QR Code';
                        isScanning = false;
                    }).catch((err) => {
                        console.error("Erreur arrêt scanner:", err);
                    });
                },
                (errorMessage) => {
                    // Erreur pendant le scan (normal)
                }
            ).catch((err) => {
                alert("Erreur caméra : " + err);
                qrReaderDiv.style.display = 'none';
                btnScanQR.textContent = '📷 Scanner QR Code';
                isScanning = false;
            });
            
        } else {
            // ===== ARRÊTER LE SCAN MANUELLEMENT =====
            html5QrCode.stop().then(() => {
                qrReaderDiv.style.display = 'none';
                btnScanQR.textContent = '📷 Scanner QR Code';
                isScanning = false;
            }).catch((err) => {
                console.error("Erreur arrêt scanner:", err);
            });
        }
        
        
    };    

}

//--------------------------------------qte--------------------------------------//

const btnMoins = document.getElementById("btnMoinsQte");
const btnPlus = document.getElementById("btnPlusQte");
const inputQte = document.getElementById("qte");

if (btnMoins && btnPlus && inputQte) {
    
    
    
    btnMoins.onclick = function() {
        if (qte > 1) {
            qte = qte - 1;
            inputQte.value = qte;
        }
    };

    btnPlus.onclick = function() {
        qte = qte + 1;
        inputQte.value = qte;
    };
    
    // ⚠️ EMPÊCHER DE TAPER UN NOMBRE < 1 MANUELLEMENT
    inputQte.addEventListener("input", function() {
        let valeur = parseInt(inputQte.value);
        
        if (isNaN(valeur) || valeur < 1) {
            inputQte.value = 1; // Force à 1 si invalide
            qte = 1;
        } else {
            qte = valeur; // Met à jour la variable
        }
    });
    
    // Empêcher de saisir des caractères non numériques
    inputQte.addEventListener("keypress", function(e) {
        // Autoriser seulement les chiffres (0-9)
        if (e.key < '0' || e.key > '9') {
            e.preventDefault();
        }
    });
}


//----------------------------------emplacement----------------------------------//

const inputEmplacement = document.getElementById("emplacement");

if (inputEmplacement) {
  

    // Mettre à jour la variable à chaque fois qu'on tape dans l'input
    inputEmplacement.addEventListener("input", function() {
        emplacement = inputEmplacement.value;
    });
}

//---------------------------------------ot---------------------------------------//

const inputOT = document.getElementById("ot");

if (inputOT) {


    // Mettre à jour la variable à chaque fois qu'on tape dans l'input
    inputOT.addEventListener("input", function() {
        ot = inputOT.value;
    });
}
//----------------------------------typeMouvement----------------------------------//

const selectTypeMouvement = document.getElementById("typeMouvement");

if (selectTypeMouvement) {


    // Mettre à jour la variable quand on sélectionne une option
    selectTypeMouvement.addEventListener("change", function() {
        typeMouvement = selectTypeMouvement.value;
    });
}

//---------------------------------datePrelevement---------------------------------//

const inputDate = document.getElementById("datePrelevement");

if (inputDate) {

    
    // Mettre la date d'aujourd'hui par défaut
    const aujourd_hui = new Date();
    const annee = aujourd_hui.getFullYear();
    const mois = String(aujourd_hui.getMonth() + 1).padStart(2, '0');
    const jour = String(aujourd_hui.getDate()).padStart(2, '0');
    
    inputDate.value = `${annee}-${mois}-${jour}`; // Format AAAA-MM-JJ (requis par input type="date")
    datePrelevement = inputDate.value;
    
    // Empêcher de sélectionner une date dans le futur
    inputDate.max = `${annee}-${mois}-${jour}`; // Date max = aujourd'hui

    // Mettre à jour la variable quand on change la date
    inputDate.addEventListener("change", function() {
        datePrelevement = inputDate.value;
        console.log("📅 Date sélectionnée:", datePrelevement);
    });
}

//----------------------------------nomTechnicien----------------------------------//

const inputNom = document.getElementById("nomTechnicien");

if (inputNom) {


    // Mettre à jour la variable à chaque fois qu'on tape dans l'input
    inputNom.addEventListener("input", function() {
        nomTechnicien = inputNom.value;
    });
}

//------------------------------commentairesTechnicien------------------------------//

const inputCommentaires = document.getElementById("commentairesTechnicien");

if (inputCommentaires) {


    // Mettre à jour la variable à chaque fois qu'on tape dans l'input
    inputCommentaires.addEventListener("input", function() {
        commentairesTechnicien = inputCommentaires.value;
    });
}




//==============================================================================//
//============================ENVOI DU FORMULAIRE===============================//
//==============================================================================//

const btnEnregistrer = document.getElementById("btnEnregistrer");

if (btnEnregistrer) {
    btnEnregistrer.onclick = async function() {
        
        // Vérifier que tous les champs obligatoires sont remplis
        if (!cms) {
            alert("❌ Veuillez scanner un article");
            return;
        }
        if (!emplacement) {
            alert("❌ Veuillez renseigner l'emplacement");
            return;
        }
        if (!ot) {
            alert("❌ Veuillez renseigner l'OT");
            return;
        }
        if (!typeMouvement) {
            alert("❌ Veuillez sélectionner le type de mouvement");
            return;
        }
        if (!datePrelevement) {
            alert("❌ Veuillez sélectionner la date");
            return;
        }
        if (!nomTechnicien) {
            alert("❌ Veuillez renseigner le nom du technicien");
            return;
        }
        
        // Préparer les données
        const data = {
            cleAPI: CLE_API,
            idMagasin: magasinID,
            cms: cms,
            qte: qte.toString(),
            emplacement: emplacement,
            ot: ot,
            typeMouvement: typeMouvement,
            datePrelevement: datePrelevement,
            nomTechnicien: nomTechnicien,
            commentairesTechnicien: commentairesTechnicien
        };
        
        console.log("📤 Données à envoyer:", data);
        
        // Envoyer au formulaire Forms
        try {
            await soumettreFormsInvisible(data);
            alert("✅ Stock enregistré avec succès !");
            
            // Réinitialiser le formulaire (optionnel)
            window.location.reload(); // Recharge la page
            
        } catch (error) {
            alert("❌ Erreur lors de l'enregistrement : " + error.message);
        }
    };
}

//==============================================================================//
//==========================FONCTION SOUMETTRE FORMS============================//
//==============================================================================//

async function soumettreFormsInvisible(data) {
    return new Promise((resolve, reject) => {
        // Construire l'URL du formulaire avec les données pré-remplies
        const baseURL = `https://forms.office.com/Pages/ResponsePage.aspx?id=${FORMS_ID}`;
        
        // Microsoft Forms utilise r1, r2, r3... pour pré-remplir (ordre des questions)
        const params = new URLSearchParams({
            'r1': data.cleAPI,              // Question 1
            'r2': data.idMagasin,           // Question 2
            'r3': data.cms,                 // Question 3
            'r4': data.qte,                 // Question 4
            'r5': data.emplacement,         // Question 5
            'r6': data.ot,                  // Question 6
            'r7': data.typeMouvement,       // Question 7
            'r8': data.datePrelevement,     // Question 8
            'r9': data.nomTechnicien,       // Question 9
            'r10': data.commentairesTechnicien // Question 10
        });
        
        const finalURL = `${baseURL}&${params.toString()}`;
        
        // Créer un iframe invisible pour soumettre
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = finalURL;
        
        // Quand l'iframe charge (Forms reçu)
        iframe.onload = function() {
            setTimeout(() => {
                document.body.removeChild(iframe);
                resolve();
            }, 2000); // Attendre 2 secondes pour que Forms soit vraiment soumis
        };
        
        iframe.onerror = function() {
            document.body.removeChild(iframe);
            reject(new Error('Erreur lors de la soumission'));
        };
        
        document.body.appendChild(iframe);
    });
}

} // ← Fermeture du if (document.getElementById('cms'))
