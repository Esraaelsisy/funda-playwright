# Funda Testing Repo by Playwright & Typescript

This repository contains automated tests for the Funda website using Playwright and Typescript, following the Page Object Model (POM), Data Driven Testing (DDT) design patterns. It supports localization, handling cookies, and reusable fixtures.

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#1-clone-the-repository)
  - [Install Dependencies](#2-install-dependencies)
  - [Install Playwright](#3-install-playwright)
  - [Install Dotenv](#4-install-dotenv-for-managing-environment-variables)
  - [Set Up Environment Variables](#5-set-up-environment-variables)
- [Running Tests](#running-tests)
  - [1. Running Smoke Tests](#1-running-smoke-tests)
  - [2. Running All Tests](#2-running-all-tests)

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

- **Page Object Model (POM)**: Encapsulation of locators and actions in the `pages` folder and the test steps in the `specs` folder for modular, reusable, and maintainable code.
- **Localization Support**: Dynamically fetch localized text from `localization.json` using the `localizationHelper.ts`, enabling seamless support for multiple languages during testing.
- **Data-Driven Testing**: Manage test inputs and expected outputs efficiently using `testData.json`, allowing the same test logic to run against different data sets.
- **Reusable Fixtures**: Simplify test setup by sharing common configurations such as authentication, browser context, and page initialization through `baseTest.ts` and `authTest.ts`.
- **Headed and Headless Modes**: Easily switch between headed and headless modes. This flexibility supports different testing scenarios.
- **Grouping with Smoke Tests**: Identify and tag critical test cases (`@smokeTests`) to group them as smoke tests. These tests can be run selectively for quick validations of core functionalities.
- **Handling Cookies**: Automate cookie handling with utilities like `acceptCookies()` to ensure consistent setups and maintain session states during tests.
- **Environment Variable Management**: Securely isolate sensitive data, such as usernames, passwords, and configurations, in a `.env` file. The `dotenv` library is used to load these variables during runtime, ensuring security and ease of configuration.

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

4. **Install dotenv (for managing environment variables)**:

   ```bash
   npm install dotenv
   ```

5. **Set up environment variables**:

   - Create a `.env` file in the root directory:

     ```env
     USER_AGENT=Funda Interviewee/1.0.0 (unique-identifier)
     LANGUAGE=NL
     USERNAME=your_username
     PASSWORD=your_password
     ```

## Running Tests

### 1. Running Smoke Tests

- **Headless Mode (default):**

  ```bash
  npm run smokeTests
  ```

- **Headed Mode:**

  ```bash
  HEADLESS=false npm run smokeTests
  ```

- **On Specific browser(chromium, firefox, webkit):**

  ```bash
  npm run smokeTests:chromium
  ```

- **View Test Report:**

  - After running tests, open the HTML report:

  ```bash
  npx playwright show-report
  ```

### 2. Running All Tests

- **Run All Tests:**

  ```bash
  npx playwright test
  ```
- **Run Specific Tests:**

  ```bash
  npx playwright test specs/loginTests.spec.ts
  ```

    
