# DOMMA: Dompet Mahasiswa (Student Wallet)

...

## Overview

DOMMA (Dompet Mahasiswa) is a financial management application designed specifically for students to help them manage their finances effectively. It provides tools for tracking expenses, setting budgets, analyzing spending patterns, and even offers stock investment recommendations based on financial reports.

## Features

- **User Authentication**: Secure login and registration system
- **Dashboard Overview**: At-a-glance view of financial summary and recent activities
- **Transaction Management**: Add, view, and categorize income and expenses
- **Budget Planning**: Create and track budgets by categories
- **Financial Challenges**: Join challenges to improve financial habits
- **Stock Analysis**: Upload financial reports (PDF) for AI-powered stock investment recommendations
- **Spending Predictions**: AI predictions for future spending based on historical patterns
- **Mobile-responsive Design**: Works seamlessly across all device sizes

## Tech Stack

- **Frontend Framework**: Vue.js with Nuxt.js
- **Styling**: TailwindCSS
- **State Management**: Vue Composition API with reactive stores
- **Authentication**: JWT-based authentication
- **API Integration**: RESTful API consumption
- **Data Visualization**: Charts and progress indicators
- **PDF Processing**: Integration with backend PDF analysis service

## Requirements

- **Node.js v22.14.0 or higher**
- npm
- Modern web browser

> ⚠️ The project **does not work reliably** on Node.js 20.x or below. Make sure you're using **Node.js v22.14.0+** before proceeding.

You can use tools like [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions:

```bash
nvm install 22.14.0
nvm use 22.14.0
```

## Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/domma-app/frontend.git
   cd domma-app/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the frontend directory with the following variables:

   ```
   NUXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
   NUXT_PUBLIC_GEMINI_API_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
   NUXT_GEMINI_API_KEY="<YOUR_GEMINI_API_KEY>"
   NUXT_PUBLIC_STOCK_API_URL=https://your-stock-api-url
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Building for Production

```bash
# Generate static files
npm run generate

# Build for production and launch server
npm run build
npm run start
```

## Deployment

The application is configured for deployment on Netlify. To deploy:

1. Push your code to a Git repository (GitHub, GitLab, BitBucket)
2. Connect your repository to Netlify
3. Configure the build settings:
   - Build command: `npm run generate`
   - Publish directory: `dist`
4. Set up environment variables in Netlify dashboard
5. Deploy!

## Project Structure

```
frontend/
├── assets/          # Static assets like images, fonts
├── components/      # Vue components
│   ├── dashboard/   # Dashboard-specific components
│   └── ...
├── composables/     # Vue composables for reusable logic
├── layouts/         # Page layouts
├── pages/           # Application pages (automatically routed)
├── plugins/         # Vue plugins
├── public/          # Public static files
├── services/        # API services
│   └── api/         # API clients
├── stores/          # State management stores
├── types/           # TypeScript type definitions
├── .env             # Environment variables
└── nuxt.config.js   # Nuxt.js configuration
```

## API Integration

The application interacts with several backend services:

1. **Authentication API**: User registration, login, and profile management
2. **Transaction API**: CRUD operations for financial transactions
3. **Budget API**: Managing budget categories and limits
4. **Stock Analysis API**: Financial report analysis and recommendation
5. **Challenge API**: Financial challenges and goals

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

For backend documentation, please refer to the [backend README](../backend/README.md).

For any questions or issues, please open an issue in the repository or contact the development team.
