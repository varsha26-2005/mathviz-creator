FROM python:3.11-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential pkg-config \
    libcairo2-dev libpango1.0-dev \
    ffmpeg \
    texlive texlive-latex-extra texlive-fonts-extra texlive-latex-recommended \
    texlive-science texlive-fonts-recommended tipa \
    git curl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN pip install --no-cache-dir \
    manim==0.18.1 \
    fastapi==0.115.0 \
    "uvicorn[standard]==0.30.6" \
    pydantic==2.9.2

COPY app.py /app/app.py

# HF Spaces require port 7860
ENV PORT=7860
EXPOSE 7860

# HF Spaces writes only /tmp and /data are writable
ENV MANIM_MEDIA_DIR=/tmp/media

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
