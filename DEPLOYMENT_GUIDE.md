# 🚀 Guide de Déploiement - RentOne

Guide complet pour publier RentOne sur **App Store** et **Google Play Store**.

---

## 📋 Prérequis

### Comptes Développeur

1. **Apple Developer Account** (99$/an)
   - Créer sur : https://developer.apple.com
   - Délai d'activation : 24-48h

2. **Google Play Console** (25$ unique)
   - Créer sur : https://play.google.com/console
   - Activation immédiate

### Outils Nécessaires

```bash
# Installer EAS CLI (Expo Application Services)
npm install -g eas-cli

# Se connecter à Expo
eas login

# Configurer le projet
eas build:configure
```

---

## 🍎 Publication App Store (iOS)

### Étape 1 : Préparer les Assets

```bash
# Créer icône 1024x1024px (icon.png)
# Créer splash screen (splash.png)
```

**Icône requise** :
- Format : PNG
- Taille : 1024x1024px
- Pas de transparence
- Pas de coins arrondis (Apple le fait)

### Étape 2 : Configurer App Store Connect

1. Aller sur https://appstoreconnect.apple.com
2. Créer une nouvelle app
3. Remplir les informations :
   - **Bundle ID** : `com.rentone.app`
   - **Nom** : RentOne - Gestion Locative
   - **SKU** : rentone-2026
   - **Catégorie** : Finance

### Étape 3 : Build iOS

```bash
# Build de production
eas build --platform ios --profile production

# Attendre la fin du build (~15-20 min)
# Télécharger l'IPA généré
```

### Étape 4 : Soumettre à Review

```bash
# Soumettre automatiquement
eas submit --platform ios --latest

# OU manuellement via App Store Connect
```

### Étape 5 : Remplir Store Listing

Dans App Store Connect :

1. **Screenshots** (obligatoire)
   - iPhone 6.5" : 6-10 screenshots
   - iPad 12.9" : 6-10 screenshots

2. **Description** (voir STORE_LISTING.md)

3. **Mots-clés** (100 caractères max)

4. **Informations de contact**
   - Email support
   - URL politique de confidentialité
   - URL conditions d'utilisation

5. **Informations de prix**
   - Gratuit avec achats intégrés
   - Premium : 4,99€/mois, 49€/an

### Étape 6 : Review Apple

- Délai : 24-48h en moyenne
- Préparer vidéo démo si demandé
- Répondre rapidement aux questions

---

## 🤖 Publication Google Play (Android)

### Étape 1 : Préparer les Assets

```bash
# Créer icône 512x512px (adaptive-icon.png)
# Créer feature graphic 1024x500px
```

### Étape 2 : Créer l'App dans Play Console

1. Aller sur https://play.google.com/console
2. Créer une application
3. Remplir les informations :
   - **Nom** : RentOne - Gestion Locative
   - **Langue par défaut** : Français
   - **Type** : Application
   - **Gratuit/Payant** : Gratuit

### Étape 3 : Build Android

```bash
# Build AAB (Android App Bundle) pour production
eas build --platform android --profile production

# Attendre la fin du build (~10-15 min)
# Télécharger l'AAB généré
```

### Étape 4 : Créer une Version

1. **Production** > **Créer une version**
2. Upload l'AAB
3. Remplir les notes de version

### Étape 5 : Remplir Store Listing

1. **Fiche du Play Store**
   - Titre court (30 caractères)
   - Description courte (80 caractères)
   - Description complète (4000 caractères)

2. **Assets graphiques**
   - Icône : 512x512px
   - Feature graphic : 1024x500px
   - Screenshots : min 2, max 8
   - Vidéo YouTube (optionnel)

3. **Catégorisation**
   - Catégorie : Finance
   - Tags : Gestion, Immobilier

4. **Coordonnées**
   - Email
   - Site web
   - Politique de confidentialité

5. **Tarification**
   - Gratuit
   - Achats intégrés : Premium

### Étape 6 : Questionnaire de Contenu

- Classification : Tout public
- Annonces : Non
- Achats intégrés : Oui (Premium)

### Étape 7 : Review Google

