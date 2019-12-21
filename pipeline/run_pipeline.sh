docker run -d \
       -it \
       --name mast_pipeline \
       -v "$(pwd)":/app \
       mast_image;

docker exec -it mast_pipeline bash
