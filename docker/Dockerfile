FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tailwind.config.js ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY postcss.config.js ./
COPY vite.config.ts ./


RUN npm ci

COPY . .

#RUN npm run build

CMD ["npm", "run", "dev"]