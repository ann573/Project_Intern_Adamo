import { useDetailHotels } from '@/hooks/hotels'
import { useTranslation } from 'react-i18next'

interface Props {
  id: string
}
const AdditionalInfoHotel: React.FC<Props> = ({ id }) => {
  const { t } = useTranslation('hotel')
  const { data } = useDetailHotels(id)
  if (!data) {
    return <div>Loading...</div>
  }
  return (
    <>
      <h3 className='font-bold my-5 text-xl'>{t('desc.overview')}</h3>
      <section className='text-color-content-second'>
        {data.description.overview.split('\n').map((line, idx) => (
          <p key={idx} className='my-3'>
            {line}
          </p>
        ))}
      </section>

      <hr className='my-10' />
      <h3 className='text-heading-second mt-5 mb-3 text-xl font-bold'>{t('desc.amenities')}</h3>
      <section className='text-heading-second grid grid-cols-2 gap-y-2 gap-x-8'>
        {data.description.amenities.map((item, idx) => (
          <div key={idx} className='flex gap-2 items-center mb-2'>
            <i className='ri-check-line text-xl text-green-500'></i>
            <p>{item}</p>
          </div>
        ))}
      </section>

      <hr className='my-10' />

      <h3 className='text-heading-second mt-5 mb-3 text-xl font-bold'>{t('desc.rule')}</h3>

      <section>
        <div className='grid grid-cols-2 gap-x-10 gap-y-5'>
          <div>
            <p className='text-[#FF7B42] font-bold'>Check-in</p>
            <p className='text-heading-second font-bold text-xl bg-[#F5F5F5] dark:bg-[#424040]  py-2 text-center w-full mt-3 '>
              {data.description.rules.checkin}
            </p>
          </div>

          <div>
            <p className='text-[#FF7B42] font-bold'>Check-out</p>
            <p className='text-heading-second font-bold text-xl bg-[#F5F5F5] dark:bg-[#424040] py-2 text-center w-full mt-3 '>
              {data.description.rules.checkout}
            </p>
          </div>
        </div>

        <div className='my-5'>
          {data.description.rules.other.map((item, idx) => (
            <div key={idx} className='flex gap-2 items-center mb-2  item-center'>
              <i className='ri-checkbox-blank-circle-fill text-[7px]'></i>
              <p className='text-lg text-color-content-second'>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className='my-10' />

      <h3 className='text-heading-second mt-5 mb-3 text-xl font-bold'>{t('desc.map')}</h3>
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.3719535378073!2d105.77852957471416!3d21.017798188156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab1167edbae7%3A0xa0790fee2a2a9c1b!2sAdamo%20Software!5e0!3m2!1svi!2s!4v1744619664297!5m2!1svi!2s'
        width='100%'
        height='450'
        style={{ border: '0' }}
        allowFullScreen={true}
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      ></iframe>
    </>
  )
}

export default AdditionalInfoHotel
