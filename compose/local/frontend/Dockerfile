FROM node:16

COPY ./compose/local/frontend/start /start-frontend
RUN sed -i 's/\r$//g' /start-frontend
RUN chmod +x /start-frontend
