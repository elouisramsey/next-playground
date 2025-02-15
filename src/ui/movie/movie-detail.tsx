'use client'

import { getMovie } from '@/app/movie/[movieId]/page'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

type IMovieDetailsProps = {
	movieId: string
}

const MovieDetails: React.FC<IMovieDetailsProps> = ({ movieId }) => {
	const { data } = useQuery({
		queryKey: ['posts'],
		queryFn: () => getMovie(movieId)
	})

	return <div className='text-4xl text-white justify-center items-center flex'>{data?.title}</div>
}

export { MovieDetails }
