import React from 'react';
import './AboutUs.css'; // Ensure your CSS import is correct

const AboutUs = () => {
    return (
        <div className="about-us">
            <h1>About Us</h1>
            <p>
                Genmab is committed to pioneering innovative antibody therapeutics for cancer, aiming to expand its commercial footprint while enhancing patient outcomes. With a vision set for 2030, Genmab envisions its KYSO antibody medicines revolutionizing cancer and other diseases. However, to achieve this, Genmab recognizes the need for a comprehensive end-to-end customer experience. Identified gaps include a lack of holistic customer insight hindering organizational alignment and customer engagement. Addressing these issues is crucial for Genmab to maintain its industry-leading position. The E2E Customer Engagement project aims to deliver a seamless experience for Key Opinion Leaders by spring quarter's end, leveraging a tailored internal web application for improved engagement and analysis.
            </p>
            <section className="our-team">
                <h2>The Capstone Project Team</h2>
                <p>This website is a Capstone Project build by these students of University of Washington Electrical Engineering Department in year 2024.</p>
                <ul>
                    <li>Jeremy Chen</li>
                    <li>Blanca Liu</li>
                    <li>Peter Li</li>
                    <li>John Lou</li>
                    <li>Ningrui Yang</li>
                    <li>Doris Zhao</li>
                </ul>

                <h2>Special Thanks</h2>
                <p>We had a lot of help building this project, our TA and mentors are responsive in feedbacks. We are very grateful to them and would like to give special thanks to  them here:</p>
                    <li>Industry Mentor: Chris Leggett</li>
                    <li>Teaching Assistant: Rose Johnson</li>
                    <li>Faculty Mentor: Prof. Mahmood Hameed</li>
            </section>
        </div>
    );
}

export default AboutUs;
