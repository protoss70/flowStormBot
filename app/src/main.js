import * as Sentry from "@sentry/browser";
import Bot from "@flowstorm/bot-service";
import BotUI from "@flowstorm/bot-ui";
import { Converter } from "showdown";
import { Integrations } from "@sentry/tracing";
import { v4 as uuidv4 } from "uuid";

import {
  getContentAsHtml,
  getCookie,
  getRndInteger,
  sendRequest,
  setCookie,
  BotInitializer,
} from "./utils";
import { playTemplate, modalTemplate } from "./templates";

import "./assets/main.scss";

const scrollSpeed = 120; // pixels per second
const scrollDelay = 3; // seconds before the scrolling starts

const defaultURL = "5f7db5f1e662e830b20dbe7c";
const environment = "-preview";
let botKey =
  environment === "" || environment === "-preview"
    ? defaultURL
    : "606c52c6d750aa1b1537e5d6";
let studioUrl =
  environment === "local"
    ? "http://localhost:8089"
    : `https://studio${environment}.flowstorm.ai`;
let defaultCoreUrl =
  environment === "local"
    ? "http://localhost:8080"
    : `https://core${environment}.flowstorm.ai`;
let development = false;

let idToken = undefined;
let accessToken = undefined;
let termsId = undefined;

const converter = new Converter();
var botInitializer = new BotInitializer();
var buttonInput = false;
var elasticSearchActive = false; // this is true when the actual query for the elastic search is being entered
var searchCommandActive = false; // this is true when the #search command is called
let generatodEmbedLines = {};

const audios = {};
var latestUserInputID = ""; // Keeps track of the UserInput node id from flowstorm. Used for Alternative Suggestions
var alternativeReInput = false;
var alternativeLatestText = "";

const regex =
  /https:\/\/core(-([0-9]+|preview)){0,1}.flowstorm.ai\/file\/tts\/[0-9a-f]+\.wav/g;

const suggestionModes = {
  STANDARD: "disappearing",
  ALTERNATIVE: "non-disappearing",
};

const botUIDefaultSettings = {
  guiMode: "chat",
  fullScreen: false,
  widgetSize: {
    width: "400px",
    height: "700px",
  },
  imageAverageColorOpacity: 0.5,
  backgroundImageBlur: 0,
  textInputEnabled: true,
  collapsable: true,
  backgroundAdvancedAnimationParticlesCount: 5,
  animationSpeed: 500,
  backgroundSimpleAnimation: true,
  collapsed: true,
  interactionMode: "GUIDE",
  sound: true,
  search: true,
  goTo: true,
  suggestionMode: suggestionModes.STANDARD,
  elasticSearchCharLimit: {
    charLimit: 50,
    limitOn: true
  },
  cvutIcon: false,
  suggestionsListView: false,
};

const clientDefaultSetting = {
  allowUrlParams: false,
  botKey,
  customCssClass: null,
  domain: "",
  startMessage: undefined,
  jwtToken: null,
  attributes: {},
  callback: {},
  coreURL: defaultCoreUrl,
  autoStart: false,
  ttsFileType: "mp3",
};

let bot = undefined;
let botBackground = undefined;
let botElement;
let modal;
let botState = {};
let paused = true;
let textInputEnabled = false;
let dialogueIDs = [];

var exitButtonMode = () => {};

