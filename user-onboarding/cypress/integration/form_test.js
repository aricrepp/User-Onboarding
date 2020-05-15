/* global cy */
describe("This is our first test", () => {
    it("Should return true", () => {
        expect(true).to.equal(true);
    });
});

describe("Testing our form inputs", () => {
    beforeEach(function() {
        cy.visit("http://localhost:3000");
    })

    //pulling url from beforeEach
    it("Input name into the name input", () => {
        //Arrange - Get the element
        //Act - Mimic user interaction
        //Assert - Test / Verify
        cy.get('input[name="name"]')
        .type("Aric Repp")
        .should("have.value", "Aric Repp")

        cy.get('input[name="email"]')
        .type("waffle@syrup.com")
        .should("have.value", "waffle@syrup.com")
        cy.contains("Email is taken");
        cy.get('input[name="email"]')
        .clear();
        cy.contains("Must include email address");
        cy.get('input[name="email"]')
        .type("aric@gmail.com")
        .should("have.value", "aric@gmail.com")

        cy.get('input[name="password"]')
        //Testing 8 characters
        .type("Mega1!")
        .should("have.value", "Mega1!")
        cy.contains('Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character');
        cy.get('input[name="password"]')
        .clear();
        cy.get('input[name="password"]')
        //Testing One uppercase
        .type("megamega1!")
        .should("have.value", "megamega1!")
        cy.contains('Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character');
        cy.get('input[name="password"]')
        .clear();
        cy.get('input[name="password"]')
        //Testing One lowercase
        .type("MEGAMEGA1!")
        .should("have.value", "MEGAMEGA1!")
        cy.contains('Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character');
        cy.get('input[name="password"]')
        .clear();
        cy.get('input[name="password"]')
        //Testing One number
        .type("Megamega!")
        .should("have.value", "Megamega!")
        cy.contains('Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character');
        cy.get('input[name="password"]')
        .clear();
        cy.get('input[name="password"]')
        //Testing One Special Character
        .type("Megamega1")
        .should("have.value", "Megamega1")
        cy.contains('Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character');
        cy.get('input[name="password"]')
        .clear();
        cy.get('input[name="password"]')
        //Testing Typed then deleted
        .should("be.empty")
        cy.contains('Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character');
        cy.get('input[name="password"]')
        .clear();
        cy.get('input[name="password"]')
        //Testing valid password
        .type("Megamega1!")
        .should("have.value", "Megamega1!")

        cy.get('select').select('Teacher')
       

        cy.get('input[type="checkbox"]').check().should("be.checked");

        cy.get("form").submit();
        
    });
});