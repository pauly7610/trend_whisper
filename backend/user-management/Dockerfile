FROM node:18-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --omit=dev || npm install --omit=dev --legacy-peer-deps
COPY . .
CMD ["node", "index.js"]
