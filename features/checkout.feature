Feature: Sauce Demo cart and checkout
  As a signed-in Sauce Demo shopper
  I want cart and checkout coverage beyond login
  So that item selection, checkout validation, and order completion stay reliable

  Background:
    Given I am logged into Sauce Demo as the "standard" account
    Then I should be on the inventory page

  Scenario: Continue shopping keeps the current cart selection
    When I add the Sauce Demo items "Sauce Labs Backpack" to the cart
    And I open the shopping cart
    Then the cart should be displayed
    And the shopping cart badge should show 1 items
    And the cart should list the Sauce Demo items "Sauce Labs Backpack"
    When I continue shopping from the cart
    Then I should be on the inventory page
    And the shopping cart badge should show 1 items

  Scenario: Complete checkout with generated customer information
    When I add the Sauce Demo items "Sauce Labs Backpack" to the cart
    And I open the shopping cart
    Then the cart should contain 1 items
    And each cart item should have quantity 1
    When I proceed to checkout
    Then the checkout information page should be displayed
    When I submit checkout information with generated customer data
    Then I should be on the checkout overview page
    And the checkout overview should list the Sauce Demo items "Sauce Labs Backpack"
    When I finish the checkout
    Then I should see the order completion confirmation

  Scenario: Checkout overview shows the expected totals for two items
    When I add the Sauce Demo items "Sauce Labs Backpack, Sauce Labs Bike Light" to the cart
    And I open the shopping cart
    Then the shopping cart badge should show 2 items
    And the cart should list the Sauce Demo items "Sauce Labs Backpack, Sauce Labs Bike Light"
    When I proceed to checkout
    And I submit checkout information with generated customer data
    Then I should be on the checkout overview page
    And the checkout overview should list the Sauce Demo items "Sauce Labs Backpack, Sauce Labs Bike Light"
    And the checkout summary should show payment information "SauceCard #31337"
    And the checkout summary should show shipping information "Free Pony Express Delivery!"
    And the checkout summary should show item total "Item total: $39.98"
    And the checkout summary should show tax "Tax: $3.20"
    And the checkout summary should show total "Total: $43.18"
    When I finish the checkout
    Then I should see the order completion confirmation

  Scenario Outline: Checkout information requires all mandatory fields
    When I add the Sauce Demo items "Sauce Labs Backpack" to the cart
    And I open the shopping cart
    And I proceed to checkout
    Then the checkout information page should be displayed
    When I submit checkout information without the "<field>" field
    Then I should remain on the checkout information page
    And I should see the checkout information error "<error>"

    Examples:
      | field       | error                               |
      | first name  | Error: First Name is required       |
      | last name   | Error: Last Name is required        |
      | postal code | Error: Postal Code is required      |

  Scenario: Cancelling from checkout overview keeps the cart state
    When I add the Sauce Demo items "Sauce Labs Backpack" to the cart
    And I open the shopping cart
    And I proceed to checkout
    And I submit checkout information with generated customer data
    Then I should be on the checkout overview page
    When I cancel checkout from the overview page
    Then I should be on the inventory page
    And the shopping cart badge should show 1 items
