export interface PermissionSet {
  resource: string;
  operation: string;
  attributes?: {
    key: string;
    value: string | boolean;
  }[];
}

export type ExistingPermissionSet =
  | {
      resource: "administration";
      operation: "manage";
    }
  | {
      resource: "team";
      operation: "update";
      attributes: [
        {
          key: "id";
          value: string;
        },
      ];
    };
