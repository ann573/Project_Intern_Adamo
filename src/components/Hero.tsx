// assets
import heroImage from '@assets/images/hero_1.png'
import heroImage2 from '@assets/images/hero_2.png'
import { useTranslation } from 'react-i18next'

const Hero = () => {
  const { t } = useTranslation(['hero'])
  return (
    <section className='max-w-[1200px] mx-auto lg:grid lg:grid-cols-2 flex flex-col-reverse xl:my-50 sm:mt-20 md:mb-80 mt-10 mb-50 xl:px-0 px-5 xl:gap-0 gap-20'>
      <div className='relative w-full lg:full h-[500px]'>
        <img src={heroImage} alt='hero_image_1' className='absolute ' data-aos='fade-right' />
        <img
          src={heroImage2}
          alt='hero_image_1'
          className='absolute sm:size-[347px] size-[280px] sm:left-1/3 right-0 xl:top-1/2 top-2/3 '
          data-aos='fade-left'
        />
      </div>

      <div data-aos='zoom-in'>
        <h2 className='font-medium xl:text-[40px] text-2xl sm:w-[80%] mb-10'>
          {t('title1')} <span className='text-orange '>NgaoduVietnam</span>
          {t('title3')}
        </h2>

        <div className='flex gap-7'>
          <div>
            {/* <img src="../assets/icons/shape.svg" alt="quote" /> */}
            <i className='ri-double-quotes-l text-orange text-4xl'></i>
          </div>
          <div className='text-content flex flex-col gap-5'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni, rerum quos. Maiores ipsa obcaecati
              dignissimos quaerat repellendus reprehenderit temporibus, ex sunt sit nulla debitis quis fugiat. Sequi
              ullam eveniet corrupti ut, accusamus aspernatur odio excepturi vel maxime tenetur.
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel dolorum voluptate quas reiciendis ad officia
              vitae aspernatur voluptatum et voluptatibus, natus ratione voluptates iure expedita consequatur est
              nostrum aliquam molestiae?
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
