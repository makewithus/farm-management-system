import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { Tractor, ArrowRight, CheckCircle2, LayoutDashboard, Shield, Smartphone, Zap, Activity, Users, ShoppingCart, Leaf, Star, ChevronRight } from "lucide-react";

export default async function LandingPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-page-bg text-gray-900 font-sans selection:bg-brand-primary/10 selection:text-brand-primary">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-page-bg/90 backdrop-blur-md border-b border-gray-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-brand-primary p-1.5 rounded-md">
              <Tractor className="w-5 h-5 text-white stroke-[2]" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-gray-900">Farm ERP</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-500">
            <a href="#features" className="hover:text-gray-900 transition-colors">Platform</a>
            <a href="#customers" className="hover:text-gray-900 transition-colors">Customers</a>
            <a href="#app" className="hover:text-gray-900 transition-colors">Mobile App</a>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <Link 
                href="/dashboard" 
                className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-btn text-sm font-medium transition-colors"
              >
                Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link href="/login" className="hidden sm:block text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors">
                  Sign in
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-brand-primary hover:bg-brand-hover text-white px-4 py-2 rounded-btn text-sm font-medium transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm text-gray-600 font-medium text-xs mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-accent"></span>
            Farm ERP 2.0 is now available <ChevronRight className="w-3 h-3 text-gray-400" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
            The operating system for <br className="hidden md:block" />
            commercial agriculture.
          </h1>
          
          <p className="mt-6 max-w-2xl text-lg text-gray-500 mx-auto mb-10 leading-relaxed">
            Unify your livestock, feed, and financial management in one beautifully designed, offline-ready platform. Built for modern farm operations.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {!session ? (
              <Link 
                href="/signup" 
                className="w-full sm:w-auto flex justify-center items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-btn text-base font-medium transition-colors"
              >
                Start Free Trial
              </Link>
            ) : (
              <Link 
                href="/dashboard" 
                className="w-full sm:w-auto flex justify-center items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-btn text-base font-medium transition-colors"
              >
                Go to Dashboard
              </Link>
            )}
            <a href="#features" className="w-full sm:w-auto flex justify-center items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-6 py-3 rounded-btn text-base font-medium transition-colors shadow-sm">
              Explore Platform
            </a>
          </div>

          {/* Clean Mockup */}
          <div className="mt-24 max-w-5xl mx-auto">
            <div className="rounded-card border border-gray-200/80 bg-white p-2 shadow-soft">
              <div className="rounded-lg overflow-hidden border border-gray-100 bg-gray-50 aspect-[16/9] relative">
                {/* Fallback pattern if image is missing, otherwise Image will load */}
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
                <Image 
                  src="/hero-mockup-2.png" 
                  alt="Farm ERP Dashboard" 
                  fill
                  className="object-cover relative z-10"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-gray-200/60 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center opacity-60 grayscale">
            <div className="text-lg font-bold flex items-center gap-1.5 text-gray-800"><Leaf className="w-5 h-5 text-gray-800"/> AgriCorp</div>
            <div className="text-lg font-bold flex items-center gap-1.5 text-gray-800"><Zap className="w-5 h-5 text-gray-800"/> FutureFarm</div>
            <div className="text-lg font-bold flex items-center gap-1.5 text-gray-800"><Shield className="w-5 h-5 text-gray-800"/> SafeHarvest</div>
            <div className="text-lg font-bold flex items-center gap-1.5 text-gray-800"><Activity className="w-5 h-5 text-gray-800"/> LiveStock Pro</div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Everything you need to run your farm</h3>
            <p className="text-lg text-gray-500">Farm ERP unifies your livestock, inventory, and financials into a single source of truth. Designed for clarity and speed.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Activity, title: "Animal Operations", desc: "Track batches, mortality, vaccinations, and movement across stages and rooms with precision." },
              { icon: Leaf, title: "Feed Management", desc: "Manage feed inventory, supplier deliveries, and daily batch consumption with strict stock enforcement." },
              { icon: ShoppingCart, title: "Sales & Invoicing", desc: "Generate professional POS invoices, track batch deductions, and monitor accounts receivable automatically." },
              { icon: Users, title: "Supplier & CRM", desc: "Maintain a complete, searchable database of your suppliers and customers with full historical reporting." },
              { icon: LayoutDashboard, title: "Real-time Analytics", desc: "Monitor daily revenue, feed stock levels, mortality rates, and overdue tasks at a single glance." },
              { icon: Shield, title: "Enterprise Security", desc: "Role-based access control backed by immutable audit logs for every action." },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-card p-8 border border-gray-200/80 hover:border-gray-300 transition-colors shadow-sm">
                <div className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center mb-5 bg-gray-50">
                  <feature.icon className="w-5 h-5 text-gray-600" />
                </div>
                <h4 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section id="app" className="py-32 bg-white border-y border-gray-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                Works offline. Installs instantly.
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed">
                Farm ERP is built as a Progressive Web App (PWA). Install it directly from your browser to your phone, tablet, or desktop. No app store required.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                <div className="flex flex-col gap-3">
                  <Zap className="w-6 h-6 text-brand-accent" />
                  <h4 className="font-semibold text-gray-900 text-sm">Lightning Fast</h4>
                  <p className="text-sm text-gray-500">Loads instantly from your home screen with zero downloading delays.</p>
                </div>
                <div className="flex flex-col gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-primary" />
                  <h4 className="font-semibold text-gray-900 text-sm">Offline Ready</h4>
                  <p className="text-sm text-gray-500">Built to handle remote farm locations with spotty internet connections.</p>
                </div>
              </div>
            </div>

            <div className="bg-page-bg rounded-card p-8 border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center h-80 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Tractor className="w-40 h-40" />
                </div>
                <Smartphone className="w-10 h-10 text-gray-700 mb-4 relative z-10" />
                <h3 className="text-lg font-semibold mb-2 relative z-10">Get the App</h3>
                <p className="text-sm text-gray-500 mb-6 relative z-10 max-w-xs">
                  Look for the install icon in your browser's address bar to add Farm ERP to your device.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-btn text-gray-900 text-sm font-medium shadow-sm relative z-10">
                  Install App
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="customers" className="py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="max-w-2xl mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Trusted by operators</h3>
            <p className="text-lg text-gray-500">See how Farm ERP is changing the way modern agriculture operates.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Sarah Jenkins", role: "Owner, Green Valley Farms", text: "We completely eliminated our spreadsheet chaos. The batch-wise tracking and mortality metrics alone saved us thousands this quarter." },
              { name: "Michael Chen", role: "Operations Manager", text: "The offline capability is a lifesaver. Our barns have terrible reception, but my team can log feed consumption without missing a beat." },
              { name: "David Miller", role: "Chief Accountant", text: "The integration between the POS invoicing and the general ledger is seamless. The RBAC ensures my workers only see what they need to." }
            ].map((t, idx) => (
              <div key={idx} className="bg-white p-6 rounded-card border border-gray-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-brand-accent mb-4">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="text-gray-600 text-sm mb-8 leading-relaxed">"{t.text}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 font-semibold text-xs border border-gray-200">
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
      <section className="py-24 bg-white border-y border-gray-200/60">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Ready to modernize your operations?</h2>
          <p className="text-lg text-gray-500 mb-8">Join the next generation of farm management today.</p>
          {!session ? (
            <Link 
              href="/signup" 
              className="inline-flex justify-center items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-btn text-sm font-medium transition-colors shadow-sm"
            >
              Start Free Trial
            </Link>
          ) : (
            <Link 
              href="/dashboard" 
              className="inline-flex justify-center items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-btn text-sm font-medium transition-colors shadow-sm"
            >
              Enter Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-page-bg pt-16 pb-8 border-t border-gray-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-brand-primary p-1.5 rounded-md">
                  <Tractor className="w-4 h-4 text-white stroke-[2]" />
                </div>
                <span className="text-base font-semibold tracking-tight text-gray-900">Farm ERP</span>
              </div>
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                The operating system for modern livestock, poultry, and agricultural management.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-4">Product</h4>
              <ul className="space-y-2.5 text-gray-500 text-sm">
                <li><a href="#features" className="hover:text-gray-900 transition-colors">Platform</a></li>
                <li><a href="#customers" className="hover:text-gray-900 transition-colors">Customers</a></li>
                <li><a href="#app" className="hover:text-gray-900 transition-colors">Mobile App</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-4">Resources</h4>
              <ul className="space-y-2.5 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">API Reference</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-4">Company</h4>
              <ul className="space-y-2.5 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-gray-900 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200/60 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>&copy; {new Date().getFullYear()} Farm ERP. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-700 transition-colors">Twitter</a>
              <a href="#" className="hover:text-gray-700 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-gray-700 transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
