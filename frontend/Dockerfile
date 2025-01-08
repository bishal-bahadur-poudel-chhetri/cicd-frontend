# Stage 1: Build
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
ARG REACT_APP_API_URL=http://localhost/api
ENV REACT_APP_API_URL=http://backend-service:5000
COPY . .
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Add non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Grant necessary permissions
RUN mkdir -p /var/cache/nginx /var/run/nginx && \
    chown -R appuser:appgroup /var/cache/nginx /var/run/nginx

# Disable PID file in NGINX configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Switch to non-root user
USER appuser

# Copy built React files
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start NGINX without writing a PID file
CMD ["nginx", "-g", "daemon off; pid /dev/null;"]
