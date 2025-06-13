"use client"

import { useEffect, useState } from "react"
import { Calendar, GitCommit, GitPullRequest, Star, GitBranch, Code, Loader2, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "@/contexts/theme-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface GithubActivity {
  date: string
  count: number
}

interface GithubRepo {
  name: string
  url: string
  stars: number
  forks: number
  language: string
  isOrg: boolean
  orgName?: string
}

interface GithubOrg {
  login: string
  url: string
  avatarUrl: string
}

interface GithubStats {
  totalContributions: number
  pullRequests: number
  commits: number
  repositories: number
  orgRepositories: number
}

interface CachedData {
  timestamp: number;
  data: any;
}

// Durée de validité du cache en millisecondes (1 heure)
const CACHE_DURATION = 60 * 60 * 1000;

// Token GitHub (à remplacer par votre token personnel)
// Dans un vrai projet, stockez-le dans .env.local
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || '';

// Nom d'utilisateur GitHub - remplacez par votre nom d'utilisateur
const GITHUB_USERNAME = 'dancodeur';

export function GithubActivity({ username = GITHUB_USERNAME }) {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [activities, setActivities] = useState<GithubActivity[]>([])
  const [personalRepos, setPersonalRepos] = useState<GithubRepo[]>([])
  const [orgRepos, setOrgRepos] = useState<GithubRepo[]>([])
  const [organizations, setOrganizations] = useState<GithubOrg[]>([])
  const [stats, setStats] = useState<GithubStats>({
    totalContributions: 0,
    pullRequests: 0,
    commits: 0,
    repositories: 0,
    orgRepositories: 0
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("personal")

  // Vérifier si les données en cache sont encore valides
  const isCacheValid = (cacheKey: string) => {
    if (typeof window === 'undefined') return false;
    
    try {
      const cachedItem = localStorage.getItem(`${username}_${cacheKey}`);
      if (!cachedItem) return false;
      
      const parsedItem: CachedData = JSON.parse(cachedItem);
      const now = new Date().getTime();
      
      // Vérifier si le cache est encore valide
      return (now - parsedItem.timestamp) < CACHE_DURATION;
    } catch (err) {
      console.error("Erreur lors de la lecture du cache:", err);
      return false;
    }
  }

  // Récupérer des données du cache
  const getFromCache = (cacheKey: string) => {
    if (typeof window === 'undefined') return null;
    
    try {
      const cachedItem = localStorage.getItem(`${username}_${cacheKey}`);
      if (!cachedItem) return null;
      
      const parsedItem: CachedData = JSON.parse(cachedItem);
      return parsedItem.data;
    } catch (err) {
      console.error("Erreur lors de la lecture du cache:", err);
      return null;
    }
  }

  // Sauvegarder des données dans le cache
  const saveToCache = (cacheKey: string, data: any) => {
    if (typeof window === 'undefined') return;
    
    try {
      const cacheItem: CachedData = {
        timestamp: new Date().getTime(),
        data
      };
      localStorage.setItem(`${username}_${cacheKey}`, JSON.stringify(cacheItem));
    } catch (err) {
      console.error("Erreur lors de la sauvegarde dans le cache:", err);
    }
  }

  // Headers pour les requêtes GitHub
  const getGitHubHeaders = () => {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json'
    };
    
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }
    
    return headers;
  }

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true)
        
        // Vérifier si les données en cache sont valides
        if (isCacheValid('personal_repos') && 
            isCacheValid('org_repos') &&
            isCacheValid('organizations') &&
            isCacheValid('github_stats') && 
            isCacheValid('github_activities')) {
          
          // Utiliser les données du cache
          setPersonalRepos(getFromCache('personal_repos'));
          setOrgRepos(getFromCache('org_repos'));
          setOrganizations(getFromCache('organizations'));
          setStats(getFromCache('github_stats'));
          setActivities(getFromCache('github_activities'));
          setError(null);
          setLoading(false);
          return;
        }
        
        // Récupérer les organisations de l'utilisateur
        const orgs = await fetchUserOrganizations();
        setOrganizations(orgs);
        
        // Récupérer les dépôts personnels
        const personalReposData = await fetchPersonalRepositories();
        setPersonalRepos(personalReposData);
        
        // Récupérer les dépôts des organisations
        const orgReposData = await fetchOrganizationRepositories(orgs);
        setOrgRepos(orgReposData);
        
        // Pour les stats et l'activité
        const pullRequests = await fetchPullRequests();
        const commits = await fetchCommits([...personalReposData, ...orgReposData]);
        
        const statsData = {
          totalContributions: calculateTotalContributions([...personalReposData, ...orgReposData]),
          pullRequests,
          commits,
          repositories: personalReposData.length,
          orgRepositories: orgReposData.length
        };
        
        // Récupérer les données d'activité si le token est disponible
        const activityData = GITHUB_TOKEN 
          ? await fetchContributionActivity() 
          : generateActivityData();
        
        // Sauvegarder dans le cache
        saveToCache('personal_repos', personalReposData);
        saveToCache('org_repos', orgReposData);
        saveToCache('organizations', orgs);
        saveToCache('github_stats', statsData);
        saveToCache('github_activities', activityData);
        
        setStats(statsData);
        setActivities(activityData);
        setError(null);
      } catch (err) {
        console.error("Erreur lors de la récupération des données GitHub:", err);
        setError("Impossible de charger les données GitHub");
      } finally {
        setLoading(false);
      }
    };
    
    fetchGitHubData();
  }, [username]);
  
  // Fonction pour récupérer les organisations de l'utilisateur
  const fetchUserOrganizations = async () => {
    try {
      // Vérifier si les données sont en cache
      if (isCacheValid('organizations')) {
        return getFromCache('organizations');
      }
      
      const response = await fetch(
        `https://api.github.com/users/${username}/orgs`, 
        { headers: getGitHubHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Erreur GitHub: ${response.status}`);
      }
      
      const orgsData = await response.json();
      
      if (!Array.isArray(orgsData)) {
        throw new Error("Impossible de récupérer les organisations");
      }
      
      // Vérifier si NEYOS-PRO est dans la liste, sinon l'ajouter manuellement
      const hasNeyosPro = orgsData.some(org => org.login === 'NEYOS-PRO');
      
      let formattedOrgs = orgsData.map(org => ({
        login: org.login,
        url: org.html_url,
        avatarUrl: org.avatar_url
      }));
      
      // Ajouter manuellement NEYOS-PRO si elle n'est pas dans la liste
      if (!hasNeyosPro) {
        console.log("Ajout manuel de l'organisation NEYOS-PRO");
        formattedOrgs.push({
          login: 'NEYOS-PRO',
          url: 'https://github.com/NEYOS-PRO',
          avatarUrl: 'https://avatars.githubusercontent.com/u/NEYOS-PRO' // Sera remplacé par la vraie URL
        });
      }
      
      return formattedOrgs;
    } catch (err) {
      console.error("Erreur lors de la récupération des organisations:", err);
      
      // Ajouter NEYOS-PRO en cas d'erreur
      return [{
        login: 'NEYOS-PRO',
        url: 'https://github.com/NEYOS-PRO',
        avatarUrl: 'https://avatars.githubusercontent.com/u/NEYOS-PRO' // Sera remplacé par la vraie URL
      }];
    }
  };
  
  // Fonction pour récupérer les dépôts personnels
  const fetchPersonalRepositories = async () => {
    try {
      // Vérifier si les données sont en cache
      if (isCacheValid('personal_repos')) {
        return getFromCache('personal_repos');
      }
      
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, 
        { headers: getGitHubHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Erreur GitHub: ${response.status}`);
      }
      
      const reposData = await response.json();
      
      if (!Array.isArray(reposData)) {
        throw new Error("Impossible de récupérer les dépôts personnels");
      }
      
      // Transformer les données des dépôts personnels
      const formattedRepos = reposData
        .filter(repo => !repo.fork) // Exclure les forks
        .map(repo => ({
          name: repo.name,
          url: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language || "N/A",
          isOrg: false
        }));
      
      return formattedRepos;
    } catch (err) {
      console.error("Erreur lors de la récupération des dépôts personnels:", err);
      return [];
    }
  };
  
  // Fonction pour récupérer les dépôts des organisations
  const fetchOrganizationRepositories = async (orgs: GithubOrg[]) => {
    try {
      // Vérifier si les données sont en cache
      if (isCacheValid('org_repos')) {
        return getFromCache('org_repos');
      }
      
      let allOrgRepos: GithubRepo[] = [];
      
      for (const org of orgs) {
        try {
          console.log(`Récupération des repos pour l'organisation: ${org.login}`);
          
          const response = await fetch(
            `https://api.github.com/orgs/${org.login}/repos?type=all&sort=updated&per_page=100`, 
            { headers: getGitHubHeaders() }
          );
          
          if (!response.ok) {
            console.warn(`Erreur lors de la récupération des repos pour ${org.login}: ${response.status}`);
            continue; // Passer à la prochaine organisation en cas d'erreur
          }
          
          const reposData = await response.json();
          
          if (Array.isArray(reposData) && reposData.length > 0) {
            console.log(`${reposData.length} repos trouvés pour ${org.login}`);
            
            // Pour NEYOS-PRO, supposons que l'utilisateur a contribué à tous les repos
            if (org.login === 'NEYOS-PRO') {
              const orgRepos = reposData.map(repo => ({
                name: repo.name,
                url: repo.html_url,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                language: repo.language || "N/A",
                isOrg: true,
                orgName: org.login
              }));
              allOrgRepos = [...allOrgRepos, ...orgRepos];
            } else {
              // Pour les autres orgs, vérifier les contributions
              const orgRepos = await filterContributedRepos(reposData, org.login);
              allOrgRepos = [...allOrgRepos, ...orgRepos];
            }
          } else {
            console.log(`Aucun repo trouvé pour ${org.login}`);
          }
        } catch (error) {
          // Continuer même si une organisation échoue
          console.error(`Erreur avec l'organisation ${org.login}:`, error);
        }
      }
      
      console.log(`Total de ${allOrgRepos.length} repos d'organisation trouvés`);
      return allOrgRepos;
    } catch (err) {
      console.error("Erreur lors de la récupération des dépôts des organisations:", err);
      return [];
    }
  };
  
  // Fonction pour filtrer les dépôts auxquels l'utilisateur a contribué
  const filterContributedRepos = async (repos, orgName) => {
    const contributedRepos: GithubRepo[] = [];
    
    // Si c'est NEYOS-PRO, supposons que l'utilisateur a contribué à tous les repos
    if (orgName === 'NEYOS-PRO') {
      return repos.map(repo => ({
        name: repo.name,
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || "N/A",
        isOrg: true,
        orgName
      }));
    }
    
    for (const repo of repos) {
      try {
        // Vérifier si l'utilisateur est un contributeur
        const response = await fetch(
          `https://api.github.com/repos/${orgName}/${repo.name}/contributors`, 
          { headers: getGitHubHeaders() }
        );
        
        if (!response.ok) {
          continue;
        }
        
        const contributors = await response.json();
        
        if (Array.isArray(contributors) && 
            contributors.some(contributor => contributor.login.toLowerCase() === username.toLowerCase())) {
          contributedRepos.push({
            name: repo.name,
            url: repo.html_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language || "N/A",
            isOrg: true,
            orgName
          });
        }
      } catch (error) {
        // Continuer même si un dépôt échoue
      }
    }
    
    return contributedRepos;
  };
  
  // Fonction pour récupérer les données de contribution réelles (nécessite un token)
  const fetchContributionActivity = async () => {
    try {
      // Cette requête nécessite un token d'authentification
      // Elle utilise l'API GraphQL de GitHub pour obtenir les contributions
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              user(login: "${username}") {
                contributionsCollection {
                  contributionCalendar {
                    weeks {
                      contributionDays {
                        date
                        contributionCount
                      }
                    }
                  }
                }
              }
            }
          `
        })
      });
      
      const data = await response.json();
      
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      
      // Transformer les données GraphQL en format attendu
      const allContributionDays = data.data.user.contributionsCollection.contributionCalendar.weeks
        .flatMap(week => week.contributionDays)
        .map(day => ({
          date: day.date,
          count: day.contributionCount
        }));

    // Prendre les 14 derniers jours manuellement
    return allContributionDays.slice(-14);
    } catch (err) {
      console.error("Erreur lors de la récupération des contributions:", err);
      // En cas d'échec, revenir à des données générées
      return generateActivityData();
    }
  };
  
  // Fonctions utilitaires
  const calculateTotalContributions = (repos) => {
    return repos.reduce((sum, repo) => sum + (repo.stars || 0) + (repo.forks || 0), 0);
  };
  
  const fetchPullRequests = async () => {
    try {
      // Vérifier si les données sont en cache
      if (isCacheValid('github_prs')) {
        return getFromCache('github_prs');
      }
      
      const response = await fetch(
        `https://api.github.com/search/issues?q=author:${username}+type:pr`, 
        { headers: getGitHubHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Erreur GitHub: ${response.status}`);
      }
      
      const data = await response.json();
      const prCount = data.total_count || 0;
      
      // Sauvegarder dans le cache
      saveToCache('github_prs', prCount);
      
      return prCount;
    } catch (err) {
      console.error("Erreur lors de la récupération des PRs:", err);
      return 0;
    }
  };
  
  const fetchCommits = async (repos) => {
    try {
      // Vérifier si les données sont en cache
      if (isCacheValid('github_commits')) {
        return getFromCache('github_commits');
      }
      
      // Utiliser l'API search pour obtenir le nombre total de commits
      const response = await fetch(
        `https://api.github.com/search/commits?q=author:${username}`, 
        { 
          headers: {
            ...getGitHubHeaders(),
            'Accept': 'application/vnd.github.cloak-preview+json'
          } 
        }
      );
      
      if (!response.ok) {
        throw new Error(`Erreur GitHub: ${response.status}`);
      }
      
      const data = await response.json();
      const commitCount = data.total_count || 0;
      
      // Sauvegarder dans le cache
      saveToCache('github_commits', commitCount);
      
      return commitCount;
    } catch (err) {
      console.error("Erreur lors de la récupération des commits:", err);
      
      // Fallback: estimation basée sur les repos
      let totalCommits = 0;
      
      for (const repo of repos.slice(0, 5)) { // Limiter aux 5 premiers repos
        try {
          let url = '';
          if (repo.isOrg) {
            url = `https://api.github.com/repos/${repo.orgName}/${repo.name}/commits?author=${username}`;
          } else {
            url = `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}`;
          }
          
          const response = await fetch(url, { headers: getGitHubHeaders() });
          
          if (!response.ok) {
            continue;
          }
          
          const commits = await response.json();
          if (Array.isArray(commits)) {
            totalCommits += commits.length;
          }
        } catch (error) {
          // Continuer même si un repo échoue
        }
      }
      
      return totalCommits || 30; // Valeur par défaut si tout échoue
    }
  };
  
  const generateActivityData = () => {
    const activityData: GithubActivity[] = [];
    const today = new Date();
    
    for (let i = 13; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      // Générer un nombre aléatoire mais réaliste de contributions
      const count = Math.floor(Math.random() * 10);
      
      activityData.push({
        date: date.toISOString().split('T')[0],
        count
      });
    }
    
    return activityData;
  };

  const getIntensityClass = (count: number) => {
    if (theme === "dark") {
      if (count === 0) return "bg-zinc-800"
      if (count < 3) return "bg-emerald-900"
      if (count < 5) return "bg-emerald-700"
      return "bg-emerald-500"
    } else {
      if (count === 0) return "bg-gray-100"
      if (count < 3) return "bg-emerald-200"
      if (count < 5) return "bg-emerald-300"
      return "bg-emerald-500"
    }
  }

  const getLanguageColor = (language: string) => {
    const colors = {
      "TypeScript": "bg-blue-500",
      "JavaScript": "bg-yellow-500",
      "Python": "bg-green-500",
      "HTML": "bg-orange-500",
      "CSS": "bg-pink-500",
      "Java": "bg-red-500",
      "PHP": "bg-purple-500",
      "C#": "bg-indigo-500",
      "C++": "bg-sky-500",
      "Ruby": "bg-red-600",
      "Go": "bg-cyan-500",
      "Swift": "bg-orange-600",
    }
    
    return colors[language] || "bg-gray-500"
  }

  if (loading) {
    return (
      <Card className="bg-white border-gray-200 shadow-md ring-1 ring-gray-200/50 dark:bg-zinc-900 dark:border-zinc-700 dark:shadow-none dark:ring-zinc-700/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2 text-gray-900 dark:text-zinc-300">
            <Calendar className="h-5 w-5 text-gray-600 dark:text-zinc-400" />
            {t("githubActivity", "header")}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center min-h-[200px]">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 text-gray-500 dark:text-zinc-400 animate-spin mb-2" />
            <p className="text-sm text-gray-500 dark:text-zinc-500">Chargement des données GitHub...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-white border-gray-200 shadow-md ring-1 ring-gray-200/50 dark:bg-zinc-900 dark:border-zinc-700 dark:shadow-none dark:ring-zinc-700/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2 text-gray-900 dark:text-zinc-300">
            <Calendar className="h-5 w-5 text-gray-600 dark:text-zinc-400" />
            {t("githubActivity", "header")}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-sm text-red-500">{error}</p>
          <p className="text-xs text-gray-500 dark:text-zinc-500 mt-2">
            Vérifiez votre connexion internet ou réessayez plus tard.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white border-gray-200 shadow-md ring-1 ring-gray-200/50 dark:bg-zinc-900 dark:border-zinc-700 dark:shadow-none dark:ring-zinc-700/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2 text-gray-900 dark:text-zinc-300">
          <Calendar className="h-5 w-5 text-gray-600 dark:text-zinc-400" />
          {t("githubActivity", "header")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Contribution graph */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-zinc-400">Contributions récentes</h4>
              <span className="text-xs text-gray-500 dark:text-zinc-500">14 derniers jours</span>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-1">
              {activities.slice(0, 7).map((activity, index) => (
                <div
                  key={index}
                  className={`h-4 w-full rounded-sm ${getIntensityClass(activity.count)}`}
                  title={`${activity.date}: ${activity.count} contributions`}
                ></div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {activities.slice(7, 14).map((activity, index) => (
                <div
                  key={index}
                  className={`h-4 w-full rounded-sm ${getIntensityClass(activity.count)}`}
                  title={`${activity.date}: ${activity.count} contributions`}
                ></div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-zinc-800 rounded-md">
              <div className="flex items-center gap-1 text-gray-600 dark:text-zinc-400 text-xs mb-1">
                <GitCommit className="h-3 w-3" />
                <span>Commits</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-zinc-300">{stats.commits}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-zinc-800 rounded-md">
              <div className="flex items-center gap-1 text-gray-600 dark:text-zinc-400 text-xs mb-1">
                <GitPullRequest className="h-3 w-3" />
                <span>Pull Requests</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-zinc-300">{stats.pullRequests}</span>
            </div>
          </div>

          {/* Repositories */}
          <div>
            <Tabs defaultValue="personal" onValueChange={setActiveTab}>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-gray-700 dark:text-zinc-400">Repositories</h4>
                <TabsList className="h-7 p-1">
                  <TabsTrigger value="personal" className="text-xs px-2 py-1 h-5">
                    Personnels ({stats.repositories})
                  </TabsTrigger>
                  <TabsTrigger value="org" className="text-xs px-2 py-1 h-5">
                    Organisation ({stats.orgRepositories})
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="personal" className="mt-0">
                <div className="space-y-2">
                  {personalRepos.length > 0 ? (
                    personalRepos.slice(0, 3).map((repo, index) => (
                      <a 
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-zinc-800 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Code className="h-4 w-4 text-gray-500 dark:text-zinc-500" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-zinc-300">{repo.name}</div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-500">
                              <div className="flex items-center gap-1">
                                <div className={`h-2 w-2 rounded-full ${getLanguageColor(repo.language)}`}></div>
                                <span>{repo.language}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-zinc-500">
                            <Star className="h-3 w-3" />
                            <span>{repo.stars}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-zinc-500">
                            <GitBranch className="h-3 w-3" />
                            <span>{repo.forks}</span>
                          </div>
                        </div>
                      </a>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-zinc-500 text-center py-2">
                      Aucun dépôt personnel trouvé
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="org" className="mt-0">
                <div className="space-y-2">
                  {orgRepos.length > 0 ? (
                    orgRepos.slice(0, 3).map((repo, index) => (
                      <a 
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-zinc-800 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-gray-500 dark:text-zinc-500" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-zinc-300">
                              {repo.name}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-500">
                              <div className="flex items-center gap-1">
                                <div className={`h-2 w-2 rounded-full ${getLanguageColor(repo.language)}`}></div>
                                <span>{repo.language}</span>
                              </div>
                              {repo.orgName && (
                                <span className="text-xs">· {repo.orgName}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-zinc-500">
                            <Star className="h-3 w-3" />
                            <span>{repo.stars}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-zinc-500">
                            <GitBranch className="h-3 w-3" />
                            <span>{repo.forks}</span>
                          </div>
                        </div>
                      </a>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-zinc-500 text-center py-2">
                      Aucun dépôt d'organisation trouvé
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Organizations */}
          {organizations.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-zinc-400 mb-2">Organisations</h4>
              <div className="flex flex-wrap gap-2">
                {organizations.map((org, index) => (
                  <a
                    key={index}
                    href={org.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-1.5 bg-gray-50 dark:bg-zinc-800 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <img 
                      src={org.avatarUrl} 
                      alt={org.login} 
                      className="h-5 w-5 rounded-sm"
                    />
                    <span className="text-xs font-medium text-gray-700 dark:text-zinc-300">
                      {org.login}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
