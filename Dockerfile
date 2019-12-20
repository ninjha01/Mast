FROM continuumio/miniconda3

RUN yes | apt-get update
RUN yes | apt-get install python3 python3-pip build-essential python-dev python3-dev libgl1-mesa-glx ffmpeg pymol

COPY requirements.txt /install/requirements.txt

RUN yes | conda update conda
RUN yes | pip3 install -r /install/requirements.txt

# TODO: docker layers
