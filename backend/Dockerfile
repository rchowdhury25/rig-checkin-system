FROM node:24-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json frontend/vite.config.js frontend/index.html ./
COPY frontend/public ./public
COPY frontend/src ./src

RUN npm ci
RUN npm run build


FROM python:3.11-slim
ENV PYTHONUNBUFFERED=1
WORKDIR /app

COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/manage.py .
COPY backend/myproject ./myproject
COPY backend/checkin ./checkin

RUN mkdir -p /app/staticfiles
COPY --from=frontend-builder /app/frontend/dist /app/staticfiles
RUN mkdir -p /app/templates
COPY --from=frontend-builder /app/frontend/dist/index.html /app/templates/index.html

RUN python -B manage.py collectstatic --noinput
EXPOSE 8000
CMD ["gunicorn", "myproject.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]