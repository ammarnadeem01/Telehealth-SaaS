from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter 
from langchain_huggingface import HuggingFaceEmbeddings
import os

DOCUMENT_DIR = "/home/ammar/AmmarNadeem/MERN_PROJECTS/MetaDots/Telehealth-SaaS/rag/medical-data"


def create_faiss_index():
    loader = DirectoryLoader(DOCUMENT_DIR, glob="**/*.json")
    documents = loader.load()
    if not documents:
        raise ValueError("No documents found!")
    
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    docs = text_splitter.split_documents(documents)
    
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vector_store = FAISS.from_documents(docs, embeddings)
    print(f"Number of documents: {len(docs)}")
    print("Sample document content:", docs[0].page_content[:100])  # First 100 chars of first doc
    
    # vector_store.save_local("./server/rag/faiss_index")
    # print("FAISS index created.")
    save_faiss(vector_store) 
    print("FAISS index created.")

if __name__ == "__main__":
    create_faiss_index()
