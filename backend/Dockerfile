FROM node:24-alpine AS frontend-builder
LABEL maintainer="rajarshi.chowdhury@hpinc.com"

WORKDIR /web/frontend
COPY frontend/package.json frontend/package-lock.json frontend/vite.config.js frontend/index.html ./
COPY frontend/public ./public
COPY frontend/src ./src

RUN npm ci
RUN npm run build


FROM python:3.13-alpine3.22
ENV PYTHONUNBUFFERED=1
WORKDIR /web

COPY backend/manage.py .
COPY backend/myproject ./myproject
COPY backend/checkin ./checkin
COPY backend/scripts/run.sh /run.sh
COPY backend/requirements.txt /requirements.txt

RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apk add --update --no-cache postgresql-client && \
    apk add --update --no-cache --virtual .tmp-deps \
        build-base postgresql-dev musl-dev linux-headers && \
    /py/bin/pip install -r /requirements.txt && \
    apk del .tmp-deps && \
    adduser --disabled-password --no-create-home web && \
    mkdir -p /web/staticfiles && \
    mkdir -p /web/templates && \
    chown -R web:web /web && \
    chmod -R 755 /web && \
    chmod  +x /run.sh

COPY --from=frontend-builder /web/frontend/dist/ /web/staticfiles/
COPY --from=frontend-builder /web/frontend/public /web/staticfiles
COPY --from=frontend-builder /web/frontend/dist/index.html /web/templates/index.html

ENV PATH="/scripts:/py/bin:$PATH"
USER web
CMD ["/run.sh"]