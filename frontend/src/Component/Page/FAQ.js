import React from 'react'
import './FAQ.css';

export default function FAQ() {
    return (
        <section className="faq-section py-3">
            <div className="container">

                <div className="w-lg-50 mx-auto">
                    <h2 className="mb-2 mt-4 text-center">Frequently Asked Questions (FAQ)</h2>
                    <h3 className="mb-5 mt-2 text-center">Do You Have a Query?</h3>
                    <div className="accordion accordion-flush" id="accordionExample">

                        {/* QA-1 */}
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#coll1" aria-expanded="true" aria-controls="coll1">
                                    <h5>
                                        <b className=''>Ques 1.</b> What is the history of Celtic Sea Salt?
                                    </h5>
                                </button>
                            </h2>
                            <div id="coll1" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    Celtic Sea Salt was founded in 1976 by Jacques Delangre, PhD, who originated the natural salt industry in America. Over the past forty years, the brand has grown worldwide, known for its unique taste and health benefits. The Delangre family continues this tradition with dedication and pride.
                                </div>
                            </div>
                        </div>

                        {/* QA-2 */}
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#coll2" aria-expanded="false" aria-controls="coll2">
                                    <h5>
                                        <b className=''>Ques 2.</b> What sets Celtic Sea Salt apart from other salt brands?
                                    </h5>
                                </button>
                            </h2>
                            <div id="coll2" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    Celtic Sea Salt stands out due to its superior quality and natural processing. Each product is handpicked, hand processed, and hand packaged. The team personally supervises the harvesting process to ensure only the highest quality ingredients are used, delivering the purest form of sea salt.
                                </div>
                            </div>
                        </div>

                        {/* QA-3*/}
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#coll3" aria-expanded="false" aria-controls="coll3">
                                    <h5>
                                        <b className=''>Ques 3.</b> Why is natural sea salt better than traditional table salt?
                                    </h5>
                                </button>
                            </h2>
                            <div id="coll3" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    Natural sea salt, like Celtic Sea Salt, is free from additives and provides essential nutrients. Traditional table salt often contains additives and, if consumed in improper quantities, can lead to negative health implications. Natural sea salt helps control blood pressure and supports proper nerve and muscle function.
                                </div>
                            </div>
                        </div>

                        {/* QA-4 */}
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#coll4" aria-expanded="false" aria-controls="coll4">
                                    <h5>
                                        <b className=''>Ques 4.</b> What are the health benefits of Celtic Sea Salt?
                                    </h5>
                                </button>
                            </h2>
                            <div id="coll4" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    Celtic Sea Salt offers several health benefits due to its purity and natural composition. It helps control blood pressure, supports nerve and muscle function, and provides essential nutrients without the negative health implications associated with traditional table salt.
                                </div>
                            </div>
                        </div>

                        {/* QA-5 */}
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#coll5" aria-expanded="false" aria-controls="coll5">
                                    <h5>
                                        <b className=''>Ques 5.</b> Does Celtic Sea Salt offer more than just sea salt?
                                    </h5>
                                </button>
                            </h2>
                            <div id="coll5" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    Yes, Celtic Sea Salt offers a diverse range of products beyond sea salt. Their selection includes added value seasonings, electrolytes, health and beauty products, and recipes. They aim to be your trusted health and wellness product provider.
                                </div>
                            </div>
                        </div>

                        {/* QA-6 */}
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#coll6" aria-expanded="false" aria-controls="coll6">
                                    <h5>
                                        <b className=''>Ques 6.</b> What is the mission of Selina Naturally, home of the Celtic Sea Salt® Brand?
                                    </h5>
                                </button>
                            </h2>
                            <div id="coll6" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    Selina Naturally is dedicated to providing a diverse product portfolio with the highest quality ingredients to create a memorable customer experience. Their mission is to innovate and deliver the best products while maintaining the founder’s vision of being a trusted source of sea salt.
                                </div>
                            </div>
                        </div>

                        {/* QA-7 */}
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#coll7" aria-expanded="false" aria-controls="coll7">
                                    <h5>
                                        <b className=''>Ques 7.</b> How does Celtic Sea Salt ensure product quality?
                                    </h5>
                                </button>
                            </h2>
                            <div id="coll7" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    Celtic Sea Salt ensures product quality by handpicking, hand processing, and hand packaging each product. The team visits each location where sea salts are harvested to supervise the process, guaranteeing the highest quality ingredients are used.
                                </div>
                            </div>
                        </div>

                        {/* QA-8 */}
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#coll8" aria-expanded="false" aria-controls="coll8">
                                    <h5>
                                        <b className=''>Ques 8.</b> What is the significance of sodium in Celtic Sea Salt?
                                    </h5>
                                </button>
                            </h2>
                            <div id="coll8" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    Sodium is an essential nutrient that controls blood pressure and is necessary for proper nerve and muscle function. Celtic Sea Salt provides sodium in its purest form, free from additives, making it a healthier choice compared to traditional table salt.
                                </div>
                            </div>
                        </div>

                        {/* QA-9 */}
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#coll9" aria-expanded="false" aria-controls="coll9">
                                    <h5>
                                        <b className=''>Ques 9.</b> What is the foundation of Celtic Sea Salt’s brand integrity?
                                    </h5>
                                </button>
                            </h2>
                            <div id="coll9" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    Celtic Sea Salt’s brand integrity is rooted in over forty years of dedication to exceptional sea salt quality. The brand was founded by Jacques Delangre, PhD, with a vision of providing education on the health benefits of natural sea salt. This legacy is carried forward by the Delangre family, ensuring that each product exceeds quality expectations.
                                </div>
                            </div>
                        </div>

                        {/* QA-10 */}
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#coll10" aria-expanded="false" aria-controls="coll10">
                                    <h5>
                                        <b className=''>Ques 10.</b> How does Celtic Sea Salt address the sodium stigma?
                                    </h5>
                                </button>
                            </h2>
                            <div id="coll10" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    Celtic Sea Salt aims to educate customers on the importance of consuming sodium in its purest form. While excessive sodium from traditional table salt can be harmful, the sodium in Celtic Sea Salt is essential for controlling blood pressure and proper nerve and muscle function. The key is consuming the right amount of pure sodium.
                                </div>
                            </div>
                        </div>

                        {/* QA-11 */}
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#coll11" aria-expanded="false" aria-controls="coll11">
                                    <h5>
                                        <b className=''>Ques 11.</b> What are some of the products offered by Celtic Sea Salt?
                                    </h5>
                                </button>
                            </h2>
                            <div id="coll11" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    In addition to sea salt, Celtic Sea Salt offers a wide range of products including added value seasonings, electrolytes, health and beauty products, and recipes. Their product portfolio is designed to meet various health and wellness needs.
                                </div>
                            </div>
                        </div>

                        {/* QA-12 */}
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#coll12" aria-expanded="false" aria-controls="coll12">
                                    <h5>
                                        <b className=''>Ques 12.</b> How does Celtic Sea Salt maintain its commitment to quality?
                                    </h5>
                                </button>
                            </h2>
                            <div id="coll12" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    Celtic Sea Salt maintains its commitment to quality by personally visiting each pristine location where their sea salts are harvested. They supervise the entire process from start to finish, ensuring that only the highest quality ingredients are used. Each product is handpicked, hand processed, and hand packaged to guarantee purity and excellence.
                                </div>
                            </div>
                        </div>

                        {/* QA-13 */}
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#coll13" aria-expanded="false" aria-controls="coll13">
                                    <h5>
                                        <b className=''>Ques 13.</b> What is the vision of the founder of Celtic Sea Salt?
                                    </h5>
                                </button>
                            </h2>
                            <div id="coll13" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    The founder of Celtic Sea Salt, Jacques Delangre, PhD, envisioned providing education on the superior health benefits of natural sea salt. His dream was to deliver high-quality sea salt products that promote health and wellness. This vision continues to guide the brand’s mission and product offerings.
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </section>
    );

}