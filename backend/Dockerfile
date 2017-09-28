FROM python:3
ENV PYTHONUNBUFFERED 1
RUN  export DEBIAN_FRONTEND=noninteractive
ENV  DEBIAN_FRONTEND noninteractive

RUN mkdir /code

WORKDIR /code

ADD requirements.txt /code/
RUN pip install -r requirements.txt

ADD ./bin /bin/

ADD . /code/

RUN adduser --disabled-password --gecos '' ggzrbntrn

EXPOSE 8000