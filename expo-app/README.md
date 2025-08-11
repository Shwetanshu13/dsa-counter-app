# DSA Counter - Expo React Native App

A React Native app built with Expo for tracking daily DSA (Data Structures & Algorithms) problem-solving progress.

## Features

- **User Authentication**: Secure login and registration with Zustand state management
- **Daily Counter**: Track the number of DSA problems solved each day
- **Historical Records**: View past daily records with statistics
- **Protected Routes**: Auth-protected navigation
- **EAS Build Ready**: Configured for production builds

## Tech Stack

- **React Native & Expo**: Cross-platform mobile development
- **Zustand**: State management
- **React Navigation**: Navigation solution
- **Expo Secure Store**: Secure token storage
- **EAS Build**: Production build system

## Setup Instructions

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`
- EAS CLI: `npm install -g eas-cli`

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment variables:

   - Update `.env` file with your backend API URL

   ```
   EXPO_PUBLIC_API_URL=http://your-backend-url:8000
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Building for Production

#### Setup EAS Project

1. Login to EAS:

   ```bash
   eas login
   ```

2. Configure the project:

   ```bash
   eas build:configure
   ```

3. Update `app.json` with your project ID from Expo dashboard

#### Build Commands

- **Android APK**:

  ```bash
  npm run build:android
  ```

- **iOS Build**:

  ```bash
  npm run build:ios
  ```

- **Both Platforms**:
  ```bash
  npm run build:all
  ```

## Project Structure

```
expo-app/
├── App.js                 # Main app component
├── navigation/
│   └── MainNavigator.js   # Navigation setup
├── screens/
│   ├── auth/             # Authentication screens
│   ├── counter/          # Counter screen
│   └── records/          # Records screen
├── store/
│   ├── authStore.js      # Auth state management
│   └── counterStore.js   # Counter state management
├── components/
│   └── SplashScreen.js   # Loading screen
├── assets/               # App assets
├── eas.json             # EAS build configuration
└── app.json             # Expo configuration
```

## API Integration

The app integrates with the backend API for:

- User registration and authentication
- Counter increment operations
- Fetching current counter values
- Retrieving historical daily records

## State Management

Uses Zustand for:

- **Auth Store**: User authentication, login/logout, session management
- **Counter Store**: Counter operations, records fetching

## Security

- User tokens stored securely using Expo Secure Store
- Input validation on all forms
- Secure API communication

## Development

### Running on Device

1. Install Expo Go app on your mobile device
2. Scan QR code from `npm start` command
3. App will load on your device

### Local Development

- Backend should be running on `http://localhost:8000`
- Update `.env` file accordingly for different environments

## Deployment Notes

- Configure bundle identifiers in `app.json` for your organization
- Update EAS project ID in `app.json`
- Ensure backend API is accessible from production builds
- Test builds thoroughly before production release

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx expo start --clear`
2. **Build failures**: Check EAS build logs for detailed error messages
3. **API connection**: Verify backend URL and network connectivity
4. **Navigation issues**: Ensure all required navigation dependencies are installed

### Debug Commands

```bash
# Clear Expo cache
npx expo start --clear

# Check EAS build status
eas build:list

# View build logs
eas build:view [BUILD_ID]
```
