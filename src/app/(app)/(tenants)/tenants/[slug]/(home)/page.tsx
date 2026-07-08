import type { SearchParams } from "nuqs/server";
import { DEFAULT_LIMIT } from "@/constants";
import { getQueryClient, trpc } from "@/trpc/server"

import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { loadProductFilters } from "@/modules/products/search-params";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
    searchParams: Promise<SearchParams>;
    params: Promise<{ slug: string }>;
};

const Page = async ({ params, searchParams }: Props) => {
    const { slug } = await params;
    const filters = await loadProductFilters(searchParams)

    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
        tenantSlug: slug,
        ...filters,
        limit: DEFAULT_LIMIT,
    }));

    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProductListView tenantSlug={slug} narrowView />

            </HydrationBoundary>
        </div>
    );
};

export default Page;