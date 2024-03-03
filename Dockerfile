# Stage 1 - Build 
FROM node:alpine as build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Build the app
RUN npm run build


# Stage 2 - Deploy
FROM node:alpine 

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install --omit=dev

# Copy the dist folder from the previous stage
COPY --from=build /usr/src/app/dist dist

# Add metadata to the image
LABEL org.opencontainers.image.source=https://github.com/peopleteamio/member-service
LABEL org.opencontainers.image.description="A Docker image built from the member-service repository."
LABEL org.opencontainers.image.licenses=MIT

# Expose app port 
EXPOSE 3000

CMD ["npm", "start"]