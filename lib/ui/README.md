## Development
**Setup development**
```sh
yarn
```
**Development mode**
```sh
yarn start
```
**Production mode**
```sh
yarn build
```
## Usage
In production mode is generated dist folder. It contains index.html with sample inicialization of BotUI. It is including base css/javascript/font files.\
To use BotUI you have to create element (div) with id attribute.
```html
<div id="stage"></div>
```
To initialize BotUI you have to include app.bundle.js and app.css in head element of your html page. After that you can init BotUI and call its API.\
To init BotUI you have to create `new BotUI(<ID of element>, <settings>)`.
```js
<script>
    const botUI = new BotUI('stage', {
        guiMode: 'kiosk',
        fullScreen: true,
        widgetSize: {
            width: '700px',
            height: '400px',
        },
        imageAverageColorOpacity: 0.5,
        backgroundImageBlur: 5,
        animationSpeed: 500,
        backgroundSimpleAnimation: true,
        backgroundAdvancedAnimationParticlesCount: 20
    });
</script>
```
***BotUI init settings***
- **guiMode**: GUIMode - GUI mode - can be set to `kiosk` or `chat`
- **fullScreen**: boolean - UI will take whole screen to render
- **widgetSize**: { width: string, height: string } - UI will be set to width and height. Width and height are string - example `'500px'`, `'100%'`, `'50vw'`, ...
- **backgroundColor**: string - default background color. Can be changed after init via `setBackgroundColor()`
- **backgroundImage**: string - default background image. Can be changed after init via `setBackgroundImage()`. It has to be url of background image. If both `backgroundColor` and `backgroundImages` are set, `backgroundImage` has higher priority.
- **backgroundImageBlur**: number - blur of added image via `setBackgroundImage()`. It has to be whole number.
- **imageAverageColorOpacity**: number (float) - opacity of average color of added image - see `setImage()`. It has to be number between 0 - 1.
- **animationSpeed**: number - speed of animations (hiding texts, ...) - in milliseconds.
- **backgroundSimpleAnimation**: boolean - first layer of animations over background - turns on/off simple animation of main gradient on the background
- **backgroundAdvancedAnimationParticlesCount**: number - second level of animations over background - value can be 0-20 - count of animated objects added to the background with random opacity
- **userMessageBackgroundColor**: string - default background color of user message.
- **userMessageTextColor**: string - default color of user message.
- **userMessageTextOutlineColor**: string - default color of outline of user message. Outline is visible only in kiosk gui mode with avatar enabled.
- **botMessageBackgroundColor**: string - default background color of bot message.
- **botMessageTextColor**: string - default color of bot message.
- **botMessageTextOutlineColor**: string - default color of outline of bot message. Outline is visible only in kiosk gui mode with avatar enabled.
- **textInputEnabled**: boolean - displays input for messages - turns on/off input for user messages and buttons for interaction (removes all buttons). By default it is enabeled (true) for GUI mode `chat` and disabled (false) for `kiosk`
- **reverseAvatarOrder**: boolean - displays avatar in reverse order in ui. Avatar is displayed on the bottom side of the widget. Available only in chat gui mode.
- **collapsable**: boolean - UI will be rendered into overlayer fixed to the bottom of the page. By default is collapsed. It will use width and height of `widgetSize`. Fullscreen mode is not allowed in this case.
- **collapsed**: boolean - setting for `collapsable` mode. It is allowing to expend/collapse BotUI widget on init.

***Default settings***

```json
{
  animationSpeed: 500,
  backgroundAdvancedAnimationParticlesCount: 20,
  backgroundColor: '#927263',
  backgroundImage: null,
  backgroundImageBlur: 0,
  backgroundSimpleAnimation: true,
  detectOrientation: true,
  fullScreen: true,
  customIcons: false,
  arrowIcon: 'icon--content--arrow-up',
  micIcon: 'icon--content--mic',
  pauseIcon: 'icon--content--pause',
  playIcon: 'icon--content--play',
  guiMode: GUIMode.KIOSK,
  imageAverageColorOpacity: 0.5,
  widgetSize: {
    height: '600px',
    width: '400px',
  },
  userMessageBackgroundColor: 'rgba(255, 255, 255, .3)',
  userMessageTextColor: '#ffffff',
  userMessageTextOutlineColor: 'rgba(0, 0, 0, .5)',
  botMessageBackgroundColor: 'rgba(0, 0, 0, .4)',
  botMessageTextColor: '#ffffff',
  inputAudio: true,
  outputAudio: true,
  botMessageTextOutlineColor: 'rgba(0, 0, 0, .5)',
  reverseAvatarOrder: false,
  collapsable: false,
  collapsed: false,
}
```

