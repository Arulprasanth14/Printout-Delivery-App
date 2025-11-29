# Printflyers - Mobile Printing Service App

A comprehensive React Native mobile application built with Expo for ordering printing services including printouts, photocopies, lamination, and spiral binding. The app provides a seamless user experience for customers to place orders, track their status, and make payments.

## 📱 Overview

Printflyers is a mobile application that connects customers with printing services. Users can order various printing services, track their orders, manage their profile, and make secure payments through UPI integration. The app delivers high-quality printouts to customers' doorsteps within 2-4 hours.

## ✨ Features

### Core Functionality
- **User Authentication**
  - User registration with email, mobile, and address
  - Secure login with email and password
  - Password visibility toggle
  - OTP verification support
  - Password recovery functionality

- **Printing Services**
  - **Printouts**: Customizable print orders with options for:
    - Paper sizes (A4, A3, A2, A5)
    - Color options (Black & White, Color)
    - Paper types (Standard, Thick/Matte, Glossy, Textured)
    - Single/Double side printing
    - Multiple copies (1-20)
    - File attachment support
  
  - **Photocopies**: Quick photocopy service ordering
  - **Lamination**: Document lamination services
  - **Spiral Binding**: Spiral binding services for documents

- **Order Management**
  - View all orders with status tracking
  - Order status indicators (Order Created, Owner Accepted, Payment Waiting, Printing in Process)
  - Order history with total amount calculation
  - Real-time order updates

- **Payment Integration**
  - Multiple payment options:
    - UPI payment
    - Google Pay integration
    - Paytm integration
  - Secure payment processing
  - Invoice generation with GST calculation
  - Delivery fee calculation

- **User Profile**
  - Edit profile information
  - Update name, email, mobile, and address
  - Profile picture support
  - Logout functionality

- **Additional Features**
  - Dashboard with customer service access
  - Service information and policies
  - Order tracking
  - Invoice viewing
  - Bottom navigation for easy access
  - Dark/Light theme support

## 🛠️ Tech Stack

### Frontend
- **React Native** (v0.76.9)
- **Expo** (~52.0.46)
- **Expo Router** (~4.0.20) - File-based routing
- **TypeScript** (^5.3.3)
- **React Navigation** (v7.x) - Navigation library

### Key Dependencies
- `@react-navigation/native` - Navigation core
- `@react-navigation/bottom-tabs` - Tab navigation
- `@react-navigation/native-stack` - Stack navigation
- `axios` (^0.27.2) - HTTP client for API calls
- `@react-native-async-storage/async-storage` - Local storage
- `expo-document-picker` - File picker
- `expo-haptics` - Haptic feedback
- `react-native-paper` - Material Design components
- `react-native-vector-icons` - Icon library
- `razorpay` (^2.9.6) - Payment gateway integration

### Development Tools
- **Jest** - Testing framework
- **TypeScript** - Type safety
- **ESLint** - Code linting

## 📁 Project Structure

```
MyAwesomeApp/
├── app/                          # Main application directory
│   ├── _layout.tsx              # Root layout with navigation
│   ├── (tabs)/                  # Tab-based screens
│   │   ├── _layout.tsx          # Tab layout configuration
│   │   ├── index.tsx            # Entry page (splash screen)
│   │   ├── User_Home.tsx        # Home screen with services
│   │   ├── dashboard.tsx        # Dashboard modal
│   │   ├── explore.tsx           # Explore tab
│   │   ├── user_registration.tsx # User registration
│   │   ├── user_sign_in.tsx     # User login
│   │   ├── user_forget_password.tsx # Password recovery
│   │   ├── user_otp_verify       # OTP verification
│   │   ├── user_service.tsx     # Service information
│   │   ├── user_printout.tsx    # Printout ordering
│   │   ├── user_photocopy.tsx   # Photocopy ordering
│   │   ├── user_lamination.tsx  # Lamination ordering
│   │   ├── user_sprial.tsx      # Spiral binding ordering
│   │   ├── user_order.tsx       # Order history
│   │   ├── user_invoice.tsx     # Invoice view
│   │   ├── user_payment.tsx     # Payment screen
│   │   └── user_edit_profile.tsx # Profile management
│   └── +not-found.tsx           # 404 page
├── assets/                       # Static assets
│   ├── fonts/                   # Custom fonts
│   └── images/                  # Image assets
├── components/                   # Reusable components
│   ├── ui/                      # UI components
│   ├── ThemedText.tsx          # Themed text component
│   ├── ThemedView.tsx          # Themed view component
│   └── ...
├── context/                      # React Context
│   └── userContext.tsx         # User state management
├── constants/                    # Constants
│   └── Colors.ts               # Color definitions
├── hooks/                        # Custom hooks
│   ├── useColorScheme.ts       # Theme hook
│   └── useThemeColor.ts        # Theme color hook
├── App.tsx                      # Main app component
├── app.json                     # Expo configuration
├── package.json                 # Dependencies
└── tsconfig.json                # TypeScript configuration
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac) or Android Studio (for Android development)
- Expo Go app on your mobile device (for testing)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MyAwesomeApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on specific platform**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## ⚙️ Configuration

### API Configuration

The app requires a backend API server. Update the API endpoints in the following files:

- `app/(tabs)/user_registration.tsx` - Registration API
- `app/(tabs)/user_sign_in.tsx` - Login API
- `app/(tabs)/user_printout.tsx` - Order creation API
- `app/(tabs)/user_order.tsx` - Orders fetching API

**Current API Base URL**: `http://192.168.200.134:5000` (Update this to your backend server)

