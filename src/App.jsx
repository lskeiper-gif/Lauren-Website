import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";

// Main App
export default function App() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showIntro, setShowIntro] = useState(true);

  const sidebarItems = [
    { id: "food", label: "Food" },
    { id: "housing", label: "Housing" },
    { id: "healthcare", label: "Further Healthcare" },
    { id: "reintegration", label: "Reintegration" },
  ];

  const handleSelect = (id) => {
    setActiveSection(id);
    setOpen(false);
  };

  // Intro Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* INTRO SCREEN */} 
      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            key="intro"
            className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-600 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <WordByWordText />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN APP */}
      {!showIntro && (
        <div className="flex min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white">

          {/* MOBILE HAMBURGER BUTTON */}       
            <div className="md:hidden fixed top-4 left-4 z-50">
            <button
                onClick={() => setOpen(true)}
                className="p-2 bg-white/20 backdrop-blur-md rounded-lg shadow-lg"
            >   
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Fixed Mobile menu navbar */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-40 p-4 bg-white/10 backdrop-blur-lg border-b border-white/20">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 w-full py-2 px-3 bg-white/20 rounded-lg"
              >
                {open ? <ChevronDown /> : <ChevronRight />}
                <span>Menu</span>
              </button>

              <AnimatePresence>
                {open && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-3 space-y-2"
                  >
                    {sidebarItems.map((item) => (
                      <li
                        key={item.id}
                        className="cursor-pointer bg-white/10 px-3 py-2 rounded-md"
                        onClick={() => {
                          handleSelect(item.id);
                          setOpen(false); // close menu after selecting
                      }}
                    >
                      {item.label}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
        </div>

          {/* Sidebar */} 
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.2 }}
            className="w-64 bg-white/10 backdrop-blur-lg border-r border-white/20 p-6 hidden md:block"
          >
            <h2 className="text-xl font-semibold mb-4">Further Information</h2>

            {/* Home Button */}
            <AnimatePresence>
              {activeSection !== "home" && (
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setActiveSection("home")}
                  className="w-full py-2 px-3 mb-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition"
                >
                  Home
                </motion.button>
              )}
            </AnimatePresence>

            {/* Expand Button */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 w-full py-2 px-3 bg-white/10 hover:bg-white/20 rounded-lg transition"
            >
              {open ? <ChevronDown /> : <ChevronRight />}
              <span>Expand</span>
            </button>

            {/* Sidebar Menu */}
            <AnimatePresence>
              {open && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-3 space-y-2"
                >
                  {sidebarItems.map((item) => (
                    <motion.li
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      whileHover={{ x: 5 }}
                      className={`cursor-pointer px-3 py-2 rounded-md ${
                        activeSection === item.id
                          ? "bg-indigo-600"
                          : "hover:bg-white/20"
                      }`}
                    >
                      {item.label}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-8 pt-24">
            <AnimatePresence mode="wait">
              {/* HOME SECTION */}
              {activeSection === "home" && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-32"
                >
                   {/* TBI SECTION */}
                  <ScrollReveal delay={0.4}>
                    <div className="flex flex-col md:flex-row items-start gap-8">
                      <div className="md:w-3/5 leading-relaxed">
                        <h2 className="text-2xl font-bold mb-3">
                          Traumatic Brain Injury Guide
                        </h2>
                        <p>
                          <br />
                          Have you experienced a traumatic brain injury? Worried or 
                          confused about where to go next? This website is designed to
                           be a guide to assist you through this time. Experiencing a 
                           traumatic brain injury can impact life greatly. It could cause 
                           a limited capacity to work or could stop work altogether. There 
                           may be questions you have about what next steps in terms of care
                           are and options that could assist you during this time. There are
                           limited resources available for those who have experienced traumatic
                           brain injuries and this website is merely a first step to providing
                           some resources. <br />
                        </p>
                      </div>
                      <div className="md:w-2/5">
                        <motion.img
                          src="111.png"
                          alt="Immediate Care"
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                          whileHover={{ scale: 1.08, rotate: 1.5 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                          }}
                        />
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* HOUSING SECTION */}

                  {/* TBI SECTION */}
                  <ScrollReveal delay={0.4}>
                    <div className="flex flex-col md:flex-row items-start gap-8">
                      <div className="md:w-3/5 leading-relaxed">
                        <h2 className="text-2xl font-bold mb-3">
                          TBI Occurs: Immediate Care
                        </h2>
                        <p>
                          <br />
                          A traumatic brain injury (TBI) can drastically alter a
                          person’s life and requires immediate medical
                          attention. In the first stage of care, emergency teams
                          focus on stabilizing the individual’s condition —
                          ensuring proper breathing and blood flow.
                        </p>
                      </div>
                      <div className="md:w-2/5">
                        <motion.img
                          src="2.png"
                          alt="Immediate Care"
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                          whileHover={{ scale: 1.08, rotate: 1.5 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                          }}
                        />
                      </div>
                    </div>
                  </ScrollReveal>

                    

                {/* SECTION 4: Disability Options */}
              <ScrollReveal delay={0.2}> 
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="md:w-3/5 leading-relaxed">
                    <h2 className="text-2xl font-bold mb-3">
                      Long-Term or Disability-Related Options
                    </h2>
                    <p>
                      <br /> For individuals whose injuries or disabilities
                      prevent them from returning to work, long-term coverage
                      programs such as <b>Medicaid</b> and{" "}
                      <b>Social Security Disability Insurance (SSDI)</b> provide
                      essential medical and financial support.
                      <br /> <br /> <b>Medicaid</b> offers free or low-cost
                      comprehensive health coverage to people and families with
                      limited income, covering hospital visits, therapy, and
                      medications. <b>SSDI</b> is available for individuals who
                      have paid into Social Security, while{" "}
                      <b>Supplemental Security Income (SSI)</b> assists those
                      with limited resources. Once approved, recipients often
                      become eligible for Medicaid, ensuring access to ongoing
                      healthcare and rehabilitation.
                    </p>
                  </div>
                  <div className="md:w-2/5">
                    <motion.img
                      src="4.png"
                      alt="Disability Options"
                      className="rounded-lg shadow-lg w-full h-auto object-cover"
                      whileHover={{ scale: 1.08, rotate: 1.5 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    />
                  </div>
                </div>
              </ScrollReveal>

                {/* SECTION 5: Neurological Pathway */}
              <ScrollReveal delay={0.2}>
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="md:w-3/5 leading-relaxed">
                    <h2 className="text-2xl font-bold mb-3">
                      Neurological Care Pathway
                    </h2>
                    <p>
                      <br /> Recovery from a traumatic brain injury involves
                      collaboration among specialists who guide the patient
                      through each stage of healing. The journey begins with a{" "}
                      <b>primary care provider</b>, who refers the individual to
                      a <b>neurologist</b> for deeper assessment. Patients may
                      also work with <b>neuropsychologists</b> to address
                      cognitive challenges and participate in{" "}
                      <b>occupational</b>, <b>physical</b>, or{" "}
                      <b>speech therapy</b>. This holistic approach ensures
                      recovery supports both physical and emotional well-being.
                    </p>
                  </div>
                  <div className="md:w-2/5">
                    <motion.img
                      src="5.jpg"
                      alt="Neurological Care"
                      className="rounded-lg shadow-lg w-full h-auto object-cover"
                      whileHover={{ scale: 1.08, rotate: 1.5 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    />
                  </div>
                </div>
              </ScrollReveal>

                <div className="mt-6 space-y-2">
                  <a
                    href="https://www.mercyone.org/dubuque/services/physical-therapy-and-rehabilitation/inpatient-rehabilitation#:~:text=level%20of%20care.-,Treatment,full%20range%20of%20services%20including:"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-200 underline hover:text-blue-400"
                  >
                    MercyOne Rehabilitation Program
                  </a>
                  <br />
                  <a
                    href="https://www.1stcongucc.org/uploads/1/0/2/1/102135658/dubuque_county_resource_guide_7.22__1_.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-200 underline hover:text-blue-400"
                  >
                    Dubuque County Resource Guide
                  </a>
                </div>
              </motion.div>
              )}

              {/* FOOD SECTION */}
              {activeSection === "food" && (
                <Section key="food" title="Food Resources 🍎">
                  {/* SNAP Section */}
                  <ScrollReveal delay={0.1}>
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 text-lg leading-relaxed space-y-4"
                      >
                        <p>
                          Food assistance in Dubuque is supported through
                          several community and state programs that ensure
                          individuals and families have access to nutritious
                          meals. The{" "}
                          <b>Supplemental Nutrition Assistance Program (SNAP)</b>{" "}
                          provides monthly benefits to help purchase food. Learn
                          more on the{" "}
                          <a
                            href="https://dhs.iowa.gov/sites/default/files/470-0462.pdf?121920221715"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 underline hover:text-blue-400"
                          >
                            Iowa DHS SNAP website
                          </a>
                          .
                        </p>
                      </motion.div>

                      <div className="md:w-1/2 flex justify-center">
                        <motion.img
                          src="6.png"
                          alt="SNAP Program"
                          className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
                          whileHover={{ scale: 1.05, rotate: 1.5 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                          }}
                        />
                      </div>
                    </div>
                  </ScrollReveal>

                  <div className="mt-16"></div>

                  {/* WIC Section */}
                  <ScrollReveal delay={0.2}>
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 text-lg leading-relaxed space-y-4"
                      >
                        <p>
                          The{" "}
                          <b>
                            Special Supplemental Nutrition Program for Women,
                            Infants, and Children (WIC)
                          </b>{" "}
                          offers healthy food, nutrition education, and support
                          for eligible mothers and young children. </p>
                          
                          <div className="space-y-4">
                        <p>
                          <br /> 
                          <b> Who is Eligible?</b> <br />
                            WIC is specifically for individuals who are considered to be at{" "}
                            <b>nutritional risk</b>. This includes:
                        </p>
                        
                      <ul className="list-disc list-inside space-y-2">
                <li>
                    <b>Pregnant Women:</b> During their pregnancy and up to six weeks after the birth.
                </li>

                <li>
                  <b>Postpartum Women:</b> Up to six months after giving birth.
                </li>

              <li>
                  <b>Breastfeeding Women:</b> Up to the infant's first birthday.
              </li>

              <li>
                <b>Infants:</b> Up to their first birthday.
              </li>

              <li>
                <b>Children:</b> Up to their fifth birthday.
              </li>

            </ul>
            </div>    
                        <p>
                          <b>You can
                          access the</b>{" "}
                          <a
                            href="https://hhs.iowa.gov/media/7865/download?inline"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 underline hover:text-blue-400"
                          >
                            Iowa WIC Guide here
                          </a>
                          .
                        </p>
                      </motion.div>

                      <div className="md:w-1/2 flex justify-center">
                        <motion.img
                          src="7.jpg"
                          alt="WIC Program"
                          className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
                          whileHover={{ scale: 1.05, rotate: 1.5 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                          }}
                        />
                      </div>
                    </div>
                  </ScrollReveal>

                  <div className="mt-24"></div>

                  {/* DCSD & College Section */}
                  <ScrollReveal delay={0.3}>
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 text-lg leading-relaxed space-y-4"
                      >
                        <p>
                          For families with school-aged children, the{" "}
                          <b>Dubuque Community School District (DCSD)</b>{" "}
                          provides several{" "}
                          <a
                            href="https://www.dbqschools.org/district/departments/food-nutrition/meal-programs/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 underline hover:text-blue-400"
                          >
                            meal programs
                          </a>{" "}
                          to ensure students receive balanced meals throughout
                          the year. Additionally, local organizations like the{" "}
                          <a
                            href="https://www.boysgirlsdubuque.com/food-nutrition"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 underline hover:text-blue-400"
                          >
                            Boys &amp; Girls Club of Greater Dubuque
                          </a>{" "}
                          offer free meals and food support for youth.
                        </p>
                        <p>
                          <br /> College students are encouraged to visit their campus
                          food banks, such as the one available at{" "}
                          <b>Loras College</b>, which provides essential
                          groceries and meal resources for students in need.
                        </p>
                      </motion.div>

                      <div className="md:w-1/2 flex justify-center">
                        <motion.img
                          src="8.jpg"
                          alt="School and College Food Programs"
                          className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
                          whileHover={{ scale: 1.05, rotate: 1.5 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                          }}
                        />
                      </div>
                    </div>
                  </ScrollReveal>
                </Section>
              )}

              {activeSection === "housing" && (
  <Section key="housing" title="Housing Resources 🏠">

     <ScrollReveal delay={0}>
                    <div className="flex flex-col md:flex-row items-start gap-8">
                      <div className="md:w-3/5 leading-relaxed">
                        <motion.h2
                          whileHover={{ scale: 1.05, color: "#8d1377" }}
                          transition={{ duration: 0.3 }}
                          className="text-2xl font-bold mb-3"
                        >
                          Housing in Dubuque (Section 8 Info)
                        </motion.h2>
                        <p>
                          <br /> Finding stable housing can be challenging,
                          especially when faced with financial hardship or
                          medical needs. The city of Dubuque offers several
                          programs that accommodate individuals eligible for
                          Section 8 housing and other rental support services.
                          If you or someone you know is in need of immediate
                          housing assistance, you can call <b>211</b> for direct
                          help and referrals. For those seeking to improve their
                          employability or adapt to disabilities,{" "}
                          <b>The Jule Employment and Disability Program</b>{" "}
                          provides job training and supportive resources to help
                          individuals regain independence and stability.
                        </p> <br />
                      </div>
                      <div className="md:w-2/5">
                        <motion.img
                          src="1.jpeg"
                          alt="Housing in Dubuque"
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                          whileHover={{ scale: 1.08, rotate: 1.5 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                          }}
                        />
                      </div>
                    </div>
                  </ScrollReveal>

    {/* 1️⃣ Housing Assistance */}
    <ScrollReveal delay={0.1}>
      <div className="flex flex-col md:flex-row items-start gap-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-lg leading-relaxed space-y-4"
        >
          <p>
            Finding safe and stable housing in Dubuque can be challenging, but several local programs are designed to help residents during times of need. The city provides access to{" "}
            <a href="https://www.cityofdubuque.org/3233/Dubuque-Warming-Centers-Information" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline hover:text-blue-400">
              Warming Centers
            </a>{" "}
            during cold weather emergencies to ensure community members have a safe place to stay. You can also explore the{" "}
            <a href="https://cseiowa.org/wp-content/uploads/DubCo-Resource-Card.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline hover:text-blue-400">
              Shelters and Other Resources
            </a>{" "}
            guide for a list of local shelters and emergency housing contacts.
          </p>
          <p>
            The <b>East Central Intergovernmental Association (ECIA)</b> offers housing-related services and development programs to assist residents in finding affordable homes, while the{" "}
            <b>Hawkeye Area Community Action Program (HACAP)</b> provides direct support with locating and paying for housing. You can visit their Dubuque office at{" "}
            <b>220 W 7th St.</b> for personalized assistance.
          </p>
        </motion.div>

        <div className="md:w-1/2 flex justify-center">
          <motion.img
            src="9.jpg"
            alt="Housing Assistance"
            className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
            whileHover={{ scale: 1.05, rotate: 1.5 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          />
        </div>
      </div>
    </ScrollReveal>

    <div className="mt-16"></div>

    {/* 2️⃣ Energy Assistance */}
    <ScrollReveal delay={0.2}>
      <div className="flex flex-col md:flex-row items-start gap-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-lg leading-relaxed space-y-4"
        >
          <p>
            The{" "}
            <a href="https://www.hacap.org/energy" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline hover:text-blue-400">
              Low-Income Home Energy Assistance Program (LIHEAP)
            </a>{" "}
            helps qualifying households with energy bills and weatherization support, ensuring that residents can stay warm and safe through Iowa’s winter months.
          </p>
        </motion.div>

        <div className="md:w-1/2 flex justify-center">
          <motion.img
            src="10.jpg"
            alt="Energy Assistance"
            className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
            whileHover={{ scale: 1.05, rotate: -1.5 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          />
        </div>
      </div>
    </ScrollReveal>

    <div className="mt-16"></div>

    {/* 3️⃣ Renters */}
    <ScrollReveal delay={0.3}>
      <div className="flex flex-col md:flex-row items-start gap-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-lg leading-relaxed space-y-4"
        >
          <p>
            For those seeking rental housing options, Dubuque maintains a{" "}
            <a href="https://www.greaterdubuque.org/document/rental-resources-guide" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline hover:text-blue-400">
              Rental Resource Guide
            </a>{" "}
            that lists available units, landlord contacts, and tenant support programs to help individuals find affordable places to live.
          </p>
        </motion.div>

        <div className="md:w-1/2 flex justify-center">
          <motion.img
            src="11.jpg"
            alt="Rental Resources"
            className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
            whileHover={{ scale: 1.05, rotate: 1.5 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          />
        </div>
      </div>
    </ScrollReveal>

    <div className="mt-16"></div>

    {/* 4️⃣ Job/Money */}
    <ScrollReveal delay={0.4}>
      <div className="flex flex-col md:flex-row items-start gap-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-lg leading-relaxed space-y-4"
        >
          <p>
            Improving financial stability often starts with access to employment and financial resources. Local organizations such as{" "}
            <a href="https://catholiccharitiesdubuque.org/" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline hover:text-blue-400">
              Catholic Charities of Dubuque
            </a>{" "}
            offer{" "}
            <a href="https://catholiccharitiesdubuque.org/counseling" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline hover:text-blue-400">
              counseling services
            </a>{" "}
            for individuals managing financial hardship. The{" "}
            <a href="https://www.cityofdubuque.org/1036/Financial-Assistance-Programs" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline hover:text-blue-400">
              City of Dubuque Financial Assistance Programs
            </a>{" "}
            also provide aid for low-income residents. Federal options such as{" "}
            <a href="https://www.ssa.gov/ssi" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline hover:text-blue-400">
              SSI
            </a>{" "}
            and{" "}
            <a href="https://www.ssa.gov/disability" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline hover:text-blue-400">
              SSDI
            </a>{" "}
            are available for those with disabilities or limited income.
          </p>
        </motion.div>

        <div className="md:w-1/2 flex justify-center">
          <motion.img
            src="12.jpg"
            alt="Financial Resources"
            className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
            whileHover={{ scale: 1.05, rotate: -1.5 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          />
        </div>
      </div>
    </ScrollReveal>

    <div className="mt-16"></div>

    {/* 5️⃣ Transportation */}
    <ScrollReveal delay={0.5}>
      <div className="flex flex-col md:flex-row items-start gap-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-lg leading-relaxed space-y-4"
        >
          <p>
            Reliable transportation is essential for maintaining independence and access to jobs or healthcare. Residents with mobility challenges can use the{" "}
            <a href="https://www.cityofdubuque.org/303/ADA-Paratransit---MiniBus" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline hover:text-blue-400">
              ADA Paratransit MiniBus
            </a>{" "}
            for accessible rides, while regional travel is supported by{" "}
            <a href="https://www.rta8.org/service/index.php" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline hover:text-blue-400">
              RTA
            </a>{" "}
            which provides public routes and specialized transportation services across Dubuque County.
          </p>
        </motion.div>

        <div className="md:w-1/2 flex justify-center">
          <motion.img
            src="13.jpg"
            alt="Transportation Services"
            className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
            whileHover={{ scale: 1.05, rotate: 1.5 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          />
        </div>
      </div>
    </ScrollReveal>

    <div className="mt-16"></div>

    {/* 4️⃣.5 Job/Money – John */}
<ScrollReveal delay={0.45}>
  <div className="flex flex-col md:flex-row items-start gap-6">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="md:w-1/2 text-lg leading-relaxed space-y-4"
    >
      <p>
        The resources in Dubuque provide assistance for individuals and families seeking financial counseling, government benefits, or employment-related support. These programs help ensure long-term stability and access to essential services.
      </p>

      <p>Key resources include:</p>

      <ul className="list-disc list-inside space-y-2">
        <li>
          <a
            href="https://catholiccharitiesdubuque.org/counseling"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 underline hover:text-blue-400"
          >
            Catholic Charities Counseling Services
          </a>{" "}
          – Provides financial and emotional support to individuals and families in crisis.
        </li>

        <li>
          <a
            href="https://www.ssa.gov/ssi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 underline hover:text-blue-400"
          >
            Supplemental Security Income (SSI)
          </a>{" "}
          – Federal income program for individuals with limited income and resources.
        </li>

        <li>
          <a
            href="https://www.ssa.gov/disability"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 underline hover:text-blue-400"
          >
            Social Security Disability Insurance (SSDI)
          </a>{" "}
          – Provides monthly benefits for individuals unable to work due to disability.
        </li>

        <li>
          <a
            href="https://www.cityofdubuque.org/1036/Financial-Assistance-Programs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 underline hover:text-blue-400"
          >
            City of Dubuque Financial Assistance Programs
          </a>{" "}
          – Local initiatives offering rental, utility, and emergency financial aid.
        </li>

        <li>
          <a
            href="https://catholiccharitiesdubuque.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 underline hover:text-blue-400"
          >
            Catholic Charities of Dubuque
          </a>{" "}
          – Offers broad social service support including housing and employment guidance.
        </li>
      </ul>
    </motion.div>

    <div className="md:w-1/2 flex justify-center">
      <motion.img
        src="14.jpg"
        alt="Job and Financial Assistance"
        className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
        whileHover={{ scale: 1.05, rotate: 1.5 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      />
    </div>
  </div>
</ScrollReveal>

<div className="mt-16"></div>

  </Section>
)}
      {activeSection === "healthcare" && (
  <Section key="healthcare" title="Further Healthcare 💊">
          {/* SECTION 3: Insurance */}
              <ScrollReveal delay={0.2}>
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="md:w-3/5 leading-relaxed">
                    <h2 className="text-2xl font-bold mb-3">
                      Health Insurance and Disability Coverage
                    </h2>
                    <p>
                      <br /> Losing job-based insurance can feel overwhelming,
                      but several programs exist to help maintain continuous
                      health coverage. Through the{" "}
                      <b>Health Insurance Marketplace</b>, individuals can
                      enroll in a new plan during a{" "}
                      <b>Special Enrollment Period</b> triggered by job loss.
                      <br /> <br /> It’s important to apply within{" "}
                      <b>60 days</b> of losing coverage to avoid a lapse in
                      benefits. Many applicants also qualify for premium tax
                      credits or financial assistance based on income. For those
                      who recently left employment with a company of 20 or more
                      employees, <b>COBRA</b> offers the option to continue
                      their existing plan temporarily, ensuring uninterrupted
                      access to essential care. <br />
                    </p> <br />
                  </div><br />
                  <div className="md:w-2/5">
                    <motion.img
                      src="3.jpeg"
                      alt="Insurance Coverage"
                      className="rounded-lg shadow-lg w-full h-auto object-cover"
                      whileHover={{ scale: 1.08, rotate: 1.5 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    />
                  </div>
                </div>
              </ScrollReveal>
    {/* 🏥 PHYSICAL HEALTH SERVICES */}
<ScrollReveal delay={0.1}>
  <h2 className="text-2xl font-bold mb-3">Physical Health Care Services</h2>
  <p className="mb-10 text-lg leading-relaxed">
    Accessing consistent healthcare after a TBI or during recovery is vital for ongoing physical rehabilitation and long-term wellness.
    Below are several trusted facilities in Dubuque providing quality medical care. Each has specific intake requirements, so calling ahead is recommended.
  </p>

  {/* 1️⃣ Hillcrest Professional Health Clinic */}
  <div className="flex flex-col md:flex-row items-start gap-8 mb-16">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="md:w-1/2 text-lg leading-relaxed space-y-3"
    >
      <p>
        <b>Hillcrest Professional Health Clinic</b> — Offers family and preventative medicine services with integrated behavioral support.
        <br /> <b>Location:</b> 220 W 7th St, Dubuque, IA 52001 
        <br /><b>Phone:</b> 563-583-6431
      </p>
    </motion.div>
    <div className="md:w-1/2 flex justify-center">
      <motion.img
        src="00.jpg"
        alt="Hillcrest Clinic"
        className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      />
    </div>
  </div>

  {/* 2️⃣ Crescent Community Health Center */}
  <div className="flex flex-col md:flex-row items-start gap-8 mb-16">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="md:w-1/2 text-lg leading-relaxed space-y-3"
    >
      <p>
        <b>Crescent Community Health Center</b> — A non-profit clinic providing affordable dental, medical, and behavioral care for uninsured and underinsured patients.
       <br /> <b>Location:</b> 1690 Elm St #300, Dubuque, IA 52001
       <br /> <b> Phone:</b> 563-690-2417
      </p>
    </motion.div>
    <div className="md:w-1/2 flex justify-center">
      <motion.img
        src="22.jpg"
        alt="Crescent Community Health"
        className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      />
    </div>
  </div>

  {/* 3️⃣ Medical Associates Clinic */}
  <div className="flex flex-col md:flex-row items-start gap-8 mb-16">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="md:w-1/2 text-lg leading-relaxed space-y-3"
    >
      <p>
        <b>Medical Associates Clinic</b> — A comprehensive multi-specialty group offering family medicine, urgent care, and rehabilitation support.
       <br /> <b>Location:</b> 1000 Langworthy St, Dubuque, IA 52001
       <br /><b> Phone:</b> 563-584-3000
      </p>
    </motion.div>
    <div className="md:w-1/2 flex justify-center">
      <motion.img
        src="33.jpg"
        alt="Medical Associates Clinic"
        className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      />
    </div>
  </div>

  {/* 4️⃣ Grand River Medical Group */}
  <div className="flex flex-col md:flex-row items-start gap-8 mb-16">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="md:w-1/2 text-lg leading-relaxed space-y-3"
    >
      <p>
        <b>Grand River Medical Group</b> — Offers internal medicine, pediatrics, and neurology services with a collaborative care model.
       <br /> <b>Location:</b> 1515 Delhi St Suite 100, Dubuque, IA 52001
       <br /> <b> Phone:</b> 563-582-0044
      </p>
    </motion.div>
    <div className="md:w-1/2 flex justify-center">
      <motion.img
        src="44.jpg"
        alt="Grand River Medical Group"
        className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      />
    </div>
  </div>

  {/* 5️⃣ MercyOne Hospital */}
  <div className="flex flex-col md:flex-row items-start gap-8 mb-16">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="md:w-1/2 text-lg leading-relaxed space-y-3"
    >
      <p>
        <b>MercyOne Hospital</b> — Provides emergency care, surgical services, and rehabilitation therapy.
        <br /> <b>Location:</b> 250 Mercy Dr, Dubuque, IA 52001
         <br /><b>Phone:</b> 563-589-8000
      </p>
    </motion.div>
    <div className="md:w-1/2 flex justify-center">
      <motion.img
        src="55.jpg"
        alt="MercyOne Hospital"
        className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      />
    </div>
  </div>

  {/* 6️⃣ UnityPoint Finley Hospital */}
  <div className="flex flex-col md:flex-row items-start gap-8 mb-16">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="md:w-1/2 text-lg leading-relaxed space-y-3"
    >
      <p>
        <b>UnityPoint Health – Finley Hospital</b> — A regional medical center specializing in trauma, rehabilitation, and outpatient services.
        <br /> <b>Location:</b> 350 N Grandview Ave, Dubuque, IA 52001
        <br /><b> Phone:</b> 563-582-1881
      </p>
    </motion.div>
    <div className="md:w-1/2 flex justify-center">
      <motion.img
        src="66.jpg"
        alt="UnityPoint Finley Hospital"
        className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      />
    </div>
  </div>
</ScrollReveal>

<div className="mt-20"></div>

{/* 🧠 MENTAL HEALTH SERVICES */}
<ScrollReveal delay={0.3}>
  <h2 className="text-2xl font-bold mb-4">Mental Health Services</h2>
  <p className="mb-8 text-lg leading-relaxed">
    Following a TBI, individuals may experience changes in their cognitive and emotional well-being that affect mental health. 
    These local and statewide services provide counseling, crisis support, and therapy options for individuals and families.
  </p>

  <ul className="list-disc list-inside text-lg leading-relaxed space-y-2">
    <li><b>Hillcrest Wellness Center:</b> 563-690-1239</li>
    <li><b>Iowa Warm Line:</b> 1-844-775-9276 (5 pm – 10 pm)</li>
    <li><b>Hillcrest Mental Health & Counseling:</b> 563-582-0145 / <b>Crisis Line:</b> 855-800-1239</li>
    <li><b>Families First Counseling:</b> 888-316-3025</li>
    <li><b>Medical Associates Dept. of Psychiatry & Psychology:</b> 563-584-3500</li>
    <li><b>Summit Outpatient Services:</b> 563-583-3392</li>
    <li><b>Catholic Charities:</b> 563-588-0558 / 800-772-2758</li>
    <li><b>Life Connections:</b> 563-265-8694</li>
    <li><b>NAMI (National Alliance on Mental Illness):</b> 800-950-6264 or text “NAMI” to 741741</li>
    <li><b>Iowa Compass:</b> 800-779-2001 or visit <a href="https://www.iowacompass.org" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline hover:text-blue-400">iowacompass.org</a></li>
    <li><b>Crossroads Counseling Center:</b> 563-556-0699</li>
    <li><b>Your Life Iowa:</b> 855-581-8111 or text 855-895-8398</li>
    <li><b>National Suicide Prevention Lifeline:</b> 800-273-8255 / Spanish: 888-628-9454 / Text 741741</li>
    <li><b>The Trevor Project (LGBTQ Crisis Hotline):</b> 866-488-7386</li>
    <li><b>Veterans Crisis Line:</b> 800-273-8255</li>
    <li><b>ISU Extension – Iowa Concern:</b> Support for legal, financial, and stress-related questions.</li>
  </ul>
</ScrollReveal>
  </Section>
)}
{activeSection === "reintegration" && (
  <Section key="reintegration" title="Reintegration 🧭">
    <ScrollReveal delay={0.1}>
      <h2 className="text-2xl font-bold mb-4">Substance Abuse Services</h2>
      <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed">
        <li>
          <b>Substance Abuse Services Center (SASC)</b> — <b>563-582-3784</b>
        </li>
        <li>
          <b>Mercy Turning Point Treatment Center</b> — <b>563-589-8290</b>
        </li>
        <li>
          <b>Helping Services of Northeast Iowa</b> — <b>563-582-5317</b>
        </li>
        <li>
          <b>The Source</b> — <b>563-583-5440</b>
        </li>
        <li>
          <b>Substance Abuse & Mental Health Services National Helpline</b> —{" "}
          <b>800-662-4357</b> (English & Spanish)
        </li>
      </ul>
    </ScrollReveal>

    <div className="mt-12"></div>

    <ScrollReveal delay={0.2}>
      <h2 className="text-2xl font-bold mb-4">
        Occupational & Physical Therapy (OT/PT)
      </h2>
      <p className="text-lg leading-relaxed mb-4">
        Explore further how each service caters specifically to TBI
        rehabilitation and long-term physical recovery.
      </p>
      <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed">
        <li>
          <b>Hillcrest Professional Health Clinic</b> — <b>563-583-6431</b>
        </li>
        <li>
          <b>Crescent Community Health Clinic</b> — <b>563-690-2417</b>
        </li>
        <li>
          <b>Medical Associates Health Clinic</b> — <b>563-584-3000</b>
        </li>
        <li>
          <b>Grand River Medical Group</b> — <b>563-582-0044</b>
        </li>
        <li>
          <b>MercyOne Hospital</b> — <b>563-589-8000</b>
        </li>
        <li>
          <b>Unity Point Finley Hospital</b> — <b>563-582-1881</b>
        </li>
      </ul>
    </ScrollReveal>

    <div className="mt-12"></div>

    <ScrollReveal delay={0.3}>
      <h2 className="text-2xl font-bold mb-4">Parenting Services</h2>
      <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed">
        <li>
          <b>Child Care Resource & Referral</b> — <b>563-557-1628</b> /{" "}
          <b>1-855-CHILD-01</b>
        </li>
        <li>
          <b>Parent Helpline</b> — <b>855-427-2736</b>
        </li>
        <li>
          <b>Four Oaks / Parents as Teachers / FADDS</b> — <b>563-557-3100</b>
        </li>
        <li>
          <b>Life Connections</b> — <b>563-265-8694</b>
        </li>
      </ul>
    </ScrollReveal>

    <div className="mt-12"></div>

    <ScrollReveal delay={0.4}>
      <h2 className="text-2xl font-bold mb-4">Elderly & Disabled Services</h2>
      <p className="text-lg leading-relaxed">
        For older adults and those with disabilities, Dubuque offers programs
        and support networks that promote independence and access to daily care.
      </p>
    </ScrollReveal>
  </Section>
)}

            </AnimatePresence>
          </main>
        </div>
      )}
    </>
  );
}

// Reusable Section
function Section({ title, content, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      {children ? (
        <div className="text-lg opacity-90 leading-relaxed">{children}</div>
      ) : (
        <p className="text-lg opacity-90 leading-relaxed">{content}</p>
      )}
    </motion.div>
  );
}

// Scroll animation
function ScrollReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const variants = {
    hidden: { opacity: 0, y: 150, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.2, delay },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

// Intro animation
function WordByWordText() {
  const text = "Neuroscience Project";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 120);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <div className="text-4xl md:text-6xl font-serif text-white text-center tracking-wide">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="whitespace-pre"
      >
        {displayedText}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="inline-block ml-1"
        >
          |
        </motion.span>
      </motion.span>
    </div>
  );
}
