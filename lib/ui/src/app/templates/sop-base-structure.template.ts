export const sopBaseStructureTemplate = `
    <div data-wrapper class="bot bot-wrapper">
        <div data-sop-header>
            <h3 data-sop-title>UPV</h3>
            <div data-sop-close class="icon-sop icon-sop--close"></div>
        </div>
        <div class="column column-image">
            <div data-image class="image"></div>
            </div>
            <div data-avatar class="column column-avatar">
            </div>
            <div data-messages class="column column-messages">
            </div>
            <div loader class="loader hidden">
                <span loader-text class="loader-text">Loading...</span>
            </div>
        <div data-chat-input class="chat-input">
            <div class="chat-input-wrapper">
                <div data-input-takers>
                    <div data-chat-ask class="ask-section">
                        <div control-icons-wrapper class="control-icons-wrapper">
                        <span data-chat-input-search class="icon-sop left-icon icon-sop--search"></span>
                            <span data-chat-input-mic class="icon-sop icon-sop--mic"></span>
                            <span data-chat-input-mute class="icon-sop icon-sop--volume-mute"></span>
                            <span data-chat-input-restart class="icon-sop icon-sop--restart"></span>
                        </div>
                        <div data-text-input-wrap>
                            <input type="text" id="chatWindowTextInput" placeholder="Type text..." autocomplete="off" class="sop-text-input"/>
                        </div>
    
                    </div>
                </div>
            </div>
        </div>
        <div data-user-pcm class="pcm pcm-user bu-invisible"></div>
        <div data-bot-pcm class="pcm pcm-bot bu-invisible"></div>
        <div data-background class="background"></div>
    </div>
    <div data-trigger></div>
`;
