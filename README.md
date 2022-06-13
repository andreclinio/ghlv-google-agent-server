
## dev
```
$ npx tsc && node dist/main.js help
$ npx tsc && node dist/main.js 
$ npx tsc && node dist/main.js 
```

### Creating Keys and Cerificate (linux terminal) and Get Decrypted Keys
```
$ openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365

$ openssl rsa -in keytmp.pem -out key.pem
```