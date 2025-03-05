from langchain_community.vectorstores import FAISS
# from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.document_loaders import DirectoryLoader, JSONLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter 
from langchain_huggingface import HuggingFaceEmbeddings
import os

DOCUMENT_DIR = "/home/ammar/AmmarNadeem/MERN_PROJECTS/MetaDots/Telehealth-SaaS/rag/medical-data"


def create_faiss_index():
    documents = []
    loaders_config = {
        "treatments.json": {
            'jq_schema': '.[] | "Treatment: \(.treatment) | Uses: \(.used_for | join(\", \")) | Dosage: \(.dosage) | Side Effects: \(.side_effects | join(\", \"))"',
            'text_content': False
        },
        "diseases.json": {
            'jq_schema': '.[] | "Disease: \(.disease) | Description: \(.description) | Causes: \(.causes | join(\", \")) | Symptoms: \(.symptoms | join(\", \")) | Treatments: \(.treatments | join(\", \"))"',
            'text_content': False
        },
        "drugs.json": {
            'jq_schema': '.[] | "Drug: \(.drug_name) | Uses: \(.uses | join(\", \")) | Side Effects: \(.side_effects | join(\", \")) | Contraindications: \(.contraindications | join(\", \"))"',
            'text_content': False
        },
        "symptoms.json": {
            'jq_schema': '.[] | "Symptom: \(.symptom) | Possible Diseases: \(.possible_diseases | join(\", \")) | Related Conditions: \(.related_conditions | join(\", \"))"',
            'text_content': False
        },
        "medical_qna.json": {
            'jq_schema': '.[] | "Q: \(.question) | A: \(.answer) | Source: \(.source)"',
            'text_content': False
        }
    }
   
    for filename, loader_kwargs in loaders_config.items():
        file_path = os.path.join(DOCUMENT_DIR, filename)
        if os.path.exists(file_path):
            loader = JSONLoader(
                file_path,
                jq_schema=loader_kwargs['jq_schema'],
                text_content=loader_kwargs['text_content']
            )
            docs = loader.load()
            documents.extend(docs)
        else:
            print(f"Warning: {filename} not found in {DOCUMENT_DIR}")
    
    if not documents:
        raise ValueError("No documents found!")

    print("Raw content of first loaded document:")
    print(documents[0].page_content)    
    
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    docs = text_splitter.split_documents(documents)
    
    if not docs:
        raise ValueError("Text splitter produced no chunks!")
    
    print(f"Number of split documents: {len(docs)}")
    print("First 100 characters of the first split document:")
    print(docs[0].page_content[:100])
    
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vector_store = FAISS.from_documents(docs, embeddings)
    print(f"Number of documents: {len(docs)}")
    print("Sample document content:", docs[0].page_content[:100]) 
    vector_store.save_local("faiss_index")

if __name__ == "__main__":
    create_faiss_index()
