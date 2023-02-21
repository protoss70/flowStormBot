## @flowstorm/client

### How to embed bot client in your project or website?

To use bot client in your project or website you can simple link it from bot.flowstorm.ai or install via npm.

#### link from bot.flowstorm.ai

1. add link to js and css in your page  

```html
<link href="https://bot.flowstorm.ai/client-bot.css" rel="stylesheet">
<script src="https://bot.flowstorm.ai/client-bot.js"></script>
```

2. call `initFSClientBot` function in your code 

```html
<script>
    initFSClientBot({
        botKey: '5f7db5f1e662e830b20dbe7c',
    });
</script>
```

#### import from npm

1. install **@flowstorm/client** from npm repository

`npm install @flowstorm/client`

You will need to add .npmrc file to you project with these settings:

`@flowstorm:registry=https://gitlab.com/api/v4/projects/23512224/packages/npm/`

2. import js and css in your project

```javascript
import { initFSClientBot } from '@flowstorm/client';
```

```sass
@import "~@flowstorm/client/client-bot.css";
```

3. call `initFSClientBot` function in your code

```javascript
initFSClientBot({
    botKey: '5f7db5f1e662e830b20dbe7c',
});
```

### client bot settings

To the `initFSClientBot` function you can pass various settings:

Property | Type | Default value | Description
| :--- | :---  | :--- | :---
elementId  | string | null | ID of element which should be used for bot client. You can prepare element on your page and display bot there or if it is not set, element with bot will be added just before the closing </ body tag on your page.
customCssClass | string | null | If you are not using your own `elementId`, you can add custom CSS class to the generated element with client bot via this property. You can add multiple classes, just separate names with space. Example `myClass1 myClass2`.
botKey  | string | N/A | ID of your application.
startMessage  | string | '#intro' | Allows to set the starting signal for the conversation
allowUrlParams  | boolean | false | Allow to pass some information with client bot setup via url params. You can pass:<br>`botKey` - as part of pathname. Example: https://your.site.name/<botKey> or https://your.site.name/?key=<botKey> <br>`animObjects` - shortcut for `backgroundAdvancedAnimationParticlesCount` (see below) <br>`animate` - shortcut for `backgroundSimpleAnimation` (see below)
domain  | string | '' | Allow to set domain for stored cookies. Keep empty, if you don't need this.
guiMode  | string | 'chat' | Layout of client bot. Can be set to `kiosk` (only one message from bot and client are visible) or `chat` (whole history of communication is visible).
fullScreen  | boolean | false | UI will take whole screen to render. It will render UI to 100vw and 100vh. So this view is recommended for layouts without any other elements.
widgetSize  | { width: string, height: string } | { width: '400px', height: '700px' } | UI will take whole screen to render.UI will be set to width and height. Width and height are string - example `'500px'`, `'100%'`, `'50vw'`, ...
backgroundColor  | string | #927263 | Default background color.
backgroundImage  | string | null | Default background image. It has to be url of background image. If both `backgroundColor` and `backgroundImages` are set, `backgroundImage` has higher priority.
backgroundImageBlur  | number | 0 | Default blur of added background image.
imageAverageColorOpacity  | number (float) | 0.5 | In `kiosk` mode can be image added to the bot response. Background around this image is calculated as average color of this image. And with this property you can set opacity of this background. It has to be number between 0 - 1.
animationSpeed  | number | 500 | Speed of animations (hiding texts, scrolling, ...) - in milliseconds.
backgroundSimpleAnimation  | boolean | true | First layer of animations over background - turns on/off simple animation of main gradient on the background.
backgroundAdvancedAnimationParticlesCount  | number | 5 | Second level of animations over background - value can be 0-20 - count of animated objects added to the background with random opacity.
userMessageBackgroundColor  | string | rgba(255, 255, 255, .3) | Default background color of user message in `kiosk` gui mode.
userMessageTextColor  | string | #ffffff | Default color of user message.
userMessageTextOutlineColor  | string | rgba(0, 0, 0, .5) | Default color of outline of user message. Outline is visible only in `kiosk` gui mode with avatar enabled.
botMessageBackgroundColor  | string | rgba(0, 0, 0, .4) | Default background color of bot message in `kiosk` gui mode.
botMessageTextColor  | string | #ffffff | Default color of bot message.
botMessageTextOutlineColor  | string | rgba(0, 0, 0, .5) | Default color of outline of bot message. Outline is visible only in `kiosk` gui mode with avatar enabled.
textInputEnabled | boolean | true | Displays input for messages - turns on/off input for user messages and buttons for interaction (removes all buttons).
reverseAvatarOrder | boolean | false | Displays avatar in reverse order in ui. Avatar is displayed on the bottom side of the widget. Available only in chat gui mode.
collapsable | boolean | true | UI will be rendered into overlayer fixed to the bottom of the page. By default is collapsed. It will use width and height of `widgetSize`. Fullscreen mode is not allowed in this case.
collapsed | boolean | true | Setting for `collapsable` mode. It is allowing to expend/collapse BotUI widget on init.

### Style customization

#### Change of play icon

```html
<style>
    .fs-play::after {
        background-image: url("https://core.flowstorm.ai/file/assets/images/TTP/promethist-background-brown.png");
    }
</style>
```

#### Change of logo

```html
<style>
    [data-collapsable] [data-trigger]::after {
        background-image: url("https://core.flowstorm.ai/file/assets/images/TTP/promethist-background-brown.png");
    }
</style>
```

### Examples

1. Render bot into your element with id `client`, in `kiosk` mode, cover whole size of predefined element, without user input, with initial background image

```html
<div class="container" style="position: relative; width: 400px; height: 500px;">
    <div class="client" style="position: absolute; left: 50px; top: 50px;"></div>
</div>
```

```javascript
initFSClientBot({
    elementId: 'client',
    botKey: '5f7db5f1e662e830b20dbe7c', // botKey of your application
    backgroundImage: 'https://core.flowstorm.ai/file/assets/images/TTP/promethist-background-brown.png',
    textInputEnabled: false,
    guiMode: 'kiosk',
    widgetSize: {
        width: '100%',
        height: '100%',
    },
});
```

2. Render bot into your page and create new element for it and will add classes `myClass1 myClass2`, in `chat` mode (by default), cover whole size of page (if there is nothing in html), with user input (by default), with initial background color

```javascript
initFSClientBot({
    botKey: '5f7db5f1e662e830b20dbe7c', // botKey of your application
    fullScreen: true,
    customCssClass: 'myClass1 myClass2',
    backgroundColor: '#6737ff',
});
```
