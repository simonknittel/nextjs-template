export type NextjsSearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

export const searchParamsNextjsToURLSearchParams = (
  nextjsSearchParams: Awaited<NextjsSearchParams>,
): URLSearchParams => {
  const urlSearchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(nextjsSearchParams)) {
    const v = typeof value === "string" ? value : value?.[0];
    if (!v) continue;
    urlSearchParams.set(key, v);
  }

  return urlSearchParams;
};
