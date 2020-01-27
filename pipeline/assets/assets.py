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
        # TODO: regenerate pdbs intelligently
        download_pdbs(pdb_list)
    if not os.path.exists("./frames"):
        os.makedirs("./frames")
    bar = Bar("Media Generation", max=len(pdb_list))
    # TODO: Use multiprocessing
    for pdb in pdb_list:
        pdb = pdb.lower()
        frame_folder_path = "./frames/" + pdb + "/"
        if not os.path.exists(frame_folder_path):
            os.makedirs(frame_folder_path)
        gen_frames(pdb)
        gen_mp4(pdb)
    bar.finish()


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
        # Get bioassembly 1 (individual unit rather than larger complex)
        base_url = "https://files.rcsb.org/download/$p.pdb1.gz"
        url = base_url.replace("$p", pdb)
        filename = "./pdbs/n" + pdb + ".pdb.gz"
        download_file(url, filename)
        unzip_command = ["gunzip", filename]
        run_command(unzip_command)
        unzipped_filename = filename.replace(".gz", "")
        time.sleep(0.1)
        if not os.path.exists(unzipped_filename):  # Fallback to regular pdb
            base_url = "https://files.rcsb.org/download/$p.pdb"
            url = base_url.replace("$p", pdb)
            filename = "./pdbs/n" + pdb + ".pdb"
            download_file(url, filename)
        bar.next()
    bar.finish()
    return True


def download_file(url, filename):
    base_command = ["wget", "-q", "-O"]
    download_command = base_command + [filename, url]
    run_command(download_command)


########################################################################
# Media Generation
########################################################################
def gen_frames(pdb):
    cmd.reinitialize()
    pdb_filename = "./pdbs/n" + pdb + ".pdb"
    cmd.load(pdb_filename)
    cmd.orient()
    cmd.show_as("cartoon")
    cmd.color("marine")
    cmd.set("opaque_background", 0)
    cmd.bg_color("white")
    cmd.mset("1 x90")
    cmd.util.mroll(1, 90, 1)
    frame_folder_path = "./frames/" + pdb + "/"
    frame_prefix = frame_folder_path + "frame"
    cmd.mpng(frame_prefix)
    final_frame = frame_prefix + "0090.png"
    while not os.path.exists(final_frame):
        time.sleep(0.1)
    # Don't need to generate Daes for now
    # dae_folder_path = "./daes/"
    # dae_filename = dae_folder_path + "n" + pdb + ".dae"
    # cmd.save(dae_filename)
    # while not os.path.exists(dae_filename):
    #     time.sleep(0.1)


def gen_mp4(pdb):
    if not os.path.exists("./output"):
        os.makedirs("./output")

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
