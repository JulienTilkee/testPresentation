Feature: Enter a login and a password to go to the home page

    Scenario Outline: I want to access the home page with wrong credentials
        Given that I am on the welcome page
        When I fill the login field with "<login>"
        And I fill the password field with "<password>"
        And I click on the login button
        Then I should not access the home page

    Examples:
        | login | password |
        | login | password |
        | test | password |
        | login | 1234 |
        
    Scenario: I want to access the home page with good credentials
        Given that I am on the welcome page
        When I fill the login field with good login
        And I fill the password field with good password
        And I click on the login button
        Then I should access the home page
