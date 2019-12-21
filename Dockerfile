FROM debian:latest

RUN yes | apt-get update
RUN yes | apt-get install python3 python3-pip build-essential python-dev python3-dev libgl1-mesa-glx wget ffmpeg pymol

COPY requirements.txt /install/requirements.txt

RUN yes | pip3 install -r /install/requirements.txt

# TODO: docker layers
