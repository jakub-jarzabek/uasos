/* eslint-disable no-undef */

describe("The login page", () => {
  it("contains title and signin with social buttons", () => {
    cy.visit("signin");

    cy.get("h2").should("contain", "Log in");
    cy.contains("Sign in with Facebook");
    cy.contains("Sign in with Google");
  });

  it("submit with empty form will show an error", () => {
    cy.visit("signin");

    cy.get("input")
      .invoke("attr", "placeholder")
      .should("contain", "Address e-mail or phone number");

    cy.contains("Your phone or email is required").should("not.exist");
    cy.contains("div", "Log in").click();
    cy.contains("Your phone or email is required").should("be.visible");
  });

  it("submit with not valid value will show an error", () => {
    cy.visit("signin");

    cy.get("input").type("not valid user data");
    cy.contains("div", "Log in").click();
    cy.contains("Email or phone number");
  });

  it("after submitting email password input will be opened", () => {
    cy.visit("signin");

    cy.get("input").type("antontestuasos@gmail.com");
    cy.contains("div", "Log in").click();
    cy.get("input[type=password]")
      .invoke("attr", "placeholder")
      .should("contain", "Password");
  });

  it("typing password with not enough length will show an error", () => {
    cy.get("input[type=password]").type("1234567");
    cy.contains("Provided invalid password");
  });

  it("typing wrong password will show an error", () => {
    cy.get("input[type=password]").type("12345678");
    cy.contains("div", "Log in").click();
    cy.contains("Provided invalid password");
  });

  it("typing correct password and submit redirects to the dashboard", () => {
    cy.get("input[type=password]").clear().type("Test123!");
    cy.contains("div", "Log in").click();
    cy.url().should("contain", "/dashboard");
    //TODO: Add cypress function for login and logout, add logout at the end of this it!
  });

  it("when password input is visible lost password text and button must be visible", () => {
    cy.visit("signin");

    cy.get("input").type("antontestuasos@gmail.com");
    cy.contains("div", "Log in").click();

    cy.contains("Lost Password?");
    cy.contains("a", "click")
      .invoke("attr", "href")
      .should("contain", "/en/password-reset-init");
  });

  it("click to lost password button redirects to the forget password page", () => {
    cy.contains("a", "click").click();
    cy.url().should("contain", "/password-reset-init");
  });

  it("register button send you to register form", () => {
    cy.visit("signin");

    cy.contains("Register").click();
    cy.url().should("include", "/register");
  });
});
