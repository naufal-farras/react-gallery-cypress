describe("Login Page Test Cases", () => {
    it('Visit Login Page', () => {
        cy.visit("http://localhost:3000");
        cy.title().should("eq", "React Gallery");
        cy.contains("Hello Again") 
    });

    it("Contains Email and Password input, and Login Button", () => {
        //check email
        const email = cy.get("input[name='email']");
        email.should("be.visible");
        email.should("have.attr","type","email");
        email.should("have.attr","placeholder","Email Address");

         //check password
         const password = cy.get("input[name='password']");
         password.should("be.visible");
         password.should("have.attr","type","password");
         password.should("have.attr","placeholder","Password");

        //check button login
         const button = cy.get("button");
         button.should("be.visible");
         button.contains("Login");
         button.should("have.css", "background-color", "rgb(79, 70, 229)");
         button.should("have.css", "color", "rgb(255, 255, 255)");
        })

         //do login with null value
         it('Do Login with Null Value', () =>{
            const button = cy.get("button");
            button.click()
            cy.on('window:alert', (text) => {
                expect(text).to.contains("login failed");
            });
         });

        //do login with Wrong value
        it('Do Login with Wrong Value', () =>{
            const email = cy.get("input[name='email']");
            email.type("wrong@gmail.com")
            
            const password = cy.get("input[name='password']");
            password.type("password");

            const button = cy.get("button");
            button.click()

            cy.on('window:alert', (text) => {
                expect(text).to.contains("login failed");
            });

        });

         //do login with Correct value
         it('Do Login with Correct Value', () =>{
            const email = cy.get("input[name='email']");
            email.type("user@react.test")
            
            const password = cy.get("input[name='password']");
            password.type("password");

            const button = cy.get("button");
            button.click()

            cy.on('window:alert', (text) => {
                expect(text).to.contains("welcome");
            });

            cy.url().should('eq','http://localhost:3000/dashboard');

        });

   
});