### Environment Variables

Create a `.env` file in the root directory (if needed):
```
API_BASE_URL=http://your-api-url:5000
RAZORPAY_KEY_ID=your_razorpay_key
```

### Expo Configuration

The `app.json` file contains Expo-specific configuration:
- App name: "MyAwesomeApp"
- Version: 1.0.0
- Orientation: Portrait
- Icon and splash screen configurations

## 📱 Usage

### For Users

1. **Registration/Login**
   - Open the app
   - Register with email, mobile, password, and address
   - Or sign in with existing credentials

2. **Placing an Order**
   - Navigate to Home screen
   - Select a service (Printout, Photocopy, Lamination, or Spiral Binding)
   - Configure service options
   - Attach files (for printouts)
   - Review invoice
   - Make payment via UPI

3. **Tracking Orders**
   - Navigate to Orders tab
   - View all orders with status
   - Check total amount and order details

4. **Managing Profile**
   - Go to Profile screen
   - Edit personal information
   - Update address and contact details

### For Developers

1. **Development Mode**
   ```bash
   npm start
   ```
   - Opens Expo DevTools
   - Scan QR code with Expo Go app
   - Or press `i` for iOS simulator, `a` for Android emulator

2. **Testing**
   ```bash
   npm test
   ```

3. **Linting**
   ```bash
   npm run lint
   ```

## 🔌 API Integration

### Endpoints Used

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User authentication
- `POST /api/orders/orders` - Create new order
- `GET /api/orders/` - Fetch all orders

### API Request Format

**Registration:**
```json
{
  "name": "string",
  "email": "string",
  "mobile": "string",
  "password": "string",
  "confirmPassword": "string",
  "address": "string"
}
```

**Login:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Order Creation:**
```json
{
  "userId": "string",
  "orderType": "printout|photocopy|lamination|spiral",
  "details": {
    "size": "a4|a3|a2|a5",
    "colorType": "black_and_white|colour",
    "paperType": "standard|thick_matte|glossy|textured",
    "sideType": "single|double",
    "copies": "number",
    "filePath": "string"
  }
}
```

## 🎨 UI/UX Features

- **Modern Design**: Clean and intuitive interface
- **Responsive Layout**: Adapts to different screen sizes
- **Theme Support**: Light and dark mode support
- **Haptic Feedback**: Enhanced user interaction
- **Smooth Navigation**: Tab and stack navigation
- **Loading States**: Activity indicators for async operations
- **Error Handling**: User-friendly error messages

## 🔐 Security Features

- Password visibility toggle
- Secure password storage (via backend)
- Input validation
- API error handling
- Secure payment processing

## 📦 Build & Deployment

### Building for Production

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Configure EAS**
   ```bash
   eas build:configure
   ```

3. **Build for platforms**
   ```bash
   # iOS
   eas build --platform ios
   
   # Android
   eas build --platform android
   ```

4. **Submit to app stores**
   ```bash
   eas submit --platform ios
   eas submit --platform android
   ```

## 🧪 Testing

Run tests with:
```bash
npm test
```

The project uses Jest with `jest-expo` preset for testing React Native components.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 📞 Support

For support, email printflyer@gmail.com or contact customer service through the app.

## 🗺️ Roadmap

- [ ] Push notifications for order updates
- [ ] Real-time order tracking
- [ ] Multiple payment gateway support
- [ ] File upload functionality
- [ ] Order cancellation feature
- [ ] Rating and review system
- [ ] Referral program
- [ ] Multi-language support

## 📄 Version History

- **v1.0.0** (Current)
  - Initial release
  - User authentication
  - Order placement
  - Payment integration
  - Profile management

## 🙏 Acknowledgments

- Expo team for the excellent framework
- React Native community
- All contributors and testers

---

**Note**: This app requires a backend API server to function properly. Make sure to configure the API endpoints before running the application.

