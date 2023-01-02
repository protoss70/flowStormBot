export const sopBaseStructureTemplate = `
    <div data-wrapper class="bot bot-wrapper">
        <h3 data-sop-header class="hidden">sop Name</h3>
        <div class="column column-image">
            <div data-image class="image"></div>
            </div>
            <div data-avatar class="column column-avatar">
            </div>
            <div data-messages class="column column-messages">
            </div>
            <div loader class="loader hidden">
                <span loader-text class="loader-text">Loading PDF Files...</span>
            </div>
            <div object-container id="object-container">
                <object pdf-viewer class="hidden" id="pdf-viewer" type="application/pdf"></object>
            </div>
        <div data-chat-input class="chat-input">
            <div class="chat-input-wrapper">
                <div data-input-takers> 
                    <div data-chat-sop class="sop-section">
                        <button data-sop-question>Ask Question</button>
                        <button data-sop-question>Feedback</button>
                        <button data-sop-next class="next-button">
                            <div data-chat-input-arrow-down>Next</div>
                        </button>
                    </div>
                    <div data-chat-ask class="ask-section">
                        <span data-chat-input-settings class="settings-sop settings--hidden">
                            <span data-chat-input-keyboard class="icon icon-sop--keyboard"></span>
                            <span data-chat-input-mute class="icon icon-sop--volume-mute"></span>
                        </span>
    
                        <div data-sound-input-wrap>
                            <span data-chat-input-mic class="icon icon--largest icon-sop--mic"></span>
                        </div>
                        <div data-text-input-wrap>
    
                            <input type="text" id="chatWindowTextInput" placeholder="Type text..." autocomplete="off" class="sop-text-input"/>
                            <span data-chat-input-controls class="controls--visible">
                                <span data-chat-input-stop class="icon icon-sop--stop icon--hidden"></span>
                            </span>
                            <span data-chat-input-arrow class="icon icon-sop--arrow-up icon-sop--arrow-up--hidden"></span>
                        
                        </div>
                        <div data-chat-input-controllers class="data-chat-input-controllers">
                            <span data-chat-input-menu class="icon icon-sop--menu"></span>
                        </div>    
    
                        <span data-chat-input-back class="icon icon-sop--back"></span>
    
                    </div>
                </div>
                <div data-chat-pdf class="pdf-section pdf-section--hidden">
                    <div data-solutions-inputs> 
                        <button data-pdf-question-another>Ask Another Question</button>
                        <button data-pdf-question-continue>Continue</button>
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
