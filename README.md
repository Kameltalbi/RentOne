# 🏠 RentOne - Multi-Language Rental Management App

[![React Native](https://img.shields.io/badge/React%20Native-0.81-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, multi-language and multi-currency mobile application for landlords to manage their rental properties efficiently.

## 🌍 Languages Supported

- 🇫🇷 **Français** (French)
- 🇬🇧 **English**
- 🇸🇦 **العربية** (Arabic)
- 🇪🇸 **Español** (Spanish)

## 💰 Currencies Supported

24+ currencies including:
- EUR (€), USD ($), GBP (£)
- MAD (د.م.), DZD (د.ج), TND (د.ت)
- SAR (ر.س), AED (د.إ), EGP (E£)
- And many more...

## 🎯 Fonctionnalités

### ✨ Features

### 🏘️ Property Management
- Add and manage properties (apartments, houses, studios)
- Multi-currency support for rent amounts
- Photos and documents storage
- Detailed information (surface, rent, address)

### 💳 Payment Tracking
- Payment calendar with status tracking
- Status types: Paid, Pending, Late, Partial
- Automatic notifications for overdue rent
- Real-time financial statistics
- Multi-currency payment tracking

### 📊 Expense Management
- Categorization (repair, maintenance, tax, insurance, utilities)
- Recoverable expenses tracking
- Expense reports per property
- Multi-currency expense tracking

### 🔔 Smart Reminders
- Annual rent indexation
- Lease renewal notifications
- Charges review reminders
- Custom reminders

### ⚙️ Settings
- Language selection (4 languages)
- Currency selection (24+ currencies)
- Persistent preferences storage

### 📱 Écrans
- **Mes Biens** : Liste de vos propriétés avec photos
- **Loyers** : Suivi des paiements avec filtres et statistiques
- **Dépenses** : Historique des dépenses avec catégories
- **Rappels** : Notifications et tâches à venir

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Expo Go app on your mobile device
- (Optional) Android Studio or Xcode for emulators

### Installation

```bash
# Clone the repository
git clone https://github.com/Kameltalbi/RentOne.git
cd RentOne

# Install dependencies
npm install

# Start the development server
npm start
```

### Running the App

**On Physical Device:**
1. Install Expo Go from App Store (iOS) or Play Store (Android)
2. Scan the QR code displayed in terminal
3. App will load in Expo Go

**On Emulator:**
```bash
# Android
npm run android

# iOS (macOS only)
npm run ios
```

### First Launch
1. Select your preferred language (Settings icon)
2. Choose your currency
3. Start adding your properties!

## 📦 Technologies

- **React Native** avec Expo
- **TypeScript** pour la sécurité des types
- **Expo Router** pour la navigation
- **AsyncStorage** pour le stockage local
- **date-fns** pour la gestion des dates
- **Expo Notifications** pour les rappels

## 📂 Structure du Projet

```
RentOne/
├── app/                    # Écrans (Expo Router)
│   ├── (tabs)/            # Navigation par onglets
│   │   ├── index.tsx      # Liste des biens
│   │   ├── payments.tsx   # Suivi des loyers
│   │   ├── expenses.tsx   # Gestion des dépenses
│   │   └── reminders.tsx  # Rappels
│   ├── property/          # Gestion des biens
│   └── _layout.tsx        # Layout principal
├── components/            # Composants réutilisables
│   ├── PropertyCard.tsx
│   └── PaymentCard.tsx
├── types/                 # Types TypeScript
│   └── index.ts
├── utils/                 # Utilitaires
│   ├── storage.ts         # AsyncStorage
│   ├── notifications.ts   # Notifications
│   └── financial.ts       # Calculs financiers
└── constants/             # Constantes (thème, couleurs)
    └── theme.ts
```

## 💰 Modèle de Monétisation

- **Gratuit** : 1 bien, fonctionnalités de base
- **Pro** : Biens illimités, rapports fiscaux, export PDF
- **Prix** : 3€/mois ou 25€/an

## 🎨 Design

- Interface moderne avec Material Design
- Couleurs : Indigo (#4F46E5) comme couleur principale
- Composants réutilisables et cohérents
- Navigation intuitive par onglets

## 📝 Prochaines Étapes

1. Ajouter l'écran de détails d'un bien
2. Implémenter l'ajout de locataires
3. Créer le formulaire d'ajout de paiement
4. Ajouter l'upload de photos et documents
5. Implémenter les rapports fiscaux (version Pro)
6. Ajouter l'export PDF
7. Intégrer un système d'authentification
8. Synchronisation cloud (optionnel)

## 🔧 Configuration

L'app utilise Expo pour faciliter le développement. Aucune configuration native requise pour commencer.

## 📱 Compatibilité

- iOS 13+
- Android 6.0+
- Web (PWA possible)

## 👨‍💻 Développement

```bash
# Démarrer le serveur de développement
npm start

# Lancer les tests (à implémenter)
npm test

# Build de production
expo build:android
expo build:ios
```

## 📄 Licence

Propriétaire - Tous droits réservés

---

**RentOne** - Simplifiez la gestion de vos biens locatifs 🏘️
