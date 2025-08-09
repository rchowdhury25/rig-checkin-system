# rig-checkin-system
A containerized application for implementing checkin/checkout at the rig

Getting SSL certificates.
docker-compose -f docker-compose.deploy.yml run --rm certbot /opt/certify-init.sh

Turning off containers from HTTP
docker-compose -f docker-compose.deploy.yml down

Restarting with HTTPS
docker-compose -f docker-compose.deploy.yml up
