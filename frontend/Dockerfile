# Nginx가 브라우저에 제공할 build 파일을 생성하는 단계
FROM node:alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

# Nginx를 가동
FROM nginx
EXPOSE 3000

# 로컬의 default.conf 파일을 컨테이너 내부로 복사
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# builder에서 만든 build 파일을 컨테이너 내부로 복사
COPY --from=builder /app/build /usr/share/nginx/html