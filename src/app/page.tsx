import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { Tractor, ArrowRight, CheckCircle2, LayoutDashboard, Shield, Smartphone, Zap, Activity, Users, ShoppingCart, Leaf, Star, ChevronRight } from "lucide-react";

export default async function LandingPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Premium Enterprise Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-brand-primary flex items-center justify-center w-8 h-8 rounded-lg shadow-sm">
              <Tractor className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-gray-900">Farm ERP</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-gray-900 transition-colors">Customers</a>
            <a href="#pwa" className="hover:text-gray-900 transition-colors">App</a>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <Link 
                href="/dashboard" 
                className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link href="/login" className="hidden sm:block text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                  Sign In
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-brand-primary hover:bg-brand-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Enterprise Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm text-gray-600 font-medium text-xs mb-8">
            <span className="flex h-2 w-2 rounded-full bg-brand-primary"></span>
            Discover the new standard in farm management <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6 max-w-4xl mx-auto">
            The intelligent OS for modern farm operations
          </h1>
          
          <p className="mt-4 max-w-2xl text-lg text-gray-600 mx-auto mb-10 leading-relaxed">
            Unify your livestock, feed, and financial management in one robust platform. Built specifically for commercial scale agriculture.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {!session ? (
              <Link 
                href="/signup" 
                className="w-full sm:w-auto flex justify-center items-center gap-2 bg-brand-primary hover:bg-brand-hover text-white px-6 py-3 rounded-xl text-base font-medium transition-colors shadow-sm"
              >
                Start Free Trial
              </Link>
            ) : (
              <Link 
                href="/dashboard" 
                className="w-full sm:w-auto flex justify-center items-center gap-2 bg-brand-primary hover:bg-brand-hover text-white px-6 py-3 rounded-xl text-base font-medium transition-colors shadow-sm"
              >
                Go to Dashboard
              </Link>
            )}
            <a href="#features" className="w-full sm:w-auto flex justify-center items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-6 py-3 rounded-xl text-base font-medium transition-colors shadow-sm">
              Explore Features
            </a>
          </div>

          {/* Clean Dashboard Mockup */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="rounded-2xl p-2 bg-gray-50 border border-gray-200 shadow-sm">
              <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white aspect-[16/9]">
                <Image 
                  src="/hero-mockup-2.png" 
                  alt="Farm ERP Dashboard" 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">Trusted by innovative farms</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center grayscale opacity-70">
            <div className="text-xl font-bold flex items-center gap-2 text-gray-900"><Leaf className="w-5 h-5"/> AgriCorp</div>
            <div className="text-xl font-bold flex items-center gap-2 text-gray-900"><Zap className="w-5 h-5"/> FutureFarm</div>
            <div className="text-xl font-bold flex items-center gap-2 text-gray-900"><Shield className="w-5 h-5"/> SafeHarvest</div>
            <div className="text-xl font-bold flex items-center gap-2 text-gray-900"><Activity className="w-5 h-5"/> LiveStock Pro</div>
          </div>
        </div>
      </section>

      {/* Core Modules Highlight */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs uppercase tracking-wider mb-4">
              Complete Ecosystem
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Everything you need to run your farm</h2>
            <p className="text-lg text-gray-600">Farm ERP unifies your livestock, inventory, and financials into a single source of truth, eliminating the need for spreadsheets.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Activity, title: "Animal Operations", desc: "Track batches, mortality, vaccinations, and movement across stages and rooms with precision." },
              { icon: Leaf, title: "Feed Management", desc: "Manage feed inventory, supplier deliveries, and daily batch consumption with strict stock enforcement." },
              { icon: ShoppingCart, title: "Sales & Invoicing", desc: "Generate professional POS invoices, track batch deductions, and monitor accounts receivable automatically." },
              { icon: Users, title: "Supplier & CRM", desc: "Maintain a complete, searchable database of your suppliers and customers with full historical reporting." },
              { icon: LayoutDashboard, title: "Real-time Analytics", desc: "Monitor daily revenue, feed stock levels, mortality rates, and overdue tasks at a single glance." },
              { icon: Shield, title: "Enterprise Security", desc: "Role-based access control (Owner, Manager, Accountant) backed by immutable audit logs for every action." },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-10 h-10 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center mb-5 group-hover:bg-brand-primary/10 group-hover:border-brand-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-gray-700 group-hover:text-brand-primary transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PWA App Section */}
      <section id="pwa" className="py-24 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-wider">
                <Smartphone className="w-4 h-4" /> Installable Web App
              </div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                Works offline. Installs instantly.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Farm ERP is built as a Progressive Web App (PWA). Install it directly from your browser to your phone, tablet, or desktop. No app store required.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <Zap className="w-6 h-6 text-amber-500 mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm">Lightning Fast</h4>
                  <p className="text-sm text-gray-600">Loads instantly from your home screen with zero downloading delays.</p>
                </div>
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm">Offline Ready</h4>
                  <p className="text-sm text-gray-600">Built to handle remote farm locations with spotty internet connections.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0F172A] rounded-2xl p-10 text-white shadow-sm border border-gray-800 relative overflow-hidden">
              <Smartphone className="w-10 h-10 text-gray-400 mb-6" />
              <h3 className="text-xl font-semibold mb-3">Get the App</h3>
              <p className="text-sm text-gray-400 mb-8 max-w-sm leading-relaxed">
                Look for the install icon in your browser's address bar or use the install button inside the dashboard to add Farm ERP to your device.
              </p>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm text-white font-medium transition-colors cursor-default">
                Install App
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Loved by farm owners</h2>
            <p className="text-lg text-gray-600">See how Farm ERP is changing the way modern agriculture operates.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Sarah Jenkins", role: "Owner, Green Valley Farms", text: "We completely eliminated our spreadsheet chaos. The batch-wise tracking and mortality metrics alone saved us thousands this quarter." },
              { name: "Michael Chen", role: "Operations Manager", text: "The offline capability is a lifesaver. Our barns have terrible reception, but my team can log feed consumption without missing a beat." },
              { name: "David Miller", role: "Chief Accountant", text: "The integration between the POS invoicing and the general ledger is seamless. The RBAC ensures my workers only see what they need to." }
            ].map((t, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-amber-400 mb-4">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="text-gray-700 text-sm mb-6 leading-relaxed">"{t.text}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 text-sm">{t.name}</h5>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0F172A]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to modernize your operations?</h2>
          <p className="text-lg text-gray-400 mb-8">Join the next generation of farm management today.</p>
          {!session ? (
            <Link 
              href="/signup" 
              className="inline-flex justify-center items-center gap-2 bg-brand-primary hover:bg-brand-hover text-white px-8 py-3.5 rounded-xl text-base font-medium transition-colors shadow-sm"
            >
              Start Your Free Trial
            </Link>
          ) : (
            <Link 
              href="/dashboard" 
              className="inline-flex justify-center items-center gap-2 bg-brand-primary hover:bg-brand-hover text-white px-8 py-3.5 rounded-xl text-base font-medium transition-colors shadow-sm"
            >
              Enter Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-16 pb-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-brand-primary p-2 rounded-lg">
                  <Tractor className="w-4 h-4 text-white stroke-[1.5]" />
                </div>
                <span className="text-lg font-semibold tracking-tight text-gray-900">Farm ERP</span>
              </div>
              <p className="text-gray-500 text-sm mb-6 max-w-xs leading-relaxed">
                The intelligent operating system for modern livestock, poultry, and agricultural management.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-4">Product</h4>
              <ul className="space-y-2.5 text-gray-500 text-sm">
                <li><a href="#features" className="hover:text-gray-900 transition-colors">Features</a></li>
                <li><a href="#testimonials" className="hover:text-gray-900 transition-colors">Customers</a></li>
                <li><a href="#pwa" className="hover:text-gray-900 transition-colors">Mobile App</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-4">Resources</h4>
              <ul className="space-y-2.5 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-4">Company</h4>
              <ul className="space-y-2.5 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-gray-900 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Farm ERP Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-900 transition-colors">Twitter</a>
              <a href="#" className="hover:text-gray-900 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-gray-900 transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

