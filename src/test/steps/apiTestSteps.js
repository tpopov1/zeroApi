const { When, Then } = require("@cucumber/cucumber");
const expectChai = require("chai").expect;
const APIUtils = require("../../framework/utils/apiUtils/index.js");
const { StatusCodes } = require("http-status-codes");
const expectedPostsData = require("../testData/posts.js");
const expectedUsersData = require("../testData/users.js");
const randomData = require("../testData/randomData.js");
let chai = require('chai');
chai.use(require('chai-json'));
const EMPTY_BODY = {};
let _ = require('lodash');

$baseURL = new APIUtils("https://jsonplaceholder.typicode.com");

When(/^the user send get request to '(.*)'$/, async function (endpoint) {
    const response = await $baseURL.getRequest(endpoint);
    this.sharedStatusCode = response.status;
    this.responseData = response.data;
    this.responseSize = this.responseData.length;
  });

  Then(/^the API status code should be 200 - OK$/, function () {
    expectChai(this.sharedStatusCode).to.equal(
      StatusCodes.OK,
      `The status code should be correct. \r\nResponse body:\r\n ${JSON.stringify(
        this.sharedResponseBody
      )}`
    );
  });

  Then(
    /^the response is in json format$/,
    function () {
      expectChai(this.responseData).to.be.jsonObj();
    }
  );

  Then(
    /^the response posts are sorted ascending by id$/,
    function () {
      let sortedAscendingById = true;
      for(let i = 2; i < this.responseSize; i++){
        if(this.responseData[i].id < this.responseData[i-1].id){
          sortedAscendingById = false;
          break;
        }
      }
      expectChai(sortedAscendingById).to.be.true;
    }
  );

  When(/^the user send get request to '(.*)' with '(.*)' id$/, async function (endpoint, id) {
    const requestUrl = endpoint+"/"+id;
    const response = await $baseURL.getRequest(requestUrl);
    this.sharedStatusCode = response.status;
    this.responseData = response.data;
    this.sentId = id;
  });

  Then(/^the API status code should be 201 - Created$/, function () {
    expectChai(this.sharedStatusCode).to.equal(
      StatusCodes.CREATED,
      `The status code should be correct. \r\nResponse body:\r\n ${JSON.stringify(
        this.sharedResponseBody
      )}`
    );
  });

  Then(
    /^the post id is match '(.*)'$/,
    async function (endpointNumber) {
      const expectedId = expectedPostsData[endpointNumber-1].id;
      expectChai(this.responseData.id).to.equal(expectedId);
    }
  );

  Then(
    /^the post userID is match '(.*)'$/,
    async function (expectedUserId) {
      expectChai(this.responseData.userId).to.equal(expectedUserId);

    }
  );

  Then(
    /^the '(.*)' is not empty$/,
    async function (bodyKeyName) {
      expectChai(this.responseData[`${bodyKeyName}`]).to.not.equal("");
    }
  );

  When(/^the user send post request '(.*)' with userId '(.*)' with random values$/, 
  async function (endpoint, userIdValue) {
    const requestUrl = endpoint;
    const response = await $baseURL.postRequest(requestUrl, randomData);
    this.sharedStatusCode = response.status;
    this.sharedResponseBody = response.data;
    this.sentId = userIdValue;
  });

  Then(
    /^the get response '(.*)' is match '(.*)'$/,
    async function (keyName, comparableValue) {
    let expectedId = expectedPostsData[this.sentId-1][`${keyName}`];
    expectChai(comparableValue).to.equal(JSON.stringify(expectedId));
    }
  );

  Then(
    /^the post response '(.*)' is match '(.*)'$/,
    async function (bodyKeyName, bodyKeyValue) {
    let expected = this.sharedResponseBody[`${bodyKeyName}`];
    expectChai(_.isEqual(expected, bodyKeyValue)).to.be.true;
    }
  );

  Then(/^the API status code should be '(.*)'$/, function (statusCode) {
    expectChai(this.sharedStatusCode).to.equal(
      parseInt(statusCode),
      `The status codes should be the same. \r\nResponse body:\r\n ${JSON.stringify(
        this.sharedResponseBody
      )}`
    );
  });

  Then(
    /^the post response body is empty$/,
    async function () {
    expectChai(this.responseData).to.deep.equal(EMPTY_BODY);
    }
  );

  Then(
    /^the '(.*)' response contain the correct information for '(.*)' id$/,
    async function (usersKey, idValue) {
      let expectedObject = expectedUsersData.filter(el => el.id == idValue);
      let actualObject = this.responseData.filter(el => el.id == idValue);
      expectChai(_.isEqual(expectedObject, actualObject)).to.be.true;
    }
  );

  Then(
    /^the '(.*)' response contain the correct information for users id is '(.*)'$/,
    async function (usersKey, idValue) {
    let realIndex = expectedUsersData.findIndex(el => el.id == idValue);
    expectChai(_.isEqual(expectedUsersData[realIndex].id, this.responseData.id)).to.be.true;
    }
  );