/**
 * File: app.ts
 * Description: This file contains the implementation of the BotUI class.
 */

// Import external libraries
import * as Hls from "hls.js"; // HTTP live streaming
import FastAverageColor from "fast-average-color"; // calculates average color of images (videos)
import tippy from "tippy.js"; // tooltips, popovers, dropdowns
import showdown from "showdown"; // markdown to HTML converter

// Import functions from functional library lambda
import clamp from "ramda/es/clamp"; // Restricts a number to be within a range
import defaultTo from "ramda/es/defaultTo"; // Returns the second argument if it is not null, undefined or NaN; otherwise the first argument is returned
import isNil from "ramda/es/isNil"; // Checks if the input value is null or undefined.
import is from "ramda/es/is"; // See if an object (i.e. val) is an instance of the supplied constructor
import isEmpty from "ramda/es/isEmpty"; // Returns true if the given value is its type's empty value; false otherwise.
import merge from "ramda/es/merge"; // Creates one new object with the own properties from a list of objects. If a key exists in more than one object, the value from the last object it exists in will be used.
import times from "ramda/es/times"; // Calls an input function n times, returning an array containing the results of those function calls.
import { forEach, head, type } from "ramda";

// Import custom assets
import "../assets/main.scss";
import "../assets/screencapture.png";

// Import custom HTML templates
import { sopSuggestionContainer } from "./templates/sop-suggestion-structure.template";

import {
  sopBaseStructureTemplate,
  baseStructureTemplate,
  chatMessageStructureTemplate,
  kioskMessageStructureTemplate,
} from "./templates";

// Import custom utility functions
import {
  debounce,
  getContentAsHtml,
  includesToDefault,
  injectCss,
  isValidUrl,
  scrollTo as scrollToAnimated,
  wsConnection,
} from "./utils";

// Import ts interfaces and enums
import {
  AvatarStream,
  AvatarTypeEnum,
  Background,
  GUIMode,
  MessageType,
  OrientationEnum,
  ScreenTypeEnum,
  Settings,
  StateTypeEnum,
  SuggestionMode,
} from "./model/bot-ui.model";

// Default BotUI init settings
const defaults: Settings = {
  animationSpeed: 500, // speed of animations (hiding texts, ...) - in milliseconds.
  goTo: true, // ??
  title: "", // title displayed in the UI header
  feedback: true, // ??
  backgroundAdvancedAnimationParticlesCount: 20, // second level of animations over background - value can be 0-20 - count of animated objects added to the background with random opacity
  backgroundColor: "#927263", // default background color. Can be changed after init via setBackgroundColor()
  backgroundImage: null, // default background image url. Can be changed after init via setBackgroundImage(). It has priority over backgroundColor.
  backgroundImageBlur: 0, // blur of added image via setBackgroundImage(). It has to be whole number.
  backgroundSimpleAnimation: true, // first layer of animations over background - turns on/off simple animation of main gradient on the background
  detectOrientation: true, // ?? not used?
  fullScreen: true, // UI will take whole screen to render
  customIcons: false, // ??
  arrowIcon: "icon--content--arrow-up",
  micIcon: "icon--content--mic",
  pauseIcon: "icon--content--pause",
  playIcon: "icon--content--play",
  keyboardIcon: "icon--content--keyboard",
  muteIcon: "icon--content--volume-mute",
  volumeIcon: "icon--content--volume",
  upSop: "icon--content--upSop",
  downSop: "icon--content--downSop",
  guiMode: GUIMode.KIOSK, // can be set to kiosk or chat
  imageAverageColorOpacity: 0.5, // opacity of average color of added image - see setImage(). It has to be number between 0 - 1.
  widgetSize: {
    height: "600px",
    width: "400px",
  }, // UI will be set to width and height
  userMessageBackgroundColor: "rgba(255, 255, 255, .3)", // default background color of user message
  userMessageTextColor: "#ffffff", // default color of user message
  userMessageTextOutlineColor: "rgba(0, 0, 0, .5)", // default color of outline of user message. Outline is visible only in kiosk gui mode with avatar enabled
  botMessageBackgroundColor: "rgba(0, 0, 0, .4)", // default background color of bot message
  botMessageTextColor: "#ffffff", // default color of bot message
  botMessageTextOutlineColor: "rgba(0, 0, 0, .5)", // default color of outline of bot message. Outline is visible only in kiosk gui mode with avatar enabled
  textInputEnabled: true, //  displays input for messages - turns on/off input for user messages and buttons for interaction (removes all buttons). By default it is enabeled (true) for GUI mode chat and disabled (false) for kiosk
  inputMode: "sop", // ??
  standardQuestionMode: "text", // ??
  inputAudio: true, // microphone active?
  outputAudio: true, // speaker active?

  reverseAvatarOrder: false, // displays avatar in reverse order in ui. Avatar is displayed on the bottom side of the widget. Available only in chat gui mode
  collapsable: false, // UI will be rendered into overlayer fixed to the bottom of the page. By default is collapsed. It will use width and height of widgetSize. Fullscreen mode is not allowed in this case
  collapsed: false, // setting for collapsable mode. It is allowing to expend/collapse BotUI widget on init
  sectionActive: 0, // ??
  sections: [
    "SOP",
    "QUESTION",
    "SOLUTIONS",
    "PDF",
    "FEEDBACK",
    "LOGIN",
    "INPUTSELECT",
  ], // ??
  interactionMode: "SOP", // ?? - TODO - please provide explanation - what is inputMode, sections and interactionMode and the setControllIcons relationship?? Update interface Settings - somewhere custom union types should be created instead general string??
  sound: true, // what is relation to inputAudio and outputAudio??
  controlIcons: { mic: true, mute: true, restart: false }, // display control icons
  search: true, // setting for elastic search. It controls if the bot will do elastic search or not
  suggestionMode: SuggestionMode.ALTERNATIVE,
  showTooltips: true, // show tooltips of control icons
};

// global variables
const fullScreenWidgetWidth = "100vw";
const fullScreenWidgetHeight = "100vh";
const minAnimationParticles = 0;
const maxAnimationParticles = 20;
const disabledChatHeight = "10px";
const chatHeight = "80px";
const sopHeight = "110px";
const chatPadding = "4";
const sopPadding = "6";
const disabledHeight = "0px";
let addressBarHeight = 100;
const avatarMaxHeightRatio = {
  [GUIMode.CHAT]: 2 / 3,
  [GUIMode.KIOSK]: 1,
};

const icons = [
  "mic",
  "blocked",
  "volume",
  "speaking-head",
  "arrow-up",
  "play",
  "pause",
  "stop",
  "keyboard",
  "volume-mute",
  "menu",
  "mic2",
  "back",
  "downSop",
  "upSop",
  "undo",
  "restart",
  "feedback",
  "close",
  "search",
  "left",
  "right"
];

const avatarTextOverlapRatio = 1 / 4;
const micActiveClass = "icon-sop--mic--active";

/**
 * BotUI class represents the window for the bot interface
 * It handles initialization, rendering and behavior of the bot UI
 * It encapsulates numerous UI settings, interaction logic and event handling
 *
 * Responsibilities:
 * - Renders the bot window according given settings
 * - Manages user interactions
 * - Renders incoming responses from the server in the UI
 *
 * Usage:
 * 1. Create an instance of BotUI with appropriate arguments (provide optional argument "settings" to customize UI appearance )
 * 2. Customize the UI appearance and behavior using the available public methods
 * 3. BotUI does NOT handle communication with the server
 *
 *
 * Example:
 * const bot = new BotUI("container", settings)
 *
 * @constructor
 * @param {string} element - The ID of the HTML element where the bot window should be inserted
 * @param {Settings} [settings="defaults"] - The configuration object for the bot window (optional). Contains settings for appearance and behavior
 */

class BotUI {
  private static element: HTMLElement;
  private static settings: Settings;
  private static orientation: OrientationEnum;
  public dialogueID: string = "";
  public elasticSearchOn: boolean = false // If the elastic search from the Main.js is on this will be true

  private static rootElement: HTMLElement;
  private static avatarElement: HTMLElement;
  private static imageKioskElement: HTMLElement;
  private static userTextKioskElement: HTMLElement;
  private static botTextKioskElement: HTMLElement;
  private static messagesElement: HTMLElement;
  private static userPcmElement: HTMLElement;
  private static botPcmElement: HTMLElement;
  private static backgroundElement: HTMLElement;
  private static chatInputElement: HTMLInputElement;
  private static chatTextInputElement: HTMLElement;
  private static chatElement: HTMLElement;
  private static chatInputMuteElement: HTMLElement;
  private static searchElement: HTMLElement;
  private static chatInputArrowElement: HTMLElement;
  private static chatInputMicrophoneElement: HTMLElement;
  private static chatInputMicElement: HTMLElement;
  private static chatInputBargeElement: HTMLElement;
  private static chatInputMenuElement: HTMLElement;
  private static chatInputSettingsElement: HTMLElement;
  private static chatInputControlsElement: HTMLElement;
  private static chatInputPlayElement: HTMLElement;
  private static chatInputKeyboardElement: HTMLElement;
  private static chatInputStopElement: HTMLElement;
  private static collapsableTriggerElement: HTMLElement;
  private static botWrapperElement: HTMLElement;
  private static soundInput: HTMLElement;
  private static textInput: HTMLElement;
  private static controllerWrapper: HTMLElement;
  private static chatInputBackElement: HTMLElement;
  private static sopSection: HTMLElement;
  private static questionSection: HTMLElement;
  private static questionSOPButton: HTMLElement;
  private static downSOPButton: HTMLElement;
  private static sopName: HTMLElement;
  private static inputTakers: HTMLElement;
  private static askAnother: HTMLElement;
  private static continue: HTMLElement;
  private static solutionsControllers: HTMLElement;
  private static loadingSpinner: HTMLElement;
  private static botLogin: HTMLElement;
  private static botLoginPopup: HTMLElement;
  private static restartElement: HTMLElement;
  private static closeElement: HTMLElement;
  private static sopHeader: HTMLElement;
  private static controlIconsWrapper: HTMLElement;

  private static isChatEnabled: boolean = true;
  private static isMicrophoneEnabled: boolean = true;

  private static avatarWs: WebSocket;
  private static avatarConnection: RTCPeerConnection;
  private static avatarDataChannel: RTCDataChannel;

