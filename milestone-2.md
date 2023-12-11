**Table of Contents**
1. Task & Schedule Management
    - [Work Breakdown Structure](#work-breadown-structure)
    - [Gantt Chart  & Network Diagram](#gantt-chart--network-diagram)
1. [Requirements](#requirements)
1. [Use Cases](#use-cases)
1. [Use Case Diagram](#use-case-diagram)
1. [Research on other systems](#research-on-other-systems)
1. [API Descriptions](#api-descriptions)



## WBS & Gantt Chart
![gantt chart]()



## Requirements 
Functional Requirements:
Input Management:

The system should allow users to input a list of ingredients they have at home.
It should have an autocomplete feature for ingredient names to ensure accuracy and uniformity.
Capability to specify quantities and units for each ingredient.
Recipe Generation:

Generate a list of recipes based on the input ingredients.
Each recipe should include a list of needed ingredients, their quantities, preparation steps, and cooking time.
The system should prioritize recipes that use the most of the provided ingredients, with minimal extra purchases required.
Option for users to specify dietary restrictions (vegan, gluten-free, nut allergies, etc.) and cuisine preference.
Recipe Presentation:

Display recipes with a clear title, image, preparation and cooking time.
Highlight any additional ingredients that the user might need to buy.
Option to sort recipes based on cooking time, complexity, or user ratings.
User Feedback:

Allow users to rate generated recipes.
Allow users to comment on recipes and suggest modifications.
Recipe Saving:

Option for users to save favorite recipes for easy future access.
Search and Filter:

If the user wishes, they should be able to search the database for specific recipes and filter results by ingredients, diet, cooking time, etc.
Non-functional Requirements:
Performance:

The system should generate recipes quickly, aiming for a response time of under a few seconds.
Usability:

The user interface should be intuitive, allowing even non-tech-savvy users to easily navigate and utilize features.
Scalability:

The system should be designed to handle a growing database of recipes and a large number of concurrent users.
Security:

User data, if any (like saved recipes, preferences, etc.), should be securely stored.
Any interaction with external databases or systems should be secure and encrypted.
Accessibility:

The system should be accessible on various devices, including desktops, tablets, and smartphones.
The design should consider accessibility guidelines to ensure it's usable by individuals with disabilities.
Reliability:

The system should have a high uptime, with redundancy measures in place to handle any server failures.
Regular backups of the recipe database should be maintained.
Maintainability:

The system should be designed in a modular fashion to allow for easy updates, bug fixes, and feature additions.
Data Integrity:

The system should ensure that the recipe database remains accurate, with regular checks and updates to keep recipes relevant and correct.
Internationalization:

While the initial system might be in one language, there should be provisions to easily translate and adapt it for various regions and languages in the future.
This document provides a comprehensive set of functional and non-functional requirements for an AI Recipe Generator. Depending on the development process, further requirements and specifications might be needed, especially during the design and testing phases.

## Use Cases 
Use Cases

Id: UC-1
Name: New User Login
Actor: New User                                                                                     Type: External
Description: The user need to create a new account
Trigger: Launching the app for the first time

Major input:                                                                                   Major Output:

1.	Users information                                                          1. New account created
                                                                                      2.  User logged into the system


Basic Flow:

1.	The user opens the application and selects the option to sign up
2.	The user enters their personal information, with an email and password
3.	Information is validated by the system
4.	User is automatically logged in after registering




Use Cases

Id: UC-2
Name: Generating Recipes
Actor: Registered user                                                                          Type: External
Description: The user wants to generate a recipe
Trigger: User selects option to generate a recipe

Major input:                                                                                   Major Output:

1.	Users preferences                              1. A recipe suggestion tailored to preference
                                                            2.  Option to save the recipe


Basic Flow:

1.	The user selects the option to generate a recipe
2.	The user specifies their preferences, such as cuisine type, restrictions, and available ingredients
3.	The system process the users input and generates a recipe
4.	The user can view the recipe and choose to save it or generate another recipe









Use Cases

Id: UC-3
Name: Scanning foods
Actor: Registered user                                                                      Type: External
Description: The user wants to scan food and generate a recipe
Trigger:User selects the option to scan food

Major input:                                                                                   Major Output:

1.	Scanned food item                                                          1. Recipe suggestion
                                                                                      2.  Cooking instructions


Basic Flow:

1.	The user selects the scan food option
2.	The user scans the food item(s)
3.	The system identifies the item(s) and retrieves relevant information
4.	The user is presented with a suggestion
5.	The user can view cooking instructions













Use Cases

Id: UC-4
Name: Dietary Restrictions
Actor: Registered Users                                                                                     Type: External
Description: The user wants to set a dietary restriction
Trigger: The user accesses the dietary restriction setting

Major input:                                                                                   Major Output:

1.	Selection of restrictions (Vegan, gluten-free,etc..)         1. Preferences updated
                                                              2.  Recipe generator is adapted to preferences


Basic Flow:

1.	The user opens the dietary restriction setting
2.	The user selects from a list of common restrictions
3.	The system updates the users preferences to exclude ingredients and recipes that are against the restrictions
4.	Recipe generation is now tailored to the user





Use Cases

Id: UC-5
Name: Previous Recipe List
Actor: Registered User                                                                                  Type: External
Description: The user wants to view previous recipes
Trigger: User navigates to the My Recipes section

Major input:                                                                                   Major Output:

1.	Users request to view saved recipes                     1. List of saved recipes are displayed
                                                                                 


Basic Flow:

1.	The user goes to the My Recipes section
2.	The system displays a list previous and saved recipes
3.	The user can select a recipe to start cooking



Use Cases

Id: UC-6
Name: Delete Recipe
Actor: Registered User                                                                                     Type: External
Description: The user wants to remove a saved recipe
Trigger: The user chooses to delete a recipe

Major input:                                                                                   Major Output:

1.	User requests to delete a recipe                                    1. Confirmation prompt
                                                                                      2.  Deleted recipe


Basic Flow:

1.	The user goes to the My Recipes section
2.	The user selects the recipes they want to delete
3.	The system prompts the user to confirm
4.	If confirmed, delete the selected recipes




## Use Case Diagram 

## Research on other systems

## API Descriptions



