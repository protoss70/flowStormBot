FROM registry.gitlab.com/promethistai/system/nginx
COPY app/dist/ /var/www/html
COPY default.conf /etc/nginx/conf.d/
