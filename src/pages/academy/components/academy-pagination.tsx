import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { RootState } from "@/store";
import { setPagination } from "@/store/actions/slices/academySlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";

export function AcademyPagination() {
  const dispatch = useAppDispatch();
  const { count, limit, offset } = useAppSelector((state: RootState) => state.academy);
  // const count = 24; // Example count, replace with actual count from state if available

  const totalPages = count ? Math.ceil(count / limit) : 1;
  const currentPage = Math.floor(offset / limit) + 1;

  const isSm = window.innerWidth > 768;

  const handlePrevious = () => {
    if (offset > 0) {
      dispatch(setPagination({ limit, offset: offset - limit }));
    }
  };

  const handleNext = () => {
    if (count) {
      if (offset + limit < count) {
        dispatch(setPagination({ limit, offset: offset + limit }));
      }
    }
  };

  const renderPageLinks = () => {
    const pageLinks = [];
    const maxVisiblePages = 3;
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      const isActive = currentPage === i;
      pageLinks.push(
        <PaginationItem
          key={i}
          className="h-6 w-6 sm:h-8 sm:w-8 overflow-hidden"
        >
          <PaginationLink
            href="#"
            isActive={isActive}
            onClick={() =>
              dispatch(setPagination({ limit, offset: (i - 1) * limit }))
            }
            className={`w-full h-full ${
              isActive ? "bg-[#53a53f] text-gray-50" : "bg-white text-gray-800"
            } hover:bg-[#53a53f] hover:text-gray-50 focus:bg-[#53a53f] focus:text-gray-50`}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageLinks;
  };

  return (
    <>
      {count && count > 0 ? (
        <Pagination className="w-64 flex items-center justify-end overflow-y-hidden overflow-x-auto">
          <PaginationContent className="h-5">
            {totalPages > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={handlePrevious}
                  className=" text-xs sm:text-base"
                />
              </PaginationItem>
            )}

            {isSm && currentPage > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {isSm && (
              <span className="flex items-center gap-2">
                {totalPages === 1 && (
                  <span className="text-xs sm:text-base">Page: </span>
                )}
                {renderPageLinks()}
              </span>
            )}

            {isSm && currentPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {totalPages > 1 && (
              <PaginationItem>
                <PaginationNext
                  href="#"
                  className="h-full text-xs sm:text-base"
                  onClick={handleNext}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      ) : null}
    </>
  );
}
