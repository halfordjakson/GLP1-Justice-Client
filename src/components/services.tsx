// services.tsx
// ...existing code...
import Navigation from "./navigation";
import Footer from "./footer";
import ExpandablePanel, { type CardSpec, type PanelSection } from "./expandablePanel";
import "../styles/services.css";
import ex from "../assets/expand.png";
import rd from "../assets/collapse.png";
import srvg02 from "../assets/srv-g-02.png";
import supig13f from "../assets/supig13f.png";
import supig14f from "../assets/supig14f.png";
import supig15f from "../assets/supig15f.png";
import supig16f from "../assets/supig16f.png";
import supig17f from "../assets/supig17f.png";
import "../styles/expandablePanel.css";
/** Author rows as (image + copy); panel enforces 1:1 images */
type CardData = {
  id: string;
  title: string;
  blurb?: string;
  sections?: PanelSection[];
};
export default function Services() {
  const CARD_DATA: CardData[] = [
    {
      id: "elig-1",
      title: "Eligibility",
      blurb: "You can be eligible for compensation through a variety of means. Here are a few.",
      sections: [
        {
          side: "right",
          img: { src: supig13f, alt: "Checklist", widthPx: 320 }, // <- square enforced inside panel
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
          img: { src: supig14f, alt: "Documents", widthPx: 300 },
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
          img: { src: supig15f, alt: "Submission flow", widthPx: 300 },
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
      ],
    },
    {
      id: "elig-2",
      title: "Medical History",
      blurb: "Summarize relevant history to help triage your case.",
      sections: [
        {
          side: "right",
          img: { src: supig16f || "", alt: "Medical History", widthPx: 300 },
          copy: (
            <ul>
              <li>Prior conditions</li>
              <li>Current prescriptions</li>
              <li>Known allergies</li>
            </ul>
          ),
        },
      ],
    },
    { id: "elig-3", 
      title: "Timeline", 
      blurb: "Capture dates for medication start/stop and first symptoms." 
    },
    { id: "elig-4", 
      title: "Documentation", 
      blurb: "What to gather before submitting your claim.", 
      sections: [
        {
          side: "right",
          img: { src: supig17f || "", alt: "Documents", widthPx: 300 },
          copy: (
            <>
            <h4>Documentation</h4>
            
            
            </>
            )
        }
      ]
    },
    { id: "elig-5", title: "Contact", blurb: "Preferred way to reach you." },
    { id: "elig-6", title: "Consent", blurb: "Authorization to review records." },
    { id: "elig-7", title: "Next Steps", blurb: "What happens after submit." },
    { id: "elig-8", title: "FAQ", blurb: "Common questions and answers." },
  ];

  const items: CardSpec[] = CARD_DATA.map((d) => ({
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
                indicatorCollapsedSrc={ex}
                indicatorExpandedSrc={rd}
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
