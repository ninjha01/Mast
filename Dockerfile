FROM continuumio/miniconda3

RUN yes | apt-get update
RUN yes | apt-get install python3.7 libgl1-mesa-glx ffmpeg pymol

COPY requirements.txt /install/requirements.txt

RUN yes | conda update conda
RUN yes | pip install -r /install/requirements.txt
