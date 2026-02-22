import { cacheTag, cacheLife } from "next/cache";
import { revalidateTag } from "next/cache";
import {
	getCachedRepoPageData as _getCachedRepoPageData,
	getCachedRepoTree as _getCachedRepoTree,
	getCachedBranches as _getCachedBranches,
	getCachedTags as _getCachedTags,
	getCachedContributorAvatars as _getCachedContributorAvatars,
	getCachedRepoLanguages as _getCachedRepoLanguages,
	getCachedOverviewPRs as _getCachedOverviewPRs,
	getCachedOverviewIssues as _getCachedOverviewIssues,
	getCachedOverviewEvents as _getCachedOverviewEvents,
	getCachedOverviewCommitActivity as _getCachedOverviewCommitActivity,
	getCachedOverviewCI as _getCachedOverviewCI,
	type ContributorAvatarsData,
	type BranchRef,
} from "./repo-data-cache";
import { getCachedReadmeHtml as _getCachedReadmeHtml } from "./readme-cache";

export function repoTag(owner: string, repo: string): string {
	return `repo:${owner.toLowerCase()}/${repo.toLowerCase()}`;
}

export function invalidateRepoCache(owner: string, repo: string): void {
	revalidateTag(repoTag(owner, repo), { expire: 3600 });
}

export async function getCachedRepoPageData<T>(
	owner: string,
	repo: string,
): Promise<T | null> {
	"use cache";
	cacheTag(repoTag(owner, repo));
	cacheLife({ revalidate: 300, expire: 3600 });
	return _getCachedRepoPageData<T>(owner, repo);
}

export async function getCachedRepoTree<T>(
	owner: string,
	repo: string,
): Promise<T | null> {
	"use cache";
	cacheTag(repoTag(owner, repo));
	cacheLife({ revalidate: 300, expire: 3600 });
	return _getCachedRepoTree<T>(owner, repo);
}

export async function getCachedBranches(
	owner: string,
	repo: string,
): Promise<BranchRef[] | null> {
	"use cache";
	cacheTag(repoTag(owner, repo));
	cacheLife({ revalidate: 300, expire: 3600 });
	return _getCachedBranches(owner, repo);
}

export async function getCachedTags(
	owner: string,
	repo: string,
): Promise<BranchRef[] | null> {
	"use cache";
	cacheTag(repoTag(owner, repo));
	cacheLife({ revalidate: 300, expire: 3600 });
	return _getCachedTags(owner, repo);
}

export async function getCachedContributorAvatars(
	owner: string,
	repo: string,
): Promise<ContributorAvatarsData | null> {
	"use cache";
	cacheTag(repoTag(owner, repo));
	cacheLife({ revalidate: 600, expire: 7200 });
	return _getCachedContributorAvatars(owner, repo);
}

export async function getCachedRepoLanguages(
	owner: string,
	repo: string,
): Promise<Record<string, number> | null> {
	"use cache";
	cacheTag(repoTag(owner, repo));
	cacheLife({ revalidate: 600, expire: 7200 });
	return _getCachedRepoLanguages(owner, repo);
}

export async function getCachedReadmeHtml(
	owner: string,
	repo: string,
): Promise<string | null> {
	"use cache";
	cacheTag(repoTag(owner, repo));
	cacheLife({ revalidate: 300, expire: 3600 });
	return _getCachedReadmeHtml(owner, repo);
}

export async function getCachedOverviewPRs<T>(
	owner: string,
	repo: string,
): Promise<T[] | null> {
	"use cache";
	cacheTag(repoTag(owner, repo));
	cacheLife({ revalidate: 300, expire: 3600 });
	return _getCachedOverviewPRs<T>(owner, repo);
}

export async function getCachedOverviewIssues<T>(
	owner: string,
	repo: string,
): Promise<T[] | null> {
	"use cache";
	cacheTag(repoTag(owner, repo));
	cacheLife({ revalidate: 300, expire: 3600 });
	return _getCachedOverviewIssues<T>(owner, repo);
}

export async function getCachedOverviewEvents<T>(
	owner: string,
	repo: string,
): Promise<T[] | null> {
	"use cache";
	cacheTag(repoTag(owner, repo));
	cacheLife({ revalidate: 300, expire: 3600 });
	return _getCachedOverviewEvents<T>(owner, repo);
}

export async function getCachedOverviewCommitActivity<T>(
	owner: string,
	repo: string,
): Promise<T[] | null> {
	"use cache";
	cacheTag(repoTag(owner, repo));
	cacheLife({ revalidate: 300, expire: 3600 });
	return _getCachedOverviewCommitActivity<T>(owner, repo);
}

export async function getCachedOverviewCI<T>(
	owner: string,
	repo: string,
): Promise<T | null> {
	"use cache";
	cacheTag(repoTag(owner, repo));
	cacheLife({ revalidate: 300, expire: 3600 });
	return _getCachedOverviewCI<T>(owner, repo);
}
