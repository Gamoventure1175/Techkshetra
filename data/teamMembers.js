const teamMembers = [
  { 
    name: 'Rushika Khawas', 
    role: 'Student Coordinator', 
    imagePath: '/members/studentcoordinator1', 
    email: 'khawasrushika@gmail.com', 
    description: 'Description of Rushika', 
    instagram: 'https://instagram.com/rushika', 
    linkedin: 'https://linkedin.com/in/rushika' 
  },
  { 
    name: 'Sanskar Gaikwad', 
    role: 'Head Coordinator', 
    imagePath: '/members/headcoordinator', 
    email: 'sanskargaikwad206@gmail.com', 
    description: 'Description of Sanskar', 
    instagram: 'https://instagram.com/sanskar', 
    linkedin: 'https://linkedin.com/in/sanskar' 
  },
  { 
    name: 'Sakshi Ransing', 
    role: 'Student Coordinator', 
    imagePath: '/members/studentcoordinator2', 
    email: 'sakshiransing.28@gmail.com', 
    description: 'Description of Sakshi', 
    instagram: 'https://instagram.com/sakshi', 
    linkedin: 'https://linkedin.com/in/sakshi' 
  },
  { 
    name: 'Chetna Patil', 
    role: 'Planning Head', 
    imagePath: '/members/planninghead2',
    description: 'Description of Chetna', 
    instagram: 'https://instagram.com/chetna', 
    linkedin: 'https://linkedin.com/in/chetna' 
  },
  { 
    name: 'Osama Shaikh', 
    role: 'Planning Head', 
    imagePath: '/members/planninghead1',
    description: 'Description of Osama', 
    instagram: 'https://instagram.com/osama', 
    linkedin: 'https://linkedin.com/in/osama' 
  },
  { 
    name: 'Sapana Sonavane', 
    role: 'Decoration Head', 
    imagePath: '/members/decorationhead2',
    description: 'Description of Sapana', 
    instagram: 'https://instagram.com/sapana', 
    linkedin: 'https://linkedin.com/in/sapana' 
  },
  { 
    name: 'Ritika Chavan', 
    role: 'Decoration Head', 
    imagePath: '/members/decorationhead1',
    description: 'Description of Ritika', 
    instagram: 'https://instagram.com/ritika', 
    linkedin: 'https://linkedin.com/in/ritika' 
  },
  { 
    name: 'Omkar Halpatrao', 
    role: 'Management Head', 
    imagePath: '/members/managementhead1',
    description: 'Description of Omkar', 
    instagram: 'https://instagram.com/omkar', 
    linkedin: 'https://linkedin.com/in/omkar' 
  },
  { 
    name: 'Sumit Shrivastav', 
    role: 'Management Head', 
    imagePath: '/members/management2',
    description: 'Description of Sumit', 
    instagram: 'https://instagram.com/sumit', 
    linkedin: 'https://linkedin.com/in/sumit' 
  },
  { 
    name: 'Gaurav Mahajan', 
    role: 'Project and Technical Head', 
    imagePath: '/members/technicalandprojecthead',
    description: 'Description of Gaurav', 
    instagram: 'https://instagram.com/gaurav', 
    linkedin: 'https://linkedin.com/in/gaurav' 
  },
  { 
    name: 'Aditya Naikwadi', 
    role: 'Project Head', 
    imagePath: '/members/projecthead1',
    description: 'Description of Aditya', 
    instagram: 'https://instagram.com/aditya', 
    linkedin: 'https://linkedin.com/in/aditya' 
  },
  { 
    name: 'Amir Khan', 
    role: 'Technical Head', 
    imagePath: '/members/technicalhead1',
    description: 'Description of Amir', 
    instagram: 'https://instagram.com/amir', 
    linkedin: 'https://linkedin.com/in/amir' 
  },
  { 
    name: 'Prajwal Sonawane', 
    role: 'Editing Head', 
    imagePath: '/members/editinghead2',
    description: 'Description of Prajwal', 
    instagram: 'https://instagram.com/prajwal', 
    linkedin: 'https://linkedin.com/in/prajwal' 
  },
  { 
    name: 'Bhavarlal Kumavat', 
    role: 'Editing Head', 
    imagePath: '/members/editinghead1',
    description: 'Description of Bhavarlal', 
    instagram: 'https://instagram.com/bhavarlal', 
    linkedin: 'https://linkedin.com/in/bhavarlal' 
  },
  { 
    name: 'Mayur Khairnar', 
    role: 'Photography Head', 
    imagePath: '/members/photography',
    description: 'Description of Mayur', 
    instagram: 'https://instagram.com/mayur', 
    linkedin: 'https://linkedin.com/in/mayur' 
  },
  { 
    name: 'Mandar Dongre', 
    role: 'Social Media', 
    imagePath: '/members/socialmediahead1',
    description: 'Description of Mandar', 
    instagram: 'https://instagram.com/mandar', 
    linkedin: 'https://linkedin.com/in/mandar' 
  },
  { 
    name: 'Aryan Nalge', 
    role: 'Social Media', 
    imagePath: '/members/socialmediahead2',
    description: 'Description of Aryan', 
    instagram: 'https://instagram.com/aryan', 
    linkedin: 'https://linkedin.com/in/aryan' 
  },
  { 
    name: 'Raina Mishra', 
    role: 'Reporting Head', 
    imagePath: '/members/reportinghead2',
    description: 'Description of Raina', 
    instagram: 'https://instagram.com/raina', 
    linkedin: 'https://linkedin.com/in/raina' 
  },
  { 
    name: 'Sanjana Patil', 
    role: 'Reporting Head', 
    imagePath: '/members/reportinghead1',
    description: 'Description of Sanjana', 
    instagram: 'https://instagram.com/sanjana', 
    linkedin: 'https://linkedin.com/in/sanjana' 
  },
  { 
    name: 'Riya Jamdar', 
    role: 'PR Head', 
    imagePath: '/members/prhead2',
    description: 'Description of Riya', 
    instagram: 'https://instagram.com/riya', 
    linkedin: 'https://linkedin.com/in/riya' 
  },
  { 
    name: 'Girish Chede', 
    role: 'PR Head', 
    imagePath: '/members/prhead1',
    description: 'Description of Girish', 
    instagram: 'https://instagram.com/girish', 
    linkedin: 'https://linkedin.com/in/girish' 
  },
  { 
    name: 'Harshad Jadhav', 
    role: 'Security Head', 
    imagePath: '/members/securityhead2',
    description: 'Description of Harsha', 
    instagram: 'https://instagram.com/harsha', 
    linkedin: 'https://linkedin.com/in/harsha' 
  }
];

export default teamMembers;
