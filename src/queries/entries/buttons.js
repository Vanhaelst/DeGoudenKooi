export const buttonsQuery = `
     {
        ... on button_Entry {
            callToAction: title
              id
            href
            variant: buttonVariant
            size: buttonSize
            target: buttonTarget
       }
   }                 
`;
