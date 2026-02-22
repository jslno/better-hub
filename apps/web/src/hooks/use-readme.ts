import { useQuery } from "@tanstack/react-query";

export function useReadme(
	owner: string,
	repo: string,
	_branch: string,
	initialHtml: string | null,
) {
	return useQuery({
		queryKey: ["readme", owner, repo],
		queryFn: () => initialHtml,
		initialData: initialHtml ?? undefined,
		staleTime: Infinity,
		gcTime: Infinity,
		enabled: false,
	});
}
