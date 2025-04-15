/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

interface Link {
  site: string;
  link: string;
}

interface CreditPerson {
  person: string;
  attribution: string;
  links: Link[];
}

export const SOs_and_Credits_List: CreditPerson[] = [
  {
    person: 'Michel Weststrate',
    attribution: 'Creator of MobX. The global state manager powering the app.',
    links: [
      {
        site: 'Twitter',
        link: 'https://twitter.com/mweststrate',
      },
      {
        site: 'MobX',
        link: 'https://mobx-state-tree.js.org/intro/philosophy',
      },
    ],
  },
  {
    person: 'Kaybarax',
    attribution: 'Creator of this startup template.',
    links: [
      {
        site: 'Twitter',
        link: 'https://twitter.com/Kaybarax',
      },
      {
        site: 'Linked In',
        link: 'https://linkedin.com/in/kaybrax',
      },
    ],
  },
  {
    person: 'Andy Haskell',
    attribution:
      'Tutorial guide on implementing IndexedDb. Thanks a lot dude for your tutorial I ' +
      'came across on @Medium and Dev.to.',
    links: [
      {
        site: 'Twitter',
        link: 'https://twitter.com/AndyHaskell2013',
      },
      {
        site: 'Awesome intro to IndexedDb',
        link: 'https://dev.to/andyhaskell/build-a-basic-web-app-with-indexeddb-38ef',
      },
    ],
  },
];
