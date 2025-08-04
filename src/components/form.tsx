import React from "react";

const Form = () => {


    return(

        <div className="frc">

            <div className="frc-con">

                <div className="frc-con-inner flr">

                    <form className="frc-form" action="" method="POST">
                    <input name="name" type="text" placeholder="Full Name" className="frc-input" required/>
                    <input name="email" type="email" placeholder="Email Address" className="frc-input" required/>
                    <input name="phone" type="tel" placeholder="Phone Number" className="frc-input" required/>      
                    <input name="state" type="text" placeholder="State of Residence" className="frc-input" required/>
                    <textarea name="message" placeholder="Additional Information (optional)" className="frc-textarea"></textarea>
                    <button type="submit" className="frc-button">Submit Claim</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Form;