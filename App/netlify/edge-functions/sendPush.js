export default async function(request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const OS_APP_ID = '3992a7f8-19ac-41b2-9db4-8b67f181f5da';
  const OS_KEY = 'os_v2_app_hgjkp6azvra3fhnurnt7dapv3l5mijqytlpuwong3px7s3ycg4zune6r4p52ojm55epqdcvcpriavnby3aejminqsx2k4hvvanbpiaq';

  try {
    const { playerIds, message } = await request.json();

    if (!playerIds || !playerIds.length || !message) {
      return new Response('Missing playerIds or message', { status: 400 });
    }

    const response = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': OS_KEY
      },
      body: JSON.stringify({
        app_id: OS_APP_ID,
        include_player_ids: playerIds,
        headings: { es: '💛 Sistema RENACER' },
        contents: { es: message },
        ios_badgeType: 'Increase',
        ios_badgeCount: 1
      })
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err) {
    return new Response(err.toString(), { status: 500 });
  }
}

export const config = { path: '/.netlify/functions/sendPush' };
