# Authorization

## How do define and use a new permission?

1. Add permission schema to the [PermissionSet.ts](../apps/app/src/authentication/PermissionSet.ts) file.
2. Add logic for how to assign this permission to a user in the [getGivenPermissionSets.ts](../apps/app/src/authentication/getGivenPermissionSets.ts) file.
3. Use the permission in the application code:

### Example: Can the current user read a resource of type "myResource" with id "1"?

```ts
import { authenticate } from "@/authentication/authenticateAndAuthorize";

const authentication = await authenticate();
if (
  !authentication.authorize("myResource", "read", [{ key: "id", value: "1" }])
)
  throw new Error("Unauthorized");

// Do something
```

### Example: Authenticate and authorize a server action

```ts
import { authenticateAction } from "@/authentication/authenticateAndAuthorize";

export const createMyResourceAction = async () => {
  const authentication = await authenticateAction("createMyResourceAction");
  authentication.authorizeAction("myResource", "create");

  // Do something
};
```

### Example: Authenticate and authorize a page view

```ts
import { authenticatePage } from "@/authentication/authenticateAndAuthorize";

export default async function Page({ params }) {
  const { id } = await params;

  const authentication = await authenticatePage("/admin/myResource/[id]");
  authentication.authorizePage("myResource", "create", [
    { key: "id", value: id },
  ]);

  // Render the page
}
```
