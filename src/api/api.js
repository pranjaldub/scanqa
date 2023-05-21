

export const fetchTextAnswer = async (question,content) =>{
    const url =
      "https://api-inference.huggingface.co/models/distilbert-base-cased-distilled-squad";
    const data = {
      inputs: {
        question: question,
        context: content,
      },
    };
    try{
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer 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"
      },
      body: JSON.stringify(data),
    });
    const resp= await response.json()
    if(resp?.error){
        throw resp.error;
    }
    return resp}
    catch(error){
        throw error
    }
}


export const fetchPdfAnswer = async(question , content) =>{
    const url =
    "https://api-inference.huggingface.co/models/distilbert-base-cased-distilled-squad";
  const data = {
    inputs: {
      question: question,
      context: `${content}`,
    },
  };
  try{
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization":"Bearer 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"
    },
    body: JSON.stringify(data),
  });
  const resp= await response.json()
  if(resp?.error){
    throw resp.error;
}
  return resp}
  catch(error){
    throw error
  }
}

export const fetchSummary = async(content) =>{
    const url =
    "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
    const data = {
        inputs: content,
        
    };
    try{
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer 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"
      },
      body: JSON.stringify(data),
    });
    
    const resp= await response.json()
    if(resp?.error){
        throw resp.error;
    }
    return resp
}
catch(error){
    
    throw error
}
}