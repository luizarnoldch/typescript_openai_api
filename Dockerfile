# Base image
FROM node:22

# Set the working directory
WORKDIR /usr/app

# Copy NPM package
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the specific files and directories
COPY ./dist ./dist

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
