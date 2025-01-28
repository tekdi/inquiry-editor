var express = require('express'),
    http = require('http');
bodyParser = require('body-parser'),
    proxy = require('express-http-proxy'),
    urlHelper = require('url');
const latexService = require('./latexService.js')
const dotenv = require('dotenv');
dotenv.config();

const BASE_URL = process.env.BASE_URL;
const API_AUTH_TOKEN = process.env.AUTH_API_TOKEN;
const TENANT_ID = process.env.TENANT_ID;

console.log('BASE_URL ==>', BASE_URL);
console.log('API_AUTH_TOKEN ==>', API_AUTH_TOKEN);
console.log('TENANT_ID ==>', TENANT_ID);

var app = express();
app.set('port', 3000);
app.use(express.json())
app.get("/latex/convert", latexService.convert)
app.post("/latex/convert", bodyParser.json({ limit: '1mb' }), latexService.convert);
app.use(express.static(__dirname + '/web-component-examples/vanilla-js'));

const decoratePublicRequestHeaders = function () {
    return function (proxyReqOpts, srcReq) {
        proxyReqOpts.headers['authorization'] = `Bearer ${API_AUTH_TOKEN}`;
        proxyReqOpts.headers['tenantid'] = TENANT_ID;
        return proxyReqOpts;
    }
};

const publicRequestHeaders = {
    authorization: `Bearer ${API_AUTH_TOKEN}`,
    "tenantid": TENANT_ID,
    "x-channel-id": "scp-channel"
};

const customDecorateReqHeaders = function () {
    return function (proxyReqOpts, srcReq) {
        proxyReqOpts.headers = Object.assign({}, proxyReqOpts.headers, publicRequestHeaders);
        return proxyReqOpts;
    }
}

/*
const objectCategoryDefResponse = require('./object-cat-def-mock'); // Import the JSON object

app.all('/action/object/category/definition/v1/*', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(objectCategoryDefResponse); // Send the imported JSON object
});
*/

app.post('/action/data/v3/telemetry', (req, res) => {
    const mockResponse = {
        success: true,
        message: 'This is a mocked response'
    };
    res.status(200).json(mockResponse);
});

app.get(['/api/*', '/action/*'], proxy(BASE_URL, {
    https: true,
    proxyReqPathResolver: function (req) {
        console.log('proxyReqPathResolver ', urlHelper.parse(req.url).path);
        return urlHelper.parse(req.url).path;
    },
    proxyReqOptDecorator: decoratePublicRequestHeaders()
}));

app.post(["/action/asset/v1/upload/:identifier"], proxy(BASE_URL, {
    https: true,
    parseReqBody: false,
    proxyReqPathResolver: function (req) {
        console.log('proxyReqPathResolver ', urlHelper.parse(req.url).path);
        return urlHelper.parse(req.url).path;
    },
    proxyReqOptDecorator: customDecorateReqHeaders()
})
);

app.post(["/action/*", "/api/*"], proxy(BASE_URL, {
    https: true,
    proxyReqPathResolver: function (req) {
        console.log('proxyReqPathResolver ', urlHelper.parse(req.url).path);
        return urlHelper.parse(req.url).path;
    },
    proxyReqOptDecorator: decoratePublicRequestHeaders()
})
);

app.patch(["/action/*", "/api/*"], proxy(BASE_URL, {
    https: true,
    proxyReqPathResolver: function (req) {
        console.log('proxyReqPathResolver ', urlHelper.parse(req.url).path);
        return urlHelper.parse(req.url).path;
    },
    proxyReqOptDecorator: decoratePublicRequestHeaders()
})
);

app.use(['/assets/public/content/assets/*'], proxy('https://knowlg-public.s3-ap-south-1.amazonaws.com', {
    https: true,
    proxyReqPathResolver: function (req) {
        let originalUrl = req.originalUrl.replace("/assets/public", "")
        return urlHelper.parse(originalUrl).path;
    }
}));

app.use(['/api/*', '/assets/*', '/action/*'], proxy(BASE_URL, {
    https: true,
    proxyReqPathResolver: function (req) {
        console.log('proxyReqPathResolver ', urlHelper.parse(req.url).path);
        return urlHelper.parse(req.url).path;
    },
    proxyReqOptDecorator: decoratePublicRequestHeaders()
}));

http.createServer(app).listen(app.get('port'), 3000);