- Délai : 1-7 jours
- Généralement plus rapide qu'Apple
- Moins strict sur le contenu

---

## 🔄 Mises à Jour

### Nouvelle Version

```bash
# 1. Mettre à jour app.json
# version: "1.0.1"
# ios.buildNumber: "2"
# android.versionCode: 2

# 2. Build nouvelle version
eas build --platform all --profile production

# 3. Soumettre
eas submit --platform all --latest
```

### Notes de Version

Toujours inclure :
- Nouvelles fonctionnalités
- Corrections de bugs
- Améliorations de performance

---

## 📊 Checklist Complète

### Avant Soumission

- [ ] Icône app 1024x1024px créée
- [ ] Splash screen créée
- [ ] Screenshots pris (iPhone + iPad + Android)
- [ ] Feature graphic créé (Android)
- [ ] Description traduite (FR + EN minimum)
- [ ] Politique de confidentialité publiée
- [ ] CGU publiées
- [ ] Email support configuré
- [ ] Site web en ligne
- [ ] Comptes développeur actifs
- [ ] Achats intégrés configurés (Premium)

### Tests Avant Publication

- [ ] Test sur iPhone réel
- [ ] Test sur iPad réel
- [ ] Test sur Android réel
- [ ] Test achats intégrés (sandbox)
- [ ] Test notifications
- [ ] Test mode hors-ligne
- [ ] Test multi-langue
- [ ] Test multi-devises
- [ ] Test génération PDF
- [ ] Test export données

### Après Publication

- [ ] Surveiller les reviews
- [ ] Répondre aux commentaires
- [ ] Monitorer les crashes (Sentry/Crashlytics)
- [ ] Analyser les métriques (Analytics)
- [ ] Préparer mises à jour régulières

---

## 💰 Configuration Achats Intégrés

### App Store (iOS)

1. **App Store Connect** > **Fonctionnalités** > **Achats intégrés**
2. Créer 2 produits :

**Abonnement Mensuel**
- ID : `rentone_premium_monthly`
- Type : Abonnement auto-renouvelable
- Prix : 4,99€
- Durée : 1 mois

**Abonnement Annuel**
- ID : `rentone_premium_yearly`
- Type : Abonnement auto-renouvelable
- Prix : 49€
- Durée : 1 an
- Essai gratuit : 7 jours (optionnel)

### Google Play

1. **Play Console** > **Monétisation** > **Produits**
2. Créer les mêmes produits avec IDs identiques

---

## 🔐 Sécurité

### Clés de Signature

```bash
# Android : Générer keystore
keytool -genkeypair -v -storetype PKCS12 \
  -keystore rentone.keystore \
  -alias rentone-key \
  -keyalg RSA -keysize 2048 -validity 10000

# Sauvegarder le keystore en lieu sûr !
# Ne JAMAIS le commit sur Git
```

### Secrets

Ajouter à `.gitignore` :
```
*.keystore
*.p12
*.mobileprovision
google-play-service-account.json
```

---

## 📞 Support

### Ressources

- **Expo Docs** : https://docs.expo.dev
- **EAS Build** : https://docs.expo.dev/build/introduction/
- **App Store Guidelines** : https://developer.apple.com/app-store/review/guidelines/
- **Google Play Policies** : https://play.google.com/about/developer-content-policy/

### Aide

- **Email** : support@rentone.app
- **Discord Expo** : https://chat.expo.dev
- **Stack Overflow** : Tag `expo` ou `react-native`

---

## 🎯 Timeline Estimé

| Étape | Durée |
|-------|-------|
| Préparation assets | 1-2 jours |
| Configuration comptes | 1 jour |
| Premier build | 2-3 heures |
| Remplir store listings | 2-3 heures |
| Review Apple | 1-3 jours |
| Review Google | 1-7 jours |
| **TOTAL** | **5-14 jours** |

---

## ✅ Prêt à Publier !

Une fois tous les éléments en place, lancez :

```bash
# Build pour les deux plateformes
eas build --platform all --profile production

# Soumettre aux stores
eas submit --platform all --latest
```

**Bonne chance ! 🚀**

---

**RentOne - Gestion Locative Professionnelle**
© 2026 Tous droits réservés
