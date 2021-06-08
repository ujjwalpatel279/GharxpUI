# First Container
FROM node:14.4-alpine AS builder
# Create work area
WORKDIR /app
# Copy configs
# COPY /package*.json ./
COPY . .
RUN rm ./.env
COPY /.env.production ./.env
# Install all require components
RUN npm install --silent --production
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm i typescript
# Copy code
COPY src/ src/
# COPY public/* public/
# compile project for production
RUN npm rebuild node-sass
RUN npm run prod

# Second Container
FROM node:14.4-alpine
# Create work area
WORKDIR /app
# Install global serve tool
RUN yarn global add serve
# Copy compiled code
COPY --from=builder /app/dist .
COPY --from=builder /app/src/config.sh .
COPY --from=builder /app/src/config.js .
COPY --from=builder /app/docker-entrypoint.sh .
RUN ls
EXPOSE 80
# serve code
ENTRYPOINT ["/bin/ash", "./docker-entrypoint.sh"]
