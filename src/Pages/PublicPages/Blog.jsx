import React, { useState } from "react";
import { motion } from "framer-motion";
import { Footer } from "../HomePage/NavbarFooterSection/Footer";
import { Navbar } from "../Navbar/Navbar";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Articles" },
    { id: "health", name: "Health Tips" },
    { id: "stories", name: "Success Stories" },
    { id: "news", name: "News & Updates" },
    { id: "guides", name: "Guides" }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Essential Health Benefits of Blood Donation",
      excerpt:
        "Discover the amazing health benefits that come with regular blood donation.",
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=500&fit=crop",
      category: "health",
      author: "Dr. Sarah Ahmed",
      date: "2025-01-10",
      readTime: "5 min read",
      link: "https://healthmatters.nyp.org/the-surprising-benefits-of-donating-blood/"
    },
    {
      id: 2,
      title: "How One Donation Saved Three Lives",
      excerpt:
        "An inspiring story of how a single blood donation saved three lives.",
      image:
        "https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?w=800&h=500&fit=crop",
      category: "stories",
      author: "Fatima Khan",
      date: "2025-01-08",
      readTime: "7 min read",
      link: "https://www.wcbs.org.za/2024/11/28/the-ultimate-deal-how-one-blood-donation-can-save-up-to-three-lives/"
    },
    {
      id: 3,
      title: "Complete Guide to Blood Donation",
      excerpt:
        "Everything you need to know about eligibility, process, and care.",
      image:
        "https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=800&h=500&fit=crop",
      category: "guides",
      author: "Dr. Rahman Ali",
      date: "2025-01-05",
      readTime: "10 min read",
      link: "https://www.blood.ca/en/blood/donating-blood/donation-process"
    },
    {
      id: 4,
      title: "LifeFlow Reaches 50,000 Lives Saved",
      excerpt:
        "A milestone achievement made possible by our donors.",
      image:
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=500&fit=crop",
      category: "news",
      author: "LifeFlow Team",
      date: "2025-01-03",
      readTime: "4 min read",
      link: "https://www.unicef.org"
    },
    {
      id: 5,
      title: "Understanding Blood Types",
      excerpt:
        "Learn blood type compatibility and why it matters.",
      image:
        "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=500&fit=crop",
      category: "health",
      author: "Dr. Nasrin Akter",
      date: "2025-01-01",
      readTime: "6 min read",
      link: "https://www.blood.ca/en/blood/donating-blood/what-my-blood-type"
    },
    {
      id: 6,
      title: "First-Time Donor Guide",
      excerpt:
        "Step-by-step guide for first-time blood donors.",
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=500&fit=crop",
      category: "guides",
      author: "Ahmad Hassan",
      date: "2024-12-28",
      readTime: "8 min read",
      link: "https://www.blood.ca/en/stories/everything-you-need-know-about-donating-blood-guide-first-timers"
    }
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const badgeColor = (cat) =>
    ({
      health: "bg-emerald-100 text-emerald-700",
      stories: "bg-blue-100 text-blue-700",
      news: "bg-amber-100 text-amber-700",
      guides: "bg-purple-100 text-purple-700"
    }[cat]);

  return (
    <div className="min-h-screen">
        <Navbar></Navbar>


      {/* HERO */}
      <section className="bg-gradient-to-br from-rose-600 to-rose-800 py-20 text-center text-white px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Stories, Tips & Updates
          </h1>
          <p className="text-rose-100 max-w-2xl mx-auto">
            Inspiring stories, health tips, and community updates.
          </p>
        </motion.div>
      </section>

      {/* SEARCH + FILTER */}
      <section className="bg-gray-50 border-b py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 justify-between">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-96 h-12 px-4 rounded-xl border"
          />

       <div className="flex flex-wrap gap-2 justify-center">
  {categories.map((c) => (
    <button
      key={c.id}
      onClick={() => setSelectedCategory(c.id)}
      className={`px-4 py-2 rounded-xl border whitespace-nowrap transition ${
        selectedCategory === c.id
          ? "bg-rose-600 text-white"
          : "bg-white hover:bg-gray-100"
      }`}
    >
      {c.name}
    </button>
  ))}
</div>

        </div>
      </section>

      {/* BLOG GRID */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={post.image}
                alt={post.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-6">
                <span
                  className={`inline-block mb-3 px-3 py-1 rounded-full text-xs ${badgeColor(
                    post.category
                  )}`}
                >
                  {post.category}
                </span>

                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                <div className="text-sm text-gray-500 mb-4">
                  {post.readTime}
                </div>

                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-600 font-medium hover:underline"
                >
                  View Details →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}
