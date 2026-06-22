import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { heroSlides } from './HeroSlides';
import './HeroSlidesSection.scss';
import 'swiper/css';
import 'swiper/css/effect-fade';

export const HeroSlidesSection = () => {
  return (
    <section
      className="hero-slides-section"
      aria-label="Featured book gallery"
    >
      <div className="hero-slides-section__frame">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            stopOnLastSlide: false,
          }}
          loop
          speed={1000}
          slidesPerView={1}
          allowTouchMove={false}
          className="hero-slides-section__swiper"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={`${slide.desktop}-${index}`}>
              <div className="hero-slides-section__slide">
                <img
                  src={slide.desktop}
                  alt={`Featured slide ${index + 1}`}
                  className="hero-slides-section__image"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
