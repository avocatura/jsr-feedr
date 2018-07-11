
##Project 2 - Feedr

##The purpose of Feedr is to pull from 3 different News Source APIs and display summaries from top stories.

##The Feedr pulls from the Guardian, The New York Times, and US World News, with the Guardian being the default source.
##On loading of the page, a loding screen appears until the API has fully loaded. Once the API has loaded, 6 articles titles are displayed along with subcategory, thumbnail and word count.
##If a title is clicked on, a pop up displays with a short description and a link to the outside source. The descriptions are capped at 1000 characters.
##The pop up closes when you click the X.

##The dropdown menu allows the user to choose from the two other API's which are loaded using the loader screen when clicked on. *Both The New York Times and US World News use date published instead of word count because they don't have that information *US World News uses the article's publication in place of a subsection because it didn't have that data.

##The Feedr button brings the user back to the default API.

##The search box expands when the icon is clicked and collapses when the 'enter' key is pressed or when the icon is clicked again.

##Two technical issues that I wasn't able to fix were 1) The API's don't have full data for all of their articles so some variables such as the thumbnails come up as null. If I were to improve the feedr I would write a function to skip over any articles with null data. 2) The pop up function only works sometimes, and I think it has something to do with the fact when those null articles pop up they use data from the other APIs. So, I would try clearing that data each time a new API is called.
