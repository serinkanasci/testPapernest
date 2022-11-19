var ran = Math.floor(Math.random() * 40);
var sub = Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
var addr = '157 Boulevard Macdonald 75019 Paris';
let r1 = (Math.random() + 1).toString(36).substring(2);
let r2 = (Math.random() + 1).toString(36).substring(2);
var mail_addr = r1+"test@papernest.com";
var mail_addr2 = r2+"test@papernest.com"
var phone = '0600000000';
var firstname = 'John';
var lastname = 'Doe';

const sizes = ['iphone-x', 'macbook-15']

describe('Test papernest user to select a random magazine and signup for it on PC / phone', () => {
  sizes.forEach(size => {
    it(`Enters and see magazine list selects one then fills the forms on ${size}`, () => {
      cy.viewport(size)
      //intercept all api request for passthrough, so that we can use it to wait for api response
      cy.intercept({
        method: 'POST',
        url: '/api/utils/passthrough/',
      }).as('apiValidation')
  
      //displays papernest page 
      cy.visit('https://app.papernest.com/onboarding?anonymous&anonymousId=test&id_text=1&destination=newspaper')
      //checks that the title of the page is correct 
      cy.title().should("eq","Changement d'adresse de votre abonnement presse | papernest")
      //checks that there is the right amount of magazines visible 
      if(size=='iphone-x'){
        cy.get('[id="newspaper-address_change.provider"]').find('img').its('length').should('eq', 40)
      }else {
        cy.get('[id="newspaper-address_change.provider"]').find('img')
        .should('be.visible')
        .its('length').should('eq', 40)
      }
      //selects a random magazine
      cy.get('[id="newspaper-address_change.provider"]').find('img').eq(ran).parent().click()
      

  
      //checks that the correct message is displayed
      cy.contains("Quel est votre numéro d'abonné ?").should('be.visible')
      //hit Suivant button without entering any value
      cy.contains('Suivant').click()
      
      //should see the error message
      cy.contains("Il semblerait que vous n'ayez pas répondu à la question").should('be.visible')
      //checks that there is the input field and enters some value
      cy.get('input').type(6)
      //hits Suivant to see if works
      cy.contains('Suivant').click()
      
      //should see the according error message
      cy.contains("Ce numéro a l'air trop court, pouvez-vous compléter ?").should('be.visible')
      //checks that there is the input field and enters the right value then type enter after message error disappeared
      cy.get('input').type(sub)
      cy.wait('@apiValidation').its('response.statusCode').should('eq', 200)
      cy.contains("Ce numéro a l'air trop court, pouvez-vous compléter ?", {timeout: 10000}).should('not.exist');
      cy.contains('Suivant').click()
      
      
      //checks that the correct message is displayed
      cy.contains("Quelle est votre nouvelle adresse ?").should('be.visible')
      //hit Suivant button without entering any value
      cy.contains('Suivant').click()
      
      //should see the error message
      cy.contains("Il semblerait que vous n'ayez pas répondu à la question").should('be.visible')
      //checks that there is the input field and enters some value
      cy.get('input').type(addr)
      
      //click on the correct adress
      cy.contains('a', addr).click()
      
      //hits Suivant to see if works
      cy.contains('Suivant').click()
      
  
  
  
      //checks that the correct message is displayed
      cy.contains("Vos informations personnelles").should('be.visible')
      //hit Suivant button without entering any value
      cy.contains('Suivant').click()
      
      //should see the error message
      cy.contains("Il semblerait que vous n'ayez pas répondu à la question").should('be.visible')
      //checks that there is the input field for email and enters some wrong value
      cy.get('[id="user.email"]').type("wrongmail")
      
      //should see the equivalent error message 
      cy.contains("L'email n'a pas l'air valide, pouvez-vous réessayer ? Exemple : prenom.nom@gmail.com").should('be.visible')
      //clear the input then insert used value
      cy.get('[id="user.email"]')
      .clear()
      .type(mail_addr)
      if(size=='macbook-15'){
        //should see the equivalent error message
        cy.contains("Cet email a déjà été utilisé").should('be.visible')
        //clear the input then insert correct value
        cy.get('[id="user.email"]')
        .clear()
        .type(mail_addr2)
      }
      
      
      //checks that there is the input field for phone and enters some wrong value
      cy.get('[id="user.phone_number"]').type("12345")
      
      //should see the equivalent error message
      cy.contains("Le numéro n'a pas l'air valide, pouvez-vous réessayer ?").should('be.visible')
      //clear the input then insert real value
      cy.get('[id="user.phone_number"]')
      .clear()
      .type(phone)
      
      //checks that there is the input field for firstname and enters some wrong value
      cy.get('[id="user.first_name"]').type("12345")
      
      //should see the equivalent error message -- l'erreur devrait être pénom et non nom!
      // cy.contains("Ce prénom contient des caractères non valides, pouvez-vous réessayer ?").should('be.visible')
      //clear the input then insert real value
      cy.get('[id="user.first_name"]')
      .clear()
      .type(firstname)
      
      //checks that there is the input field for lastname and enters some wrong value
      cy.get('[id="user.last_name"]').type("4645")
      
      //should see the equivalent error message
      cy.contains("Ce nom contient des caractères non valides, pouvez-vous réessayer ?").should('be.visible')
      //clear the input then insert real value, wait until error disappear then hit enter
      cy.get('[id="user.last_name"]')
      .clear()
      .type(lastname)
      
      cy.contains("Ce nom contient des caractères non valides, pouvez-vous réessayer ?").should('not.exist');
      cy.contains('Suivant').click()
      
  
      //click the date picker
      cy.get('[id="newspaper-address_change.begin_date"]').click();
      
      //try using previous month shouldn't be able
      // cy.get('[aria-label="Previous month"]').should('be.disabled');
      //click next month button
      cy.get('[aria-label="Next month"]').click();
      
      //choose date 21
      cy.contains('21', {timeout: 10000}).click();
      
  
  
      //checks that the correct message is displayed
      cy.contains("Est-ce que tout est bon " + firstname + " ?").should('be.visible')
      //hit Suivant button without entering any value
      cy.contains('Valider').should('be.visible')
      //should see the message to add a message for the team
      cy.contains("Si vous le souhaitez, vous pouvez laisser un message à notre équipe (facultatif)").should('be.visible')
      //check that all datas are correctly displayed
      cy.contains(addr).should('be.visible') 
      if(size=='iphone-x'){
        cy.contains(mail_addr).should('be.visible') 
      }else{
        cy.contains(mail_addr2).should('be.visible') 
      }
      //Beware no phone number written in the summary
      // cy.contains(phone).should('be.visible') 
      cy.contains(firstname).should('be.visible') 
      cy.contains(lastname).should('be.visible') 
      //checks that there is the input field for the message and enters some value to it
      cy.get('[id="newspaper-address_change.comments"]')
      .type("Hello this is a test")
      
      cy.contains('Valider').click()
      
  
  
      //check the last message, if all correctly written
      cy.contains("Merci " + firstname).should('be.visible')
      cy.contains("Votre demande de changement d'adresse a bien été effectué").should('be.visible')
      //also check if user can see the phone number correctly
      cy.contains("09 77 42 34 36").should('be.visible')
      //Everything ends correctly
      cy.contains('Terminer')
      .should('be.visible')
      .click()
      
    });
  })
  
  //OLD CODE to test only on PC
  
  // it('Enters and see magazine list selects one then fills the forms on PC', () => {
  //   //intercept all api request for passthrough, so that we can use it to wait for api response
  //   cy.intercept({
  //     method: 'POST',
  //     url: '/api/utils/passthrough/',
  //   }).as('apiValidation')

  //   //displays papernest page 
  //   cy.visit('https://app.papernest.com/onboarding?anonymous&anonymousId=test&id_text=1&destination=newspaper')
  //   //checks that the title of the page is correct 
  //   cy.title().should("eq","Changement d'adresse de votre abonnement presse | papernest")
  //   //checks that there is the right amount of magazines visible 
  //   cy.get('[id="newspaper-address_change.provider"]').find('img')
  //   .should('be.visible')
  //   .its('length').should('eq', 40)
  //   //selects a random magazine
  //   cy.get('[id="newspaper-address_change.provider"]').find('img').eq(ran).click()


  //   //checks that the correct message is displayed
  //   cy.contains("Quel est votre numéro d'abonné ?").should('be.visible')
  //   //hit Suivant button without entering any value
  //   cy.contains('Suivant').click()
    
  //   //should see the error message
  //   cy.contains("Il semblerait que vous n'ayez pas répondu à la question").should('be.visible')
  //   //checks that there is the input field and enters some value
  //   cy.get('input').type(6)
  //   //hits enter to see if works too
  //   cy.get('input').type('{enter}')
    
  //   //should see the according error message
  //   cy.contains("Ce numéro a l'air trop court, pouvez-vous compléter ?").should('be.visible')
  //   //checks that there is the input field and enters the right value then type enter after message error disappeared
  //   cy.get('input').type(sub)
  //   cy.wait('@apiValidation').its('response.statusCode').should('eq', 200)
  //   cy.contains("Ce numéro a l'air trop court, pouvez-vous compléter ?", {timeout: 100000}).should('not.exist');
  //   cy.contains('Suivant').click()
    
    
  //   //checks that the correct message is displayed
  //   cy.contains("Quelle est votre nouvelle adresse ?").should('be.visible')
  //   //hit Suivant button without entering any value
  //   cy.contains('Suivant').click()
    
  //   //should see the error message
  //   cy.contains("Il semblerait que vous n'ayez pas répondu à la question").should('be.visible')
  //   //checks that there is the input field and enters some value
  //   cy.get('input').type(addr)
    
  //   //click on the correct adress
  //   cy.contains('a', addr).click()
    
  //   //hits enter to see if works too
  //   cy.get('input').type('{enter}')
    



  //   //checks that the correct message is displayed
  //   cy.contains("Vos informations personnelles").should('be.visible')
  //   //hit Suivant button without entering any value
  //   cy.contains('Suivant').click()
    
  //   //should see the error message
  //   cy.contains("Il semblerait que vous n'ayez pas répondu à la question").should('be.visible')
  //   //checks that there is the input field for email and enters some wrong value
  //   cy.get('[id="user.email"]').type("wrongmail")
    
  //   //should see the equivalent error message 
  //   cy.contains("L'email n'a pas l'air valide, pouvez-vous réessayer ? Exemple : prenom.nom@gmail.com").should('be.visible')
  //   //clear the input then insert real value
  //   cy.get('[id="user.email"]')
  //   .clear()
  //   .type(mail_addr)
    
  //   //checks that there is the input field for phone and enters some wrong value
  //   cy.get('[id="user.phone_number"]').type("12345")
    
  //   //should see the equivalent error message
  //   cy.contains("Le numéro n'a pas l'air valide, pouvez-vous réessayer ?").should('be.visible')
  //   //clear the input then insert real value
  //   cy.get('[id="user.phone_number"]')
  //   .clear()
  //   .type(phone)
    
  //   //checks that there is the input field for firstname and enters some wrong value
  //   cy.get('[id="user.first_name"]').type("12345")
    
  //   //should see the equivalent error message -- l'erreur devrait être pénom et non nom!
  //   // cy.contains("Ce prénom contient des caractères non valides, pouvez-vous réessayer ?").should('be.visible')
  //   //clear the input then insert real value
  //   cy.get('[id="user.first_name"]')
  //   .clear()
  //   .type(firstname)
    
  //   //checks that there is the input field for lastname and enters some wrong value
  //   cy.get('[id="user.last_name"]').type("4645")
  //   //should see the equivalent error message
  //   cy.contains("Ce nom contient des caractères non valides, pouvez-vous réessayer ?").should('be.visible')
  //   //clear the input then insert real value, wait until error disappear then hit enter
  //   cy.get('[id="user.last_name"]')
  //   .clear()
  //   .type(lastname)
    
  //   cy.contains("Ce nom contient des caractères non valides, pouvez-vous réessayer ?").should('not.exist');
  //   cy.get('[id="user.last_name"]').type('{enter}')
    

  //   //click the date picker
  //   cy.get('[id="newspaper-address_change.begin_date"]').click();
    
  //   //try using previous month shouldn't be able
  //   // cy.get('[aria-label="Previous month"]').should('be.disabled');
  //   //click next month button
  //   cy.get('[aria-label="Next month"]').click();
    
  //   //choose date 21
  //   cy.contains('21', {timeout: 10000}).click();
    


  //   //checks that the correct message is displayed
  //   cy.contains("Est-ce que tout est bon " + firstname + " ?").should('be.visible')
  //   //hit Suivant button without entering any value
  //   cy.contains('Valider').should('be.visible')
  //   //should see the message to add a message for the team
  //   cy.contains("Si vous le souhaitez, vous pouvez laisser un message à notre équipe (facultatif)").should('be.visible')
  //   //check that all datas are correctly displayed
  //   cy.contains(addr).should('be.visible') 
  //   cy.contains(mail_addr).should('be.visible') 
  //   //Beware no phone number written in the summary
  //   // cy.contains(phone).should('be.visible') 
  //   cy.contains(firstname).should('be.visible') 
  //   cy.contains(lastname).should('be.visible') 
  //   //checks that there is the input field for the message and enters some value to it
  //   cy.get('[id="newspaper-address_change.comments"]')
  //   .type("Hello this is a test")
    
  //   //Be aware hiting enter does not validate even if there is a message that says hit enter to validate
  //   // .type('{enter}')
  //   cy.contains('Valider').click()
    


  //   //check the last message, if all correctly written
  //   cy.contains("Merci " + firstname).should('be.visible')
  //   cy.contains("Votre demande de changement d'adresse a bien été effectué").should('be.visible')
  //   //also check if user can see the phone number correctly
  //   cy.contains("09 77 42 34 36").should('be.visible')
  //   //Everything ends correctly
  //   cy.contains('Terminer')
  //   .should('be.visible')
  //   .click()
    
  // })
})
