from server.rag.faiss_db import load_faiss
from server.rag.generator import get_llm
from langchain.chains import RetrievalQA

def get_rag_pipeline():
    vector_store = load_faiss()
    retriever = vector_store.as_retriever(search_kwargs={"k": 2})

    llm = get_llm()

    return RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=retriever, return_source_documents=True)
