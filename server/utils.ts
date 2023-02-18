import type {Locale} from '../src/i18n';
import {i18n} from '../src/i18n';

import type {NextApiRequest} from 'next';
import type {SupabaseClient} from '@supabase/supabase-js';
import {acceptLanguage} from 'next/dist/server/accept-header';
import {assert} from '../src/utils/assert';
import {createClient} from '@supabase/supabase-js';

export const createSupabaseClient = (): SupabaseClient<any, 'public', any> => {
  const {SUPABASE_URL, SUPABASE_API_KEY} = process.env;

  assert(SUPABASE_URL, 'SUPABASE_URL is not defined');
  assert(SUPABASE_API_KEY, 'SUPABASE_API_KEY is not defined');

  return createClient(SUPABASE_URL, SUPABASE_API_KEY);
};

export function currentLocale(req: NextApiRequest): Locale {
  if (!i18n) {
    return 'en';
  }

  const chosenLocale = i18n.locales.find(
    (locale: string) => locale == req.cookies.NEXT_LOCALE,
  );

  const detectedLocale =
    chosenLocale ??
    acceptLanguage(
      req.headers['accept-language'],
      i18n.locales as unknown as string[],
    );

  return <Locale>(detectedLocale || i18n.defaultLocale);
}
