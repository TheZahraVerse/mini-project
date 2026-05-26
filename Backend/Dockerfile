  
    FROM python:3.11-slim

    ENV PIP_INDEX_URL "https://package-mirror.liara.ir/repository/pypi/simple"

    WORKDIR /app

  
    RUN pip config set global.index-url https://pypi.doubanio.com/simple/


    COPY requirements.txt .
    RUN pip install --no-cache-dir -r requirements.txt

    COPY . .

   
   CMD python manage.py migrate && python manage.py runserver 0.0.0.0:8000
