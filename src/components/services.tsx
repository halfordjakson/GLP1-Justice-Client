// services.tsx
import React from "react";
import Navigation from "./navigation";
import Footer from "./footer";
import ExpandablePanel, { type CardSpec, type PanelSection } from "./expandablePanel";
import "../styles/services.css";
import expand from "../assets/expand.png";
import collapse from "../assets/collapse.png";
import srvg02 from "../assets/srv-g-02.png";
import supig13f from "../assets/supig13f.png";
import supig14f from "../assets/supig14f.png";
import supig15f from "../assets/supig15f.png";
import supig16f from "../assets/supig16f.png";
import supig17f from "../assets/supig17f.png";
import supig18f from "../assets/supig18f.png";
import supig19f from "../assets/supig19f.png";
import supig20f from "../assets/supig20f.png";
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
              <h2 style={{fontWeight: "700"}}>Gastroperesis (Gastric Stasis)</h2>
              <p>A condition that affects 
              the stomach muscles and prevents 
              proper stomach emptying.</p>
              <h3> Signs & Symptoms</h3>
              <h6> This is a reduced list of symptoms that one may exhibit upon being subject to the condition that is <span className="ail-b">Gastroparesis (Gastric Stasis)</span></h6>
              <br/>
              <p><em>Nausea</em>: Do you feel nauseated? This is a hallmark sign of <span className="ail-b">Gastroparesis</span>. Nausea typically occurs shortly after eating a meal </p>
              <br/>
              <p><em>Vomiting</em>: Do you vomit undigested food hours after eating? This is another hallmark sign of <span className="ail-b">Gastroparesis</span>. Vomiting typically occurs 2-3 hours after eating a meal </p>
              <br/>
              <p><em>Early Satiety</em>: Do you feel full after eating only a small amount of food? This is another common symptom of <span className="ail-b">Gastroparesis</span>. Early satiety typically occurs during or shortly after eating a meal </p>
              <br/>
              <h3> Progression & Onset</h3>
              <br/>
              <p> Progression for <span className="ail-b">Gastroparesis</span> is usually gradual in that it takes place over a course of multiple stages. </p>
              <p><em>Early Stages</em>: Early stages of Gastroparesis are usually defined </p>
              <br/>
              <p><em>Intermediate Stages</em>: Intermediate stages of <span className="ail-b">Gastroparesis</span> are characterized by prolonged periods of inadequate gastric motility, frequent nausea and vomiting, and noticeable weight loss.</p>
              <h3>Resources & Counsel</h3>
              <h4> You can learn more about <span className="ail-b">Gastroparesis</span> through these external links.</h4>
              <ul>
                <li><a href="https://www.niddk.nih.gov/health-information/digestive-diseases/gastroparesis">National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK) | Gastroparesis</a></li>
                <li><a href="https://iffgd.org/gi-disorders/upper-gi-disorders/gastroparesis/">International Foundation for Gastrointestinal Disorders (IFFGD) | Gastroparesis</a></li>
                <li><a href="https://gi.org/topics/gastroparesis/">American College of Gastroenterology (ACG) | Gastroparesis</a></li>
              </ul>
            </>
          ),
        },
        {
          side: "left",
          img: { src: supig14f, alt: "An illustration of an individual's abdomen with the intestinal lineage visibly blocked", widthPx: 300 },
          copy: (
          <>
          <h2 style={{fontWeight: "700"}}>Bowel Obstruction (Illeus)</h2>
              <p><em>Bowel Obstruction (Illeus) </em>is a condition 
              that affects normal processess that govern the passing of waste throughout your body. 
              The muscular activity of your intestine is impaired and prone to disruption.</p>
              <h3> Signs & Symptoms</h3>
              <h6> This is a reduced list of symptoms that one may exhibit upon being subject to the condition that is <span className="ail-b">Bowel Obstruction (Illeus)</span></h6>
              <br/>
              <p><em>Abdominal Pain</em>: Have you noticed any sustained adbominal pain after consuming "GLP-1" drugs?
              This is a common symptom in individuals who are afflicted with classical <span className="ail-b">Bowel Obstruction (Illeus)</span>.
              Abdominal pain is commonplace during the first weeks of "GLP-1" drug use but sustained periods of pain are a <span className="b-r">red</span> flag. 
              </p>
              <br/>
              <p><em>Constipation</em>: Have you experienced troubles with successfully discharging waste? 
              Do you feel as if you have to exert additional effort in order to pass stool? 
              These are hallmark signs of <span className="ail-b">Bowel Obstruction (Illeus) </span>
              and will likely be considered in an effort to prove your eligibility. 
              </p>
              <br/>
              <p><em>Abnormal Bowel Sounds</em>: Have you noticed any abnormal sounds when attempting to 
              relieve yourself?  <span className="ail-b">Bowel Obstruction (Illeus) </span> 
              could be the culprit as this condition is known to produce crude, distinct sounds.
              </p>
              <br/>
              <h3> Progression & Onset</h3>
              <h4> Progression for <span className="ail-b">Bowel Obstruction (Illeus)</span> is usually gradual in that it takes place over a course of multiple stages. </h4>
              <br/>
              <p><em>Early Stages</em>: Early stages of <span className="ail-b">Bowel Obstruction (Illeus) </span> 
              are usually defined by a variety of indicators. Abnormal bowel sounds are usually introduced in this 
              stage in the form of high-pitched, "tinkling" almost <em>metallic</em> sounds. </p>
              <br/>
              <p><em>Intermediate Stages</em>: Intermediate stages of <span className="ail-b">Bowel Obstruction (Illeus)</span> 
              are characterized by the reduction of audibility from the intestine due to increased build-up. 
              Accompanying symptoms are that</p>
              <br/>
              <p><em>Late Stages</em>: In the former stages, abnormal bowel sounds 
              were discernible but as the intestines continuously fail to mobilize stool, 
              the sounds become more faint &ndash; 
              audible indicators are failing to reveal themselves.
              </p>
              <h3>Resources & Counsel</h3>
              <h4> You can learn more about <span className="ail-b">Bowel Obstructon (Illeus)</span> through these external links.</h4>
              <ul>
                <li><a href="https://www.mayoclinic.org/diseases-conditions/intestinal-obstruction/symptoms-causes/syc-20351460">Mayo Clinic (Intestinal Obstruction)</a></li>
                <li><a href="https://www.ncbi.nlm.nih.gov/books/NBK558937/">National Library of Medicine | Illeus</a></li>
               
              </ul>
            </>
          ),
        },
        {
          side: "right",
          img: { src: supig15f, alt: "An illustration depicting an individual suffering from NAION; the individual is seemingly blind in one eye", widthPx: 300 },
          copy: (
          <>
          <h2 style={{fontWeight: "700"}}>Non-Arteritic Anterior Ischemic Optic Neuropathy (NAION)</h2>
              <p><em>Non-Arteritic Anterior Ischemic Optic Neuropathy (NAION)</em> is a condition that affects vision through the means of interrupted blood flow to the optical nerves.</p>
              <h3> Signs & Symptoms</h3>
              <h6> This is a reduced list of symptoms that one may exhibit upon being subject to the condition that is <span className="ail-b">Non-Arteritic Anterior Ischemic Optic Neuropathy (NAION)</span></h6>
              <br/>
              <p><em>Sudden Vision Loss</em>: Have you exer experienced sudden vision loss upon 
              waking up or throughout any typical day? This is one of the <span className="b-yo">hallmark</span> symptoms for <span className="ail-b">NAION</span>. Most of the time, vision loss can be observed in an altitudinal fashion in that one half of your field of view can be absent.</p>
              <br/>
              <p><em>Dyschromatopsia</em>: This is a condition in which color blindness or 
              otherwise reduction can take place. An onset of Dyschromatopsia would 
              likely result in colors appearing faded or washed &ndash; </p>
              <br/>
              <p><em>Relative Afferent Pupillary Defect (RAPD)</em>: 
              As a direct result of an onset of <span className="ail-b">NAION</span>, 
              <span className="ail-b">RAPD</span> can occur. 
              In the instance you were arrange an assessment with a certified practitioner, 
              this condition could be directly connected to your onset of 
              <span className="ail-b"> NAION </span> which would, in turn, 
              strengthen your profile of eligibility.</p>
              <br/>
              <h3> Progression & Onset</h3>
              <br/>
              <p> Progression for<span className="ail-b"> NAION </span> 
              is purportedly immediate. Most of the cases involving NAION are reported to begin shortly after waking up.</p>
              <p><em>Early Stages</em>: Early stages of 
              <span className="ail-b"> NAION </span> are typically defined by that of sudden vision loss and a mild </p>
              <br/>
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
      blurb: `A host of documents are demanded before your compensation claim is considered. 
      You need to gather documents that pertain to your current health standing amongst others 
      that showcase your history with prescriptions and general indices of health.`, 
      sections: [
        {
          side: "right",
          img: { src: supig17f || "", alt: "Documents", widthPx: 300 },
          copy: (
            <>
            <h2>Core Documentation</h2>
            <p>The core documentation needed for that of successful submission for 
            compensation typically include documents that describe the current 
            health standing for that of the patient alongside interactions between 
            that of clinical institutions and the like.</p>
            <br/>
            <p><em>General Medical Artifacts</em>: A host of documents need to be obtained prior to succesfully filing for compensation.
            There are a host of documents that are purposed for profiling your health and other metrics that describe your person. </p>
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
            claim submissions. Am authority responsible for 
            reviewing your claim and determining the best plan of action 
            for such would assesss your physiology and other measures of your body.</p>
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
        <div className="srv-t">
          <h2>
            <span className="cap-a">S</span>ervices
          </h2>
        </div>
        <div className="srv-cr">
          <div className="srv-i">
            <div className="srv-g">
              <img width="150" height="150" src={srvg02} alt="services" />
              <div className="srv-gi">
                <h3>About our services</h3>
                <p>You can find a variety of services that pertain to GLP-1 drugs here. 
                  It's important to address any concerns regarding eligibility and best practices that accompany using GLP-1 drugs.</p>
              </div>
            </div>
          </div>
          <div className="srv-cc">
            <div className="srv-c">
              <ExpandablePanel
                items={items}
                columns={4}
                singleOpen
                indicatorCollapsedSrc={expand}
                indicatorExpandedSrc={collapse}
                indicatorSize={22}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
