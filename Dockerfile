FROM node:16-alpine

WORKDIR /app

COPY . .

RUN cp .env.prod.sample .env

# Replace package.json homepage to fit local serve
RUN sed -i 's|https://ktchung.github.io/react-video-watch-list|.|' package.json

RUN yarn install --frozen-lockfile

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
