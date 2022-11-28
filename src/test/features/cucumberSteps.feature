Feature: JSON Placeholder

  @automated
  Scenario Outline:  Send GET Request to get all posts (/posts).
    
    When the user send get request to '/posts'
    Then the API status code should be 200 - OK
    And the response is in json format
    And the response posts are sorted ascending by id

  @automated
  Scenario: Send GET request to get post with id=99 (/posts/99).
    
    When the user send get request to '/posts' with '99' id
    Then the API status code should be 200 - OK
    And the get response 'id' is match '99'
    And the get response 'userId' is match '10'
    And the 'title' is not empty
    And the 'body' is not empty

  @automated
  Scenario: Send GET request to get post with id=150 (/posts/150).

    When the user send get request to '/posts' with '150' id
    Then the API status code should be '404'
    And the post response body is empty

  @automated
  Scenario: Send POST request to create post with userId=1 and random body and random title (/posts).

    When the user send post request '/posts' with userId '1' with random values
    Then the API status code should be 201 - Created
    And the post response 'userId' is match '1'
    And the post response 'title' is match 'randomPostTitle'
    And the post response 'body' is match 'randomPostBody'

  @automated
  Scenario: Send GET request to get users (/users).

    When the user send get request to '/users'
    Then the API status code should be 200 - OK
    And the response is in json format
    And the 'users' response contain the correct information for '5' id

  @automated
  Scenario: Send GET request to get user with id=5 (/users/5).

    When the user send get request to '/users' with '5' id
    Then the API status code should be 200 - OK
    And the 'users' response contain the correct information for users id is '5'