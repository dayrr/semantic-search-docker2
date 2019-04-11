#######################################
# Dockerfile for semantic-search      #
# H2020 Candela                       #
# tomcat 8.0.23                       #
# strabon 3.3.2                       #
# semantic-search 1.0                 #
#######################################
FROM tomcat:8.0
LABEL maintainer='Ba Huy Tran <ba-huy.tran@irit.fr>'
LABEL authors='Ba Huy Tran <ba-huy.tran@irit.fr>'
ENV PORT 8080
ENV JAVA_OPTS="-XX:PermSize=2048m -XX:MaxPermSize=2048m -Xms2048m -Xmx2048m"
RUN ["rm", "-fr", "/usr/local/tomcat/webapps/ROOT/*"]
COPY ./web/*.* /usr/local/tomcat/webapps/ROOT/
COPY ./tomcat-users.xml /usr/local/tomcat/conf/
COPY ep.war /usr/local/
RUN unzip -d /usr/local/tomcat/webapps/ep /usr/local/ep.war

EXPOSE $PORT

COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
CMD ["/entrypoint.sh"]

