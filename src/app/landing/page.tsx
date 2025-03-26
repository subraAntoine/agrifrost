import Link from 'next/link';
import Image from 'next/image';
import './styles.css';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-green-50 dark:bg-gray-900">
      {/* Hero Section avec image de fond */}
      <header className="bg-green-700 dark:bg-green-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-white animate-pulse">AgriFrost</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/dashboard" 
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-700 bg-white hover:bg-gray-100 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
            >
              Connexion
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Banner avec image de fond */}
        <div className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
          {/* Image d'arrière-plan */}
          <div className="absolute inset-0">
            <Image 
              src="/images/image.jpg" 
              alt="Vignoble" 
              fill 
              priority
              className="object-cover brightness-70"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block drop-shadow-lg">Protection anti-gel</span>
                <span className="block text-green-200 mt-2 drop-shadow-lg">intelligente pour vignobles</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl drop-shadow-md">
                Système de prévention et de gestion du gel pour protéger vos vignes des dommages causés par le gel nocturne.
              </p>
              <div className="mt-10 sm:flex sm:justify-center">
                <div className="rounded-md shadow">
                  <Link
                    href="/dashboard"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-800 bg-white hover:bg-green-50 transform hover:scale-105 transition-all duration-300 md:py-4 md:text-lg md:px-10"
                  >
                    Accéder à la plateforme
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    href="#features"
                    className="w-full flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white bg-green-800 hover:bg-green-900 transform hover:scale-105 transition-all duration-300 md:py-4 md:text-lg md:px-10"
                  >
                    En savoir plus
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features avec couleur unie */}
        <div id="features" className="py-16 bg-white dark:bg-gray-800 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-green-700 dark:text-green-500 uppercase tracking-wide">Fonctionnalités</h2>
              <p className="mt-2 text-3xl font-extrabold text-green-700 dark:text-green-500 tracking-tight sm:text-4xl">
                Protégez vos vignes intelligemment
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto">
                AgriFrost vous offre une suite complète d&apos;outils pour lutter efficacement contre le gel.
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="pt-6 transform transition-all duration-500 hover:scale-105">
                  <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors duration-300">
                    <div className="-mt-6">
                      <div className="inline-flex items-center justify-center p-3 bg-green-700 rounded-md shadow-lg transform transition-all duration-300 hover:rotate-6">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">Monitoring en temps réel</h3>
                      <p className="mt-5 text-base text-gray-600 dark:text-gray-300">
                        Suivez les conditions météorologiques et les températures en temps réel dans votre exploitation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 transform transition-all duration-500 hover:scale-105">
                  <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors duration-300">
                    <div className="-mt-6">
                      <div className="inline-flex items-center justify-center p-3 bg-green-700 rounded-md shadow-lg transform transition-all duration-300 hover:rotate-6">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">Analyses prédictives</h3>
                      <p className="mt-5 text-base text-gray-600 dark:text-gray-300">
                        Anticipez les risques de gel grâce à nos algorithmes d&apos;analyse prédictive et adaptez votre stratégie.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 transform transition-all duration-500 hover:scale-105">
                  <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors duration-300">
                    <div className="-mt-6">
                      <div className="inline-flex items-center justify-center p-3 bg-green-700 rounded-md shadow-lg transform transition-all duration-300 hover:rotate-6">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625 1.234 9.168 3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">Notifications intelligentes</h3>
                      <p className="mt-5 text-base text-gray-600 dark:text-gray-300">
                        Recevez des alertes personnalisées en fonction des conditions météo et des risques de gel détectés.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Témoignages avec couleur unie */}
        <div className="bg-green-50 dark:bg-gray-900 py-16 sm:py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <h2 className="text-base font-semibold text-green-700 dark:text-green-500 uppercase tracking-wide">Témoignages</h2>
              <p className="mt-2 text-3xl font-extrabold text-green-700 dark:text-green-500 tracking-tight sm:text-4xl">
                Ils nous font confiance
              </p>
            </div>
            <div className="mt-12">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-200 dark:border-gray-700 transform transition-all duration-500 hover:scale-105 hover:rotate-1">
                  <div className="absolute top-0 left-0 transform -translate-y-1/2 -translate-x-1/2">
                    <div className="text-6xl text-green-500 opacity-20">&quot;</div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                    &quot;Depuis que nous avons installé AgriFrost, nos pertes dues au gel ont diminué de 85%. Un investissement qui a rapidement été rentabilisé.&quot;
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-700 dark:bg-green-800 flex items-center justify-center">
                      <span className="text-white font-bold">DV</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">Domaine Viticole du Sud</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Bordeaux, France</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-200 dark:border-gray-700 transform transition-all duration-500 hover:scale-105 hover:rotate-1">
                  <div className="absolute top-0 left-0 transform -translate-y-1/2 -translate-x-1/2">
                    <div className="text-6xl text-green-500 opacity-20">&quot;</div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                    &quot;L&apos;interface est intuitive et nous permet de contrôler l&apos;ensemble de notre système anti-gel à distance. Les notifications sont précises et nous permettent d&apos;intervenir à temps.&quot;
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-700 dark:bg-green-800 flex items-center justify-center">
                      <span className="text-white font-bold">CV</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">Château Vignoble</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Loire Valley, France</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA avec couleur unie */}
        <div className="bg-green-700 dark:bg-green-900 relative overflow-hidden">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between relative">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block drop-shadow-md">Prêt à protéger vos vignes ?</span>
              <span className="block text-green-200 drop-shadow-md">Commencez dès aujourd&apos;hui.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-800 bg-white hover:bg-green-50 transform hover:scale-110 transition-all duration-300"
                >
                  Accéder à la plateforme
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white bg-green-900 hover:bg-green-950 transform hover:scale-110 transition-all duration-300"
                >
                  Nous contacter
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer avec couleur unie */}
      <footer className="bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="transform hover:scale-105 transition-all duration-300">
              <h3 className="text-sm font-semibold text-green-700 dark:text-green-500 uppercase tracking-wide">À propos</h3>
              <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
                AgriFrost est une solution complète de protection contre le gel pour les viticulteurs, développée par des experts en viticulture et en technologies IoT.
              </p>
            </div>
            <div className="transform hover:scale-105 transition-all duration-300">
              <h3 className="text-sm font-semibold text-green-700 dark:text-green-500 uppercase tracking-wide">Liens rapides</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link href="/dashboard" className="text-base text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 transition-colors duration-300">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/monitoring" className="text-base text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 transition-colors duration-300">
                    Monitoring
                  </Link>
                </li>
                <li>
                  <Link href="/analytics" className="text-base text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 transition-colors duration-300">
                    Analyses
                  </Link>
                </li>
              </ul>
            </div>
            <div id="contact" className="transform hover:scale-105 transition-all duration-300">
              <h3 className="text-sm font-semibold text-green-700 dark:text-green-500 uppercase tracking-wide">Contact</h3>
              <ul className="mt-4 space-y-4">
                <li className="flex items-center hover:translate-x-2 transition-transform duration-300">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                    <svg className="h-5 w-5 text-green-700 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="ml-3 text-base text-gray-600 dark:text-gray-300">contact@agrifrost.com</span>
                </li>
                <li className="flex items-center hover:translate-x-2 transition-transform duration-300">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                    <svg className="h-5 w-5 text-green-700 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="ml-3 text-base text-gray-600 dark:text-gray-300">+33 (0)1 23 45 67 89</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <a href="#" className="text-gray-500 hover:text-green-700 transform hover:scale-125 transition-all duration-300">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-green-700 transform hover:scale-125 transition-all duration-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
            <p className="mt-8 text-base text-gray-500 md:mt-0 md:order-1">
              &copy; {new Date().getFullYear()} AgriFrost. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 