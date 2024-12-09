export const buttonsQuery = `
     {
        ... on button_Entry {
            callToAction: title
            href
            variant: buttonVariant
            size: buttonSize
       }
   }                 
`;
