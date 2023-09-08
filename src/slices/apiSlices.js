//RTK implementation to make asynchronous requests

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://www.omdbapi.com/';

export const searchSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,

    // prepareHeaders(headers) {
    //   headers.set('x-api-key', '4d147704')
    //   return headers;
    // }

  }),
  
  endpoints: (builder) => ({
    getMoviesByIdentity: builder.query({
      query: (identity) => identity
    })
  })

})


export const {useGetMoviesByIdentityQuery } = searchSlice;