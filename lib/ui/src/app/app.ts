import * as Hls from 'hls.js';
import clamp from 'ramda/es/clamp';
import defaultTo from 'ramda/es/defaultTo';
import FastAverageColor from 'fast-average-color';
import isNil from 'ramda/es/isNil';
import is from 'ramda/es/is';
import isEmpty from 'ramda/es/isEmpty';
import merge from 'ramda/es/merge';
import times from 'ramda/es/times';

import {sopSuggestionContainer} from "./templates/sop-suggestion-structure.template"

import '../assets/main.scss';
import '../assets/screencapture.png';

import {
    sopBaseStructureTemplate,
    baseStructureTemplate,
    chatMessageStructureTemplate,
    kioskMessageStructureTemplate,
} from './templates';
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
} from './model/bot-ui.model';
import {
    debounce,
    getContentAsHtml,
    includesToDefault,
    injectCss,
    isValidUrl,
    scrollTo as scrollToAnimated,
    wsConnection,
} from './utils';

console.log(window.innerWidth);

const defaults: Settings = {
    animationSpeed: 500,
    goTo: true,
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
    keyboardIcon: 'icon--content--keyboard',
    muteIcon: 'icon--content--volume-mute',
    volumeIcon: 'icon--content--volume',
    upSop: 'icon--content--upSop',
    downSop: 'icon--content--downSop',
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
    inputMode: "sop",
    standardQuestionMode: "text",
    inputAudio: true,
    outputAudio: true,
    botMessageTextOutlineColor: 'rgba(0, 0, 0, .5)',
    reverseAvatarOrder: false,
    collapsable: false,
    collapsed: false,
    sectionActive: 0,
    sections: ["SOP", "QUESTION", "SOLUTIONS", "PDF", "FEEDBACK", "LOGIN", "INPUTSELECT"],
    interactionMode: "SOP",
    sound: true,
};

const fullScreenWidgetWidth = '100vw';
const fullScreenWidgetHeight = '100vh';
const minAnimationParticles = 0;
const maxAnimationParticles = 20;
const chatHeight = '80px';
const sopHeight = '110px';
const chatPadding = '4';
const sopPadding = '6';
const disabledHeight = '0px';
const avatarMaxHeightRatio = {
    [GUIMode.CHAT]: 2 / 3,
    [GUIMode.KIOSK]: 1,
};
const icons = ['mic',
    'blocked',
    'volume',
    'speaking-head',
    'arrow-up',
    'play',
    'pause',
    'stop',
    'keyboard',
    'volume-mute',
    'menu',
    'mic2',
    'back',
    'downSop',
    'upSop',
    'undo',
    ];
const avatarTextOverlapRatio = 1 / 4;
const micActiveClass = "icon-sop--mic--active";


class BotUI  {
    private static element: HTMLElement;
    private static settings: Settings;
    private static orientation: OrientationEnum;

    private static rootElement: HTMLElement;
    private static avatarElement: HTMLElement;
    private static imageKioskElement: HTMLElement;
    private static userTextKioskElement: HTMLElement;
    private static botTextKioskElement: HTMLElement
    private static messagesElement: HTMLElement
    private static userPcmElement: HTMLElement;
    private static botPcmElement: HTMLElement;
    private static backgroundElement: HTMLElement;
    private static chatInputElement: HTMLInputElement;
    private static chatTextInputElement: HTMLElement;
    private static chatElement: HTMLElement;
    private static chatInputMuteElement: HTMLElement;
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
    private static pdfSelect: HTMLElement;
    private static inputTakers: HTMLElement;
    private static askAnother: HTMLElement;
    private static continue: HTMLElement;
    private static solutionsControllers: HTMLElement;
    private static pdfViewer: HTMLObjectElement;
    private static pdfViewerContainer: HTMLElement;
    private static loadingSpinner: HTMLElement;
    private static botLogin: HTMLElement;
    private static botLoginPopup: HTMLElement;

    private static isChatEnabled: boolean = true;
    private static isMicrophoneEnabled: boolean = true;

    private static avatarWs: WebSocket;
    private static avatarConnection: RTCPeerConnection;
    private static avatarDataChannel: RTCDataChannel;

