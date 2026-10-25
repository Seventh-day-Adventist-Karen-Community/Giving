import { MetadataRoute } from 'next';
import FetchAdventistBeliefs from '../data/adventist_beliefs';
import FetchGroups from '../data/groups';
const host = 'https://www.sdackc.org'

const getBeliefsSitemap = async () => {
  const data = await FetchAdventistBeliefs();
  return data?.map(belief => ({
    url: `${host}/who-we-are/our-beliefs/${belief.slug}`,
    lastModified: belief.modified ? new Date(belief.modified) : belief.created ? new Date(belief.created) : new Date(),
  })) || [];
};

const getGroupsSitemap = async () => {
  const { groups } = await FetchGroups({});
  return groups?.map(group => ({
    url: `${host}/group/${group.id}`,
    lastModified: group.modified ? new Date(group.modified) : group.created ? new Date(group.created) : new Date(),
  })) || [];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls = [
    '/',
    '/contact-us',
    '/public-ministry',
    '/auth/login',
    '/auth/password-reset',
    '/auth/signup',
    '/auth/resend',
    '/departments/careers',
    '/departments/kids',
    '/departments/kids/karen-kids',
    '/departments/kids/parents',
    '/departments/servingopportunities',
    '/departments/store',
    '/departments/tools-for-growth',
    '/departments/whatnext',
    '/departments/youth',
    '/departments/youth/karen-youth',
    '/departments/youth/parents',
    '/departments/free-church-resources',
    '/give-now/mpesa',
    '/giving',
    '/giving/faq',
    '/giving/ways',
    '/giving/ways/crypto-currency',
    '/giving/ways/stocks',
    '/group/search',
    '/groups',
    '/groups/resources',
    '/missions',
    '/who-we-are',
    '/who-we-are/our-beliefs',
    '/policies/cookies',
    '/policies/termsofuse',
    // ... (other static URLs)
  ].map(url => ({
    url: `${host}${url}`,
    lastModified: new Date(),
  }));

  const beliefsSitemap = await getBeliefsSitemap();
  const groupsSitemap = await getGroupsSitemap();

  return [
    ...staticUrls,
    ...beliefsSitemap,
    ...groupsSitemap,
  ];
}
