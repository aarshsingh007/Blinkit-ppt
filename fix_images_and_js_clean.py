import re

with open('index.html', 'r') as f:
    html = f.read()

# 1. Hero Image
html = re.sub(
    r'<div class="phone reveal">.*?</div>\s*</div>\s*</div>',
    r'<div class="reveal"><img src="./images/img_8.jpg" alt="Hero Mockup" style="max-width: 100%; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);"></div>',
    html,
    flags=re.DOTALL
)

# 2. Research (Survey Pie Charts)
html = re.sub(
    r'<div class="grid-3 reveal">',
    r'<div style="text-align: center; margin-bottom: 40px;" class="reveal"><img src="./images/img_33.jpg" alt="Survey Results" style="max-width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);"></div>\n    <div class="grid-3 reveal">',
    html
)

# 3. HMW Sticky Notes (s-hmw)
html = re.sub(
    r'<div class="grid-3 reveal" style="grid-template-columns:repeat\(5,1fr\)">',
    r'<div style="text-align: center; margin-bottom: 40px; padding: 40px; border: 2px dashed rgba(255,215,0,0.3); border-radius: 12px; color: #FFD700;" class="reveal">[Insert ACTUAL Medium HMW sticky note image here]</div>\n    <div class="grid-3 reveal" style="display:none">',
    html
)

# 4. Wireframes (s-wireframes)
html = re.sub(
    r'<div class="wireframe-panel left-panel">.*?<div class="wireframe-arrow">',
    r'<div class="wireframe-panel left-panel" style="background: url(\'./images/img_16.jpg\') center/cover; min-height: 400px; border-radius: 12px;"></div>\n        <div class="wireframe-arrow">',
    html,
    flags=re.DOTALL
)
html = re.sub(
    r'<div class="wireframe-panel right-panel">.*?</div>\s*</div>\s*<p class="body-text',
    r'<div class="wireframe-panel right-panel" style="background: url(\'./images/img_22.jpg\') center/cover; min-height: 400px; border-radius: 12px;"></div>\n      </div>\n      <p class="body-text',
    html,
    flags=re.DOTALL
)

# 5. Home Before/After (s-home)
html = re.sub(
    r'<section class="section" id="s-home">.*?<div class="grid-2 reveal">.*?</div>\s*</div>\s*</section>',
    r'''<section class="section" id="s-home">
  <div class="container">
    <div class="reveal">
      <div class="section-label">PROCESS &middot; 07</div>
      <h2 class="section-title">Home screen &mdash; Before &amp; After</h2>
    </div>
    <div class="grid-2 reveal" style="margin-top: 40px;">
      <div><img src="./images/img_34.jpg" alt="Home Before" style="max-width: 100%; border-radius: 20px;"></div>
      <div><img src="./images/img_17.jpg" alt="Home After" style="max-width: 100%; border-radius: 20px;"></div>
    </div>
  </div>
</section>''',
    html,
    flags=re.DOTALL
)

# 6. Category Screen (s-category)
html = re.sub(
    r'<section class="section" id="s-category">.*?<div class="grid-2 reveal">.*?</div>\s*</div>\s*</section>',
    r'''<section class="section" id="s-category">
  <div class="container">
    <div class="reveal">
      <div class="section-label">PROCESS &middot; 09</div>
      <h2 class="section-title">Category screen</h2>
    </div>
    <div class="grid-2 reveal" style="margin-top: 40px;">
      <div><img src="./images/img_10.jpg" alt="Category Before" style="max-width: 100%; border-radius: 20px;"></div>
      <div><img src="./images/img_13.jpg" alt="Category After" style="max-width: 100%; border-radius: 20px;"></div>
    </div>
  </div>
</section>''',
    html,
    flags=re.DOTALL
)

# 7. Cart (s-cart)
html = re.sub(
    r'<div class="col" style="flex:0 0 260px">.*?<div class="phone">.*?</div>\s*</div>\s*</div>',
    r'<div class="col" style="flex:0 0 260px">\n        <img src="./images/img_28.jpg" alt="Adding to Cart" style="max-width: 100%; border-radius: 20px;">\n      </div>\n      </div>',
    html,
    flags=re.DOTALL
)

# 8. Product Cards (s-product-cards)
html = re.sub(
    r'<div class="card-comparison reveal">.*?</div>\s*</div>\s*</section>',
    r'<div style="text-align: center; margin-top: 40px;" class="reveal">\n      <img src="./images/img_29.jpg" alt="Product Card Redesign" style="max-width: 100%; border-radius: 12px;">\n    </div>\n  </div>\n</section>',
    html,
    flags=re.DOTALL
)

# 9. Checkout (s-checkout)
html = re.sub(
    r'<div class="grid-2 reveal">.*?<div class="phone">.*?</div>\s*</div>\s*</div>\s*</div>\s*</section>',
    r'<div style="text-align: center; margin-top: 40px;" class="reveal">\n      <img src="./images/img_26.jpg" alt="Checkout Folds" style="max-width: 100%; border-radius: 12px;">\n    </div>\n  </div>\n</section>',
    html,
    flags=re.DOTALL
)

# 10. Vulnerability Heatmap (s-vulnerability)
html = re.sub(
    r'<div class="col" style="flex:0 0 260px">.*?<div class="phone">.*?</div>\s*</div>\s*</div>',
    r'<div class="col" style="flex:0 0 260px">\n        <img src="./images/img_32.jpg" alt="Heatmap" style="max-width: 100%; border-radius: 20px;">\n      </div>\n      </div>',
    html,
    flags=re.DOTALL
)

# 11. The Fix (s-fix)
html = re.sub(
    r'<div class="col" style="flex:0 0 260px">.*?<div class="phone">.*?</div>\s*</div>\s*</div>',
    r'<div class="col" style="flex:0 0 260px">\n        <img src="./images/img_21.jpg" alt="Fixed Checkout" style="max-width: 100%; border-radius: 20px;">\n      </div>\n      </div>',
    html,
    flags=re.DOTALL
)

# 12. Flowchart (s-flow)
html = re.sub(
    r'<div class="flow-container reveal">.*?</div>\s*<p class="body-text',
    r'<div style="text-align: center; margin: 60px 0;" class="reveal">\n      <img src="./images/img_19.jpg" alt="User Flow" style="max-width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);">\n    </div>\n    <p class="body-text',
    html,
    flags=re.DOTALL
)

# 13. Style Guide (s-style-guide)
html = re.sub(
    r'<div class="style-guide-box reveal">.*?</div>\s*</section>',
    r'<div style="text-align: center; margin-top: 40px;" class="reveal">\n      <img src="./images/img_9.jpg" alt="Style Guide" style="max-width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);">\n    </div>\n  </div>\n</section>',
    html,
    flags=re.DOTALL
)


with open('index.html', 'w') as f:
    f.write(html)
