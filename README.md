# PrintFlyers - Shop Owner App

A comprehensive React Native mobile application built with Expo for shop owners to manage print orders, track delivery status, and handle customer requests efficiently. This app serves as the shop owner's interface for the PrintFlyers printout delivery service platform.

## 📱 Overview

PrintFlyers Shop Owner App enables shop owners to:
- Receive and manage customer print orders
- Accept or decline incoming orders
- Track order status through various stages (On Process → Ready to Ship → Delivered)
- Manage profile and shop information
- Handle authentication and password recovery

## ✨ Features

### Authentication & Security
- **Login/Sign In**: Secure authentication with username and password
- **Forgot Password**: Password recovery via OTP verification
- **OTP Verification**: 4-digit OTP with resend functionality (30-second timer)
- **Change Password**: Update password from profile settings
- **Password Visibility Toggle**: Show/hide password fields

### Order Management
- **Order Dashboard**: View all incoming print orders
- **Accept/Decline Orders**: Quick action buttons for order handling
- **Order Status Tracking**: 
  - On Process
  - Ready to Ship
  - Delivered to Delivery Person
- **Order History**: View accepted orders in dedicated section
- **Order Details**: Customer information, print details, delivery address, and total cost

### User Interface
- **Side Navigation Menu**: Slide-out menu with smooth animations
- **Profile Management**: View and edit shop owner profile
- **Responsive Design**: Optimized for various screen sizes
- **Modern UI**: Clean, intuitive interface with custom styling

### Additional Features
- **About Us**: Information about the service and policies
- **Customer Care**: Contact information and support details
- **Logout Functionality**: Secure session termination

## 🛠️ Tech Stack

- **Framework**: React Native 0.76.9
- **Platform**: Expo ~52.0.46
- **Navigation**: React Navigation 7.x (Native Stack Navigator)
- **Language**: JavaScript (ES6+)
- **State Management**: React Hooks (useState, useEffect)
- **Animations**: React Native Animated API
- **UI Components**: React Native Core Components

## 📦 Dependencies

### Core Dependencies
- `expo`: ~52.0.46
- `react`: 18.3.1
- `react-native`: 0.76.9
- `@react-navigation/native`: ^7.1.6
- `@react-navigation/native-stack`: ^7.3.10
- `react-native-gesture-handler`: ~2.20.2
- `react-native-reanimated`: ~3.16.1
- `react-native-safe-area-context`: 4.12.0
- `react-native-screens`: ~4.4.0
- `react-native-web`: ~0.19.13

### Development Dependencies
- `@babel/core`: ^7.20.0

## 📁 Project Structure

```
RNWEB/
├── ShopOwner/
│   ├── app/
│   │   ├── login.js              # Login screen
│   │   ├── signin.js              # Registration screen
│   │   ├── forgotpass.js          # Forgot password screen
│   │   ├── otp.js                 # OTP verification screen
│   │   ├── home.js                # Main home screen with order management
│   │   ├── menu.js                # Side navigation menu component
│   │   └── ChangePasswordScreen.js # Change password screen
│   ├── assets/                    # Images, icons, and static assets
│   │   ├── PrintFlyers_logo_4.png
│   │   ├── Home.png
│   │   ├── account_circle.png
│   │   ├── Shopping_cart.png
│   │   └── ... (other assets)
│   ├── App.js                     # Main app component with navigation
│   ├── app.json                   # Expo configuration
│   ├── index.js                   # Entry point
│   └── package.json               # Project dependencies
└── package.json                   # Root package.json
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (for testing)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RNWEB
   ```

2. **Navigate to the ShopOwner directory**
   ```bash
   cd ShopOwner
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the Expo development server**
   ```bash
   npm start
   # or
   expo start
   ```

5. **Run on specific platform**
   ```bash
   # Android
   npm run android
   # or
   expo start --android

   # iOS
   npm run ios
   # or
   expo start --ios

   # Web
   npm run web
   # or
   expo start --web
   ```

## 📱 Usage

### Initial Setup
1. Launch the app
2. If you're a new user, tap "Don't have an account? Signin" to register
3. Fill in your details:
   - User Name
   - Shop Name
   - Address
   - Mobile Number (10 digits)
   - Password
   - Confirm Password
4. Tap "Sign In" to create your account

### Login
1. Enter your username and password
2. Tap "Login" to access the home screen
3. Use "Forgot Password?" if you need to reset your password

### Managing Orders
1. **View Orders**: All incoming orders appear on the Home screen
2. **Accept Order**: Tap "Accept" to move the order to your accepted orders list
3. **Decline Order**: Tap "Decline" to remove the order
4. **Update Status**: 
   - Tap "Update Order Status" on accepted orders
   - Progress through: On Process → Ready to Ship → Delivered
5. **View Order History**: Navigate to "Orders" from the side menu

### Profile Management
1. Open the side menu (tap the menu icon in the header)
2. Select "Profile" to view your information
3. Select "Edit Profile" to modify your details
4. Use "Change Password" to update your password

### Navigation
- Tap the menu icon (☰) in the top-left corner to open the side menu
- Navigate between screens: Home, Profile, Orders, Edit Profile, Customer Care, About Us
- Use the back button or navigation gestures to go back

## 🎨 Screen Details

### Login Screen (`login.js`)
- Username and password input
- Password visibility toggle
- Forgot password link
- Navigation to sign-in screen

### Sign In Screen (`signin.js`)
- User registration form
- Mobile number validation (10 digits)
- Password confirmation
- Navigation to login screen

### Forgot Password Screen (`forgotpass.js`)
- Mobile number input
- OTP request functionality
- Navigation to OTP verification

### OTP Screen (`otp.js`)
- 4-digit OTP input with auto-focus
- Resend OTP with 30-second timer
- New password setup after OTP verification

### Home Screen (`home.js`)
- Order dashboard with incoming orders
- Accept/Decline functionality
- Order status tracking
- Side menu integration
- Profile management views
- About Us and Customer Care sections

### Change Password Screen (`ChangePasswordScreen.js`)
- Old password verification
- New password setup
- Password confirmation

## 🔧 Configuration

### Expo Configuration (`app.json`)
- App name: "ShopOwner"
- Version: 1.0.0
- Orientation: Portrait
- Splash screen and icons configured
- Supports iOS, Android, and Web platforms

## 🧪 Development

### Running in Development Mode
```bash
npm start
```

This will:
- Start the Metro bundler
- Open Expo DevTools in your browser
- Generate a QR code for Expo Go app

### Building for Production
```bash
# Android APK
expo build:android

# iOS IPA
expo build:ios
```

## 📝 Notes

- The app currently uses mock data for orders (see `home.js` for sample orders)
- Mobile number validation requires exactly 10 digits
- OTP functionality includes a 30-second cooldown before resend
- Order status updates follow a sequential workflow
- All password fields support show/hide toggle

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the 0BSD License - see the `package.json` file for details.

## 📧 Support

For support and inquiries:
- Email: printflyer@gmail.com
- Customer Care section available in-app

## 🙏 Acknowledgments

- Built with React Native and Expo
- Navigation powered by React Navigation
- UI components styled with React Native StyleSheet

---

**Version**: 1.0.0  
**Last Updated**: 2025
