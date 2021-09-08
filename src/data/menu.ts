export default [
  {
    id: 1,
    title: '菜单1'
  },
  {
    id: 2,
    title: '菜单2',
    children: [
      {
        id: 21,
        title: '菜单2-1',
        children: [
          {
            id: 211,
            title: '菜单2-1-1',
            children: [
              {
                id: 2111,
                title: '菜单2-1-1-1'
              },
              {
                id: 2112,
                title: '菜单2-1-1-2',
                children: [
                  {
                    id: 21121,
                    title: '菜单2-1-1-2-1'
                  }
                ]
              },
              {
                id: 2113,
                title: '菜单2-1-1-3'
              },
            ]
          },
        ]
      },
      {
        id: 22,
        title: '菜单2-2'
      },
      {
        id: 23,
        title: '菜单2-3',
        children: [
          {
            id: 231,
            title: '菜单2-3-1'
          },
        ]
      },
    ]
  },
  {
    id: 3,
    title: '菜单3'
  },
]