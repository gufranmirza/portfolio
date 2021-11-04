module.exports = {
  email: 'gufranmirza1@gmail.com',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/gufranmirza',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/_imGufran',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/gufranmirza',
    },
    {
      name: 'CodeSendbox',
      url: 'https://codesandbox.io/u/gufranmirza',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'OSS',
      url: '/open-source',
    },
    {
      name: 'Blogs',
      url: '/blogs',
    },
    {
      name: 'Experiments',
      url: '/experiments',
    },
    {
      name: 'Talks',
      url: '/talks',
    },
    {
      name: 'Research',
      url: '/research',
    },
    {
      name: 'Products',
      url: 'products',
    },
  ],

  colors: {
    green: '#02c39a',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