    constructor(element: string, settings: Settings = defaults) {
        BotUI.element = document.getElementById(element);
        defaults.textInputEnabled = settings.guiMode === GUIMode.CHAT;
        settings.guiMode = includesToDefault(settings.guiMode, Object.values(GUIMode), GUIMode.KIOSK);
        BotUI.settings = merge(defaults, settings);
        BotUI.settings.fullScreen = BotUI.settings.collapsable ? false : BotUI.settings.fullScreen;
        BotUI.rootElement = document.documentElement;
        if (!BotUI.element) {
            return;
        }
        BotUI.element.style.setProperty('--bot-ui-animation-speed', `${BotUI.settings.animationSpeed}ms`);
        BotUI.element.style.setProperty('--bot-ui-background-url-blur', `${BotUI.settings.backgroundImageBlur}px`);
        BotUI.element.style.setProperty('--bot-ui-background-url', `url("${BotUI.settings.backgroundImage}")`);
        BotUI.element.style.setProperty('--bot-ui-background-color', `${BotUI.settings.backgroundColor}`);
        BotUI.element.style.setProperty('--bot-ui-message-color-bot', `${BotUI.settings.botMessageTextColor}`);
        BotUI.element.style.setProperty('--bot-ui-message-color-user', `${BotUI.settings.userMessageTextColor}`);
        BotUI.element.style.setProperty('--bot-ui-message-background-bot', `${BotUI.settings.botMessageBackgroundColor}`);
        BotUI.element.style.setProperty('--bot-ui-message-background-user', `${BotUI.settings.userMessageBackgroundColor}`);
        BotUI.element.style.setProperty('--bot-ui-chat-pcm-height', chatHeight);
        BotUI.orientation = OrientationEnum.LANDSCAPE;
        if (BotUI.settings.interactionMode == "SOP" || BotUI.settings.interactionMode == "GUIDE"){
            BotUI.element.innerHTML = sopBaseStructureTemplate;
        } else {
            BotUI.element.innerHTML = baseStructureTemplate;
        }
        BotUI.element.setAttribute('data-gui-mode', BotUI.settings.guiMode);
        if (BotUI.settings.fullScreen) {
            BotUI.element.setAttribute('data-fullscreen', '');
        }
        BotUI.reverseAvatarOrderAction();
        BotUI.imageKioskElement = BotUI.element.querySelector('[data-image]');
        BotUI.userPcmElement = BotUI.element.querySelector('[data-user-pcm]');
        BotUI.botPcmElement = BotUI.element.querySelector('[data-bot-pcm]');
        BotUI.messagesElement = BotUI.element.querySelector('[data-messages]');
        BotUI.chatElement = BotUI.element.querySelector('[data-chat-input]');
        BotUI.chatInputElement = BotUI.chatElement.querySelector('input');
        BotUI.chatTextInputElement = BotUI.element.querySelector('[data-chat-input]');
        BotUI.chatInputMuteElement = BotUI.element.querySelector('[data-chat-input-mute]');
        BotUI.chatInputMicrophoneElement = BotUI.element.querySelector('[data-chat-input-microphone]');
        BotUI.chatInputMicElement = BotUI.element.querySelector('[data-chat-input-mic]');
        BotUI.chatInputArrowElement = BotUI.element.querySelector('[data-chat-input-arrow]');
        BotUI.avatarElement = BotUI.element.querySelector('[data-avatar]');
        BotUI.chatInputMenuElement = BotUI.element.querySelector('[data-chat-input-menu]');
        BotUI.chatInputSettingsElement = BotUI.element.querySelector('[data-chat-input-settings]');
        BotUI.chatInputControlsElement = BotUI.element.querySelector('[data-chat-input-controls]');
        BotUI.chatInputPlayElement = BotUI.element.querySelector('[data-chat-input-play]');
        BotUI.chatInputStopElement = BotUI.element.querySelector('[data-chat-input-stop]');
        BotUI.collapsableTriggerElement = BotUI.element.querySelector('[data-trigger]');
        BotUI.botWrapperElement = BotUI.element.querySelector('[data-wrapper]');
        BotUI.chatInputKeyboardElement = BotUI.element.querySelector('[data-chat-input-keyboard]');
        BotUI.soundInput = BotUI.element.querySelector('[data-sound-input-wrap]');
        BotUI.textInput = BotUI.element.querySelector('[data-text-input-wrap');
        BotUI.controllerWrapper = BotUI.element.querySelector('[data-chat-input-controllers]');
        BotUI.chatInputBackElement = BotUI.element.querySelector('[data-chat-input-back]');
        BotUI.sopSection = BotUI.element.querySelector('[data-chat-sop]');
        BotUI.questionSection = BotUI.element.querySelector('[data-chat-ask]');
        BotUI.questionSOPButton = BotUI.element.querySelector('[data-sop-question]');
        BotUI.downSOPButton = BotUI.element.querySelector('[data-sop-next]');
        BotUI.sopName = BotUI.element.querySelector('[data-sop-header]');
        BotUI.pdfSelect = BotUI.element.querySelector('[data-chat-pdf]');
        BotUI.inputTakers = BotUI.element.querySelector('[data-input-takers]');
        BotUI.askAnother = BotUI.element.querySelector('[data-pdf-question-another]');
        BotUI.continue = BotUI.element.querySelector('[data-pdf-question-continue]');
        BotUI.solutionsControllers = BotUI.element.querySelector('[data-solutions-inputs]');
        BotUI.pdfViewer = BotUI.element.querySelector("[pdf-viewer]");
        BotUI.pdfViewerContainer = BotUI.element.querySelector("[object-container]");
        BotUI.loadingSpinner = BotUI.element.querySelector("[loader]");
        BotUI.botLogin = BotUI.element.querySelector("[bot-login]");
        BotUI.botLoginPopup = BotUI.element.querySelector("[bot-loginPopup]");

        if (BotUI.settings.collapsable) {
            BotUI.setCollapsableUIHeight();
            BotUI.collapsableTriggerElement.addEventListener('click', (e) => {
                this.changeCollapsedMode();
            })
        } else {
            BotUI.collapsableTriggerElement.parentNode.removeChild(BotUI.collapsableTriggerElement);
        }

        if (!BotUI.settings.customIcons) {
            icons.forEach(icon => {
                    const suffix = BotUI.settings.interactionMode == 'SOP' || BotUI.settings.interactionMode == "GUIDE" ? '-sop' : '';
                    const element = document.querySelector('.icon' + suffix + '--' + icon);
                    if (element !== null){
                        element.classList.add('icon--content--' + icon)
                    }
                }
            );
        }

        if (BotUI.settings.interactionMode === "SOP"){
            BotUI.settings.sections = ["SOP", "QUESTION", "SOLUTIONS", "PDF", "FEEDBACK", "LOGIN", "INPUTSELECT"];
        }else if (BotUI.settings.interactionMode === "GUIDE"){
            BotUI.settings.sections = ["QUESTION", "SOLUTIONS", "PDF", "FEEDBACK", "LOGIN", "INPUTSELECT"];
        }

        this.setSection(BotUI.settings.sections[0]);

        if (BotUI.settings.guiMode === GUIMode.KIOSK) {
            BotUI.messagesElement.innerHTML = kioskMessageStructureTemplate;
            BotUI.userTextKioskElement = BotUI.element.querySelector('[data-user-message] span');
            BotUI.botTextKioskElement = BotUI.element.querySelector('[data-bot-message] span');
        }
        BotUI.isChatEnabled = BotUI.settings.outputAudio;
        BotUI.isMicrophoneEnabled = BotUI.settings.inputAudio;
        if (BotUI.settings.interactionMode !== "SOP" && BotUI.settings.interactionMode != "GUIDE") {
            if (BotUI.isChatEnabled) {
                BotUI.chatInputMuteElement.classList.remove('icon--light');
            } else {
                BotUI.chatInputMuteElement.classList.add('icon--light');
            }
            if (BotUI.isMicrophoneEnabled) {
                BotUI.chatInputMicElement.classList.add('icon--light');
            } else {
                BotUI.chatInputMicElement.classList.remove('icon--light');
            }
        }else{
            if (BotUI.settings.sound) {
                BotUI.chatInputMuteElement.classList.remove('icon--light');
            } else {
                BotUI.chatInputMuteElement.classList.add('icon--light');
            }
        }
        BotUI.backgroundElement = BotUI.element.querySelector('[data-background]');

        if (!BotUI.settings.collapsable) {
            const {width, height} = BotUI.settings.widgetSize;
            BotUI.element.style.width = defaultTo(fullScreenWidgetWidth, !BotUI.settings.fullScreen && width ? width : null);
            BotUI.element.style.height = defaultTo(fullScreenWidgetHeight, !BotUI.settings.fullScreen && height ? height : null);
        }

        BotUI.settings.backgroundAdvancedAnimationParticlesCount = clamp(
            minAnimationParticles,
            maxAnimationParticles,
            BotUI.settings.backgroundAdvancedAnimationParticlesCount,
        );
        BotUI.backgroundElement.innerHTML = '';
        if (!!BotUI.settings.backgroundSimpleAnimation) {
            // BotUI.backgroundElement.setAttribute('data-background-animation', '');
        }
        times(() => {
            BotUI.backgroundElement.appendChild(document.createElement('span'));
        }, BotUI.settings.backgroundAdvancedAnimationParticlesCount);

        window.addEventListener('resize', debounce((e) => {
            const rect: DOMRect = BotUI.element.getBoundingClientRect();
            const orientation: OrientationEnum = (rect.width > rect.height) ? OrientationEnum.LANDSCAPE : OrientationEnum.PORTRAIT;
            this.setOrientation(orientation);
            BotUI.element.setAttribute('data-orientation', orientation);
            BotUI.handleBotUiHeights();
        }));

        window.addEventListener('load', (e) => {
            const rect: DOMRect = BotUI.element.getBoundingClientRect();
            const orientation: OrientationEnum = (rect.width > rect.height) ? OrientationEnum.LANDSCAPE : OrientationEnum.PORTRAIT;
            this.setOrientation(orientation);
        });

        BotUI.chatInputElement.onkeyup = (e) => {
            if (e.keyCode === 13) {
                BotUI.getInputValue((BotUI.chatInputElement as HTMLInputElement).value, this.chatInputCallback);
                (BotUI.chatInputElement as HTMLInputElement).value = '';
                BotUI.changeClasses("icon--arrow-up--visible", "icon--arrow-up--hidden", BotUI.chatInputArrowElement);
            }else if (BotUI.chatInputElement.value.length > 0){
                if(BotUI.chatInputArrowElement.classList.contains("icon--arrow-up--hidden")){
                    BotUI.changeClasses("icon--arrow-up--hidden", "icon--arrow-up--visible", BotUI.chatInputArrowElement);
                }
            }else{
                BotUI.changeClasses("icon--arrow-up--visible", "icon--arrow-up--hidden", BotUI.chatInputArrowElement);
            }
        }

        BotUI.chatInputMuteElement.onclick = (e) => {
            BotUI.settings.sound = !BotUI.settings.sound;
            if (BotUI.settings.sound) {
                BotUI.chatInputMuteElement.classList.remove('icon--light');
                BotUI.chatInputMuteElement.classList.remove("icon--content--volume-mute");
                BotUI.chatInputMuteElement.classList.add("icon--content--volume");
            } else {
                BotUI.chatInputMuteElement.classList.add('icon--light');
                BotUI.chatInputMuteElement.classList.add("icon--content--volume-mute");
                BotUI.chatInputMuteElement.classList.remove("icon--content--volume");
            }
            BotUI.getChatMute(BotUI.settings.sound, this.chatMuteCallback);
        }

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

        if (BotUI.chatInputPlayElement){
            BotUI.chatInputPlayElement.onclick = (e) => {
                this.chatPlayCallback();
            }
        }

        BotUI.chatInputMicElement.onclick = (e) => {
            if (settings.interactionMode !== 'SOP' && BotUI.settings.interactionMode != "GUIDE"){
                BotUI.isMicrophoneEnabled = !BotUI.isMicrophoneEnabled;
                BotUI._setMicrophone();
            }
            this.chatMicCallback()
        }

        BotUI.botLogin.onclick = async (e) => {
            await this.loginCallback();
        }

        BotUI.chatInputStopElement.onclick = (e) => {
            this.chatStopCallback()
        }


        BotUI.chatTextInputElement.oninput = (e) => {
            this.chatTextInputElementCallback(e);
        }

        if (BotUI.settings.sound) {
            BotUI.chatInputMuteElement.classList.remove('icon--light');
            BotUI.chatInputMuteElement.classList.remove("icon--content--volume-mute");
            BotUI.chatInputMuteElement.classList.add("icon--content--volume");
        } else {
            BotUI.chatInputMuteElement.classList.add('icon--light');
            BotUI.chatInputMuteElement.classList.add("icon--content--volume-mute");
            BotUI.chatInputMuteElement.classList.remove("icon--content--volume");
        }

        if (BotUI.settings.interactionMode == "SOP" || BotUI.settings.interactionMode == "GUIDE") {
            BotUI.chatInputKeyboardElement.onclick = (e) => {
                this.chatKeyboardCallback();
            }

            BotUI.chatInputArrowElement.onclick = (e) => {
                const inputString = (BotUI.chatInputElement as HTMLInputElement).value
                if (inputString !== ''){
                    BotUI.changeClasses("icon--arrow-up--visible", "icon--arrow-up--hidden", BotUI.chatInputArrowElement);
                    BotUI.getInputValue(inputString, this.chatInputCallback);
                    (BotUI.chatInputElement as HTMLInputElement).value = '';
                } else {
                    this.chatArrowCallback();
                }
            }

            BotUI.questionSOPButton.onclick = (e) => {
                this.chatSopQuestionCallback();
            }

            BotUI.downSOPButton.onclick = (e) => {
                this.chatSopNextCallback()
            }

            BotUI.chatInputBackElement.onclick = (e) => {
                this.chatBackCallback(e);
            }

            BotUI.askAnother.onclick = (e) => {
                this.oldMessagesSection("pdfFiles");
                this.setSection("QUESTION");
                BotUI.inputTakers.classList.remove("hidden");
                this.askAnotherCallback();
            }

            BotUI.continue.onclick = (e) => {
                this.oldMessagesSection("pdfFiles");
                BotUI.inputTakers.classList.remove("hidden");
                this.setSection("SOP");
                this.continueCallback();
            }

            
        }
        BotUI.setBackground({});
    }

