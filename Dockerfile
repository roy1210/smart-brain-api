FROM node:10.16.1

# Docker directory in the container that work out
WORKDIR /usr/src/smart-brain-api

# copy from `root dir`(everything) to `dir` (docker working dir)
COPY ./ ./

# What command will run.
# Create workfolder -> copy -> npm install
RUN npm install

CMD ["/bin/bash"]