  constructor(element: string, settings: Settings = defaults) {
    // Modify class static properties
    BotUI.element = document.getElementById(element); // set BotUI element according HTML element id name

    defaults.textInputEnabled = settings.guiMode === GUIMode.CHAT; // by default enable text input for chat mode
    settings.guiMode = includesToDefault(
      settings.guiMode,
      Object.values(GUIMode),
      GUIMode.KIOSK
    ); // if guiMode is undefined in settings or it has a different value than "kiosk" or "chat", it is set to "kiosk"

    BotUI.settings = merge(defaults, settings); // merge defaults with settings - settings has priority over defaults where both keys exist

    BotUI.settings.fullScreen = BotUI.settings.collapsable
      ? false
      : BotUI.settings.fullScreen;

    BotUI.rootElement = document.documentElement; // set rootElement to root element of the document (html)
    if (!BotUI.element) {
      return;
    }

    // Modify CSS variable values according settings
    BotUI.element.style.setProperty(
      "--bot-ui-animation-speed",
      `${BotUI.settings.animationSpeed}ms`
    );
    BotUI.element.style.setProperty(
      "--bot-ui-background-url-blur",
      `${BotUI.settings.backgroundImageBlur}px`
    );
    BotUI.element.style.setProperty(
      "--bot-ui-background-url",
      `url("${BotUI.settings.backgroundImage}")`
    );
    BotUI.element.style.setProperty(
      "--bot-ui-background-color",
      `${BotUI.settings.backgroundColor}`
    );
    BotUI.element.style.setProperty(
      "--bot-ui-message-color-bot",
      `${BotUI.settings.botMessageTextColor}`
    );
    BotUI.element.style.setProperty(
      "--bot-ui-message-color-user",
      `${BotUI.settings.userMessageTextColor}`
    );
    BotUI.element.style.setProperty(
      "--bot-ui-message-background-bot",
      `${BotUI.settings.botMessageBackgroundColor}`
    );
    BotUI.element.style.setProperty(
      "--bot-ui-message-background-user",
      `${BotUI.settings.userMessageBackgroundColor}`
    );
    BotUI.element.style.setProperty("--bot-ui-chat-pcm-height", chatHeight);

    BotUI.orientation = OrientationEnum.LANDSCAPE; // set default orientation property to "landscape"

    if (
      BotUI.settings.interactionMode == "SOP" ||
      BotUI.settings.interactionMode == "GUIDE"
    ) {
      BotUI.element.innerHTML = sopBaseStructureTemplate;
    } else {
      BotUI.element.innerHTML = baseStructureTemplate;
    } // set HTML template according interaction mode - why there are two templates?? are still both of them being used??

    // Modify HTML element attribute values according settings
    BotUI.element.setAttribute("data-gui-mode", BotUI.settings.guiMode);
    if (BotUI.settings.fullScreen) {
      BotUI.element.setAttribute("data-fullscreen", "");
    }
    BotUI.reverseAvatarOrderAction();

    // Set other class properties (HTMLElements) according HTML attribute selectors
    BotUI.imageKioskElement = BotUI.element.querySelector("[data-image]");
    BotUI.userPcmElement = BotUI.element.querySelector("[data-user-pcm]");
    BotUI.botPcmElement = BotUI.element.querySelector("[data-bot-pcm]");
    BotUI.messagesElement = BotUI.element.querySelector("[data-messages]");
    BotUI.chatElement = BotUI.element.querySelector("[data-chat-input]");
    BotUI.chatInputElement = BotUI.chatElement.querySelector("input");
    BotUI.chatTextInputElement =
      BotUI.element.querySelector("[data-chat-input]");
    BotUI.chatInputMuteElement = BotUI.element.querySelector(
      "[data-chat-input-mute]"
    );
    BotUI.searchElement = BotUI.element.querySelector(
      "[data-chat-input-search]"
    );
    BotUI.chatInputMicrophoneElement = BotUI.element.querySelector(
      "[data-chat-input-microphone]"
    );
    BotUI.chatInputMicElement = BotUI.element.querySelector(
      "[data-chat-input-mic]"
    );
    BotUI.chatInputArrowElement = BotUI.element.querySelector(
      "[data-chat-input-arrow]"
    );
    BotUI.avatarElement = BotUI.element.querySelector("[data-avatar]");
    BotUI.chatInputMenuElement = BotUI.element.querySelector(
      "[data-chat-input-menu]"
    );
    BotUI.chatInputSettingsElement = BotUI.element.querySelector(
      "[data-chat-input-settings]"
    );
    BotUI.chatInputControlsElement = BotUI.element.querySelector(
      "[data-chat-input-controls]"
    );
    BotUI.chatInputPlayElement = BotUI.element.querySelector(
      "[data-chat-input-play]"
    );
    BotUI.chatInputStopElement = BotUI.element.querySelector(
      "[data-chat-input-stop]"
    );
    BotUI.collapsableTriggerElement =
      BotUI.element.querySelector("[data-trigger]");
    BotUI.botWrapperElement = BotUI.element.querySelector("[data-wrapper]");
    BotUI.chatInputKeyboardElement = BotUI.element.querySelector(
      "[data-chat-input-keyboard]"
    );
    BotUI.soundInput = BotUI.element.querySelector("[data-sound-input-wrap]");
    BotUI.textInput = BotUI.element.querySelector("[data-text-input-wrap]");
    BotUI.controllerWrapper = BotUI.element.querySelector(
      "[data-chat-input-controllers]"
    );
    BotUI.chatInputBackElement = BotUI.element.querySelector(
      "[data-chat-input-back]"
    );
    BotUI.sopSection = BotUI.element.querySelector("[data-chat-sop]");
    BotUI.questionSection = BotUI.element.querySelector("[data-chat-ask]");
    BotUI.questionSOPButton = BotUI.element.querySelector(
      "[data-sop-question]"
    );
    BotUI.downSOPButton = BotUI.element.querySelector("[data-sop-next]");
    BotUI.sopHeader = BotUI.element.querySelector("[data-sop-header]");
    BotUI.sopName = BotUI.element.querySelector("[data-sop-title]");
    BotUI.inputTakers = BotUI.element.querySelector("[data-input-takers]");
    BotUI.askAnother = BotUI.element.querySelector(
      "[data-pdf-question-another]"
    );
    BotUI.continue = BotUI.element.querySelector(
      "[data-pdf-question-continue]"
    );
    BotUI.solutionsControllers = BotUI.element.querySelector(
      "[data-solutions-inputs]"
    );
    BotUI.loadingSpinner = BotUI.element.querySelector("[loader]");
    BotUI.botLogin = BotUI.element.querySelector("[bot-login]");
    BotUI.botLoginPopup = BotUI.element.querySelector("[bot-loginPopup]");
    BotUI.restartElement = BotUI.element.querySelector(
      "[data-chat-input-restart]"
    );
    BotUI.closeElement = BotUI.element.querySelector("[data-sop-close]");
    BotUI.controlIconsWrapper = BotUI.element.querySelector(
      "[control-icons-wrapper]"
    );

    // Control collapsing of the bot window and triggering element
    if (!BotUI.settings.collapsed) {
      BotUI.collapsableTriggerElement.classList.add("hidden");
    } else {
      BotUI.collapsableTriggerElement.classList.remove("hidden");
    }

    if (BotUI.settings.collapsable) {
      BotUI.setCollapsableUIHeight();
      BotUI.collapsableTriggerElement.addEventListener("click", (e) => {
        this.changeCollapsedMode();
      });
    } else {
      BotUI.collapsableTriggerElement.parentNode.removeChild(
        BotUI.collapsableTriggerElement
      );
      BotUI.element.setAttribute("data-collapsable", "expanded");
      BotUI.closeElement.classList.add("hidden");
    }

    // control display of the control icons
    if (BotUI.settings.controlIcons) {
      this.setControllIconStyles();
    }
    if (!BotUI.settings.customIcons) {
      this.setIcons();
    }

    // display app title in the bot window header
    this.setTitle(BotUI.settings.title);

    // ?? TODO please add comment in the defaults definition - is there more DRY way to implement this?
    if (BotUI.settings.interactionMode === "SOP") {
      BotUI.settings.sections = [
        "SOP",
        "QUESTION",
        "SOLUTIONS",
        "PDF",
        "FEEDBACK",
        "LOGIN",
        "INPUTSELECT",
      ];
    } else if (BotUI.settings.interactionMode === "GUIDE") {
      BotUI.settings.sections = [
        "QUESTION",
        "SOLUTIONS",
        "PDF",
        "FEEDBACK",
        "LOGIN",
        "INPUTSELECT",
      ];
    }

    this.setSection(BotUI.settings.sections[0]);

    if (this.isMobileDevice()) {
      let addressBarHeight = 100;
      function calculateAddressBarHeight() {
        const windowHeight = window.innerHeight;
        const viewportHeight = document.documentElement.clientHeight;
        const newAddressHeight = windowHeight - viewportHeight;
        if (newAddressHeight > 0) {
          addressBarHeight = newAddressHeight;
          BotUI.botWrapperElement.style.removeProperty("height");
        } else {
          BotUI.botWrapperElement.style.height = `calc(100vh - ${addressBarHeight}px)`;
        }
      }
      calculateAddressBarHeight();
      window.addEventListener("resize", calculateAddressBarHeight);
    }

    if (BotUI.settings.guiMode === GUIMode.KIOSK) {
      BotUI.messagesElement.innerHTML = kioskMessageStructureTemplate;
      BotUI.userTextKioskElement = BotUI.element.querySelector(
        "[data-user-message] span"
      );
      BotUI.botTextKioskElement = BotUI.element.querySelector(
        "[data-bot-message] span"
      );
    }

    BotUI.isChatEnabled = BotUI.settings.outputAudio;
    BotUI.isMicrophoneEnabled = BotUI.settings.inputAudio;

    if (
      BotUI.settings.interactionMode !== "SOP" &&
      BotUI.settings.interactionMode != "GUIDE"
    ) {
      if (BotUI.isChatEnabled) {
        BotUI.chatInputMuteElement.classList.remove("icon--light");
      } else {
        BotUI.chatInputMuteElement.classList.add("icon--light");
      }
      if (BotUI.isMicrophoneEnabled) {
        BotUI.chatInputMicElement.classList.add("icon--light");
      } else {
        BotUI.chatInputMicElement.classList.remove("icon--light");
      }
    } else {
      // if (BotUI.settings.sound) {
      //     BotUI.chatInputMuteElement.classList.remove('icon--light');
      // } else {
      //     BotUI.chatInputMuteElement.classList.add('icon--light');
      // }
    }

    BotUI.backgroundElement = BotUI.element.querySelector("[data-background]");

    if (!BotUI.settings.collapsable) {
      const { width, height } = BotUI.settings.widgetSize;
      BotUI.element.style.width = defaultTo(
        fullScreenWidgetWidth,
        !BotUI.settings.fullScreen && width ? width : null
      );
      BotUI.element.style.height = defaultTo(
        fullScreenWidgetHeight,
        !BotUI.settings.fullScreen && height ? height : null
      );
    }

    BotUI.settings.backgroundAdvancedAnimationParticlesCount = clamp(
      minAnimationParticles,
      maxAnimationParticles,
      BotUI.settings.backgroundAdvancedAnimationParticlesCount
    );
    BotUI.backgroundElement.innerHTML = "";
    if (!!BotUI.settings.backgroundSimpleAnimation) {
      // BotUI.backgroundElement.setAttribute('data-background-animation', '');
    }

    times(() => {
      BotUI.backgroundElement.appendChild(document.createElement("span"));
    }, BotUI.settings.backgroundAdvancedAnimationParticlesCount);

    window.addEventListener(
      "resize",
      debounce((e) => {
        const rect: DOMRect = BotUI.element.getBoundingClientRect();
        const orientation: OrientationEnum =
          rect.width > rect.height
            ? OrientationEnum.LANDSCAPE
            : OrientationEnum.PORTRAIT;
        this.setOrientation(orientation);
        BotUI.element.setAttribute("data-orientation", orientation);
        BotUI.handleBotUiHeights();
      })
    );

    window.addEventListener("load", (e) => {
      const rect: DOMRect = BotUI.element.getBoundingClientRect();
      const orientation: OrientationEnum =
        rect.width > rect.height
          ? OrientationEnum.LANDSCAPE
          : OrientationEnum.PORTRAIT;
      this.setOrientation(orientation);
      if (BotUI.settings.showTooltips) {
        this.setInputIconTooltips();
      }
    });

    BotUI.chatInputElement.onkeyup = (e) => {
      if (e.key === "Enter") {
        BotUI.getInputValue(
          (BotUI.chatInputElement as HTMLInputElement).value,
          this.chatInputCallback
        );
        (BotUI.chatInputElement as HTMLInputElement).value = "";
        BotUI.changeClasses(
          "icon--arrow-up--visible",
          "icon--arrow-up--hidden",
          BotUI.chatInputArrowElement
        );
      } else if (BotUI.chatInputElement.value.length > 0) {
        if (
          BotUI.chatInputArrowElement.classList.contains(
            "icon--arrow-up--hidden"
          )
        ) {
          BotUI.changeClasses(
            "icon--arrow-up--hidden",
            "icon--arrow-up--visible",
            BotUI.chatInputArrowElement
          );
        }
      } else {
        BotUI.changeClasses(
          "icon--arrow-up--visible",
          "icon--arrow-up--hidden",
          BotUI.chatInputArrowElement
        );
      }
    };

    BotUI.chatInputMuteElement.onclick = (e) => {
      BotUI.settings.sound = !BotUI.settings.sound;
      if (BotUI.settings.sound) {
        // BotUI.chatInputMuteElement.classList.remove('icon--light');
        BotUI.chatInputMuteElement.classList.remove(
          "icon--content--volume-mute"
        );
        BotUI.chatInputMuteElement.classList.add("icon--content--volume");
      } else {
        // BotUI.chatInputMuteElement.classList.add('icon--light');
        BotUI.chatInputMuteElement.classList.add("icon--content--volume-mute");
        BotUI.chatInputMuteElement.classList.remove("icon--content--volume");
      }
      BotUI.getChatMute(BotUI.settings.sound, this.chatMuteCallback);
    };

    BotUI.searchElement.onclick = (e) => {
      this.searchElementCallback();
    }

    BotUI.restartElement.onclick = () => {
      this.chatRestartCallback();
    };

    // BotUI.chatInputMicrophoneElement.onclick = (e) => {
    //     BotUI.isMicrophoneEnabled = !BotUI.isMicrophoneEnabled;// isNil(sessionStorage.getItem(chatMicrophoneStorageKey));
    //     BotUI._setMicrophone();
    //     BotUI.getChatMicrophone(BotUI.isMicrophoneEnabled, this.chatMicrophoneCallback);
    // }

    // BotUI.chatInputMenuElement.onclick = (e) => {
    //     BotUI.changeClasses('settings--visible', 'settings--hidden', BotUI.chatInputSettingsElement);
    // }
    this.setTextInputEnabled(BotUI.settings.textInputEnabled);

    injectCss();

    if (BotUI.chatInputPlayElement) {
      BotUI.chatInputPlayElement.onclick = (e) => {
        this.chatPlayCallback();
      };
    }

    BotUI.chatInputMicElement.onclick = (e) => {
      if (
        settings.interactionMode !== "SOP" &&
        BotUI.settings.interactionMode != "GUIDE"
      ) {
        BotUI.isMicrophoneEnabled = !BotUI.isMicrophoneEnabled;
        BotUI._setMicrophone();
      }
      this.chatMicCallback();
    };

    BotUI.botLogin.onclick = async (e) => {
      await this.loginCallback();
    };

    BotUI.chatInputStopElement.onclick = (e) => {
      this.chatStopCallback();
    };

    BotUI.chatTextInputElement.oninput = (e) => {
      this.chatTextInputElementCallback(e);
    };

    if (BotUI.settings.sound) {
      // BotUI.chatInputMuteElement.classList.remove('icon--light');
      BotUI.chatInputMuteElement.classList.remove("icon--content--volume-mute");
      BotUI.chatInputMuteElement.classList.add("icon--content--volume");
    } else {
      // BotUI.chatInputMuteElement.classList.add('icon--light');
      BotUI.chatInputMuteElement.classList.add("icon--content--volume-mute");
      BotUI.chatInputMuteElement.classList.remove("icon--content--volume");
    }

    if (
      BotUI.settings.interactionMode == "SOP" ||
      BotUI.settings.interactionMode == "GUIDE"
    ) {
      BotUI.chatInputKeyboardElement.onclick = (e) => {
        this.chatKeyboardCallback();
      };

      BotUI.chatInputArrowElement.onclick = (e) => {
        const inputString = (BotUI.chatInputElement as HTMLInputElement).value;
        if (inputString !== "") {
          BotUI.changeClasses(
            "icon--arrow-up--visible",
            "icon--arrow-up--hidden",
            BotUI.chatInputArrowElement
          );
          BotUI.getInputValue(inputString, this.chatInputCallback);
          (BotUI.chatInputElement as HTMLInputElement).value = "";
        } else {
          this.chatArrowCallback();
        }
      };

      BotUI.questionSOPButton.onclick = (e) => {
        this.chatSopQuestionCallback();
      };

      BotUI.downSOPButton.onclick = (e) => {
        this.chatSopNextCallback();
      };

      BotUI.closeElement.onclick = (e) => {
        this.closeElementCallback();
      };
    }
    BotUI.setBackground({});
  }

