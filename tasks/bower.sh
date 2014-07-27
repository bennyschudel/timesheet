#!/bin/bash

if [ ! -f "tasks/`basename $0`" ]; then
	echo "You should run this script from the root dir."
	exit
fi


BOWER_COMPONENTS_DIR=bower_components/

PUBLIC_DIR=www/
PUBLIC_JS_DIR=${PUBLIC_DIR}assets/js/vendor/
PUBLIC_CSS_DIR=${PUBLIC_DIR}assets/css/vendor/

mkdir -p $PUBLIC_JS_DIR
mkdir -p $PUBLIC_CSS_DIR

bower install

cp ${BOWER_COMPONENTS_DIR}jquery/dist/jquery.js ${PUBLIC_JS_DIR}jquery.js
cp ${BOWER_COMPONENTS_DIR}lodash/dist/lodash.underscore.js ${PUBLIC_JS_DIR}lodash.underscore.js
cp ${BOWER_COMPONENTS_DIR}momentjs/moment.js ${PUBLIC_JS_DIR}moment.js
cp ${BOWER_COMPONENTS_DIR}backbone/backbone.js ${PUBLIC_JS_DIR}backbone.js

echo "Bower components copied"
