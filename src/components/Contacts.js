import React from "react";
import ContactForm from "./ContactFrom";
import firebaseDB from "../firebase";
import { useState, useEffect } from "react";

export default function Contacts() {
   const [contactsObjects, setContactsObjects] = useState();
   const [currentID, setCurrentID] = useState("");
   useEffect(() => {
      firebaseDB.child("contacts").on("value", (snapshot) => {
         if (snapshot.val()) {
            setContactsObjects({ ...snapshot.val() });
         } else {
            setContactsObjects({});
         }
      });
   }, []);

   const addOrEdit = (obj) => {
      //fireStore add
      /* try {
         firebaseStore.contacts.add(obj);
      } catch (e) {
         console.log(e);
      } */

      //database add
      if (currentID == "") {
         try {
            firebaseDB.child("contacts").push(obj);
         } catch (e) {
            console.log(e);
         }
      } else {
         try {
            firebaseDB.child(`contacts/${currentID}`).set(obj);
         } catch (e) {
            console.log(e);
         }
         setCurrentID("");
      }
   };
   const onDelete = (key) => {
      if (window.confirm("Are you sure ?")) {
         try {
            firebaseDB.child(`contacts/${key}`).remove();
         } catch (e) {
            console.log(e);
         }
         setCurrentID("");
      }
   };

   return (
      <React.Fragment>
         <div className='row  bg-light mb-5'>
            <div className='container pb-5 pt-5 '>
               <h1 className='display-4 text-center'>Contact Register</h1>
            </div>
         </div>

         <div className='row p-1'>
            <div className='col-md-5'>
               <ContactForm
                  {...{ addOrEdit, currentID, setCurrentID, contactsObjects }}
               />
            </div>
            <div className='col-12 col-md-7'>
               <table
                  className='table table-borderless table-striped table-light table-'
                  style={{ tableLayout: "fixed", wordWrap: "break-word" }}
               >
                  <thead>
                     <tr>
                        <th scope='col'>Full Name</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Mobile</th>
                        <th scope='col' className='text-center'>
                           Action
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {contactsObjects &&
                        Object.keys(contactsObjects).map((id) => {
                           return (
                              <tr key={id}>
                                 <td className>
                                    {contactsObjects[id].fullName}
                                 </td>
                                 <td className>{contactsObjects[id].email}</td>
                                 <td className>{contactsObjects[id].mobile}</td>
                                 <td className='text-center'>
                                    <a
                                       className='btn text-primary'
                                       onClick={() => {
                                          setCurrentID(id);
                                       }}
                                    >
                                       <i className='fas fa-pencil-alt'></i>
                                    </a>
                                    <a
                                       href=''
                                       className='btn text-danger'
                                       onClick={() => onDelete(id)}
                                    >
                                       <i className='fas fa-trash'></i>
                                    </a>
                                 </td>
                              </tr>
                           );
                        })}
                  </tbody>
               </table>
            </div>
         </div>
      </React.Fragment>
   );
}