  public toggleSearchIcons(on: boolean){
    if (on){
      BotUI.searchElement.classList.add("hidden");
      if (BotUI.settings.controlIcons.mic){
        BotUI.chatInputKeyboardElement.classList.remove("hidden");
      }
      BotUI.textInput.classList.remove("hidden");
    }else{
      BotUI.searchElement.classList.remove("hidden");
      BotUI.chatInputKeyboardElement.classList.add("hidden");
      if (!BotUI.settings.textInputEnabled){
        BotUI.textInput.classList.add("hidden");
      }
    }
  }

  public toggleElasticSearch(on: boolean){
    this.elasticSearchOn = on;
  }

  public setMicIcon(active) {
    if (
      BotUI.settings.interactionMode == "SOP" ||
      BotUI.settings.interactionMode == "GUIDE"
    ) {
      if (active) {
        BotUI.chatInputMicElement.classList.add(micActiveClass, "icon--large");
        BotUI.chatInputMicElement.classList.remove("icon--largest");
      } else {
        BotUI.chatInputMicElement.classList.remove(
          micActiveClass,
          "icon--large"
        );
        BotUI.chatInputMicElement.classList.add("icon--largest");
      }
    } else {
      if (!active) {
        BotUI.chatInputMuteElement.classList.add("icon--light");
      } else {
        BotUI.chatInputMuteElement.classList.remove("icon--light");
      }
    }
  }

  public setTooltip(element, content) {
    tippy(element, {
      content: content,
      delay: [500, 0],
      duration: [100, 0],
      placement: "top",
      theme: "light",
      arrow: false,
    });
  }

  public setInputIconTooltips() {
    this.setTooltip(BotUI.restartElement, "Restart App");
    this.setTooltip(BotUI.chatInputKeyboardElement, "Voice Input");
    this.setTooltip(BotUI.chatInputMuteElement, "Mute/Unmute App");
    this.setTooltip(BotUI.searchElement, "Start Search");
  }

  /**
   * Loops through list of icons (global variable)
   * If the icon element is present in DOM, extra class "icon--content--<icon name>" is added - content is inserted
   */
  public setIcons = () => {
    icons.forEach((icon) => {
      const suffix =
        BotUI.settings.interactionMode == "SOP" ||
        BotUI.settings.interactionMode == "GUIDE"
          ? "-sop"
          : "";
      const element = document.querySelector(".icon" + suffix + "--" + icon);

      if (element !== null) {
        element.classList.add("icon--content--" + icon);
      }
    });
  };

  /**
   * Public method to change icon display settings
   * @param controlIcons - controls the display of individual icons - microphone, speaker and restart
   */
  public setControllIcons = (controlIcons: {
    mic: boolean;
    mute: boolean;
    restart: boolean;
  }) => {
    BotUI.settings.controlIcons = controlIcons;

    this.setControllIconStyles();
  };

  public setDialogueID(id: string) {
    this.dialogueID = id;
  }

  public setControls = (visible: boolean) => {
    if (visible) {
      BotUI.chatTextInputElement.removeAttribute("no-controls");
    } else {
      BotUI.chatTextInputElement.setAttribute("no-controls", "");
    }
  };

  public expand = () => {
    if (BotUI.settings.collapsable && BotUI.settings.collapsed) {
      this.changeCollapsedMode();
    }
  };

  public getSection() {
    return BotUI.settings.sections[BotUI.settings.sectionActive];
  }

  public setSection(section: string = "SOP") {
    if (
      BotUI.settings.interactionMode == "SOP" ||
      BotUI.settings.interactionMode == "GUIDE"
    ) {
      const index = BotUI.settings.sections.indexOf(section);
      BotUI.settings.sectionActive = index;
      this.sectionChangeCallback(section);
      this.setSectionUI(section);
    }
  }

  public setSectionByIndex(index: number) {
    const section = BotUI.settings.sections[index];
    this.setSection(section);
  }

  public nextSection() {
    if (BotUI.settings.sectionActive < BotUI.settings.sections.length - 1) {
      BotUI.settings.sectionActive += 1;
      const nextSect = BotUI.settings.sections[BotUI.settings.sectionActive];
      this.setSection(nextSect);
    }
  }

  public isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  public previousSection() {
    if (BotUI.settings.sectionActive >= 0) {
      BotUI.settings.sectionActive -= 1;
      const nextSect = BotUI.settings.sections[BotUI.settings.sectionActive];
      this.setSection(nextSect);
    }
  }

  public setModeCallback(mode: string) {}

