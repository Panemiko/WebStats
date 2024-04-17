# Use node:latest as base image
FROM node:latest

# Set working directory for server
WORKDIR /app

# Copy server files
COPY . .

# Set environment variable for DATABASE_URL
ENV DATABASE_URL=file:../../db/database.db

# Expose port 3000 for server
EXPOSE 3000

# Install pnpm
RUN npm install -g pnpm

# Install dependencies using pnpm
RUN pnpm install
RUN pnpm build
RUN pnpm prisma migrate deploy
RUN pnpm prisma generate

# Command to start the server
CMD ["pnpm", "run", "start"]
