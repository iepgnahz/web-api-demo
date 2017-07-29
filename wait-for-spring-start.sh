#!/bin/bash
until curl -X GET http://spring_service:8080/users;do sleep 1 && echo "wait for spring service start";done
