# Build Stage
# ---
FROM node:14 AS builder

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /opt/app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn --immutable
COPY . .
RUN yarn build && \
    rm -rf node_modules && \
    SKIP_POSTINSTALL=1 yarn workspaces focus --production

# Run Stage
# ---
FROM gcr.io/distroless/nodejs:14

USER nobody

COPY --chown=nobody --from=builder /opt/app /opt/app
WORKDIR /opt/app

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ENV NEW_RELIC_NO_CONFIG_FILE true
ENV DIST_MODE 1
ENV PATH /opt/node_app/node_modules/.bin:$PATH

CMD ["dist/cmd/srv/index.js"]
