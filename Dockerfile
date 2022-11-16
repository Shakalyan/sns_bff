FROM openjdk:17
ADD /target/sns_bff-0.0.1-SNAPSHOT.jar /bff/bff.jar
WORKDIR /bff/
ENTRYPOINT ["java", "-jar", "bff.jar"]