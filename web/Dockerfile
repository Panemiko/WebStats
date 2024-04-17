# Use node:latest as base image
FROM node:latest

# Set working directory for web
WORKDIR /app

# Copy web files
COPY . .

# Set environment variable for VITE_SOCKET_ADDRESS
ENV VITE_SOCKET_ADDRESS=https://armageddon-server.cobuilt.in

# Expose port 5173 for web
EXPOSE 5173

# Install pnpm
RUN npm install -g pnpm

# Install dependencies using pnpm
RUN pnpm install

# Command to start the web server
CMD ["pnpm", "vite", "--host"]
