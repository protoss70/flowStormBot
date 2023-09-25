# Bot Parameters

## Functional

> - **goTo**: _boolean_, allow going back to a point in your application

> - **feedback**: _boolean_, _IN DEVELOPMENT_ Allow user feedback in your apps

> - **botKey**: _string_, Flowstorm ID of your app

> - **textInputEnabled**: _boolean_, enable or disable text input from user. Shows an input text field if true.

> - **collapsable**: _boolean_, allow the bot to collapse, if false the bot will remain open.

> - **search**: _boolean_, allow AI powered elastic search from the bot, you need to contact us first in order to use this feature.

> - **guiMode**: _string_, ("kiosk", "chat"), choose between two modes, kiosk (IN DEVELOPMENT) and chat

> - **pdfPageCallback**: _function_, This callback function activates when the search locates a particular page in your PDF, enabling you to change pages using it.

> - **sound**: _boolean_, toggles the application's audio output (on/off).

# UI

> - **title**: _string_, title displayed in the UI header

> - **triggerImage**: _string_, collapsable bot icon

> - **suggestions**: \*{textColor: string, backgroundColor: string, hoverBackgroundColor: string,activeBackground: string}, allows customization of the suggestion buttons

> - **userMessageBackgroundColor**: _string_, background color of user messages

> - **userMessageTextColor**: _string_, text color of user messages

> - **botMessageBackgroundColor**: _string_, background color of bot messages

> - **botMessageTextColor**: _string_, text color of bot messages

> - **showTooltips**: _boolean_, Show English tooltips when icons are hovered

> - **suggestionMode**: _string_ ("disappearing", "non-disappearing"), choose the style of your suggestions buttons, disappearing suggestions will be removed on click while non-disappearing ones will remain.

> - **suggestionsListView**: _boolean_, aligns suggestions to give a more orderly look while taking more space.

> - **controlIcons**: {mic: boolean, mute: boolean, restart: boolean}, choose which of the three icons you want shown in your bot.

> - **backgroundColor**: _string_, Primary background color for the bot

> - **backgroundSecondaryColor**: _string_, secondary background color for the bot

> - **backgroundImage**: _string_, background image URL only

> - **backgroundImageBlur**: \*number\*\*, background image blur rate

# Background Animation

> - **backgroundSimpleAnimation**: _boolean_, allows simple background animation with set amount of particles

> - **animationSpeed**: _number_, speed of animations (hiding texts, ...) - in milliseconds.

> - **backgroundAdvancedAnimationParticlesCount**: _number_, if background animation is allowed this will determine the amount of moving animation particles there are: (0 - 20)
