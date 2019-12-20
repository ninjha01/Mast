# flake8: noqa
import os
import subprocess
import re


def main():
    pdb_file = open("./download_list.txt")
    pdb_list = pdb_file.read().splitlines()

    if not os.path.exists("./output"):
        os.makedirs("./output")

        for pdb in pdb_list:
            frame_folder_path = "./frames/" + pdb + "/"
            frame_source = "./frames/" + pdb + "/frame%04d.png"
            out_filename = f"./output/{pdb}.mp4"
            command = [
                "ffmpeg",
                "-i",
                frame_source,
                "-c:v",
                "libx264",
                "-vf",
                "fps=25",
                "-pix_fmt",
                "yuv420p",
                out_filename,
            ]
            run_command(command)
            if not os.path.exists(out_filename):
                raise ValueError("Failure")


def run_command(command, shell_bool=False):
    with open(os.devnull, "w") as devnull:
        subprocess.run(command, stdout=devnull, stderr=devnull, shell=shell_bool)


if __name__ == "__main__":
    main()

# ffmpeg -i ./frames/4pmk/frame%04d.png -c:v libx264 -vf fps=25 -pix_fmt yuv420p ./output/4pmk.mp4
