FROM node:18-alpine

# Working directory 
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy your source code
COPY src/ ./src/

# Expose the port 3000
EXPOSE 3000

# Command to run web service
CMD ["node", "src/index.js"]
