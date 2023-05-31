FROM node:16-alpine

WORKDIR /app

ARG NEXT_PUBLIC_API_URL="" \
  NEXT_PUBLIC_BASE_URL="" \
  NEXTAUTH_URL="" \
  NEXTAUTH_SECRET="" 

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
  NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL} \
  NEXTAUTH_URL=${NEXTAUTH_URL} \
  NEXTAUTH_SECRET=${NEXTAUTH_SECRET}

COPY --chown=node:node . /app/

RUN apk add bash curl --no-cache \
  && yarn install --frozen-lockfile \
  && yarn build

CMD ["yarn", "start", "-p", "4000"]

EXPOSE 4000