    public setMicIcon(active){
        if (BotUI.settings.interactionMode == "SOP" || BotUI.settings.interactionMode == "GUIDE"){

            if (active){
                BotUI.chatInputMicElement.classList.add(micActiveClass, "icon--large");
                BotUI.chatInputMicElement.classList.remove("icon--largest");
            }else{
                BotUI.chatInputMicElement.classList.remove(micActiveClass, "icon--large");
                BotUI.chatInputMicElement.classList.add("icon--largest");
            }
        } else {
            if (!active) {
                BotUI.chatInputMuteElement.classList.add('icon--light');
            } else {
                BotUI.chatInputMuteElement.classList.remove('icon--light');
            }
        }
    }

    public setControls = (visible: boolean) => {
        if (visible) {
            BotUI.chatTextInputElement.removeAttribute('no-controls')
        } else {
            BotUI.chatTextInputElement.setAttribute('no-controls', '')
        }
    }

    public expand = () => {
        if (BotUI.settings.collapsable && BotUI.settings.collapsed) {
            this.changeCollapsedMode();
        }
    }

    public getSection(){
        return BotUI.settings.sections[BotUI.settings.sectionActive];
    }

    public setSection(section: string = "SOP"){
        if (BotUI.settings.interactionMode == 'SOP' || BotUI.settings.interactionMode == "GUIDE"){
            const index = BotUI.settings.sections.indexOf(section);
            BotUI.settings.sectionActive = index;
            this.sectionChangeCallback(section);
            this.setSectionUI(section);
        }
    }
    
    public setSectionByIndex(index: number){
        const section = BotUI.settings.sections[index];
        this.setSection(section);
    }
    public nextSection(){
        if (BotUI.settings.sectionActive < BotUI.settings.sections.length - 1){
            BotUI.settings.sectionActive += 1;
            const nextSect = BotUI.settings.sections[BotUI.settings.sectionActive]
            this.setSection(nextSect);
        }
    }

    public previousSection(){
        if (BotUI.settings.sectionActive >= 0){
            BotUI.settings.sectionActive -= 1;
            const nextSect = BotUI.settings.sections[BotUI.settings.sectionActive]
            this.setSection(nextSect);
        }
    }

    public setModeCallback(mode: string){}

