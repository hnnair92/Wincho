import React, { useEffect, useState } from "react";
import style from "./faq.module.css";
import faqDataCategory from "../../Api/FaqCategory";
// import faqData from "../../Api/faq";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
const Faq = () => {
  const[faqData,setFaqData] = useState([])
  const [faqCat, setFaqCat] = useState("Registration");
  const [status, setStatus] = useState(true);
  const [catId, setCatId] = useState("");
  const [id, setId] = useState("");
  const [faqStatus, setFaqStatus] = useState(false);
  const baseUrl = "https://uat.wincha-online.com"
  const faqApi = async()=>{
    await fetch(`${baseUrl}/game/faq`).then(res=>res.json()).then((data)=>{
      setFaqStatus(true)
      setFaqData(data.data[0].faq_sections)
      // console.log(data.data[0].faq_sections[0].faqs[0].q)
      setFaqCat(data.data[0].faq_sections[0].section)
      setId(data.data[0].faq_sections[0].faqs[0].q)
    })
  }
  useEffect(()=>{
    faqApi()
    if(faqData){
      // setFaqCat(faqData[0].section)
      
    }
  },[])
  console.log(faqData)
  console.log(faqCat)
  console.log(faqStatus)
  console.log(id)
  return (
    <div className={style.Container}>
      <div className={style.Faq}>
        <button className={style.FaqBtn}>FAQ</button>
        <div className={style.AllFaqSection}>
          {faqData.map((item,index) => {
            return (
              <div className={style.FaqSection} key={index}>
                <div className={style.FaqCategory}>
                  <button>{item.section}</button>
                  {faqStatus && faqCat === item.section ? (
                    <IoIosArrowUp
                      onClick={() => {
                        // setFaqCat(item.name);
                        // setFaqStatus(false)
                        // setCatId(item.id)
                        setFaqCat("")
                        setFaqStatus(false)
                        setCatId("")
                        // set
                      }}
                    />
                  ) : (
                    <IoIosArrowDown
                      onClick={() => {
                        // setFaqCat("");
                        // setFaqStatus(true)
                        // setCatId("")
                        setFaqCat(item.section);
                        setFaqStatus(true);
                        setCatId(item.id);
                        //   console.log(faqCat)
                        // console.log("closed")
                      }}
                    />
                  )}
                </div>
                {faqCat === item.section ? (
                  <div className={style.CategoryDescription}>
                    {item.faqs.map((faq, index) => {
                      const parser = new DOMParser();
                      let doc = parser.parseFromString(faq.ans,"text/html")
                      {/* if (faq.category === faqCat) { */}
                        return (
                          <div
                            className={
                              faqCat === "" ? style.dNone : style.SingleFaqs
                            }
                            key={index}
                          >
                            <p>Q.&nbsp;</p>
                            <div className={style.QuestionAndAnswer}>
                              <div className={style.FaqQuestion}>
                                <button>{faq.q}</button>
                                {status && faq.q === id ? (
                                  <IoIosArrowUp
                                    onClick={() => {
                                      setStatus(false);
                                      setId("");
                                    }}
                                  />
                                ) : (
                                  <IoIosArrowDown
                                    onClick={() => {
                                      setStatus(true);
                                      setId(faq.q);
                                    }}
                                  />
                                )}
                              </div>
                              {status && faq.q === id ? (
                                <div className={style.FaqAnswer}>
                                  <p><div className="content" dangerouslySetInnerHTML={{__html: faq.ans}}></div></p>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        );
                      {/* } */}
                    })}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Faq;
