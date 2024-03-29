# Build Stage
# ---
FROM node:14 AS builder
WORKDIR /opt/app

COPY package*.json ./
RUN npm install -g npm && \
    npm i --omit optional
COPY . .
RUN npm run build
RUN rm -rf node_modules && npm i --production --ignore-scripts

# Run Stage
# ---
FROM gcr.io/distroless/nodejs:14

USER nobody

COPY --chown=nobody --from=builder /opt/app /opt/app
WORKDIR /opt/app

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ENV PATH /opt/node_app/node_modules/.bin:$PATH

CMD ["dist/index.js"]
