'use client'

import { MovieCard } from '@/components/shared/movie-card'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationLink,
	PaginationEllipsis,
	PaginationNext
} from '@/components/ui/pagination/pagination'
import {Paginator} from '@/components/ui/pagination/Paginator'

import { api } from '@/config/api-config'
import { MovieResponse } from '@/models/Movie'
import { getTruncatedTitle } from '@/utils/textUtils'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useState } from 'react'

const getMovies = async (page: number): Promise<MovieResponse> => {
	return await api
		.get(`trending/all/day?language=en-US&page=${page}`)
		.then((res) => res.data)
}

export default function Home() {
	const [page, setPage] = useState(1)
	const { isPending, data } = useQuery({
		queryKey: ['movies', page],
		queryFn: () => getMovies(page),
		placeholderData: keepPreviousData
	})

	const totalPages = data?.total_pages ?? 1

	const goToNextPage = useCallback(() => {
		setPage((prev) => prev + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [page])

	const goToPreviousPage = useCallback(() => {
		if (page === 1) return

		setPage((prev) => prev - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [page])

	return (
		<div className='min-h-screen text-white p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main>
				<div className='grid grid-cols-12 h-42 gap-2 mb-4'>
					<div className='flex items-center gap-1 md:col-span-1 h-full'>
						<Image src='/assets/fire.png' alt='Now trending' height={42} width={42} />
						<h2 className='text-white text-2xl md:text-4xl font-bold'>Trending</h2>
					</div>
					<div className='col-span-11 flex items-center justify-end overflow-hidden'>
						<div className='h-0.5 md:w-[95%] bg-[#504A79]' />
					</div>
				</div>

				{!isPending ? (
					<>
						{/* TODO make this a responsive grid */}
						<section className='grid gap-8 grid-cols-2 gap-y-12 my-4 md:my-8  md:grid-cols-5 lg:grid-cols-6 overflow-x-hidden justify-between'>
							{data?.results.map((movie) => (
								<Link key={movie.id} href={`/movie/${movie.id}`}>
									<MovieCard
										title={getTruncatedTitle(movie?.title, movie?.original_title)}
										year={movie?.release_date}
										duration={'140'}
										posterUrl={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
									/>
								</Link>
							))}
						</section>
						<Paginator
							goToPreviousPage={goToPreviousPage}
							goToNextPage={goToNextPage}
							page={page}
							totalPages={totalPages}
							setPage={setPage}
						/>
					</>
				) : null}
			</main>
		</div>
	)
}
