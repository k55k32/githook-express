# githook-express

# Quick Start

## hook.config
```js
{
  "https://github.com/yourpoject-url": {
    "secret": "this-is-your-own-secret-you-setting-on-github",
    "events": {
      "push": "when-push-to-execute.sh"
    }
  } // ...
}
```

## Run commond
` node index.js start 9000 /root/hook.config `
`9000` is a port.You can setting whatever you want
`/root/hook.confg` just the config file

and then set your github webhook payload url to `http://xxx.xx.xx/github/webhook`
