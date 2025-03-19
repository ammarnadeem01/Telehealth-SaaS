import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
  category?: string;
  tags?: string[];
  relatedQuestions?: string[];
  experienceRelatedQuestions?: string[];
  lastUpdated?: string;
}

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Create refs for each FAQ item
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

  const faqs: FAQItem[] = [
    {
      question: "How does your AI diagnostic system ensure accuracy?",
      answer: (
        <>
          Our diagnostic AI combines multiple advanced technologies:
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>
              <strong>Multimodal Analysis:</strong> Processes symptoms, medical
              history, and lab results using transformer-based models
            </li>
            <li>
              <strong>Clinical Validation:</strong> Verified against DSM-5 and
              ICD-10 coding standards with 98.6% consensus rate
            </li>
            <li>
              <strong>Continuous Learning:</strong> Updated weekly with latest
              medical research from PubMed and clinical trials
            </li>
          </ul>
        </>
      ),
      category: "Technology",
      tags: ["AI", "Diagnostics", "Security"],
      relatedQuestions: [
        "What medical certifications does your AI have?",
        "How often is your medical database updated?",
      ],
      experienceRelatedQuestions: [
        "What has been the user experience with your AI diagnostic system?",
        "Are there any testimonials about the system's performance?",
      ],
      lastUpdated: "2024-03-15",
    },
    {
      question: "What security measures protect my health data?",
      answer: (
        <div className="space-y-4">
          <p>We implement enterprise-grade security protocols:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">Encryption</h3>
              <p>AES-256 encryption both in transit (TLS 1.3) and at rest</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">Certifications</h3>
              <p>HIPAA compliant • ISO 27001 certified • SOC 2 Type II</p>
            </div>
          </div>
        </div>
      ),
      category: "Security",
      tags: ["Privacy", "Compliance"],
      lastUpdated: "2024-02-28",
    },
    {
      question: "How do I interpret my treatment recommendations?",
      answer: (
        <>
          <p className="mb-4">Our recommendations include:</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-start">
              <span className="shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
                1
              </span>
              <div>
                <h4 className="font-medium">Evidence Rating</h4>
                <p className="text-sm text-gray-600">
                  Class I-III evidence scoring system
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
                2
              </span>
              <div>
                <h4 className="font-medium">Confidence Level</h4>
                <p className="text-sm text-gray-600">
                  Percentage-based confidence metric
                </p>
              </div>
            </div>
          </div>
        </>
      ),
      category: "Usage",
      tags: ["Treatment", "Results"],
      lastUpdated: "2024-03-10",
    },
  ];

  const categories = ["All", "Technology", "Security", "Usage"];

  const filteredFaqs = faqs.filter(
    (faq) =>
      (selectedCategory === "All" || faq.category === selectedCategory) &&
      (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer
          ?.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        faq.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  // Add this function inside your component (before the return statement)
  const handleContactSupport = () => {
    window.location.href =
      "mailto:nadeemammar04@gmail.com?subject=Support%20Request&body=Please%20describe%20your%20question%20or%20issue...";
  };

  // Update the contact support button JSX to:
  <button
    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
    onClick={handleContactSupport}
  >
    Contact Support
  </button>;
  // Helper to open and scroll to a FAQ item based on its question text
  const handleRelatedQuestionClick = (question: string) => {
    const index = faqs.findIndex((faq) => faq.question === question);
    if (index !== -1) {
      setOpenIndex(index);
      // Scroll into view smoothly if ref exists
      faqRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Knowledge Base
          </h2>
          <p className="text-xl text-gray-600">
            Answers to common questions about our medical AI platform
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full px-6 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute right-6 top-4 h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          <AnimatePresence>
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                ref={(el) => {
                  faqRefs.current[index] = el as HTMLDivElement;
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <button
                  className="w-full text-left p-8 hover:bg-gray-50 transition-colors"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {faq.question}
                      </h3>
                      <div className="mt-2 flex gap-2">
                        {faq.tags?.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      className="shrink-0 ml-4"
                    >
                      <svg
                        className="h-8 w-8 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-8 pb-8 pt-4 border-t border-gray-100"
                    >
                      <div className="text-gray-600 space-y-6">
                        {faq.answer}

                        {(faq.relatedQuestions ||
                          faq.experienceRelatedQuestions) && (
                          <div className="mt-6 pt-6 border-t border-gray-100">
                            <h4 className="font-medium mb-3">
                              Related Questions
                            </h4>
                            <ul className="space-y-2">
                              {faq.relatedQuestions?.map((question, qIndex) => (
                                <li
                                  key={`related-${qIndex}`}
                                  className="text-blue-600 hover:underline cursor-pointer"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleRelatedQuestionClick(question);
                                  }}
                                >
                                  {question}
                                </li>
                              ))}
                              {faq.experienceRelatedQuestions?.map(
                                (question, qIndex) => (
                                  <li
                                    key={`experience-${qIndex}`}
                                    className="text-blue-600 hover:underline cursor-pointer"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleRelatedQuestionClick(question);
                                    }}
                                  >
                                    {question}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                          {faq.lastUpdated && (
                            <div className="text-sm text-gray-500">
                              Last updated: {faq.lastUpdated}
                            </div>
                          )}
                          <div className="flex gap-4">
                            <button className="text-sm text-gray-500 hover:text-blue-600 flex items-center">
                              <svg
                                className="w-5 h-5 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 15l7-7 7 7"
                                />
                              </svg>
                              Helpful
                            </button>
                            <button className="text-sm text-gray-500 hover:text-blue-600 flex items-center">
                              <svg
                                className="w-5 h-5 mr-1 transform rotate-180"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 15l7-7 7 7"
                                />
                              </svg>
                              Not Helpful
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Didn't find what you're looking for?
          </p>
          <button
            onClick={handleContactSupport}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
