import React, { useState, useEffect } from "react";

const ContactForm = (props) => {
   const initialFiledValues = {
      fullName: "",
      mobile: "",
      email: "",
      address: "",
   };
   const [values, setValues] = useState(initialFiledValues);
   useEffect(() => {
      if (props.currentID == "") setValues({ ...initialFiledValues });
      else {
         setValues({ ...props.contactsObjects[props.currentID] });
      }
   }, [props.currentID, props.contactObjects]);

   const handleInputChange = (e) => {
      var { name, value } = e.target;
      setValues({ ...values, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      props.addOrEdit(values);
   };

   return (
      <form autoComplete='off' onSubmit={handleSubmit}>
         <div className='form-row mt-3'>
            <div className='form-group input-group'>
               <div className='input-group-prepend'>
                  <div className='input-group-text'>
                     <i className='fas fa-user p-2'></i>
                  </div>
               </div>
               <input
                  placeholder='Full Name'
                  name='fullName'
                  type='text'
                  className='form-control'
                  value={values.fullName}
                  onChange={handleInputChange}
               />
            </div>
         </div>
         <div className='form-row '>
            <div className='row'>
               <div className='col-lg-6'>
                  <div className='form-group input-group mt-4'>
                     <div className='input-group-prepend'>
                        <div className='input-group-text'>
                           <i className='fas fa-mobile-alt p-2'></i>
                        </div>
                     </div>
                     <input
                        placeholder='Mobile'
                        name='mobile'
                        type='text'
                        className='form-control'
                        value={values.mobile}
                        onChange={handleInputChange}
                     />
                  </div>
               </div>
               <div className='col-lg-6'>
                  <div className='form-group input-group mt-4'>
                     <div className='input-group-prepend'>
                        <div className='input-group-text'>
                           <i className='fas fa-envelope p-2'></i>
                        </div>
                     </div>
                     <input
                        placeholder='Email'
                        name='email'
                        type='text'
                        className='form-control'
                        value={values.email}
                        onChange={handleInputChange}
                     />
                  </div>
               </div>
               <div className='form-group mt-4'>
                  <textarea
                     placeholder='Address'
                     name='address'
                     type='text'
                     className='form-control'
                     value={values.address}
                     onChange={handleInputChange}
                     rows={4}
                  />
               </div>
            </div>
         </div>
         <div className='form-group'>
            <input
               type='submit'
               value={props.currentID == "" ? "Save" : "Update"}
               className={
                  props.currentID == ""
                     ? "btn btn-success btn-block mt-3 w-100"
                     : "btn btn-primary btn-block mt-3 w-100"
               }
            />
            {!props.currentID == "" && (
               <button
                  onClick={() => props.setCurrentID("")}
                  className='btn btn-danger btn-block mt-3 w-100'
               >
                  Cancel
               </button>
            )}
         </div>
      </form>
   );
};

export default ContactForm;
