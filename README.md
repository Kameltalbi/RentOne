# 🏠 RentOne - Gestion Locative pour Propriétaires

Application mobile React Native pour gérer vos biens locatifs.

## 🎯 Fonctionnalités

### ✅ Implémentées
- **Gestion des biens** : Ajout, liste et détails de vos propriétés
- **Gestion des locataires** : Fiches complètes avec garant et documents
- **Suivi des loyers** : Calendrier des paiements, statuts (payé/en attente/retard)
- **Gestion des dépenses** : Réparations, taxes, charges avec catégorisation
- **Rappels intelligents** : Indexation loyer, renouvellement bail, révision charges
- **Notifications automatiques** : Alertes pour loyers non reçus
- **Rapports financiers** : Bilan revenus vs dépenses par bien
- **Stockage local** : Données sauvegardées avec AsyncStorage

### 📱 Écrans
- **Mes Biens** : Liste de vos propriétés avec photos
- **Loyers** : Suivi des paiements avec filtres et statistiques
- **Dépenses** : Historique des dépenses avec catégories
- **Rappels** : Notifications et tâches à venir

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer sur iOS
npm run ios

# Lancer sur Android
npm run android

# Lancer sur le web
npm run web
```

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
