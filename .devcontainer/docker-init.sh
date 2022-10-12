#!/usr/bin/env bash

# networks
# --------------------
docker network create my_bike_rentals_local_network &> /dev/null # TODO <change this>
if [ "$?" -ne "0" ]; then
  echo "my_bike_rentals_local_network already exists. Skipping..." # TODO <change this>
else
  echo "network successfully created: my_bike_rentals_local_network" # TODO <change this>
fi
