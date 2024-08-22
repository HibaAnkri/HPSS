DROP TABLE IF EXISTS tags;
CREATE TABLE tags (
                      id SERIAL PRIMARY KEY,
                      element_number INTEGER,
                      tag VARCHAR(10),
                      nom VARCHAR(255),
                      longueur VARCHAR(50),
                      format VARCHAR(50),
                      description TEXT,
                      nomprotocole VARCHAR(10)
);
INSERT INTO tags (element_number, tag, nom, longueur, format, description, nomprotocole) VALUES
                                                                                             (48, 'P10', NULL, '016', NULL, 'Clé MAC.
Élément contenant la valeur de la clé de calcul de la valeur d’authentification du message à prendre en compte au cours de la session', 'HSID'),
                                                                                             (48, 'P16', NULL, '032', NULL, 'Clé d’encryption du PIN.
Élément contenant la valeur de la clé de transport du code confidentiel
entre le CENTRE et le membre à prendre en compte au cours de la session.', 'HSID'),
                                                                                             (48, 'P48', NULL, '001', NULL, 'TCC. Élément contenant le « Transaction Category Code » qui peut être utilisé par le système de
l’émetteur pour traiter l’autorisation.', 'HSID'),
                                                                                             (48, 'P87', NULL, '001', NULL, 'Résultat de la vérification externe du CVV/CVV2.
 ‘ ‘ :
CVV/CVV2 non vérifié
 1 : CVV/CVV2 incorrect
 2 : CVV/CVV2 correct Résultat de la vérification externe du CVV3.
 E : Longueur invalide
 P : Ne pouvait pas être validé
 Y : Non valide', 'HSID'),
                                                                                             (48, 'P88', NULL, '001', NULL, 'Résultat de l’authentification de la carte.
 ‘ ‘ :
ARQC non vérifié
 1 : ARQC incorrect
 2 : ARQC correct', 'HSID'),
                                                                                             (48, 'P92', NULL, '003', NULL, 'CVC2 Élément contenant le CVC2 pour les demandes d’autorisation manuelles.', 'HSID'),
                                                                                             (48, 'P95', NULL, '002', NULL, '‘01’=Visa
 ‘02’=MasterCard
 ‘03’=American Express
 ‘04’=Diners Club
 ‘05’=JCB ‘21’=CENTRE', 'HSID'),
                                                                                             (48, 'P31', NULL, '004', NULL, 'Message reason code', 'HSID'),
                                                                                             (48, 'P32', NULL, '001', NULL, 'Code Usage.
Ce code est pour distinguer le chargeback de la representation
 ‘1’ :
Chargeback
 ‘2’ : Représentation', 'HSID'),
                                                                                             (48, 'P33', NULL, '001', NULL, 'Indicateur de documentation
 Ce champ indique le statut de la documentation envoyée
 Espace :
Non applicable
0 : Pas de document fourni
 1 : Documentation envoyée par courier
 2 :ARN invalide utilisée dans le chargeback, aucune documentation n’a été requise ni reçue
 3 : ARN invalide utilisée dans le chargeback, documentation reçue
 4 : Documentation non réçue dans le chargeback envoyé', 'HSID'),
                                                                                             (48, 'P34', NULL, '006', NULL, 'Référence du chargeback
Cette référence est générée par l’émetteur pour des objectifs de contrôle.
Les messages suivant dans le cycle chargeback devraient l’utiliser.', 'HSID'),
                                                                                             (48, 'P35', NULL, '050', NULL, 'Message texte
Ce champ sert à envoyer un message ou bien à
décrire les raisons des
chargebacks/representations à échanger entre
émétteur et acquéreur. ', 'HSID'),
                                                                                             (48, 'P36', NULL, '032', NULL, 'Certificat porteur', 'HSID'),
                                                                                             (48, 'P37', NULL, '032', NULL, 'Certificat commerçant', 'HSID'),
                                                                                             (48, 'P38', NULL, '040', NULL, 'Numéro de séquence de la transaction', 'HSID'),
                                                                                             (48, 'P39', NULL, '040', NULL, 'Transaction Stain
Usage 1 (SET) :
 40 caractères calculés en
applicant un hash algorithme securisé sur le
PDS P38 et une valeur secrete saisie par le
Porteur.
Usage 2 (3D- SECURE TM) :  Ce champ est
utilisé pour les transactions (Three domaine
Secure 3-D Secure). Il contient la valeur du
CAVV (Cardholder Authentication Verification
Value ).
Le format de ce champ est comme suit :
3-D Secure Authentication Results Code   2 Octets
00 : Authentification avec succès.
05 : Authentification n’a pas pu être effectuée.
06 : Erreur systeme ACS
09 : Authentification échouée.
Second Factor Authentication Code   2 Octets
00 : Non présent.
11 : VSDC Cate utilisée, cryptogramme échoué
12 : VSDC Cate utilisée, cryptogramme réussie.
CAVV Key Indicator   2 Octets
01 : CAVV Set de clé 1.
02 : CAVV Set de clé 2.
 CAVV Value 4 Octets
CAVV UnpredictableNumber 4 Octets
authentication tracking number 16 Octets
Réservé 10 Octets', 'HSID'),
                                                                                             (48, 'P40', NULL, '004', NULL, '0002 :
Réseau Visa 0004 : Réseau Plus', 'HSID'),
                                                                                             (48, 'P51', NULL, 'Variable...40 ', NULL, 'On behalf Services
Contient les services faits par MasterCard au
nom de l’émetteur et les résultats. Pour
chaque transaction, P51 peut supporter 10
services. Il correspond au sous champ 71 de
l’élément 48 de l’interface CIS.  ', 'HSID'),
                                                                                             (48, 'P52', NULL, 'Variable…43', NULL, 'PAN Mapping File Information
Contient les informations du compte virtual du
porteur, il est en format TLV et constitué de :

 - Indicateur de compte
 - Numéro de la carte virtuelle du porteur
 - Date d’expiration de la carte virtuelle du
porteur - Produit relatif à la carte virtuelle (optionnel)  ', 'HSID'),
                                                                                             (48, 'P61', NULL, '001', NULL, '0,1,2,6 pour Money send', 'HSID'),
                                                                                             (48, 'P63', NULL, '012', NULL, 'Network Data
Position 1-2 :
Financial network code
Identifies the financial bank card product
associated with the transaction:

MC MasterCard
CI Cirrus®
MS Maestro®
MD MasterCard® debit card
PL Plus®
VI VISA

Position 3 : Interchange rate indicator
0 U.S. and Canada Regions
1 Asia Pacific, Europe, Latin America and the
Caribbean, and Middle East/Africa Regions
2 Intracountry (ISIS)

Position 4-12 : Network reference number
A unique transaction identification number
(switch serial number)
generated (or assigned) by the MDS. ', 'HSID'),
                                                                                             (48, 'P77', NULL, '003', NULL, '0002 :
C07 pour Money send', 'HSID'),
                                                                                             (48, 'P82', NULL, '002', NULL, '52 pour le AVS', 'HSID'),
                                                                                             (48, 'P90', NULL, '999', NULL, 'Données AVS', 'HSID'),
                                                                                             (48, 'R01', NULL, '002', NULL, 'Payment Initiation Channel
00 = Card (par défaut) ', 'HSID'),
                                                                                             (48, 'R02', NULL, '6', NULL, 'BIN (Paiement N fois)', 'HSID'),
                                                                                             (48, 'R03', NULL, '2', NULL, 'Nombre MAX (Paiement N fois)', 'HSID'),
                                                                                             (48, 'R04', NULL, '2', NULL, 'Pourcentage (Paiement N fois)', 'HSID'),
                                                                                             (48, 'R07', NULL, '1', NULL, 'Indicateur de paiement recurrent:
1=Paiement recurrent existant', 'HSID'),
                                                                                             (48, 'R08', NULL, '2', NULL, 'Nombre total des paiements récurrents.', 'HSID'),
                                                                                             (48, 'R09', NULL, '2', NULL, 'Numéro du paiement récurrent. Si le numéro du paiement recurrent est >1 alors le P136 (CVV) ne sera pas envoyé.', 'HSID'),
                                                                                             (48, 'D11', NULL, '001', NULL, 'DCC Tag.
Élément contenant l’indicateur DCC de la
transaction.
Valeur = 1 si la transaction est DCC. ', 'HSID'),
                                                                                             (48, 'D07', NULL, 'Variable ... 12', NULL, 'Montant originale.
Élément contenant le montant original de de
la transaction ', 'HSID'),
                                                                                             (48, 'D08', NULL, '003', NULL, 'Devise originale. Élément contenant la valeur de devise originale de la transaction', 'HSID'),
                                                                                             (48, 'T01', NULL, '013 - 019', 'N', 'Token Number.
Token utilisé pour remplacer le PAN du
titulaire de la carte et est un élément de
données requis pour le traitement de la
transaction Tokenizé. ', 'HSID'),
                                                                                             (48, 'T02', NULL, '002', 'AN', 'Token Assurance Level.
Reserved for future use. This field contains
spaces. ', 'HSID'),
                                                                                             (48, 'T03', NULL, '011', 'N', 'Token Requestor ID.', 'HSID'),
                                                                                             (48, 'T05', NULL, '032', 'AN', 'Token Reference ID.', 'HSID'),
                                                                                             (48, 'T06', NULL, '004', 'N', 'Token Expiration Date.
La date est au format aamm, où aa = année
(00-99) et mm = mois (01-12). ', 'HSID'),
                                                                                             (48, 'T07', NULL, '002', 'AN', 'Token Type. 02 = SE (élément sécurisé).
03 = CBP (paiement basé sur le cloud).
05 = Facilitateur de commerce électronique
06 = pseudo-compte
01 = ECOM/COF (e-commerce/card on file). ', 'HSID'),
                                                                                             (48, 'T08', NULL, '001', 'AN', 'Token Status.
A = Actif pour le paiement
I = Inactif pour le paiement (pas encore actif)
S = temporairement suspendu pour les
paiements
D = Désactivé définitivement pour le paiement ', 'HSID'),
                                                                                             (48, 'T0B', NULL, '032', 'ANS', 'PAN Reference ID.
Identifiant de référence unique généré par
Visa pour le numéro de compte de la carte. ', 'HSID'),
                                                                                             (48, 'T13', NULL, '001', 'AN', 'POS Environment Code
C – Credential on File transaction
R – Recurring transaction
I – Installment transaction ', 'HSID'),
                                                                                             (48, 'T18', NULL, '020', 'B', 'TAVV.
Token Authentication Verification Value
(TAVV) – is used for e-comm token
transactions ', 'HSID'),
                                                                                             (48, 'T19', NULL, '020', 'B', 'TAVV or CAVV.
Cardholder Authentication Verification Value
(CAVV) in e-com transactions with e-com
indicator ‘05’ or ‘06’ ', 'HSID'),
                                                                                             (48, 'T31', NULL, '004', 'N', 'Elapsed Time To Live.
Elapsed time in hours since the current
limited-use key (LUK) is provisioned on the
device. ', 'HSID'),
                                                                                             (48, 'T32', NULL, '003','N', 'Count of Number of Transactions.
Cumulative count of transactions for the
current limited-use key (LUK). ', 'HSID'),
                                                                                             (48, 'T33', NULL, '007', 'N', 'Cumulative Transaction Amount.
Cumulative total of transaction amounts for
the current limited use key (LUK). ', 'HSID'),
                                                                                             (48, 'T45', NULL, '001', 'ANS', 'CVV/iCVV Results Code.
0 - CVV, iCVV ou dCVV n''a pas pu être vérifié
1 - La vérification CVV, iCVV, dCVV ou Online
CAM a échoué, ou l''authentification PIN hors
ligne a été interrompue.
2 - CVV, iCVV, dCVV ou Online CAM ont réussi
la vérification.
3 - sans objet
(Vide) ou absent - CVV, iCVV ou dCVV n''a pas
été vérifié. ', 'HSID'),
                                                                                             (48, 'T48', NULL, '001', 'ANS', 'Card Authentication Results Code.
Le champ 44.8 est un champ Visa Smart
Debit/Credit (VSDC) qui contient un code
défini par Visa pour indiquer les résultats de la
méthode d''authentification de carte en ligne
(CAM). Les résultats de la CAM en ligne sont
également connus sous le nom de résultats de
vérification de cryptogramme en ligne EMV ou
de résultats d''authentification de puce.
1 - Le cryptogramme de demande
d''autorisation (ARQC) a été vérifié mais la vérification a échoué.
2 - L''ARQC a été vérifié et a réussi la
vérification.
Vide ou absent - La CAM en ligne n''a pas été
effectuée, ou une autre situation ou problème
a empêché la vérification. Par exemple,
l''émetteur ne participe pas à la FAO en ligne,
ou une erreur système ou cryptographique
s''est produite ', 'HSID'),
                                                                                             (48, 'T4D', NULL, '001', 'ANS', 'CAVV Results Codes.
Il contient le code de résultat de la valeur de
vérification d''authentification du titulaire de
carte (CAVV) qui identifie le résultat de la
validation CAVV. La valeur ce tag indique
également qui a effectué l''authentification,
VisaNet ou l''émetteur, et la classification de la
transaction.
La transaction est classée comme :
     Transaction d''authentification
(Authentification) : le commerçant,
l''acquéreur, l''émetteur participent à Visa
Secure (VbV).
    Tentative de transaction d''authentification
(tentatives) : l''émetteur ou le titulaire de la
carte ne participe pas à Visa Secure (VbV), ou
le serveur de contrôle d''accès de l''émetteur
(ACS) n''était pas disponible.
    Transaction non sécurisée : l''acquéreur et
l''émetteur ne participent pas à Visa Secure
(VbV).
Le programme Visa Secure (VbV) définit les
règles et directives globales pour
l''authentification 3DS. Les conditions de
participation sont déterminées par chaque
région. La vérification CAVV doit être effectuée
par Visa ou l''émetteur. Tous les émetteurs,
acquéreurs et commerçants participants
doivent être prêts à envoyer et à recevoir des
champs et des valeurs de champ Visa Secure.
Vide ou non présent – CAVV non présent ou
CAVV non vérifié, l''émetteur n''a pas
sélectionné l''option de vérification CAVV.
0 – CAVV non présent ou CAVV non vérifié,
l''émetteur n''a pas sélectionné l''option de
vérification CAVV.
1 – Le CAVV n''a pas pu être vérifié ou les
données du CAVV n''ont pas été fournies au
moment prévu.
2 – CAVV a échoué à la vérification
authentification.
3 – CAVV a réussi l''authentification par
tentative de vérification. Une valeur de code
de résultats d''authentification 3-D Secure
(3DS) de 07 provenant du serveur de
tentatives de l''émetteur indique que ''authentification a été tentée. Tentatives de
l''émetteur La clé CAVV a été utilisée pour
générer le CAVV.
4 – CAVV a échoué à l''authentification lors de
la tentative de vérification. Une valeur de code
de résultats d''authentification 3-D Secure
(3DS) de 07 provenant du serveur de
tentatives de l''émetteur indique que
l''authentification a été tentée. Tentatives de
l''émetteur La clé CAVV a été utilisée pour
générer le CAVV.
5 – Non utilisé (réservé pour une utilisation
future).
6 – CAVV non vérifié, émetteur ne participant
pas à la vérification CAVV (sauf indication
contraire, seul Visa génère ce code, les
émetteurs ne le font pas).
7 - CAVV a échoué à l''authentification lors de
la tentative de vérification. Une valeur de code
de résultats d''authentification 3-D Secure
(3DS) de 07 du service Visa Attempts indique
qu''une tentative d''authentification a été
effectuée. La clé de tentatives Visa CAVV a été
utilisée pour générer le CAVV.
8 – CAVV a réussi l''authentification par
tentative de vérification. Une valeur de code
de résultats d''authentification 3-D Secure
(3DS) de 07 du service Visa Attempts indique
qu''une tentative d''authentification a été
effectuée. La clé de tentatives Visa CAVV a été
utilisée pour générer le CAVV.
9 - CAVV a échoué lors de la tentative
d''authentification. Une valeur de code de
résultats d''authentification 3-D Secure (3DS)
de 08 du service Visa Attempts indique qu''une
tentative d''authentification a été effectuée
lorsque le serveur de contrôle d''accès de
l''émetteur (ACS) n''était pas disponible. La clé
de tentatives Visa CAVV a été utilisée pour
générer le CAVV.
A – CAVV a réussi l''authentification par
tentative de vérification. Une valeur de code
de résultats d''authentification 3-D Secure
(3DS) de 08 du service de tentatives de visa
indique qu''une tentative d''authentification a
été effectuée lorsque l''ACS de l''émetteur
n''était pas disponible. La clé de tentatives Visa
CAVV a été utilisée pour générer le CAVV
B – CAVV a réussi l''authentification par
tentative de vérification, pas de transfert de
responsabilité. Seul Visa génère ce code, les
émetteurs ne le font pas.
C – CAVV n''a pas fait l''objet d''une tentative
d''authentification vérifiée. Si la valeur du code
de résultats d''authentification 3-D Secure
(3DS) est 07 dans le CAVV et que l''émetteur n''a pas renvoyé de code de résultats CAVV
dans la réponse d''autorisation, ou, si le champ
44.13 = 0 dans le message de réponse et que
les clés de chiffrement CAVV le font n''existe
pas dans VIP, VIP définit la valeur sur C dans le
champ 44.13. Seul Visa génère ce code, les
émetteurs ne le font pas.
D – CAVV n''était pas une authentification de
titulaire de carte vérifiée. Si la valeur du code
de résultats d''authentification 3-D Secure
(3DS) est 00 dans le CAVV et que l''émetteur
n''a pas renvoyé de code de résultats CAVV
dans la réponse d''autorisation, ou, si le champ
44.13 = 0 dans le message de réponse et que
les clés de chiffrement CAVV le font n''existe
pas en VIP VIP. Définit la valeur sur D dans le
champ 44.13. Seul Visa génèr ce code,les émetterus ne le font pas.', 'HSID'),
                                                                                             (48, 'T56', NULL, '029', 'AN', 'Payment account reference.
    Positions 1-4 contain the BIN controller
identifier, a
    Four-character registered value assigned by
EMVCo
    Positions 5-29 contain a 25-alphanumeric
    Character uppercase unique value linked to
a PAN
Positions 5-7 contain 001 if value is generated
by Visa,
otherwise, the value is provided to the issuer
that
generated the PAR by Visa product.', 'HSID'),
                                                                                             (48, 'T61', NULL, '001','N', 'Terminal Type

0 - Unspecified
2 - ATM
3 - Unattended cardholder-activated terminal
4 - Electronic Cash Register ', 'HSID'),
                                                                                             (48, 'T62', NULL, '001','N', 'Terminal entry Capability

1 - Terminal not Used
2 - Magstripe read capability
5 - Contact chip read capability (including
Magstripe and contactless)
8 – Contactless-only read capability

Visa Contactless Transactions.
Field 60.2 must contain a value of 5 or 8. If
contact chip is supported, a 5 should be used
regardless of whether Visa contactless is also
supported. An 8 should be used only if Visa
contactless is supported and contact chip is
not. ', 'HSID'),
                                                                                             (48, 'T63', NULL, '001', 'N', 'Chip Condition Code. Field not in use', 'HSID'),
                                                                                             (48, 'T66', NULL, '001', 'N', 'Chip Transaction Indicator.
Value:
4
Value from Visa or ‘4’ if not returned from VTS
For chip-read transaction acquirer should set
value ‘1’.
For tokenized transaction Visa changes from
‘1’ to ‘4’ prior to send to the issuer
Visa populates value in response A value of 4
in field 60.6 is required in messages with token
data. Authorizations and full financial
messages using iCVV convert service, early
chip data or full chip data must include field
60.6 in requests containing token data. ', 'HSID'),
                                                                                             (48, 'T67', NULL, '001', 'N', 'Chip Authentication Reliability Indicator.
Field not in use ', 'HSID'),
                                                                                             (48, 'T68', NULL, '002', 'N', 'E-commerce indicator.
05 – Secure electronic commerce transaction
(3-d secure, fully authenticated)
06 – non-authenticated secure e-com
transaction (3-ds authentication attempted)
07 - non-authenticated security transaction ', 'HSID'),
                                                                                             (48, 'T71', NULL, '002','N', 'Active Account Management Velocity
Checking Result.
This tag contains one of the following AAM
Velocity Checking result values.
          02 = Time-to-live exceeded
          03 = Count exceeded
          04 = Amount exceeded ', 'HSID'),
                                                                                             (48, 'T72', NULL, '004', 'N,BCD', 'Cardholder Verification Methods Identified
by Cardholder Device.
Contains the following positions in a 4-byte bit
map.
     Position 1, Unknown
     Position 2, None
     Position 3, Signature
     Position 4, Online PIN
     Position 5, Passcode
     Position 6, Cardholder device code
     Position 7, Fingerprint biometric verified by
cardholder device
     Position 8, Cardholder device pattern ', 'HSID'),
                                                                                             (48, 'T73', NULL, '001', 'ANS', 'Token Verification Result Code.
       1 TAVV cryptogram failed validation
       2 TAVV cryptogram passed validation
       3 DTVV or Visa-defined format cryptogram
failed validation
       4 DTVV or Visa-defined format
cryptogram passed validation
The TAVV-only cryptogram option is applicable
for token transactions without 3DS data. ', 'HSID'),
                                                                                             (48, 'T80', NULL, '001', 'b', 'Bound Device Index.
Numéro d''index de la base de données Visa où
l''ID de l''appareil est stocké. La valeur peut être
01-63 (au format hexadécimal). (Décimal 1
99). Les transactions d''autorisation avec un token peuvent contenir le tag 80 avec une
valeur nulle. Cela indique qu''un index de
périphérique n''est pas disponible pour la
transaction. ', 'HSID'),
                                                                                             (48, 'T81', NULL, '001 - 011 ', 'N', 'Token User Identifier.
Contient une valeur unique qui identifie
l''utilisateur du token. L''utilisateur de token est
une entité qui initie une demande de
paiement. Applicable aux transactions de
commerce électronique (types d''appareil et de
token carte sur fichier). En Europe, l''identifiant
d''utilisateur de token peut être utilisé pour
prendre en charge les exigences de liaison
dynamique de PSD2/RTS. ', 'HSID'),
                                                                                             (48, 'T82', NULL, '001', 'N', 'Token User Application Type.
Type d''application de l''utilisateur du Token.
Les entités peuvent être un marchand, une
place de marché ou un hôte de paiement.
Types d''applications :

00 = Inconnu
01 = Internet
02 = Web mobile
03 = Application mobile
04 = Application Marketplace
05 = Application vocale
06 = Application biométrique
07-FF = Réservé ', 'HSID'),
                                                                                             (48, 'T83', NULL, '001', 'N', 'Token Authentication Factor A.
Facteur d''authentification utilisé par les
demandeurs de tokens et les commerçants
pour authentifier le titulaire de la carte au
moment de la transaction. Applicable aux
transactions de commerce électronique (types
d''appareil et de token carte sur fichier).
Valeurs d''authentification :

00 = Aucune méthode d''authentification
acquise
01 = nom d''utilisateur/mot de passe
02 = Code d''accès ou mot de passe Méthode
de vérification du titulaire de la carte de
l''appareil du consommateur (CDCVM) :
10 = code d''accès
11 = mot de passe
12 = motif
13 = empreinte biométrique
14 = Reconnaissance faciale biométrique
15 = Reconnaissance biométrique de l''iris
16 = Reconnaissance vocale biométrique
17 = Biométrie comportementale
Code d''accès à usage unique (OTP) :
30 = Système de messages courts (SMS)
31 = Courriel
32 = Token matériel sans vérification de
l''utilisateur
33 = Token matériel avec vérification de
l''utilisateur
34 = token logiciel
35 = toute autre méthode
40 = Authentification basée sur les
connaissances
41 = Authentification hors bande (OOB)
42 = Authentification locale
Identité rapide en ligne (FIDO) :
50 = Possession seulement. Aucune
vérification de l''utilisateur.
51 = Avec vérification de l''utilisateur
(biométrique)
52 = Avec vérification de l''utilisateur (code
d''accès/mot de passe)
60 = token basé sur SE : un cryptogramme
généré à partir d''un appareil SE pour un token
lié à un appareil a été fourni, établit le facteur
de possession.
61 = Token lié à l''appareil : le token lié à
l''appareil (référence de token) a été fourni par
le demandeur de token avec la preuve de
l''appareil utilisé pour le token de liaison,
établit le facteur de possession. En Europe,
l''identifiant d''utilisateur de token peut être
utilisé pour prendre en charge les exigences de
liaison dynamique de PSD2/RTS. ', 'HSID'),
                                                                                             (48, 'T84', NULL, '001', 'N', 'Token Authentication Factor B.
Facteur d''authentification utilisé par les
demandeurs de tokens et les commerçants
pour authentifier le titulaire de la carte au
moment de la transaction. Applicable aux
transactions de commerce électronique (types
d''appareil et de token carte sur fichier).

Valeurs d''authentification :

00 = Aucune méthode d''authentification
acquise
01 = nom d''utilisateur/mot de passe
02 = code d''accès ou mot de passe

Méthode de vérification du titulaire de la carte
de l''appareil du consommateur (CDCVM) :
10 = code d''accès
11 = mot de passe
12 = motif
13 = empreinte biométrique
14 = Reconnaissance faciale biométrique
15 = Reconnaissance biométrique de l''iris
16 = Reconnaissance vocale biométrique
17 = Biométrie comportementale

Code d''accès à usage unique (OTP) :
30 = Système de messages courts (SMS)
31 = Courriel
32 = Token matériel sans vérification de
l''utilisateur 33 = Token matériel avec vérification de
l''utilisateur
34 = Token logiciel
35 = toute autre méthode
40 = Authentification basée sur les
connaissances
41 = Authentification hors bande (OOB)
42 = Authentification locale

Identité rapide en ligne (FIDO) :
50 = Possession seulement. Aucune
vérification de l''utilisateur.
51 = Avec vérification de l''utilisateur
(biométrique)
52 = Avec vérification de l''utilisateur (code
d''accès/mot de passe)
60 = Token basé sur SE : un cryptogramme
généré à partir d''un appareil SE pour un token
lié à un appareil a été fourni, établit le facteur
de possession.
61 = Token lié à l''appareil : le token lié à
l''appareil (référence de token) a été fourni par
le demandeur de token avec la preuve de
l''appareil utilisé pour le token de liaison,
établit le facteur de possession. En Europe,
l''identifiant d''utilisateur de token peut être
utilisé pour prendre en charge les exigences de
liaison dynamique de PSD2/RTS. ', 'HSID'),
                                                                                             (48, 'T85', NULL, '003', 'N', 'Token Authentification Amount.
Montant du paiement rendu visible par le
demandeur du token au consommateur au
moment de l''achat.
Applicable aux transactions de commerce
électronique (types d''appareil et de token
carte sur fichier).
En Europe, l''identifiant d''utilisateur de token
peut être utilisé pour prendre en charge les
exigences de liaison dynamique de PSD2/RTS.
Ce montant correspond aux sept chiffres les
plus à droite du montant à payer à l''exclusion
des unités mineures, converti de décimal en
binaire. Unités mineures exclues spécifiées par
le code de pays dans le champ 49-Code de
devise, Transaction. ', 'HSID'),
                                                                                             (48, 'VRC', NULL, '1', 'ANS', 'Token Verification Result Code.
1 échec de validation du cryptogramme TAVV
2 Le cryptogramme TAVV a passé la validation
3 Échec de la validation du cryptogramme au
format DTVV ou Visa
4 Le cryptogramme au format défini par DTVV
ou Visa a réussi la validation
L''option de cryptogramme TAVV uniquement
s''applique aux transactions de Tokens sans
données 3DS. ', 'HSID'),
                                                                                             (55, '71','Issuer Script Template 1', NULL, 'b..128', 'Contient des données propriétaire de
l’émetteur à transférer sur la puce avant la
génération du second cryptogramme. ', 'HSID'),
                                                                                             (55, '72','Issuer Script Template 2', NULL, 'b..128', 'Contient des données propriété de
l''émetteur à transférer sur la puce après la
génération du second cryptogramme', 'HSID'),
                                                                                             (55, '82','Application Interchange Profile',NULL, 'b 2', 'Indique les capacités de la puce à exécuter
certaines fonctions. ', 'HSID'),
                                                                                             (55, '84','Dedicates File Name', NULL,'b..16', 'Contient le nom de fichiers dédiés. ', 'HSID'),
                                                                                             (55, '86','Issuer script command', NULL,'b..21', 'Script transmis par émetteur dans la
réponse à la demande d’autorisation ou de
transaction. ', 'HSID'),
                                                                                             (55, '8A','Authorization response code',NULL,'An..2', 'Code d’autorisation généré par l''émetteur. ', 'HSID'),
                                                                                             (55, '91','Issuer Authentication Data', NULL,'b..16', 'Contient les données à transmettre à la
puce pour l’authentification de l''émetteur ', 'HSID'),
                                                                                             (55, '95','Terminal Verification Results',NULL,'b 5', 'Contient l''état des fonctions terminal. ', 'HSID'),
                                                                                             (55, '9A','Transaction Date', NULL,'b 3', 'Contient la date à laquelle la transaction a
été autorisée (format AAMMJJ). ', 'HSID'),
                                                                                             (55, '9C','Transaction Type', NULL,'b 1', 'Indique le type de la transaction. ', 'HSID'),
                                                                                             (55, '5F2A', 'Transaction Currency Code', NULL,'b 2', 'Code monnaie de la transaction. ', 'HSID'),
                                                                                             (55, '9F02', 'Transaction Amount', NULL,'b 6', 'Montant de la transaction. ', 'HSID'),
                                                                                             (55, '9F03', 'Other Amount',NULL,'b 6', 'Montant cash back ', 'HSID'),
                                                                                             (55, '9F09', 'Terminal Application Version Number', NULL,'b 2', 'Contient le numéro de version de
l’application. ', 'HSID'),
                                                                                             (55, '9F10','Issuer Application Data', NULL,'b..32', 'Contient des données privées à
transmettre à la puce. ', 'HSID'),
                                                                                             (55, '9F1A','Terminal Country Code',NULL,'b 2', 'Code pays du terminal. ', 'HSID'),
                                                                                             (55, '9F1E','Interface Device (IFD) Serial number', NULL,'b 8', 'Numéro de série du terminal. ', 'HSID'),
                                                                                             (55, '9F26','Application cryptogram', NULL,'b 8', 'Cryptogramme calculé par le terminal.. ', 'HSID'),
                                                                                             (55, '9F27','Cryptogram Information Data', NULL,'b 1', 'Indique le type de cryptogramme et les
actions à exécuter par le terminal. ', 'HSID'),
                                                                                             (55, '9F33','Terminal Capabilities', NULL,'b 3', 'Indique la méthode d’entrée des données,
méthode d’authentification du porteur et
les capacités sécuritaires du terminal. ', 'HSID'),
                                                                                             (55, '9F34','Cardholder Verification Method Results', NULL,'b..4', 'Indique le résultat de la dernière
authentification porteur. ', 'HSID'),
                                                                                             (55, '9F35','Terminal Type', NULL,'b 1', 'Indique le type d’environnement, les
capacités de communication et les
contrôles opérationnels que peux exécuter
le terminal. ', 'HSID'),
                                                                                             (55, '9F36','Application Transaction Counter (ATC)',NULL,'b 2', 'Compteur utilisé dans le calcul du
cryptogramme. ', 'HSID'),
                                                                                             (55, '9F37','Unpredictable Number', NULL,'b 4', 'Nombre imprévisible. ', 'HSID'),
                                                                                             (55, '9F41', 'Transaction Sequence Number', NULL,'b..4', 'Numéro de séquence de la transaction. ', 'HSID'),
                                                                                             (55, '9F53','Transaction Category Code', NULL,'b 1', 'TCC', 'HSID'),
                                                                                             (61, '039', NULL, '002', NULL, 'Code réponse reçu de l’émetteur avant d''être
convertie en code réponse PowerCARD. ', 'HSID'),
                                                                                             (61, '061', NULL, 'Variable…026', NULL, 'POS DATA
Correspond au champ 61 envoyé par MasterCard
aux émetteurs et contient des informations
additionnelles relatives au POS DATA. ', 'HSID'),
                                                                                             (62, 'F01', NULL, '001', NULL, 'Indicateur des Caractéristiques d’Autorisation
(ACI).
A - Qualification réussie:
Carte présente,
Lecture de la piste effectuée,
CVV demandé
E - Qualification réussie:
Commerçant de classe A conforme (données
nom et emplacement du commerce enrichi mise
à disposition)
N – Qualification non réussie
Cet élément est transmis dans le message de réponse d’autorisation pour informer acquéreur
de la qualification de sa transaction. ', 'HSID'),
                                                                                             (62, 'F02', NULL, '015', NULL, 'Identifiant de transaction.
Cet élément contient un identifiant unique par
transaction en cas de pré autorisation. Il permet
à un émetteur de pouvoir réconcilier plusieurs
demande d’autorisation avec une seule
transaction (autorisation incrémentale). ', 'HSID'),
                                                                                             (62, 'F03', NULL, '004', NULL, 'Code de validation CPS. Cet élément doit être
reconduit dans les messages de compensation. ', 'HSID'),
                                                                                             (62, 'F04', NULL, '001', NULL, 'Identifiant de données spécifiques au marché. Il
permet à émetteur de valider la présence d’une
durée dans le message de pré autorisation.
A :
Location de voiture
H : Hôtel
N : Autre ', 'HSID'),
                                                                                             (62, 'F05', NULL, '002', NULL, 'Durée de la pré autorisation, exprimée en
nombre de jours. Cet élément ne prend un sens
que si l’élément précédent est A ou H.  ', 'HSID'),
                                                                                             (62, 'F06', NULL, '001', NULL, 'ndicateur de propriété de prestige, il permet à
émetteur d’être informé que le commerçant
bénéficie de plafonds spéciaux lors des
demandes de validation de carte (avec un
montant de 1USD).
D :
Plafond à 500 USD
B : Plafond à 1000 USD
S : Plafond à 1.500 USD ', 'HSID'),
                                                                                             (127, 'E01','CVV2', '003', NULL, 'Card verification value for
Ecommerce transactions(Visa
Authorisation)', 'HSID'),
                                                                                             (127, 'E02','MasterCard Electronic
Commerce Indicators
ECI' , '003', NULL, 'Position 1 (Security Protocol)
Data Representation:
n-1
Data Field: The electronic
commerce security level
indicator
Values: 0 = Reserved for
existing MasterCard
Europe/Visa definitions
1 = Reserved for future use
2 = Channel
3–8 = Reserved for future use
9 = None (no security
protocol)

Position 2 (Cardholder
Authentication)
Data Representation: n-1
Data Field: The cardholder
authentication indicator
Values: 0 = Reserved for
future use
1 = Cardholder certificate not
used
2–9 = Reserved for future use
Valid combinations of position 1
and position 2:
21 = Channel encryption;
cardholder certificate not
used (this is the preferred
value
for MasterCard®
SecureCode™)
91 = No security protocol;
cardholder certificate not
used Position 3 (UCAF Collection
Indicator)
Data Representation: n-1
Data Field: The UCAF
collection indicator
Values: 0 = UCAF data
collection is not supported
by the merchant
1 = UCAF data collection is
supported
by the merchant, but UCAF
data was
not populated (DE 48,
subelement
43 is not present for
MasterCard
SecureCode)
2 = UCAF data collection is
supported by
the merchant, and UCAF data
must be
present (DE 48, subelement
43)
3 = UCAF data collection is
supported by
the merchant, and UCAF
(MasterCard
assigned Static Accountholder
Authentication Value) data
must be
present.
Note: DE 48, subelements 32 and
43 are
required for Static AAV
transactions.
Identifies participation in one
of the
following programs:
• Maestro Advance
Registration
Program
• Maestro Recurring
Payments
Program
• MasterCard Advance
Registration
Program
• MasterCard Utility Payment
Program ', 'HSID'),
                                                                                             (127, 'E03','ECI utilisé pour cartes visa et
MasterCard provenant de
l’interface MTC', '002', NULL, ' ECI= 05 (Authenticated with
CAVV)
 ECI = 06 (3-D Secure
merchant, not
authenticated)
ECI = 07 (Not
Authenticated)', 'HSID'),
                                                                                             (127, 'E04','TransStain(CAVV) pour VISA
provenant de l’interface
MTC -UCAF pour  MasterCard
provenant de l’interface
MTC', '028', NULL, 'Il s’agit du meme format visa(CAVV
DATA Field 126.9)
Il contiendra 20 octets encodés en
base64 soit 28 caracètres. De même
pour MasterCard. ', 'HSID'),
                                                                                             (127, 'E05','XID
    3-D Secure Electronic
Commerce Transaction
Identifier' , '028', NULL, 'NULL', 'HSID'),
                                                                                             (127, 'E06','CAVV Result', '002', NULL, 'Cavv result code', 'HSID'),
                                                                                             (48, 'P01', NULL, '003', NULL, ' Le type d’erreur de protocole :
Ce
 tag sera retourné dans les cas de
 rejets avec un code action 302 d’un
 message provenant d’un EdP.
 Le tag est de format suivant :
 1. Type d’erreur (1, type : A) :
 Indique le type d’erreur :
 • ‘1’ : Erreur de valeur
 • ‘2’ : Erreur de format
 • ‘3 ’ : Absence d’un champ
 • ‘4’ : Présence interdite d’un champ
 • ‘5’ : Erreur d’incohérence
 2. Numéro de champ (3, type
 N) : Numéro du champ dans le
 dictionnaire
 3. Tags/ sous champs (1…6, type
 AN) : Tag de sous champ', 'MSID'),
                                                                                             (48, 'P10', NULL, '033', NULL, ' Clé MAC.
 Élément contenant la valeur
 de la clé de calcul de la valeur
 d’authentification du message à
 prendre en compte au cours de la
 session.', 'MSID'),
                                                                                             (48, 'P17', NULL, '010', NULL, ' Référence d’opération du cash out
 GAB', 'MSID'),
                                                                                             (48, 'P18', NULL, '...256', NULL, ' PIN format haché :
 L’algorithme utilisé pour le hachage
 est MD5
 La formule utilisée :
SHA-MD5(SHA
MD5(PIN+ FFFFFFFFFFFF))
 SHA-MD5() : Fonction de hachage
 MD5.
 PIN : PIN de l’opération sur 4 digit.', 'MSID'),
                                                                                             (48, 'P35', NULL, '050', NULL, ' Message texte
 Ce champ sert à envoyer un message
 ou bien à décrire les raisons des', 'MSID'),
                                                                                             (48, 'M01', NULL, '010', NULL, ' Longitude de la position GPS du
 mobile de l’émetteur du message', 'MSID'),
                                                                                             (48, 'M02', NULL, '010', NULL, ' Latitude de la position GPS du mobile
 de l’émetteur du message', 'MSID'),
                                                                                             (48, 'M03', NULL, '004', NULL, 'Précision de la position.', 'MSID'),
                                                                                             (48, 'S20', NULL, '...999', NULL, ' Contient des informations sur le
 transfert d’argent, il est sous format
 TLV
 Élément 001 (taille sur 2) :
type de
 transfert
 • AA : Account to account
 (Compte à compte)
 • PP : Person to person
 (Personne à personne)
 • PL : Prepaid initial load
 (Chargement initial prépayé)
 • PR : Prepaid reload
 (Chargement prépayé)
 • BP : Bill payment (Paiement de
 facture)
 • PD : Payroll/pension
 disbursement (Versement de
 pension ou salaire)
 • OC : Government/Non
Government Organization  Disbursement (Versement
 organisations gouvernementales
 et non gouvernementales)
 • MR : Merchant rebate (Remise
 sur frais commerçant)
 • GC : Consumer to
 government (Consommateur à
 gouvernement)
 • BD : Business Disbursement
 (Versement d''affaires)
 • MS : Acquirer to merchant
 settlement (Règlement
 commerçant)
 • MT : Mobile phone Topup
 (Recharge téléphonique)
 • CP: Payment of Merchant
Push/Pulloptions (Paiement
 commerçant - Options Push/
 Pull)
 • SP: Payment of providers
Push/Pulloptions (Paiement
 fournisseurs - Options Push/Pull)
 • CI: Cash In
 • OP : Other Payment (Autres)
 • EP : E-commerce payment
 (Paiement e-commerce)', 'MSID'),
                                                                                             (48, 'S22', NULL, '...999', NULL, 'Contient des informations sur le
 porteur, il est sous format TLV.
 Element 003 (taille sur 32) :
Nom du
 porteur
 Element 004 (taille sur 32) : Prénom
 du porteur', 'MSID'),
                                                                                             (48, 'S99', NULL, '...999', NULL, ' Contient des informations
 additionnelles sur le transfert ou le
 paiement.', 'MSID'),
                                                                                             (48, 'M04', NULL, '010', NULL, ' Contient le numéro de téléphone pour
 la recharge mobile.', 'MSID'),
                                                                                             (48, 'M05', NULL, '...64', NULL, 'Contient la référence d’opération de
 paiement de facture.', 'MSID'),
                                                                                             (61, '39', NULL, '002', NULL, ' Code réponse reçu de l’EDP payé
 avant d''être converti en code réponse
 PowerCARD.', 'MSID');

select * from tags;



SELECT * FROM tags WHERE element_number = 55 AND nomprotocole = 'HSID';


SELECT element_number, nom, nomprotocole FROM tags WHERE element_number = 55 OR element_number = 127;


