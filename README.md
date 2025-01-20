# Funda Test Automation with Playwright & TypeScript

This repository hosts a Whole Framework of automation test suite for Funda website, built with Playwright and TypeScript. It adheres to best practices such as the Page Object Model (POM) and Data-Driven Testing (DDT) design patterns, with features like localization support, cookie management, CI/CD Integration and reusable fixtures for efficient and scalable testing.

## Table of Contents

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
  - [3. Running Smoke Tests With Docker](#3-running-smoke-tests-with-docker)
- [Running Tests](#running-tests)
- [Testing Framework Details](#testing-framework-details)
  - [Data](#data)
  - [Pages](#pages)
  - [Specs](#specs)
  - [Fixtures](#fixtures)
  - [Utilities](#utilities)
- [Test Coverage](#test-coverage)
- [CI/CD Pipeline Integration](#cicd-pipeline-integration)
- [Best Practices](#best-practices)
- [Future Enhancements](#future-enhancements)
- [Additional Notes](#additional-notes)

## Project Structure

```bash
Funda-Playwright
├── .github/workflows          # CI/CD workflow files
│   └── smoke-tests-playwright.yml # GitHub Actions workflow for smoke tests
├── ui-tests                   # Main directory for test implementation
│   ├── data                   # JSON data for localization and testing
│   ├── fixtures               # Reusable configurations for tests
│   ├── pages                  # Encapsulation of page-specific locators and actions
│   ├── specs                  # Test scripts targeting specific functionalities
│   └── utilities              # Helper methods for localization and cookies
├── .env                       # Environment variables (e.g., credentials, user agent)
├── Dockerfile                 # Dockerfile to containerize the testing environment
├── package-lock.json          # Auto-generated file for npm dependency lock
├── package.json               # npm project configuration
├── playwright.config.ts       # Playwright configuration file
└── README.md                  # Documentation for the project
```

## Features

- **Page Object Model (POM)**:

  - Organizes locators and actions in the `pages` folder.
  - Separates test steps in the `specs` folder, ensuring modular, reusable, and maintainable code.

- **User-Facing Locators**:

  - Leverages intuitive locators like `getByText` and `getByRole` for improved test readability and reliability.
  - Focuses on visible elements and accessibility attributes, aligning with **real user interactions**.

- **Localization Support**:

  - Dynamically retrieves localized text from `localization.json` using `localizationHelper.ts`.
  - Enhances the flexibility of user-facing locators by making them localized and dynamic, supporting seamless multi-language testing.

- **Data-Driven Testing**:

  - Centralizes test inputs and expected outputs in `testData.json`.
  - Enables reusability of test logic across different data sets for efficiency and scalability.

- **Reusable Fixtures**:

  - Simplifies test setup by providing shared configurations, such as authentication, browser context, and page initialization.
  - Includes `baseTest.ts` and `authTest.ts` for reusable setups.

- **Headed and Headless Modes**:

  - Supports switching between headed and headless modes based on testing scenarios for added flexibility.

- **Test Grouping with Smoke Tests**:

  - Tags critical test cases with `@smokeTests` for selective execution.
  - Allows quick validation of core functionalities by running smoke tests independently.

- **Cookie Management**:

  - Automates cookie handling with utilities like `acceptCookies()` to maintain consistent setups and session states.

- **Environment Variable Management**:

  - Safeguards sensitive data (e.g., usernames, passwords, configurations) in a `.env` file.
  - Uses the `dotenv` library to securely load environment variables at runtime.

- **Dockerized Test Environment**:

  - The test framework includes a preconfigured **Dockerfile** to build a containerized testing environment
  - Supports running tests in an isolated environment without requiring local dependencies, reducing compatibility issues and ensuring smooth execution.

- **CI/CD Pipeline Integration**:
  - Fully integrated with **GitHub Actions** for automated test execution on every code push or pull request.
  - Automatically builds a Docker image, runs smoke tests, and generates test reports and artifacts.

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

### 3. Running Smoke Tests With Docker

1. Build the Docker Image:

   - Use the included Dockerfile to create a containerized testing environment:

   ```bash
   docker build -t funda-playwright .
   ```

2. Run Tests in Docker:

   - Execute smoke tests in the container:

   ```bash
   docker run --rm \
   -v $(pwd)/playwright-report:/app/playwright-report \
   -e USER_AGENT=your_user_agent \
   -e LANGUAGE=NL \
   -e USERNAME=your_username \
   -e PASSWORD=your_password \
   funda-playwright
   ```

3. View Test Reports:
   - After running the tests, the test reports will be available in the playwright-report/ directory.

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

This test suite includes comprehensive test coverage for key functionalities of the Funda website. Below is an overview of the current test coverage, **10 test scripts including 8 Smoke Tests**:

#### Login Tests:

- Login with valid credentials:(Smoke Test Group).
- Login with invalid credentials.

#### Search Functionality Tests:

- Search with valid location returns results:(Smoke Test Group).
- Search in Rent with valid location and certain price range returns relevant results:(Smoke Test Group).
- Search with invalid location shows no results message.

#### House Details Page Tests:

- House Info are shown correctly in House Details Page:(Smoke Test Group).
- Agency Info are shown correctly in House Details Page:(Smoke Test Group).
- Saving a house to favorites with a logged-in user:(Smoke Test Group).

#### Real Estate Agency Interaction Tests:

- Contact an Agency for a certain house without logging in:(Smoke Test Group).
- Request a Viewing for a certain house without logging in:(Smoke Test Group).

### CI/CD Pipeline Integration

#### **GitHub Actions Workflow**

This project is integrated with **GitHub Actions** for automated testing. The CI/CD pipeline is set up to:

1. **Build Docker Image**:

   - Ensures consistent and isolated testing environments.

2. **Run Smoke Tests**:

   - Executes critical smoke tests to validate core functionalities.

3. **Upload Test Reports and Traces**:
   - Automatically generates and uploads artifacts (HTML reports and trace files) for debugging failed tests.

#### **Example Workflow**

The CI/CD workflow file (`.github/workflows/smoke-tests-playwright.yml`) is already configured and includes:

- Building the Docker image.
- Running smoke tests in the container.
- Generating test artifacts for results and traces.

#### **Trigger Events**

- Tests run automatically on:
  - **Push events** to the `main` or `master` branch.
- **Known Issue:** There is an issue in Github secerts configurations that can't read the secert USER_AGENT, so the CI/CD workflow is currently failing. Need more time to investigate and debug the issue.  

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

6. **Increased Usage of `data-test-id`**:

   - Standardize the use of `data-test-id` attributes for UI elements to improve locator reliability and simplify test maintenance.

7. **CI/CD Pipeline Integration**:

   - Fixing the repo secerts issue and set up a FULL CI/CD pipeline to automate test execution, report generation, and deployment validation with every code change and/or production release.

## Additional Notes

- This repository is tailored for the Funda interview assignment. The documentation and code demonstrate
  industry-standard practices for scalable and maintainable test automation.
