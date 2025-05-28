# EasyIo.tech - Simplifying Technology

A modern technology platform dedicated to making innovation accessible, sustainable, and meaningful for everyone. From IoT and automation to student empowerment and business solutions.

## Recent Improvements

### Authentication Enhancements
- Strengthened authentication fallback mechanism to ensure seamless user experience even during connectivity issues
- Added session refresh functionality to maintain authentication state
- Implemented proper error handling for authentication failures
- Added window focus event listener to refresh authentication state when user returns to the application

### Error Handling
- Standardized error handling across the application
- Improved user-friendly error messages
- Added structured error logging with context
- Enhanced error type definitions for better debugging

### Type Safety
- Replaced generic 'any' types with proper type definitions
- Added specific interfaces for data transfer objects
- Improved type safety in authentication context

### Security
- Moved API keys to environment variables
- Added .env.example template for proper environment configuration
- Updated .gitignore to prevent sensitive information from being committed

## Environment Setup

1. Copy the `.env.example` file to `.env`:
   ```
   cp .env.example .env
   ```

2. Update the `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

## Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

## Authentication Flow

The application uses a robust authentication system with fallback mechanisms:

1. Primary authentication through Supabase Auth
2. Fallback to localStorage when Supabase is unavailable
3. Automatic session refresh on window focus
4. Standardized error handling for auth failures

## Error Handling

Errors are processed through the standardized error handler in `src/lib/utils/error-handler.ts` which:

1. Categorizes errors by type (database, auth, etc.)
2. Provides user-friendly messages
3. Includes helpful hints for resolution
4. Logs detailed error information for debugging

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f0b8f881-8210-4ba2-b76c-67ea86ee11e5) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f0b8f881-8210-4ba2-b76c-67ea86ee11e5) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
