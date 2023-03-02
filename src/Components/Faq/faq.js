import React, { useState } from "react";
import style from "./faq.module.css";
import faqDataCategory from "../../Api/FaqCategory";
import faqData from "../../Api/faq";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
const Faq = () => {
  const [faqCat, setFaqCat] = useState("");
  const [status, setStatus] = useState(false);
  const [catId, setCatId] = useState("");
  const [id, setId] = useState("");
  const [faqStatus, setFaqStatus] = useState(false);
  return (
    <div className={style.Container}>
      <div className={style.Faq}>
        <button className={style.FaqBtn}>FAQ</button>
        <div className={style.AllFaqSection}>
          {faqDataCategory.map((item) => {
            return (
              <div className={style.FaqSection}>
                <div className={style.FaqCategory}>
                  <button>{item.name}</button>
                  {faqStatus && catId === item.id ? (
                    <IoIosArrowUp
                      onClick={() => {
                        // setFaqCat(item.name);
                        // setFaqStatus(false)
                        // setCatId(item.id)
                        setFaqCat("");
                        setFaqStatus(false);
                        setCatId("");
                        // set
                      }}
                    />
                  ) : (
                    <IoIosArrowDown
                      onClick={() => {
                        // setFaqCat("");
                        // setFaqStatus(true)
                        // setCatId("")
                        setFaqCat(item.name);
                        setFaqStatus(true);
                        setCatId(item.id);
                        //   console.log(faqCat)
                        // console.log("closed")
                      }}
                    />
                  )}
                </div>
                {faqCat === item.name ? (
                  <div className={style.CategoryDescription}>
                    {faqData.map((faq, index) => {
                      if (faq.category === faqCat) {
                        return (
                          <div
                            className={
                              faqCat === "" ? style.dNone : style.SingleFaqs
                            }
                          >
                            <p>Q.&nbsp;</p>
                            <div className={style.QuestionAndAnswer}>
                              <div className={style.FaqQuestion}>
                                <button>{faq.question}</button>
                                {status && faq.id === id ? (
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
                                      setId(faq.id);
                                    }}
                                  />
                                )}
                              </div>
                              {status && faq.id === id ? (
                                <div className={style.FaqAnswer}>
                                  <p>{faq.answer}</p>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        );
                      }
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
