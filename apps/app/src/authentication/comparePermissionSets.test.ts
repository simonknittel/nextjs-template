import { describe, expect, test } from "vitest";
import { comparePermissionSets } from "./comparePermissionSets";

describe("compare permission sets", () => {
  test("permission set containing no attributes vs. no permission sets", () => {
    expect(
      comparePermissionSets({ resource: "myResource", operation: "read" }, []),
    ).toBe(false);
  });

  test("permission set containing no attributes vs. one permission set which is matching", () => {
    expect(
      comparePermissionSets({ resource: "myResource", operation: "read" }, [
        { resource: "myResource", operation: "read" },
      ]),
    ).toBe(true);
  });

  test("permission set containing no attributes vs. one permission set which is more specific", () => {
    expect(
      comparePermissionSets({ resource: "myResource", operation: "create" }, [
        {
          resource: "myResource",
          operation: "manage",
          attributes: [{ key: "id", value: "1" }],
        },
      ]),
    ).toBe(false);
  });

  test("permission set containing one attribute vs. one permission set which is matching", () => {
    expect(
      comparePermissionSets(
        {
          resource: "myResource",
          operation: "create",
          attributes: [
            {
              key: "id",
              value: "1",
            },
          ],
        },
        [
          {
            resource: "myResource",
            operation: "manage",
            attributes: [
              {
                key: "id",
                value: "1",
              },
            ],
          },
        ],
      ),
    ).toBe(true);
  });

  test("permission set containing one attribute which is a boolean vs. one permission set which is matching", () => {
    expect(
      comparePermissionSets(
        {
          resource: "resourceC",
          operation: "read",
          attributes: [
            {
              key: "requiresFoobar",
              value: true,
            },
          ],
        },

        [
          {
            resource: "resourceC",
            operation: "read",
            attributes: [
              {
                key: "requiresFoobar",
                value: "true",
              },
            ],
          },
        ],
      ),
    ).toBe(true);
  });

  test("permission set containing one attribute vs. one permission set which has manage but the attribute isn't matching", () => {
    expect(
      comparePermissionSets(
        {
          resource: "myResource",
          operation: "create",
          attributes: [
            {
              key: "id",
              value: "1",
            },
          ],
        },

        [
          {
            resource: "myResource",
            operation: "manage",
            attributes: [
              {
                key: "id",
                value: "2",
              },
            ],
          },
        ],
      ),
    ).toBe(false);
  });

  test("permission set containing one attribute vs. one permission which is matching and has a wildcard", () => {
    expect(
      comparePermissionSets(
        {
          resource: "myResource",
          operation: "create",
          attributes: [
            {
              key: "id",
              value: "1",
            },
          ],
        },

        [
          {
            resource: "myResource",
            operation: "create",
            attributes: [
              {
                key: "id",
                value: "*",
              },
            ],
          },
        ],
      ),
    ).toBe(true);
  });

  test("permission set containing one attribute vs. one permission which has a wildcard but hasn't a matching operation", () => {
    expect(
      comparePermissionSets(
        {
          resource: "myResource",
          operation: "read",
          attributes: [
            {
              key: "id",
              value: "1",
            },
          ],
        },

        [
          {
            resource: "myResource",
            operation: "create",
            attributes: [
              {
                key: "id",
                value: "*",
              },
            ],
          },
        ],
      ),
    ).toBe(false);
  });

  test("permission set containing one attributes vs. one permission without attributes", () => {
    expect(
      comparePermissionSets(
        {
          resource: "resourceC",
          operation: "read",
          attributes: [
            {
              key: "requiresFoobar",
              value: true,
            },
          ],
        },
        [
          {
            resource: "resourceC",
            operation: "read",
          },
        ],
      ),
    ).toBe(true);
  });

  test("permission set containing one attribute vs. one permission set containing one attribute but with a different key", () => {
    expect(
      comparePermissionSets(
        {
          resource: "resourceC",
          operation: "read",
          attributes: [
            {
              key: "requiresFoobar",
              value: true,
            },
          ],
        },

        [
          {
            resource: "resourceC",
            operation: "read",
            attributes: [
              {
                key: "helloWorld",
                value: "true",
              },
            ],
          },
        ],
      ),
    ).toBe(false);
  });
});