export const initFSClientBot = (initParams = {}) => {
  
  const urlParams = new URLSearchParams(window.location.search);
  let settings = {
    ...clientDefaultSetting,
    ...botUIDefaultSettings,
    ...initParams,
  };

  Sentry.init({
    dsn: "https://da1caa885aee4032898d553d1129571b@o318069.ingest.sentry.io/5438705",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
    environment,
  });
  const { allowUrlParams, startMessage } = settings;
  botKey = settings.botKey;
  textInputEnabled = settings.textInputEnabled;
  settings.textInputEnabled = false;
  botInitializer = new BotInitializer(startMessage, settings.attributes);

  function setPreviewCustomizations(botUI) {
    // Customization parameters and IDs for customization showcase website only
    const listenerIDs = [
      "textColorUser",
      "textColorBot",
      "TextOutlineUser",
      "TextOutlineBot",
      "messageBackgroundUser",
      "userOpacity",
      "messageBotBackground",
      "botOpacity",
      "botBackgroundColor",
      "backgroundUrl",
      "backgroundBlur",
      "botBackgroundColorSecondary",
    ];
    const generatorButtonID = "generateEmbedCodeButton";

    // HTML tags for generating the embed code
    const preTags = `
		&lt;script&gt;<br>
		&emsp;initFSClientBot({<br>
			&emsp;&emsp;...YourParameters,<br>
		`;

    const endTags = `
		&emsp;})<br>
		&lt;/script&gt;
		`;

    function ColorToRGBA(opacityID, colorID) {
      /* Conversion logic */
      const opacity = document.getElementById(opacityID).value;
      const color = document.getElementById(colorID).value;
      const r = parseInt(color.substr(1, 2), 16);
      const g = parseInt(color.substr(3, 2), 16);
      const b = parseInt(color.substr(5, 2), 16);
      return `rgba(${r},${g},${b},${opacity})`;
    }

    listenerIDs.forEach((id) => {
      var listenerFunction;
      if (id === "textColorUser")
        listenerFunction = (e) => {
          generatodEmbedLines["userMessageTextColor"] = e.target.value;
          settings.userMessageTextColor = e.target.value;
          botUI.setUserMessageTextColor(e.target.value);
        };
      if (id === "textColorBot")
        listenerFunction = (e) => {
          generatodEmbedLines["botMessageTextColor"] = e.target.value;
          settings.botMessageTextColor = e.target.value;
          botUI.setBotMessageTextColor(e.target.value);
        };
      if (id === "TextOutlineUser")
        listenerFunction = (e) => {
          generatodEmbedLines["userMessageTextOutlineColor"] = e.target.value;
          settings.userMessageTextOutlineColor = e.target.value;
          botUI.setUserMessageTextOutlineColor(e.target.value);
        };
      if (id === "TextOutlineBot")
        listenerFunction = (e) => {
          generatodEmbedLines["botMessageTextOutlineColor"] = e.target.value;
          settings.botMessageTextOutlineColor = e.target.value;
          botUI.setBotMessageTextOutlineColor(e.target.value);
        };
      if (id === "messageBackgroundUser")
        listenerFunction = () => {
          const color = ColorToRGBA("userOpacity", "messageBackgroundUser");
          generatodEmbedLines["userMessageBackgroundColor"] = color;
          settings.userMessageBackgroundColor = color;
          botUI.setUserMessageBackgroundColor(color);
        };

      if (id === "messageBotBackground")
        listenerFunction = () => {
          const color = ColorToRGBA("botOpacity", "messageBotBackground");
          generatodEmbedLines["botMessageBackgroundColor"] = color;
          settings.botMessageBackgroundColor = color;
          botUI.setBotMessageBackgroundColor(color);
        };

      if (id === "userOpacity")
        listenerFunction = () => {
          const color = ColorToRGBA("userOpacity", "messageBackgroundUser");
          generatodEmbedLines["userMessageBackgroundColor"] = color;
          settings.userMessageBackgroundColor = color;
          botUI.setUserMessageBackgroundColor(color);
        };

      if (id === "botOpacity")
        listenerFunction = () => {
          const color = ColorToRGBA("botOpacity", "messageBotBackground");
          generatodEmbedLines["botMessageBackgroundColor"] = color;
          settings.botMessageBackgroundColor = color;
          botUI.setBotMessageBackgroundColor(color);
        };

      if (id === "botBackgroundColor")
        listenerFunction = (e) => {
          generatodEmbedLines["backgroundColor"] = e.target.value;
          settings.backgroundColor = e.target.value;
          botUI.setBackgroundColor(e.target.value);
        };

      if (id === "backgroundBlur")
        listenerFunction = (e) => {
          generatodEmbedLines["backgroundImageBlur"] = e.target.value;
          settings.backgroundImageBlur = e.target.value;
          botUI.setBackgroundImage(
            document.getElementById("backgroundUrl").value,
            e.target.value
          );
        };

      if (id === "backgroundUrl")
        listenerFunction = (e) => {
          generatodEmbedLines["backgroundImage"] = e.target.value;
          settings.backgroundImageBlur = e.target.value;
          botUI.setBackgroundImage(
            e.target.value,
            document.getElementById("backgroundBlur").value
          );
        };

      if (id === "botBackgroundColorSecondary")
        listenerFunction = (e) => {
          generatodEmbedLines["backgroundImageSecondaryColor"] = e.target.value;
          settings.backgroundImageSecondaryColor = e.target.value;
          botUI.setBackgroundColor(
            document.getElementById("botBackgroundColor").value,
            e.target.value
          );
        };

      document.getElementById(id).addEventListener("input", (e) => {
        listenerFunction(e);
      });
      document
        .getElementById(generatorButtonID)
        .addEventListener("click", () => {
          document
            .getElementById("embedParamsParent")
            .classList.remove("hidden");
          const embedElem = document.getElementById("embedParams");
          embedElem.innerHTML = preTags;
          Object.keys(generatodEmbedLines).forEach((key) => {
            embedElem.innerHTML += `&emsp;&emsp;${key}: ${generatodEmbedLines[key]},<br />`;
          });
          embedElem.innerHTML += endTags;
          window.scrollTo(0, document.body.scrollHeight);
        });
    });
  }

  if (allowUrlParams) {
    const urlParamsObject = {};
    [...urlParams.entries()].forEach(
      (urlParamPair) => (urlParamsObject[urlParamPair[0]] = urlParamPair[1])
    );
    const urlBotKey = urlParams.get("key");
    const botKeyStorage = localStorage.getItem("bot-app-active");
    if (
      window.location.pathname.length === 25 &&
      settings.botKey === defaultURL
    ) {
      botKey = window.location.pathname.substring(1);
    } else if (botKeyStorage && development) {
      botKey = botKeyStorage;
    } else if (urlBotKey !== null && urlBotKey.length === 24 && development) {
      botKey = urlBotKey;
    }
    const url = new URL(window.location.href);
    const backgroundAdvancedAnimationParticlesCount =
      urlParams.get("animObjects") === null
        ? 5
        : parseInt(urlParams.get("animObjects"));
    const backgroundSimpleAnimation =
      urlParams.get("animate") === null
        ? true
        : urlParams.get("animate") === "true";
    const avatarURL = urlParams.get("avatarURL");
    const animationSpeed = backgroundSimpleAnimation ? 500 : 0;
    settings = {
      ...settings,
      backgroundAdvancedAnimationParticlesCount,
      backgroundSimpleAnimation,
      animationSpeed,
      avatarURL,
      ...urlParamsObject,
    };
  }
  const botUI = initUI(settings);
  var myBot;
  if (botUI) {
    myBot = createBot(botUI, settings);
    initBot();
    bot.stateHandler = stateHandler;
    bot.setInCallback = () => {
      if (settings.inputAudio) {
        document
          .querySelector("[data-chat-input-mic]")
          .classList.add("icon--mic-active");
      } else {
        document
          .querySelector("[data-chat-input-mic]")
          .classList.remove("icon--mic-active");
        botUI.removeOverlay();
      }
    };

    bot.audioInputCallback = () => {
      if (settings.inputAudio) {
        settings.inputAudio = false;
        bot.setInAudio(settings.inputAudio, getStatus());
        botUI.removeOverlay();
      }
    };

    bot.sttRecognizedCallback = () => {
      if (elasticSearchActive) {
        botUI.toggleLoader(true);
      }
    };

    if (development) {
      function setControlIconsMain() {
        botUI.setControllIcons({
          mic: document.getElementById("mic").checked,
          mute: document.getElementById("mute").checked,
          restart: document.getElementById("restart").checked,
        });
      }

      function setTextEnabled() {
        const textInputEnabled = document.getElementById("textInput").checked;
        botUI.setTextInputEnabled(textInputEnabled);
      }

      document.getElementById("mute").addEventListener("change", () => {
        setControlIconsMain();
      });
      document.getElementById("mic").addEventListener("change", () => {
        setControlIconsMain();
      });
      document.getElementById("restart").addEventListener("change", () => {
        setControlIconsMain();
      });
      document.getElementById("textInput").addEventListener("change", () => {
        setTextEnabled();
      });

      setPreviewCustomizations(botUI);
      const url = new URL(window.location.href);
      const showCustomizationOptions = url.searchParams.get("c") === "u_uid";
      if (!showCustomizationOptions) {
        document.getElementById("customizationOptions").remove();
        document.getElementById("showCustomButton").remove();
      }
    }

    if (settings.interactionMode === "SOP") {
      bot.getUser().then((user) => {
        console.log("User: ", user);
        settings;
        if (user === null) {
          botUI.setSection("LOGIN");
        }
      });
    } else if (
      settings.interactionMode === "GUIDE" ||
      settings.interactionMode === "SOP"
    ) {
      bot.setInAudio(false, getStatus());
    }
  } else {
    let { elementId = null } = settings;
    console.error(
      `Element with ID "${elementId}" was not found in DOM. Cannot initialize BOT UI. Use existing element with ID or remove elementId property from initialization.`
    );
  }

  return myBot;
};

