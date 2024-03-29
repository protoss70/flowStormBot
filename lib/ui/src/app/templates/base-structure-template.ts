export const baseStructureTemplate = `
    <div data-wrapper class="bot bot-wrapper">
        <div data-header>
            <h3 data-title>UPV</h3>
            <div data-close class="icon-sop icon--close"></div>
        </div>
        <div class="column column-image">
            <div data-image class="image"></div>
            </div>
            <div data-avatar class="column column-avatar">
            </div>
            <div data-messages class="column column-messages">
            </div>
            <div data-start-button-wrapper class="hidden">
                <button id="button-test" data-start-button class="icon icon--play">
            </button>
            </div>
            <canvas data-pdf-viewer class="hidden" id="data-pdf-viewer">
            </canvas>
        <div data-chat-input class="chat-input">
            <div class="chat-input-wrapper">
                <div bot-logo class="bot-logo">
                    <img src="https://core.flowstorm.ai/file/assets/spaces/64b51d6ef3a1040e23586edb"/>
                </div>
                <div control-icons-wrapper class="control-icons-wrapper">
                    <span data-chat-input-search class="icon left-icon icon--search"></span>
                    <span data-chat-input-mic class="icon icon--mic"></span>
                    <span data-chat-input-mute class="icon icon--volume-mute"></span>
                    <span data-chat-input-restart class="icon icon--restart"></span>
                </div>
                <div pdf-controls class="hidden">
                    <div class="pdf-controls-section">
                        <div class="pdf-pageNum-section">
                            <div class="pdf-icon-container">
                                <span data-pdf-previous class="icon icon--circle-left"></span>
                            </div>
                            <div pdf-pageNum-display id="pdf-pageNum-display">Page: 1</div>
                            <div class="pdf-icon-container">
                                <span data-pdf-next class="icon icon--circle-right"></span>
                            </div>
                        </div>
                        <button pdf-controls-close>Close</button>  
                    </div>
                </div>
                <div data-text-input-wrap>
                    <input type="text" id="chatWindowTextInput" placeholder="Type text..." autocomplete="off" class="text-input"/>
                </div>
            </div>
        </div>
        <div data-user-pcm class="pcm pcm-user bu-invisible"></div>
        <div data-bot-pcm class="pcm pcm-bot bu-invisible"></div>
        <div data-background class="background"></div>
    </div>
    <div data-trigger></div>
`;


