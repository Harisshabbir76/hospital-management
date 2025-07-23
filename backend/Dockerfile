# Use Node.js LTS version
FROM node:lts

# Set working directory
WORKDIR /app

# Set environment variable
ENV PORT=5000

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Expose app port
EXPOSE 5000

# Start server
CMD ["node", "server.js"]
