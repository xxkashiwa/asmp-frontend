import { News } from '@/types';

export const mockNewsData: News[] = [
  {
    id: 1,
    title: '我校获得2024年度国家重点科研项目立项',
    content: '我校材料科学与工程学院在新能源材料领域取得重大突破，获得国家自然科学基金重点项目支持。',
    description: '材料科学与工程学院获得重点科研项目',
    url: 'https://example.com/news/1',
    author: '科研处',
    publishDate: '2024-01-15',
    category: '学术动态',
    isActive: true,

    views: 1520
  },
  {
    id: 2,
    title: '2024年春季运动会圆满落幕',
    content: '为期三天的春季运动会在田径场圆满结束，共有来自各院系的3000余名学生参加比赛。',
    description: '春季运动会完美收官',
    url: 'https://example.com/news/2',
    author: '体育部',
    publishDate: '2024-03-20',
    category: '校园新闻',
    isActive: true,
    views: 2340
  },
  {
    id: 3,
    title: '国际学术交流周即将开启',
    content: '第八届国际学术交流周将于下月举行，届时将有来自15个国家的专家学者进行学术报告。',
    description: '国际学术交流活动预告',
    url: 'https://example.com/news/3',
    author: '国际处',
    publishDate: '2024-02-28',
    category: '学术动态',
    isActive: true,
    views: 890
  },
  {
    id: 4,
    title: '2024届毕业生就业双选会通知',
    content: '2024年春季校园招聘会将于3月15日在体育馆举行，已有200余家企业确认参加。',
    description: '春季校园招聘会信息',
    url: 'https://example.com/news/4',
    author: '就业指导中心',
    publishDate: '2024-03-01',
    category: '活动通知',
    isActive: true,
    views: 3150
  },
  {
    id: 5,
    title: '图书馆新增电子资源库',
    content: '图书馆引进多个国际知名数据库，极大丰富了电子资源储备。',
    description: '图书馆资源更新通知',
    url: 'https://example.com/news/5',
    author: '图书馆',
    publishDate: '2024-02-10',
    category: '活动通知',
    isActive: true,
    views: 756
  },
  {
    id: 6,
    title: '校园5G网络升级完成',
    content: '全校园区5G网络升级改造工程已完成，网络覆盖率和速度大幅提升。',
    description: '校园网络升级通知',
    url: 'https://example.com/news/6',
    author: '信息中心',
    publishDate: '2024-01-25',
    category: '活动通知',
    isActive: true,
    views: 1890
  },
  {
    id: 7,
    title: '我校学子在国际大学生程序设计竞赛中获佳绩',
    content: '计算机学院代表队在国际大学生程序设计竞赛中获得金牌。',
    description: '程序设计竞赛获奖',
    url: 'https://example.com/news/7',
    author: '计算机学院',
    publishDate: '2024-03-05',
    category: '学术动态',
    isActive: true,
    views: 2100
  },
  {
    id: 8,
    title: '2024年教师招聘公告',
    content: '我校多个院系开展2024年度教师招聘工作，诚邀海内外优秀人才加盟。',
    description: '教师招聘信息',
    url: 'https://example.com/news/8',
    author: '人事处',
    publishDate: '2024-02-20',
    category: '活动通知',
    isActive: true,
    views: 1678
  },
  {
    id: 9,
    title: '校园文化节开幕式圆满举行',
    content: '第十二届校园文化节开幕式在大礼堂举行，包含多项特色文化活动。',
    description: '文化节开幕',
    url: 'https://example.com/news/9',
    author: '学工处',
    publishDate: '2024-03-15',
    category: '校园新闻',
    isActive: true,
    views: 2450
  },
  {
    id: 10,
    title: '新增两个国家级重点实验室',
    content: '我校新增智能制造和新材料两个国家级重点实验室，实验室建设工作已启动。',
    description: '重点实验室建设',
    url: 'https://example.com/news/10',
    author: '科研处',
    publishDate: '2024-02-15',
    category: '学术动态',
    isActive: true,
  },
  {
    id: 11,
    title: '2024年研究生招生简章发布',
    content: '2024年硕士研究生招生简章已发布，新增多个专业方向。',
    description: '研究生招生信息',
    url: 'https://example.com/news/11',
    author: '研究生院',
    publishDate: '2024-03-10',
    category: '活动通知',
    isActive: true,

    views: 4200
  },
  {
    id: 12,
    title: '校园智能化改造项目启动',
    content: '智慧校园建设项目正式启动，将引入多项智能化服务系统。',
    description: '智慧校园建设',
    url: 'https://example.com/news/12',
    author: '后勤处',
    publishDate: '2024-01-30',
    category: '活动通知',
    isActive: true,
    views: 1560
  },
  {
    id: 13,
    title: '学生创新创业大赛启动',
    content: '2024年度学生创新创业大赛正式启动，设置多个奖项。',
    description: '创新创业比赛',
    url: 'https://example.com/news/13',
    author: '创新创业学院',
    publishDate: '2024-03-08',
    category: '校园新闻',
    isActive: true,
    views: 1890
  },
  {
    id: 14,
    title: '校园环保行动月开启',
    content: '为期一个月的校园环保主题活动正式开始，包含多项环保实践活动。',
    description: '环保主题活动',
    url: 'https://example.com/news/14',
    author: '团委',
    publishDate: '2024-03-12',
    category: '校园新闻',
    isActive: true,
    views: 980
  },
  {
    id: 15,
    title: '国际合作办学项目签约仪式举行',
    content: '我校与多所国际知名高校签署合作办学协议，拓展国际化办学渠道。',
    description: '国际合作项目',
    url: 'https://example.com/news/15',
    author: '国际处',
    publishDate: '2024-02-25',
    category: '学术动态',
    isActive: true,
    
    views: 1450
  },
  {
    id: 16,
    title: '心理健康教育月活动安排',
    content: '心理健康教育月将开展系列讲座和咨询活动，关注学生心理健康。',
    description: '心理健康活动',
    url: 'https://example.com/news/16',
    author: '心理咨询中心',
    publishDate: '2024-03-18',
    category: '活动通知',
    isActive: true,
    
    views: 1120
  },
  {
    id: 17,
    title: '校园安全月启动仪式',
    content: '学校举行安全月启动仪式，开展系列安全教育和演练活动。',
    description: '安全教育活动',
    url: 'https://example.com/news/17',
    author: '保卫处',
    publishDate: '2024-03-21',
    category: '活动通知',
    isActive: true,
    
    views: 890
  },
  {
    id: 18,
    title: '校友企业专场招聘会',
    content: '校友企业专场招聘会将举行，多家校友企业提供优质就业岗位。',
    description: '校友招聘活动',
    url: 'https://example.com/news/18',
    author: '校友会',
    publishDate: '2024-03-25',
    category: '活动通知',
    isActive: true,
    
    views: 2300
  },
  {
    id: 19,
    title: '学生社团文化节开幕',
    content: '百余个学生社团将在文化节期间展示特色活动和成果。',
    description: '社团文化节',
    url: 'https://example.com/news/19',
    author: '社团联合会',
    publishDate: '2024-03-28',
    category: '校园新闻',
    isActive: true,
    
    views: 1780
  },
  {
    id: 20,
    title: '图书馆读书月活动预告',
    content: '图书馆将举办系列读书活动，包括读书分享会、作家讲座等。',
    description: '读书月活动',
    url: 'https://example.com/news/20',
    author: '图书馆',
    publishDate: '2024-03-30',
    category: '校园新闻',
    isActive: true,
    
    views: 960
  }
];