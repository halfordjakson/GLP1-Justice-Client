// services.tsx
import Navigation from "./navigation";
import Footer from "./footer";
import ExpandablePanel, { type CardSpec, type PanelSection } from "./expandablePanel";
// import "../styles/services.css"; // Removed: file does not exist
import expand from "../assets/expand.png";
import collapse from "../assets/collapse.png";
import supig13f from "../assets/supig13f.png";
import supig14f from "../assets/supig14f.png";
import supig15f from "../assets/supig15f.png";
import supig17f from "../assets/supig17f.png";
import supig22f from "../assets/supig22f.png";
import "../styles/expandablePanel.css";
/** Author rows as (image + copy); panel enforces 1:1 images */
type CardData = {
  id: string;
  title: string;
  blurb?: string;
  sections?: PanelSection[];
};
export default function Services() {
  const cards: CardData[] = [
    {
      id: "card-eligibility",
      title: "Eligibility",
      blurb: `Eligibility is ultimately 
      the determining factor for compensation. 
      Eligibility is the tailored criterion that describes 
      issues that arise from the use of "GLP-1" drugs.`,
      sections: [
        {
          side: "right",
          img: { src: supig13f, alt: "An illustration of an individual's abdomen in which gastric statis has taken place.", widthPx: 320 },
          copy: (
            <>
              <h1 style={{fontSize: "2rem", fontWeight: 700, marginBottom: 8}}>Gastroperesis (Gastric Stasis)</h1>
              <p>Delayed stomach emptying, causing nausea, vomiting, and feeling full quickly after eating.</p>
              <ul>
                <li>Nausea after meals</li>
                <li>Vomiting undigested food</li>
                <li>Feeling full quickly</li>
              </ul>
            </>
          ),
        },
        {
          side: "left",
          img: { src: supig14f, alt: "An illustration of an individual's abdomen with the intestinal lineage visibly blocked", widthPx: 300 },
          copy: (
          <>
          <h1 style={{fontSize: "2rem", fontWeight: 700, marginBottom: 8}}>Bowel Obstruction (Illeus)</h1>
          <p>Blockage in the intestines, leading to abdominal pain, constipation, and unusual bowel sounds.</p>
          <ul>
            <li>Abdominal pain</li>
            <li>Constipation</li>
            <li>Abnormal bowel sounds</li>
          </ul>
            </>
          ),
        },
        {
          side: "right",
          img: { src: supig15f, alt: "An illustration depicting an individual suffering from NAION; the individual is seemingly blind in one eye", widthPx: 300 },
          copy: (
          <>
          <h1 style={{fontSize: "2rem", fontWeight: 700, marginBottom: 8}}>Non-Arteritic Anterior Ischemic Optic Neuropathy (NAION)</h1>
          <p>Sudden vision loss in one eye, often noticed upon waking, due to reduced blood flow to the optic nerve.</p>
          <ul>
            <li>Sudden vision loss</li>
            <li>Faded or washed-out colors</li>
            <li>Partial loss of field of view</li>
          </ul>
              <p><em>Intermediate Stages</em>: Intermediate stages of <span className="ail-b">Gastroparesis</span> are characterized by prolonged periods of inadequate gastric motility, frequent nausea and vomiting, and noticeable weight loss.</p>
              <br/>
              <p><em>Late Stages</em>: The final stages for NAION would usually result in total vision loss with respect to the affected area. 
              A general estimate states that the adjacent eye would likely follow suit 15% to 20% of the time.</p>
              <h3>Resources & Counsel</h3>
              <h4> You can learn more about <span className="ail-b">NAION</span> through these external links.</h4>
              <ul>
                <li><a href="https://www.brighamandwomens.org/neurology/neuro-ophthalmology/non-arteritic-anterior-ischemic-optic-neuropathy/">Brigham and Women's Hospital | NAION</a></li>
                <li><a href="https://my.clevelandclinic.org/health/diseases/ischemic-optic-neuropathy">Cleveland Clinic | NAION</a></li>
                <li><a href="https://www.nanosweb.org/i4a/pages/index.cfm?pageid=4196">North American Neuro-Ophthalmology Society | NAION</a></li>
              </ul>
            </>
          ),
        },
        {
          side: "right",
          img: { src: supig22f || "", alt: "An illustration of a physician telling a patient inaccurate information", widthPx: 300 },
          copy: (
            <>
            <h2>Clinical Negligence</h2>
            <br/>
            <p> Were you told that you were eligible for a prescription for a "GLP-1" schedule drug? 
            Did you consume the drug according to the specified regiment and succumb to adverse effects? 
            Did you later discover that the drug was not authorized for your taking from the outset? 
            Were you given the wrong instructions regarding dosages, frequency, or area of application? 
            All of these questions are related to medical negligence and can be the basis for compensation.</p>
            <div style={{
            backgroundColor: "#FFD1B2",
            outline: "none",
            borderLeft: "2px solid #FF4D00",
            borderTopLeftRadius: "2px",
            padding: "1rem"
            }}>
              <h3><span className="prefix-em">D</span>id you know?</h3>
              <br/>
              <p>Two physicians from the state of 
              Texas were accused of issuing thousands of 
              prescriptions to patients without due process. 
              The drugs prescribed were described as being the<em> trinity </em>  
              (a crude, mocking dig on GOD, the Holy Spirit, and Jesus Christ) in 
              that they were all used in 
              succession of one another. This strengthens the fact 
              that clincal malpractice and unauthorized prescriptions 
              are a legitimate issue in today's society.</p>
            </div>
            <br/>
            <p>Clinical negligence has been an issue for a considerable amount of time. 
            There have been numerous instances in which negligence resulted in the injury of a patient.</p>
            <h3>Violations of Practice</h3>
            <h6> This is a reduced list of symptoms that one may exhibit upon being subject to clinical malpractice.</h6>
            <br/>
            <p><em>Contraindications (Medical History)</em>: There are instances in which physicians 
            fail to recognize outstanding conditions that any select 
            individual suffers from; clinical personnel responsible for ordaining 
            the delivery of "GLP-1" drugs may fail to identify the health profile of a patient.</p>
            <p><em>Inadequate Education</em>: A patient may fail 
            to be provided with information in which 
            the nature of the drug is described; a lack of information and what to expect from the 
            assigned regiment can result in suffering for that of the individual affected.</p>
            <br/>
            <p><em>Reporting Failure</em>: The failure to follow suit with 
            consultation in wake of<em> abnormal lab findings </em>and 
            other clinical assessments could also qualify as grounds of clincal negligence. 
            The results derived from lab testing describe the 
            health index of the patient and it should be reported accordingly. 
            If you feel as if you were not provided with correct information in due time, this could be a 
            reason for which your condition has reached the stage it's in. </p>
            <br/>
            <h3>Resources & Counsel</h3>
            <h4> You can learn more about <span className="ail-b">Clinical Negligence</span> through these external links.</h4>
              <ul>
                <li><a href="https://www.robertkinglawfirm.com/wp-content/uploads/2024/09/glp-1-ra-lawsuit-ozempic-trulicity-injury-claims.pdf">Robert King Law Firm | GLP1 RA Lawsuit – Ozempic and Trulicity Injury Claims</a></li>
                <li><a href="https://www.seegerweiss.com/product-liability/ozempic-glp-1-lawsuit/">Seeger Weiss LLP | Ozempic GLP-1 Lawsuit</a></li>
                <li><a href="https://www.classaction.org/media/glp-1-ras-products-liability-litigation.pdf">ClassAction.org | Product Liability Litigation</a></li>
              </ul>
            </>
          ),
        },
      ],
    },
    { id: "card-documentation", 
      title: "Documentation", 
      blurb: `To help a law office review your case, you’ll need to provide some basic medical documentation.`,
      sections: [
        {
          side: "right",
          img: { src: supig17f || "", alt: "Documents", widthPx: 300 },
          copy: (
            <>
            <p>After you submit the form, the law office may request documents such as:</p>
            <ul>
            <li>
              <p><em>Electronic Health Record</em>: This is a standardized document that captures common 
              information and characteristics. An<em> EHR </em>will typically 
              include the following:
              </p>
              <h6> This is a reduced list of fields that one may encounter inside of an <span className="ail-b">Electronic Health Record</span>.</h6>
              <ul>
                <li>
                  <em>First Name</em>
                </li>
                <li>
                  <em>Last Name</em>
                </li>
                <li>
                  <em>Contact Information (Address, Phone Number, Email,  &amp; Emergency Contacts)</em>
                </li>
                <li>
                  <em>Insurance Details</em>
                </li>
                <li>
                  <em>Medical Record Number</em>
                </li>
                <li>
                  <em>Medical Provider Identifiers (e.g. Medicaid & Medicare)</em>
                </li>
                <li>
                  <em>Medical History</em>
                </li>
                <li>
                  <em>Allergens</em>
                </li>
                <li>
                  <em>Medications</em>
                </li>
                 <li>
                  <em>Immunizations</em>
                </li>
                 <li>
                  <em>Vital Signs</em>
                </li>
              </ul>
            </li>
            <br/>
            <li>
            <p><em>Progression Notes</em>: 
            Progression 
            Notes are an active record of your 
            current state of being. This is an rolling artifact in that it 
            persists as you continue to visit your primary point of care. 
            The key difference between that of 
            <span className="ail-b"> Progression Notes </span> and an<span className="ail-b"> EHR </span>is the element of time. 
            <span className="ail-b"> Progression Notes </span> are typically contemporaneous whilst an 
            <span className="ail-b"> EHR </span> is historical.</p>
            </li>
            <br/>
            <li>
            <p><em>Diagnostics</em>: Your diagnostic tests 
            are also a prerequisite for that of compensation 
            claim submissions. An authority responsible for 
            reviewing your claim and determining the best plan of action 
            for such would assess your physiology and other indices of health.</p>
            </li>
            <br/>
            <li>
            
            </li>
            </ul> 
            <br/>
            </>
          )
        }
      ]
    },
     { id: "faq", 
      title: "FAQ", 
      blurb: `Wondering what happens after you fill out our form? Here are answers to common questions about our process and timeline.`, 
      sections: [
        {
          side: "right",
          img: { src: supig17f || "", alt: "Documents", widthPx: 300 },
          copy: (
            <>
            <h2>Frequently Asked Questions</h2>
            <p><em>How long does it take to receive a 
            response from my claim?</em>: 
            The amount of time it takes for a claim to complete depends on a variety of factors such as the following:</p>
            <ul>
            <li>The agency in which your claim was both received and processed by</li>
            <li>The amount of supporting documents and materials surrounding your claim and its authenticity</li>
            <li></li>
            <li></li>
            <li></li>
            </ul>
            <br/>
            <p><em>Who will contact me when a 
            decision is reached regarding my claim?</em>: 
            We will establish a channel of communication 
            with you in an effort to give you briefings 
            on the state of your compensation claim.</p>
            </>
            )
        }
      ]
    },
  ];

  const items: CardSpec[] = cards.map((d) => ({
    id: d.id,
    title: d.title,
    intro: d.blurb ? <p style={{ margin: 0 }}>{d.blurb}</p> : undefined,
    sections: d.sections,
    contentClassName: "svc-panel",   // optional hook for your own CSS
  }));

  return (
    <>
      <Navigation />
      <div className="srv-r">
        <div className="highlight-bar">Resources</div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <ExpandablePanel
              items={items}
              singleOpen
              indicatorCollapsedSrc={expand}
              indicatorExpandedSrc={collapse}
              indicatorSize={22}
              // minColPx removed: no longer a valid prop
              openMode="fullrow"
            />
        </div>
      </div>
      <Footer/>
    </>
  );
}
