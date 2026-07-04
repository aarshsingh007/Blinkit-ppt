import re

with open('index.html', 'r') as f:
    html = f.read()

# 1. HERO Image
html = re.sub(
    r'<div class="phone-mockup">.*?</div>\s*</div>\s*</div>\s*</section>',
    r'<img src="./images/img_8.jpg" alt="Hero Mockup" style="max-width: 100%; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">\n        </div>\n      </div>\n    </section>',
    html,
    flags=re.DOTALL
)

# 2. Survey Image (RESEARCH 02)
# The prompt says: "Use ACTUAL Medium article survey/pie chart images if available, otherwise labeled placeholders."
html = re.sub(
    r'<div class="quote-cards">',
    r'<div style="margin-bottom: 40px; text-align: center;" class="animate-up"><img src="./images/img_33.jpg" alt="Survey Results" style="max-width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);"></div>\n        <div class="quote-cards">',
    html,
    flags=re.DOTALL
)

# 3. HMW Sticky Notes (PROCESS 05)
# I will add a placeholder above the sticky notes
html = re.sub(
    r'(<div class="hmw-board">)',
    r'<div style="text-align: center; margin-bottom: 40px; padding: 40px; border: 2px dashed rgba(255,215,0,0.3); border-radius: 12px; color: #FFD700;" class="animate-up">[Insert ACTUAL Medium HMW sticky note image here]</div>\n        \1',
    html
)

# 4. PROCESS 06 Paper to Pixels
html = re.sub(
    r'<div class="wireframe-panel left-panel">.*?</div>\s*<div class="wireframe-arrow">',
    r'<div class="wireframe-panel left-panel animate-up" style="background: url(\'./images/img_16.jpg\') center/cover; min-height: 400px; border-radius: 12px; animation-delay: 0.1s;"></div>\n            <div class="wireframe-arrow animate-up" style="animation-delay: 0.2s;">',
    html,
    flags=re.DOTALL
)
html = re.sub(
    r'<div class="wireframe-panel right-panel">.*?</div>\s*</div>\s*<p class="wireframe-caption">',
    r'<div class="wireframe-panel right-panel animate-up" style="background: url(\'./images/img_22.jpg\') center/cover; min-height: 400px; border-radius: 12px; animation-delay: 0.3s;"></div>\n          </div>\n          <p class="wireframe-caption animate-up">',
    html,
    flags=re.DOTALL
)

# 5. PROCESS 07 Home Before & After
html = re.sub(
    r'<div class="comparison-container">.*?<div class="comparison-side">.*?<div class="phone-mockup before-mockup">.*?</div>\s*</div>.*?<div class="comparison-side">.*?<div class="phone-mockup after-mockup">.*?</div>\s*</div>.*?</div>\s*</section>',
    r'''<div class="comparison-container">
            <div class="comparison-side animate-up" style="animation-delay: 0.1s;">
              <img src="./images/img_34.jpg" alt="Home Before" style="max-width: 100%; border-radius: 20px;">
            </div>
            <div class="comparison-side animate-up" style="animation-delay: 0.2s;">
              <img src="./images/img_17.jpg" alt="Home After" style="max-width: 100%; border-radius: 20px;">
            </div>
          </div>
        </section>''',
    html,
    flags=re.DOTALL
)

# 6. PROCESS 09 Category Screen
html = re.sub(
    r'<section class="section" id="process-09">.*?<div class="comparison-container">.*?<div class="comparison-side">.*?<div class="phone-mockup before-mockup">.*?</div>\s*</div>.*?<div class="comparison-side">.*?<div class="phone-mockup after-mockup">.*?</div>\s*</div>.*?</div>\s*</section>',
    r'''<section class="section" id="process-09">
          <div class="section-label animate-up">PROCESS &middot; 09</div>
          <h2 class="section-title animate-up" style="animation-delay: 0.1s;">Category screen</h2>
          <div class="comparison-container" style="margin-top: 40px;">
            <div class="comparison-side animate-up" style="animation-delay: 0.2s;">
              <img src="./images/img_10.jpg" alt="Category Before" style="max-width: 100%; border-radius: 20px;">
            </div>
            <div class="comparison-side animate-up" style="animation-delay: 0.3s;">
              <img src="./images/img_13.jpg" alt="Category After" style="max-width: 100%; border-radius: 20px;">
            </div>
          </div>
        </section>''',
    html,
    flags=re.DOTALL
)

