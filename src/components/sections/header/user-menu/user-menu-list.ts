export interface UserMenuListInterface {
  linkName: string;
  linkPath: string;
  icon: 'wrench' | 'cog' | 'question' | 'user';
}

export const userMenuList: UserMenuListInterface[] = [
  {
    linkName: 'Profile',
    linkPath: '/profile',
    icon: 'user',
  },
  {
    linkName: 'Maintenance',
    linkPath: '/maintenance',
    icon: 'wrench',
  },
  {
    linkName: 'Settings',
    linkPath: '/settings',
    icon: 'cog',
  },
  {
    linkName: 'Help',
    linkPath: '/Help',
    icon: 'question',
  },
];
