FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY frontend/package*.json ./frontend/

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

RUN npm run bundle:client
RUN cd frontend && npm install && cd ..

# Compile typescript
RUN npm run compile
RUN cd frontend && npx ng build && cd ..

RUN npm run migrate

EXPOSE 80
CMD [ "npm", "run", "start" ]