    public setInputMode(mode: string){

        if(mode === 'text'){
            this.removeOverlay();
            sessionStorage.setItem("INPUTSELECT", mode);
            BotUI.chatElement.classList.remove("chat-input--hidden");
            BotUI.chatInputKeyboardElement.classList.add(BotUI.settings.micIcon +'2');
            BotUI.chatInputKeyboardElement.classList.remove(BotUI.settings.keyboardIcon);
            BotUI.soundInput.setAttribute("style", "display:none;");
            BotUI.textInput.setAttribute("style", "display:block;");
            BotUI.chatInputBackElement.classList.add("text-mode");
            // BotUI.controllerWrapper.classList.add("text-mode");
            BotUI.settings.standardQuestionMode = mode;
            BotUI.settings.inputMode = mode;

        }else if(mode === 'voice'){
            sessionStorage.setItem("INPUTSELECT", mode);
            BotUI.chatElement.classList.remove("chat-input--hidden");
            BotUI.chatInputKeyboardElement.classList.remove(BotUI.settings.micIcon +'2');
            BotUI.chatInputKeyboardElement.classList.add(BotUI.settings.keyboardIcon);
            BotUI.soundInput.setAttribute("style", "display:block;");
            BotUI.textInput.setAttribute("style", "display:none;");
            BotUI.chatInputBackElement.classList.remove("text-mode");
            BotUI.controllerWrapper.classList.remove("text-mode");
            BotUI.chatInputSettingsElement.classList.add("text-mode");
            BotUI.settings.standardQuestionMode = mode;
            BotUI.settings.inputMode = mode;

        }else if (mode === "button"){
            BotUI.inputTakers.classList.add("hidden");
            BotUI.settings.inputMode = mode;
        }else if(mode === "sop"){
            this.removeOverlay();
            BotUI.chatElement.classList.remove("chat-input--hidden");
            BotUI.settings.inputMode = mode;
        }

        this.setModeCallback(mode);
    }

    public getInputMode(){
        return BotUI.settings.inputMode;
    }

    public removeAllMessages(){
        BotUI.messagesElement.textContent = "";
    }

    public loginPop(){
        BotUI.botLoginPopup.classList.remove("hidden");
    }

    private changeCollapsedMode = () => {
        BotUI.settings.collapsed = !BotUI.settings.collapsed;
        BotUI.setCollapsableUIHeight();
        this.collapsableTriggerCallback(BotUI.settings.collapsed);
        const rect: DOMRect = BotUI.element.getBoundingClientRect();
        const orientation: OrientationEnum = (rect.width > rect.height) ? OrientationEnum.LANDSCAPE : OrientationEnum.PORTRAIT;
        this.setOrientation(orientation);
    }

    private removeAllProperties(){
        BotUI.pdfViewerContainer.classList.add("hidden");
        BotUI.pdfSelect.classList.add("pdf-section--hidden");
        BotUI.sopSection.classList.add("sop-section--hidden");
        BotUI.questionSection.classList.add("ask-section--hidden");
        BotUI.solutionsControllers.classList.add("pdf-section--hidden");
        BotUI.messagesElement.classList.remove("hidden");
        BotUI.chatElement.classList.remove("chat-input--hidden");
        BotUI.botLogin.classList.add("hidden");

        BotUI.chatTextInputElement.style.setProperty("--bot-ui-chat-input-height", chatHeight);
        BotUI.messagesElement.style.setProperty("--bot-ui-chat-input-height", chatHeight);
        BotUI.chatTextInputElement.style.setProperty('--chat-padding-amount', chatPadding);
    }

    private inputButtonsHeightSet(){
        BotUI.chatTextInputElement.style.setProperty("--bot-ui-chat-input-height", sopHeight);
        BotUI.chatTextInputElement.style.setProperty('--chat-padding-amount', sopPadding);
        BotUI.messagesElement.style.setProperty("--bot-ui-chat-input-height", sopHeight);
    }

    private newMessageSection(title: string){
        var first = true;
        var element2: HTMLElement;
        for (let index = 0; index < BotUI.messagesElement.children.length; index++) {
            const element = BotUI.messagesElement.children[index] as HTMLElement;
            if(element.getAttribute("data-button-group") === title){
                if (index !== 0 && first){
                    if ((BotUI.messagesElement.children[index] as HTMLElement).tagName === "BUTTON"){
                        element2 = BotUI.messagesElement.children[index - 1] as HTMLElement;
                    }
                    first = false;
                }
            }else {
                element.style.display = "none";
            }
        }
        if (element2){
            element2.style.display = "block";
            element2.setAttribute("data-button-group", title);
        }
    }

    private oldMessagesSection(title: string){
        const elems = document.querySelectorAll(`[data-button-group=${title}]`);
        elems.forEach(el => {
            el.remove();
        })
        for (let index = 0; index < BotUI.messagesElement.children.length; index++) {
            
            (BotUI.messagesElement.children[index] as HTMLElement).style.display = "block";
        }
    }

