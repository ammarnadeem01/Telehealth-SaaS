from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pipeline import get_rag_pipeline
import pprint
import uvicorn

app = FastAPI()


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
            Retrieve relevant medical context based on symptoms:
            Patient Input: {question}
            Medical History: {medical_history}
            Context: {context}
            Return a list of relevant medical documents.
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
