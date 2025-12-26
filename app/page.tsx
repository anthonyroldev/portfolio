import Image from "next/image";

export default function Home() {
    return (
        <section className="py-10 md:py-16">
            <div className="text-center md:text-left">
                <p className="text-4xl md:text-5xl font-bold">ROLLAND Anthony</p>
                <h2 className="text-2xl md:text-3xl mt-4 font-bold bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                    Étudiant en informatique - Futur ingénieur logiciel
                    <br />
                    Alternant développeur back-end chez{" "}
                    <a 
                        href="https://www.sncf-connect-tech.fr/" 
                        target="_blank"
                        className="hover:underline"
                    >
                        SNCF Connect & Tech
                    </a>
                </h2>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12">
                <Image
                    src="/me.jpg"
                    alt="Anthony ROLLAND"
                    width={300}
                    height={300}
                    className="rounded-3xl w-48 h-56 md:w-72 md:h-80 object-cover shadow-lg"
                    priority
                />
                <p className="text-lg md:text-xl text-justify max-w-2xl leading-relaxed">
                    Je m&#39;appelle Anthony Rolland, j&#39;ai 21 ans et je suis étudiant en 1ère année de cycle
                    ingénieur à l&#39;INSA Hauts-De-France, spécialité informatique et cybersécurité.
                    <br />
                    <br />
                    Le domaine des nouvelles technologies et plus particulièrement de l&#39;informatique me
                    passionne. Vous pouvez voir sur mon portfolio toutes mes compétences ainsi que mon parcours
                    scolaire. J&#39;ai l&#39;occasion de faire des petits projets personnels pour gagner en
                    compétences et en expérience.
                </p>
            </div>
        </section>
    );
}