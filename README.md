# Heytel-panel

This is a panel for the [Heytel](https://github.com/Heytei/heytel-panel) project. It is a minimalistic but powerful dashboard that allows you to control your hotel. It is written in [React.js](https://reactjs.org/) and uses [Tailwind](https://tailwindcss.com/).

## Setup
Clone repository and install dependencies:
```bash
git clone
cd heytel-panel
npm install
```
Then you can run the panel with:
```bash
npm start
```

## Running on local domain with ssl

To run the api on a local domain with ssl  change `.env` file, then set it to:
```
HOST=heytel.local
SSL_CRT_FILE=.cert/heytel.local.pem
SSL_KEY_FILE=.cert/heytel.local-key.pem
PORT=443
HTTPS=true
```
Install [mkcert](https://github.com/FiloSottile/mkcert) and run the following commands:


Then run the following commands to apply ssl:
```bash
mkcert -install
mkcert -cert-file ./certs/heytel.local.pem -key-file ./certs/heytel.local-key.pem localhost heytel.local
```

Then you need to add the following lines to your hosts file:
```
127.0.0.1 heytel.local
```

`hosts` file location depends on your OS:
- Windows: `C:\Windows\System32\drivers\etc\hosts`
- Linux: `/etc/hosts`
- Mac: `/private/etc/hosts`