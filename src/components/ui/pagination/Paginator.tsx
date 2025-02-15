'use client'

import React from 'react'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from './pagination'

type IPaginatorProps = {
	goToPreviousPage: () => void
	goToNextPage: () => void
	setPage: (value: number) => void
	page: number
	totalPages: number
}

const Paginator: React.FC<IPaginatorProps> = ({
	goToPreviousPage,
	page,
	setPage,
	totalPages,
	goToNextPage
}) => {
	return (
		<Pagination>
			<PaginationContent>
				{/* Previous Button */}
				<PaginationItem>
					<PaginationPrevious
						role='button'
						aria-label='Previous page'
						aria-disabled={page === 1}
						onClick={goToPreviousPage}
						className={page === 1 ? 'cursor-not-allowed opacity-50' : ''}
					/>
				</PaginationItem>

				{/* Dynamic Page Numbers */}
				{page > 1 && (
					<>
						<PaginationItem>
							<PaginationLink role='button' onClick={() => setPage(1)}>
								1
							</PaginationLink>
						</PaginationItem>
						{page > 3 && (
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
						)}
					</>
				)}

				{/* Display current, previous, and next page numbers */}
				{Array.from({ length: 3 }, (_, i) => page - 1 + i)
					.filter((p) => p > 0 && p <= totalPages)
					.map((p) => (
						<PaginationItem role='button' key={p}>
							<PaginationLink
								role='button'
								onClick={() => {
									setPage(p)
									window.scrollTo({ top: 0, behavior: 'smooth' })
								}}
								isActive={p === page}
								className={p === page ? 'text-black' : 'text-white'}
							>
								{p}
							</PaginationLink>
						</PaginationItem>
					))}

				{/* ellipsis and last page */}
				{page < totalPages - 2 && (
					<>
						{page < totalPages - 3 && (
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
						)}
						<PaginationItem>
							<PaginationLink role='button' onClick={() => setPage(totalPages)}>
								{totalPages}
							</PaginationLink>
						</PaginationItem>
					</>
				)}

				{/* Next Button */}
				<PaginationItem>
					<PaginationNext
						aria-label='Next page'
						aria-disabled={page === totalPages}
						role='button'
						onClick={goToNextPage}
						className={page === totalPages ? 'cursor-not-allowed opacity-50' : ''}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}

export { Paginator }
