import type {ReactElement} from 'react';

import {getDoobooStats} from '../../../../server/services/githubService';
import {getSupabaseServerComponentClient} from '../../../../server/supabaseClient';
import {getTranslates} from '../../../../src/localization';
import Container from '../Container';

import Scouter from './Scouter';

import type {Locale} from '~/i18n';

type Props = {
  params: {lang: Locale; login: string};
};

export default async function Page({
  params: {lang, login},
}: Props): Promise<ReactElement> {
  const {stats: tStats} = await getTranslates(lang);
  const supabase = getSupabaseServerComponentClient();

  const stats = await getDoobooStats({
    supabase,
    login,
    lang,
  });

  return (
    <Container t={tStats}>
      {!!stats ? <Scouter stats={stats} t={tStats} /> : null}
    </Container>
  );
}
