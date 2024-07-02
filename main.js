const glados = async () => {
  const cookie = process.env.GLADOS
  if (!cookie) return
  try {
    const headers = {
      'cookie': koa:sess=eyJ1c2VySWQiOjE2MDI0OCwiX2V4cGlyZSI6MTc0NDE4MzQwOTM3NywiX21heEFnZSI6MjU5MjAwMDAwMDB9; koa:sess.sig=CdlbxpeQBa0MvsynEXuORzLzJMA; _gid=GA1.2.74970504.1719917358; _gat_gtag_UA_104464600_2=1; _ga=GA1.2.1654834163.1718263371; _ga_CZFVKMNT9J=GS1.1.1719917358.2.1.1719918148.0.0.0,
      'referer': 'https://glados.rocks/console/checkin',
      'user-agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)',
    }
    const checkin = await fetch('https://glados.rocks/api/user/checkin', {
      method: 'POST',
      headers: { ...headers, 'content-type': 'application/json' },
      body: '{"token":"glados.one"}',
    }).then((r) => r.json())
    const status = await fetch('https://glados.rocks/api/user/status', {
      method: 'GET',
      headers,
    }).then((r) => r.json())
    return [
      'Checkin OK',
      `${checkin.message}`,
      `Left Days ${Number(status.data.leftDays)}`,
    ]
  } catch (error) {
    return [
      'Checkin Error',
      `${error}`,
      `<${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}>`,
    ]
  }
}

const notify = async (contents) => {
  const token = process.env.NOTIFY
  if (!token || !contents) return
  await fetch(`https://www.pushplus.plus/send`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      token,
      title: contents[0],
      content: contents.join('<br>'),
      template: 'markdown',
    }),
  })
}

const main = async () => {
  await notify(await glados())
}

main()
