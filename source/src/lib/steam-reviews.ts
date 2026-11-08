export type SteamReviewStats = { percent: number; count: number }

type SteamItem = {
  id: number
  success: number
  reviews?: { summary_filtered?: { percent_positive: number; review_count: number } }
}

declare global {
  interface Window {
    [callback: `portfolioSteam_${string}`]: ((data: { response?: { store_items?: SteamItem[] } }) => void) | undefined
  }
}

// Steam serves JSONP for static sites that cannot read the API response with fetch.
export function loadSteamReviews(appId: number, onResult: (stats: SteamReviewStats) => void) {
  const name = `portfolioSteam_${crypto.randomUUID().replaceAll('-', '')}` as const
  const url = new URL('https://api.steampowered.com/IStoreBrowseService/GetItems/v1/')
  url.searchParams.set('input_json', JSON.stringify({
    ids: [{ appid: appId }],
    context: { country_code: 'KR', language: 'english' },
    data_request: { include_reviews: true },
  }))
  url.searchParams.set('jsonp', name)
  const script = document.createElement('script')
  function cleanup() {
    window.clearTimeout(timer)
    script.remove()
    delete window[name]
  }
  const timer = window.setTimeout(cleanup, 8000)
  window[name] = data => {
    const item = data?.response?.store_items?.find(entry => entry.id === appId && entry.success === 1)
    const summary = item?.reviews?.summary_filtered
    if (summary) {
      const { review_count: count, percent_positive: percent } = summary
      if (Number.isSafeInteger(count) && count >= 0 && Number.isInteger(percent) && percent >= 0 && percent <= 100) {
        onResult({ count, percent })
      }
    }
  }
  script.onload = script.onerror = cleanup
  script.src = url.href
  document.head.append(script)
  return cleanup
}
