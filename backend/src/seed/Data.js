import express from 'express';

export const students = [
  {
    role: 'student',
    name: "Aarav Mehta",
    username: "aarav_23",
    email: "aarav.mehta@college.edu",
    dob: "2004-01-15",
    phone: "9876543201",
    address: {
      addressLine: "Sector 12, Noida",
      state: "Uttar Pradesh",
      city: "Noida",
      pinCode: 201301 
    },
    collegeInfo: {
      admissionNo: "S20230001",
      batch: "2023-2027",
      course: "B.Tech IT",
      semester: "3",
      section: "A"
    },
    password: "123"
  },
  {
    role: 'student',
    name: "Isha Verma",
    username: "isha_v",
    email: "isha.verma@college.edu",
    dob: "2003-11-22",
    phone: "9876543202",
    address: {
      addressLine: "MG Road",
      state: "Karnataka",
      city: "Bangalore",
      pinCode: 560001
    },
    collegeInfo: {
      admissionNo: "S20230002",
      batch: "2023-2027",
      course: "B.Tech CSE",
      semester: "3",
      section: "B"
    },
    password: "123"
  },
  {
    role: 'student',
    name: "Kunal Singh",
    username: "kunal_s",
    email: "kunal.singh@college.edu",
    dob: "2003-09-10",
    phone: "9876543203",
    address: {
      addressLine: "Civil Lines",
      state: "Rajasthan",
      city: "Jaipur",
      pinCode: 302001
    },
    collegeInfo: {
      admissionNo: "S20230003",
      batch: "2023-2027",
      course: "B.Tech ECE",
      semester: "3",
      section: "C"
    },
    password: "123"
  },
  {
    role: 'student',
    name: "Sanya Malhotra",
    username: "sanya_m",
    email: "sanya.malhotra@college.edu",
    dob: "2004-02-05",
    phone: "9876543204",
    address: {
      addressLine: "DLF Phase 2",
      state: "Haryana",
      city: "Gurgaon",
      pinCode: 122002
    },
    collegeInfo: {
      admissionNo: "S20230004",
      batch: "2023-2027",
      course: "B.Tech CSE",
      semester: "3",
      section: "D"
    },
    password: "123"
  },
  {
    role: 'student',
    name: "Rohan Gupta",
    username: "rohan_123",
    email: "rohan.gupta@college.edu",
    dob: "2003-07-30",
    phone: "9876543205",
    address: {
      addressLine: "Park Street",
      state: "West Bengal",
      city: "Kolkata",
      pinCode: 700016 
    },
    collegeInfo: {
      admissionNo: "S20230005",
      batch: "2023-2027",
      course: "B.Tech ME",
      semester: "3",
      section: "E"
    },
    password: "123"
  }
];

export const faculty = [
  {
    role: 'faculty',
    name: "Rajeev Nair",
    username: "rajeev_nair",
    email: "rajeev.nair@college.edu",
    dob: "1979-04-01",
    phone: "9876543301",
    address: {
      addressLine: "Marine Drive",
      state: "Kerala",
      city: "Kochi",
      pinCode: 682001 
    },
    collegeInfo: {
      employeeId: "EMP1001",
      dateOfJoining: "2010-06-15",
      role: "Associate Professor"
    },
    password: "123"
  },
  {
    role: 'faculty',
    name: "Anjali Deshmukh",
    username: "anjali_d",
    email: "anjali.deshmukh@college.edu",
    dob: "1984-08-20",
    phone: "9876543302",
    address: {
      addressLine: "Shivaji Nagar",
      state: "Maharashtra",
      city: "Pune",
      pinCode: 411005
    },
    collegeInfo: {
      employeeId: "EMP1002",
      dateOfJoining: "2012-09-01",
      role: "Assistant Professor"
    },
    password: "123"
  },
  {
    role: 'admin',
    name: "Suresh Patel",
    username: "suresh_p",
    email: "suresh.patel@college.edu",
    dob: "1980-12-18",
    phone: "9876543303",
    address: {
      addressLine: "Ashram Road",
      state: "Gujarat",
      city: "Ahmedabad",
      pinCode: 380009
    },
    collegeInfo: {
      employeeId: "EMP1003",
      dateOfJoining: "2008-01-10",
      role: "Admin Officer"
    },
    password: "123"
  },
  {
    role: 'faculty',
    name: "Meera Sharma",
    username: "meera_s",
    email: "meera.sharma@college.edu",
    dob: "1987-06-25",
    phone: "9876543304",
    address: {
      addressLine: "Janakpuri",
      state: "Delhi",
      city: "New Delhi",
      pinCode: 110058 
    },
    collegeInfo: {
      employeeId: "EMP1004",
      dateOfJoining: "2014-03-12",
      role: "Lecturer"
    },
    password: "123"
  },
  {
    role: 'admin',
    name: "Tarun Batra",
    username: "tarun_b",
    email: "tarun.batra@college.edu",
    dob: "1975-10-02",
    phone: "9876543305", 
    address: {
      addressLine: "Sector 21",
      state: "Chandigarh",
      city: "Chandigarh",
      pinCode: 160022 
    },
    collegeInfo: {
      employeeId: "EMP1005",
      dateOfJoining: "2006-11-05",
      role: "Registrar"
    },
    password: "123"
  }
];
