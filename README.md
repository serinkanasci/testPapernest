
# **Papernest Test**

This project has two subprojects :
- Automation of a test in Cypress
- Listing of criterias to validate an implementation


# **1) Automation** 
# Goal

Create a test of one of the user flow on the papernest application (A small flow allowing to ask for inform magazine about a moving)

# Behavior

- User enter the app “newspaper” flow ([https://app.papernest.com/onboarding?anonymous&anonymousId=test&id_text=1&destination=newspaper](https://app.papernest.com/onboarding?anonymous&anonymousId=test&id_text=1&destination=newspaper))
- Select a magazine
- Enter a subscriber number (few random char)
- An address (ex: 157 Boulevard Macdonald 75019 Paris)
- Enter personal informations:
    - An email address (should be unique AND **ends with “[test@papernest.com](mailto:test@papernest.com)”**)
    - A phone number (ex: 0600000000)
    - Your real first name and last name
- Select a date
- Validate
- After validation, you should see the next “dialog window”

Answer here : [https://github.com/serinkanasci/testPapernest/tree/main/cypress/e2e/papernest.cy.js](https://github.com/serinkanasci/testPapernest/tree/main/cypress/e2e/papernest.cy.js)

# **2) Criterias** 


# Instructions

- Use Cypress (if you don’t know use the language/framework/technology of your choice)
- Put the result in a public Github repository, and send it to us
- Feel free to ask us questions if needed
- [Optional] Do the exercise for Desktop AND Mobile

# Note

- For email address, you can put a random string in front of “[test@papernest.com](mailto:test@papernest.com)” as long as the address is unique between each run. The end of the address is very important. It allow us to identify test account in production and avoid launch a real operational process.




# Context

papernest wants to implement in his web application the Google SSO connection, users will be able to sign in or sign up via the Google SSO connector.

Here is the documentation of the Google SSO: [https://developers.google.com/identity/sign-in/web/sign-in](https://developers.google.com/identity/sign-in/web/sign-in)

Developers, Product owner and QA discuss about the feature implementation. They decide about adding a small button in the home page ( you can see it here [https://app.papernest.com/home/](https://app.papernest.com/home/)) to redirect to the Google SSO system. 

 **⚠️ *Important notes* ⚠️ *:  This is an exercise, we have already implemented the feature, let’s consider it doesn’t exist yet and it should be created from scratch (no other SSO system implemented).*

# Instructions

You are the QA Engineer present during the discussion, you are responsible of the quality of the web application.

Please write the acceptance criterias of the features and eventually the questions the product owner or developers should answer about.

Answer here : [https://github.com/serinkanasci/testPapernest/tree/main/Google_SSO_Criterias.pdf](https://github.com/serinkanasci/testPapernest/tree/main/Google_SSO_Criterias.pdf)

## API command used in the test

#### Passthrough

```http
  POST /api/utils/passthrough/
```

Intercepted this command in the code to check if action validated for avoiding use of wait with specific time(best-practice).

## Authors

- [@serinkanasci](https://www.github.com/serinkanasci)

