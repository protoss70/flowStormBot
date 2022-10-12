export const baseStructureTemplate = `
    <div data-wrapper class="bot bot-wrapper">
        <div class="column column-image">
            <div data-image class="image"></div>
        </div>
            <div data-avatar class="column column-avatar">
        </div>
            <div data-messages class="column column-messages">
        </div>
        <div data-chat-input class="chat-input">
            <div class="chat-input-wrapper">
                <div data-chat-sop class="sop-section">
                    <button data-sop-back></button>
                    <button data-sop-question></button>
                    <button data-sop-next></button>
                </div>
                <div data-chat-ask class="ask-section">
                    <span data-chat-input-settings class="settings settings--hidden">
                        <span data-chat-input-keyboard class="icon icon--keyboard"></span>
                        <span data-chat-input-mute class="icon icon--volume-mute"></span>
                    </span>

                    <div data-sound-input-wrap>
                        
                    </div>
                    <div data-text-input-wrap>

                        <input type="text" id="chatWindowTextInput" placeholder="Type text..." autocomplete="off"/>
                        <span data-chat-input-controls class="controls--visible">
                            <span data-chat-input-stop class="icon icon--stop icon--hidden"></span>
                        </span>
                        <span data-chat-input-arrow class="icon icon--arrow-up icon--arrow-up--hidden"></span>
                    
                    </div>
                    <div data-chat-input-controllers class="data-chat-input-controllers">
                        <span data-chat-input-play class="icon icon--play"></span>
                        <span data-chat-input-menu class="icon icon--menu"></span>
                    </div>    

                    <span data-chat-input-back class="icon icon--back"></span>

                </div>
            </div>
        </div>
        <div data-user-pcm class="pcm pcm-user bu-invisible"></div>
        <div data-bot-pcm class="pcm pcm-bot bu-invisible"></div>
        <div data-background class="background"></div>
    </div>
    <div data-trigger></div>
`;
