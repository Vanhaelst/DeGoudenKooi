export const awardsQuery = ({ klasse }) => `
  awardsEntries {
    ...on award_Entry {
    title
    awardimage {
      url
    }
    class
    }
  }            
`;
