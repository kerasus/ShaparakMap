FROM node:16.16.0-alpine as prebuild

# Set working directory
WORKDIR /var/www/app

COPY ./package*.json ./

# Install dependencies
RUN yarn install --production --frozen-lockfile


ARG APP_SERVER=http://ali.hghweb.ir/api
ARG VUEX_PERSISTED_STATE_KEY=vuex
ARG APP_API=/app/api
ARG NGINX_PORT=8081
ARG SSR_PORT=3000
ARG APP_ENV=production

# Copy all files
COPY ./ ./

# Build app on SSR mode
RUN yarn build:ssr


##############################################


FROM node:16.16.0-alpine


COPY --from=prebuild /var/www/app/dist/ssr /var/www/app/dist/ssr

WORKDIR /var/www/app/dist/ssr

RUN yarn install

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The "node" user is provided in the Node.js Alpine base image

USER node

CMD ["node", "/var/www/app/dist/ssr/index.js"]
