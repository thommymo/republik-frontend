import Router from 'next/router'
import { PUBLIC_BASE_URL } from './constants'

export const prefetch = (client, query, variablesForEachQuery, page) => {
  /*
    Router.prefetch won't work in dev mode: prefetching in next/router is a
    production only feature (https://github.com/zeit/next.js/#prefetching-pages)
  */

  Router.prefetch(`${PUBLIC_BASE_URL}/${page}`)

  variablesForEachQuery.map(variables => {
    client.query({
      query,
      variables
    })
  })
}
