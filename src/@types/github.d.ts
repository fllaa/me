interface GithubStatsResponse {
  user: {
    contributionsCollection: {
      totalCommitContributions: number;
    };
    repositoriesContributedTo: {
      totalCount: number;
    };
    pullRequests: {
      totalCount: number;
    };
    openIssues: {
      totalCount: number;
    };
    closedIssues: {
      totalCount: number;
    };
    repositories: {
      totalCount: number;
      nodes: Array<{
        stargazers: {
          totalCount: number;
        };
        name: string;
      }>;
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
    };
  };
  cache?: {
    is_cached: boolean;
    expires_at: string;
  };
}

interface GithubLanguagesResponse {
  user: {
    repositories: {
      nodes: Array<{
        name: string;
        languages: {
          edges: Array<{
            size: number;
            node: {
              name: string;
            };
          }>;
        };
      }>;
    };
  };
  cache?: {
    is_cached: boolean;
    expires_at: string;
  };
}
