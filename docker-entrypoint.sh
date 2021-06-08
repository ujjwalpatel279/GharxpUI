#!/app -eu
chmod +x ./config.sh
./config.sh > ./config.js
serve -p 80 -s .