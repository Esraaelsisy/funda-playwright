# Use the official Playwright base image with dependencies
FROM mcr.microsoft.com/playwright:v1.39.0-focal

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install Node.js dependencies
RUN npm install

# Install Playwright browsers
RUN npx playwright install --with-deps

# Copy the rest of the application
COPY . .

# Default command (can be overridden when running the container)
CMD ["npm", "run", "smokeTests:chromium"]