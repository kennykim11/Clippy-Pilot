function replaceTopTab(){
    console.log("Replacing top tab")
    const topTab = document.querySelector(".b_active").querySelector("a")
    const topIcon = document.createElement("img")
    topIcon.src = chrome.runtime.getURL("images/clippy_win11.png")
    topIcon.setAttribute("height", "18")
    topIcon.style.position = "relative"
    topIcon.style.top = 4
    topTab.replaceChildren(topIcon)
    const topText = document.createElement("span")
    topText.textContent = "Clippy"
    topTab.appendChild(topText)
}

function replaceChatHeader(mutationRecordArray, observer){
    console.log("Replacing header")
    const turnElement = mutationRecordArray[0].target
    const header = turnElement.querySelector(".response-message-group").shadowRoot.querySelector(".header")

    const clippyPortrait = document.createElement("img")
    clippyPortrait.src = chrome.runtime.getURL("images/clippy_grainy.png")
    clippyPortrait.setAttribute("width", "35")
    clippyPortrait.style.position = "relative"
    clippyPortrait.style.top = -5
    clippyPortrait.style.left = -3
    header.querySelector("cib-logo").shadowRoot.querySelector(".icon").replaceChildren(clippyPortrait);
    header.querySelector(".header-label").innerHTML = "Clippy"

    observer.disconnect();
}

function watchForNewTurn(){
    const chatTurns = document.querySelector(".cib-serp-main").shadowRoot.querySelector("#cib-conversation-main").shadowRoot.querySelectorAll("cib-chat-turn");
    const lastExchange = chatTurns[chatTurns.length-1]
    const messageGroupObserver = new MutationObserver(replaceChatHeader)
    messageGroupObserver.observe(lastExchange.shadowRoot, {childList: true})
}

replaceTopTab()
const chatTurnsObserver = new MutationObserver(watchForNewTurn)
chatTurnsObserver.observe(document.querySelector(".cib-serp-main").shadowRoot.querySelector("#cib-conversation-main").shadowRoot.querySelector("#cib-chat-main"), {childList: true})