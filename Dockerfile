FROM node:4.1.2

WORKDIR /opt/static-ip-proxy

COPY build /opt/static-ip-proxy

RUN cd /opt/static-ip-proxy; npm install

EXPOSE 8080
EXPOSE 8081

CMD ["node","index.js"]