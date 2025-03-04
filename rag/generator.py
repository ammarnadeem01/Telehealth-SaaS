import os
from langchain.llms import HuggingFaceHub

def get_llm():
    return HuggingFaceHub(
        repo_id="google/flan-t5-base",
        model_kwargs={"temperature": 0.5, "max_length": 256},
        huggingfacehub_api_token=os.getenv("HF_API_TOKEN")
    )
