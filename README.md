# Funda Test Automation with Playwright & TypeScript

This repository hosts automated tests for the Funda website, built with Playwright and TypeScript. It adheres to best practices such as the Page Object Model (POM) and Data-Driven Testing (DDT) design patterns, with features like localization support, cookie management, and reusable fixtures for efficient and scalable testing.

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Install Playwright](#3-install-playwright)
  - [4. Install Dotenv](#4-install-dotenv)
  - [5. Set Up Environment Variables](#5-set-up-environment-variables)
- [Test Reporting](#test-reporting)
  - [1. Running Smoke Tests](#1-running-smoke-tests)
  - [2. Running All Tests](#2-running-all-tests)
- [Running Tests](#running-tests)
- [Testing Framework Details](#testing-framework-details)
  - [Data](#data)
  - [Pages](#pages)
  - [Specs](#specs)
  - [Fixtures](#fixtures)
  - [Utilities](#utilities)
- [Test Coverage](#test-coverage)
- [Best Practices](#best-practices)
- [Future Enhancements](#future-enhancements)
- [Additional Notes](#additional-notes)

## Project Structure

```bash
Funda-Playwright
├── data                       # JSON data for localization and testing
├── fixtures                   # Reusable configurations for tests
├── pages                      # Encapsulation of page-specific locators and actions
├── specs                      # Test scripts targeting specific functionalities
├── utilities                  # Helper methods for localization and cookies
├── .env                       # Environment variables (e.g., credentials, user agent)
├── playwright.config.ts       # Playwright configuration file
└── README.md                  # Documentation for the project
```

## Features

- **Page Object Model (POM)**: Encapsulation of locators and actions in the `pages` folder and the test steps in the `specs` folder for modular, reusable, and maintainable code.

- **User-Facing Locators**: The framework emphasizes intuitive locators like getByText and getByRole, enhancing test readability and reliability by targeting visible elements and accessibility attributes.

- **Localization Support**: Dynamically fetch localized text from `localization.json` using the `localizationHelper.ts`, enabling seamless support for multiple languages during testing. This also enhances the flexibility of user-facing locators, making them localized and dynamic to align with real user interactions.

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
     USER_AGENT=your_user_agent
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

### 2. Running All Tests

- **Run All Tests:**

  ```bash
  npx playwright test
  ```

- **Run Specific Tests:**

  ```bash
  npx playwright test specs/loginTests.spec.ts
  ```

## Test Reporting

- After test execution, reports are automatically generated in the playwright-reports/ directory.
- View the latest report using:
  ```bash
  npx playwright show-report
  ```

## Testing Framework Details

### `data`

- Contains JSON files used for testing:
  - **`localization.json`**: Stores localized text for multiple languages to support localization in tests.
  - **`testData.json`**: Holds test-specific data such as user inputs and expected outputs for data-driven testing.

### `pages`

- Implements the **Page Object Model (POM)** by encapsulating web page locators and actions.
- Each file represents a specific page or functionality, ensuring modularity and reusability.

### `specs`

- Contains test scripts written in **TypeScript**.
- Each file focuses on testing a specific functionality or feature of the application.
- Assertions are included in test files for better readability and maintainability.

### `fixtures`

- Provides reusable configurations and setups:
  - **`baseTest.ts`**:
    - Manages **browser contexts** with custom settings like user agents and cookies.
    - Sets up **page initialization**, ensuring all tests start with consistent conditions.
    - Defines shared configurations like environment-specific setups.
  - **`authTest.ts`**:
    - Extends the base test with **authentication-specific setups**.
    - Simplifies tests requiring login by maintaining consistent user sessions.
    - Manages reusable authentication flows for secure and efficient testing.

### `utilities`

- Offers reusable helper methods to streamline test implementations:
  - **`cookieHelper.ts`**: Handles cookie acceptance and management during tests.
  - **`localizationHelper.ts`**: Fetches localized text from `localization.json` for multi-language support.

## Test Coverage

This test suite includes comprehensive test coverage for key functionalities of the Funda website. Below is an overview of the current test coverage, including **7 Smoke Tests**:

#### Login Tests:

- Login with valid credentials:(Smoke Test Group).
- Login with invalid credentials.

#### Search Functionality Tests:

- Search with valid location returns results:(Smoke Test Group).
- Search in Rent with valid location and certain price range returns results:(Smoke Test Group).
- Search with invalid location shows no results message.

#### House Details Page Tests:

- House details page loads successfully:(Smoke Test Group).
- Saving a house to favorites with a logged-in user:(Smoke Test Group).

#### Real Estate Agency Interaction Tests:

- Contact an Agency for a certain house without logging in:(Smoke Test Group).
- Request a Viewing for a certain house without logging in:(Smoke Test Group).

## Best Practices

- Use descriptive names for test scripts and functions to improve readability.
- Keep the `localization.json` and `testData.json` files up to date to ensure accurate and comprehensive test coverage.
- Tag critical tests with `@smokeTests` to enable selective execution of essential test cases for quick validation during development or CI/CD runs.
- Regularly review and update the `.env` file for configuration changes. Ensure `.env` is excluded in `.gitignore` to prevent sensitive data from being exposed.
- Follow the Page Object Model (POM) design for scalability and easier maintenance.

## Future Enhancements

To improve the robustness and scalability of the test automation framework, the following enhancements are planned:

1. **Performance Testing**:

   - Integrate performance testing tools such as Playwright Tracing to validate the application's speed and responsiveness.

2. **Cross-Browser Testing**:

   - Expand support for multiple browsers (e.g., Chrome, Firefox, Safari) on Browserstack to ensure consistent behavior across platforms.

3. **Parallel Test Execution**:

   - Optimize test execution time by implementing parallel testing for UI tests.

4. **Visual Regression Testing**:

   - Integrate visual regression tools to detect unintended UI changes and layout issues.

5. **Localization Expansion**:

   - Increase localization coverage by adding support for additional languages.

6. **CI/CD Pipeline Integration**:

   - Set up a robust CI/CD pipeline to automate test execution, report generation, and deployment validation with every code change and/or production release.

## Additional Notes

- This repository is tailored for the Funda interview assignment. The documentation and code demonstrate
  industry-standard practices for scalable and maintainable test automation.