  public setInputMode(mode: string) {
    if (mode === "text") {
      this.removeOverlay();
      sessionStorage.setItem("INPUTSELECT", mode);
      BotUI.chatElement.classList.remove("chat-input--hidden");
      BotUI.chatInputKeyboardElement.classList.add(
        BotUI.settings.micIcon + "2"
      );
      BotUI.chatInputKeyboardElement.classList.remove(
        BotUI.settings.keyboardIcon
      );
      BotUI.soundInput.setAttribute("style", "display:none;");
      // BotUI.chatInputBackElement.classList.add("text-mode");
      // BotUI.controllerWrapper.classList.add("text-mode");
      BotUI.settings.standardQuestionMode = mode;
      BotUI.settings.inputMode = mode;
    } else if (mode === "voice") {
      sessionStorage.setItem("INPUTSELECT", mode);
      BotUI.chatElement.classList.remove("chat-input--hidden");
      BotUI.chatInputKeyboardElement.classList.remove(
        BotUI.settings.micIcon + "2"
      );
      BotUI.chatInputKeyboardElement.classList.add(BotUI.settings.keyboardIcon);
      BotUI.soundInput.setAttribute("style", "display:block;");
      BotUI.chatInputBackElement.classList.remove("text-mode");
      BotUI.controllerWrapper.classList.remove("text-mode");
      BotUI.chatInputSettingsElement.classList.add("text-mode");
      BotUI.settings.standardQuestionMode = mode;
      BotUI.settings.inputMode = mode;
    } else if (mode === "button") {
      BotUI.inputTakers.classList.add("hidden");
      BotUI.settings.inputMode = mode;
    } else if (mode === "sop") {
      this.removeOverlay();
      BotUI.chatElement.classList.remove("chat-input--hidden");
      BotUI.settings.inputMode = mode;
    }

    this.setModeCallback(mode);
  }

  public getInputMode() {
    return BotUI.settings.inputMode;
  }

  public removeAllMessages() {
    BotUI.messagesElement.textContent = "";
  }

  public loginPop() {
    BotUI.botLoginPopup.classList.remove("hidden");
  }

  public changeCollapsedMode = () => {
    BotUI.settings.collapsed = !BotUI.settings.collapsed;
    this.collapseCallback(BotUI.settings.collapsed);
    BotUI.setCollapsableUIHeight();
    this.collapsableTriggerCallback(BotUI.settings.collapsed);
    if (!BotUI.settings.collapsed) {
      BotUI.collapsableTriggerElement.classList.add("hidden");
    } else {
      BotUI.collapsableTriggerElement.classList.remove("hidden");
    }
    const rect: DOMRect = BotUI.element.getBoundingClientRect();
    const orientation: OrientationEnum =
      rect.width > rect.height
        ? OrientationEnum.LANDSCAPE
        : OrientationEnum.PORTRAIT;
    this.setOrientation(orientation);
  };

  public collapseCallback = (...values) => {};

  private removeAllProperties() {
    BotUI.sopSection.classList.add("sop-section--hidden");
    BotUI.questionSection.classList.add("ask-section--hidden");
    BotUI.messagesElement.classList.remove("hidden");
    BotUI.chatElement.classList.remove("chat-input--hidden");
    BotUI.botLogin.classList.add("hidden");

    BotUI.chatTextInputElement.style.setProperty(
      "--bot-ui-chat-input-height",
      chatHeight
    );
    BotUI.messagesElement.style.setProperty(
      "--bot-ui-chat-input-height",
      chatHeight
    );
    BotUI.chatTextInputElement.style.setProperty(
      "--chat-padding-amount",
      chatPadding
    );
  }

  private inputButtonsHeightSet() {
    BotUI.chatTextInputElement.style.setProperty(
      "--bot-ui-chat-input-height",
      sopHeight
    );
    BotUI.chatTextInputElement.style.setProperty(
      "--chat-padding-amount",
      sopPadding
    );
    BotUI.messagesElement.style.setProperty(
      "--bot-ui-chat-input-height",
      sopHeight
    );
  }

  private newMessageSection(title: string) {
    var first = true;
    var element2: HTMLElement;
    for (
      let index = 0;
      index < BotUI.messagesElement.children.length;
      index++
    ) {
      const element = BotUI.messagesElement.children[index] as HTMLElement;
      if (element.getAttribute("data-button-group") === title) {
        if (index !== 0 && first) {
          if (
            (BotUI.messagesElement.children[index] as HTMLElement).tagName ===
            "BUTTON"
          ) {
            element2 = BotUI.messagesElement.children[index - 1] as HTMLElement;
          }
          first = false;
        }
      } else {
        element.style.display = "none";
      }
    }
    if (element2) {
      element2.style.display = "block";
      element2.setAttribute("data-button-group", title);
    }
  }

  private oldMessagesSection(title: string) {
    const elems = document.querySelectorAll(`[data-button-group=${title}]`);
    elems.forEach((el) => {
      el.remove();
    });
    for (
      let index = 0;
      index < BotUI.messagesElement.children.length;
      index++
    ) {
      (BotUI.messagesElement.children[index] as HTMLElement).style.display =
        "block";
    }
  }

  private setSectionUI(section: string) {
    this.removeAllProperties();
    // console.log(section);
    switch (section) {
      case "LOGIN":
        BotUI.messagesElement.classList.add("hidden");
        BotUI.botLogin.classList.remove("hidden");
        break;
      case "INPUTSELECT":
        const messageElement = BotUI.messagesElement;
        BotUI.messagesElement.textContent = "";
        BotUI.chatElement.classList.add("chat-input--hidden");

        this.setBotText("Please choose an input type.");
        const mode = this.getInputMode();
        var settings = {
          background: "",
          oldMode: mode,
          title: "modeSelect",
          groupName: "modeSelect",
          disableGroup: true,
          text: "Voice Input",
        };
        this.setButton(settings, () => {
          this.inputModeCallback("voice");
          messageElement.textContent = "";
        });
        this.setButton({ ...settings, text: "Text Input" }, () => {
          this.inputModeCallback("text");
          messageElement.textContent = "";
        });
        break;
      case "SOP":
        BotUI.sopSection.classList.remove("sop-section--hidden");
        this.inputButtonsHeightSet();
        this.setInputMode("sop");
        break;
      case "QUESTION":
        BotUI.questionSection.classList.remove("ask-section--hidden");
        this.setInputMode(BotUI.settings.standardQuestionMode);
        break;
      case "PDF":
        this.inputButtonsHeightSet();
        BotUI.messagesElement.classList.add("hidden");
        BotUI.solutionsControllers.classList.remove("pdf-section--hidden");
        BotUI.askAnother.onclick = (e) => {
          this.setSection("SOLUTIONS");
        };
        BotUI.askAnother.innerText = "Back";
        break;
      case "FEEDBACK":
        this.nextSection();
        break;
      default:
        console.log("SECTION NOT FOUND!");
        this.nextSection();
        break;
    }
  }

  public setSnippet(url, title, secondary = "") {
    const snippetContainer = document.createElement("div");
    snippetContainer.setAttribute("data-snippet-container", "");
    snippetContainer.classList.add("data-snippet-container");

    // Create the title element and set its text content
    const titleElement = document.createElement("h4");
    titleElement.textContent = title;

    // Create the context element and set its text content
    const contextElement = document.createElement("div");
    contextElement.textContent = secondary;

    // Add a click event listener to the snippet container element
    snippetContainer.addEventListener("click", () => {
      window.open(url);
    });

    // Append the title and context elements to the snippet container element
    snippetContainer.appendChild(titleElement);
    snippetContainer.appendChild(contextElement);

    const messageElement = BotUI.messagesElement;
    messageElement.appendChild(snippetContainer);
    BotUI.scrollToLastMessage(messageElement);
  }

  private setupDataChannel = (label) => {
    try {
      const dataChannel = BotUI.avatarConnection.createDataChannel(label, {
        ordered: true,
      });
      dataChannel.binaryType = "arraybuffer";
      const dcCallBack = this.dataChannelMessageCallback;
      console.log(`Created data channel (${label})`);

      dataChannel.onopen = function (e) {
        console.log(`data channel (${label}) connect`);
        BotUI.avatarDataChannel.send(new Uint8Array([7]).buffer);
        BotUI.avatarDataChannel.send(new Uint8Array([1]).buffer);
      };

      dataChannel.onclose = function (e) {
        console.log(`data channel (${label}) closed`);
      };

      dataChannel.onmessage = function (e) {
        console.log(`Got message (${label})`, e.data);
        if (e.data.size !== undefined) {
          const reader = new FileReader();
          reader.addEventListener("loadend", () => {
            dcCallBack(new Uint8Array(reader.result as ArrayBuffer));
          });
          reader.readAsArrayBuffer(e.data);
        } else {
          dcCallBack(new Uint8Array(e.data));
        }
      };

      return dataChannel;
    } catch (e) {
      console.warn("No data channel", e);
      return null;
    }
  };

  public setPlayIcon = (icon: string) => {
    if (BotUI.chatInputPlayElement) {
      BotUI.chatInputPlayElement.classList.remove(BotUI.settings.pauseIcon);
      BotUI.chatInputPlayElement.classList.remove(BotUI.settings.playIcon);
      BotUI.chatInputPlayElement.classList.add(icon);
    }
    return;
  };

  private static changeClasses = (
    class1: string,
    class2: string,
    e: HTMLElement
  ) => {
    if (e.classList.contains(class1)) {
      e.classList.remove(class1);
      e.classList.add(class2);
    } else {
      e.classList.remove(class2);
      e.classList.add(class1);
    }
  };

  public setScreen = (screenType: ScreenTypeEnum = ScreenTypeEnum.PLAYER) => {};

  /**
   * sets orientation property, width and height of UI
   * @param orientation - The chatbot window orientation - "landscape" or "portrait"
   */
  public setOrientation = (
    orientation: OrientationEnum = BotUI.orientation
  ) => {
    BotUI.element.setAttribute("data-orientation", orientation);
    const { width: currentWidthInPx, height: currentHeightinPx } =
      BotUI.element.getBoundingClientRect();
    let width =
      BotUI.element.style.width === "100%"
        ? `${currentWidthInPx}px`
        : BotUI.element.style.width;
    let height =
      BotUI.element.style.height === "100%"
        ? `${currentHeightinPx}px`
        : BotUI.element.style.height;
    BotUI.element.style.setProperty("--bot-ui-window-width", width);
    BotUI.element.style.setProperty("--bot-ui-window-height", height);
  };

  public setState = (stateType: StateTypeEnum) => {};

  /**
   * Sets background color of UI
   *
   * @param color - The color for the background: example '#ffffff', 'white', 'rgba(0, 0, 0, .4)'
   * @param [secondaryColor]
   */
  public setBackgroundColor = (color: string, secondaryColor: string = null) =>
    BotUI.setBackground(
      {
        color,
      },
      secondaryColor
    );

