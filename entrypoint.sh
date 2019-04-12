#!/bin/bash
sed -i 's|ENDPOINT_URL|'"${ENDPOINT_URL}"'|g' /usr/local/tomcat/webapps/ROOT/ep.js
sed -i 's/ADMINPASS/'"${ADMIN_PASS}"'/g' /usr/local/tomcat/conf/tomcat-users.xml
sed -i 's/HOST_NAME/'"${HOST_NAME}"'/g' /usr/local/tomcat/webapps/ep/WEB-INF/connection.properties
sed -i 's/PORT_NUM/'"${PORT_NUM}"'/g' /usr/local/tomcat/webapps/ep/WEB-INF/connection.properties
sed -i 's/DB_PASS/'"${DB_PASS}"'/g' /usr/local/tomcat/webapps/ep/WEB-INF/connection.properties
sed -i 's/DB_USER/'"${DB_USER}"'/g' /usr/local/tomcat/webapps/ep/WEB-INF/connection.properties
sed -i 's/ENDPOINT_URL/'"${ENDPOINT_URL}"'/g' /usr/local/tomcat/webapps/ROOT/ep.js
exec /usr/local/tomcat/bin/catalina.sh run

