
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on scope and complexity. A basic website typically takes 2-4 weeks, while complex web applications can take 2-3 months. We'll provide a detailed timeline during our initial consultation."
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer: "Yes! We offer comprehensive maintenance packages including security updates, content updates, performance monitoring, and technical support. We're here to ensure your digital presence continues to thrive."
  },
  {
    question: "What's included in your SEO services?",
    answer: "Our SEO services include keyword research, on-page optimization, technical SEO audits, content strategy, link building, and monthly performance reports. We focus on sustainable, white-hat practices that deliver long-term results."
  },
  {
    question: "Can you work with our existing brand guidelines?",
    answer: "Absolutely! We can work within your existing brand guidelines or help you develop new ones. Our design team is experienced in maintaining brand consistency across all digital touchpoints."
  },
  {
    question: "What platforms do you develop on?",
    answer: "We specialize in modern web technologies including React, Next.js, and other cutting-edge frameworks. We also work with popular CMS platforms like WordPress and custom solutions tailored to your needs."
  },
  {
    question: "How do you handle project communication?",
    answer: "We believe in transparent communication. You'll have a dedicated project manager, regular check-ins, access to our project portal, and we're always available via email or phone for urgent matters."
  }
];

const FAQ = () => {
  return (
    <section
      className="transition-colors duration-300"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-6">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4 transition-colors">
            Got questions? We've got answers. Here are some of the most common questions we receive.
          </p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-violet-500 via-emerald-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.header>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.05, ease: [0.25, 1, 0.5, 1] }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-gray-100 dark:bg-white/10 backdrop-blur-sm rounded-xl shadow-md dark:shadow-none
                           hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-250 px-6 py-2 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <AccordionTrigger
                      className="text-left text-lg font-semibold text-gray-900 dark:text-white
                              hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-4"
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pb-6 transition-colors group-hover:text-gray-900 dark:group-hover:text-white">
                      {faq.answer}
                    </AccordionContent>
                  </div>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
