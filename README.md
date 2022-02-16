#See Your Story

>The purpose of the see your story application is for writers of all types to be able to store notes on their stories, create characters and give each character a journal where they can take notes on that particular character.

>The application is broken up into two parts the server, which handles all of the requests and the client that allows the user to access it.

Server Links:
-Server Repo: https://github.com/dsilverfox/seeyourstoryserver
-Server Deployed: https://seeyourstoryserver.herokuapp.com/
#Client:#
>The client starts its journey at the registration page.


#**Registration**#
Registration is a simple process. 
For a user registration begins with them entering a username and password.

Usernames must be original.

If it does not create successfully the page will not move on.

Passwords must meet the following password requirements.

>Your password MUST be at least 8 characters or longer. 
>Include at least 1 UPPERCASE letter.
>Include at least 1 lowercase letter. 
>Include at least 1 number. 
>Include at least 1 special character


If they do not the user will recieve an alert that states: "Your Password does not meet requirements. Your password MUST be at least 8 characters or longer. Include at least 1 UPPERCASE letter, at least 1 lowercase letter, at least 1 number, and at least 1 special character"

	##Login##
Login takes the user to their dashboard which includes their user card. 

The User card can only be accessed from this page.

It also includes their story creation and view section which allows the to immediately start creating a story or viewing those they have already created.

##Navigation##
The navigation bar exists on all pages and includes the See Your Story title, the users username and unique identifier.

The buttons on the page are as follows:

>Logo: You can always click the logo to return to this view from wherever you are.
>Logout: Logs the user out and returns them to the main page.
>Delete Account: Deletes the users account and all information included.
> It provides a deletion warning message.
>Cancel returns you to the dashboard.
>OK processes the account deletion and returns the user to the dashboard.

##Stories##'=
After creating a user account, the next thing a user will need to do is create their first story. A user can have as many stories as they wish.

>Create Story allows the user to create a story using whatever information they included in the title and content fields.
>Users are able to create blank stories if they just want something to link a character to and don't know what story that character will be a part of yet.
>View All Stories shows them all of their story cards.

Once they have their stor(ies) they will want to click the Select Story button for whichever story they wish to add characters to.

 This calls up the selected story card at the bottom of the screen. It shows the title, the content and three buttons.

>Edit Story allows you to edit your story and includes two buttons. 
	>Cancel Edit returns you back to your selected story card with no changes made.
	>Save Story returns you back to your selected story. The details on this card will not have changed so they can be copy/pasted if need be to re-edit the story if the changes are incorrect.
	>Clicking Save story also reloads your story cards so you can see your changes in your list of stories.
>Delete Story
	>Deletes your story, it does not include any warning messages as this information can be recovered by the user because it still shows on their selected story card if they deleted it by accident.
>Characters
	>Takes the user to a new view where they can begin to create their characters.

#**Characters**#
Once a story or stories has been created and they have clicked on the characters button the user will see a new view. The navigation bar will remain.

New on the page will be the Populate Your World form.

As of right now, this is designed around human characters, other character types will be added in later releases.

The fields are as follows:
>First Name
>Last Name
>Gender
>Age
>Date of Birth
Due to naming conventions, age calculations, calendars and the different ways different worlds handle gender all these fields are simple text boxes. You can enter any information appropriate for your world in those fields.

> Create A New Character: Creates a character and loads the character view to show all characters created by the user, given that they may have one 'home' story but be associated with others, this also allows for viewing the character details for characters involved in serialized or series fictions without having to have a separate character list for each.
>View All Characters: Allows the user to manually pull up all of the characters already created and helps to prevent creating extra characters unecessarily.
>Stories: Returns you to your story view so you can select a new story and start writing characters that would be attached to that story.

	##Character Cards##
Viewing all of the character cards gives the user the option to select a character to work with.
Selecting a character brings up the character view card at the bottom of the page (feel familiar?)
This currently provides the user two options
>Edit Character: Opens the character edit pane.
>Delete Character: Deletes the character.

	##Edit Character##
Edit character allows them to edit any and all of the character details. Cancel edit returns them to the character card. 

	
