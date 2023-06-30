'use client';

import type {ReactElement} from 'react';
import {useState} from 'react';
import clsx from 'clsx';

import styles from '../../../styles.module.css';

import StatsDetails from './StatsDetails';
import StatsHeader from './StatsHeader';

import type {DoobooStatsResponse} from '~/server/services/githubService';
import type {StatsInfo} from '~/src/apis/github';
import type {Translates} from '~/src/localization';

export const statNames = [
  'tree',
  'fire',
  'earth',
  'gold',
  'water',
  'people',
] as const;

export type ScouterProps = {
  t: Translates['stats'];
  stats: DoobooStatsResponse;
};

export type StatName = keyof StatsInfo | 'dooboo';

export default function Scouter(props: ScouterProps): ReactElement {
  const [selectedStat, setSelectedStat] = useState<StatName>('dooboo');

  return (
    <div
      className={clsx(
        styles.scrollable,
        'flex flex-col flex-start items-center',
      )}
    >
      <StatsHeader
        selectedStat={selectedStat}
        onChangeStat={(name) => {
          setSelectedStat(name);
        }}
      />
      <StatsDetails {...props} selectedStat={selectedStat} />
    </div>
  );
}
