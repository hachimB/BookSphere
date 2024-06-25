import React from 'react';
import '../styles/About.css';

function About() {
  return (
    <section id="about" className="about">
      <div className="about-content">
        <h2>About BookSphere</h2>
        <p>BookSphere was born out of a shared passion for literature and the desire to create a platform where book enthusiasts can discover, explore, and engage with a wide array of books.</p>
        <p>Our team is dedicated to providing a user-friendly experience that connects readers with the stories that inspire, challenge, and entertain.</p>
        <p>Explore BookSphere today and embark on a journey through the world of literature!</p>

        <h3>Meet the Team</h3>
        <div className="row">
          <div className="col-lg-4 col-md-4">
            <div className="member-details">
              <h4>Member 1:<br></br>Houcine Walaq</h4>
              <ul>
                <li><a href="https://www.linkedin.com/in/houcine-walaq/">View - LinkedIn</a></li>
                <li><a href="https://github.com/houcine200">View - GitHub</a></li>
                <li><a href="https://twitter.com/pwnzor2">View - Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="member-details">
              <h4>Member 2:<br></br>Hamza El imali</h4>
              <ul>
                <li><a href="https://www.linkedin.com/in/hamza-elimali/">View - LinkedIn</a></li>
                <li><a href="https://github.com/Reallynoobcoder">View - GitHub</a></li>
                <li><a href="https://twitter.com/elimali_hamza">View - Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="member-details">
              <h4>Member 3:<br></br>Hachim Boubacar</h4>
              <ul>
                <li><a href="https://www.linkedin.com/in/hachim-boubacar-475831254/">View - LinkedIn</a></li>
                <li><a href="https://github.com/hachimB">View - GitHub</a></li>
                <li><a href="https://twitter.com/Hachimboubacar?t=2Kl0vamyEMgY367YfJczOA&s=33">View - Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>

        <h3>Project Repository</h3>
        <p>Explore the codebase on <a href="https://github.com/hachimB/BookSphere">GitHub</a>.</p>

        <p>This project is a Portfolio Project for <a href="https://www.alxafrica.com/">ALX</a>.</p>
      </div>
    </section>
  );
}

export default About;
