export interface Settings {
    animationSpeed?: number;
    backgroundAdvancedAnimationParticlesCount?: number;
    backgroundColor?: string;
    backgroundImage?: string;
    backgroundImageBlur?: number;
    backgroundSimpleAnimation?: boolean;
    detectOrientation?: boolean;
    fullScreen?: boolean;
    customIcons?: boolean;
    arrowIcon?: string;
    micIcon?: string;
    pauseIcon?: string;
    playIcon?: string;
    keyboardIcon?: string;
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
    inputMode?: string;
    interactionMode?: string;
    standardQuestionMode?: string;
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
