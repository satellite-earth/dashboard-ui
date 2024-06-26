> [!NOTE]
> dashboard-ui has been rolled into https://github.com/satellite-earth/web-ui

# Satellite Dashboard UI

The Dashboard UI is like a control panel for managing your local [private-node](https://github.com/satellite-earth/private-node)

It gets bundled with [Satellite Desktop](https://github.com/satellite-earth/desktop), but you can also run it standalone in a web browser.

### Run it

Clone into the repo and

`npm i`

`npm run dev`

By default, the dashboard will be served on localhost port `2012`.

The dashboard attempts to automatically establish a websocket connection to a local Satellite node, but if it does not find one you'll see a "Connecting..." screen.

Once you've got a local private node running (refer to the link above) to make the connection you'll need a connection string with three query params:

- `auth` (the `AUTH` env variable passed to the private node)
- `url` (the stringified url-encoded url of the private node)
- `env` (must be equal to `local`)

In the near future connecting to the node with NIP-42 will be supported as well to preclude the necessity of a shared secret between the dashboard and private node.
