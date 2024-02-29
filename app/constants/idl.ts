export type IDLType = {
  version: "0.1.0";
  name: "narrative_list";
  instructions: [
    {
      name: "initUser";
      accounts: [
        { name: "newUserAccount"; isMut: true; isSigner: false },
        { name: "authority"; isMut: true; isSigner: true },
        { name: "systemProgram"; isMut: false; isSigner: false }
      ];
      args: [];
    },
    {
      name: "addItem";
      accounts: [
        { name: "userAccount"; isMut: true; isSigner: false },
        { name: "newItemAccount"; isMut: true; isSigner: false },
        { name: "authority"; isMut: true; isSigner: true },
        { name: "systemProgram"; isMut: false; isSigner: false }
      ];
      args: [{ name: "content"; type: "string" }];
    }
  ];
  accounts: [
    {
      name: "UserAccount";
      type: {
        kind: "struct";
        fields: [
          { name: "authority"; type: "publicKey" },
          { name: "lastId"; type: "u8" }
        ];
      };
    },
    {
      name: "ItemAccount";
      type: {
        kind: "struct";
        fields: [
          { name: "authority"; type: "publicKey" },
          { name: "id"; type: "u8" },
          { name: "content"; type: "string" }
        ];
      };
    }
  ];
};

export const IDL: IDLType = {
  version: "0.1.0",
  name: "narrative_list",
  instructions: [
    {
      name: "initUser",
      accounts: [
        { name: "newUserAccount", isMut: true, isSigner: false },
        { name: "authority", isMut: true, isSigner: true },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [],
    },
    {
      name: "addItem",
      accounts: [
        { name: "userAccount", isMut: true, isSigner: false },
        { name: "newItemAccount", isMut: true, isSigner: false },
        { name: "authority", isMut: true, isSigner: true },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [{ name: "content", type: "string" }],
    },
  ],
  accounts: [
    {
      name: "UserAccount",
      type: {
        kind: "struct",
        fields: [
          { name: "authority", type: "publicKey" },
          { name: "lastId", type: "u8" },
        ],
      },
    },
    {
      name: "ItemAccount",
      type: {
        kind: "struct",
        fields: [
          { name: "authority", type: "publicKey" },
          { name: "id", type: "u8" },
          { name: "content", type: "string" },
        ],
      },
    },
  ],
};
