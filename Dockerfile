# Build Image
FROM node:16-alpine AS BUILD
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install -f
RUN npm run build

# Build production
FROM node:16-alpine AS PRODUCTION

WORKDIR /app

#COPY --from=BUILD /app/.next/public ./public
COPY --from=BUILD /app/next.config.js ./

# Set mode "standalone" in file "next.config.js"
COPY --from=BUILD /app/.next/standalone ./
COPY --from=BUILD /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]