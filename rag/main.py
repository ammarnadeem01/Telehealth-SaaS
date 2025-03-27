from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pipeline import get_rag_pipeline
import pprint
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SymptomQuery(BaseModel):
    user_input: str
    medical_history: str = ""
    use_case: str

@app.get("/")
def home():
    return {"message": "Telecure API Running!"}

@app.post("/analyze-symptoms")
async def analyze_symptoms(query: SymptomQuery):
    try:
        if query.use_case == "symptom_retriever":
           prompt_template = """
            You are a helpful AI assistant that provides medical insights based on user symptoms.  
            Make your response **clear and understandable** for users.  
            
            Patient's Input: "{question}"  
            Medical History: "{medical_history}"  
            
            🔹 **Analysis:**  
            - If the patient's input is too general, politely ask for more details.  
            - If symptoms are mentioned, summarize them in simple terms.  
            
            🔹 **Possible Causes & Insights:**  
            - Based on available information, list possible conditions or symptoms.  
            - Keep it simple and easy to understand.  
            
            🔹 **Next Steps:**  
            - Suggest if they should consult a doctor.  
            - Offer general advice (e.g., rest, hydration).  
            
            Avoid mentioning "documents" or "queries." Instead, provide helpful and relevant insights in a conversational tone.
            """

        elif query.use_case == "diagnosis":
            prompt_template = """
            Analyze symptoms with medical history:
            Patient Input: {question}
            Medical History: {medical_history}
            Context: {context}
            Provide a preliminary diagnosis with detailed analysis.
            """
        elif query.use_case == "personalized_insights":
            prompt_template = """
            Provide personalized health insights:
            Patient Input: {question}
            Medical History: {medical_history}
            Context: {context}
            Generate tailored advice, lifestyle recommendations, and potential next steps for well-being.
            """
        else:
            raise HTTPException(status_code=400, detail="Invalid use_case provided.")

        qa_chain = get_rag_pipeline(prompt_template=prompt_template)    
        result = qa_chain.invoke({
            "question": query.user_input, 
            "medical_history": query.medical_history
        })
        pprint.pprint(result.content)
        return {
            "response":result.content
            # "analysis": result["result"],
            # "sources": list({doc.metadata["source"] for doc in result["source_documents"]})
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
