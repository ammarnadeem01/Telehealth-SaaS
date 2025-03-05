from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pipeline import get_rag_pipeline
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
        prompt_template = (
            "You are a helpful medical expert. Answer the following question based on the context provided.\n"
            "Do not copy the source text verbatim; instead, synthesize a detailed and descriptive answer.\n"
            "If the question does not pertain to medical information or no relevant context is found, simply respond with \"Out of scope\".\n\n"
            "Question: {question}\n\n"
            "Context: {context}\n\n"
            "Answer:"
        )
        prompt = prompt_template.format(
            question=query.user_input,
            context=query.medical_history
        )
        print("++++++++++++++++++++++++++++++++++++")
        print("qa_chain",qa_chain)
        print("++++++++++++++++++++++++++++++++++++")
        result = qa_chain({"query": prompt})
        print("result",result)
        print("++++++++++++++++++++++++++++++++++++")
        answer = result.get("result", "").strip()
        sources = [doc.metadata.get("source", "unknown") for doc in result.get("source_documents", [])]
        
        if not answer or answer.lower() == "out of scope":
            return {
                "response": "Out of scope",
                "sources": [],
                "confidence": 0.0
            }
        
        return {
            "response": answer,
            "sources": sources,
            "confidence": 0.85  
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
