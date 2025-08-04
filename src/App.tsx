import React from 'react'
import './App.css'
import Footer from './components/footer';
import Header from './components/header';
import Form from './components/form';
import portal from "./assets/supig10f.png";
import ozempic from "./assets/brlg2a.svg";
import exclaim from "./assets/supig3f.png";
import crowd from "./assets/supig4f.png";
function Home() {
    return (
        <React.Fragment>  
            <Header />
            <div className="home-campaign-qph overflow-afe" id="campaign-root">
                <div className="hdr-gr">
                    <h1>Do you feel as if you have been affected by <span><img className="img-in" width="80" height="80" src={ozempic} /></span> or other drugs that are similar to such?</h1>
                </div>

                <div className="container-je6">
                    <div className="notecard note">
                        <p><span className="s-txt"><strong>Tip:</strong>You're not alone; you and others suffer from unjust practices by multinational companies.</span><span className="exc">Claim yourself <img className="exc-g"src={exclaim}/></span></p>
                    </div>

                    <div className="init ml-adj d-itj pt-sm-gxn">
                        {
                        /* 
                  <div className="col-ozi d-itj column-q72 events-qoz position-7ky">
                    <div className="mx-xfn">

                     
                    </div>
                    <div className="home-campaign-git-h98 rou-64s mx-xfn style-mgWR6" id="style-mgWR6"></div>
                    <div className="mx-xfn my-p6j icon-9x3">
                        <div className="position-7ky block-6o z-yd8">
                            
                        </div>
                    </div>
                    <div className="home-campaign-git-h98 height-ixt rou-64s mx-xfn style-YYwzg" id="style-YYwzg"></div>
                </div>
              
              */}

                        { /* This is a select format for a container of cards */}
                        { /*<div className="col-zow col-58q ml-oot ml-md-en8 mb-zbo mb-md-dko">
                    </div> */}

                        { /*


                        // This is the raw representation of linear shapes that are situated to the left of the content
                         <div className="d-6fb position-4nl build-in-qxd">
                        <div className="col-wsx d-6fb column-vo5 item-skx">
                            <div className="mb-x3j position-4nl icon-6mt">
                                <span
                                    className="position-3th left-lo4 top-g6e height-tt5 width-ntz icon-qvb cir-ldk z-r2g style-KGYh7"
                                    id="style-KGYh7"></span>
                            </div>
                            <div className="home-campaign-git-ej8 height-tt5 rou-mzj build-in-scale-aec build-in-qxd style-gm3If"
                                id="style-gm3If"></div>
                        </div>
                    </div>
                     */ }
                    </div>





                    <div className="d-6fb position-4nl build-in-qxd">

                        <div className="col-wsx d-6fb column-vo5 item-skx">
                            { /*  <div className="mb-x3j position-4nl icon-6mt">
                                <span
                                    className="position-3th left-lo4 top-g6e height-tt5 width-ntz icon-qvb cir-ldk z-r2g style-KGYh7"
                                    id="style-KGYh7"></span>
                            </div> */}

                            <div className="home-campaign-git-ej8 height-tt5 rou-mzj build-in-scale-aec build-in-qxd style-gm3If"
                                id="style-gm3If">


                                <div className="pan">
                                    <div className="pan-i">
                                        <div className="pan-f">
                                        <img src={crowd} alt="crowd" className="pan-fi"/>
                                        </div>
                                        <div className="pan-dec">
                                            <div className="pan-cont">
                                                <div className="pan-cont-inner">
                                                    <h2 className="pan-title">"Where do I sign?"</h2>
                                                    <div className="pan-text-b">
                                                        <p>To sign up for the class action lawsuit, please click the button below to fill out a short form. 
                                                        We will review your information and get back to you as soon as possible.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="pan-i">
                                        <div className="pan-f">
                                        <img src={portal} alt="portal" className="pan-fi"/>
                                        </div>
                                        <div className="pan-dec">
                                            <div className="pan-cont">
                                                <div className="pan-cont-inner">
                                                    <div className="pan-apex">FAQ</div>
                                                    <h2 className="pan-title">"Is this a scam?"</h2>
                                                    <div className="pan-text-b">
                                                    <p>No <span className="exc-w"></span><span className="emb"></span> 
                                                    is a certified distributor and publisher of class action lawsuits 
                                                    from misuse and negligent practices exhibited by manufacturers of 
                                                    GLP-1 drugs. We are here to help you and we made this website in an 
                                                    effort to assist the public with getting access.</p> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>




                                    <div className="pan-i">
                                        <div className="pan-dec">
                                            <div className="pan-cont">
                                                <div className="pan-cont-inner">
                                                    <h2 className="pan-title">Commmon Documents & Licensure</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Form/>
            <Footer/>
        </React.Fragment>
    )
}

export default Home;
