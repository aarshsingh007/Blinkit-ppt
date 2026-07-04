import re

with open('index.html', 'r') as f:
    html = f.read()

# 1. Update text sizes and spacing in CSS
css_updates = [
    (r'\.section-label\{[^}]*\}', r'.section-label{\n  font-size:11px;font-weight:500;text-transform:uppercase;\n  letter-spacing:3px;color:#888;margin-bottom:12px;\n}'),
    (r'\.section-title\{[^}]*\}', r'.section-title{\n  font-size:42px;font-weight:700;color:var(--white);\n  line-height:1.1;margin-bottom:24px;\n}'),
    (r'\.body-text\{[^}]*\}', r'.body-text{font-size:15px;font-weight:400;line-height:1.7;color:#AAA}'),
    (r'\.stat-number\{[^}]*\}', r'.stat-number{font-size:56px;font-weight:700;color:var(--yellow);line-height:1}'),
    (r'\.card-title\{[^}]*\}', r'.card-title{font-size:18px;font-weight:600;color:var(--white)}'),
    (r'\.section\{[^}]*\}', r'.section{\n  padding:100px 0;width:100%;\n}'),
    (r'\.row\{[^}]*\}', r'.row{display:flex;gap:32px;align-items:flex-start}'),
    (r'\.grid-2\{[^}]*\}', r'.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:32px}'),
    (r'\.grid-3\{[^}]*\}', r'.grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:32px}'),
    (r'\.grid-4\{[^}]*\}', r'.grid-4{display:grid;grid-template-columns:1fr 1fr;gap:32px}'),
    (r'\.card\{[^}]*\}', r'.card{\n  background:rgba(255,255,255,0.03);backdrop-filter:blur(10px);\n  -webkit-backdrop-filter:blur(10px);\n  border:1px solid rgba(255,255,255,0.05);\n  border-radius:12px;padding:24px;\n}\n.card-body{font-size:14px;font-weight:400;color:#999;margin-top:8px;}\n.quote-text{font-size:16px;font-weight:400;color:#CCC;font-style:italic;}'),
    (r'\.card:hover\{[^}]*\}', r'.card:hover{transform:translateY(-4px);box-shadow:0 10px 30px rgba(0,0,0,0.5);transition:all .3s ease;}'),
    (r'@media \(max-width: 768px\) \{[^}]*\.section \{[^\}]*\}', r'@media (max-width: 768px) {\n  .section { padding:60px 0; }\n  .section-title { font-size:28px !important; }'),
]

for pattern, replacement in css_updates:
    html = re.sub(pattern, replacement, html, flags=re.DOTALL)

# Add scooter CSS if not present
if "scooter-bar" not in html:
    scooter_css = """
/* ═══════════════════════════════════════════════════
   SCOOTER PROGRESS BAR
═══════════════════════════════════════════════════ */
.scooter-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: #0A0A0A;
  border-top: 1px solid rgba(255,255,255,0.06);
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 0 24px;
}
.scooter-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(255, 215, 0, 0.1);
  border-top: 2px solid var(--yellow);
  width: 0%;
  transition: width 0.1s ease-out;
  z-index: 1;
}
.scooter-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.scooter-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.scooter-icon {
  font-size: 24px;
  position: absolute;
  left: 0%;
  transition: left 0.1s ease-out;
  transform: translateX(-50%);
  margin-top: -30px;
  text-shadow: 0 5px 10px rgba(0,0,0,0.5);
}
.scooter-text {
  font-size: 14px;
  color: #888;
  font-weight: 500;
  margin-left: 10px;
}
.scooter-percent {
  font-size: 14px;
  color: var(--yellow);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
"""
    html = html.replace('</style>', scooter_css + '\n</style>')

# Add scooter HTML if not present
if "id=\"scooter\"" not in html:
    scooter_html = """
  <div class="scooter-bar" id="scooter">
    <div class="scooter-progress" id="scooter-progress"></div>
    <div class="scooter-content">
      <div class="scooter-left">
        <div class="scooter-text">Blinkit delivery scooter</div>
      </div>
      <div class="scooter-percent" id="scooter-percent">0%</div>
    </div>
    <div class="scooter-icon" id="scooter-icon">🛵</div>
  </div>
"""
    html = html.replace('</body>', scooter_html + '\n</body>')

# Add scooter JS if not present
if "scooter.style.width" not in html:
    scooter_js = """
    // Scooter Scroll Progress
    const scooterProgress = document.getElementById('scooter-progress');
    const scooterIcon = document.getElementById('scooter-icon');
    const scooterPercent = document.getElementById('scooter-percent');
    
    window.addEventListener('scroll', () => {
      const scrollPx = document.documentElement.scrollTop || document.body.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollPx / winHeightPx) * 100;
      
      const val = Math.min(Math.max(scrolled, 0), 100);
      scooterProgress.style.width = val + '%';
      
      // Keep icon within safe bounds so it doesn't go off screen entirely
      const iconPos = Math.min(Math.max(val, 2), 98);
      scooterIcon.style.left = iconPos + '%';
      
      scooterPercent.innerText = Math.round(val) + '%';
    });
"""
    html = html.replace('});\n  </script>', scooter_js + '\n  });\n  </script>')


with open('index.html', 'w') as f:
    f.write(html)
