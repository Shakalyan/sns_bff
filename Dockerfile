FROM openjdk:17
COPY . /bff/
WORKDIR /bff/
RUN ./mvnw package
ENTRYPOINT ["java", "-jar", "target/sns_bff-0.0.1-SNAPSHOT.jar"]