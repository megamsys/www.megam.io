type TeamPerson = {
  name: string;
  jobTitle: string;
  sameAs: string[];
};

const team: TeamPerson[] = [
  {
    name: "Kishorekumar Neelamegam",
    jobTitle: "Founder",
    sameAs: [
      "https://www.linkedin.com/in/kishorekumarneelamegam/",
      "https://github.com/indykish"
    ]
  },
  {
    name: "Varadarajan Narayanan",
    jobTitle: "Interim Brief CEO",
    sameAs: ["https://www.linkedin.com/in/wayzinfratek"]
  },
  { name: "R Pandiyaraja", jobTitle: "Software Engineer", sameAs: ["https://github.com/pontiyaraja"] },
  {
    name: "Thomas Alrin",
    jobTitle: "Infrastructure Lead",
    sameAs: ["https://www.slideshare.net/thomasalrin", "https://github.com/thomasalrin"]
  },
  {
    name: "Rajthilak R",
    jobTitle: "Platform Lead",
    sameAs: [
      "https://www.linkedin.com/in/rajthilak-r8072/",
      "https://github.com/rajthilakmca"
    ]
  },
  {
    name: "Kanimozhi Kishorekumar",
    jobTitle: "People Officer",
    sameAs: ["https://www.linkedin.com/in/kanimozhi-kishorekumar-0465691a1/"]
  },
  { name: "Vijayakanth Mathaiyan", jobTitle: "Platform / UI Engineer", sameAs: ["https://github.com/vijaykanthm28"] },
  { name: "Rajesh Rajagopal", jobTitle: "Infrastructure Engineer", sameAs: ["https://github.com/rajesh-rajagopal"] },
  { name: "Rathish", jobTitle: "Software Engineer", sameAs: ["https://github.com/rathishvbr"] },
  { name: "Vinothini", jobTitle: "Software Engineer", sameAs: ["https://github.com/vinomca-megam"] },
  { name: "Ranjitha", jobTitle: "Software Engineer", sameAs: ["https://github.com/ranjithamca"] },
  { name: "Suganya Kaliyamoorthy", jobTitle: "Software Engineer", sameAs: ["https://github.com/suganyakaliyamoorthy"] },
  {
    name: "Yeshwanth Kumar",
    jobTitle: "Intern",
    sameAs: ["https://www.linkedin.com/in/yeshwanthk", "https://github.com/morpheyesh"]
  },
  { name: "Logesh Eswar", jobTitle: "Software Engineer", sameAs: ["https://github.com/LogeshEswar"] },
  { name: "Balaji Sekar", jobTitle: "Software Engineer", sameAs: ["https://github.com/balajisek"] },
  {
    name: "Jonathan Philipos",
    jobTitle: "Founder, DET.io / VirtEngine (downstream commercial integrator and Megam partner)",
    sameAs: ["https://www.linkedin.com/in/jonathanphilipos", "https://github.com/jaeko44"]
  }
];

const organizationRef = {
  "@type": "Organization",
  name: "Megam Systems LLP",
  url: "https://megam.io"
};

export const teamPersonJsonLd = {
  "@context": "https://schema.org",
  "@graph": team.map((person) => ({
    "@type": "Person",
    name: person.name,
    jobTitle: person.jobTitle,
    worksFor: organizationRef,
    sameAs: person.sameAs
  }))
};
