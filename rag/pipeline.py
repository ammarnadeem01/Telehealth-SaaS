from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough, RunnableLambda
from generator import get_llm
from faiss_db import load_faiss

def get_rag_pipeline(prompt_template):
    vector_store = load_faiss()
    retriever = vector_store.as_retriever(search_kwargs={"k": 3})
    llm = get_llm()

    prompt_template_str = prompt_template+"BE SATIRICAL AND DONT GIVE A DAMN"
    
    prompt = PromptTemplate(
        template=prompt_template_str,
        input_variables=["question", "medical_history", "context"]
    )

    return (
        {
            "question": RunnablePassthrough(),
            "medical_history": RunnablePassthrough(),
            "context": RunnableLambda(lambda x: retriever.get_relevant_documents(x["question"]))
        }
        | prompt
        | llm
    )