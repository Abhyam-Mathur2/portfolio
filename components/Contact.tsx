"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import DecryptingText from "./DecryptingText";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "", // Standard EmailJS variable for sender's email
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // YOUR EMAILJS CONFIGURATION
  // Sign up at https://www.emailjs.com/
  // 1. Create a Service (e.g., Gmail) -> Get Service ID
  // 2. Create a Template -> Get Template ID
  //    (Use variables: {{from_name}}, {{reply_to}}, {{message}})
  // 3. Get your Public Key from Account > General
  const SERVICE_ID = "service_19bkx9v"; 
  const TEMPLATE_ID = "template_p8k4dns";
  const PUBLIC_KEY = "CHUGHwU9jrCFGZEJt";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.from_name || !formData.reply_to || !formData.message) return;

    setStatus("sending");

    if (formRef.current) {
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
          .then((result) => {
              console.log(result.text);
              setStatus("sent");
              setFormData({ from_name: "", reply_to: "", message: "" });
              setTimeout(() => setStatus("idle"), 5000);
          }, (error) => {
              console.log(error.text);
              setStatus("error");
              setTimeout(() => setStatus("idle"), 5000);
          });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <section id="contact" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <DecryptingText text="同盟" className="text-sm text-red-500/70 mb-2 font-serif" />
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Form an <span className="text-red-600">Alliance</span>
          </h2>
          <p className="text-gray-400">
            Send a raven or initiate a digital transmission. I am ready for the next challenge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Socials / Direct Info */}
          <div className="space-y-8">
            <motion.a
              href="mailto:abhyammathur78@gmail.com"
              whileHover={{ x: 10 }}
              className="flex items-center space-x-4 text-gray-300 hover:text-red-500 transition-colors group"
            >
              <div className="w-12 h-12 bg-[#1a1a1a] flex items-center justify-center rounded border border-gray-800 group-hover:border-red-600">
                <Mail />
              </div>
              <span className="font-mono">abhyammathur78@gmail.com</span>
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/abhyam-mathur-188a74319"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 10 }}
              className="flex items-center space-x-4 text-gray-300 hover:text-red-500 transition-colors group"
            >
              <div className="w-12 h-12 bg-[#1a1a1a] flex items-center justify-center rounded border border-gray-800 group-hover:border-red-600">
                <Linkedin />
              </div>
              <span className="font-mono">LinkedIn Profile</span>
            </motion.a>

            <motion.a
              href="https://github.com/Abhyam-Mathur"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 10 }}
              className="flex items-center space-x-4 text-gray-300 hover:text-red-500 transition-colors group"
            >
              <div className="w-12 h-12 bg-[#1a1a1a] flex items-center justify-center rounded border border-gray-800 group-hover:border-red-600">
                <Github />
              </div>
              <span className="font-mono">GitHub Profile</span>
            </motion.a>
          </div>

          {/* Form */}
          <motion.form
            ref={formRef}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            <div>
              <input
                suppressHydrationWarning
                type="text"
                name="from_name"
                value={formData.from_name}
                onChange={handleChange}
                placeholder="Your Name / Clan"
                required
                disabled={status === "sending" || status === "sent"}
                className="w-full bg-[#151515] border border-gray-800 p-4 text-white focus:outline-none focus:border-red-600 transition-colors placeholder:text-gray-600 disabled:opacity-50"
              />
            </div>
            <div>
              <input
                suppressHydrationWarning
                type="email"
                name="reply_to"
                value={formData.reply_to}
                onChange={handleChange}
                placeholder="Email Address"
                required
                disabled={status === "sending" || status === "sent"}
                className="w-full bg-[#151515] border border-gray-800 p-4 text-white focus:outline-none focus:border-red-600 transition-colors placeholder:text-gray-600 disabled:opacity-50"
              />
            </div>
            <div>
              <textarea
                suppressHydrationWarning
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message Content"
                required
                disabled={status === "sending" || status === "sent"}
                className="w-full bg-[#151515] border border-gray-800 p-4 text-white focus:outline-none focus:border-red-600 transition-colors placeholder:text-gray-600 disabled:opacity-50"
              />
            </div>
            <button
              suppressHydrationWarning
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className={`w-full font-serif py-4 transition-all flex items-center justify-center space-x-2 tracking-widest uppercase ${
                status === "sent" 
                  ? "bg-green-700 text-white hover:bg-green-600" 
                  : status === "error"
                  ? "bg-red-900 text-white hover:bg-red-800"
                  : "bg-red-700 text-white hover:bg-red-600 disabled:bg-gray-800 disabled:cursor-not-allowed"
              }`}
            >
              {status === "idle" && (
                <>
                  <span>Transmit</span>
                  <Send size={16} />
                </>
              )}
              {status === "sending" && (
                <>
                  <span>Transmitting...</span>
                  <Loader2 size={16} className="animate-spin" />
                </>
              )}
              {status === "sent" && (
                <>
                  <span>Transmitted</span>
                  <CheckCircle size={16} />
                </>
              )}
              {status === "error" && (
                <>
                  <span>Failed - Retry</span>
                  <AlertCircle size={16} />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
