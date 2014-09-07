ninja-local-rules
====================

Do this for a new install

```sh

sudo stop ninjablock

cd /opt/ninja/drivers

rm -rf ninja-local-rules
git clone https://github.com/stockmopar/ninja-local-rules.git
cd ninja-local-rules
sudo npm install

sudo start ninjablock

```

If something is not working right execute this to run the client in the window to see if there are any errors.

```sh

sudo stop ninjablock

cd /opt/ninja
node client.js

```

Hit Control+C and then execute:

```sh

sudo start ninjablock

```

To View the NinjaBlocks log file execute:

```sh

cat /var/log/ninjablock.log

```