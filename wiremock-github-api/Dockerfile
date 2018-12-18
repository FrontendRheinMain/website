FROM openjdk:8-alpine

COPY ./wiremock-standalone-2.19.0.jar /

RUN mkdir /data
CMD java -jar wiremock-standalone-2.19.0.jar --port=8080 --root-dir="/data" --proxy-all="https://api.github.com" --verbose

# Default http port
EXPOSE 9999
