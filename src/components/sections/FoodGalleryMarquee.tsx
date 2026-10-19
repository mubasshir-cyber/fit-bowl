import Image from 'next/image';

const galleryImages = [
  { src: '/images/hero/hero-bowl.jpg' },
  { src: '/images/bowls/mediterranean-falafel.jpg' },
  { src: '/images/bowls/mexican-burrito-bowl.jpg' },
  { src: '/images/bowls/palak-tofu-bowl.jpg' },
  { src: '/images/bowls/thai-basil-chicken.jpg' },
  { src: '/images/bowls/peri-peri-paneer.jpg' },
];

const foodGalleryStyles = `
  .food-gallery-section {
    --food-gallery-gap: clamp(0.75rem, 1.5vw, 1.25rem);
    overflow: hidden;
    padding: clamp(3.5rem, 6vw, 5rem) 0 clamp(2rem, 4vw, 3rem);
    color: #fff7e8;
    background: #173f32;
  }
  .food-gallery-intro {
    position: relative;
    width: min(calc(100% - 2.5rem), 74rem);
    margin: 0 auto clamp(2rem, 4vw, 3rem);
    text-align: center;
  }
  .food-gallery-eyebrow {
    margin: 0 0 0.6rem;
    color: #f9a06f;
    font-size: 0.7rem;
    font-weight: 900;
    letter-spacing: 0.2em;
  }
  .food-gallery-intro h2 {
    margin: 0;
    color: #fff7e8;
    font-family: var(--font-bricolage), system-ui, sans-serif;
    font-size: clamp(1.8rem, 3.2vw, 2.8rem);
    font-weight: 800;
    letter-spacing: -0.045em;
    line-height: 1.1;
  }
  .food-gallery-intro h2 span { color: #f47738; }
  .food-gallery-description {
    margin: 0.7rem auto 0;
    color: #d4e0d7;
    font-size: clamp(0.9rem, 1.2vw, 1.05rem);
    line-height: 1.55;
  }
  .food-gallery-viewport {
    position: relative;
    width: 100%;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(to right, transparent, #000 3%, #000 97%, transparent);
    mask-image: linear-gradient(to right, transparent, #000 3%, #000 97%, transparent);
  }
  .food-gallery-track {
    display: flex;
    width: max-content;
    animation: food-gallery-scroll 46s linear infinite;
    will-change: transform;
  }
  .food-gallery-viewport:hover .food-gallery-track { animation-play-state: paused; }
  .food-gallery-image-set {
    display: flex;
    flex: none;
    gap: var(--food-gallery-gap);
    padding-right: var(--food-gallery-gap);
  }
  .food-gallery-image-card {
    position: relative;
    flex: none;
    width: clamp(15rem, 22vw, 23rem);
    height: clamp(15rem, 22vw, 23rem);
    overflow: hidden;
    border: 1px solid rgb(255 247 232 / 24%);
    border-radius: clamp(1.1rem, 1.8vw, 1.65rem);
    background: #294e40;
    box-shadow: 0 12px 30px rgb(9 31 24 / 16%);
  }
  .food-gallery-image { object-fit: cover; transition: transform 650ms cubic-bezier(0.2, 0.65, 0.3, 1); }
  .food-gallery-image-card:hover .food-gallery-image { transform: scale(1.045); }
  @keyframes food-gallery-scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  @media (max-width: 640px) {
    .food-gallery-section { --food-gallery-gap: 0.75rem; padding-top: 3.25rem; }
    .food-gallery-intro { width: min(calc(100% - 2rem), 30rem); margin-bottom: 1.65rem; }
    .food-gallery-description { max-width: 21rem; }
    .food-gallery-image-card {
      width: min(72vw, 20rem);
      height: min(72vw, 20rem);
      border-radius: 1.1rem;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .food-gallery-track { animation: none; transform: translateX(0); }
    .food-gallery-image { transition: none; }
  }
`;

export function FoodGalleryMarquee() {
  return (
    <section className="food-gallery-section" aria-labelledby="food-gallery-title">
      <style>{foodGalleryStyles}</style>
      <div className="food-gallery-intro">
        <p className="food-gallery-eyebrow">A FEAST FOR THE EYES</p>
        <h2 id="food-gallery-title">Fresh colour. <span>Real flavour.</span></h2>
        <p className="food-gallery-description">Made daily, packed with goodness, and always worth a closer look.</p>
      </div>

      <div className="food-gallery-viewport">
        <div className="food-gallery-track">
          {[0, 1].map((copy) => (
            <div className="food-gallery-image-set" key={copy} aria-hidden="true">
              {galleryImages.map((image) => (
                <div className="food-gallery-image-card" key={`${copy}-${image.src}`}>
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 72vw, (max-width: 1024px) 38vw, 24vw"
                    className="food-gallery-image"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
