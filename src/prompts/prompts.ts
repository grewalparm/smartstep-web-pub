export const formulateQuestionMessages = async (category: string) => {
    return (
      [{
        role: "system",
        content:
          "You are an expert in the medical field providing questions that help medical students study.",
      },
      {
        role: "user",
        content:
          `Give me an example of a multiple choice question that would appear on the STEP exam for medical students. The subject of the question should be ${category}.Do not provide the answer unless it is asked for. The only things that should be in your response are a question and answer choices.`,
      }]
    )
  }