***BotUI API***
- **setOrientation(orientation: OrientationEnum)** - sets orientation of UI; OrientationEnum - is string "landscape" or "portrait"
- **setState(stateType: StateTypeEnum)** - N/A
- **setBackgroundColor(color: string)** - sets background color of UI - string with color - example `'#ffffff'`, `'white'`, `'rgba(0, 0, 0, .4)'`
- **setBackgroundImage(url: string, blur: number = backgroundImageBlur)** - sets background image via url, blur of background can be adjusted as second argument of this function. If it is not set value from init / default is used. Has higher priority then `backgroudColor`.
- **setUserText(text: string = null)** - sets text of user. If it is called empty (with null) than text is removed in kiosk gui mode and appended in chat mode.
- **setBotText(text: string = null)** - sets text of bot. If it is called empty (with null) than text is removed in kiosk gui mode and appended in chat mode.
- **setImage(url: string)** - sets image - whole url is now expected. From image is average color fot its background computed and opacity can be adjusted via `imageAverageColorOpacity`
- **setInputAudio(samples: any = null)** - sets PCM of input, any value is now expected and it displays input PCM bar. If it is called empty (with null) than PCM bar is removed. If it is called than PCM output bar is automatically removed.
- **setOutputAudio(samples: any = null, sampleRate = 16000, stereo = false)** - sets PCM of output, any value is now expected and it displays output PCM bar. If it is called empty (with null) than PCM bar is removed.  If it is called than PCM input bar is automatically removed.
- **chatInputCallback(Function)** - Callback for input value in chat mode. When user hits enter in text input in chat mode. 
- **chatMicrophoneCallback(Function)** - Callback for microphone action in chat mode. When user clicks on microphone icon in chat mode.
- **chatMuteCallback(Function)** - Callback for mute action in chat mode. When user clicks on mute icon in chat mode.
- **chatBargeCallback(Function)** - Callback for barge action (starting conversation) in chat mode. When user clicks on barge icon in chat mode.
- **setMicrophone(boolean)**: - sets microphone on/off. It will trigger `chatMicrophoneCallback`.
- **setUserMessageBackgroundColor(color?: string)**: - sets background color of user message (visible only in chat mode). Empty call will reset color to default / init color. Example `'#ffffff'`, `'white'`, `'rgba(0, 0, 0, .4)'`.
- **setBotMessageBackgroundColor(color?: string)**: - sets background color of bot message (visible only in chat mode). Empty call will reset color to default / init color. Example `'#ffffff'`, `'white'`, `'rgba(0, 0, 0, .4)'`.
- **setUserMessageTextColor(color?: string)**: - sets color of user message. Empty call will reset color to default / init color. Example `'#ffffff'`, `'white'`, `'rgba(0, 0, 0, .4)'`.
- **setUserMessageTextOutlineColor(color?: string)**: - sets color of outline of user message. Empty call will reset color to default / init color. Example `'#ffffff'`, `'white'`, `'rgba(0, 0, 0, .4)'`. Outline is visible only in kiosk gui mode with avatar enabled. 
- **setBotMessageTextColor(color?: string)**: - sets color of bot message. Empty call will reset color to default / init color. Example `'#ffffff'`, `'white'`, `'rgba(0, 0, 0, .4)'`.
- **setBotMessageTextOutlineColor(color?: string)**: - sets color of outline of bot message. Empty call will reset color to default / init color. Example `'#ffffff'`, `'white'`, `'rgba(0, 0, 0, .4)'`. Outline is visible only in kiosk gui mode with avatar enabled.
- **setHlsAvatar(streamUrl?: string)**: - url of stream with avatar.
- **setWebRtcAvatar(streamUrl?: string)**: - websocket url of stream with avatar.
- **setReverseAvatarOrder(reverseOrder: boolean = false)**: - for truthy reverseOrder is avatar displayed in chat gui mode on the bottom of the widget.
- **setTextInputEnabled(enabled: bolean = false)**: - enables user input in UI. Sets value of `textInputEnabled`.
- **collapsableTriggerCallback(Function)**: - Callback for collapsable trigger action in `collapsable` mode. Returns information if `collapsed` is true or false.