  /**
   * Sets background image via url,
   * Blur of background can be adjusted as second argument of this function.
   * If it is not set value from init / default is used.
   * Has higher priority then backgroudColor
   *
   * @param url - Url of the image
   * @param [blur] - Level of the image blur (optional) - it has to be whole number
   */
  public setBackgroundImage = (
    url: string,
    blur = BotUI.settings.backgroundImageBlur
  ) =>
    BotUI.setBackground({
      url: {
        path: url,
        blur,
      },
    });

  /**
   *  Sets text of user.
   * If it is called empty (with null) than text is removed in kiosk gui mode and appended in chat mode.
   *
   * @param [text] - Text of the user
   */
  public setUserText = (text: string = null) => {
    if (BotUI.settings.guiMode === GUIMode.KIOSK) {
      BotUI.userTextKioskElement.setAttribute("data-empty", "");
      window.setTimeout(() => {
        if (isNil(text) || isEmpty(text)) {
          BotUI.userTextKioskElement.setAttribute("data-empty", "");
        } else {
          BotUI.userTextKioskElement.innerText = text;
          BotUI.userTextKioskElement.removeAttribute("data-empty");
        }
      }, BotUI.settings.animationSpeed);
    }
    if (
      BotUI.settings.guiMode === GUIMode.CHAT &&
      !(isNil(text) || isEmpty(text))
    ) {
      this.setChatMessage(text, null, null, MessageType.USER, true);
    }
  };

  /**
   * Sets text of bot.
   * If it is called empty (with null) than text is removed in kiosk gui mode and appended in chat mode.
   *
   * @param [text] - Text of the bot
   * @param [nodeId] - ??
   */
  public setBotText = (text: string = null, nodeId: string = "") => {
    if (BotUI.settings.guiMode === GUIMode.KIOSK) {
      BotUI.botTextKioskElement.setAttribute("data-empty", "");
      window.setTimeout(() => {
        if (isNil(text) || isEmpty(text)) {
          BotUI.botTextKioskElement.setAttribute("data-empty", "");
        } else {
          BotUI.botTextKioskElement.innerText = text;
          BotUI.botTextKioskElement.removeAttribute("data-empty");
        }
      }, BotUI.settings.animationSpeed);
    }
    if (
      BotUI.settings.guiMode === GUIMode.CHAT &&
      !(isNil(text) || isEmpty(text))
    ) {
      this.setChatMessage(
        text,
        null,
        null,
        MessageType.BOT,
        false,
        nodeId,
        this.botMessagesCallback,
        this.dialogueID
      );
    }
  };

  public getLastUserMessage() {
    var doc = BotUI.messagesElement;
    for (var i = BotUI.messagesElement.childNodes.length - 1; i > 0; i--) {
      if (
        (doc.childNodes[i] as HTMLElement).classList.contains(
          "chat-message-user"
        )
      ) {
        return doc.childNodes[i];
      }
    }
  }

  public setVideo = (url: string = null, callback: () => any) => {
    BotUI.videoCallback = callback;
    if (BotUI.settings.guiMode === GUIMode.CHAT) {
      this.setChatMessage(null, null, url, MessageType.BOT, false);
    }
    if (BotUI.settings.guiMode === GUIMode.KIOSK) {
      const cleanImageElement = (full = true) => {
        BotUI.imageKioskElement.innerHTML = "";
        if (full) {
          BotUI.imageKioskElement.classList.add("bu-d-none");
          BotUI.element.removeAttribute("data-width-image");
        }
      };
      if (!url) {
        cleanImageElement();
      } else {
        if (url.includes("youtube.com/embed")) {
          const iframe = document.createElement("iframe");
          iframe.setAttribute("src", url);
          cleanImageElement(false);
          BotUI.imageKioskElement.classList.remove("bu-d-none");
          BotUI.element.setAttribute("data-width-image", "");
          BotUI.imageKioskElement.appendChild(iframe);
          BotUI.videoCallback();
        } else {
          const video = document.createElement("video");
          video.autoplay = true;
          video.onloadeddata = (e) => {
            cleanImageElement(false);
            BotUI.imageKioskElement.classList.remove("bu-d-none");
            BotUI.element.setAttribute("data-width-image", "");
            BotUI.imageKioskElement.appendChild(video);
          };
          video.onended = (e) => {
            BotUI.videoCallback();
          };
          video.src = url;
        }
      }
    }
  };

  public toggleLoader = (on: boolean) => {
    if (on) {
      BotUI.loadingSpinner.classList.remove("hidden");
      BotUI.messagesElement.classList.add("hidden");
    } else {
      BotUI.loadingSpinner.classList.add("hidden");
      BotUI.messagesElement.classList.remove("hidden");
    }
  };

  /**
   * Sets and renders or hides the title of the bot window
   *
   * @param active - boolean indicating whether the title should be visible
   * @param text - title of the bot window
   */
  public appSelectToggle = (active: boolean, text: string = "") => {
    if (active) {
      BotUI.sopName.classList.remove("hidden");
      BotUI.chatTextInputElement.style.setProperty(
        "--bot-ui-sop-name-height",
        "50px"
      );
      BotUI.messagesElement.style.setProperty(
        "--bot-ui-sop-name-height",
        "50px"
      );
      BotUI.sopName.textContent = text;
    } else {
      BotUI.sopName.classList.add("hidden");
      BotUI.chatTextInputElement.style.setProperty(
        "--bot-ui-sop-name-height",
        "0px"
      );
      BotUI.messagesElement.style.setProperty(
        "--bot-ui-sop-name-height",
        "0px"
      );
      BotUI.sopName.textContent = "";
    }
  };

  public removeSuggestions = () => {
    if (this.getSettings().suggestionMode === SuggestionMode.STANDARD){
      const elemList = document.querySelectorAll(
        "[data-messages] > div > [data-suggestions-container]"
      );
      elemList.forEach((element) => {
        const par = element.parentNode;
        par.parentNode.removeChild(par);
      });
    }
  };

  public setSuggestion = (suggestions: string[], listView: boolean = false) => {
    this.removeSuggestions();
    const messageElement = BotUI.messagesElement;
    const suggestionContainer = getContentAsHtml(sopSuggestionContainer);
    if (listView) {
      suggestionContainer.children[0].classList.add("list-view");
    }
    messageElement.appendChild(suggestionContainer);
    var mouseHover = false;
    function scrollFunction(e) {
      if (mouseHover) {
        e.preventDefault();
        var maxVal;
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          maxVal = e.deltaX;
        } else {
          maxVal = e.deltaY;
        }
        const change = maxVal !== 0 ? maxVal / Math.abs(maxVal) : 0;
        const scrollAmount = 30 * change;
        suggestionContainer.children[0].scrollLeft += scrollAmount;
      }
    }

    if (!listView) {
      suggestionContainer.addEventListener("mouseover", function () {
        mouseHover = true;
      });

      suggestionContainer.addEventListener("mouseout", function () {
        mouseHover = false;
      });

      suggestionContainer.addEventListener("wheel", (e) => {
        scrollFunction(e);
      });
    }
    suggestions.forEach((sug) => {
      let btn = document.createElement("button");
      btn.innerText = sug;
      btn.setAttribute("data-suggestions-button", "");
      btn.classList.add("data-suggestions-button");
      if (listView) {
        btn.classList.add("list-view");
      }
      btn.onclick = this.suggestionsCallback;
      const allContainers = document.querySelectorAll("[data-suggestions-container].data-suggestions-container")
      allContainers[allContainers.length - 1].appendChild(btn);
    });

