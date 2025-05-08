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
  category: string;
  isActive: boolean;
  image?: {
    url?: string ;
    alt?: string ;
  } ;
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
  capacity?: number;
  registrationDeadline?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  type?: string;
  maxParticipants?: number;
}

export interface Organization {
  id: number;
  name: string;
  type: string;
  description: string;
  foundingDate: string;
  leader: string;
  memberCount?: number;
  contactEmail?: string;
  contactPhone?: string;
  contact?: string;
  location?: string;
  status?: string;
}

export interface Partnership {
  id: number;
  name: string;
  type: string;
  description: string;
  cooperationStartDate?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  contact?: string;
  phone?: string;
  email?: string;
  address?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}
