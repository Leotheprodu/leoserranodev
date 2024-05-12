export interface NavLink {
  name: 'nav.home' | 'nav.about' | 'nav.blog' | 'nav.projects' | 'nav.contact';
  path:
    | 'link.home'
    | 'link.about'
    | 'link.blog'
    | 'link.projects'
    | 'link.contact';
  icon: string;
}

export const navLinks = [
  {
    name: 'nav.home',
    path: 'link.home',
    icon: 'home',
  },
  {
    name: 'nav.about',
    path: 'link.about',
    icon: 'about',
  },
  {
    name: 'nav.blog',
    path: 'link.blog',
    icon: 'blog',
  },
  {
    name: 'nav.projects',
    path: 'link.projects',
    icon: 'projects',
  },
  {
    name: 'nav.contact',
    path: 'link.contact',
    icon: 'contact',
  },
];
