// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center max-w-3xl"
            >
                <h1 className="text-5xl font-extrabold text-emerald-800 mb-4 tracking-tight">
                    Asian Institute of Ayurveda
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                    Your wellness journey starts here. Book appointments with certified Ayurveda doctors,
                    access natural healing therapies, and explore holistic care.
                </p><br />
                <Link to="/book">
                    <button className="bg-emerald-600 text-dark text-lg px-3 py-3 rounded-2xl shadow-lg hover:bg-emerald-700 transition-all duration-300">
                        Book an Appointment
                    </button>
                </Link>
            </motion.div>
            <br /><br />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-12"
            >
                <img
                    src="ayur.jpg"
                    alt="Ayurveda Wellness"
                    className="rounded-3xl shadow-xl max-w-full h-auto"
                />
            </motion.div>
            <hr /><br />

            <section id="about" class="py-5 bg-light">
                <div class="container">
                    <h2 class="text-center mb-4">About The Doctor</h2>
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <img src="doctor.jpg" alt="Dr. Vishwanath S. Wasedar" class="img-fluid rounded shadow" />
                        </div>
                        <div class="col-md-6">
                            <h3>Asian Institute of Ayurveda</h3>
                            <p>
                                Welcome to the <strong>Asian Institute of Ayurveda</strong>, where ancient wisdom meets modern care. We’re led by <strong>Dr. Vishwanath S. Wasedar</strong>, MD in Panchakarma and Associate Professor at KLE Ayurveda Mahavidyalaya, Belagavi.
                            </p>
                            <p>
                                With vast experience in treating complex conditions like Deep Vein Thrombosis and stroke paralysis using classical medicines such as <em>Punarnavadi Mandoor</em> and <em>Shiva Gutika</em>, Dr. Wasedar combines tradition with evidence-based healing.
                            </p>
                            <p>
                                He’s also a passionate academician, fluent in Kannada, Hindi, Marathi, and English — committed to spreading the value of Ayurveda across the globe.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <footer class="bg-dark text-white py-4 mt-5">
  <div class="container text-center">
    <p class="mb-1">&copy; 2025 Asian Institute of Ayurveda. All rights reserved.</p>
    <p class="mb-0">
      📍 Belagavi, Karnataka | 📞 +91 98765 43210 | ✉️ contact@asianayurveda.in
    </p>
    <small class="d-block mt-2">Designed with ❤️ using Ayurveda principles</small>
  </div>
</footer>


        </div>
    );
};

export default LandingPage;
