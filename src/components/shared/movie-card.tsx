import Image from 'next/image'

type MovieCardProps = {
	title: string
	year: string
	duration: string
	posterUrl: string
}

const MovieCard: React.FC<MovieCardProps> = ({
	title,
	year,
	duration,
	posterUrl
}) => {
	return (
		<section key={posterUrl} className='gap-4 flex flex-col'>
			<section className='relative w-full h-[316px]'>
				<Image
					className='object-cover'
					sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
					src={posterUrl}
					alt={title || 'Movie poster'}
					fill
					priority
				/>
			</section>
			<section>
				<h2 className='text-sm md:text-2xl font-medium capitalize'>{title}</h2>
				<section className='flex gap-6 mt-2'>
					<p className='text-sm md:text-xl'>{year}</p>
					<p className="text-sm md:text-xl before:ml-0.5 before:text-red-500 before:content-['*']">
						{duration}m
					</p>
				</section>
			</section>
		</section>
	)
}

export { MovieCard }
