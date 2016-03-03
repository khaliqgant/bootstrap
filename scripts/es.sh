#!/bin/sh
## es.sh: script to handle various tasks to access the Elasticsearch API

prog="$0"
me=`basename "$prog"`

# store some commonly used variables
IP=$(cat .env | grep "ES_HOST" | cut -d "=" -f2)
CREDS=$(cat .env | grep "ES_CREDS" | cut -d "=" -f2)
ALIAS=$(cat .env | grep "ES_DEFAULT_INDEX" | cut -d "=" -f2)

##
## Command: help
## Output help commands
## Usage: sh es.sh help
help () {
  grep '^##' "$prog" | sed -e 's/^##//' -e "s/_PROG_/$me/" 1>&2
}

##
## Command: schema
## Validate an Elasticsearch schema and create a new index if valid
## Use: sh es.sh schema $index_name
schema () {
    # store output into variable instead of printing to screen
    validate=$( { cat elasticsearch/schema.json | python -m json.tool; } 2>&1 )

    # make sure first character is a {
    if [[ $validate == {* ]];
    then
        #take not of the current index
        echo $1 > bin/index.txt
        curl --user $CREDS -XPUT $IP'/'$1'/' '-d@elasticsearch/schema.json'
    else
        echo "json is invalid"
        echo $validate
    fi
}

##
## Command: delete
## Delete an Elasticsearch index
## Usage: sh es.sh delete $index_name
delete () {
    echo "deleting $IP/$INDEX"

    curl --user $CREDS -XDELETE $IP'/'$1
}

##
## Command: add
## Add an Elasticsearch alias
## Usage: sh es.sh add $index_name
add () {
    curl --user $CREDS -XPOST $IP/_aliases -d '{"actions": [{ "add": {"alias": "'$ALIAS'","index": "'$1'"}}]}'
}

##
## Command: swap
## Swap out the current Elasticsearch index alias
## Usage: sh es.sh swap $index_to_remove $index_to_add
swap () {
    REMOVE=$1
    ADD=$2
    curl --user $CREDS -XPOST $IP/_aliases -d '{"actions": [{ "remove": {"alias": "'$ALIAS'","index": "'$REMOVE'"}},{ "add": {"alias": "'$ALIAS'","index": "'$ADD'"}}]}'
}

$1 $2 $3