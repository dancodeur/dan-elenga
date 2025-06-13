export const translations = {
  fr: {
    header: {
      title: "Dan Elenga",
      subtitle:
        "À la recherche d’une alternance à partir de septembre 2025 dans le cadre de mon Mastère Lead Développeur Full Stack — motivé à rejoindre une équipe pour relever de nouveaux défis.",
      downloadCV: "Télécharger mon CV",
      githubActivity: "Activités GitHub",
    },
    experience: {
      title: "Expériences professionnelles",
      company: "Entreprise",
      location: "Lieu",
      stage: "Stage",
      alternance: "Alternance",
      emploi: "Emploi",
    },
    projects: {
      title: "Projets",
      viewMore: "Voir plus de projets sur GitHub",
      demo: "Démo",
      code: "Code",
    },
    about: {
      title: "À propos",
      description:
        "Je suis Dan Elenga, apprenti développeur web full-stack chez Neyos et étudiant en troisième année de Bachelor Métiers du Multimédia et de l’Internet, parcours Développement Web et Dispositifs Interactifs à CY Cergy Paris Université."
    },
    education: {
      title: "Formation",
    },
    footer: {
      rights: "Tous droits réservés.",
    },
  },
  en: {
    header: {
      title: "Dan Elenga",
      subtitle: "Looking for an apprenticeship starting in September 2025 as part of my Master’s in Lead Full Stack Development — eager to join a team and take on new challenges.",
      downloadCV: "Download my CV",
      githubActivity: "GitHub Activity",
    },
    experience: {
      title: "Professional Experience",
      company: "Company",
      location: "Location",
      stage: "Internship",
      alternance: "Apprenticeship",
      emploi: "Employment",
    },
    projects: {
      title: "Projects",
      viewMore: "View more projects on GitHub",
      demo: "Demo",
      code: "Code",
    },
    about: {
      title: "About",
      description:
        "I'm Dan Elenga, a full-stack web development apprentice at Neyos and a third-year Bachelor's student in Multimedia and Internet Technologies, specializing in Web Development and Interactive Systems, at CY Cergy Paris University.",
    },
    education: {
      title: "Education",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
}

export type Language = "fr" | "en"
export type TranslationKey = keyof typeof translations.fr
