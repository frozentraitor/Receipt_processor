# 1) Start from the official Node.js 18 Alpine image (small footprint)
FROM node:18-alpine

# 2) Set working directory inside the container
WORKDIR /app

# 3) Copy dependency manifests and install production deps
COPY package.json package-lock.json ./
RUN npm ci --only=production

# 4) Copy your source code
COPY src/ ./src/

# 5) Expose the port your app listens on
EXPOSE 3000

# 6) Default command to run your server
CMD ["node", "src/index.js"]
