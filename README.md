# 🚀 Give(a)Go New Tab Extension

## 🌟 Overview

Give(a)Go New Tab is a Chrome extension that replaces your boring default new tab page with a super cool customized dashboard! 😎 Featuring various widgets, including a Spotify integration that shows off your top 3 tunes. 🎵

## ✨ Features

- 🖼️ Custom new tab page for Chrome
- 🎧 Spotify widget showing your top 3 tracks
- [Add any other widgets or features here]

## 🛠️ Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/give-a-go-new-tab.git
   ```
2. Navigate to the project directory:
   ```
   cd give-a-go-new-tab
   ```
3. Install dependencies:
   ```
   npm install
   ```

## 🏃‍♂️ Usage

### 🔬 Development

1. Run the development server:
   ```
   npm start
   ```
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner 🔧
4. Click "Load unpacked" and select the `build` folder in your project directory 📁

### 🚀 Production

1. Build the project:
   ```
   npm run build
   ```
2. The extension will be ready for distribution in the `build` folder 🎉

## 🎵 Spotify Integration

The Spotify widget shows off your top 3 tracks. To use this groovy feature:

1. Create a Spotify Developer account and register your application 🎹
2. Set up your Spotify API credentials:
   - Client ID: Update the `CLIENT_ID` constant in `src/widget/spotify/SpotifyWidget.jsx`
   - Redirect URI: Make sure it matches the one set in your Spotify Developer dashboard

Note: The Spotify integration is optional. If you don't set it up, the widget will just chill there, looking pretty. 😴

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request. Let's make this extension awesome together! 💪

## 📜 License

[Add your chosen license here]

## 📬 Contact

[Your Name] - [Your Email]

Project Link: [https://github.com/yourusername/give-a-go-new-tab](https://github.com/yourusername/give-a-go-new-tab)

Happy browsing! 🌈🦄