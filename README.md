# Funda Testing Repo by Playwright & Typescript

This repository contains automated tests for the Funda website using Playwright, following the Page Object Model (POM) pattern. It supports localization, data driven testing and reusable fixtures.

## Project Structure

```bash
Funda-Playwright
├── data                       # JSON data for localization and testing
│   ├── localization.json      # Stores localized text for multiple languages
│   └── testData.json          # Test-specific data such as user inputs and outputs
├── fixtures                   # Fixtures for reusable configurations
│   ├── authTest.ts            # Authentication-related test setups
│   └── baseTest.ts            # Base test fixture for shared configurations
├── pages                      # Page Object Model (POM) files
│   ├── agencyContactPage.ts   # Page object for agency contact functionality
│   ├── homePage.ts            # Page object for homepage functionality
│   ├── houseDetailsPage.ts    # Page object for house details
│   ├── loginPage.ts           # Page object for login functionality
│   ├── pageManager.ts         # Centralized page class management
│   └── searchPage.ts          # Page object for search functionality
├── specs                      # Test scripts
│   ├── agencyContactTests.spec.ts  # Tests for contacting an agency
│   ├── houseDetailsTests.spec.ts   # Tests for house details functionality
│   ├── loginTests.spec.ts          # Login-related tests
│   └── searchTests.spec.ts         # Tests for search functionality
├── utilities                  # Helper utilities for tests
│   ├── cookieHelper.ts        # Handles cookie acceptance
│   └── localizationHelper.ts  # Fetches localized text from JSON
├── .env                       # Environment variables for configuration
├── .gitignore                 # Files and folders to ignore in Git
├── package-lock.json          # npm dependency tree lock file
├── package.json               # Project dependencies and scripts
├── playwright.config.ts       # Playwright configuration file
└── README.md                  # Project documentation
```

## Features

- **Page Object Model (POM)**: Encapsulation of locators and actions for modular, reusable code.
- **Localization Support**: Fetch localized text from `localization.json` using the `localizationHelper.ts`.
- **Data-Driven Testing**: Manage test inputs and expected outputs via `testData.json`.
- **Reusable Fixtures**: Share common setups like authentication and browser context via `baseTest.ts` and `authTest.ts`.
- **Headed and Headless Modes**: Toggle modes through environment variables.

## Prerequisites

- **Node.js** (v18 or later)
- **npm** (Node Package Manager)

## Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Esraaelsisy/funda-playwright.git
   cd Funda-Playwright
   ```

2. **Install dependencies**:

```bash
npm install
```

3. **Install Playwright**:

```bash
npm init playwright@latest
```

4. **Set up environment variables**:
   Create a `.env` file in the root directory:

```env
USER_AGENT=Funda Interviewee/1.0.0 (unique-identifier)
LANGUAGE=NL
USERNAME=your_username
PASSWORD=your_password
```
