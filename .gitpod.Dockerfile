FROM gitpod/workspace-full

USER root

RUN apt-get update && apt-get -y install apache2 php libapache2-mod-php php-curl php-gd php-mbstring php-xml php-xmlrpc

RUN echo "include /workspace/lamp/apache/apache.conf" > /etc/apache2/apache2.conf
RUN echo ". /workspace/lamp/apache/envvars" > /etc/apache2/envvars

RUN chown gitpod:gitpod /var/run/apache2 /var/lock/apache2

RUN addgroup gitpod www-data