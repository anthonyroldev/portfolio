export default function Footer() {
    return (
        <footer className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 py-6 text-center border-t border-slate-200 dark:border-slate-800">
            <p className="text-sm">
                {new Date().getFullYear()} - Fait par Anthony ROLLAND
            </p>
        </footer>
    );
}