    BotUI.scrollToLastMessage(messageElement);
  };

  public setMedia = (settings: any = {}) => {
    const messageElement = BotUI.messagesElement;
    const mediaPlayer = document.createElement("video");
    const source = document.createElement("source");
    source.src = settings.src;
    mediaPlayer.appendChild(source);
    mediaPlayer.setAttribute("controls", "");
    mediaPlayer.classList.add("chat-message");
    if (!settings.sound) {
      mediaPlayer.classList.add("bot-muted-video");
      window.onload = function () {
        const mediaList = document.getElementsByClassName("bot-muted-video");
        for (let index = 0; index < mediaList.length; index++) {
          const element = mediaList[index] as HTMLVideoElement;
          element.muted = true;
        }
      };
    }
    messageElement.appendChild(mediaPlayer);
  };

  public setTitle(title: string) {
    this.appSelectToggle(true, title);
  }

  /**
   * Controls visibility of the control icons - microphone, speaker and restart according to settings
   */
  public setControllIconStyles() {
    
    if (!BotUI.settings.controlIcons.mic) {
      BotUI.controlIconsWrapper
      .querySelector("[data-chat-input-keyboard]")
      .classList.add("hidden");
    } 
    else {
      BotUI.controlIconsWrapper
      .querySelector("[data-chat-input-keyboard]")
      .classList.remove("hidden");
    }
      
    if (!BotUI.settings.controlIcons.mute) {
      BotUI.controlIconsWrapper
      .querySelector("[data-chat-input-mute]")
      .classList.add("hidden");
    } else {
      BotUI.controlIconsWrapper
      .querySelector("[data-chat-input-mute]")
      .classList.remove("hidden");
    }
      
    if (!BotUI.settings.controlIcons.restart) {
      BotUI.controlIconsWrapper
      .querySelector("[data-chat-input-restart]")
      .classList.add("hidden");
    } else {
      BotUI.controlIconsWrapper
      .querySelector("[data-chat-input-restart]")
      .classList.remove("hidden");
    }

    // if elastic search is active then Mic icon is be replaced with the search icon
    if (!BotUI.settings.search) {
      BotUI.controlIconsWrapper
        .querySelector("[data-chat-input-search]")
        .classList.add("hidden");
      } 
      else {
        BotUI.controlIconsWrapper
        .querySelector("[data-chat-input-search]")
        .classList.remove("hidden");

        BotUI.controlIconsWrapper
        .querySelector("[data-chat-input-keyboard]")
        .classList.add("hidden");
    }
    
    const childrenList = BotUI.controlIconsWrapper.querySelectorAll(
      ".icon-sop:not(.hidden)"
    );
    for (let index = 0; index < childrenList.length; index++) {
      const element = childrenList[childrenList.length - 1 - index];
      element.classList.remove(
        "left-icon",
        "right-icon",
        "firstIcon",
        "secondIcon",
        "thirdIcon",
        "fourthIcon"
      );
      if (index === 0) {
        element.classList.add("right-icon");
        element.classList.add("firstIcon");
      }
      if (index === 1) {
        element.classList.add("secondIcon");
      }
      if (index === 2) {
        element.classList.add("thirdIcon");
      }
      if (index === 3){
        element.classList.add("fourthIcon");
      }
      if (index === childrenList.length - 1) {
        element.classList.add("left-icon");
      }

      // search icon and mic icon is given mirroring classes
      if (BotUI.settings.search && BotUI.settings.controlIcons.mic){
        ["firstIcon", "secondIcon", "right-icon", "thirdIcon", "fourthIcon", "left-icon"].forEach(cls => {
          if (BotUI.searchElement.classList.contains(cls)){
            BotUI.chatInputKeyboardElement.classList.add(cls);
          }
        });
      }
    }
  }

  private setCarouselUI(amount: number, callbacks, active=0) : HTMLElement[]{
    const leftIcon = document.createElement("div");
    const rightIcon = document.createElement("div");
    if (amount > 5){
      amount = 5;
    }

    const bottomIndexContainer = document.createElement("div");
    for (let i = 0; i < amount; i++){
      const carouselNode = document.createElement("div");

      if (active === i){
        carouselNode.classList.add("active");
      }

      ["carouselNode"].forEach((cls) => {
        carouselNode.classList.add(cls);
      });

      bottomIndexContainer.appendChild(carouselNode);
    }

    ["icon-sop", "icon-sop--left", "carouselIcon", "icon--content--left"].forEach((cls) => {
      leftIcon.classList.add(cls);
    });

    ["icon-sop", "icon-sop--right", "carouselIcon", "icon--content--right"].forEach((cls) => {
      rightIcon.classList.add(cls);
    });

    if (active === 0){
      leftIcon.classList.add("disabled");
    }if (active === amount -1){
      rightIcon.classList.add("disabled");
    }

    ["carouselBottomIndexContainer"].forEach((cls) => {
      bottomIndexContainer.classList.add(cls);
    });

    if (callbacks){
      if (callbacks.left){
        leftIcon.addEventListener("click", callbacks.left)
      }

      if (callbacks.right){
        rightIcon.addEventListener("click", callbacks.right)
      }
    }

    return [leftIcon, rightIcon, bottomIndexContainer];
  }

  public disableButtonGroup = (settings, callback, selector, findActiveIndex) => {
    BotUI.inputTakers.classList.remove("hidden");
    if (callback && findActiveIndex) {
      const activeIndex = findActiveIndex();
      callback(activeIndex);
    }
    if (settings.disableGroup) {
      document
        .querySelectorAll(`[data-button-group=${selector}]`)
        .forEach((elem) => {
          elem.setAttribute("disabled", "");
        });
    }
    this.setInputMode(settings.oldMode);
  };

  public setButton = (settings: any = {}, callback: Function = () => {}) => {
    const messageElement = BotUI.messagesElement;
    this.setInputMode("button");
    const button = document.createElement("button");
    const selector = "buttons";

    function findActiveIndex(){
      if (settings.background.length > 1){
        const carouselParent = button.getElementsByClassName("carouselBottomIndexContainer")[0];
        var activeIndex = 0;
        for (let index = 0; index < carouselParent.children.length; index++) {
          const element = carouselParent.children[index];
          if (element.classList.contains("active")){
            activeIndex = index;
            break;
          }
        } 
        return activeIndex;
      }else{
        return undefined;
      }
    }

    if (settings.background) {
      button.style.background = `transparent`;
      if (settings.background.length > 1){

        for (let index = 0; index < settings.background.length; index++) {
          const newImg = new Image();
          button.append(newImg);
          newImg.src = settings.background[index];
          newImg.id = `imgID${index}`;
          if (index !== 0){
            newImg.classList.add("hidden");
          }
        }
        function right(e){
          e.stopPropagation();
          const activeIndex = findActiveIndex();
          const leftIcon = button.getElementsByClassName("icon--content--left")[0]
          const carouselParent = button.getElementsByClassName("carouselBottomIndexContainer")[0];
          carouselParent.children[activeIndex].classList.remove("active");
          carouselParent.children[activeIndex + 1].classList.add("active");
          
          if (activeIndex + 1 === carouselParent.children.length - 1){
            e.target.classList.add("disabled");
          }
          leftIcon.classList.remove("disabled");
          (button as HTMLElement).querySelector(`#imgID${activeIndex}`).classList.add("hidden");
          (button as HTMLElement).querySelector(`#imgID${activeIndex + 1}`).classList.remove("hidden");
        }

        function left(e){
          e.stopPropagation();
          const activeIndex = findActiveIndex();
          const rightIcon = button.getElementsByClassName("icon--content--right")[0]
          const carouselParent = button.getElementsByClassName("carouselBottomIndexContainer")[0];
          carouselParent.children[activeIndex].classList.remove("active");
          carouselParent.children[activeIndex - 1].classList.add("active");
          
          if (activeIndex - 1 === 0){
            e.target.classList.add("disabled");
          }
          rightIcon.classList.remove("disabled");
          (button as HTMLElement).querySelector(`#imgID${activeIndex}`).classList.add("hidden");
          (button as HTMLElement).querySelector(`#imgID${activeIndex - 1}`).classList.remove("hidden");
        }

        this.setCarouselUI(settings.background.length, {right: (e) => {right(e)}, left: (e) => {left(e)}}).forEach(element => {
          button.appendChild(element);
        });
      }else{
        const newImg = new Image();
        button.append(newImg);
        newImg.src = settings.background[0];
      }
    }

    if (settings.text) {
      button.textContent = settings.text;
    }

    button.classList.add("inputButton", "chat-message", "chat-message-bot");
    button.setAttribute("data-message-type", "bot");
    button.setAttribute("data-button-group", selector);

    button.onclick = () => {
      this.disableButtonGroup(settings, callback, selector, findActiveIndex);
    };

    messageElement.appendChild(button);
    messageElement.scrollTop = messageElement.scrollHeight;
    BotUI.scrollToLastMessage(messageElement);
  };

  /**
   * Sets bot image
   * From image, an average color for its background is computed and opacity can be adjusted via imageAverageColorOpacity
   *
   * @param [url]- Whole url is expected. If called with null, the image element is removed
   * @param [nodeId] - Flowstorm image node ID
   */
  public setImage = (url: string = null, nodeId: string = "") => {
    if (BotUI.settings.guiMode === GUIMode.KIOSK) {
      const cleanImageElement = (full = true) => {
        BotUI.imageKioskElement.innerHTML = "";
        if (full) {
          BotUI.imageKioskElement.classList.add("bu-d-none");
          BotUI.element.removeAttribute("data-width-image");
        }
      };
      if (!url) {
        cleanImageElement();
      } else {
        const image = new Image();
        const fac = new FastAverageColor();
        image.crossOrigin = "anonymous";
        image.onload = (e) => {
          cleanImageElement(false);
          BotUI.imageKioskElement.classList.remove("bu-d-none");
          BotUI.element.setAttribute("data-width-image", "");
          BotUI.imageKioskElement.appendChild(image);

          fac
            .getColorAsync(BotUI.imageKioskElement.querySelector("img"))
            .then(function (color) {
              BotUI.element.style.setProperty(
                "--bot-ui-image-background-color",
                `rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, ${BotUI.settings.imageAverageColorOpacity})`
              );
            })
            .catch(function (e) {
              console.log(e);
            });
        };
        image.onerror = (e) => {
          cleanImageElement();
        };
        image.src =
          "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=" +
          url;
      }
    }
    if (
      BotUI.settings.guiMode === GUIMode.CHAT &&
      !(isNil(url) || isEmpty(url))
    ) {
      this.setChatMessage(
        null,
        url,
        null,
        MessageType.BOT,
        false,
        nodeId,
        this.botMessagesCallback,
        this.dialogueID
      );
    }
  };

  public removeOverlay() {
    BotUI.botPcmElement.classList.add("bu-invisible");
    BotUI.botPcmElement.classList.remove("bu-visible");
  }

  public addOverlay() {
    BotUI.botPcmElement.classList.remove("bu-invisible");
    BotUI.botPcmElement.classList.add("bu-visible");
  }

  public resume() {
    if (BotUI.settings.inputMode === "voice") {
      BotUI.botPcmElement.classList.remove("bu-invisible");
      BotUI.botPcmElement.classList.add("bu-visible");
    }
  }

  /**
   * Sets PCM of input, any value is now expected and it displays input PCM bar.
   * If it is called empty (with null) than PCM bar is removed.
   * If it is called than PCM output bar is automatically removed.
   *
   * @param samples
   */
  public setInputAudio = (samples: any = null) => {
    BotUI.botPcmElement.classList.add("bu-invisible");
    BotUI.botPcmElement.classList.remove("bu-visible");
    if (isNil(samples) || isEmpty(samples)) {
      BotUI.userPcmElement.classList.add("bu-invisible");
      BotUI.userPcmElement.classList.remove("bu-visible");
    } else {
      BotUI.userPcmElement.classList.add("bu-visible");
      BotUI.userPcmElement.classList.remove("bu-invisible");
    }
  };

  /**
   * Sets PCM of output, any value is now expected and it displays output PCM bar.
   * If it is called empty (with null) than PCM bar is removed.
   * If it is called than PCM input bar is automatically removed.
   *
   * @param samples
   * @param [sampleRate]
   * @param [stereo]
   */
  public setOutputAudio = (
    samples: any = null,
    sampleRate = 16000,
    stereo = false
  ) => {
    BotUI.userPcmElement.classList.add("bu-invisible");
    BotUI.userPcmElement.classList.remove("bu-visible");

    if (isNil(samples) || isEmpty(samples)) {
      BotUI.botPcmElement.classList.add("bu-invisible");
      BotUI.botPcmElement.classList.remove("bu-visible");
    } else if (BotUI.settings.inputMode === "voice") {
      BotUI.botPcmElement.classList.add("bu-visible");
      BotUI.botPcmElement.classList.remove("bu-invisible");
    }
  };

  public chatInputCallback = (...value) => {};

  public inputModeCallback = (...value) => {};

  public chatArrowCallback = (...value) => {};

  public chatMicrophoneCallback = (...value) => {};

  public closeElementCallback = () => {
    this.changeCollapsedMode();
  };

  public feedbackCallback = (...value) => {};

  public searchElementCallback = (...value) => {};

  public chatRestartCallback = (...value) => {};

  public botMessagesCallback = (e) => {};

  public chatMuteCallback = (...value) => {};

  public chatBargeCallback = (...value) => {};

  public chatPlayCallback = (...value) => {};

  public chatStopCallback = (...value) => {};

  public chatMicCallback = (...value) => {};

  public loginCallback = async (...value) => {};

  public sectionChangeCallback = (...value) => {};

  public chatBackCallback = (...value) => {};

  public chatKeyboardCallback = (...value) => {
    BotUI.settings.inputAudio = !BotUI.settings.inputAudio;
    if (BotUI.settings.inputAudio) {
      document
        .querySelector("[data-chat-input-keyboard]")
        .classList.add("icon-sop--keyboard-active");
    } else {
      document
        .querySelector("[data-chat-input-keyboard]")
        .classList.remove("icon-sop--keyboard-active");
    }
  };

  public chatSopNextCallback = (...value) => {};

  public chatSopQuestionCallback = (...value) => {};

  public chatTextInputElementCallback = (...value) => {};

  public dataChannelMessageCallback = (...value) => {};

  public collapsableTriggerCallback = (collapsed) => {};

  public suggestionsCallback = (...value) => {};

  public goToPositive = (id) => {};

  private static videoCallback: () => any = () => {};

  /**
   * Sets microphone on/off.
   * It triggers chatMicrophoneCallback
   *
   * @param enable
   */
  public setMicrophone = (enable: boolean = false) => {
    BotUI.isMicrophoneEnabled = enable;
    BotUI._setMicrophone();
    BotUI.getChatMicrophone(
      BotUI.isMicrophoneEnabled,
      this.chatMicrophoneCallback
    );
  };

  /**
   * Sets background color of user message (visible only in chat mode).
   * Empty call will reset color to default / init color.
   *
   * @param color
   */
  public setUserMessageBackgroundColor = (color: string) => {
    const backgroundColor =
      isNil(color) || !is(String, color)
        ? this.getSettings().userMessageBackgroundColor
        : color;
    BotUI.element.style.setProperty(
      "--bot-ui-message-background-user",
      backgroundColor
    );
  };

  /**
   * Sets background color of bot message (visible only in chat mode).
   * Empty call will reset color to default / init color.
   *
   * @param color
   */
  public setBotMessageBackgroundColor = (color: string) => {
    const backgroundColor =
      isNil(color) || !is(String, color)
        ? this.getSettings().botMessageBackgroundColor
        : color;
    BotUI.element.style.setProperty(
      "--bot-ui-message-background-bot",
      backgroundColor
    );
  };

  /**
   * Sets color of user message.
   * Empty call will reset color to default / init color.
   *
   * @param color
   */
  public setUserMessageTextColor = (color: string) => {
    const textColor =
      isNil(color) || !is(String, color)
        ? this.getSettings().userMessageTextColor
        : color;
    BotUI.element.style.setProperty("--bot-ui-message-color-user", textColor);
  };

  /**
   * Sets color of bot message.
   * Empty call will reset color to default / init color.
   *
   * @param color
   */
  public setBotMessageTextColor = (color: string) => {
    const textColor =
      isNil(color) || !is(String, color)
        ? this.getSettings().botMessageTextColor
        : color;
    BotUI.element.style.setProperty("--bot-ui-message-color-bot", textColor);
  };

  /**
   * Sets color of outline of user message.
   * Empty call will reset color to default / init color.
   *
   * @param color
   */
  public setUserMessageTextOutlineColor = (color: string) => {
    const textOutlineColor =
      isNil(color) || !is(String, color)
        ? this.getSettings().userMessageTextOutlineColor
        : color;
    BotUI.element.style.setProperty(
      "--bot-ui-message-color-outline-user",
      textOutlineColor
    );
  };

  /**
   * Sets color of outline of bot message.
   * Empty call will reset color to default / init color.
   *
   * @param color
   */
  public setBotMessageTextOutlineColor = (color: string) => {
    const textOutlineColor =
      isNil(color) || !is(String, color)
        ? this.getSettings().botMessageTextOutlineColor
        : color;
    BotUI.element.style.setProperty(
      "--bot-ui-message-color-outline-bot",
      textOutlineColor
    );
  };

  public setIconsForBackground = (enabled = true) => {
    if (enabled) {
      BotUI.restartElement.classList.add("chat-input-disabled");
      BotUI.chatInputMuteElement.classList.add("chat-input-disabled");
      BotUI.chatInputKeyboardElement.classList.add("chat-input-disabled");
      BotUI.searchElement.classList.add("chat-input-disabled");
    } else {
      BotUI.searchElement.classList.remove("chat-input-disabled");
      BotUI.restartElement.classList.remove("chat-input-disabled");
      BotUI.chatInputMuteElement.classList.remove("chat-input-disabled");
      BotUI.chatInputKeyboardElement.classList.remove("chat-input-disabled");
    }
  };

  /**
   * enables user input in UI.
   * Sets value of textInputEnabled
   *
   * @param enabled
   */
  public setTextInputEnabled = (enabled = false) => {
    BotUI.settings.textInputEnabled = enabled;
    let elementChatHeight = disabledHeight;
    this.setIconsForBackground(!enabled);
    if (enabled) {
      BotUI.element.setAttribute("data-with-chat-input", "");
      elementChatHeight = chatHeight;
      BotUI.textInput.classList.remove("hidden");
    } else {
      BotUI.element.setAttribute("data-with-chat-input", "");
      elementChatHeight = disabledChatHeight;
      BotUI.textInput.classList.add("hidden");
    }
    BotUI.element.style.setProperty(
      "--bot-ui-chat-input-height",
      elementChatHeight
    );
    BotUI.handleBotUiHeights();
  };

  /**
   * Url of stream with avatar
   *
   * @param streamUrl
   */
  public setHlsAvatar = (streamUrl: string = null) => {
    this.setAvatar({
      type: AvatarTypeEnum.HLS,
      streamUrl,
    });
  };

  /**
   * Websocket url of stream with avatar
   *
   * @param streamUrl
   */
  public setWebRtcAvatar = (streamUrl: string = null) => {
    this.setAvatar({
      type: AvatarTypeEnum.WEBRTC,
      streamUrl,
    });
  };

  public setAvatar = async (
    { type, streamUrl }: AvatarStream = {
      type: AvatarTypeEnum.HLS,
      streamUrl: null,
    }
  ) => {
    const videoElement = document.createElement("video");
    const cleanAvatar = (closeWs = false) => {
      BotUI.avatarElement.innerHTML = "";
      BotUI.showAvatar(false);
      if (closeWs && BotUI.avatarWs) {
        BotUI.avatarWs.close();
      }
    };
    cleanAvatar();
    if (!isValidUrl(streamUrl)) {
      return;
    }
    if (type === AvatarTypeEnum.HLS) {
      BotUI.avatarElement.appendChild(videoElement);
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.detachMedia();
        hls.loadSource(streamUrl);
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoElement.play();
          BotUI.showAvatar(true);
        });
        hls.on(Hls.Events.ERROR, (err: string, data: any) => {
          if (data && data.response && data.response.code === 404) {
            hls.detachMedia();
            cleanAvatar();
          }
          console.log(err, data.response, data);
        });

        hls.on(
          Hls.Events.LEVEL_SWITCHED,
          (evt: any, data: Hls.levelSwitchedData) => {
            const { width, height } = hls.levels[data.level];
            if (width && height) {
              console.log(`qualityChange ${width}x${height}`);
            }
          }
        );

        hls.on(Hls.Events.BUFFER_EOS, (data: Hls.SourceBufferName) => {
          this.setHlsAvatar(null);
        });
      }
    } else {
      let candidates = [];
      BotUI.avatarWs = new WebSocket(streamUrl);
      const opened = await wsConnection(BotUI.avatarWs);
      if (opened) {
        BotUI.avatarWs.onmessage = (event) => {
          const message = JSON.parse(event.data);

          switch (message.type) {
            case "answer":
              BotUI.avatarConnection
                .setRemoteDescription({
                  type: "answer",
                  sdp: message["sdp"],
                })
                .then(() => {
                  candidates.forEach((candidate) => {
                    BotUI.avatarConnection.addIceCandidate(candidate);
                  });

                  candidates = [];
                })
                .catch((e) => {
                  console.error("Failed to set remote description", e);
                });
              break;

            case "error":
              console.error(`Error message from server ${message.message}`);
              break;

            case "iceCandidate":
              const candidate = new RTCIceCandidate(message.candidate);
              if (
                BotUI.avatarConnection &&
                BotUI.avatarConnection.remoteDescription
              ) {
                BotUI.avatarConnection.addIceCandidate(candidate).catch((e) => {
                  console.error("Failed to add ICE candidate", e);
                });
              } else {
                console.log(
                  "Connection not ready, queuing candidate",
                  candidate
                );
                candidates.push(candidate);
              }
              break;

            default:
              console.error(`Unknown message from server ${message.message}`);
              break;
          }
        };

        (async () => {
          // TODO add credentials
          const configuration = {
            iceServers: [
              {
                urls: ["stun:stun.l.google.com:19302"],
                username: "",
                credential: "",
              },
            ],
          };
          BotUI.avatarConnection = new RTCPeerConnection(configuration);
          BotUI.avatarDataChannel = this.setupDataChannel("cirrus");

          BotUI.avatarConnection.addEventListener("icecandidate", (event) => {
            const candidate = event.candidate;

            if (candidate) {
              console.log("Local ICE candidate" + JSON.stringify(candidate));
              if (candidate.candidate !== "") {
                this.avatarSendMessage({
                  type: "iceCandidate",
                  candidate: candidate,
                });
              }
            }
          });

          BotUI.avatarConnection.addEventListener("track", (event) => {
            console.log("Video track ready");
            cleanAvatar(false);
            BotUI.avatarElement.appendChild(videoElement);
            videoElement.playsInline = true;
            if (videoElement.srcObject) {
              (videoElement.srcObject as MediaStream).addTrack(event.track);
            } else {
              videoElement.srcObject = event.streams[0];
            }
            BotUI.showAvatar(true);
          });

          const offer = await BotUI.avatarConnection.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
          });
          await BotUI.avatarConnection.setLocalDescription(offer);

          console.info("Sending SDP offer");

          this.avatarSendMessage({
            type: "offer",
            sdp: offer.sdp,
          });
        })().catch((e) => {
          console.error("Failed to create WebRTC connection", e);
          cleanAvatar();
        });
      }
    }
  };

  /**
   * For truthy reverseOrder is avatar displayed in chat gui mode on the bottom of the widget
   *
   * @param reverseOrder
   */
  public setReverseAvatarOrder = (reverseOrder: boolean = false) => {
    if (BotUI.settings.guiMode === GUIMode.CHAT) {
      reverseOrder = !!reverseOrder;
      BotUI.reverseAvatarOrderAction(reverseOrder);
    }
  };

  public avatarSendMessage = (message) => {
    const jsonMessage = JSON.stringify(message);
    console.log("Sending message: " + jsonMessage);
    BotUI.avatarWs.send(jsonMessage);
  };

  public getSettings = () => {
    return BotUI.settings;
  };

  public sendRTCData = (descriptor) => {
    if (
      BotUI.avatarDataChannel &&
      BotUI.avatarDataChannel.readyState == "open"
    ) {
      console.log("Sending", descriptor);
      const descriptorAsString = JSON.stringify(descriptor);
      const data = new DataView(
        new ArrayBuffer(1 + 2 + 2 * descriptorAsString.length)
      );
      let byteIdx = 0;
      data.setUint8(byteIdx, 50);
      byteIdx++;
      data.setUint16(byteIdx, descriptorAsString.length, true);
      byteIdx += 2;
      for (let i = 0; i < descriptorAsString.length; i++) {
        data.setUint16(byteIdx, descriptorAsString.charCodeAt(i), true);
        byteIdx += 2;
      }
      BotUI.avatarDataChannel.send(data.buffer);
    }
  };

  /**
   * Sets or removes element attribute "data-avatar-reverse-order"
   *
   * @param reverseOrder - The boolean value indicating wheter the order should be reversed or not
   */
  private static reverseAvatarOrderAction = (
    reverseOrder: boolean = BotUI.settings.reverseAvatarOrder
  ) => {
    BotUI.settings.reverseAvatarOrder = reverseOrder;
    if (BotUI.settings.reverseAvatarOrder === true) {
      BotUI.element.setAttribute("data-avatar-reverse-order", "");
    } else {
      BotUI.element.removeAttribute("data-avatar-reverse-order");
    }
  };

  private static showAvatar = (show = true) => {
    const hasAvatar = BotUI.element.hasAttribute("data-with-avatar");
    if (!hasAvatar && BotUI.settings.guiMode === GUIMode.CHAT) {
      BotUI.scrollToLastMessage(BotUI.messagesElement);
    }
    if (show) {
      BotUI.element.setAttribute("data-with-avatar", "");
    } else {
      BotUI.element.removeAttribute("data-with-avatar");
    }
    BotUI.handleBotUiHeights();
  };

  private static handleBotUiHeights = () => {
    const hasAvatar = BotUI.element.hasAttribute("data-with-avatar");
    const { height } = BotUI.element.getBoundingClientRect();
    const avatarMaxHeight =
      height * avatarMaxHeightRatio[BotUI.settings.guiMode];
    const avatarTextOverlap = height * avatarTextOverlapRatio * -1;
    const avatarHeight = hasAvatar ? `${avatarMaxHeight}px` : disabledHeight;
    BotUI.element.style.setProperty("--bot-ui-avatar-height", avatarHeight);
    BotUI.element.style.setProperty(
      "--bot-ui-avatar-text-overlap",
      `${avatarTextOverlap}px`
    );
  };

  private static getInputValue = (value: string, callback: Function) =>
    callback(value);

  private static getChatMicrophone = (value: boolean, callback: Function) => {
    if (BotUI.isMicrophoneEnabled) {
      BotUI.chatInputBargeElement.classList.add(BotUI.settings.micIcon);
    } else {
      BotUI.chatInputBargeElement.classList.remove(BotUI.settings.micIcon);
    }
    callback(value);
  };

  private static _setMicrophone = () => {
    if (BotUI.isMicrophoneEnabled) {
      BotUI.chatInputMicElement.classList.add("icon--light");
    } else {
      BotUI.chatInputMicElement.classList.remove("icon--light");
    }
  };

  public disableStop = (disable: boolean) => {
    BotUI.chatInputStopElement.classList.remove("icon--light");
    if (disable) {
      BotUI.chatInputStopElement.classList.add("icon--light");
    }
  };

  private static getChatMute = (value: boolean, callback: Function) =>
    callback(value);

  /**
   * Sets background of UI to color or image
   *
   * @param background - The color for the background (inner radial gradient color) or url of the background image
   * @param [secondaryColor] - The second color of the background radial gradient (outer)
   */
  private static setBackground = (
    background: Background,
    secondaryColor = null
  ) => {
    const {
      color = BotUI.settings.backgroundColor,
      url: {
        path = BotUI.settings.backgroundImage,
        blur = BotUI.settings.backgroundImageBlur,
      } = {},
    } = background;
    BotUI.settings.backgroundColor = color;
    BotUI.settings.backgroundImageBlur = blur;
    BotUI.settings.backgroundImage = path;
    if (color) {
      if (secondaryColor) {
        BotUI.element.style.setProperty(
          "--bot-ui-base-background-color",
          secondaryColor
        );
      }
      BotUI.element.style.setProperty("--bot-ui-background-color", color);
      BotUI.backgroundElement.classList.remove("background--image");
    }
    if (path) {
      BotUI.backgroundElement.classList.add("background--image");
      BotUI.element.style.setProperty(
        "--bot-ui-background-url",
        `url("${path}")`
      );
      BotUI.element.style.setProperty(
        "--bot-ui-background-url-blur",
        `${blur}px`
      );
    }
  };

  private chatMessageHeightLimit(elem: HTMLElement) {
    const limit = 40;
    const height = elem.offsetHeight;
    const vh = (height / window.innerHeight) * 100;
    if (vh > limit) {
      const div = document.createElement("div");
      div.classList.add("chat-message--limit");
      elem.appendChild(div);
      div.appendChild(elem.children[0]);
    }
  }

  private setGoToButton = (id, dialogueID, clickCallback, messageTemplate) => {
    // Create go to icon
    const hoverIcon = document.createElement("span");
    hoverIcon.innerHTML = " ";
    ["icon-sop", "icon-sop--undo", "icon--content--undo"].forEach((_class) => {
      hoverIcon.classList.add(_class);
    });
    hoverIcon.addEventListener("click", () => {
      clickCallback(id, dialogueID);
    });
    messageTemplate.children[0].appendChild(hoverIcon);
  };

  public showAllGoToButtons = () => {
    const messageElement = BotUI.messagesElement;
    const oldElems = messageElement.getElementsByClassName("latest-message");
    for (let index = 0; index < oldElems.length; index++) {
      const element = oldElems[index];
      element.classList.remove("latest-message");
    }
  };

  public dialogueChangeCallback(dialogueIDs) {
    const messageElement = BotUI.messagesElement;
    const allMessages =
      messageElement.getElementsByClassName("chat-message-bot");
    for (let index = 0; index < allMessages.length; index++) {
      const message = allMessages[index];
      const lostGoBackIcons = message.getElementsByClassName(
        "icon--content--undo"
      );
      if (lostGoBackIcons[0]) {
        if (dialogueIDs.includes(message.getAttribute("dialogueID"))) {
          lostGoBackIcons[0].classList.remove("no-root-dialogue");
        } else {
          lostGoBackIcons[0].classList.add("no-root-dialogue");
        }
      }
    }
  }

  public convertMd(text: string) {
    // Convert MD to HTML
    if (text) {
      text = text.replace(/(?:\\r\\n|\\r|\\n)/g, String.fromCharCode(10));
    }
    var converter = new showdown.Converter();
    var html = converter.makeHtml(text);
    var parser = new DOMParser();

    // Convert string to HTMLElement
    var doc = parser.parseFromString(html, "text/html");
    const allLinks = (doc.body as HTMLElement).querySelectorAll("a, p");

    // Add any necessary attributes to tags such as "a" and "p"
    for (let index = 0; index < allLinks.length; index++) {
      const element = allLinks[index];
      element.classList.add("bot-text-styles");
      if (element.tagName === "A") {
        element.setAttribute("target", "_blank");
      }
    }

    const result = doc.body.innerHTML !== "null" ? doc.body.innerHTML : "";
    // Return HTML string
    return result.replace(String.fromCharCode(10), "<br>");
  }

  public setChatMessage = (
    text: string,
    imageUrl: string,
    videoUrl: string,
    type: MessageType,
    replace: boolean = false,
    id: string = null,
    clickCallback: Function = () => {},
    dialogueID = ""
  ) => {
    const messageElement = BotUI.messagesElement;
    const messageTemplate = getContentAsHtml(chatMessageStructureTemplate);
    const messageTemplateElement =
      messageTemplate.querySelector("div.chat-message");
    const messageTemplateTextElement =
      messageTemplateElement.querySelector(":scope span");

    if (messageElement.lastChild !== null) {
      const { dataset: { messageType } = {} } =
        messageElement &&
        messageElement.lastChild &&
        <HTMLElement>messageElement.lastChild;
      if (messageType && messageType === type) {
        (messageElement.lastChild as Element).classList.remove(
          "chat-message-last"
        );
      }
    }

    if (type === MessageType.BOT) {
      const htmlText = this.convertMd(text);
      messageTemplateTextElement.innerHTML = htmlText;
    } else {
      messageTemplateTextElement.innerHTML = text;
    }

    messageTemplateElement.setAttribute("data-message-type", type);
    messageTemplateElement.classList.add("chat-message-" + type);
    messageTemplateElement.classList.add("chat-message-last");

    if (imageUrl) {
      const image = new Image();
      image.onload = (e) => {
        messageTemplateElement.appendChild(image);
        messageElement.scrollTop = messageElement.scrollHeight;
      };
      image.onerror = (e) => {};
      image.src = imageUrl;
    }

    if (videoUrl) {
      if (videoUrl.includes("youtube.com/embed")) {
        const iframe = document.createElement("iframe");
        iframe.setAttribute("src", videoUrl);
        messageTemplateElement.appendChild(iframe);
        messageElement.scrollTop = messageElement.scrollHeight;
        BotUI.videoCallback();
      } else {
        const video = document.createElement("video");
        video.src = videoUrl;
        video.autoplay = true;
        video.onloadeddata = (e) => {
          messageElement.scrollTop = messageElement.scrollHeight;
        };
        video.onended = (e) => {
          BotUI.videoCallback();
        };
        messageTemplateElement.appendChild(video);
      }
    }

    if (type === MessageType.BOT && this.getSettings().goTo && !this.elasticSearchOn) {
      this.setGoToButton(id, dialogueID, clickCallback, messageTemplate);
    }

    messageElement.appendChild(messageTemplate.children[0]);
    this.chatMessageHeightLimit(
      messageElement.children[messageElement.children.length - 1] as HTMLElement
    );
    messageElement.scrollTop = messageElement.scrollHeight;
    if (type === MessageType.BOT && this.getSettings().goTo) {
      messageElement.children[messageElement.children.length - 1].setAttribute(
        "dialogueID",
        dialogueID
      );
      if (BotUI.settings.showTooltips) {
        const undoElement = messageElement.children[
          messageElement.children.length - 1
        ].getElementsByClassName("icon--content--undo")[0];
        this.setTooltip(undoElement, "Return Here");
      }
    }

    BotUI.scrollToLastMessage(messageElement);
  };

  private static scrollToLastMessage = (messageElement: HTMLElement) => {
    window.setTimeout(() => {
      scrollToAnimated(
        messageElement,
        messageElement.scrollHeight,
        BotUI.settings.animationSpeed
      );
      // messageElement.scrollTop = messageElement.scrollHeight;
      // messageElement.querySelector('.chat-message:last-child').scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
    });
  };

  private static setCollapsableUIHeight = () => {
    let collapsed = BotUI.settings.collapsed ? "collapsed" : "expanded";
    BotUI.element.setAttribute("data-collapsable", collapsed);
    const { width, height } = BotUI.settings.widgetSize;
    BotUI.element.style.width = BotUI.settings.collapsed ? null : width;
    BotUI.element.style.height = BotUI.settings.collapsed ? null : height;
  };
}

export { BotUI as default };
