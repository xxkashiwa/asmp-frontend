export interface Alumni {
  id: number;
  studentId: string;
  name: string;
  gender: string;
  school: string;
  major: string;
  graduationYear: string;
  degree: string;
  currentCompany?: string;
  jobPosition?: string;
}

export interface News {
  id: number;
  title: string;
  url?: string ;
  content: string;
  description?: string ;
  author: string;
  publishDate: string;
  category: '校园新闻' | '活动通知' | '学术动态' | '其他';
  isActive: boolean;
  views?: number;
}

export interface Donation {
  id: number;
  donorName: string;
  amount: number;
  donationDate: string;
  purpose: string;
  projectName?: string;
  status: 'pending' | 'completed' | 'cancelled';
  thanksLetterSent: boolean;
  remarks?: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  organizer: string;
  registrationDeadline?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  type?: '校园活动' | '学术活动' | '社区活动' | '体育活动' | '文化活动' | '其他';
  maxParticipants?: number;
}

export interface Organization {
  id: number;
  name: string;
  type: string;
  description: string;
  foundingDate: string;
  leader: string;
  contactEmail?: string;
  contactPhone?: string;
  contact?: string;
  location?: string;
  status: string;
  memberCount?: number;
}

export interface Partnership {
  id: number;
  name: string;
  type: '企业合作' | '学术合作' | '研究合作' | '项目合作' | '其他';
  description: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  address?: string;
  startDate?: string;
  endDate?: string;
  status: '进行中' | '待启动' | '已完成' | '已终止';
}
