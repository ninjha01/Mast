# flake8: noqa
from multiprocessing import Pool
import time
import pdb as debugger
import os
import subprocess
import re
from progress.bar import Bar


def main():
    pdb_file = open("./download_list.txt")
    pdb_list = pdb_file.read().splitlines()
    if not os.path.exists("./pdbs"):
        os.makedirs("./pdbs")
        download_pdbs(pdb_list)
    if not os.path.exists("./frames"):
        os.makedirs("./frames")
    gen_media(pdb_list)


########################################################################
# Pymol Setup
########################################################################
import __main__

__main__.pymol_argv = ["pymol", "-qc"]
import pymol

pymol.finish_launching()
from pymol import cmd

########################################################################
# I/O
########################################################################
def download_pdbs(list):
    bar = Bar("Downloading", max=len(list))
    for pdb in list:
        pdb = pdb.lower()
        base_command = ["wget", "-q", "-O"]
        base_url = "https://files.rcsb.org/download/$p.pdb"
        url = base_url.replace("$p", pdb)
        filename = "./pdbs/n" + pdb + ".pdb"
        command = base_command + [filename, url]
        run_command(command)
        bar.next()
    bar.finish()
    return True


########################################################################
# Media Generation
########################################################################
def gen_media(pdb_list):
    bar = Bar("Media Generation", max=len(pdb_list))
    for pdb in pdb_list:
        gen_media_from_pdb(pdb.lower())
        bar.next()
    bar.finish()


def gen_media_from_pdb(pdb):
    dae_folder_path = "./daes/"
    if not os.path.exists(dae_folder_path):
        os.makedirs(dae_folder_path)
    scn_folder_path = "./scns/"
    if not os.path.exists(scn_folder_path):
        os.makedirs(scn_folder_path)
    frame_folder_path = "./frames/" + pdb + "/"
    if not os.path.exists(frame_folder_path):
        os.makedirs(frame_folder_path)
        gen_frames(pdb)
        dae_filename = "./daes/n" + pdb + ".dae"
        align(dae_filename)
        convert_to_scn(dae_filename)

    android_folder_path = "./android/"
    if not os.path.exists(android_folder_path):
        os.makedirs(android_folder_path)
    gen_android_video(pdb)

    ios_folder_path = "./ios/"
    if not os.path.exists(ios_folder_path):
        os.makedirs(ios_folder_path)
    gen_ios_video(pdb)


def gen_frames(pdb):
    cmd.reinitialize()
    pdb_filename = "./pdbs/n" + pdb + ".pdb"
    cmd.load(pdb_filename)
    cmd.orient()
    cmd.show_as("cartoon")
    cmd.color("marine")
    cmd.set("opaque_background", 0)
    cmd.mset("1 x90")
    cmd.util.mroll(1, 90, 1)
    frame_folder_path = "./frames/" + pdb + "/"
    frame_prefix = frame_folder_path + "frame"
    cmd.mpng(frame_prefix)
    final_frame = frame_prefix + "0090.png"
    while not os.path.exists(final_frame):
        time.sleep(1)
    dae_folder_path = "./daes/"
    dae_filename = dae_folder_path + "n" + pdb + ".dae"
    cmd.save(dae_filename)
    while not os.path.exists(dae_filename):
        time.sleep(1)


def gen_android_video(pdb):
    android_filename = "./android/n" + pdb + ".mp4"
    frame_source = "./frames/" + pdb + "/frame%04d.png"
    command = [
        "ffmpeg",
        "-i",
        frame_source,
        "-c:v",
        "libx264",
        "-crf",
        "23",
        "-profile:v",
        "baseline",
        "-level",
        "3.0",
        "-pix_fmt",
        "yuv420p",
        "-c:a",
        "aac",
        "-ac",
        "2",
        "-b:a",
        "128k",
        "-movflags",
        "faststart",
        android_filename,
    ]
    old_command = [
        "ffmpeg",
        "-i",
        frame_source,
        "-s",
        "352x288",
        "-b:v",
        "384k",
        "-flags",
        "+loop+mv4",
        "-cmp",
        "256",
        "-partitions",
        "+parti4x4+parti8x8+partp4x4+partp8x8",
        "-subq",
        "6",
        "-trellis",
        "0",
        "-refs",
        "5",
        "-bf",
        "0",
        "-coder",
        "0",
        "-me_range",
        "16",
        "-g",
        "250",
        "-keyint_min",
        "25",
        "-sc_threshold",
        "40",
        "-i_qfactor",
        "0.71",
        "-qmin",
        "10",
        "-qmax",
        "51",
        "-qdiff",
        "4",
        "-c:a",
        "aac",
        "-ac",
        "1",
        "-ar",
        "16000",
        "-r",
        "13",
        "-ab",
        "32000",
        "-aspect",
        "3:2",
        "-strict",
        "experimental",
        android_filename,
    ]
    run_command(command)
    if not os.path.exists(android_filename):
        raise ValueError("Android Failure")


