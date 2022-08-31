export const baseStructureTemplate = `
    <div data-wrapper class="bot bot-wrapper">
        <div class="column column-image">
            <div data-image class="image">
            </div>
        </div>
        <div data-avatar class="column column-avatar">
        </div>
        <div data-messages class="column column-messages">
        </div>
        <div data-chat-input class="chat-input">
            <div class="chat-input-wrapper">
                <div data-sound-input-wrap>
                    <span data-chat-input-mic class="icon icon--largest icon--mic"></span>
                </div>
                <div data-text-input-wrap>
                    <input type="text" id="chatWindowTextInput" placeholder="Type text..." autocomplete="off"/>
                    <span data-chat-input-controls class="controls--visible">
                        <span data-chat-input-play class="icon icon--play"></span>
                        <span data-chat-input-stop class="icon icon--stop icon--hidden"></span>
                    </span>
                    <span data-chat-input-arrow class="icon icon--arrow-up"></span>
                </div>
                <span data-chat-input-mute class="icon icon--volume"></span>
                <span data-chat-input-keyboard class="icon icon--keyboard"></span>
            </div>
        </div>
        <div data-user-pcm class="pcm pcm-user bu-invisible"></div>
        <div data-bot-pcm class="pcm pcm-bot bu-invisible"></div>
        <div data-background class="background"></div>
    </div>
    <div data-trigger></div>
`;