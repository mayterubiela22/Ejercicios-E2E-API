Feature: Login user on demoblaze

  Background:
    * url 'https://api.demoblaze.com'
    * def username = 'usertest-mg'

  Scenario: Login success
    * def login =
      """
      {
        "username": '#(username)',
        "password": "MTIzNA==",
      }
      """
    Given path 'login'
    And request login
    When method post
    Then status 200
    And match response == '#string'

  Scenario: Login error wrong password
    * def login =
      """
      {
        "username": 'testuser',
        "password": "1234",
      }
      """
    Given path 'login'
    And request login
    When method post
    Then status 200
    And match response.errorMessage == "Wrong password."