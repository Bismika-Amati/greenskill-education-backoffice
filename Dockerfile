FROM node:16-alpine

WORKDIR /app

ARG NEXT_PUBLIC_API_URL="" \
  NEXT_PUBLIC_BASE_URL=""

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
  NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}

COPY --chown=node:node . /app/

RUN apk add bash curl --no-cache \
  && yarn install --frozen-lockfile \
  && yarn build

CMD ["yarn", "start", "-p", "4000"]

EXPOSE 4000
