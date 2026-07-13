import { Link } from "react-router-dom";

const Documentation = () => {
    return (
        <div className="container mt-5">
            <style>{`
                .doc-section {
                    animation: fadeInUp 0.6s ease-out;
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(13, 110, 253, 0.2); }
                    50% { box-shadow: 0 0 40px rgba(13, 110, 253, 0.4); }
                }
                .hero-icon {
                    animation: float 3s ease-in-out infinite;
                }
                .feature-card {
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    cursor: default;
                    position: relative;
                    overflow: hidden;
                }
                .feature-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, rgba(13, 110, 253, 0.05), transparent);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }
                .feature-card:hover::before {
                    opacity: 1;
                }
                .feature-card:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 20px 60px rgba(13, 110, 253, 0.15) !important;
                }
                .feature-card .icon-wrapper {
                    width: 60px;
                    height: 60px;
                    border-radius: 16px;
                    background: linear-gradient(135deg, #e3f2fd, #bbdefb);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    margin-bottom: 1rem;
                    transition: all 0.4s ease;
                }
                .feature-card:hover .icon-wrapper {
                    transform: scale(1.1) rotate(-5deg);
                    background: linear-gradient(135deg, #0D6EFD, #0069d9);
                }
                .feature-card:hover .icon-wrapper span {
                    filter: brightness(10);
                }
                .code-block {
                    background: #0a0e27;
                    color: #e4e4e4;
                    padding: 1.5rem;
                    border-radius: 12px;
                    font-family: 'JetBrains Mono', 'Courier New', monospace;
                    font-size: 0.85rem;
                    overflow-x: auto;
                    position: relative;
                    border: 1px solid rgba(13, 110, 253, 0.2);
                }
                .code-block .copy-btn {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    background: rgba(255,255,255,0.08);
                    color: #fff;
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    padding: 6px 14px;
                    font-size: 0.75rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                }
                .code-block .copy-btn:hover {
                    background: rgba(13, 110, 253, 0.3);
                    border-color: #0D6EFD;
                }
                .code-block .line-number {
                    color: #6c7a8a;
                    user-select: none;
                    margin-right: 1rem;
                }
                .timeline-item {
                    border-left: 3px solid #0D6EFD;
                    padding-left: 1.5rem;
                    position: relative;
                    padding-bottom: 1.5rem;
                }
                .timeline-item:last-child {
                    padding-bottom: 0;
                }
                .timeline-item::before {
                    content: '';
                    position: absolute;
                    left: -8px;
                    top: 5px;
                    width: 13px;
                    height: 13px;
                    background: #0D6EFD;
                    border-radius: 50%;
                    border: 2px solid #fff;
                    box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.2);
                }
                .timeline-item .step-number {
                    display: inline-block;
                    background: rgba(13, 110, 253, 0.1);
                    color: #0D6EFD;
                    padding: 2px 12px;
                    border-radius: 20px;
                    font-size: 0.7rem;
                    font-weight: 600;
                    margin-bottom: 0.25rem;
                }
                .architecture-flow {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                    padding: 2rem;
                    background: linear-gradient(135deg, rgba(13, 110, 253, 0.03), rgba(13, 110, 253, 0.08));
                    border-radius: 16px;
                    border: 1px solid rgba(13, 110, 253, 0.1);
                }
                .architecture-flow .step {
                    background: #fff;
                    padding: 0.75rem 1.75rem;
                    border-radius: 12px;
                    border: 2px solid #0D6EFD;
                    font-weight: 600;
                    color: #0D6EFD;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(13, 110, 253, 0.1);
                }
                .architecture-flow .step:hover {
                    transform: scale(1.05);
                    box-shadow: 0 8px 30px rgba(13, 110, 253, 0.2);
                }
                .architecture-flow .arrow {
                    font-size: 1.5rem;
                    color: #0D6EFD;
                    opacity: 0.6;
                }
                .badge-blue {
                    background: linear-gradient(135deg, #0D6EFD, #0069d9);
                    color: #fff;
                }
                .badge-soft {
                    background: rgba(13, 110, 253, 0.08);
                    color: #0D6EFD;
                    border: 1px solid rgba(13, 110, 253, 0.1);
                }
                .badge-soft:hover {
                    background: rgba(13, 110, 253, 0.15);
                    transform: translateY(-2px);
                }
                .author-card {
                    background: linear-gradient(135deg, #0D6EFD, #0069d9);
                    border-radius: 20px;
                    padding: 2.5rem;
                    position: relative;
                    overflow: hidden;
                }
                .author-card::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -20%;
                    width: 300px;
                    height: 300px;
                    background: rgba(255,255,255,0.05);
                    border-radius: 50%;
                }
                .author-card::after {
                    content: '';
                    position: absolute;
                    bottom: -30%;
                    left: -10%;
                    width: 200px;
                    height: 200px;
                    background: rgba(255,255,255,0.03);
                    border-radius: 50%;
                }
                .stat-card {
                    transition: all 0.3s ease;
                    cursor: default;
                }
                .stat-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 30px rgba(13, 110, 253, 0.12) !important;
                }
                .gradient-text {
                    background: linear-gradient(135deg, #0D6EFD, #6610f2);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .glass-card {
                    background: rgba(255,255,255,0.7);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255,255,255,0.2);
                }
                .module-card {
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    cursor: default;
                }
                .module-card:hover {
                    transform: translateY(-6px) scale(1.03);
                    box-shadow: 0 12px 40px rgba(13, 110, 253, 0.15) !important;
                }
                .module-card .module-icon {
                    font-size: 2rem;
                    display: block;
                    margin-bottom: 0.5rem;
                }
                .star-btn {
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    position: relative;
                    overflow: hidden;
                }
                .star-btn::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: rgba(255,255,255,0.2);
                    border-radius: 50%;
                    transition: all 0.6s ease;
                    transform: translate(-50%, -50%);
                }
                .star-btn:hover::before {
                    width: 300px;
                    height: 300px;
                }
                .star-btn:hover {
                    transform: scale(1.1) rotate(-3deg);
                }
            `}</style>

            {/* Hero Section */}
            <div className="doc-section text-center mb-5">
                <div className="card border-0 shadow-xl rounded-4" style={{
                    border: '1px solid rgba(13, 110, 253, 0.1)',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)',
                    boxShadow: '0 20px 60px rgba(13, 110, 253, 0.08)'
                }}>
                    <div className="card-body p-5 p-md-6">
                        <div className="hero-icon" style={{ fontSize: "5rem" }}>🛒</div>
                        <h1 className="fw-bold mt-3 display-4 gradient-text">
                            BuyHatke
                        </h1>
                        <p className="lead text-muted fs-5">
                            Online Shopping Application – Full-Stack E-Commerce Solution
                        </p>
                        <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
                            <span className="badge badge-blue px-4 py-2 rounded-pill fs-6">.NET 10</span>
                            <span className="badge badge-soft px-4 py-2 rounded-pill fs-6">React 18</span>
                            <span className="badge badge-soft px-4 py-2 rounded-pill fs-6">SQL Server</span>
                            <span className="badge badge-soft px-4 py-2 rounded-pill fs-6">JWT Auth</span>
                            <span className="badge badge-soft px-4 py-2 rounded-pill fs-6">EF Core</span>
                        </div>
                        <div className="mt-4 d-flex gap-3 justify-content-center flex-wrap">
                            <Link to="/products" className="btn text-white px-5 py-3 fw-bold" style={{
                                background: 'linear-gradient(135deg, #0D6EFD, #0069d9)',
                                border: 'none',
                                borderRadius: '14px',
                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                boxShadow: '0 8px 30px rgba(13, 110, 253, 0.3)'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.05) translateY(-3px)';
                                e.target.style.boxShadow = '0 12px 40px rgba(13, 110, 253, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1) translateY(0)';
                                e.target.style.boxShadow = '0 8px 30px rgba(13, 110, 253, 0.3)';
                            }}>
                                🚀 Start Shopping
                            </Link>
                            <a href="#features" className="btn btn-outline-primary px-5 py-3 fw-bold" style={{
                                borderRadius: '14px',
                                borderWidth: '2px',
                                transition: 'all 0.4s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-3px)';
                                e.target.style.boxShadow = '0 8px 30px rgba(13, 110, 253, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}>
                                Explore Features
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="row g-3 mb-5">
                {[
                    { icon: '🔐', label: 'Secure Auth', value: 'JWT' },
                    { icon: '📦', label: 'Products', value: 'CRUD' },
                    { icon: '🛒', label: 'Cart', value: 'Real-time' },
                    { icon: '⚡', label: 'Performance', value: 'Optimized' }
                ].map((stat, i) => (
                    <div className="col-md-3 col-6" key={i}>
                        <div className="card border-0 shadow-sm stat-card rounded-4 text-center">
                            <div className="card-body py-3">
                                <span className="fs-2 d-block">{stat.icon}</span>
                                <h6 className="fw-bold mb-0" style={{ color: '#0D6EFD' }}>{stat.value}</h6>
                                <small className="text-muted">{stat.label}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Features Section */}
            <div id="features" className="doc-section mb-5">
                <h2 className="fw-bold mb-4" style={{ color: '#0D6EFD' }}>
                    🚀 Features
                </h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm feature-card rounded-4">
                            <div className="card-body p-4">
                                <div className="icon-wrapper">
                                    <span>🔐</span>
                                </div>
                                <h5 className="fw-bold mt-2" style={{ color: '#2d3436' }}>Authentication</h5>
                                <ul className="list-unstyled text-muted small mt-3">
                                    <li className="mb-2">✓ User Registration</li>
                                    <li className="mb-2">✓ User Login</li>
                                    <li className="mb-2">✓ JWT Authentication</li>
                                    <li className="mb-2">✓ Protected API Endpoints</li>
                                    <li>✓ Logout</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm feature-card rounded-4">
                            <div className="card-body p-4">
                                <div className="icon-wrapper">
                                    <span>📦</span>
                                </div>
                                <h5 className="fw-bold mt-2" style={{ color: '#2d3436' }}>Products</h5>
                                <ul className="list-unstyled text-muted small mt-3">
                                    <li className="mb-2">✓ View all products</li>
                                    <li className="mb-2">✓ View product details</li>
                                    <li className="mb-2">✓ Add products</li>
                                    <li className="mb-2">✓ Update products</li>
                                    <li>✓ Delete products</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm feature-card rounded-4">
                            <div className="card-body p-4">
                                <div className="icon-wrapper">
                                    <span>🛒</span>
                                </div>
                                <h5 className="fw-bold mt-2" style={{ color: '#2d3436' }}>Shopping Cart</h5>
                                <ul className="list-unstyled text-muted small mt-3">
                                    <li className="mb-2">✓ Add items to cart</li>
                                    <li className="mb-2">✓ Remove items from cart</li>
                                    <li className="mb-2">✓ Update quantity</li>
                                    <li className="mb-2">✓ View cart</li>
                                    <li>✓ Calculate totals with discounts</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tech Stack */}
            <div className="doc-section mb-5">
                <h2 className="fw-bold mb-4" style={{ color: '#0D6EFD' }}>
                    🛠 Tech Stack
                </h2>
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body p-4">
                                <h5 className="fw-bold" style={{ color: '#0D6EFD' }}>🔙 Backend</h5>
                                <div className="d-flex flex-wrap gap-2 mt-3">
                                    <span className="badge badge-soft px-3 py-2">ASP.NET Core Web API</span>
                                    <span className="badge badge-soft px-3 py-2">.NET 10</span>
                                    <span className="badge badge-soft px-3 py-2">C#</span>
                                    <span className="badge badge-soft px-3 py-2">Entity Framework Core</span>
                                    <span className="badge badge-soft px-3 py-2">SQL Server</span>
                                    <span className="badge badge-soft px-3 py-2">ASP.NET Identity</span>
                                    <span className="badge badge-soft px-3 py-2">JWT Authentication</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body p-4">
                                <h5 className="fw-bold" style={{ color: '#0D6EFD' }}>🎨 Frontend</h5>
                                <div className="d-flex flex-wrap gap-2 mt-3">
                                    <span className="badge badge-soft px-3 py-2">React 18</span>
                                    <span className="badge badge-soft px-3 py-2">React Router v6</span>
                                    <span className="badge badge-soft px-3 py-2">Axios</span>
                                    <span className="badge badge-soft px-3 py-2">Context API</span>
                                    <span className="badge badge-soft px-3 py-2">CSS3</span>
                                    <span className="badge badge-soft px-3 py-2">Bootstrap 5</span>
                                </div>
                                <h5 className="fw-bold mt-3" style={{ color: '#0D6EFD' }}>🗄️ Database</h5>
                                <div className="d-flex flex-wrap gap-2 mt-2">
                                    <span className="badge badge-soft px-3 py-2">SQL Server</span>
                                    <span className="badge badge-soft px-3 py-2">Microsoft SQL</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Project Structure */}
            <div className="doc-section mb-5">
                <h2 className="fw-bold mb-4" style={{ color: '#0D6EFD' }}>
                    📁 Project Structure
                </h2>
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                        <div className="code-block">
                            <button className="copy-btn" onClick={() => {
                                const code = document.querySelector('.code-block pre')?.innerText || '';
                                navigator.clipboard.writeText(code);
                            }}>📋 Copy</button>
                            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
{`BuyHatke
│
├── OnlineShoppingAppBackend
│   ├── Infrastructure
│   │   ├── Data
│   │   └── Migrations
│   │
│   ├── Models
│   │   ├── DTOs
│   │   └── Entities
│   │
│   ├── Services
│   │   ├── ServiceContract
│   │   └── ServiceImplementation
│   │
│   └── OnlineShoppingApp
│       ├── Controllers
│       ├── Program.cs
│       └── appsettings.json
│
└── OnlineShoppingAppFrontend
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── services
    │   └── assets
    │   
    └── public`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>

            {/* Architecture */}
            <div className="doc-section mb-5">
                <h2 className="fw-bold mb-4" style={{ color: '#0D6EFD' }}>
                    🏗 Architecture
                </h2>
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                        <p className="text-muted mb-4">
                            The backend follows a <strong>Service Layer Architecture</strong> where controllers delegate 
                            business logic to services, and the services interact directly with Entity Framework Core 
                            through <code>ApplicationDbContext</code>.
                        </p>
                        <div className="architecture-flow">
                            <span className="step">🖥️ Client</span>
                            <span className="arrow">▼</span>
                            <span className="step">🎮 Controller</span>
                            <span className="arrow">▼</span>
                            <span className="step">⚙️ Service Layer</span>
                            <span className="arrow">▼</span>
                            <span className="step">🗃️ EF Core</span>
                            <span className="arrow">▼</span>
                            <span className="step">📊 SQL Server</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Authentication Flow */}
            <div className="doc-section mb-5">
                <h2 className="fw-bold mb-4" style={{ color: '#0D6EFD' }}>
                    🔐 Authentication Flow
                </h2>
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="timeline-item">
                                    <span className="step-number">Step 1</span>
                                    <p className="fw-semibold mb-0">User registers an account</p>
                                </div>
                                <div className="timeline-item">
                                    <span className="step-number">Step 2</span>
                                    <p className="fw-semibold mb-0">User logs in using email and password</p>
                                </div>
                                <div className="timeline-item">
                                    <span className="step-number">Step 3</span>
                                    <p className="fw-semibold mb-0">ASP.NET Identity validates credentials</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="timeline-item">
                                    <span className="step-number">Step 4</span>
                                    <p className="fw-semibold mb-0">JWT token is generated</p>
                                </div>
                                <div className="timeline-item">
                                    <span className="step-number">Step 5</span>
                                    <p className="fw-semibold mb-0">Frontend stores the JWT token</p>
                                </div>
                                <div className="timeline-item">
                                    <span className="step-number">Step 6</span>
                                    <p className="fw-semibold mb-0">Protected requests include token in headers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* API Modules */}
            <div className="doc-section mb-5">
                <h2 className="fw-bold mb-4" style={{ color: '#0D6EFD' }}>
                    📦 API Modules
                </h2>
                <div className="row g-3">
                    {['Authentication', 'Products', 'Customers', 'Shopping Cart'].map((module, i) => (
                        <div className="col-md-3 col-6" key={i}>
                            <div className="card border-0 shadow-sm module-card rounded-4 text-center">
                                <div className="card-body py-3">
                                    <span className="module-icon">
                                        {['🔐', '📦', '👤', '🛒'][i]}
                                    </span>
                                    <h6 className="fw-bold mt-1 mb-0" style={{ color: '#2d3436' }}>{module}</h6>
                                    <small className="text-muted">REST API</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Getting Started */}
            {/* <div className="doc-section mb-5">
                <h2 className="fw-bold mb-4" style={{ color: '#0D6EFD' }}>
                    ⚙️ Getting Started
                </h2>
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                        <h6 className="fw-bold" style={{ color: '#0D6EFD' }}>
                            <span className="me-2">📥</span> Clone the repository
                        </h6>
                        <div className="code-block mb-4">
                            <pre style={{ margin: 0 }}>git clone https://github.com/&lt;your-username&gt;/BuyHatke.git</pre>
                        </div>

                        <h6 className="fw-bold mt-3" style={{ color: '#0D6EFD' }}>
                            <span className="me-2">🔧</span> Backend Setup
                        </h6>
                        <div className="code-block">
                            <pre style={{ margin: 0 }}>
{`cd OnlineShoppingAppBackend
dotnet restore
dotnet ef database update
dotnet run`}
                            </pre>
                        </div>

                        <h6 className="fw-bold mt-3" style={{ color: '#0D6EFD' }}>
                            <span className="me-2">🎨</span> Frontend Setup
                        </h6>
                        <div className="code-block">
                            <pre style={{ margin: 0 }}>
{`cd OnlineShoppingAppFrontend
npm install
npm run dev`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Learning Outcomes */}
            <div className="doc-section mb-5">
                <h2 className="fw-bold mb-4" style={{ color: '#0D6EFD' }}>
                    📚 Learning Outcomes
                </h2>
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <ul className="list-unstyled">
                                    <li className="mb-2">✓ ASP.NET Core Web API</li>
                                    <li className="mb-2">✓ Entity Framework Core</li>
                                    <li className="mb-2">✓ SQL Server</li>
                                    <li className="mb-2">✓ Service Layer Architecture</li>
                                    <li className="mb-2">✓ Dependency Injection</li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <ul className="list-unstyled">
                                    <li className="mb-2">✓ ASP.NET Identity</li>
                                    <li className="mb-2">✓ JWT Authentication</li>
                                    <li className="mb-2">✓ REST API Design</li>
                                    <li className="mb-2">✓ DTOs</li>
                                    <li className="mb-2">✓ React & Axios</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Author Section */}
            {/* <div className="doc-section mb-5">
                <div className="author-card text-white">
                    <div className="d-flex flex-wrap align-items-center gap-4 position-relative" style={{ zIndex: 1 }}>
                        <div>
                            <span style={{ fontSize: '4rem' }}>👨‍💻</span>
                        </div>
                        <div>
                            <h3 className="fw-bold mb-1">Sahas Kshirsagar</h3>
                            <p className="mb-2 text-white-50">
                                MSc Computer Science | ASP.NET Core & React Developer
                            </p>
                            <div className="d-flex gap-2 flex-wrap">
                                <a href="#" className="btn btn-light btn-sm text-primary fw-semibold px-4" style={{
                                    borderRadius: '10px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                }}>
                                    📧 Email
                                </a>
                                <a href="#" className="btn btn-outline-light btn-sm px-4" style={{
                                    borderRadius: '10px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                }}>
                                    🔗 LinkedIn
                                </a>
                                <a href="#" className="btn btn-outline-light btn-sm px-4" style={{
                                    borderRadius: '10px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                }}>
                                    🐙 GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Footer */}
            {/* <div className="text-center py-4 border-top">
                <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
                    <span style={{ fontSize: '1.5rem' }}>⭐</span>
                    <p className="mb-0 text-muted">
                        If you found this project helpful, consider giving it a star on GitHub.
                    </p>
                    <button className="btn btn-sm text-white star-btn px-4 py-2" style={{
                        background: 'linear-gradient(135deg, #0D6EFD, #0069d9)',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: '600'
                    }}>
                        ⭐ Star on GitHub
                    </button>
                </div>
            </div> */}
        </div>
    );
};

export default Documentation;