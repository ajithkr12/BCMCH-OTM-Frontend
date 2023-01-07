FROM nginx:alpine
COPY ./build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]


# scp -i  "test.pem" -r Frontend/BCMCH-OTM-Frontend/build  ubuntu@ec2-3-82-99-136.compute-1.amazonaws.com:
# sudo docker build -f Dockerfile -t frontend .
# sudo docker run -p 80:3000 --name frontend frontend