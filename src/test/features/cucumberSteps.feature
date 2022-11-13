Feature: JSON Placeholder

  @automated
  Scenario Outline:  Send GET Request to get all posts (/posts).
    
    When the user send get request to '/posts'
    Then the API status code should be 200 - OK
    And the response is in json format
    And the response posts are sorted ascending by id

  @automated
  Scenario Outline: Send GET request to get post with id=99 (/posts/99).
    
    When the user send get request to '/posts' with '<id>' id
    Then the API status code should be 200 - OK
    And the get response 'id' is match '<id>'
    And the get response 'userId' is match '<userId>'
    And the 'title' is not empty
    And the 'body' is not empty

    Examples:
      | id  | userId |
      | 99  |   10   |

  @automated
  Scenario Outline: Send GET request to get post with id=150 (/posts/150).

    When the user send get request to '/posts' with '<id>' id
    Then the API status code should be '404'
    And the post response body is empty

    Examples:
      | id  |
      | 150 |

  @automated
  Scenario Outline: Send POST request to create post with userId=1 and random body and random title (/posts).

    When the user send post request to '/posts' with 'userId' equals '<userId>', 'title' equals '<title>', 'body' equals '<body>'
    Then the API status code should be 201 - Created
    And the post response 'userId' is match '<userId>'
    And the post response 'title' is match '<title>'
    And the post response 'body' is match '<body>'

    Examples:
      | userId |     title       |     body       | 
      |    1   | randomPostTitle | randomPostBody |

  @automated
  Scenario Outline: Send GET request to get users (/users).

    When the user send get request to '/users'
    Then the API status code should be 200 - OK
    And the response is in json format
    And the 'users' response contain the correct information for '<id>' id

    Examples:
      | id  |
      |  5  |

  @automated
  Scenario Outline: Send GET request to get user with id=5 (/users/5).

    When the user send get request to '/users' with '<id>' id
    Then the API status code should be 200 - OK
    And the 'users' response contain the correct information for users id is '<id>'

    Examples:
      | id  |
      |  5  |