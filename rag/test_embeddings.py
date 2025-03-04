from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document

docs = [Document(page_content="Hello world"), Document(page_content="Test document")]
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

try:
    FAISS.from_documents(docs, embeddings).save_local("test_index")
    print("Success!")
except Exception as e:
    print(f"Failed: {str(e)}")