const handsJoining =
  'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769896360/IMG_9238_vxq385.jpg';
const chairImage =
  'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769894247/Bola_Adesola_lr8vif.png';

export const governanceSchema = {
  hero: {
    titleHighlight: 'Governance & Leadership',
    titleMain: '',
    description:
      'HFN is guided by a Board of Trustees and an Executive Committee providing strategic oversight and leadership for Nigeria’s private health sector.',
    image: handsJoining,
  },

  boardOfTrustees: {
    title: 'Board of Trustees',
    chair: {
      name: 'Bola Adesola',
      role: 'Chair, Board of Trustees',
      image: chairImage,
      slug: 'bola-adesola',
      tag: 'Chair',
      bio: '',
    },
    trustees: [
      {
        name: 'Richardson Ajayi',
        slug: 'richardson-ajayi',
        title: 'Trustee',
        image:
          'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769894246/Richardson_Ajayi_jg3lc3.jpg',
      },
      {
        name: 'Clare Omatseye',
        slug: 'clare-omatseye',
        title: 'Trustee',
        image:
          'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769894246/Clare_Omatseye_xzvcbm.jpg',
      },
      {
        name: 'Ifeanyi Okoye',
        slug: 'ifeanyi-okoye',
        title: 'Trustee',
        image:
          'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769894246/Ifeanyi-Okoye-Head-shot_jlf9zt.jpg',
      },

      {
        name: 'Benson Ayodele-Cole',
        slug: 'benson-ayodele-cole',
        title: 'Trustee',
        image:
          'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769894247/Ayodele_Benson_na4t72.jpg',
        bio: `An accomplished healthcare executive and Co-founder/Chairman of Echo-Scan Services Ltd (now trading under the trademark of Echolab Radiology and Laboratory Services), and CEO Benson Coleman and Associates - BCA Healthcare Ltd, Dr. Ayodele ColeBenson is a visionary leader with a proven track record of success in founding, expanding, and strategically managing healthcare enterprises. His expertise spans diverse areas, including project acquisitions, operational leadership, change management and advocacywithin the healthcare sector. 
Dr. Benson obtained his MB.BCH from the University of Calabar, Cross River State, Nigeria, went on to receive a M.Sc. (Merit) in Medical Imaging from Leeds University, United Kingdom and holds two Doctorate degrees in Health Administration (DHA) andMedical Diagnostic Ultrasound from the University of Arizona, USA and L.U.de SUniversity, Switzerland respectively. In the course of his professional career, Dr. Bensonhas written and published several books and academic papers on clinical topics andprocess improvement in healthcare, while attending a number of international short courses relevant to these areas of interest. 
A dynamic and result-oriented leader who combines an entrepreneurial spirit with a deepcommitment to advancing healthcare in Nigeria, Dr. Benson’s multifaceted experience infounding and expanding healthcare ventures, coupled with his extensive business experience and influential advocacy roles has uniquely positioned him as a key player inshaping the future of the Nigerian healthcare landscape.
`,
      },
      {
        name: 'Grace Delano',
        slug: 'grace-delano',
        title: 'Trustee',
        image:
          'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770196059/Grace_Delano_d9blax.png',
      },
    ],
  },

  executiveCommittee: {
    title: 'Executive Committee',
    executives: [
      {
        name: 'Njide Ndili',
        slug: 'njide-ndili',
        role: 'President',
        profile: 'Country Director, PharmAccess',
        image:
          'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769899022/njide_lhvqcg.png',
        bio: `Njide Ndili is the Nigeria Country Director at PharmAccess, an international organisation that leverages digital innovation and market-based solutions to strengthen health systems across sub-Saharan Africa. PharmAccess works across both the demand and supply sides of healthcare to improve access, quality, and financial protection. 
She serves as President of the Healthcare Federation of Nigeria (HFN), where she leads private sector advocacy and engagement to advance policy reforms and strengthen Nigeria’s healthcare system. Njide is also a founding member of the Digital Transformation for Health Lab, which identifies and supports digital technologies that accelerate progress toward Universal Health Coverage, particularly in low- and middle-income countries. In addition, she serves on the Steering Committee of the Nigerian Economic Summit Group (NESG) Health Policy Commission. 
Njide holds an MSc in Health Economics, Policy, and Management from the London School of Economics, an Advanced Management Programme (AMP) from INSEAD, an MBA from the University of Houston, a Postgraduate Diploma in Finance, and a BSc in Computer Science.
`,
        socials: [
          {
            platform: 'linkedin',
            url: 'https://www.linkedin.com/in/njide-ndili/',
          },
        ],
      },
      {
        name: 'Dr. Benson Ayodele-Cole',
        slug: 'benson-ayodele-cole',
        role: '1st Vice President',
        profile: 'CEO, Benson Coleman and Associates',
        image:
          'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769894247/Ayodele_Benson_na4t72.jpg',
        bio: `An accomplished healthcare executive and Co-founder/Chairman of Echo-Scan Services Ltd (now trading under the trademark of Echolab Radiology and Laboratory Services), and CEO Benson Coleman and Associates - BCA Healthcare Ltd, Dr. Ayodele ColeBenson is a visionary leader with a proven track record of success in founding, expanding, and strategically managing healthcare enterprises. His expertise spans diverse areas, including project acquisitions, operational leadership, change management and advocacywithin the healthcare sector. 
Dr. Benson obtained his MB.BCH from the University of Calabar, Cross River State, Nigeria, went on to receive a M.Sc. (Merit) in Medical Imaging from Leeds University, United Kingdom and holds two Doctorate degrees in Health Administration (DHA) andMedical Diagnostic Ultrasound from the University of Arizona, USA and L.U.de SUniversity, Switzerland respectively. In the course of his professional career, Dr. Bensonhas written and published several books and academic papers on clinical topics andprocess improvement in healthcare, while attending a number of international short courses relevant to these areas of interest. 
A dynamic and result-oriented leader who combines an entrepreneurial spirit with a deepcommitment to advancing healthcare in Nigeria, Dr. Benson’s multifaceted experience infounding and expanding healthcare ventures, coupled with his extensive business experience and influential advocacy roles has uniquely positioned him as a key player inshaping the future of the Nigerian healthcare landscape.
`,
        socials: [
          {
            platform: 'linkedin',
            url: 'https://www.linkedin.com/in/ayodele-cole-benson-93b79027/',
          },
        ],
      },
      {
        name: 'Jennifer Anyanti, FAPH',
        slug: 'jennifer-anyanti',
        role: '2nd Vice President',
        profile: 'Deputy Managing Director, Society for Family Health',
        image:
          'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769899021/jennifer_end3ff.png',
        bio: `Dr. Anyanti is a distinguished medical professional and public health expert with over two decades of experience in health advocacy, research, and public health programming. A graduate of Medicine from Obafemi Awolowo University, Nigeria and a Masters of Public Health from the University of Lagos, she has dedicated her career to strengthening health systems and implementing impactful interventions across developing countries.
Her expertise spans various aspects of public health, including Family Planning (FP), Maternal, Newborn, and Child Health (MNCH), HIV & AIDS, Sexually Transmitted Infections (STI) prevention, and strategic behavioral communication. She specializes in designing and evaluating health programs with a strong focus on user-friendly Monitoring & Evaluation (M&E) systems that enhance health service delivery at all levels. Notably, she has contributed to the development of many complex Monitoring, Evaluation, Research, and Learning (MERL) systems in Nigeria.
Dr. Anyanti has played a pivotal role in shaping national health policies through her leadership in major HIV, FP, and reproductive health projects. She has served as a principal or co-principal investigator on multiple national-level surveys, providing critical data for informed decision-making in health interventions.
A passionate advocate for equitable access to healthcare, she has led numerous initiatives aimed at addressing structural, social, and policy barriers to HIV prevention, treatment, and care services in Nigeria and beyond. Her contributions to public health are well documented in over 100 peer-reviewed publications, reflecting her commitment to knowledge dissemination and evidence-based practice.
Beyond her technical expertise, Dr. Anyanti is a mentor, results-driven manager, and esteemed board member of several national and international health-focused organizations. She currently serves as the Deputy Managing Director (Growth, Strategy and Technical) at the Society for Family Health, one of Nigeria’s leading non-governmental organizations. She is also a Fellow of the West African Academy of Public Health.
Dr. Anyanti continues to champion transformative health solutions, leveraging her extensive experience to drive sustainable impact in global health.
`,
        socials: [
          {
            platform: 'linkedin',
            url: 'https://www.linkedin.com/in/jennifer-anyanti/',
          },
        ],
      },
      {
        name: 'Olayode Babarinde',
        slug: 'olayode-babarinde',
        role: 'Financial Secretary',
        profile: 'Healthcare System Partner – Policy, Roche',
        image:
          'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769899021/babarinde_ruezpz.png',
        bio: `Babarinde Olayode holds the position of Healthcare System Partner-Policy at Roche Products Ltd in Nigeria, where he dedicates himself to engaging with healthcare policy stakeholders within the Nigerian Cancer Ecosystem. His paramount goal is to contribute to the creation and effective implementation of healthcare policies that address the needs of cancer patients across the nation. 
A significant part of Babarinde's role is driving Roche's partnerships with key organizations, such as the Federal Ministry of Health (FMOH), the National Institute for Cancer Research and Treatment (NICRAT), and the Clinton Health Access Initiative (CHAI). He has been instrumental in initiatives like the Nigeria Cancer Access Program (NCAP) and the Nigeria Cancer Health Fund (NCHF), which strive to enhance access to cancer treatment and care throughout Nigeria. 
As a staunch advocate for Universal Health Coverage (UHC), Babarinde actively engages in critical conversations and collaborations between Roche and various partners and stakeholders within the Nigerian Cancer Ecosystem. His commitment to UHC is driven by the vision of ensuring that all individuals receive the healthcare services they need without encountering financial barriers. 
One of Babarinde's notable accomplishments includes organizing and leading Nigeria's first Legislative Dialogue session on sustainable funding and financing for cancer care, with a particular focus on the Cancer Health Fund (CHF). This pioneering session brought together key stakeholders to explore and strategize funding avenues to support cancer treatment and care. 
Besides his policy-driven endeavors, Babarinde has also been the Chapter-Lead for Roche’s commercial outsourcing team since February 2020 and serves as the President of the Roche Employee Cooperative Society. His leadership in these roles reflects his commitment to both organizational and employee welfare. 
Dedicated to continuous personal and professional growth, Babarinde has pursued numerous educational programs to broaden his expertise. He completed the Washington Global Health E-Learning Program (eDGH) at the University of Washington in 2021 and participated in the Strategic Management and Business Model Innovation Program at INSEAD. Additionally, he earned a Master's in Business Administration (Action Learning) from the Business School Netherlands and recently finished an Executive program on Health Policy and Health System at the Africa Institute for Health Policy & Health System, Ebonyi State University. 
Babarinde Olayode is driven by a profound passion for effecting positive change within the healthcare industry. By leveraging his extensive knowledge and skills, he continuously strives to drive meaningful improvements in patient outcomes and advance the healthcare landscape in Nigeria.
`,
        socials: [
          {
            platform: 'linkedin',
            url: 'https://www.linkedin.com/in/olayode-babarinde-26863276/',
          },
        ],
      },
      {
        name: 'Chinyere Okorocha',
        slug: 'chinyere-okorocha',
        role: 'Public Relations Secretary',
        profile: 'Head of Sectors, Jackson, Etti & Edu',
        image:
          'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769899021/chinyere_wltjdz.png',
        bio: `Chinyere Okorocha is a seasoned legal practitioner with over three decades of experience, widely respected for her deep expertise in Intellectual Property law and her ability to build strategic, industry-focused legal solutions that deliver measurable value.

Her career spans trademark, patent, and design portfolio management for multinational clients, covering prosecution, contentious disputes, and brand protection across multiple jurisdictions.

She is a Partner and the overall Head of Sectors at Jackson, Etti & Edu, where she leads sector strategy across six core industries. In this role, Chinyere aligns sector goals with market trends, drives cross-sector collaboration, and works closely with sector heads and practice groups to ensure commercial relevance, client satisfaction, and sustainable growth. She also serves as Sector Head for Health & Pharmaceuticals, leading multidisciplinary teams and shaping the firm’s annual Sector Outlook.

Within the health ecosystem, Chinyere plays an active leadership role in the Healthcare Federation of Nigeria (HFN). She served on the HFN Executive Committee as Treasurer from 2022 to 2025 and currently holds the position of Public Relations Secretary (2025–Present), where she supports the Federation’s advocacy, stakeholder engagement, and public communications efforts at the intersection of law, policy, and healthcare delivery.

Beyond her professional practice, Chinyere recently completed a successful tenure as Chairperson of the Nigerian Bar Association Women Forum (2022–2024), where she led national expansion initiatives and advanced female representation within the legal profession. She is also the Founder of Heels & Ladders, a career mentorship platform dedicated to accelerating women’s professional growth. A regular speaker and moderator, she is driven by impact, innovation, and a strong commitment to leadership and women’s empowerment across sectors.`,
        socials: [
          {
            platform: 'linkedin',
            url: 'https://www.linkedin.com/in/chinyere-okorocha-a1bb19bb/',
          },
        ],
      },

      {
        name: 'Reagan Rowland',
        slug: 'reagan-rowland',
        role: 'Treasurer',
        profile: 'Founder/CEO, OneClick Med',
        image:
          'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769899022/reagan_llp53y.png',
        bio: `Reagan Rowland is a strategic leader, digital health innovator, and financial steward committed to transforming Nigeria’s healthcare landscape through technology and sound financial management. As the Founder & CEO of OneClick-Med, a pioneering digital health platform streamlining patient care through electronic health records (EHR), telemedicine, and data-driven healthcare solutions, Reagan brings deep expertise in healthcare innovation, financial oversight, and strategic partnerships. His leadership experience, combined with his ability to drive operational efficiency and resource optimization, makes him an excellent candidate for the Treasurer position at HFN.
Affiliation with OneClick-Med
OneClick-Med is at the forefront of transforming healthcare accessibility across Nigeria. Under Reagan’s leadership, the company has:
Developed a secure and interoperable EHR system that enhances patient data management for hospitals and clinics.
Established partnerships with private hospitals, healthcare institutions, and emergency care providers to improve patient outcomes.
Participated in high-profile innovation challenges and secured funding from international organizations, reinforcing the financial credibility and sustainability of healthcare startups.
Led financial planning, budget allocation, and strategic fundraising efforts, demonstrating strong fiscal discipline and resource management.

Commitment to HFN’s Vision
As Treasurer of HFN, Reagan will bring financial integrity, strategic fiscal planning, and innovative funding strategies to enhance the federation’s financial sustainability. He is dedicated to strengthening the financial health of HFN, securing funding opportunities, and ensuring financial transparency to support healthcare innovation and policy advocacy in Nigeria.
With a track record of financial diligence, leadership in healthcare innovation, and a passion for driving impactful change, Reagan Rowland is the ideal candidate to serve as Treasurer of the Health Federation of Nigeria.
`,
        socials: [
          {
            platform: 'linkedin',
            url: 'https://www.linkedin.com/in/reagan-rowland/',
          },
        ],
      },
    ],
  },
};
