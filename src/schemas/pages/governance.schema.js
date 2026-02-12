// Example asset imports (swap with your actual paths)
const handsJoining = "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769896360/IMG_9238_vxq385.jpg";
const chairImage = "https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769894247/Bola_Adesola_lr8vif.png";

export const governanceSchema = {
  hero: {
    titleHighlight: 'Governance & Leadership',
    titleMain: '',
    description: 'HFN is guided by a Board of Trustees and an Executive Committee providing strategic oversight and leadership for Nigeria’s private health sector.',
    image: handsJoining,
  },

  boardOfTrustees: {
    title: 'Board of Trustees',
    chair: {
      name: 'Bola Adesola',
      role: 'Chair, Board of Trustees',
      image: chairImage,
      slug: 'bola-adesola',
      tag: 'Chair'
    },
    trustees: [
      {
        name: 'Clare Omatseye',
        title: 'Founder & Managing Director, JNC International',
        image: 'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769894247/Clare_Omatseye.png', 
        slug: 'clare-omatseye'
      },
      {
        name: 'Dr. Olaokun Soyinka',
        title: 'Former Commissioner for Health, Ogun State',
        image: 'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769894247/Olaokun_Soyinka.png',
        slug: 'dr-olaokun-soyinka'
      },
      {
        name: 'Mr. Azubike Okorie',
        title: 'Healthcare Consultant & Strategic Leader',
        image: 'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769894247/Azubike_Okorie.png',
        slug: 'azubike-okorie'
      }
    ]
  },

  executiveCommittee: {
    title: 'Executive Committee',
    members: [
      {
        name: 'Njide Ndili',
        role: 'President, HFN',
        slug: 'njide-ndili',
        image: 'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769894247/Njide_Ndili.png',
        profile: 'Country Director at PharmAccess Foundation with over 25 years of experience in healthcare and finance.',
        socials: [
          { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/healthcare-federation-of-nigeria-hfn/' }
        ]
      },
      {
        name: 'Dr. Ayodele Benson-Cole',
        role: '1st Vice President, HFN',
        slug: 'ayodele-benson-cole',
        image: 'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769894247/Ayodele_Benson.png',
        profile: 'CEO of Benson Coleman & Associates, providing strategic leadership in healthcare advocacy.',
        socials: [
          { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/healthcare-federation-of-nigeria-hfn/' }
        ]
      },
      {
        name: 'Dr. Jennifer Anyanti',
        role: '2nd Vice President, HFN',
        slug: 'jennifer-anyanti',
        image: 'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769894247/Jennifer_Anyanti.png',
        profile: 'Deputy Managing Director at Society for Family Health, driving primary healthcare delivery.',
        socials: [
          { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/healthcare-federation-of-nigeria-hfn/' }
        ]
      },
      {
        name: 'Chinyere Okorocha',
        role: 'Public Relations Secretary, HFN',
        slug: 'chinyere-okorocha',
        image: 'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769894247/Chinyere_Okorocha.png',
        profile: 'Partner and Head of Sectors at Jackson, Etti & Edu, specializing in intellectual property and health law.',
        socials: [
          { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/healthcare-federation-of-nigeria-hfn/' }
        ]
      }
    ]
  }
};
