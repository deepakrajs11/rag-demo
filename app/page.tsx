/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState } from 'react';
import { Database, Search, Sparkles, AlertCircle, CheckCircle, Lightbulb, Rocket, FileText, Brain, Zap, ChevronRight, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const RAGPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter()
  const slides = [
    // Title Slide
    {
      type: "title",
      content: (
        <div className="flex flex-col items-center justify-center h-full bg-linear-to-br from-black via-slate-600 to-slate-950 text-white">
          <Brain className="w-24 h-24 mb-6 animate-pulse" />
          <h1 className="text-7xl font-bold mb-4">
            Retrieval Augmented Generation
          </h1>
          <h2 className="text-3xl font-light mb-8">RAG</h2>
          <p className="text-2xl opacity-90">Deepakraj S</p>
        </div>
      ),
    },

    // Agenda Slide
    {
      type: "content",
      title: "Agenda",
      content: (
        <div className="space-y-6 text-2xl">
          <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
            <div className="text-blue-600 font-bold text-3xl">01</div>
            <div>Limitations of Relying on LLM Alone</div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
            <div className="text-purple-600 font-bold text-3xl">02</div>
            <div>RAG: Giving LLMs Superpowers</div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition">
            <div className="text-pink-600 font-bold text-3xl">03</div>
            <div>Why RAG? The Challenge with Prompt Stuffing</div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition">
            <div className="text-indigo-600 font-bold text-3xl">04</div>
            <div>Setting Up a Vector Store</div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition">
            <div className="text-green-600 font-bold text-3xl">05</div>
            <div>Real-World Examples & Use Cases</div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition">
            <div className="text-orange-600 font-bold text-3xl">06</div>
            <div>Traditional DB vs Vector Store</div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition">
            <div className="text-teal-600 font-bold text-3xl">07</div>
            <div>Live Demo</div>
          </div>
        </div>
      ),
    },

    // Limitations Slide
    {
      type: "content",
      title: "Limitations of Relying on LLM Alone",
      content: (
        <div className="space-y-8">
          <div className="bg-linear-to-r from-blue-100 to-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <Brain className="w-8 h-8 mr-3 text-blue-600" />
              With Just LLM
            </h3>
            <p className="text-xl">
              You give a prompt → The LLM generates a response based on its
              pre-trained knowledge.
            </p>
          </div>

          <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
            <h3 className="text-2xl font-semibold mb-4 flex items-center text-red-700">
              <AlertCircle className="w-8 h-8 mr-3" />
              But Here's the Problem...
            </h3>
            <div className="space-y-4 text-xl">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p>
                  LLM doesn't know everything! It can't fetch real-time or
                  private company data
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p>It offers little or no personalization</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500 italic">
            <p className="text-xl text-center">
              "It's like asking someone to answer questions without letting them
              Google or look at their notes."
            </p>
          </div>
        </div>
      ),
    },

    // RAG Superpowers Slide
    {
      type: "content",
      title: "RAG: Giving LLMs Superpowers with External Knowledge",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-linear-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white text-center shadow-lg">
              <Search className="w-12 h-12 mx-auto mb-3" />
              <h4 className="font-bold text-xl">1. Retrieve</h4>
              <p className="text-sm mt-2">Knowledge Base</p>
            </div>
            <div className="bg-linear-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white text-center shadow-lg">
              <Database className="w-12 h-12 mx-auto mb-3" />
              <h4 className="font-bold text-xl">2. Augment</h4>
              <p className="text-sm mt-2">Add Context</p>
            </div>
            <div className="bg-linear-to-br from-pink-500 to-pink-600 p-6 rounded-xl text-white text-center shadow-lg">
              <Sparkles className="w-12 h-12 mx-auto mb-3" />
              <h4 className="font-bold text-xl">3. Generate</h4>
              <p className="text-sm mt-2">Accurate Answer</p>
            </div>
          </div>

          <div className="bg-linear-to-r from-green-100 to-green-50 p-8 rounded-xl border-2 border-green-500">
            <h3 className="text-2xl font-bold mb-6 flex items-center text-green-800">
              <Rocket className="w-8 h-8 mr-3" />
              How RAG Works
            </h3>
            <div className="space-y-4 text-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  1
                </div>
                <p>
                  You give a prompt → RAG searches a knowledge base for relevant
                  documents or information
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  2
                </div>
                <p>
                  These fetched data/documents are added as context to the LLM
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  3
                </div>
                <p>
                  Then the LLM generates a more accurate and grounded answer
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // Why RAG Slide
    {
      type: "content",
      title: "Why RAG? The Challenge with Prompt Stuffing",
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
            <h3 className="text-2xl font-semibold mb-4 flex items-center text-red-700">
              <AlertCircle className="w-8 h-8 mr-3" />
              The Problem: Prompt Stuffing
            </h3>
            <p className="text-lg mb-4">
              When answering questions using LLMs, we often try to include
              helpful context directly in the prompt. This is called "prompt
              stuffing" - adding all relevant information to help the model
              answer accurately.
            </p>
            <div className="bg-white p-4 rounded-lg mt-4">
              <p className="font-semibold text-red-600 mb-2">
                Issues when documents grow:
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <p>
                    The prompt size becomes too large → more token consumption
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <p>
                    Only a tiny portion of the context may be relevant to the
                    question
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-r from-green-100 to-green-50 p-6 rounded-xl border-l-4 border-green-500">
            <h3 className="text-2xl font-semibold mb-4 flex items-center text-green-700">
              <CheckCircle className="w-8 h-8 mr-3" />
              The Solution: RAG
            </h3>
            <div className="space-y-3 text-lg">
              <div className="flex items-start space-x-3">
                <Zap className="w-6 h-6 text-green-600 mt-1 shrink-0" />
                <p>Breaks large documents into smaller chunks</p>
              </div>
              <div className="flex items-start space-x-3">
                <Zap className="w-6 h-6 text-green-600 mt-1 shrink-0" />
                <p>
                  Only the most relevant chunks (retrieved using similarity
                  search) are added to the prompt
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Zap className="w-6 h-6 text-green-600 mt-1 shrink-0" />
                <p>Keeps the prompt compact and focused</p>
              </div>
              <div className="flex items-start space-x-3">
                <Zap className="w-6 h-6 text-green-600 mt-1 shrink-0" />
                <p>Improves accuracy and reduces token waste</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // What is RAG Slide
    {
      type: "content",
      title: "What is RAG?",
      content: (
        <div className="space-y-6">
          <div className="bg-linear-to-r from-purple-100 to-pink-100 p-8 rounded-xl border-2 border-purple-400">
            <h3 className="text-3xl font-bold mb-4 text-center text-purple-800">
              RAG = Retrieval + Augmentation + Generation
            </h3>
            <p className="text-xl text-center text-gray-700">
              A smart way to give language models access to external knowledge
              so they can give better, more accurate answers.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl">
            <h4 className="text-2xl font-semibold mb-4 text-blue-800">
              Example: Product Information Query
            </h4>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-xl mb-6 font-semibold text-gray-800">
                User: "Tell me about product XXXXXX"
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                  <Search className="w-8 h-8 text-blue-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-800">Retriever:</p>
                    <p className="text-gray-700">
                      Searches company docs, PDFs, or a vector database
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
                  <Database className="w-8 h-8 text-purple-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-purple-800">Augmentor:</p>
                    <p className="text-gray-700">
                      Picks the most relevant chunks of text
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                  <Sparkles className="w-8 h-8 text-green-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800">
                      Generator (LLM):
                    </p>
                    <p className="text-gray-700">
                      Writes an answer using that retrieved knowledge
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-100 rounded-lg border-l-4 border-green-500">
                <p className="text-lg font-semibold text-green-800">
                  ✓ More accurate, up-to-date, and personalized response!
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // Vector Store Slide
    {
      type: "content",
      title: "Setting Up a Vector Store",
      content: (
        <div className="space-y-6">
          <div className="bg-linear-to-r from-indigo-100 to-purple-100 p-6 rounded-xl border-2 border-indigo-400">
            <h3 className="text-2xl font-bold mb-4 flex items-center text-indigo-800">
              <Database className="w-8 h-8 mr-3" />
              What is a Vector Store (or Vector Database)?
            </h3>
            <p className="text-lg text-gray-700">
              A Vector Store is a special type of database designed to store and
              search data in the form of vectors (high-dimensional numerical
              representations).
            </p>
            <p className="text-lg text-gray-700 mt-3">
              These vectors represent semantic meaning of text, images, or
              audio, often generated using AI models (like embeddings from
              OpenAI).
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
            <h3 className="text-2xl font-bold mb-4 text-blue-800">
              Why Use Vectors?
            </h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="font-semibold text-red-600 mb-2">
                  ❌ Traditional Keyword Search is Limited
                </p>
                <p className="text-gray-700">
                  Only finds exact or similar words
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <p className="font-semibold text-green-600 mb-2">
                  ✓ Vector Search Understands Context
                </p>
                <p className="text-gray-700">
                  Enables semantic search based on meaning
                </p>
              </div>

              <div className="bg-linear-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                <p className="font-semibold text-orange-800 mb-2">Example:</p>
                <p className="text-gray-700">
                  Searching{" "}
                  <span className="font-semibold">
                    "How to fix a laptop screen"
                  </span>{" "}
                  will retrieve content related to{" "}
                  <span className="font-semibold">
                    "repairing a broken display"
                  </span>{" "}
                  even if exact words don't match.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // Examples & Use Cases Slide
    {
      type: "content",
      title: "Real-World Examples & Use Cases",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-linear-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg">
              <FileText className="w-12 h-12 mb-3" />
              <h4 className="text-xl font-bold mb-3">Customer Support</h4>
              <p className="text-sm">
                Instantly retrieve relevant support documentation and provide
                accurate answers to customer queries from company knowledge
                bases.
              </p>
            </div>

            <div className="bg-linear-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
              <Brain className="w-12 h-12 mb-3" />
              <h4 className="text-xl font-bold mb-3">Legal & Compliance</h4>
              <p className="text-sm">
                Search through thousands of legal documents and contracts to
                find relevant clauses and precedents quickly.
              </p>
            </div>

            <div className="bg-linear-to-br from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg">
              <Lightbulb className="w-12 h-12 mb-3" />
              <h4 className="text-xl font-bold mb-3">Research & Development</h4>
              <p className="text-sm">
                Help researchers find relevant papers, patents, and studies from
                vast scientific databases based on semantic similarity.
              </p>
            </div>

            <div className="bg-linear-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white shadow-lg">
              <Rocket className="w-12 h-12 mb-3" />
              <h4 className="text-xl font-bold mb-3">E-commerce</h4>
              <p className="text-sm">
                Provide personalized product recommendations and detailed
                product information by searching through catalogs semantically.
              </p>
            </div>
          </div>

          <div className="bg-linear-to-r from-pink-100 to-red-100 p-6 rounded-xl border-2 border-pink-400">
            <h4 className="text-xl font-bold mb-3 text-pink-800">
              More Use Cases:
            </h4>
            <div className="grid grid-cols-2 gap-3 text-gray-700">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Internal Knowledge Management</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Healthcare Diagnosis Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Educational Content Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Financial Analysis & Reports</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // Traditional DB vs Vector Store Slide
    {
      type: "content",
      title: "Traditional DB vs Vector Store",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-400">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                Traditional Database
              </h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-700 mb-2">
                    Search Method
                  </p>
                  <p className="text-gray-600">Exact keyword matching</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-700 mb-2">
                    Data Structure
                  </p>
                  <p className="text-gray-600">Rows and columns</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-700 mb-2">Use Case</p>
                  <p className="text-gray-600">Structured data queries</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-700 mb-2">Limitation</p>
                  <p className="text-gray-600">
                    Cannot understand context or meaning
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-blue-100 to-purple-100 p-6 rounded-xl border-2 border-blue-500">
              <h3 className="text-2xl font-bold mb-4 text-blue-800 text-center">
                Vector Store
              </h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="font-semibold text-blue-700 mb-2">
                    Search Method
                  </p>
                  <p className="text-gray-700">Semantic similarity search</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="font-semibold text-blue-700 mb-2">
                    Data Structure
                  </p>
                  <p className="text-gray-700">High-dimensional vectors</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="font-semibold text-blue-700 mb-2">Use Case</p>
                  <p className="text-gray-700">AI-powered semantic search</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="font-semibold text-blue-700 mb-2">Advantage</p>
                  <p className="text-gray-700">
                    Understands context and meaning
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-r from-green-100 to-teal-100 p-6 rounded-xl border-l-4 border-green-500">
            <p className="text-xl font-semibold text-green-800 text-center">
              Vector stores enable RAG systems to find semantically relevant
              information, not just keyword matches!
            </p>
          </div>
        </div>
      ),
    },

    // Naive vs Advanced RAG Slide
    {
      type: "content",
      title: "Naive RAG vs Advanced RAG",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-400">
              <h3 className="text-2xl font-bold mb-4 text-orange-800 text-center">
                Naive RAG
              </h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-orange-700 mb-2">Approach</p>
                  <p className="text-gray-600">Simple retrieval + generation</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-orange-700 mb-2">Process</p>
                  <p className="text-gray-600">
                    Direct chunk retrieval without optimization
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-orange-700 mb-2">
                    Challenges
                  </p>
                  <p className="text-gray-600">
                    May retrieve irrelevant chunks, lacks context awareness
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-purple-100 to-indigo-100 p-6 rounded-xl border-2 border-purple-500">
              <h3 className="text-2xl font-bold mb-4 text-purple-800 text-center">
                Advanced RAG
              </h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="font-semibold text-purple-700 mb-2">Approach</p>
                  <p className="text-gray-700">
                    Sophisticated retrieval strategies
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="font-semibold text-purple-700 mb-2">Process</p>
                  <p className="text-gray-700">
                    Query rewriting, re-ranking, hybrid search
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="font-semibold text-purple-700 mb-2">Benefits</p>
                  <p className="text-gray-700">
                    Higher accuracy, better context understanding
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-r from-blue-100 to-cyan-100 p-6 rounded-xl border-l-4 border-blue-500">
            <h4 className="text-xl font-bold mb-3 text-blue-800">
              Advanced RAG Techniques Include:
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <span>Query Expansion & Rewriting</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <span>Hybrid Search (Dense + Sparse)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <span>Re-ranking Retrieved Documents</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <span>Contextual Chunk Embedding</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // Demo Slide
    {
      type: "content",
      title: "Live Demo",
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <button
            className="bg-linear-to-br from-teal-400 to-cyan-500 p-12 rounded-3xl shadow-2xl"
            onClick={() => router.push("/chatbot")}
          >
            <Rocket className="w-32 h-32 text-white animate-pulse mx-auto" />
          </button>

          <h1 className="text-4xl font-bold text-gray-800 text-center">
            RAG System in Action
          </h1>
        </div>
      ),
    },

    {
      type: "title",
      content: (
        <div className="flex flex-col items-center justify-center h-full bg-linear-to-br from-black via-slate-600 to-slate-950 text-white">
          <Sparkles className="w-24 h-24 mb-6 animate-bounce" />
          <h1 className="text-7xl font-bold mb-6">Questions!</h1>
        </div>
      ),
    },
  ];
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="w-full h-screen bg-gray-900 flex flex-col">
      {/* Slide Container */}
      <div className="flex-1 relative bg-white overflow-hidden">
        {currentSlideData.type === "title" ? (
          currentSlideData.content
        ) : (
          <div className="h-full p-12 flex flex-col">
            <h2 className="text-5xl font-bold mb-8 text-gray-800 border-b-4 border-blue-500 pb-4">
              {currentSlideData.title}
            </h2>
            <div className="flex-1 overflow-auto">
              {currentSlideData.content}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Bar */}
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
            currentSlide === 0
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <div className="flex items-center space-x-4">
          <span className="text-sm">
            Slide {currentSlide + 1} of {slides.length}
          </span>
          <div className="flex space-x-1">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition ${
                  index === currentSlide ? "bg-blue-500 w-8" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
            currentSlide === slides.length - 1
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default RAGPresentation;