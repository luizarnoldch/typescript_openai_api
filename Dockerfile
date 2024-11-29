# Base image
FROM node:22

# Set the working directory
WORKDIR /usr/app

# Copy the rest of the application
COPY . .

# Install dependencies
RUN npm install

# # Compile TypeScript
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm","start"]