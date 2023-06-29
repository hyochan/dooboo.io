import type {NextApiRequest, NextApiResponse} from 'next';

import {getSupabaseRouteHandlerClient} from '../../../server/supabaseClient';
import type {PluginUser} from '../../utils/functions';
import {getUserPlugins} from '../../utils/functions';

type Reply = {message: string} | {users: PluginUser[]};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Reply>,
): Promise<void> {
  const {method, body} = req;
  const supabase = getSupabaseRouteHandlerClient();

  switch (method) {
    case 'POST':
      const pluginId = <string>body.pluginId;
      const take = <number>body.take;
      const dateStr = <string>body.cursor;

      if (!pluginId) {
        res.status(404).send({message: 'pluginId is required'});

        return;
      }

      const {data: plugin} = await supabase
        .from('plugins')
        .select('*')
        .eq('id', pluginId)
        .single();

      if (!plugin) {
        res.status(404).send({message: 'Plugin not found'});

        return;
      }

      const userPlugins = await getUserPlugins({
        plugin,
        take,
        dateStr,
        supabase,
      });

      res.status(200).send({users: userPlugins});

      break;
  }
}
