export const PopupQuery = ({ language = "nl" }) => {
  const locale = language === "undefined" ? "nl" : language;

  return `
        query MyQuery {
            popup: popupEntries(language: "${locale}") {
            ... on popup_Entry {
                    id
                    title
                    tag
                    description
                    image {
                        id
                        url
                        width
                        height
                    }
                    cta
                    url: href
                    isBackgroundAsset
                    position: popupPosition
                    size
                    
                    exclude {
                      ... on excludePath_Entry {
                        title
                      }
                    }
                }
            }
        }
    `;
};
