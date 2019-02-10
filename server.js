let express = require('express'),
    app = express(),
    path = require('path')
    port = process.env.PORT ? process.env.PORT : 8001,
    dist = path.join(__dirname, 'dist'),
    bodyParser = require('body-parser'),
    proxy = require('http-proxy-middleware'),
    hmacSHA512 = require('crypto-js/hmac-sha512'),
    CryptoJS = require('crypto-js');

app.use(express.static(dist));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

let url = "http://127.0.0.1:8096/yh",
    webContext = "/yh",
    ACCESS_KEY = '1',
    ACCESS_SECRET = 'dufy20170329java';
let nonce = String(Date.now() * 1e6);
let options = {
    target: url,
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        '^/api': '' // Host path & target path conversion
    },
    proxyTimeout:1000,
    onProxyReq: function (proxyReq, req, res) {
        console.log("Request incoming, redirecting to: " + url + req.url);
        // parseURL(url)
        let resource = webContext + req.path;
        let body = req.body;
        let signBody;
        let contentType = req.headers['content-type'];
        if (contentType == 'text/plain') {

            signBody = body;
        }
        else {
            signBody = JSON.stringify(body);

        }
        // console.log("sign:"+JSON.stringify(req.method + "," + req.protocol + "," + resource + "," + ACCESS_KEY + "," + nonce + "," + signBody + ","+ACCESS_SECRET));
        let sign = hmacSHA512(req.method + "\n" + req.protocol + "\n" + resource + "\n" + ACCESS_KEY + "\n" + nonce + "\n" + signBody + "\n", ACCESS_SECRET);
        // Write out body changes to the proxyReq stream
        proxyReq.setHeader('Authorization', "HmacSHA512 " + ACCESS_KEY + ":" + nonce + ":" + CryptoJS.enc.Base64.stringify(sign));
        proxyReq.write(signBody);
        proxyReq.end();
    }
};
let proxyServer = proxy(options);
app.all('/api/*', proxyServer);

app.get('/', function (req, res) {
    res.sendFile(path.join(dist, 'index.html'));

});

app.listen(port, function (error) {

    if (error) {
        console.log(error); // eslint-disable-line no-console
    }

    console.info('Express is listening on port %s.', port); // eslint-disable-line no-console

});


let parseURL = (url) => {
    //解析协议
    var protocal = url.substring(0, url.indexOf(':'));
    //alert('protocal:' + protocal);

    //解析域名和端口
    var tmp = url.substr(url.indexOf('//') + 2);

    var domain = tmp.substr(0, tmp.indexOf("/"));
    //alert('domain:' + domain);

    var domainName, port;
    var idx = domain.indexOf(":");

    if (idx > 0) {
        domainName = domain.substr(0, idx);
        port = domain.substr(idx + 1);
    } else {
        domainName = domain;
    }

    //alert('domainName:' + domainName + ',' + port);

    //解析web context
    var tmp2 = tmp.substr(tmp.indexOf("/") + 1);
    var webContext = tmp2.substr(0, tmp2.indexOf('/'));
    //alert('webContext:' +webContext);

    //解析URI
    var uri = tmp2.substr(tmp2.indexOf('/'));
    //alert('uri:' + uri);

    return {
        protocal: protocal,
        domainName: domainName,
        port: port,
        webContext: webContext,
        uri: uri
    }
}