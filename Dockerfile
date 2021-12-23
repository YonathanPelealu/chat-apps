FROM node:latest
ENV NODE_ENV=local

RUN mkdir /app
WORKDIR /app
COPY ["packegae.json","package-lock.json","./"]
RUN npm install
COPY . .
CMD ["npm","run", "dev-debug-local"]