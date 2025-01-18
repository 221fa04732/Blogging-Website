import BlogCard from "../components/BlogCard";

export default function Blogs() {
  return (
    <div className="bg-stone-800 min-h-screen flex flex-col items-center">
      <BlogCard
        userName="Mrityunjay Kumar"
        postDate="18 Jan 2025"
        title="Easy Way to Learn DSA"
        content="Data Structures and Algorithms (DSA) form the foundation of computer science. Start with understanding basic data structures like arrays, stacks, queues, and linked lists. Gradually move to more complex topics like trees, graphs, and hash maps. Practice is key—solve problems daily on platforms like LeetCode or CodeChef to build confidence and proficiency."
      />

      <BlogCard
        userName="John Doe"
        postDate="15 Jan 2025"
        title="Mastering JavaScript in 2025"
        content="JavaScript remains one of the most popular programming languages. Focus on core concepts like closures, asynchronous programming, and the event loop. Explore modern frameworks like React, Vue, or Svelte to stay competitive. Hands-on projects, such as building a to-do app or a real-time chat application, can significantly enhance your skills."
      />

      <BlogCard
        userName="Jane Smith"
        postDate="10 Jan 2025"
        title="Understanding Artificial Intelligence"
        content="Artificial Intelligence (AI) is transforming industries. Begin by learning the basics of machine learning and neural networks. Tools like TensorFlow and PyTorch are widely used for developing AI applications. Practical projects, such as creating a chatbot or a recommendation system, can deepen your understanding of this exciting field. Additionally, understanding the ethical implications of AI, such as bias and decision transparency, is becoming increasingly important."
      />

      <BlogCard
        userName="Alice Johnson"
        postDate="05 Jan 2025"
        title="The Ultimate Guide to Web Development in 2025"
        content="Web development has evolved rapidly over the years. In 2025, it's important to be proficient in frontend technologies like React, Angular, or Vue.js, and backend tools like Node.js or Django. Mastering CSS frameworks such as TailwindCSS can greatly speed up UI development. For aspiring developers, understanding RESTful APIs, GraphQL, and database management systems like MongoDB or PostgreSQL is essential. Don’t forget to prioritize responsive design and accessibility to ensure your applications reach a broader audience."
      />

      <BlogCard
        userName="Robert Brown"
        postDate="01 Jan 2025"
        title="Demystifying Cloud Computing"
        content="Cloud computing has become a cornerstone of modern IT infrastructure. Services like AWS, Azure, and Google Cloud offer tools for scalable application deployment, serverless computing, and big data analytics. Start by understanding the basics of Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). Dive into practical applications by setting up virtual machines, configuring storage solutions, and deploying containerized applications with Docker and Kubernetes. Cloud certifications can also give you a significant edge in the job market. Cloud computing has become a cornerstone of modern IT infrastructure. Services like AWS, Azure, and Google Cloud offer tools for scalable application deployment, serverless computing, and big data analytics. Start by understanding the basics of Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). Dive into practical applications by setting up virtual machines, configuring storage solutions, and deploying containerized applications with Docker and Kubernetes. Cloud certifications can also give you a significant edge in the job market."
      />

      <BlogCard
        userName="Sophia Davis"
        postDate="28 Dec 2024"
        title="Exploring Blockchain Beyond Cryptocurrency"
        content="Blockchain technology has applications far beyond cryptocurrencies like Bitcoin. Its decentralized and secure nature makes it suitable for supply chain management, healthcare, and voting systems. Smart contracts, enabled by platforms like Ethereum, automate transactions without intermediaries. For developers, learning Solidity and understanding the mechanics of distributed ledgers are great starting points. Despite its potential, challenges like scalability and energy consumption remain key areas of focus for the future of blockchain."
      />
    </div>
  );
}
