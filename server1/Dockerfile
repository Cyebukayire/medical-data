FROM tomcat:9.0

RUN ["rm", "-fr", "/usr/local/tomcat/webapps/ROOT"]

COPY mywebapp.war /usr/local/tomcat/webapps/myapp.war

EXPOSE 8080

CMD ["catalina.sh", "run"]
