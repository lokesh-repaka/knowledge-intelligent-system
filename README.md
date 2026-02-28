# Knowledge Intelligence System

A sophisticated full-stack AI-powered web application that enables users to upload documents and converse directly with their data using Retrieval-Augmented Generation (RAG).

## System Architecture

![Knowledge Intelligence System Architecture](.data/architecture.png)

The system implements a complete RAG pipeline with document ingestion, vector embeddings, semantic search, and LLM-powered responses.

## Project Overview

This project solves a critical enterprise challenge: **finding and utilizing information hidden across piles of documents**. Built as a production-ready, full-stack application, it combines cutting-edge AI with cloud infrastructure.

### Key Features

- 📄 **Multi-format Support**: Upload PDF and text files
- 🔍 **Semantic Search**: Find relevant documents using vector embeddings
- 💬 **Conversational AI**: Chat with your documents using an LLM
- ☁️ **Cloud Storage**: Scalable S3-based document storage
- 🏗️ **Modular Architecture**: Service-oriented design for maintainability
- 🎯 **RAG Pipeline**: Grounded responses that eliminate hallucinations

## What You Will Learn

✅ **RAG Mastery**: End-to-end Retrieval-Augmented Generation implementation using LangChain

✅ **Vector Databases**: Document ingestion, chunking, and embedding storage with ChromaDB

✅ **Full-Stack AI Development**: Flask REST API backend with HTML/CSS frontend

✅ **Cloud Operations**: AWS S3 integration for scalable document storage

✅ **Software Architecture**: Production-ready, modular Python application design

✅ **API Development**: RESTful endpoints for document upload and querying

## Why This Project?

🎯 **Real-World Use Case**: The "Chat with Data" problem is highly sought in enterprise environments

💼 **Full-Stack Competence**: Demonstrates UI, API, cloud infrastructure, and AI implementation skills

📈 **Production-Minded**: Showcases scalable, maintainable, service-oriented architecture

🚀 **Career Value**: Highly relevant for AI Engineer, Full-Stack Engineer, and AI/ML positions

## Tech Stack

| Component | Technology |
|-----------|------------|
| **AI Framework** | LangChain |
| **LLM** | Groq (Llama 3.1) |
| **Vector Database** | ChromaDB |
| **Embeddings** | HuggingFace |
| **Backend** | Flask (Python) |
| **Frontend** | HTML / CSS / JavaScript |
| **Cloud Storage** | Amazon S3 |
| **Document Processing** | PyPDF, Langchain Text Splitters |

## Project Modules

### 1. Foundations & Architecture
- Project overview and architecture
- Environment setup and configuration
- Project structure initialization

### 2. Cloud Infrastructure & Storage
- AWS S3 bucket creation and configuration
- IAM access key management
- S3 storage service implementation

### 3. Core AI Implementation
- LLM configuration (Groq API)
- Conversational retrieval chain setup
- Vector store initialization
- Embedding model integration

### 4. API, UI & Deployment
- Flask REST API endpoints
- HTML/CSS frontend interface
- Document upload handling
- Query processing and response delivery

## Installation & Setup

### Prerequisites
- Python 3.11+
- pip or conda
- AWS account (for S3 storage)
- Groq API key

### STEP 01: Create Virtual Environment

Using venv:
```bash
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

Or using conda:
```bash
conda create -n knowledge-system python=3.11 -y
conda activate knowledge-system
```

### STEP 02: Install Dependencies
```bash
pip install -r requirements.txt
```

### STEP 03: Configure Environment Variables

Create a `.env` file in the root directory:
```env
GROQ_LLM_API_KEY=your_groq_api_key_here
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_BUCKET_NAME=your_s3_bucket_name
```

### STEP 04: Run the Application
```bash
python app/main.py
```

The application will be available at `http://localhost:8080`

## Project Structure

```
knowledge-intelligent-system/
├── app/
│   ├── __init__.py
│   ├── main.py              # Flask app entry point
│   ├── config.py            # Configuration management
│   ├── models/
│   │   ├── __init__.py
│   │   └── vector_store.py  # ChromaDB vector store
│   ├── services/
│   │   ├── __init__.py
│   │   ├── llm_service.py   # LLM and RAG chain
│   │   └── storage_service.py # AWS S3 storage
│   ├── templates/
│   │   └── index.html       # Web UI
│   └── static/
│       ├── css/
│       │   └── style.css
│       └── js/
│           └── main.js
├── vector_db/               # ChromaDB storage
├── requirements.txt         # Python dependencies
├── .env                     # Environment variables
└── README.md
```

## API Endpoints

### Upload Document
```http
POST /upload
Content-Type: multipart/form-data

file: <PDF or TXT file>
```

**Response**:
```json
{
  "message": "File uploaded and processed successfully",
  "chunks_processed": 45
}
```

### Query Documents
```http
POST /query
Content-Type: application/json

{
  "question": "What is the main topic discussed?"
}
```

**Response**:
```json
{
  "response": "Based on the documents, the main topic is..."
}
```

### Home Page
```http
GET /
```

Returns the web interface for document upload and querying.

## Workflow

### Document Ingestion Flow
1. User uploads PDF/TXT file
2. Document is parsed and split into chunks
3. Chunks are embedded using HuggingFace embeddings
4. Embeddings are stored in ChromaDB
5. Metadata is logged and files are uploaded to S3

### Query & RAG Flow
1. User submits a question
2. Question is embedded
3. Vector search retrieves relevant document chunks
4. Retrieved chunks are used to build RAG prompt
5. LLM generates grounded response
6. Answer with sources is returned to user

## Configuration

### Key Configuration Options (app/config.py)

```python
GRAQ_LLM_API_KEY          # Groq API key for LLM
AWS_ACCESS_KEY_ID         # AWS access key
AWS_SECRET_ACCESS_KEY     # AWS secret key
AWS_BUCKET_NAME           # S3 bucket name
VECTOR_DB_PATH            # Path to ChromaDB storage
```

## Development

### Running in Debug Mode
```bash
export FLASK_ENV=development
python app/main.py
```

### Testing Document Upload
```bash
curl -X POST -F "file=@document.pdf" http://localhost:8080/upload
```

### Testing Query
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"question":"Your question here"}' \
  http://localhost:8080/query
```

## Performance Considerations

- **Chunk Size**: 1000 characters with 200-character overlap
- **Vector Similarity**: Top 4 most relevant chunks retrieved per query
- **Embedding Model**: HuggingFace embeddings for semantic understanding
- **LLM Temperature**: 0.7 for balanced creativity and consistency

## Future Enhancements

- Multi-language support
- Advanced document parsing (tables, images)
- User authentication and document access control
- Query history and analytics
- Real-time streaming responses
- Support for web scraping and API data sources
- Docker containerization
- Kubernetes deployment

## Troubleshooting

### Import Errors
If you encounter pydantic version issues:
```bash
pip install "pydantic<2.0"
```

### API Key Issues
Ensure your `.env` file is in the root directory and contains valid credentials.

### ChromaDB Errors
Clear the vector_db directory and restart:
```bash
rm -rf vector_db/
python app/main.py
```

## Contributing

Feel free to fork this project and submit pull requests for improvements.

## License

MIT License - See LICENSE file for details

## Contact & Support

For issues, questions, or suggestions, please open an issue in the GitHub repository.

---

**Built with ❤️ as a comprehensive full-stack AI engineering solution**