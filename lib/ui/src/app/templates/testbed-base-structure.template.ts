import logo from "../../assets/images/ricaip-logo.svg";
import { testbedFloorplan } from "./testbed-floorplan.template";

/**
 * html wrapper is needed for prettier formatting
 */
const html = String.raw;

export const testbedBaseStructureTemplate = html`
  <div data-wrapper class="bot bot-wrapper">
    <!-- HEADER -->
    <div data-sop-header class="floorplan__header">
      <img src="${logo}" class="floorplan__header-logo" />
      <h3 data-sop-title>Testbed Bot</h3>
      <div data-sop-close class="icon-sop icon-sop--close"></div>
    </div>

    <!-- MAP / FLOORPLAN -->
    <div data-floorplan>
      <figure class="floorplan">${testbedFloorplan}</figure>
    </div>

    <!-- IMAGE -->
    <div class="column column-image">
      <div data-image class="image"></div>
    </div>

    <!-- AVATAR -->
    <div data-avatar class="column column-avatar"></div>

    <!-- LOGIN -->
    <div bot-login class="bot-login">
      <div bot-log-container class="bot-log-container">
        <h2>Welcome</h2>
        <p>Please login to use the bot</p>
        <button class="instantLogIn btn btn-light">
          <img
            src="https://img.icons8.com/fluency/512/google-logo.png"
            class="bot-googleIcon"
          />
          <div class="bot-googleLogText">Login with Google</div>
        </button>
      </div>
      <div bot-loginPopup class="bot-login-failed-popup hidden">
        Account doesn't exist!
      </div>
    </div>

    <!-- MESSAGES -->
    <div data-messages class="column column-messages"></div>
    <!-- LOADER -->
    <div loader class="loader hidden">
      <span loader-text class="loader-text">Loading...</span>
    </div>

    <!-- CHAT -->
    <div data-chat-input class="chat-input">
      <div class="chat-input-wrapper">
        <div data-input-takers>
          <!-- SOP SECTION -->
          <div data-chat-sop class="sop-section">
            <button data-sop-question>Ask Question</button>
            <button data-sop-question>Feedback</button>
            <button data-sop-next class="next-button">
              <div data-chat-input-arrow-down>Next</div>
            </button>
          </div>

          <!-- ASK SECTION -->
          <div data-chat-ask class="ask-section">
            <div control-icons-wrapper class="control-icons-wrapper">
              <span
                data-chat-input-search
                class="icon-sop left-icon icon-sop--search"
              ></span>
              <span
                data-chat-input-keyboard
                class="icon-sop icon-sop--keyboard"
              ></span>
              <span
                data-chat-input-mute
                class="icon-sop icon-sop--volume-mute"
              ></span>
              <span
                data-chat-input-restart
                class="icon-sop icon-sop--restart"
              ></span>
            </div>
            <div data-sound-input-wrap>
              <span
                data-chat-input-mic
                class="icon-sop icon--largest icon-sop--mic"
              ></span>
            </div>
            <div data-text-input-wrap>
              <input
                type="text"
                id="chatWindowTextInput"
                placeholder="Type text..."
                autocomplete="off"
                class="sop-text-input"
              />
              <span data-chat-input-controls class="controls--visible">
                <span
                  data-chat-input-stop
                  class="icon-sop icon-sop--stop icon--hidden"
                ></span>
              </span>
              <span
                data-chat-input-arrow
                class="icon-sop icon-sop--arrow-up icon-sop--arrow-up--hidden"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- OVERLAY - USER INPUT -->
    <div data-user-pcm class="pcm pcm-user bu-invisible"></div>

    <!-- OVERLAY - BOT ANSWER -->
    <div data-bot-pcm class="pcm pcm-bot bu-invisible"></div>

    <!-- BG -->
    <div data-background class="background"></div>
  </div>
  <div data-trigger></div>
`;
