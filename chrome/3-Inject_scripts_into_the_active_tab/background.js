/*
The first event our service worker will listen for is runtime.onInstalled(). 
This method allows the extension to set an initial state or complete some tasks on installation. 
Extensions can use the Storage API and IndexedDB to store the application state. In this case, though, 
since we're only handling two states, we will use the action's badge text itself to track whether the extension is 'ON' or 'OFF'.
*/
chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
  });

const extensions = "https://developer.chrome.com/docs/extensions";
const webstore = "https://developer.chrome.com/docs/webstore";

chrome.action.onClicked.addListener(async (tab)=>{
    if(tab.url.startsWith(extensions) || tab.url.startsWith(webstore)){
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id});
        const nextState = prevState === 'ON' ? 'OFF' : 'ON';

        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
        })

        if(nextState === 'ON'){
            await chrome.scripting.insertCSS({
                files:["focus-mode.css"],
                target:{tabId: tab.id},
            });
        } else if (nextState === 'OFF'){
            await chrome.scripting.removeCSS({
                files:["focus-mode.css"],
                target:{tabId: tab.id},
            })
        }
    }
})