'use client';

import type {ReactElement} from 'react';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {ArrowRightIcon} from '@primer/octicons-react';
import clsx from 'clsx';
import Image from 'next/image';

import {subscribeNewsletter} from '../../../src/apis/newsLetter';
import Button from '../../../src/components/uis/Button';
import TextInput from '../../../src/components/uis/TextInput';
import {validateEmail} from '../../../src/utils/common';

import imgBgSection2 from '~/public/assets/bg_section2.png';
import type {Translates} from '~/src/localization';

type Props = {
  t: Translates['home'];
};

const descriptionClassNames =
  'mb-4 text-left text-[16px] text-basic opacity-50 flex flex-wrap';

const newLetterLabelClassNames =
  'text-[18px] font-bold text-basic mr-3 md:text-[18px] md:leading-[160%]';

export default function SectionHowItWorks({t}: Props): ReactElement {
  const [successText, setSuccessText] = useState('');
  const {
    register,
    formState: {errors, isSubmitting},
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: {email: ''},
  });

  const reqNewsLetterSubs = async ({email}: {email: string}): Promise<void> => {
    if (!validateEmail(email)) {
      setError('email', {type: 'validate'}, {shouldFocus: true});

      return;
    }

    const text = await subscribeNewsletter(email);
    setSuccessText(`${text}.`);
  };

  return (
    <div
      className={clsx(
        'self-stretch bg-basic bg-cover',
        'flex flex-col justify-center items-center',
        'md:p-0 md:flex md:flex-col md:justify-center md:items-center',
      )}
      style={{
        backgroundImage: `url(${imgBgSection2})`,
        backgroundRepeat: 'no-repeat',
      }}
    >
      <form
        onSubmit={handleSubmit(reqNewsLetterSubs)}
        className={clsx(
          'self-stretch py-20 px-14 min-h-[400px] relative',
          'flex flex-col justify-start items-start',
          'min-[1200px]:self-center min-[1200px]:w-[1200px]',
        )}
      >
        <Image
          className="max-w-[256] h-auto"
          src="/assets/works.png"
          alt="works"
          width={256}
          height={256}
        />
        <div
          className={clsx(
            'max-w-[680px] text-left leading-[28px] mb-8',
            'flex flex-col flex-wrap',
          )}
        >
          <p className="mt-20 mb-10 text-left font-bold text-[40px] text-basic leading-5">
            {t.howItWorks}
          </p>
          <p className={descriptionClassNames}>{t.howItWorksDesc}.</p>
          <p className={descriptionClassNames}>{t.subscribeForMoreUpdates}.</p>
          {/* Begin: NewsLetter */}
          <div
            className={clsx(
              'mt-4 min-h-20 self-stretch rounded-md p-4',
              'flex flex-row items-center bg-paper',
            )}
          >
            <label className={newLetterLabelClassNames}>{t.newsLetter}</label>
            <TextInput
              className="text-[14px] text-basic mr-3 w-full"
              placeholder={t.emailAddress}
              {...register('email', {required: true})}
            />
            <Button
              className={clsx(
                'w-9 h-9 rounded-[18px] border-0 bg-basic',
                'flex items-center justify-center',
              )}
              type="submit"
              loading={isSubmitting}
              text={<ArrowRightIcon size={24} className="pt-1" />}
            />
          </div>
          {successText ? (
            <p className="m-2 text-success text-[14px]">
              {t.successEmailSubscription}.
            </p>
          ) : null}
          {errors.email ? (
            <p className="m-2 text-validation text-[14px]">
              {t.notValidEmail}.
            </p>
          ) : null}
          {/* End: NewsLetter */}
        </div>
      </form>
    </div>
  );
}
