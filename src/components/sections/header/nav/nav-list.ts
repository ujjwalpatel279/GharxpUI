export interface NavListInterface {
  linkName: string;
  linkPath: string;
  icon: 'user' | 'clients' | 'products' | 'lendingcriteria';
}

export const navList: NavListInterface[] = [
  {
    linkName: 'User',
    linkPath: '/UserReg',
    icon: 'user',
  },
  {
    linkName: 'Clients',
    linkPath: '/clients',
    icon: 'clients',
  },
  {
    linkName: 'Products',
    linkPath: '/products',
    icon: 'products',
  },
];
