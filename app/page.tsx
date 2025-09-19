import Image from "next/image";

export default function Home() {
    return (
        <>
            <main className="p-8 text-center min-h-screen md:ml-12">
                <p className="text-4xl">ROLLAND Anthony</p>
                <h2 className="text-3xl mt-3 font-bold bg-gradient-to-r
                    from-green-400 to-blue-500
                    bg-clip-text text-transparent">
                    Étudiant en informatique - Futur ingénieur logiciel
                    <br/>
                    Alternant développeur back-end chez <a href={"https://www.sncf-connect-tech.fr/"} target={"_blank"}>SNCF
                    Connect & Tech</a>
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-center md:text-center">
                    <Image src="/me.jpg"
                           alt="me"
                           width={300}
                           height={300}
                           className="rounded-3xl mt-11 md:mt-0 md:ml-8 w-48 h-56 md:w-72 md:h-80"
                    />
                    <p className="p-8 md:p-32 text-xl text-justify">
                        Je m&#39;appelle Anthony Rolland, j&#39;ai 20 ans et je suis étudiant en 1ère année de cycle
                        ingénieur à
                        l&#39;INSA Hauts-De-France, spécialité informatique et cybersécurité.
                        <br/>
                        Le domaine des nouvelles technologies et plus particulièrement de
                        l&#39;informatique me
                        passionne. Vous pouvez voir sur mon portfolio toutes mes compétences ainsi que mon parcours
                        scolaire. J&#39;ai l&#39;occasion de faire des petits projets personnels pour gagner en
                        compétences et en
                        expérience.
                    </p>
                </div>
            </main>
        </>
    );
}