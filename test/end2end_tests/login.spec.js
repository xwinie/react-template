/**
 * Created by bobo on 19/07/2017.
 */
const Browser = require('zombie');
Browser.localhost('127.0.0.1', 3000);
describe('User visits signup page', function () {

    const browser = new Browser();

    before(function (done) {
        this.timeout(50000);
        browser.visit('/', done);
    });

    describe('submits form', function () {

        before(function (done) {
            this.timeout(50000);
            browser
                .fill('#username', 'admin')
                .fill('#password', '2468ttbb')
                .pressButton('#app > div > div > div > div > form > button', done);

        });

        it('should be successful', function () {
            browser.assert.success();
        });

        it('should see welcome page', function () {
            browser.assert.text('#app > div > div > div > header > ul > li:nth-child(1) > a > span', 'admin');
        });
    });
});
