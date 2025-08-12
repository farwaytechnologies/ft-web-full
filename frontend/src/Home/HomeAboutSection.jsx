import React from 'react';

function ModernAboutSection() {
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

    :root {
      --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      --dark-bg: #0a0a0f;
      --card-bg: rgba(255, 255, 255, 0.05);
      --text-primary: #ffffff;
      --text-secondary: rgba(255, 255, 255, 0.7);
      --text-tertiary: rgba(255, 255, 255, 0.5);
      --border-color: rgba(255, 255, 255, 0.1);
      --glow-color: rgba(102, 126, 234, 0.3);
      --section-padding: 120px 0;
    }

    * {
      box-sizing: border-box;
    }

    .modern-about-section {
      position: relative;
      background: var(--dark-bg);
      padding: var(--section-padding);
      overflow: hidden;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: var(--text-primary);
      min-height: 100vh;
      display: flex;
      align-items: center;
    }

    .modern-about-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
      position: relative;
      z-index: 2;
    }

    .modern-about-content {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    /* Text Section */
    .modern-about-text {
      animation: slideInLeft 1s ease-out;
    }

    .section-badge {
      display: inline-block;
      padding: 0.5rem 1.5rem;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 50px;
      backdrop-filter: blur(20px);
      margin-bottom: 2rem;
      position: relative;
      overflow: hidden;
    }

    .section-badge::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      animation: shimmer 3s infinite;
    }

    .section-badge span {
      font-size: 0.875rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-secondary);
    }

    .section-title {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 2rem;
      letter-spacing: -0.02em;
    }

    .gradient-text {
      background: var(--primary-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      position: relative;
    }

    .main-description {
      font-size: 1.25rem;
      line-height: 1.7;
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
      font-weight: 400;
    }

    .sub-description {
      font-size: 1.125rem;
      line-height: 1.6;
      color: var(--text-tertiary);
      margin-bottom: 3rem;
      font-weight: 300;
    }

    /* Specializations */
    .specializations-grid {
      margin-bottom: 3rem;
    }

    .specializations-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: var(--text-primary);
    }

    .specializations-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .spec-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      backdrop-filter: blur(20px);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .spec-item:hover {
      transform: translateY(-4px);
      border-color: rgba(102, 126, 234, 0.5);
      box-shadow: 0 20px 40px rgba(102, 126, 234, 0.1);
    }

    .spec-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
      transition: left 0.6s ease;
    }

    .spec-item:hover::before {
      left: 100%;
    }

    .spec-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .spec-item span {
      font-weight: 500;
      color: var(--text-secondary);
    }

    /* CTA Section */
    .cta-section {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .modern-cta-button {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 2rem;
      background: var(--primary-gradient);
      border: none;
      border-radius: 50px;
      color: white;
      font-size: 1.125rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
      width: fit-content;
      cursor: pointer;
    }

    .modern-cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 50px rgba(102, 126, 234, 0.4);
    }

    .modern-cta-button svg {
      transition: transform 0.3s ease;
    }

    .modern-cta-button:hover svg {
      transform: translate(4px, -4px);
    }

    .stats-row {
      display: flex;
      gap: 3rem;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .stat-number {
      font-size: 2rem;
      font-weight: 800;
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--text-tertiary);
      font-weight: 400;
    }

    /* Visual Section */
    .modern-about-visual {
      animation: slideInRight 1s ease-out;
    }

    .visual-container {
      position: relative;
      height: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .floating-elements {
      position: absolute;
      inset: 0;
    }

    .float-element {
      position: absolute;
      border-radius: 50%;
      opacity: 0.6;
    }

    .element-1 {
      width: 80px;
      height: 80px;
      background: var(--primary-gradient);
      top: 10%;
      left: 10%;
      animation: float 6s ease-in-out infinite;
    }

    .element-2 {
      width: 60px;
      height: 60px;
      background: var(--secondary-gradient);
      top: 20%;
      right: 15%;
      animation: float 8s ease-in-out infinite reverse;
    }

    .element-3 {
      width: 40px;
      height: 40px;
      background: var(--accent-gradient);
      bottom: 25%;
      left: 20%;
      animation: float 7s ease-in-out infinite;
    }

    .element-4 {
      width: 100px;
      height: 100px;
      background: linear-gradient(135deg, rgba(245, 87, 108, 0.3), rgba(240, 147, 251, 0.3));
      bottom: 10%;
      right: 10%;
      animation: float 9s ease-in-out infinite reverse;
    }

    .main-visual {
      width: 300px;
      height: 300px;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 24px;
      backdrop-filter: blur(20px);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 2;
    }

    .visual-content {
      padding: 2rem;
    }

    .code-lines {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .code-line {
      height: 12px;
      background: var(--primary-gradient);
      border-radius: 6px;
      opacity: 0.7;
      animation: pulse 2s ease-in-out infinite;
      width: 100%;
    }

    .code-line.short {
      width: 60%;
      animation-delay: 0.2s;
    }

    .code-line.medium {
      width: 80%;
      animation-delay: 0.4s;
    }

    .glow-effect {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, var(--glow-color), transparent 70%);
      border-radius: 50%;
      animation: breathe 4s ease-in-out infinite;
      z-index: 1;
    }

    /* Background Elements */
    .background-elements {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 1;
    }

    .bg-gradient-1 {
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle at 25% 25%, rgba(102, 126, 234, 0.1), transparent 50%);
      animation: rotate 60s linear infinite;
    }

    .bg-gradient-2 {
      position: absolute;
      bottom: -50%;
      right: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle at 75% 75%, rgba(245, 87, 108, 0.05), transparent 50%);
      animation: rotate 80s linear infinite reverse;
    }

    .bg-grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 50px 50px;
      animation: gridMove 20s linear infinite;
    }

    /* Animations */
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes shimmer {
      0% {
        left: -100%;
      }
      100% {
        left: 100%;
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px) rotate(0deg);
      }
      50% {
        transform: translateY(-20px) rotate(180deg);
      }
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 0.7;
      }
      50% {
        opacity: 1;
      }
    }

    @keyframes breathe {
      0%, 100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.3;
      }
      50% {
        transform: translate(-50%, -50%) scale(1.1);
        opacity: 0.1;
      }
    }

    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes gridMove {
      from {
        transform: translate(0, 0);
      }
      to {
        transform: translate(50px, 50px);
      }
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .modern-about-content {
        grid-template-columns: 1fr;
        gap: 3rem;
        text-align: center;
      }
      
      .stats-row {
        justify-content: center;
      }
      
      .specializations-list {
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      }
    }

    @media (max-width: 768px) {
      :root {
        --section-padding: 80px 0;
      }
      
      .modern-about-container {
        padding: 0 1.5rem;
      }
      
      .section-title {
        font-size: 2.5rem;
      }
      
      .main-description {
        font-size: 1.125rem;
      }
      
      .stats-row {
        gap: 2rem;
      }
      
      .visual-container {
        height: 400px;
      }
      
      .main-visual {
        width: 250px;
        height: 250px;
      }
      
      .specializations-list {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .modern-about-container {
        padding: 0 1rem;
      }
      
      .section-title {
        font-size: 2rem;
      }
      
      .stats-row {
        flex-direction: column;
        gap: 1.5rem;
        align-items: center;
      }
      
      .visual-container {
        height: 300px;
      }
      
      .main-visual {
        width: 200px;
        height: 200px;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <section className="modern-about-section">
        <div className="modern-about-container">
          <div className="modern-about-content">
            <div className="modern-about-text">
              <div className="section-badge">
                <span>About Us</span>
              </div>
              <h1 className="section-title">
                Transforming Ideas Into 
                <span className="gradient-text"> Digital Excellence</span>
              </h1>
              <p className="main-description">
                We don't just build solutions—we craft digital experiences that propel your 
                business into the future. Our team becomes an extension of yours, delivering 
                innovative strategies that align with your vision.
              </p>
              <p className="sub-description">
                With cutting-edge expertise and a passion for excellence, we empower 
                organizations to harness technology that doesn't just meet expectations—it exceeds them.
              </p>
              
              <div className="specializations-grid">
                <h3 className="specializations-title">Our Expertise</h3>
                <div className="specializations-list">
                  <div className="spec-item">
                    <div className="spec-icon">🚀</div>
                    <span>Application Development</span>
                  </div>
                  <div className="spec-item">
                    <div className="spec-icon">🌐</div>
                    <span>Web Development</span>
                  </div>
                  <div className="spec-item">
                    <div className="spec-icon">🎨</div>
                    <span>UI/UX Design</span>
                  </div>
                  <div className="spec-item">
                    <div className="spec-icon">✨</div>
                    <span>Graphic Design</span>
                  </div>
                  <div className="spec-item">
                    <div className="spec-icon">📈</div>
                    <span>Digital Marketing</span>
                  </div>
                  <div className="spec-item">
                    <div className="spec-icon">🔐</div>
                    <span>Cyber Security</span>
                  </div>
                </div>
              </div>
              
              <div className="cta-section">
                <a href="/about" className="modern-cta-button">
                  <span>Discover Our Story</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <div className="stats-row">
                  <div className="stat-item">
                    <span className="stat-number">150+</span>
                    <span className="stat-label">Projects Delivered</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">98%</span>
                    <span className="stat-label">Client Satisfaction</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">5+</span>
                    <span className="stat-label">Years Experience</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modern-about-visual">
              <div className="visual-container">
                <div className="floating-elements">
                  <div className="float-element element-1"></div>
                  <div className="float-element element-2"></div>
                  <div className="float-element element-3"></div>
                  <div className="float-element element-4"></div>
                </div>
                <div className="main-visual">
                  <div className="visual-content">
                    <div className="code-lines">
                      <div className="code-line"></div>
                      <div className="code-line short"></div>
                      <div className="code-line"></div>
                      <div className="code-line medium"></div>
                      <div className="code-line"></div>
                    </div>
                  </div>
                </div>
                <div className="glow-effect"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="background-elements">
          <div className="bg-gradient-1"></div>
          <div className="bg-gradient-2"></div>
          <div className="bg-grid"></div>
        </div>
      </section>
    </>
  );
}

export default ModernAboutSection;