# 7. PROCESS 10 Adding to cart
html = re.sub(
    r'<div class="split-layout">.*?<div class="split-left">.*?<div class="phone-mockup">.*?</div>\s*</div>',
    r'<div class="split-layout">\n            <div class="split-left animate-up">\n              <img src="./images/img_28.jpg" alt="Adding to Cart" style="max-width: 100%; border-radius: 20px;">\n            </div>',
    html,
    flags=re.DOTALL
)

# 8. PROCESS 11 Product Card
html = re.sub(
    r'<section class="section" id="process-11">.*?<div class="product-card-comparison">.*?</div>\s*</section>',
    r'''<section class="section" id="process-11">
          <div class="section-label animate-up">PROCESS &middot; 11</div>
          <h2 class="section-title animate-up" style="animation-delay: 0.1s;">Product card redesign</h2>
          <div style="text-align: center; margin-top: 40px; animation-delay: 0.2s;" class="animate-up">
             <img src="./images/img_29.jpg" alt="Product Card Redesign" style="max-width: 100%; border-radius: 12px;">
          </div>
        </section>''',
    html,
    flags=re.DOTALL
)

# 9. PROCESS 12 Checkout
html = re.sub(
    r'<section class="section" id="process-12">.*?<div class="folds-container">.*?</div>\s*</section>',
    r'''<section class="section" id="process-12">
          <div class="section-label animate-up">PROCESS &middot; 12</div>
          <h2 class="section-title animate-up" style="animation-delay: 0.1s;">Checkout &mdash; two folds</h2>
          <div style="text-align: center; margin-top: 40px; animation-delay: 0.2s;" class="animate-up">
             <img src="./images/img_26.jpg" alt="Checkout Two Folds" style="max-width: 100%; border-radius: 12px;">
          </div>
        </section>''',
    html,
    flags=re.DOTALL
)

# 10. TESTING 14 Heatmap
html = re.sub(
    r'<div class="split-layout align-center">.*?<div class="split-left">.*?<div class="heatmap-container">.*?</div>\s*</div>',
    r'<div class="split-layout align-center">\n            <div class="split-left animate-up">\n              <img src="./images/img_32.jpg" alt="Heatmap Comparison" style="max-width: 100%; border-radius: 12px;">\n            </div>',
    html,
    flags=re.DOTALL
)

# 11. TESTING 15 The Fix
html = re.sub(
    r'<section class="section" id="testing-15">.*?<div class="split-layout align-center">.*?<div class="split-left">.*?<div class="phone-mockup">.*?</div>\s*</div>',
    r'''<section class="section" id="testing-15">
          <div class="section-label animate-up">TESTING &middot; 15</div>
          <h2 class="section-title success-text animate-up" style="animation-delay: 0.1s;">The fix &mdash; transparency restored</h2>
          <div class="split-layout align-center" style="margin-top: 40px;">
            <div class="split-left animate-up" style="animation-delay: 0.2s;">
              <img src="./images/img_21.jpg" alt="Fixed Checkout" style="max-width: 100%; border-radius: 20px;">
            </div>''',
    html,
    flags=re.DOTALL
)

# 12. IMPACT 20 User Flow
html = re.sub(
    r'<div class="user-flow">.*?</div>\s*<p class="flow-caption">',
    r'<div style="text-align: center; margin: 60px 0;" class="animate-up"><img src="./images/img_19.jpg" alt="User Flow" style="max-width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);"></div>\n          <p class="flow-caption">',
    html,
    flags=re.DOTALL
)

# 13. CLOSING 23 Style Guide
html = re.sub(
    r'<section class="section" id="closing-23">.*?<div class="style-guide">.*?</div>\s*</section>',
    r'''<section class="section" id="closing-23">
          <div class="section-label animate-up">CLOSING &middot; 23</div>
          <h2 class="section-title animate-up" style="animation-delay: 0.1s;">Style guide</h2>
          <div style="text-align: center; margin-top: 40px; animation-delay: 0.2s;" class="animate-up">
             <img src="./images/img_9.jpg" alt="Style Guide" style="max-width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);">
          </div>
        </section>''',
    html,
    flags=re.DOTALL
)

with open('index.html', 'w') as f:
    f.write(html)

print("Images injected successfully.")
