FROM node:8

# Create main directory
WORKDIR /usr/src/app

# Install main dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./server .

#RUN npm install
# If you are building your code for production
RUN npm install --only=production

# Bundle main source

EXPOSE 4001
CMD [ "npm", "start" ]