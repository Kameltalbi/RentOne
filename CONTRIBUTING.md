# 🤝 Contributing to RentOne

Thank you for your interest in contributing to RentOne! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Translation Guidelines](#translation-guidelines)
- [Adding New Currencies](#adding-new-currencies)

---

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Respect different viewpoints and experiences

---

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/RentOne.git
   cd RentOne
   ```
3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/Kameltalbi/RentOne.git
   ```
4. **Install dependencies**
   ```bash
   npm install
   ```
5. **Start development server**
   ```bash
   npm start
   ```

---

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Environment Setup
1. Install Watchman (macOS):
   ```bash
   brew install watchman
   ```
2. Install Expo CLI globally:
   ```bash
   npm install -g expo-cli
   ```

---

## 📁 Project Structure

```
RentOne/
├── app/                      # Screens (Expo Router)
│   ├── (tabs)/              # Tab navigation screens
│   ├── property/            # Property-related screens
│   ├── payment/             # Payment screens
│   ├── expense/             # Expense screens
│   ├── tenant/              # Tenant screens
│   └── settings.tsx         # Settings screen
├── components/              # Reusable UI components
├── constants/               # App constants
│   ├── theme.ts            # Theme colors and styles
│   └── currencies.ts       # Currency definitions
├── contexts/                # React contexts
│   └── AppContext.tsx      # Global app state
├── i18n/                    # Internationalization
│   └── translations.ts     # All translations
├── types/                   # TypeScript types
├── utils/                   # Utility functions
│   ├── storage.ts          # AsyncStorage helpers
│   ├── notifications.ts    # Notification helpers
│   └── financial.ts        # Financial calculations
└── assets/                  # Images and static files
```

---

## 💻 Coding Standards

### TypeScript
- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid `any` type
- Use strict mode

### React Native
- Use functional components with hooks
- Follow React Native best practices
- Use `StyleSheet.create()` for styles
- Avoid inline styles when possible

### Naming Conventions
- **Files**: PascalCase for components (`PropertyCard.tsx`)
- **Variables**: camelCase (`propertyList`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_PROPERTIES`)
- **Types/Interfaces**: PascalCase (`Property`, `PaymentStatus`)

### Code Style
```typescript
// Good
const handleSave = async () => {
  try {
    const properties = await storage.getProperties();
    await storage.saveProperties([...properties, newProperty]);
  } catch (error) {
    console.error('Error saving property:', error);
  }
};

// Bad
const handleSave = async () => {
  const properties = await storage.getProperties()
  await storage.saveProperties([...properties, newProperty])
}
```

---

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/).

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples
```bash
feat(property): add photo upload functionality

fix(payment): correct currency formatting for Arabic locales

docs(readme): update installation instructions

refactor(storage): optimize AsyncStorage queries
```

---

## 🔄 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes**
   - Write clean, documented code
   - Follow coding standards
   - Add tests if applicable

3. **Test your changes**
   ```bash
   npm start
   # Test on both iOS and Android if possible
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feat/your-feature-name
   ```

6. **Create Pull Request**
   - Go to GitHub and create a PR
   - Fill in the PR template
   - Link related issues
   - Request review

### PR Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings or errors
- [ ] Tested on Android/iOS
- [ ] Screenshots added (for UI changes)

---

## 🌍 Translation Guidelines

### Adding a New Language

1. **Update `i18n/translations.ts`**:
   ```typescript
   export type Language = 'fr' | 'en' | 'ar' | 'es' | 'pt'; // Add 'pt'

   export const translations: Record<Language, Translations> = {
     // ... existing translations
     pt: {
       common: {
         save: 'Salvar',
         cancel: 'Cancelar',
         // ... complete all translations
       },
       // ... all sections
     }
   };
   ```

2. **Update Settings screen** (`app/settings.tsx`):
   ```typescript
   const languages: { code: Language; name: string; flag: string }[] = [
     // ... existing languages
     { code: 'pt', name: 'Português', flag: '🇵🇹' },
   ];
   ```

3. **Test thoroughly**:
   - Switch to new language
   - Navigate all screens
   - Verify text fits in UI elements
   - Check RTL support (for Arabic, Hebrew, etc.)

### Translation Best Practices
- Keep translations concise
- Consider cultural context
- Test on actual devices
- Use native speakers for review
- Maintain consistency in terminology

---

## 💰 Adding New Currencies

1. **Update `constants/currencies.ts`**:
   ```typescript
   export const CURRENCIES: Currency[] = [
     // ... existing currencies
     { 
       code: 'BRL', 
       symbol: 'R$', 
       name: 'Brazilian Real', 
       countries: ['Brazil'] 
     },
   ];
   ```

2. **Test currency formatting**:
   - Verify symbol displays correctly
   - Check number formatting
   - Test with large/small amounts

---

## 🐛 Reporting Bugs

### Before Reporting
- Check existing issues
- Verify it's reproducible
- Test on latest version

### Bug Report Template
```markdown
**Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Screenshots**
If applicable

**Environment**
- OS: [e.g., Android 13]
- App Version: [e.g., 0.1.0]
- Device: [e.g., Pixel 6]
```

---

## 💡 Feature Requests

### Feature Request Template
```markdown
**Problem Statement**
What problem does this solve?

**Proposed Solution**
How would you solve it?

**Alternatives Considered**
Other approaches you've thought about

**Additional Context**
Screenshots, mockups, etc.
```

---

## 🧪 Testing

### Manual Testing
- Test on multiple devices
- Test both orientations
- Test with different languages
- Test with different currencies
- Test offline functionality

### Future: Automated Testing
```bash
# Unit tests (coming soon)
npm test

# E2E tests (coming soon)
npm run test:e2e
```

---

## 📞 Getting Help

- **GitHub Issues**: For bugs and features
- **Discussions**: For questions and ideas
- **Email**: dev@rentone.app

---

## 🎉 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Given credit in the app (for major contributions)

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to RentOne! 🙏**
