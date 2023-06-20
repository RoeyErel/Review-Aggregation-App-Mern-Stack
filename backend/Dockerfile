# Pull Docker Hub base image
FROM node:latest
# Set working directory
WORKDIR /usr/app
# Install app dependencies
COPY package*.json ./
RUN npm install --y
# Copy app to container
COPY . .
# Run the "dev" script in package.json
CMD ["npm","start"]
