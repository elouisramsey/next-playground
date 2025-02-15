import { api } from '@/config/api-config'
import { MovieDetails } from '@/ui/movie/movie-detail'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

export const revalidate = 0

export const getMovie = async (id: string): Promise<any> => {
	return await api.get(`movie/${id}?language=en-US`).then((res) => res.data)
}

export default async function Movie({
	params
}: {
	params: {
		movieId: string
	}
}) {
	const { movieId } = await params

	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['posts', movieId],
		queryFn: () => getMovie(movieId)
	})

	return (
    <HydrationBoundary state={dehydrate(queryClient)}>
			<MovieDetails movieId={movieId} />
		</HydrationBoundary>
	)
}
