import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div clasName="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/UK-hq/2020/img/DVD/XCM_Manual_1200x445_1217661_1130674_IDx231217661_uk_dvd_digital_readiness_primevideo_banner_2_44c2b7ea_2f3b_4de2_ab69_9968a9e8112a_jpg_LOWER_QL85_.jpg"
          alt=""
        />

        <div className="home__row">
          <Product id="11111" title='The lean startup' price={29.99} image="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg" rating={5}/>
          <Product id="22222" title='BOROFONE BM12 lightMelody, earphones with mic, 3.5mm audio plug, single button control, cable 1.2m' price={250} image="https://www.borofone.com/wp-content/uploads/2019/04/borofone-bm12-lightmelody-universal-wired-earphones-mini.jpg" rating={3}/>
        </div>
        <div className="home__row">
          <Product id="33333" title='3W Wireless LED Bluetooth Speaker' price={180.99} image="https://5.imimg.com/data5/YM/OL/MY-67687712/wireless-led-bluetooth-speaker-500x500.jpg" rating={4}/>
          <Product id="44444" title='Keys One-Handed Game Gaming Keyboard Mouse Keypad For LOL Dota PUBG Fortnite' price={100} image="https://img.joomcdn.net/53fa82513199bcbb029699c72bfd7a157e2e7587_original.jpeg" rating={4}/>
        </div>
        <div className="home__row">
          <Product id="66666" title='Being Elizabeth Bennet : Emma Campbell Webster : 9781843546078' price={210.90} image="https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/8435/9781843546078.jpg" rating={3}/>
        </div>
      </div>
    </div>
  );
}

export default Home;
