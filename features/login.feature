Feature: Sauce Demo login
  As a Sauce Demo user
  I want login coverage for valid, invalid, and edge-case accounts
  So that authentication behavior stays reliable

  Background:
    Given I open the Sauce Demo login page
    Then the login form is displayed

  Scenario Outline: Successful login with supported Sauce Demo accounts
    When I sign in with the "<account>" Sauce Demo account
    Then I should be redirected to the inventory page

    Examples:
      | account             |
      | standard            |
      | problem             |
      | performance glitch  |

  Scenario Outline: Rejected login attempts
    When I attempt to sign in with the "<username>" username and the "<password>" password
    Then I should remain on the Sauce Demo login page
    And I should see the login error "<error>"

    Examples:
      | username   | password | error                                                                  |
      | standard   | invalid  | Epic sadface: Username and password do not match any user in this service |
      | invalid    | valid    | Epic sadface: Username and password do not match any user in this service |
      | empty      | empty    | Epic sadface: Username is required                                     |
      | standard   | empty    | Epic sadface: Password is required                                     |
      | empty      | valid    | Epic sadface: Username is required                                     |
      | locked out | valid    | Epic sadface: Sorry, this user has been locked out.                    |

  Scenario: Password field masking and keyboard accessibility
    When I fill the password with the valid Sauce Demo password
    Then the password field should mask the entered value
    And the login controls should expose accessible names
    And the login controls should be keyboard accessible
