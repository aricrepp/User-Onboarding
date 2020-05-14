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
        .clear();

        cy.contains("Name is a required field");

        cy.get('input[type="checkbox"]').check().should("be.checked");
        
    });
});