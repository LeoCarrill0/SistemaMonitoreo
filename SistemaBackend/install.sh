#!/bin/bash

sudo apt update

sudo apt upgrade

sudo apt install mariadb-server -y

sudo mariadb-secure-installation
