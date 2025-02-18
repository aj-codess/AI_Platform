
const generateCommunityToken = () => {

    const uniqueNumber = Date.now();

    return `Trustur_Ai-${uniqueNumber}`;

};

export default generateCommunityToken;