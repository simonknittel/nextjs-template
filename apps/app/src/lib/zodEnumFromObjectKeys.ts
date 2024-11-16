import { z } from "zod";

/**
 * **Example usage**
 * ```ts
 * const MY_OBJECT = {
 *   FOO: "bar",
 *   LOREM: "ipsum"
 * } as const;
 *
 * const schema = z.object({
 *   myEnum: zodEnumFromObjectKeys(MY_OBJECT),
 * });
 * ```
 */
export const zodEnumFromObjectKeys = <T extends object>(object: T) => {
  const [firstKey, ...otherKeys] = Object.keys(object);
  return z.enum([firstKey, ...otherKeys]);
};
