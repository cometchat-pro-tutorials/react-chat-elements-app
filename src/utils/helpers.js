export const scrollToBottom = (elementToBeScrolled) => {
  /* Added in setInterval in order to handle the case when the chat is loaded
  or the page is refreshed */
  setTimeout(() => {
    elementToBeScrolled.scrollTop = elementToBeScrolled.scrollHeight;
  });

};