    private setSectionUI(section: string){
        this.removeAllProperties();
        console.log(section);
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
                const mode = this.getInputMode()
                var settings = {
                    background: "",
                    oldMode: mode,
                    title: "modeSelect",
                    groupName: "modeSelect",
                    disableGroup: true,
                    text: "Voice Input"
                }
                this.setButton(settings, () => {this.inputModeCallback("voice"); messageElement.textContent = "";});
                this.setButton({...settings, text: "Text Input"},() => {this.inputModeCallback("text"); messageElement.textContent = "";});
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
            case "SOLUTIONS":
                this.inputButtonsHeightSet();
                BotUI.pdfSelect.classList.remove("pdf-section--hidden");
                BotUI.solutionsControllers.classList.remove("pdf-section--hidden");
                BotUI.askAnother.onclick = (e) => {
                    this.setSection("QUESTION");
                    BotUI.inputTakers.classList.remove("hidden");
                    this.oldMessagesSection("pdfFiles");
                    this.askAnotherCallback();
                }
                BotUI.askAnother.innerText = "Ask Another Question";
                break;
            case "PDF":
                this.inputButtonsHeightSet();
                BotUI.messagesElement.classList.add("hidden");
                BotUI.pdfSelect.classList.remove("pdf-section--hidden");
                BotUI.pdfViewerContainer.classList.remove("hidden");
                BotUI.solutionsControllers.classList.remove("pdf-section--hidden");
                BotUI.askAnother.onclick = (e) => {
                    this.setSection("SOLUTIONS");
                }
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

    private setupDataChannel = (label) => {
            try {
                const dataChannel = BotUI.avatarConnection.createDataChannel(label, {ordered: true});
                dataChannel.binaryType = "arraybuffer";
                const dcCallBack = this.dataChannelMessageCallback;
                console.log(`Created data channel (${label})`);

                dataChannel.onopen = function (e) {
                  console.log(`data channel (${label}) connect`);
                  BotUI.avatarDataChannel.send(new Uint8Array([7]).buffer);
                  BotUI.avatarDataChannel.send(new Uint8Array([1]).buffer);
                }

                dataChannel.onclose = function (e) {
                  console.log(`data channel (${label}) closed`);
                }

                dataChannel.onmessage = function (e) {
                  console.log(`Got message (${label})`, e.data);
                  if (e.data.size !== undefined) {
                      const reader = new FileReader();
                      reader.addEventListener('loadend', () => {
                          dcCallBack(new Uint8Array(reader.result as ArrayBuffer));
                      });
                      reader.readAsArrayBuffer(e.data);
                  } else {
                     dcCallBack(new Uint8Array(e.data));
                  }

                }

                return dataChannel;
            } catch (e) {
                console.warn('No data channel', e);
                return null;
            }
        }

    public setPlayIcon = (icon: string) => {
        if (BotUI.chatInputPlayElement){
            BotUI.chatInputPlayElement.classList.remove(BotUI.settings.pauseIcon);
            BotUI.chatInputPlayElement.classList.remove(BotUI.settings.playIcon);
            BotUI.chatInputPlayElement.classList.add(icon);
        }
        return;
    }

    private static changeClasses = (class1: string, class2: string, e: HTMLElement) => {
        if (e.classList.contains(class1)) {
            e.classList.remove(class1)
            e.classList.add(class2)
        } else {
            e.classList.remove(class2)
            e.classList.add(class1)
        }
    }

    public setScreen = (screenType: ScreenTypeEnum = ScreenTypeEnum.PLAYER) => {
    }

    public setOrientation = (orientation: OrientationEnum = BotUI.orientation) => {
        BotUI.element.setAttribute('data-orientation', orientation);
        const { width: currentWidthInPx, height: currentHeightinPx } = BotUI.element.getBoundingClientRect();
        let width = BotUI.element.style.width === '100%' ? `${currentWidthInPx}px` : BotUI.element.style.width;
        let height = BotUI.element.style.height === '100%' ? `${currentHeightinPx}px` : BotUI.element.style.height;
        BotUI.element.style.setProperty('--bot-ui-window-width', width);
        BotUI.element.style.setProperty('--bot-ui-window-height', height);
    }

    public setState = (stateType: StateTypeEnum) => {

    }

    public setBackgroundColor = (color: string) => BotUI.setBackground({
        color,
    });

    public setBackgroundImage = (url: string, blur = BotUI.settings.backgroundImageBlur) => BotUI.setBackground({
        url: {
            path: url,
            blur,
        },
    });

    public setUserText = (text: string = null) => {
        if (BotUI.settings.guiMode === GUIMode.KIOSK) {
            BotUI.userTextKioskElement.setAttribute('data-empty', '');
            window.setTimeout(() => {
                if (isNil(text) || isEmpty(text)) {
                    BotUI.userTextKioskElement.setAttribute('data-empty', '');
                } else {
                    BotUI.userTextKioskElement.innerText = text;
                    BotUI.userTextKioskElement.removeAttribute('data-empty');
                }
            }, BotUI.settings.animationSpeed);
        }
        if (BotUI.settings.guiMode === GUIMode.CHAT && !(isNil(text) || isEmpty(text))) {
            this.setChatMessage(text, null, null, MessageType.USER, true);
        }
    }

    public setBotText = (text: string = null, nodeId: string = "") => {
        if (BotUI.settings.guiMode === GUIMode.KIOSK) {
            BotUI.botTextKioskElement.setAttribute('data-empty', '');
            window.setTimeout(() => {
                if (isNil(text) || isEmpty(text)) {
                    BotUI.botTextKioskElement.setAttribute('data-empty', '');
                } else {
                    BotUI.botTextKioskElement.innerText = text;
                    BotUI.botTextKioskElement.removeAttribute('data-empty');
                }
            }, BotUI.settings.animationSpeed);
        }
        if (BotUI.settings.guiMode === GUIMode.CHAT && !(isNil(text) || isEmpty(text))) {
            this.setChatMessage(text, null, null, MessageType.BOT, false, nodeId, this.botMessagesCallback);
        }
    }

    public getLastUserMessage(){
        var doc = BotUI.messagesElement;
        for (var i = BotUI.messagesElement.childNodes.length - 1; i > 0; i--) {
            if ((doc.childNodes[i] as HTMLElement).classList.contains("chat-message-user")) {
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
                BotUI.imageKioskElement.innerHTML = '';
                if (full) {
                    BotUI.imageKioskElement.classList.add('bu-d-none');
                    BotUI.element.removeAttribute('data-width-image');
                }
            };
            if (!url) {
                cleanImageElement();
            } else {
                if (url.includes('youtube.com/embed')) {
                    const iframe = document.createElement('iframe');
                    iframe.setAttribute('src', url);
                    cleanImageElement(false);
                    BotUI.imageKioskElement.classList.remove('bu-d-none');
                    BotUI.element.setAttribute('data-width-image', '');
                    BotUI.imageKioskElement.appendChild(iframe);
                    BotUI.videoCallback();
                } else {
                    const video = document.createElement('video');
                    video.autoplay = true;
                    video.onloadeddata = (e) => {
                        cleanImageElement(false);
                        BotUI.imageKioskElement.classList.remove('bu-d-none');
                        BotUI.element.setAttribute('data-width-image', '');
                        BotUI.imageKioskElement.appendChild(video);
                    }
                    video.onended = (e) => {
                        BotUI.videoCallback();
                    }
                    video.src = url;
                }
            }
        }

    }

    public toggleLoader = (on: boolean) => {
        if (on){
            BotUI.loadingSpinner.classList.remove("hidden");
            BotUI.messagesElement.classList.add("hidden");
        }else{
            BotUI.loadingSpinner.classList.add("hidden");
            BotUI.messagesElement.classList.remove("hidden");
        }
    }

    private pdfButton = async (settings: any) => {
        this.toggleLoader(true);
        const url = await settings.pdf.url();
        this.toggleLoader(false);
        const pdfUrl = url + "#toolbar=0";
        BotUI.pdfViewer.remove();
        BotUI.pdfViewer = document.createElement("object");
        BotUI.pdfViewer.data = pdfUrl;
        BotUI.pdfViewer.type = "application/pdf";
        BotUI.pdfViewerContainer.appendChild(BotUI.pdfViewer);
        this.setSection("PDF");
    }

    public appSelectToggle = (active: boolean, text: string = "") => {
        if (active){
            BotUI.sopName.classList.remove("hidden");
            BotUI.chatTextInputElement.style.setProperty("--bot-ui-sop-name-height", "50px");
            BotUI.messagesElement.style.setProperty("--bot-ui-sop-name-height", "50px");
            BotUI.sopName.textContent = text;       
        }else{
            BotUI.sopName.classList.add("hidden");
            BotUI.chatTextInputElement.style.setProperty("--bot-ui-sop-name-height", "0px");
            BotUI.messagesElement.style.setProperty("--bot-ui-sop-name-height", "0px");
            BotUI.sopName.textContent = "";   
        }
    }

    public removeSuggestions = () => {
        const elemList = document.querySelectorAll("[data-messages] > div > [data-suggestions-container]");
        elemList.forEach(element => {
            const par = element.parentNode;
            par.parentNode.removeChild(par);
        });
    }

    public setSuggestion = (suggestions : string[]) => {
        this.removeSuggestions();
        const messageElement = BotUI.messagesElement;
        const suggestionContainer = getContentAsHtml(sopSuggestionContainer);
        messageElement.appendChild(suggestionContainer);
        suggestions.forEach(sug => {
            let btn = document.createElement("button");
            btn.innerText = sug;
            btn.setAttribute("data-suggestions-button", "");
            btn.classList.add("data-suggestions-button");
            btn.onclick = this.suggestionsCallback;
            document.querySelector("[data-suggestions-container].data-suggestions-container").appendChild(btn);
        });
        BotUI.scrollToLastMessage(messageElement);
    }

    public setMedia = (settings:any = {}) => {
        const messageElement = BotUI.messagesElement;
        const mediaPlayer = document.createElement('video');
        const source = document.createElement('source');
        source.src = settings.src;
        mediaPlayer.appendChild(source);
        mediaPlayer.setAttribute('controls','');
        mediaPlayer.classList.add("chat-message");
        if (!settings.sound){
            mediaPlayer.classList.add('bot-muted-video');
            window.onload = function () {
                const mediaList = document.getElementsByClassName("bot-muted-video");
                for (let index = 0; index < mediaList.length; index++) {
                    const element = mediaList[index] as HTMLVideoElement;
                    element.muted = true
                }
            }
        }
        messageElement.appendChild(mediaPlayer);
    }

    public disableButtonGroup = (settings, callback, selector) => {
        const messageElement = BotUI.messagesElement;
        BotUI.inputTakers.classList.remove("hidden");
        if (callback){
            callback();
        }

        if (settings.solutions){
            if (settings.pdf){
                this.pdfButton(settings)
            }else{
                this.oldMessagesSection(settings.groupName.replace(/\s+/g, ''));
            }

        }

        if (settings.appSelect){
            messageElement.textContent = "";
            this.appSelectToggle(true, selector);
        }
        if (settings.disableGroup){
            document.querySelectorAll(`[data-button-group=${selector}]`).forEach(elem => {
                elem.setAttribute('disabled', '');
            });
        }
        this.setInputMode(settings.oldMode);
    };

    public setButton = (settings: any = {}, callback: Function = ()=>{}) => {
        console.log(settings);
        const messageElement = BotUI.messagesElement;
        this.setInputMode("button");
        const button = document.createElement('button');
        const selector = "buttons"

        if(settings.background){
            const newImg = new Image();
            button.append(newImg);
            newImg.src = settings.background; 
            button.style.background = `transparent`;
        }

        if (settings.text){
            button.textContent = settings.text;
        }

        
        button.classList.add("inputButton", "chat-message", "chat-message-bot");
        button.setAttribute("data-message-type", "bot");
        button.setAttribute("data-button-group", selector);

        button.onclick = () => {this.disableButtonGroup(settings, callback, selector)};

        messageElement.appendChild(button);
        messageElement.scrollTop = messageElement.scrollHeight;
        BotUI.scrollToLastMessage(messageElement);

        if (settings.solutions){
            this.newMessageSection(settings.groupName.replace(/\s+/g, ''));
            this.setSection("SOLUTIONS");
        }
    }

    public setImage = (url: string = null) => {
        if (BotUI.settings.guiMode === GUIMode.KIOSK) {
            const cleanImageElement = (full = true) => {
                BotUI.imageKioskElement.innerHTML = '';
                if (full) {
                    BotUI.imageKioskElement.classList.add('bu-d-none');
                    BotUI.element.removeAttribute('data-width-image');
                }
            };
            if (!url) {
                cleanImageElement();
            } else {
                const image = new Image();
                const fac = new FastAverageColor();
                image.crossOrigin = 'anonymous';
                image.onload = (e) => {
                    cleanImageElement(false);
                    BotUI.imageKioskElement.classList.remove('bu-d-none');
                    BotUI.element.setAttribute('data-width-image', '');
                    BotUI.imageKioskElement.appendChild(image);

                    fac.getColorAsync(BotUI.imageKioskElement.querySelector('img'))
                        .then(function (color) {
                            BotUI.element.style.setProperty('--bot-ui-image-background-color', `rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, ${BotUI.settings.imageAverageColorOpacity})`);
                        })
                        .catch(function (e) {
                            console.log(e);
                        });

                }
                image.onerror = (e) => {
                    cleanImageElement();
                }
                image.src = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=' + url;
            }
        }
        if (BotUI.settings.guiMode === GUIMode.CHAT && !(isNil(url) || isEmpty(url))) {
            this.setChatMessage(null, url, null, MessageType.BOT, false);
        }
    }

    public removeOverlay(){
        BotUI.botPcmElement.classList.add('bu-invisible');
        BotUI.botPcmElement.classList.remove('bu-visible');
    }

    public addOverlay(){
        BotUI.botPcmElement.classList.remove('bu-invisible');
        BotUI.botPcmElement.classList.add('bu-visible');
    }

    public resume(){
        if (BotUI.settings.inputMode === "voice"){
            BotUI.botPcmElement.classList.remove('bu-invisible');
            BotUI.botPcmElement.classList.add('bu-visible');
        }
    }

    public setInputAudio = (samples: any = null) => {
        BotUI.botPcmElement.classList.add('bu-invisible');
        BotUI.botPcmElement.classList.remove('bu-visible');
        if (isNil(samples) || isEmpty(samples)) {
            BotUI.userPcmElement.classList.add('bu-invisible');
            BotUI.userPcmElement.classList.remove('bu-visible');
        } else{
            BotUI.userPcmElement.classList.add('bu-visible');
            BotUI.userPcmElement.classList.remove('bu-invisible');
        }
    }

    public setOutputAudio = (samples: any = null, sampleRate = 16000, stereo = false) => {
        BotUI.userPcmElement.classList.add('bu-invisible');
        BotUI.userPcmElement.classList.remove('bu-visible');

        if (isNil(samples) || isEmpty(samples)) {
            BotUI.botPcmElement.classList.add('bu-invisible');
            BotUI.botPcmElement.classList.remove('bu-visible');
        } else if (BotUI.settings.inputMode === "voice"){
            BotUI.botPcmElement.classList.add('bu-visible');
            BotUI.botPcmElement.classList.remove('bu-invisible');
        }
    }

    

    public chatInputCallback = (...value) => {}

    public inputModeCallback = (...value) => {}

    public chatArrowCallback = (...value) => {}

    public chatMicrophoneCallback = (...value) => {}

    public askAnotherCallback = (...value) => {}

    public botMessagesCallback = (e) => {}

    public continueCallback = (...value) => {}

    public chatMuteCallback = (...value) => {}

    public chatBargeCallback = (...value) => {}

    public chatPlayCallback = (...value) => {}

    public chatStopCallback = (...value) => {}

    public chatMicCallback = (...value) => {}
    
    public loginCallback = async (...value) => {}

    public sectionChangeCallback = (...value) => {}

    public chatBackCallback = (...value) => {}

    public chatKeyboardCallback = (...value) => {
        BotUI.settings.inputAudio = !BotUI.settings.inputAudio;
        if(BotUI.settings.inputAudio)	{
			document.querySelector("[data-chat-input-keyboard]").classList.add("icon-sop--keyboard-active");
		}else{
			document.querySelector("[data-chat-input-keyboard]").classList.remove("icon-sop--keyboard-active");
		}
    }

    public chatSopNextCallback = (...value) => {}

    public chatSopQuestionCallback = (...value) => {}

    public chatTextInputElementCallback = (...value) => {}

    public dataChannelMessageCallback = (...value) => {}

    public collapsableTriggerCallback = (collapsed) => {}

    public suggestionsCallback = (...value) => {}

    public goToPositive = (id) => {}

    private static videoCallback: () => any = () => {};

    public setMicrophone = (enable: boolean = false) => {
        BotUI.isMicrophoneEnabled = enable;
        BotUI._setMicrophone();
        BotUI.getChatMicrophone(BotUI.isMicrophoneEnabled, this.chatMicrophoneCallback);
    }

    public setUserMessageBackgroundColor = (color: string) => {
        const backgroundColor = isNil(color) || !is(String, color) ? this.getSettings().userMessageBackgroundColor : color;
        BotUI.element.style.setProperty('--bot-ui-message-background-user', backgroundColor);
    }

    public setBotMessageBackgroundColor = (color: string) => {
        const backgroundColor = isNil(color) || !is(String, color) ? this.getSettings().botMessageBackgroundColor : color;
        BotUI.element.style.setProperty('--bot-ui-message-background-bot', backgroundColor);
    }

    public setUserMessageTextColor = (color: string) => {
        const textColor = isNil(color) || !is(String, color) ? this.getSettings().userMessageTextColor : color;
        BotUI.element.style.setProperty('--bot-ui-message-color-user', textColor);
    }

    public setBotMessageTextColor = (color: string) => {
        const textColor = isNil(color) || !is(String, color) ? this.getSettings().botMessageTextColor : color;
        BotUI.element.style.setProperty('--bot-ui-message-color-bot', textColor);
    }

    public setUserMessageTextOutlineColor = (color: string) => {
        const textOutlineColor = isNil(color) || !is(String, color) ? this.getSettings().userMessageTextOutlineColor : color;
        BotUI.element.style.setProperty('--bot-ui-message-color-outline-user', textOutlineColor);
    }

    public setBotMessageTextOutlineColor = (color: string) => {
        const textOutlineColor = isNil(color) || !is(String, color) ? this.getSettings().botMessageTextOutlineColor : color;
        BotUI.element.style.setProperty('--bot-ui-message-color-outline-bot', textOutlineColor);
    }

    public setTextInputEnabled = (enabled = false) => {
        BotUI.settings.textInputEnabled = enabled;
        let elementChatHeight = disabledHeight;
        if (enabled) {
            BotUI.element.setAttribute('data-with-chat-input', '');
            elementChatHeight = chatHeight;
        } else {
            BotUI.element.removeAttribute('data-with-chat-input');
        }
        BotUI.element.style.setProperty('--bot-ui-chat-input-height', elementChatHeight);
        BotUI.handleBotUiHeights();
    }

    public setHlsAvatar = (streamUrl: string = null) => {
        this.setAvatar({
            type: AvatarTypeEnum.HLS,
            streamUrl,
        });
    }

    public setWebRtcAvatar = (streamUrl: string = null) => {
        this.setAvatar({
            type: AvatarTypeEnum.WEBRTC,
            streamUrl,
        });
    }

    public setAvatar = async ({type, streamUrl}: AvatarStream = {type: AvatarTypeEnum.HLS, streamUrl: null}) => {
        const videoElement = document.createElement('video');
        const cleanAvatar = (closeWs = false) => {
            BotUI.avatarElement.innerHTML = '';
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
                    console.log(err, data.response, data)
                });

                hls.on(Hls.Events.LEVEL_SWITCHED, (evt: any, data: Hls.levelSwitchedData) => {
                    const {width, height} = hls.levels[data.level];
                    if (width && height) {
                        console.log(`qualityChange ${width}x${height}`);
                    }
                });

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
                        case 'answer':
                            BotUI.avatarConnection.setRemoteDescription({
                                type: "answer",
                                sdp: message["sdp"]
                            })
                                .then(() => {
                                    candidates.forEach(candidate => {
                                        BotUI.avatarConnection.addIceCandidate(candidate)
                                    })

                                    candidates = []
                                })
                                .catch((e) => {
                                    console.error("Failed to set remote description", e)
                                })
                            break;

                        case 'error':
                            console.error(`Error message from server ${message.message}`)
                            break;

                        case 'iceCandidate':
                            const candidate = new RTCIceCandidate(message.candidate)
                            if (BotUI.avatarConnection && BotUI.avatarConnection.remoteDescription) {
                                BotUI.avatarConnection.addIceCandidate(candidate)
                                    .catch((e) => {
                                        console.error("Failed to add ICE candidate", e)
                                    })
                            } else {
                                console.log("Connection not ready, queuing candidate", candidate)
                                candidates.push(candidate)
                            }
                            break;

                        default:
                            console.error(`Unknown message from server ${message.message}`)
                            break;
                    }
                }

                (async () => {
                    // TODO add credentials
                    const configuration = { iceServers: [{
                                              urls: ["stun:stun.l.google.com:19302"],
                                              username: "",
                                              credential: ""
                                          }]
                    };
                    BotUI.avatarConnection = new RTCPeerConnection(configuration)
                    BotUI.avatarDataChannel = this.setupDataChannel('cirrus');

                    BotUI.avatarConnection.addEventListener('icecandidate', (event) => {
                        const candidate = event.candidate;

                        if (candidate) {
                            console.log('Local ICE candidate' + JSON.stringify(candidate));
                            if (candidate.candidate !== "") {
                                this.avatarSendMessage(
                                    {
                                        type: 'iceCandidate',
                                        candidate: candidate,
                                    }
                                );
                            }
                        }
                    });

                    BotUI.avatarConnection.addEventListener('track', (event) => {
                        console.log("Video track ready");
                        cleanAvatar(false);
                        BotUI.avatarElement.appendChild(videoElement);
                        videoElement.playsInline = true;
                        if (videoElement.srcObject){
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

                    console.info('Sending SDP offer');

                    this.avatarSendMessage({
                        type: 'offer',
                        sdp: offer.sdp,
                    });
                })().catch((e) => {
                    console.error('Failed to create WebRTC connection', e);
                    cleanAvatar();
                })
            }
        }
    }

    public setReverseAvatarOrder = (reverseOrder: boolean = false) => {
        if (BotUI.settings.guiMode === GUIMode.CHAT) {
            reverseOrder = !!reverseOrder;
            BotUI.reverseAvatarOrderAction(reverseOrder);
        }
    }

    public avatarSendMessage = (message) => {
        const jsonMessage = JSON.stringify(message);
        console.log('Sending message: ' + jsonMessage);
        BotUI.avatarWs.send(jsonMessage);
    }

    public getSettings = () => {
        return BotUI.settings;
    }

    public sendRTCData = (descriptor) => {
            if (BotUI.avatarDataChannel && BotUI.avatarDataChannel.readyState == 'open') {
                console.log('Sending', descriptor);
                const descriptorAsString = JSON.stringify(descriptor);
                const data = new DataView(new ArrayBuffer(1 + 2 + 2 * descriptorAsString.length));
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

    private static reverseAvatarOrderAction = (reverseOrder: boolean = BotUI.settings.reverseAvatarOrder) => {
        BotUI.settings.reverseAvatarOrder = reverseOrder;
        if (BotUI.settings.reverseAvatarOrder === true) {
            BotUI.element.setAttribute('data-avatar-reverse-order', '');
        } else {
            BotUI.element.removeAttribute('data-avatar-reverse-order');
        }
    }

    private static showAvatar = (show = true) => {
        const hasAvatar = BotUI.element.hasAttribute('data-with-avatar');
        if (!hasAvatar && BotUI.settings.guiMode === GUIMode.CHAT) {
            BotUI.scrollToLastMessage(BotUI.messagesElement);
        }
        if (show) {
            BotUI.element.setAttribute('data-with-avatar', '');
        } else {
            BotUI.element.removeAttribute('data-with-avatar');
        }
        BotUI.handleBotUiHeights();
    }

    private static handleBotUiHeights = () => {
        const hasAvatar = BotUI.element.hasAttribute('data-with-avatar');
        const { height } = BotUI.element.getBoundingClientRect();
        const avatarMaxHeight = height * avatarMaxHeightRatio[BotUI.settings.guiMode];
        const avatarTextOverlap = height * avatarTextOverlapRatio * -1;
        const avatarHeight = hasAvatar ? `${avatarMaxHeight}px` : disabledHeight;
        BotUI.element.style.setProperty('--bot-ui-avatar-height', avatarHeight);
        BotUI.element.style.setProperty('--bot-ui-avatar-text-overlap', `${avatarTextOverlap}px`);
    }

    private static getInputValue = (value: string, callback: Function) => callback(value);

    private static getChatMicrophone = (value: boolean, callback: Function) => {
        if (BotUI.isMicrophoneEnabled) {
            BotUI.chatInputBargeElement.classList.add(BotUI.settings.micIcon);
        } else {
            BotUI.chatInputBargeElement.classList.remove(BotUI.settings.micIcon);
        }
        callback(value);
    }

    private static _setMicrophone = () => {
        if (BotUI.isMicrophoneEnabled) {
            BotUI.chatInputMicElement.classList.add('icon--light');
        } else {
            BotUI.chatInputMicElement.classList.remove('icon--light');
        }
    }

    public disableStop = (disable: boolean) => {
        BotUI.chatInputStopElement.classList.remove('icon--light');
        if (disable) {
            BotUI.chatInputStopElement.classList.add('icon--light');
        }
    }

    private static getChatMute = (value: boolean, callback: Function) => callback(value);

    private static setBackground = (background: Background) => {
        const { color = BotUI.settings.backgroundColor, url: { path = BotUI.settings.backgroundImage, blur = BotUI.settings.backgroundImageBlur } = {} } = background;
        BotUI.settings.backgroundColor = color;
        BotUI.settings.backgroundImageBlur = blur;
        BotUI.settings.backgroundImage = path;
        if (color) {
            BotUI.element.style.setProperty('--bot-ui-background-color', color);
            BotUI.backgroundElement.classList.remove('background--image');
        }
        if (path) {
            BotUI.backgroundElement.classList.add('background--image');
            BotUI.element.style.setProperty('--bot-ui-background-url', `url("${path}")`);
            BotUI.element.style.setProperty('--bot-ui-background-url-blur', `${blur}px`);
        }
    }

    public setChatMessage = (text: string, imageUrl: string, videoUrl: string, type: MessageType, replace: boolean = false, id: string = null, clickCallback: Function = () => {}) => {
        const messageElement = BotUI.messagesElement;
        const messageTemplate = getContentAsHtml(chatMessageStructureTemplate);
        const messageTemplateElement = messageTemplate.querySelector('div.chat-message');
        const messageTemplateTextElement = messageTemplateElement.querySelector(':scope span');
        
        if(messageElement.lastChild !== null){
            const { dataset: { messageType } = {} } = messageElement && messageElement.lastChild && <HTMLElement>messageElement.lastChild;
            if (replace && messageElement.lastChild !== null && messageType !== MessageType.BOT) {
                messageElement.removeChild(messageElement.lastChild);
            } else if (messageType && messageType === type) {
                (messageElement.lastChild as Element).classList.remove('chat-message-last');
            }
        }

        messageTemplateTextElement.innerHTML = text;
        messageTemplateElement.setAttribute('data-message-type', type);
        messageTemplateElement.classList.add('chat-message-' + type);
        messageTemplateElement.classList.add('chat-message-last');

        if (imageUrl) {
            const image = new Image();
            image.onload = (e) => {
                messageTemplateElement.appendChild(image);
                messageElement.scrollTop = messageElement.scrollHeight;
            }
            image.onerror = (e) => {
            }
            image.src = imageUrl;
        }

        if (videoUrl) {
            if (videoUrl.includes('youtube.com/embed')) {
                const iframe = document.createElement('iframe');
                iframe.setAttribute('src', videoUrl);
                messageTemplateElement.appendChild(iframe);
                messageElement.scrollTop = messageElement.scrollHeight;
                BotUI.videoCallback();
            } else {
                const video = document.createElement('video');
                video.src = videoUrl;
                video.autoplay = true;
                video.onloadeddata = (e) => {
                    messageElement.scrollTop = messageElement.scrollHeight;
                }
                video.onended = (e) => {
                    BotUI.videoCallback();
                }
                messageTemplateElement.appendChild(video);
            }
        }
        if (type === MessageType.BOT && this.getSettings().goTo){
            const oldElems = document.getElementsByClassName("latest-message");
            for (let index = 0; index < oldElems.length; index++) {
                const element = oldElems[index];
                element.classList.remove("latest-message")
            }
            const hoverIcon = document.createElement("span");
            hoverIcon.innerHTML = " ";
            ["icon-sop", "icon-sop--undo", "icon--content--undo", "latest-message"].forEach(_class => {
                hoverIcon.classList.add(_class);
            });
            hoverIcon.addEventListener("click", () => {
                clickCallback(id)
            })
            messageTemplate.children[0].appendChild(hoverIcon);
        }
        
        messageElement.appendChild(messageTemplate.children[0]);
        messageElement.scrollTop = messageElement.scrollHeight;
        BotUI.scrollToLastMessage(messageElement);
    }

    private static scrollToLastMessage = (messageElement: HTMLElement) => {
        window.setTimeout(() => {
            scrollToAnimated(messageElement, messageElement.scrollHeight, BotUI.settings.animationSpeed);
            // messageElement.scrollTop = messageElement.scrollHeight;
            // messageElement.querySelector('.chat-message:last-child').scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
        })
    }

    private static setCollapsableUIHeight = () => {
        let collapsed = BotUI.settings.collapsed ? 'collapsed' : 'expanded';
        BotUI.element.setAttribute('data-collapsable', collapsed);
        const { width, height } = BotUI.settings.widgetSize;
        BotUI.element.style.width = BotUI.settings.collapsed ? null : width;
        BotUI.element.style.height = BotUI.settings.collapsed ? null : height;
    }
}

export { BotUI as default };