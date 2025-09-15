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
  blurb: undefined,
      sections: [
        {
          side: "right",
          img: { src: supig13f, alt: "An illustration of an individual's abdomen in which gastric statis has taken place.", widthPx: 320 },
          copy: (
            <>
              <h1 style={{fontSize: "2rem", fontWeight: 700, marginBottom: 8}}>Gastroparesis (Gastric Stasis)</h1>
              <p>Delayed stomach emptying, causing nausea, vomiting, and feeling full quickly after eating.</p>
              <ul style={{paddingLeft: 0, listStylePosition: 'inside'}}>
                <li>Nausea after meals</li>
                <li>Vomiting undigested food</li>
                <li>Feeling full quickly</li>
              </ul>
              <div style={{marginTop: '0.5em'}}>
                <a href="https://www.niddk.nih.gov/health-information/digestive-diseases/gastroparesis" target="_blank" rel="noopener noreferrer">Learn more</a>
              </div>
            </>
          ),
        },
        {
          side: "left",
          img: { src: supig14f, alt: "An illustration of an individual's abdomen with the intestinal lineage visibly blocked", widthPx: 300 },
          copy: (
          <>
          <h1 style={{fontSize: "2rem", fontWeight: 700, marginBottom: 8}}>Bowel Obstruction (Ileus)</h1>
          <p>Blockage in the intestines, leading to abdominal pain, constipation, and unusual bowel sounds.</p>
          <ul style={{paddingLeft: 0, listStylePosition: 'inside'}}>
            <li>Abdominal pain</li>
            <li>Constipation</li>
            <li>Abnormal bowel sounds</li>
          </ul>
          <div style={{marginTop: '0.5em'}}>
            <a href="https://www.mayoclinic.org/diseases-conditions/intestinal-obstruction/symptoms-causes/syc-20351460" target="_blank" rel="noopener noreferrer">Learn more</a>
          </div>
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
          <ul style={{paddingLeft: 0, listStylePosition: 'inside'}}>
            <li>Sudden vision loss</li>
            <li>Faded or washed-out colors</li>
            <li>Partial loss of field of view</li>
          </ul>
          <div style={{marginTop: '0.5em'}}>
            <a href="https://www.brighamandwomens.org/neurology/neuro-ophthalmology/non-arteritic-anterior-ischemic-optic-neuropathy/" target="_blank" rel="noopener noreferrer">Learn more</a>
          </div>
            </>
          ),
        },
        {
          side: "right",
          img: { src: supig22f || "", alt: "An illustration of a physician telling a patient inaccurate information", widthPx: 300 },
          copy: (
            <>
            <h1 style={{fontSize: "2rem", fontWeight: 700, marginBottom: 8}}>Clinical Negligence</h1>
            <p>Clinical negligence occurs when a healthcare provider fails to meet the standard of care, resulting in harm to the patient. This can include prescribing the wrong medication, failing to recognize contradictions, or not providing adequate information about a drug's risks.</p>
            <div style={{
              backgroundColor: "#FFD1B2",
              outline: "none",
              borderLeft: "2px solid #FF4D00",
              borderTopLeftRadius: "2px",
              padding: "1rem",
              margin: "1em 0"
            }}>
              <strong>Fact:</strong> Clinical negligence is a leading cause of preventable injury in healthcare. If you believe your provider made a mistake with your GLP-1 prescription, you may have grounds for compensation.
            </div>
            
            <ul style={{paddingLeft: 0, listStylePosition: 'inside'}}>
              <li><em>Contradictions (Medical History):</em> Failing to recognize pre-existing conditions that make GLP-1 drugs unsafe.</li>
              <li><em>Inadequate Education:</em> Not informing patients about the drug, its risks, or what to expect.</li>
              <li><em>Reporting Failure:</em> Not following up on abnormal lab results or clinical assessments.</li>
            </ul>
            <div style={{marginTop: '0.5em'}}>
              <a href="https://www.seegerweiss.com/product-liability/ozempic-glp-1-lawsuit/" target="_blank" rel="noopener noreferrer">Learn more about GLP-1 lawsuits</a>
            </div>
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
            <ul style={{ listStyle: 'none', paddingLeft: 0, marginLeft: 0 }}>
            <li>
              <p><em>Electronic Health Record</em>: This is a standardized document that captures common 
              information and characteristics. An<em> EHR </em>will typically 
              include the following:
              </p>
              <h6> This is a reduced list of fields that one may encounter inside of an <span className="ail-b">Electronic Health Record</span>.</h6>
              <ul style={{ listStyle: 'none', paddingLeft: 0, marginLeft: 0 }}>
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
      title: "FAQs", 
      blurb: `Wondering what happens after you fill out our form? Here are answers to common questions about our process and timeline.`, 
      sections: [
        {
          side: "right",
          img: { src: supig17f || "", alt: "Documents", widthPx: 300 },
          copy: (
            <>
              <h2></h2>
            <p><em>How long does it take to receive a 
            response from my claim?</em>: 
            The amount of time it takes for a claim to complete depends on a variety of factors such as the following:</p>
            <ul style={{ listStyle: 'none', paddingLeft: 0, marginLeft: 0 }}>
              <li>1. The agency in which your claim was both received and processed by</li>
              <li>2. The amount of supporting documents and materials surrounding your claim and its authenticity</li>
            </ul>
            <br/>
            <p><em>Who will contact me when a 
            decision is reached regarding my claim?</em>: 
            Once a law firm is assigned to your case, they will be your primary point of contact.</p>
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
