
orient
as cartoon
color marine
set opaque_background, off
bg_color white
set ribbon_smooth, 1

mset 1 x180

util.mroll(1,180,1)
set ray_trace_frames=0
set cache_frames=0
mpng mov

save temp.dae
quit