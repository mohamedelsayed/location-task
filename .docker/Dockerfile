FROM node:14
WORKDIR /var/www
COPY .docker/start.sh /usr/local/bin/start
RUN chmod u+x /usr/local/bin/start
CMD ["/usr/local/bin/start"]
