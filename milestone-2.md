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



##Requirements 
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

##Use Cases 

##Use Case Diagram 

##Research on other systems

##API Descriptions



