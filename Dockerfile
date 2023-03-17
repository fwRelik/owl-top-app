FROM node:14-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install
ADD . .

# For only git actions
RUN --mount=type=secret,id=ENV_DOMAIN_FILE \
  cat /run/secrets/ENV_DOMAIN_FILE >> .env.local || echo 'bypass'

RUN npm run build
RUN npm prune --production
CMD ["npm", "start"]
EXPOSE 3001