const initUI = (settings = {}) => {
  let { elementId = null, customCssClass = null } = settings;
  if (elementId === null) {
    const clientElement = document.createElement("div");
    elementId = `fs-client-${uuidv4()}`;
    clientElement.setAttribute("id", elementId);
    document.body.appendChild(clientElement);
  }
  if (customCssClass !== null) {
    customCssClass = customCssClass.toString().split(/[ ,;]+/);
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.add(...customCssClass);
    }
  }
  const botUI = new BotUI(elementId, settings);
  botUI.setUserText();
  console.log(botUI.getButtonInputMode());

  botElement = BotUI.element;
  if (!botElement) {
    return null;
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes") {
        checkBotUIOverlays(mutation.target);
      }
    });
  });

  observer.observe(botElement, {
    attributes: true,
  });

  if (settings.avatarURL) {
    botUI.setWebRtcAvatar(settings.avatarURL);
    settings.ttsFileType = "wav";
  }

  return botUI;
};

const checkBotUIOverlays = (element) => {
  const {
    dataset: { collapsable },
  } = element;
  const playButton = botElement.querySelector("[data-play]");
  if (collapsable === "collapsed") {
    if (modal) {
      modal.style.display = "none";
    }
    if (playButton) {
      playButton.style.display = "none";
    }
  } else {
    if (modal) {
      const modalContentElement = modal.querySelector(
        "[data-fs-bot-modal-consent]"
      );
      const { height: botHeight } = botElement.getBoundingClientRect();
      const { paddingBottom: botPaddingBottom } = getComputedStyle(botElement);
      modalContentElement.style.height =
        ((botHeight - parseInt(botPaddingBottom, 10)) * 3) / 5 + "px";
      modal.style.display = "block";
    }
    if (playButton) {
      // playButton.style.display = 'block';
    }
  }
};

const setDialogueIDs = (newDialogueIDs, botUI) => {
  dialogueIDs = newDialogueIDs;
  if (botUI) {
    botUI.dialogueChangeCallback(dialogueIDs);
  }
};

var stateHandler;

