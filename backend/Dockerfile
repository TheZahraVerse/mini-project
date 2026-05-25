FROM python:3.11-slim

WORKDIR /app

# Use Iranian mirror for pip
RUN pip config set global.index-url https://pypi.doubanio.com/simple/

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENTRYPOINT ["./entrypoint.sh"]