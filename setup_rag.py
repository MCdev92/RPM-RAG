from dotenv import load_dotenv
load_dotenv()
from pinecone import Pinecone, ServerlessSpec
import openai
import os
import json

# Initialize Pinecone using the new instance-based approach
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

# Check if the index already exists
if "rag" not in pc.list_indexes().names():
    # Create a Pinecone index
    pc.create_index(
        name="rag",
        dimension=1536,
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1"),
    )

# Load the review data
with open("reviews.json") as file:
    data = json.load(file)

processed_data = []

# Create embeddings for each review
for review in data["reviews"]:
    response = openai.embeddings.create(
        input=review['review'], model="text-embedding-ada-002"
    )
    embedding = response['data'][0]['embedding']
    processed_data.append(
        {
            "values": embedding,
            "id": review["professor"],
            "metadata": {
                "review": review["review"],
                "subject": review["subject"],
                "stars": review["stars"],
            }
        }
    )

# Insert the embeddings into the Pinecone index
index = pc.Index("rag")
upsert_response = index.upsert(
    vectors=processed_data,
    namespace="ns1",
)
print(f"Upserted count: {upsert_response['upserted_count']}")

# Print index statistics
print(index.describe_index_stats())
