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
Easy Prep is a food application relying heavily on AI and ML. To be able to create good recipes and safe food for anyone who uses the app. However, to understand how the system works and the design that the app aims to accomplish, several other applications make Easy Prep more feasible. “Hey Siri,” the famous Apple personal assistant, uses AI and ML technology to recognize the voice of the users and determine if the user’s voice was detected based on a score in the algorithm. If the score is high enough, “Hey Siri” will speak. This specific function has nothing to do with Easy Prep initially, but the underlying functionality does. The “Hey Siri” feature uses a scoring system to rate whether the user who spoke clearly and correctly said those specific words and scored it through its algorithm. Easy Prep will need the same functionality to give users accurate recipes so that they can create something tasty, and edible based on their food needs and diet. 

This leads perfectly to the next system that gives Easy Prep more clarity, the Tesla self-driving car system. This system focuses more on the ML aspect of it, where the car needs lots of data to make accurate and safe decisions for drivers. Tesla uses large data models to predict and enhance user driving experience. Because of the data the car receives, they can make split-second decisions based on the sensors and monitors in the vehicle. Easy Prep will need similar match-making ML algorithms to match foods correctly based on the food users scan into the application. With these two systems running in Easy Prep, it can score the food the user puts into the application. The application data sets and algorithms can compare the food to a wide range of images and recipes to accurately produce what foods the user can make based on what they scanned in. 

Reference: 
Hey Siri: An on-device DNN-powered voice trigger for Apple’s personal assistant. Apple Machine Learning Research. (n.d.). https://machinelearning.apple.com/research/hey-siri 
Team, T. A. (2022, May 27). Tesla’s self driving algorithm explained. https://towardsai.net/p/l/teslas-self-driving-algorithm-explained 
Shires, A. (2020, September 28). Building ML-driven applications. Medium. https://medium.com/fullstackai/building-ml-driven-applications-4e83cb95c0c 



## API Descriptions


Dalle API – Image 
The Dalle Api is the API that was created from Open AI. It is an image generator API that makes images based on text prompts. But for Easy Prep AI, we would pass in the scanned meal information to the text prompt, allowing pictures of the food that can be created to show the generated food that could be made.
Link: https://openai.com/research/dall-e

Spoonacular API – Recipes 
It is a food recipe API that can search different recipes, nutrients, ingredients, etc., for food you can create. This API will be used for recipes in the backend of our application, and it will help ensure that the food that users are scanning is edible.
Link: https://spoonacular.com/food-api

Open Food Facts API- Food Information 
This is the world's most extensive open food API, with contributions since 2012. It has a comprehensive database of all listed grocery store foods worldwide. Having this API will allow Easy Prep access to almost any food worldwide. It will also be able to give each breakdown of the food if asked for it by the user. Such as Calorie amount, and other nutritional information that may be important to the user. 
Link: https://world.openfoodfacts.org/data