def gen_ios_video(pdb):
    ios_filename = "./ios/n" + pdb + ".mp4"
    if os.path.exists(ios_filename):
        return
    frame_source = "./frames/" + pdb + "/frame%04d.png"
    command = [
        "ffmpeg",
        "-i",
        frame_source,
        "-c:v",
        "libx264",
        "-crf",
        "23",
        "-profile:v",
        "baseline",
        "-level",
        "3.0",
        "-pix_fmt",
        "yuv420p",
        "-c:a",
        "aac",
        "-ac",
        "2",
        "-b:a",
        "128k",
        "-movflags",
        "faststart",
        ios_filename,
    ]
    old_command = [
        "ffmpeg",
        "-i",
        frame_source,
        "-s",
        "352x288",
        "-vcodec",
        "libx264",
        "-vf",
        "scale=2*trunc(iw/2):-2,setsar=1",
        "-profile:v",
        "main",
        "-pix_fmt",
        "yuv420p",
        "-preset",
        "medium",
        "-crf",
        "23",
        "-x264-params",
        "ref=4",
        "-acodec",
        "copy",
        "-movflags",
        "+faststart",
        ios_filename,
    ]
    run_command(command)
    if not os.path.exists(ios_filename):
        raise ValueError("iOS Failure")


########################################################################
# Dae Manipulation
########################################################################
vertex = (0, 0.1, -20)


def align(filename):
    dae = load_dae(filename)
    position_strings = get_position_strings(dae)
    positions = get_positions(position_strings)
    global vertex
    recentered = recenter(positions, vertex)
    export(position_strings, recentered, dae, filename)


### Point Transformations #################################################
def find_center(positions):
    zipped = list(zip(*positions))
    x_bar, y_bar, z_bar = (sum(val) / len(positions) for val in zipped)
    return (x_bar, y_bar, z_bar)


def recenter(positions, vertex):
    center = find_center(positions)
    transformation = subtract(center, vertex)
    recentered = []
    for position in positions:
        recentered.append(subtract(position, transformation))
    return recentered


def subtract(a, b):
    return tuple((x - y for x, y in zip(a, b)))


def add(a, b):
    return tuple((x + y for x, y in zip(a, b)))


def distance(a, b):
    dX, dY, dZ = (v[0] - v[1] for v in list(zip(a, b)))
    return math.sqrt((dX ** 2) + (dY ** 2) + (dZ ** 2))


### Dae Manipulation #################################################
def build_location(position):
    return '<translate sid="location">%.1f %.1f %.1f</translate>' % position


def get_position_strings(dae):
    pattern = re.compile('<translate sid="location">.*</translate>')
    return pattern.findall(dae)


def get_positions(location_strings):
    positions = []
    for string in location_strings:
        num_string = string[string.find(">") + 1 : string.find("</")]
        x, y, z = num_string.split(" ")
        positions.append((float(x), float(y), float(z)))
    return positions


def load_dae(filename):
    with open(filename) as dae:
        return dae.read()


def unload_dae(payload, filename):
    with open(filename, "w") as dae:
        dae.write(payload)


def export(old_loc, new_pos, dae, filename):
    new_loc = [build_location(pos) for pos in new_pos]
    replacements = list(zip(old_loc, new_loc))
    for r in replacements:
        dae = dae.replace(r[0], r[1])
    unload_dae(dae, filename)


def convert_to_scn(filename):
    scn_filename = filename.replace("dae", "scn")
    command = [
        "scntool",
        "--convert",
        filename,
        "--format",
        "scn",
        "--output",
        scn_filename,
    ]
    run_command(command)


########################################################################
# Wrappers
########################################################################


def run_command(command, shell_bool=False):
    with open(os.devnull, "w") as devnull:
        subprocess.run(command, stdout=devnull, stderr=devnull, shell=shell_bool)


if __name__ == "__main__":
    main()
