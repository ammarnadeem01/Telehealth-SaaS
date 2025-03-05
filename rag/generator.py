import os
from langchain_community.llms import HuggingFaceHub
from dotenv import load_dotenv

# Load .env file
load_dotenv()
def get_llm():
    return HuggingFaceHub(
        repo_id="google/flan-t5-base",
        model_kwargs={"temperature": 0.5, "max_length": 256},
        huggingfacehub_api_token=os.getenv("HUGGINGFACEHUB_API_TOKEN")
    )
    