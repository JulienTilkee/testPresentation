Feature: Invert the header's colors

    Scenario: I want to change the color of the header
        Given that I am on the welcome page
        When I click on the eye button
        Then I should invert the header's background color
        And I should invert the header's title color