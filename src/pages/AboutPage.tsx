// style
import '@/style/about.css'

// components
import Hero from '@/components/Hero'

// assets
import com_img from '@assets/images/com_banner.png'
import danang from '@assets/images/danang.png'
import hero_3 from '@assets/images/hero_about_3.png'
import hero from '@assets/images/sapa.png'
import { useTranslation } from 'react-i18next'

const AboutPage = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })

  const { t } = useTranslation(['hero', 'about'])
  console.log("object");
  return (
    <>
      <section className='banner_about h-[33vh] center'>
        <h1 className='text-white text-6xl font-medium'>{t('about:heading')}</h1>
      </section>

      <Hero />

      <section className='container_custom mx-auto flex lg:flex-row flex-col justify-between'>
        <div className='lg:w-2/4 w-full' data-aos='fade-right'>
          <h2 className='xl:text-5xl text-3xl'>
            {t('hero:title1')} <span className='text-orange'>NgaoduVietnam</span>
            {t('hero:title3')}
          </h2>
          <p className='text-content my-10 lg:w-9/12'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus viverra nuQlla eget sed odio. Vulputate risus
            faucibus sem non, feugiat nec consequat, montes. Elementum scelerisque phasellus donec lectus ullamcorper
            faucibus. Malesuada et adipiscing molestie egestas leo ut.
          </p>
          <p className='text-content lg:w-9/12'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus viverra nuQlla eget sed odio. Vulputate risus
            faucibus sem non, feugiat nec consequat, montes.
          </p>
        </div>
        <div className='lg:w-1/2 cover lg:mt-0 mt-5' data-aos='fade-left'>
          <img src={hero} className='xl:w-10/12 w-full ml-auto' />
        </div>
      </section>

      <section className='container_custom mx-auto flex justify-between mt-30' data-aos='fade-up'>
        <img src={com_img} alt='com_lang_vong' className='w-full' />
      </section>

      <section className='container_custom mx-auto mt-10 mb-30' data-aos='zoom-in'>
        <h2 className='text-heading font-medium sm:text-[40px] text-3xl mb-5'>
          {t('about:title1')} <br className='lg:block hidden' /> {t('about:title2')}
        </h2>

        <div className='grid grid-cols-2 auto-rows-auto lg:gap-x-30 gap-5 lg:gap-y-10 lg:py-10 '>
          <p className='text-content'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus viverra nulla eget sed odio. Vulputate risus
            faucibus sem non, feugiat nec consequat, montes. Elementum scelerisque phasellus donec lectus ullamcorper
            faucibus. Malesuada et adipiscing molestie egestas leo ut.
          </p>
          <p className='text-content'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus viverra nulla eget sed odio. Vulputate risus
            faucibus sem non, feugiat nec consequat, montes. Elementum scelerisque phasellus donec lectus ullamcorper
            faucibus.
          </p>
          <div className='row-span-3'>
            <img src={hero_3} alt='Champa' className='w-full h-full object-cover' />
          </div>
          <p className='text-content'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus viverra nulla eget sed odio. Vulputate risus
            faucibus sem non, feugiat nec consequat, montes. Elementum scelerisque phasellus donec lectus ullamcorper
            faucibus. Malesuada et adipiscing molestie egestas leo ut.
          </p>
          <div className='row-span-2'>
            <img src={danang} alt='Da Nang' className='w-full h-full object-cover ' />
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutPage
