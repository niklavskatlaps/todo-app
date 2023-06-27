FROM node:18-alpine as base
WORKDIR /usr/app

FROM base AS setup
COPY package*.json .
RUN npm ci
COPY . .

FROM base AS build
COPY --from=setup /usr/app .
RUN npm run build
RUN npm prune --production

FROM base as dev
COPY --from=setup /usr/app .
CMD ["npm", "run", "start"]

FROM base as production
COPY --from=build /usr/app/node_modules ./node_modules
COPY --from=build /usr/app/dist ./src
CMD ["node", "src/index.js"]
