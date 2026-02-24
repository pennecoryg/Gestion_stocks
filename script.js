//===============================================================================//
//=================================CONFIGURATION=================================//
//===============================================================================//
const CLE_API = "MotDePasseSecret123";
const FORMS_ID = "GAcq9M6HUEm7UwTL1_9iyU-EhTH0AWRIqNthZ4jF8b9URVM1UDJEWUxWU0FNQ0g5UFJYOEk0SDI1Ui4u"; 

const MAGASINS = {
    'MAG000': { nom: 'Magasin Test' },
    'MAG001': { nom: 'Airbus ATLANTIC Méaulte' },
    'MAG002': { nom: 'Airbus ATLANTIC Rochefort' }
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


//==============================================================================//
//====================================Page 2====================================//
//==============================================================================//


//=============================Récupérer les éléments=============================//


//--------------------------------------cms--------------------------------------//

const btnScanQR = document.getElementById("btnScanQR");
const qrReaderDiv = document.getElementById("qrReader");
const inputCms = document.getElementById("cms");

let html5QrCode; // Variable pour stocker l'instance du scanner
let isScanning = false; // Pour savoir si on est en train de scanner

btnScanQR.onclick = function() {
    if (!isScanning) {
        // ===== DÉMARRER LE SCAN =====
        qrReaderDiv.style.display = 'block'; // Afficher la zone de scan
        btnScanQR.textContent = '🛑 Arrêter le scan'; // Changer le texte du bouton
        isScanning = true;
        
        html5QrCode = new Html5Qrcode("qrReader"); // Créer le scanner
        
        html5QrCode.start(
            { facingMode: "environment" }, // Utiliser la caméra arrière du téléphone
            {
                fps: 10, // 10 images par seconde
                qrbox: { width: 250, height: 250 } // Taille de la zone de scan
            },
            (decodedText) => {
                // ===== QR CODE DÉTECTÉ =====
                inputCms.value = decodedText; // Mettre le numéro dans le champ
                
                // Arrêter automatiquement le scan
                html5QrCode.stop().then(() => {
                    qrReaderDiv.style.display = 'none'; // Cacher la zone de scan
                    btnScanQR.textContent = '📷 Scanner QR Code'; // Remettre le texte du bouton
                    isScanning = false;
                }).catch((err) => {
                    console.error("Erreur arrêt scanner:", err);
                });
            },
            (errorMessage) => {
                // Erreur pendant le scan (normal, ça scanne en continu)
                // On ne fait rien ici
            }
        ).catch((err) => {
            // ===== ERREUR DE DÉMARRAGE (caméra refusée, etc.) =====
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

//--------------------------------------qte--------------------------------------//


//----------------------------------emplacement----------------------------------//


//---------------------------------------ot---------------------------------------//


//----------------------------------typeMouvement----------------------------------//


//---------------------------------datePrelevement---------------------------------//


//----------------------------------nomTechnicien----------------------------------//


//------------------------------commentairesTechnicien------------------------------//





