type ResponseData = {
    message : string;
    data: any;
    meta: {
        total: number;
        perPage: number;
        currentPage: number;
        lastPage: number;
        firstPage: number;
        firstPageUrl: string | null;
        lastPageUrl: string | null;
        nextPageUrl: string | null;
        previousPageUrl: string | null;
    }
}