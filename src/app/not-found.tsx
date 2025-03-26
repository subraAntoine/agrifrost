import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-sm rounded-lg sm:px-10">
          <div className="text-center">
            <h1 className="text-6xl font-extrabold text-primary-600 dark:text-primary-400">404</h1>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Page non trouvée</h2>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
              Désolé, nous n&apos;avons pas pu trouver la page que vous recherchez.
            </p>
            <div className="mt-6">
              <Link
                href="/landing"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 