var createBot = (botUI, settings) => {
  const { status = undefined } = botState;

  window.addEventListener("message", (event) => {
    if (event.data === "BotStopEvent") {
      clientCallback.onEnd();
    }
  });

  const defaultCallback = {};

  defaultCallback.setStatus = (newState) => {
    const oldState = botState;
    botState = newState;
    if (newState.status === "LISTENING") {
      botUI.setOutputAudio(1);
    } else {
      botUI.setInputAudio(1);
    }
    changePlayIcon(
      newState.status === "SLEEPING" ||
        newState.status === "PAUSED" ||
        !newState.status,
      botUI
    );

    if (newState.status === "SLEEPING") {
      botUI.showAllGoToButtons();
      setDialogueIDs([], botUI);
    } else if (newState.status === undefined) {
      setDialogueIDs([], botUI);
    }
  };

  defaultCallback.getStatusString = (status) => {
    return status;
  };

  defaultCallback.addMessage = (type, text, image, background, nodeId) => {
    if (type === "sent") {
      if (text !== null) {
        botUI.setUserText(text);
      }
    } else {
      paused = true;
      botUI.expand();
      paused = false;
      if (BotUI.botTextKioskElement) {
        BotUI.botTextKioskElement.style.transition = "transform 0s linear 0s";
        BotUI.botTextKioskElement.style.transform = "translateY(0px)";
      }
      const playButton = botElement.querySelector("[data-play]");
      if (playButton !== null) {
        playButton.remove();
      }
      botUI.setBotText(text, nodeId);
      window.setTimeout(() => {
        const windowHeight =
          BotUI.orientation === "portrait"
            ? window.innerHeight / 2
            : window.innerHeight;
        if (
          BotUI.botTextKioskElement &&
          BotUI.botTextKioskElement.scrollHeight > windowHeight
        ) {
          const backgroundElementYTranslate =
            windowHeight - BotUI.botTextKioskElement.scrollHeight;
          BotUI.botTextKioskElement.style.transition =
            "transform " +
            -backgroundElementYTranslate / scrollSpeed +
            "s linear " +
            scrollDelay +
            "s";
          BotUI.botTextKioskElement.style.transform =
            "translateY(" + backgroundElementYTranslate + "px)";
        }
      }, BotUI.settings.animationSpeed + 5);
    }
    if (image !== undefined && image !== null) {
      botUI.setImage(image, nodeId);
    }
    if (
      background !== undefined &&
      background !== null &&
      background !== botBackground
    ) {
      botBackground = background;
      if (settings.avatarURL) {
        botUI.sendRTCData({ Background: background });
      } else {
        if (background.startsWith("#")) {
          botUI.setBackgroundColor(background);
        } else {
          botUI.setBackgroundImage(background);
        }
      }
    }
  };

  stateHandler = (section, status) => {
    if (section === "SOP" || section === "QUESTION") {
      if (status === undefined || status === "SLEEPING") {
        botUI.removeOverlay();
        run();
      }
    }
  };

  defaultCallback.addVideo = (url, callback) => {
    botUI.setVideo(url, callback);
  };

  defaultCallback.addLogs = (logs) => {
    logs.forEach((l) => {
      if (
        botUI.getSettings().suggestionMode === suggestionModes.ALTERNATIVE &&
        l.text.startsWith("Flow")
      ) {
        const regex = /UserInput#(-\d+)/g;
        let lastMatch;

        for (const match of l.text.matchAll(regex)) {
          lastMatch = match[1];
        }
        latestUserInputID = lastMatch;
      }
      console.log(l.text);
    });
  };

  defaultCallback.onError = (error) => {
    console.log(error);
    Sentry.captureException(error.message);
  };

  defaultCallback.onEnd = () => {
    botUI.setBotText();
    botUI.setUserText();
    botUI.setInputAudio(null);
    botUI.setImage(null);
    addPlayButton(botUI);
    botUI.sendRTCData({ Expression: { Name: "neutral" } });
    if (bot.sessionEnded) {
      initBot();
    }
  };

  function titleAndContext(tags, content) {
    const h1 = (tags.h1_b = tags.h1_b.split(" |"));
    const h2 = (tags.h2_b = tags.h2_b.split(" |"));
    const h3 = (tags.h3_b = tags.h3_b.split(" |"));
    h1.forEach((e, i) => {
      if (e === "") h1.splice(i, 1);
    });
    h2.forEach((e, i) => {
      if (e === "") h2.splice(i, 1);
    });
    h3.forEach((e, i) => {
      if (e === "") h3.splice(i, 1);
    });

    let title;
    let secondary;
    if (h1.length > 1) {
      title = h1[0];
    } else if (h2.length > 0) {
      title = h2[0];
      h2.shift();
    } else if (h3.length > 0) {
      title = h3[0];
      h3.shift();
    } else {
      title = content.slice(0, 10);
      secondary = content.slice(10, 20);
      return { title, secondary };
    }

    if (h2.length > 0) {
      secondary = h2.join("\n");
    } else if (h3.length > 0) {
      secondary = h3.join("\n");
    } else {
      secondary = content.slice(0, 20);
    }
    return { title, secondary };
  }

  function findSubTags(inputString) {
    const openingTagRegex = /<sub[^>]*>/g;
    const closingTagRegex = /<\/sub>/g;
  
    const openingTags = [];
    let openingTagMatch;
    while ((openingTagMatch = openingTagRegex.exec(inputString)) !== null) {
      openingTags.push({ tag: openingTagMatch[0], index: openingTagMatch.index });
    }
  
    const closingTags = [];
    let closingTagMatch;
    while ((closingTagMatch = closingTagRegex.exec(inputString)) !== null) {
      closingTags.push({ tag: closingTagMatch[0], index: closingTagMatch.index });
    }
  
    return { openingTags, closingTags };
  }

  function limitSearchResult(inputString){
    const charLimit = 800;
    if (inputString.length <= charLimit){
      return inputString;
    }

    const {openingTags, closingTags} = findSubTags(inputString);
    for (let index = 0; index < openingTags.length; index++) {
      const opening = openingTags[index];
      const closing = closingTags[index];
      if (opening.index > charLimit){
        break;
      }else if(opening.index <= charLimit && closing.index > charLimit){
        inputString = inputString.substring(0, opening.index);
        break;
      }
    }

    return inputString.substring(0, charLimit);
  }

  async function handleFlowstormApiCall(results) {
    if (results === undefined) {
      //SERVER ERROR
      bot.handleOnTextInput(`ERROR`, false, false);
      bot.audioInputCallback();
    } else if (results.result.length === 0) {
      //NO PDF FILES FOUND
      bot.handleOnTextInput(`NO_SOLUTION`, false, false);
      bot.audioInputCallback();
    } else {
      //SUCCESS
      if (results.result[0].meta.answer) {
        setAttribute(
          "FAQ_Answer",
          limitSearchResult(results.result[0].meta.answer)
        );
        bot.handleOnTextInput(`SUCCESS`, false, false);
      } else {
        bot.handleOnTextInput(`NOT_FAQ`, false, false);
        results.result.forEach((result) => {
          const title = result.meta.name.replaceAll("-", " ");
          const secondary = result.meta.snipet;
          botUI.setSnippet(
            result.meta.pagelink + "#" + result.meta.page_id,
            title,
            secondary
          );
        });
      }
    }
  }

  function handleButtonClick(activeIndex, button, type){
    const index = activeIndex ? activeIndex : 0;
    switch (type) {
      case "URL":
        window.open(button.action[index], '_blank').focus();
        break;
      case "INPUT":
        if (getStatus() === "LISTENING" || getStatus() === "RESPONDING") {
          bot.handleOnTextInput(`#${button.action[index]}`, false, false);
        }  
        break;
      default:
        if (getStatus() === "LISTENING" || getStatus() === "RESPONDING") {
          bot.handleOnTextInput(`#${button.action[index]}`, false, false);
        }  
        break;
      
    }
    buttonInput = false;
  }

  defaultCallback.handleCommand = async (command, code, t) => {
    const payload = JSON.parse(code);
    console.log(payload);
    switch (command) {
      case "#expression":
        botUI.sendRTCData({ Expression: { Name: payload["name"] } });
        break;
      case "#animation":
        botUI.sendRTCData({ Animation: payload["name"] });
        break;
      case "#gesture":
        botUI.sendRTCData({ Animation: payload["name"] });
        break;
      case "#snow":
        payload;
        botUI.sendRTCData({ Snowing: payload["snowing"] });
        break;
      case "#transition":
        botUI.sendRTCData({ Transition: "" });
        break;
      case "#shirt":
        botUI.sendRTCData({ ChangeShirt: payload["state"] });
        break;
      case "#level":
        botUI.sendRTCData({ Level: payload["name"] + "Level" });
        break;
      case "#avatar":
        botUI.sendRTCData({ Character: payload["name"] });
        break;
      case "#walk":
        botUI.sendRTCData({ Walk: payload["action"] });
        break;
      case "#actions":
        const imageDelay = payload.delay_between_images_ms; // Delay between each image displayed
        const buttonType = payload.type;
        if (buttonType === "INPUT" || !buttonType){
          buttonInput = true
        }
        for (const button of payload.tiles) {
          const settings = {
            groupName: payload.title,
            disableGroup: true,
            appSelect: payload.appSelect,
            solutions: payload.solutions,
            buttonType,
            ...button,
          };

          exitButtonMode = (disableGroup = true) => {
            if (disableGroup) {
              botUI.disableButtonGroup(settings, () => {});
            } else {
              const newSettings = { ...settings };
              newSettings.disableGroup = undefined;
              botUI.disableButtonGroup(newSettings, () => {});
            }
          };

          botUI.setButton(settings, (activeIndex) => {handleButtonClick(activeIndex, button, buttonType)});
          bot.audioInputCallback();

          if (imageDelay) {
            await new Promise((r) => setTimeout(r, imageDelay));
          }
        }
        break;
      case "#suggestions":
        if (alternativeReInput) {
          alternativeReInput = false;
          bot.handleOnTextInput(alternativeLatestText, false, false);
          break;
        }
        if (payload.nodes) {
          const suggestionText = [];
          payload.nodes.forEach((node) => {
            suggestionText.push(node.text);
          });
          // Logic is if list view is not true, the default suggestion styles for mobile and web will be used
          botUI.setSuggestion(suggestionText, !botUI.isMobileDevice() || botUI.getSettings().suggestionsListView);
        } else {
          botUI.setSuggestion(payload.suggestions, !botUI.isMobileDevice() || botUI.getSettings().suggestionsListView);
        }
        break;
      case "#media":
        payload.videos.forEach((vid) => {
          botUI.setMedia({ sound: settings.sound, src: vid });
        });
        break;
      case "#options":
        setDialogueIDs([...dialogueIDs, payload.dialogueID], botUI);
        botUI.setDialogueID(payload.dialogueID);
        break;
      case "#exitDialogue":
        setDialogueIDs(dialogueIDs.slice(0, -1), botUI);
        botUI.setDialogueID(dialogueIDs[dialogueIDs.length - 1]);
        break;
      case "#ServerResults":
        console.log("payload: ", payload);
        botUI.toggleLoader(false);
        bot.audioInputCallback();
        handleFlowstormApiCall(payload.result);
        break;
      case "#enterSearch":
        elasticSearchActive = true;
        botUI.toggleSearchIcons(true);
        botUI.removeSuggestions();
        break;
      case "#exitSearch":
        elasticSearchActive = false;
        searchCommandActive = false;
        botUI.toggleSearchIcons(false);
        botUI.toggleElasticSearch(false);
        break;
      case "#loadingOff":
        botUI.toggleLoader(false);
        break;
      default:
        break;
    }
  };

  defaultCallback.getAttributes = () => {
    const attributes = botInitializer.getAttributes();
    botInitializer.resetAttributes();
    const newAttributes = getAttributesCallback(attributes);
    return newAttributes;
  };

  const attributeList = {};
  function getAttributesCallback(attributes) {
    Object.keys(attributeList).forEach((atr) => {
      attributes[atr] = attributeList[atr];
    });
    return attributes;
  }

  function setAttribute(atr, value) {
    attributeList[atr] = value;
  }

  defaultCallback.getUUID = () => uuidv4();

  defaultCallback.getVoice = () => undefined;

  defaultCallback.focusOnNode = () => {};

  defaultCallback.play = (sound) => {
    if (sound === "in" || sound === "out") {
      audios[sound].play();
    }
  };

  const sendText = (text) => {
    text = text.trim();
    const status = getStatus();
    if (text === "") return;
    if (status === "LISTENING" || status === "RESPONDING") {
      bot.handleOnTextInput(text, false);
    }
  };

  const changeAudio = (direction) => {
    const status = getStatus();
    if (bot != null) {
      if (direction === "Input") {
        // bot.inAudio(status)
        return;
      } else {
        settings.sound = !settings.sound;
        bot.setOutAudio(settings.sound, status);
      }
    }
  };

  const stop = () => {
    bot.onStopClick();
    if (settings.avatarURL) {
      botUI.sendRTCData({ Stop: "" });
    }
    clientCallback.onEnd();
  };

  const click = () => {
    const status = getStatus();
    if (settings.avatarURL) {
      botUI.sendRTCData({ Stop: "" });
    }
    bot.click(status);
  };

  const run = (minimize = false) => {
    const status = getStatus();
    let pauseOnListening = false;
    bot.setOutAudio(settings.sound, status);
    switch (status) {
      case "SLEEPING":
        if (!minimize) {
          startBot();
        }
        break;
      case "LISTENING":
        if (settings.interactionMode !== "SOP") {
          bot.setInAudio(false, getStatus());
          pauseOnListening = !pauseOnListening;
          changePlayIcon(pauseOnListening, botUI);
        }
        break;
      case "RESPONDING":
        if (settings.interactionMode !== "SOP") {
          bot.pause();
          if (settings.avatarURL) {
            botUI.sendRTCData({ Pause: "true" });
            botUI.removeOverlay();
          }
        }
        break;
      case "PAUSED":
        bot.resume();
        if (settings.avatarURL) {
          botUI.sendRTCData({ Pause: "false" });
          bot.setInAudio(
            false,
            getStatus()
          );
        }
        break;
      case undefined:
        if (BotUI.avatarElement.children[0]) {
          BotUI.avatarElement.children[0].play();
        }
        startBot();
    }
  };

  const handleDataChannelResponse = (response) => {
    switch (response) {
      case "AudioEnded":
        bot.addRecord();
        break;
      case "AnimEnded":
        bot.addRecord();
        break;
      default:
        console.log("Received data channel response", response);
    }
  };

  // let deviceId = '';
  // if (localStorage.getItem('sender') === null) {
  //    deviceId = Math.abs(getRndInteger(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)).toString(36);
  //    localStorage.setItem('sender', deviceId);
  // } else {
  //    deviceId = localStorage.getItem('sender');
  // }

  let deviceId = getCookie("deviceId");
  if (deviceId === null) {
    const { domain } = settings;
    deviceId = Math.abs(
      getRndInteger(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
    ).toString(36);
    setCookie("deviceId", deviceId, domain);
  }

  if (settings.jwtToken) {
    accessToken = settings.jwtToken;
    signupAnonymous(botUI);
  } else {
    getTokens(deviceId, (response) => {
      idToken = response["id"];
      accessToken = response["access"];
      signupAnonymous(botUI);
    });
  }

  botUI.botMessagesCallback = (nodeID, dialogueID) => {
    if (botUI.getButtonInputMode()) {
      exitButtonMode();
    }
    setAttribute("nodeId", nodeID);
    setAttribute("dialogueID", dialogueID);
    botUI.removeSuggestions();
    if (status !== "LISTENING") {
      bot.skipPlayedMessages();
    }
    bot.handleOnTextInput(`#go_to`, false, false);
  };

  botUI.chatInputCallback = (inputValue) => {
    sendText(inputValue);
    if (elasticSearchActive) {
      botUI.toggleLoader(true);
    }
  };

  botUI.collapseCallback = (collapsed) => {
    paused = !paused;
    run();
  };

  botUI.searchElementCallback = () => {
    const status = getStatus();
    if (!searchCommandActive) {
      if (status !== "LISTENING") {
        bot.skipPlayedMessages();
      }
      bot.handleOnTextInput(`#search`, false, false);
      searchCommandActive = true;
      botUI.toggleElasticSearch(true);
    }
  };

  botUI.chatMicrophoneCallback = (inputValue) => changeAudio("Input");

  botUI.chatMuteCallback = (inputValue) => changeAudio("Output");

  botUI.chatPlayCallback = (inputValue) => {
    paused = !paused;
    run();
  };

  botUI.chatRestartCallback = () => {
    console.log("here");
    const state = getStatus();
    botUI.removeSuggestions();

    if (botUI.getSettings().search) {
      // Restart elastic search functions
      elasticSearchActive = false;
      searchCommandActive = false;
      botUI.toggleSearchIcons(false);
      botUI.toggleElasticSearch(false);
      botUI.toggleLoader(false);
    }

    if (state === "SLEEPING" || state === undefined) {
      run();
      bot.audioInputCallback();
    } else {
      stop();
      setTimeout(() => {
        botUI.removeAllMessages();
        run();
      }, 750);
    }
  };

  function removeNodesAfterSuggestion(self) {
    const selfParent = self.parentElement.parentElement; // Need to go 2 steps out to get the real parent
    const parent = selfParent.parentElement;
    const index = Array.from(parent.children).indexOf(selfParent);
    const children = parent.children;
    while (children.length > index + 1) {
      parent.removeChild(children[index + 1]);
    }
  }

  botUI.suggestionsCallback = (e) => {
    const self = e.target;
    const status = getStatus();

    if (status !== "LISTENING") {
      bot.skipPlayedMessages();
    }

    if (botUI.getSettings().suggestionMode === suggestionModes.ALTERNATIVE && (status !== undefined || status !== "SLEEPING")) {
      if (self.classList.contains("active")) {
        return;
      } else {
        if (botUI.getButtonInputMode()) {
          exitButtonMode(false);
        }
        const parent = self.parentElement;
        const activeElems = parent.getElementsByClassName("active");
        if (activeElems.length > 0) {
          // Active class exists, initiate #go_to
          console.log("here");
          console.log(activeElems);
          activeElems[0].classList.remove("active");
          self.classList.add("active");
          removeNodesAfterSuggestion(self);
          const nodeID = self.parentElement.getAttribute("nodeId");
          const dialogueID = self.parentElement.getAttribute("dialogueID");
          setAttribute("nodeId", parseInt(nodeID));
          setAttribute("dialogueID", dialogueID);
          bot.handleOnTextInput("#go_to", false, false);
          alternativeReInput = true;
          alternativeLatestText = self.innerHTML;
        } else {
          // First time clicking this group of suggestions.
          self.classList.add("active");
          self.parentElement.setAttribute("nodeId", latestUserInputID);
          self.parentElement.setAttribute(
            "dialogueID",
            dialogueIDs[dialogueIDs.length - 1]
          );
          bot.handleOnTextInput(self.innerHTML, false, false);
        }
      }
    } else {
      bot.handleOnTextInput(self.innerHTML, false);
      botUI.removeSuggestions();
    }
  };

  botUI.setModeCallback = (mode) => {
    if (mode === "voice") {
      bot.setInAudio(true, getStatus());
      if (getStatus() === "LISTENING") {
        bot.inAudio("LISTENING");
        botUI.addOverlay();
      }
    } else if (mode === "sop") {
      bot.setInAudio(false, getStatus());
    }
  };

  botUI.chatMicCallback = (inputValue) => {
    if (
      settings.interactionMode === "SOP" ||
      settings.interactionMode === "GUIDE"
    ) {
      const status = getStatus();
      if (status === "SLEEPING" || status === undefined) {
        run();
      } else {
        stop();
      }
    } else {
      botUI.chatMicrophoneCallback();
    }
  };
  botUI.chatMicCallback = (inputValue) => {
    if (getStatus() === "LISTENING") {
      settings.inputAudio = !settings.inputAudio;
      bot.setInAudio(settings.inputAudio, getStatus());
      if (settings.inputAudio) botUI.addOverlay();
    }
  };

  botUI.getSettings = () => {
    return settings;
  };

  botUI.chatStopCallback = (inputValue) => stop();

  botUI.chatTextInputElementCallback = (e) => {
    const status = getStatus();
    const settings = botUI.getSettings();
    const search = settings.search;
    const charLimitSetting = settings.elasticSearchCharLimit;

    // limit the amount of char if limit is set
    if (search && charLimitSetting.limitOn && elasticSearchActive){
      if (e.target.value.length > charLimitSetting.charLimit){
        botUI.addWarning("Character limit reached", 1300)
        e.target.value = e.target.value.substring(0, charLimitSetting.charLimit);
      }
    }

    if (status === "LISTENING") {
      bot.closeAudioStream("User started typing", true);
    } else if (status === "RESPONDING") {
      bot.startTyping();
    }
  };

  botUI.dataChannelMessageCallback = (dataArray) => {
    const messageType = dataArray[0];
    switch (messageType) {
      case 1:
        const messageString = new TextDecoder("utf-16").decode(
          dataArray.slice(1)
        );
        handleDataChannelResponse(messageString);
        break;
    }
  };

  botUI.collapsableTriggerCallback = (collapsed) => {
    const status = getStatus();
    if (
      (status === undefined || status === "SLEEPING") &&
      !collapsed &&
      (section === "SOP" || section === "QUESTION")
    ) {
      run(true);
    }
  };

  const clientCallback = {
    ...defaultCallback,
    ...settings.callback,
  };

  bot = Bot(
    settings.coreURL,
    deviceId, // sender
    settings.autoStart, // autostart
    clientCallback,
    false, // called from Kotlin
    settings.ttsFileType
  );

  if (settings.avatarURL) {
    bot.playAudio = (audio) => {
      if (audio === null) {
        bot.addRecord();
      } else if (audio.match(regex)) {
        botUI.sendRTCData({ PCM: audio });
      } else {
        const newAudio = new Audio(audio);
        newAudio.onended = bot.addRecord;
        newAudio.play();
      }
    };
  }

  bot.stop = stop;

  return bot;
};

const getStartAction = () => {
  let startAction = botInitializer.getMessage();
  const urlParams = new URLSearchParams(window.location.search);
  if (startAction) {
    botInitializer.setMessage(botInitializer.defaultStartMessage);
    return startAction;
  } else if (window.location.hash) {
    return window.location.hash;
  } else if (urlParams.get("text") !== null) {
    return `#${urlParams.get("text")}`;
  } else {
    return "#intro";
  }
};

const getStatus = () => {
  let { status = undefined } = botState;
  return status;
};

const startBot = () => {
  const status = getStatus();
  if (status === undefined || status === "SLEEPING") {
    bot.handleOnTextInput(getStartAction(), false);
  }
};

const autoStartBot = (startMessage, attributes) => {
  botInitializer.addAttributes(attributes);
  botInitializer.setMessage(startMessage);
  startBot();
};

const initBot = () => {
  if (bot) {
    bot.init(
      botKey,
      "en",
      true,
      true,
      getStartAction(),
      undefined,
      undefined,
      undefined,
      accessToken
    );
  } else {
    Sentry.captureMessage("Bot is undefined");
    console.error(
      "There was an unexpected error with the bot. Please try reloading the page."
    );
  }
};

const getTokens = function (deviceId, callback) {
  sendRequest(studioUrl + "/auth/" + deviceId, "GET", callback);
};

const signupAnonymous = function (botUI) {
  sendRequest(
    studioUrl + "/user/signupAnonymous",
    "POST",
    () => {
      getTermsByApplication(botKey, botUI);
    },
    accessToken,
    null,
    () => {
      getTermsByApplication(botKey, botUI);
    }
  );
};

const getTermsByApplication = (appKey, botUI) => {
  sendRequest(
    studioUrl + "/terms/application/" + appKey,
    "GET",
    (response) => {
      if (response === null) {
        addPlayButton(botUI);
      } else {
        termsId = response["_id"];
        getConsent(botUI);
      }
    },
    accessToken,
    null,
    () => {
      addPlayButton(botUI);
    }
  );
};

const addPlayButton = (botUI) => {
  if (textInputEnabled) {
    botUI.setTextInputEnabled(textInputEnabled);
    changePlayIcon(true, botUI);
  } else {
    BotUI.element.style.setProperty(
      "--bot-ui-chat-input-height",
      BotUI.element.style.getPropertyValue("--bot-ui-chat-pcm-height")
    );
    const playHtml = getContentAsHtml(playTemplate);
    botElement.append(playHtml);
    botElement.querySelector("[data-play]").onclick = (e) => {
      if (mobileCheck() && BotUI.settings.fullScreen) {
        if (document.body.requestFullScreen) {
          document.body.requestFullScreen();
        } else if (document.body.mozRequestFullScreen) {
          document.body.mozRequestFullScreen();
        } else if (document.body.webkitRequestFullScreen) {
          document.body.webkitRequestFullScreen();
        }
      }
      if (BotUI.avatarElement.children[0]) {
        BotUI.avatarElement.children[0].play();
      }
      startBot();
      e.target.remove();
    };
    // botElement.querySelector('[data-play]').style.display='block';
    checkBotUIOverlays(botElement);
  }
};

const getConsent = (botUI) => {
  const modalHtml = getContentAsHtml(modalTemplate);
  botElement.append(modalHtml);
  modal = modalHtml.querySelector("[data-fs-bot-modal]");
  const removeModalAndAllowPlay = () => {
    modal.remove();
    modal = null;
    addPlayButton(botUI);
  };
  modalHtml.querySelector("[data-fs-bot-consent-button]").onclick = () => {
    sendConsent(() => {
      removeModalAndAllowPlay();
    });
  };
  sendRequest(
    studioUrl + "/terms/" + termsId + "/consent",
    "GET",
    (response) => {
      // Found consent
      removeModalAndAllowPlay();
    },
    accessToken,
    null,
    () => {
      // Not found consent
      sendRequest(
        studioUrl + "/terms/" + termsId,
        "GET",
        (response) => {
          const modalContentElement = modal.querySelector(
            "[data-fs-bot-modal-consent]"
          );
          const html = converter.makeHtml(response["text"]);
          modalContentElement.innerHTML = html;
          checkBotUIOverlays(botElement);
        },
        accessToken
      );
    }
  );
};

const sendConsent = (callback) => {
  sendRequest(
    studioUrl + "/terms/" + termsId + "/consent",
    "POST",
    callback,
    accessToken
  );
};

const mobileCheck = () => {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

const changePlayIcon = (showPlayIcon, botUI) => {
  if (showPlayIcon) {
    botUI.setPlayIcon("icon--content--play");
  } else {
    botUI.setPlayIcon("icon--content--pause");
  }
};
