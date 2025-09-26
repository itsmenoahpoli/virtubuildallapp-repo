# Use Node.js image
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production

EXPOSE 9000

ENV NODE_ENV=production

# Create a startup script that runs database setup and then starts the app
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'echo "🚀 Starting VirtuBuild API..."' >> /app/start.sh && \
    echo 'echo "📡 Setting up database..."' >> /app/start.sh && \
    echo 'node dist/scripts/setup-db.js' >> /app/start.sh && \
    echo 'echo "✅ Database setup completed!"' >> /app/start.sh && \
    echo 'echo "🎯 Starting application..."' >> /app/start.sh && \
    echo 'node dist/index.js' >> /app/start.sh && \
    chmod +x /app/start.sh

CMD ["/app/start.sh"]
