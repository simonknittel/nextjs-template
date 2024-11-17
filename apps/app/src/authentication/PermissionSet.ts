export interface PermissionSetAttribute {
  key: string;
  value: string | boolean;
}

export type PermissionSet =
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
