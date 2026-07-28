# Chef Claude

A React-based cooking assistant powered by AI. This application helps you discover recipes, get cooking advice, and manage your culinary questions through an interactive chat interface.

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/RaiyanMatadar/chefClaude.git
   cd chefClaude
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root with your API keys:

   ```env
   VITE_ANTHROPIC_API_KEY=your_anthropic_api_key
   VITE_HUGGINGFACE_API_KEY=your_huggingface_api_key
   ```

   > **Note:** API keys are required for the AI features to work. Obtain keys from [Anthropic](https://console.anthropic.com/) and [Hugging Face](https://huggingface.co/settings/tokens).

## Running Locally

### Development Server

Start the Vite development server with hot module replacement:

```bash
npm run dev
```

This starts the app at `http://localhost:5173` by default.

### Other Commands

| Command              | Description                                  |
| -------------------- | -------------------------------------------- |
| `npm run dev`        | Start the development server                 |
| `npm run build`      | Build the app for production to the `dist/` folder |
| `npm run preview`    | Preview the production build locally         |
| `npm start`          | Alias for `npm run dev`                      |

## Tech Stack

- **Framework:** React 19 (RC)
- **Build Tool:** Vite
- **AI/ML:** Anthropic Claude API, Hugging Face Inference
- **Styling:** Custom CSS (index.css)
- **Markdown Rendering:** react-markdown

## Project Structure

```
chefClaude/
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # React components
│   ├── App.jsx          # Main application component
│   ├── index.css        # Global styles
│   └── main.jsx         # Application entry point
├── .gitignore
├── index.html           # HTML template
├── package.json         # Project metadata and dependencies
├── vite.config.js       # Vite configuration
└── readme.md            # This file
```

## Building for Production

To create a production-ready build:

```bash
npm run build
```

The output will be in the `dist/` directory. You can preview it locally with:

```bash
npm run preview