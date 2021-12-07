FROM alpine/git:v2.32.0 as git

# XXX - The default workdir is a volume and writes get "eaten" away
WORKDIR /snowblossom
ARG GIT_REFSPEC=master
RUN mkdir snowblossom.org \
  && cd snowblossom.org \
  && git init . \
  && git remote add origin https://github.com/snowblossomcoin/snowblossom.org.git \
  && git fetch origin "$GIT_REFSPEC" \
  && git checkout FETCH_HEAD \
  && rm -rf .git/

FROM node:16.13.1-buster-slim as build

COPY --from=git /snowblossom/snowblossom.org/ /snowblossom/snowblossom.org/
WORKDIR /snowblossom/snowblossom.org

RUN npm ci
