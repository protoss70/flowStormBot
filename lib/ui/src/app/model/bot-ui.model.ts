export interface Settings {
    animationSpeed?: number;
    backgroundAdvancedAnimationParticlesCount?: number;
    backgroundColor?: string;
    backgroundSecondaryColor?: string;
    backgroundImage?: string;
    backgroundImageBlur?: number;
    backgroundSimpleAnimation?: boolean;
    suggestions?: Suggestions;
    detectOrientation?: boolean;
    fullScreen?: boolean;
    customIcons?: boolean;
    arrowIcon?: string;
    micIcon?: string;
    pauseIcon?: string;
    playIcon?: string;
    muteIcon?: string;
    volumeIcon?: string;
    upSop?: string;
    downSop?: string;
    guiMode: GUIMode,
    goTo: Boolean,
    title: string,
    feedback: Boolean,
    imageAverageColorOpacity?: number;
    userMessageBackgroundColor?: string;
    userMessageTextColor?: string;
    userMessageTextOutlineColor?: string;
    botMessageBackgroundColor?: string;
    botMessageTextColor?: string;
    botMessageTextOutlineColor?: string;
    textInputEnabled?: boolean;
    widgetSize?: {
        height: string;
        width: string;
    };
    buttonInput?: boolean;
    inputAudio?: boolean;
    outputAudio?: boolean;
    reverseAvatarOrder?: boolean;
    collapsable?: boolean;
    collapsed?: boolean;
    sections?: string[];
    sectionActive?: number;
    sound?: boolean;
    controlIcons?: {mic: boolean, mute: boolean, restart: boolean};
    search?: boolean;
    showTooltips?: boolean;
    suggestionMode?: SuggestionMode;
    suggestionsListView?: boolean;
    triggerImage?: string;
    elasticSearchCharLimit?: {
        limitOn: boolean,
        charLimit: number
    };
    coreURL?: string;
    cvutIcon?: boolean;
    canvasID?: string;
}

export enum SuggestionMode {
    STANDARD= "disappearing",
    ALTERNATIVE= "non-disappearing"
}

export interface Background {
    color?: string;
    url?: {
        blur: number;
        path: string;
    };
}

export interface AvatarStream {
    type: AvatarTypeEnum;
    streamUrl: string;
}

export enum AvatarTypeEnum {
    HLS = 'hls',
    WEBRTC = 'webrtc',
}

export interface Suggestions {
    backgroundColor: string,
    textColor: string,
    hoverBackgroundColor?: string,
    activeBackground?: string,
}

export enum ScreenTypeEnum {
    PLAYER = 'player',
    LIST = 'list',
    SETTINGS = 'settings',
}

export enum StateTypeEnum {
    CLOSED = 'closed',
    FAILED = 'failed',
    LISTENING = 'listening',
    OPEN = 'open',
    PAUSED = 'paused',
    RESPONDING = 'responding',
    PROCESSING = 'processing',
    SLEEPING = 'sleeping',
}

export enum OrientationEnum {
    LANDSCAPE = 'landscape',
    PORTRAIT = 'portrait',
}

export enum GUIMode {
    CHAT = 'chat',
    KIOSK = 'kiosk',
}

export enum MessageType {
    BOT = 'bot',
    USER = 'user',
}
