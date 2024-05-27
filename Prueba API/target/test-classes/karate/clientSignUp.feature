Feature: Sign Up user on demoblaze

  Background:
    * url 'https://api.demoblaze.com'
    * def now = function(){ return java.lang.System.currentTimeMillis() }
    * def username = 'usertest-' + now()

  Scenario: Sign up success
    * def signUp =
      """
      {
        "username": '#(username)',
        "password": "MTIzNA==",
      }
      """
    Given path 'signup'
    And request signUp
    When method post
    Then status 200
    And match response.errorMessage == '#null'

  Scenario: SignUp error client already exist
    * def signUp =
      """
      {
        "username": 'usertest',
        "password": "MTIzNA==",
      }
      """
    Given path 'signup'
    And request signUp
    When method post
    Then status 200
    And match response.errorMessage == "This user already exist."