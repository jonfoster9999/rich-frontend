#!/usr/bin/env bash

ng build && \
scp -r ./dist/rich-frontend/. ec2-user@rich:/srv/www/rich-frontend/
