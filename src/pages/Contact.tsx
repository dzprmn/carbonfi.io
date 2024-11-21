// src/pages/Contact.tsx
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/shared/Button';
import {FaMapMarkerAlt, FaEnvelope, FaTelegramPlane} from 'react-icons/fa';
import React, { useState } from 'react';

interface ContactInfo {
    icon: JSX.Element;
    title: string;
    content: string | JSX.Element;
}

const CONTACT_INFO: ContactInfo[] = [
    {
        icon: <FaMapMarkerAlt className="w-6 h-6" />,
        title: "Office Location",
        content: "East Ringroad No. 52, Yogyakarta, Indonesia"
    },
    {
        icon: <FaTelegramPlane className="w-6 h-6" />,
        title: "Join Us",
        content: (
            <a
                href="https://t.me/carbonfihq"
                className="hover:text-primary transition-colors"
            >
                CarbonFiHQ
            </a>
        )
    },
    {
        icon: <FaEnvelope className="w-6 h-6" />,
        title: "Email Address",
        content: (
            <a
                href="mailto:hq@carbonfi.io"
                className="hover:text-primary transition-colors"
            >
                hq@carbonfi.io
            </a>
        )
    }
];

export const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <main>
            {/* Hero Section */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/about-shape-1.png"
                        alt=""
                        className="absolute top-32 right-20 animate-pulse hidden 2xl:block"
                        draggable={false}
                    />
                    <img
                        src="/images/roadmap-bg.jpg"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/50 to-white/55" />
                </div>

                <Container className="relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Contact Us
                        </h1>
                        <p className="text-lg text-gray-600">
                            Get in touch with our team for any questions about CarbonFi
                            or how we can help you with carbon credit trading.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 bg-white">
                <Container>
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {CONTACT_INFO.map((info, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 p-8 rounded-2xl text-center
                                         hover:shadow-lg hover:-translate-y-1
                                         transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-full
                                            flex items-center justify-center mx-auto mb-4
                                            text-primary">
                                    {info.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {info.title}
                                </h3>
                                <div className="text-gray-600">
                                    {info.content}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Contact Form */}
                        <div className="mr-4">
                            {/*<h5 className="font-AlbertSans font-medium text-PrimaryColor-0 flex items-center gap-2">*/}
                            {/*    GET IN TOUCH*/}
                            {/*</h5>*/}
                            <h1 className="font-AlbertSans text-primary font-bold text-[22px] leading-8 sm:text-[38px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[40px] xl:leading-[50px] 2xl:text-[46px] 2xl:leading-[56px] text-HeadingColor-0 mt-5 mb-10">
                                Write Us Something
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex flex-col md:flex-row gap-7">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Your Name*"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200
                                               focus:outline-none focus:ring-2 focus:ring-primary/20
                                               focus:border-primary transition-all"
                                    />
                                    <input
                                        type="text"
                                        name="number"
                                        id="number"
                                        placeholder="Your Email*"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200
                                               focus:outline-none focus:ring-2 focus:ring-primary/20
                                               focus:border-primary transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder="Subject*"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200
                                               focus:outline-none focus:ring-2 focus:ring-primary/20
                                               focus:border-primary transition-all"
                                        required
                                    />
                                </div>
                                <textarea
                                    name="message"
                                    id="message"
                                    placeholder="Write A Message..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200
                                               focus:outline-none focus:ring-2 focus:ring-primary/20
                                               focus:border-primary transition-all"
                                    required
                                />
                                <Button type="submit" variant="primary" className="w-full">
                                    Send Message
                                </Button>
                            </form>
                        </div>

                        {/* Map or Additional Content */}
                        <div className="relative">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                                {/* Replace this with your actual map implementation */}
                                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                                    <p className="text-gray-500">Map placeholder</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
};