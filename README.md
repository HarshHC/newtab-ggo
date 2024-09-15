# 🚀 Give(a)Go New Tab Extension

## 🌟 Overview

Give(a)Go New Tab is a Chrome extension that replaces your boring default new tab page with a super cool customized dashboard! 😎 Featuring various widgets, including a Spotify integration that shows off your top 3 tunes. 🎵

Feel free to make it your own by easily adding more widgets.

## ✨ Features

### Smart Search
- 🔍 new tab search bar that defaults to chatGPT
- 🦾 Press 'g' and 'space' to send your queries to chatGPT from anywhere in Chrome

### Widgets
- 🖼️ Custom new tab page for Chrome
- 🎧 Spotify widget showing your top 3 tracks
- 😆 Dev Joke Generator
- ☁️ Weather widget
- 🌓 Dark Mode
  

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
<img width="1706" alt="Screenshot 2024-09-15 at 3 21 51 PM" src="https://github.com/user-attachments/assets/ec578780-dd22-4871-bcab-faabae36e476">



### 🔬 Development

1. Run the development server:
   ```
   npm run start
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

## 📬 Contact

[Sanat] - [sanat.thukral@gmail.com]
[Harsh] - [harshchandrahc5@gmail.com]

Substack- [giveago.substack.com](https://giveago.substack.com)
Project Link: [https://github.com/yourusername/give-a-go-new-tab](https://github.com/HarshHC/give-a-go-new-tab)

Happy browsing! 🌈🦄
