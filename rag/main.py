from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from server.rag.pipeline import get_rag_pipeline
# from server.medical_data.schema import Patient
# from server.medical_data.data_loader import patients``
import uvicorn

app = FastAPI()
qa_chain = get_rag_pipeline()

class SymptomQuery(BaseModel):
    user_input: str
    medical_history: str = ""

@app.get("/")
def home():
    return {"message": "Telecure API Running!"}

@app.post("/analyze-symptoms")
async def analyze_symptoms(query: SymptomQuery):
    try:
        prompt = f"""
        Medical Context: {query.medical_history}
        Patient Query: {query.user_input}
        Provide a preliminary analysis considering the above:
        """
        result = qa_chain({"query": prompt})

        return {
            "response": result["result"],
            "sources": [doc.metadata["source"] for doc in result["source_documents"]],
            "confidence": 0.85  
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
