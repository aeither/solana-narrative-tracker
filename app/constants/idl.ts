export type IDLType = {
  version: "0.1.0";
  name: "hello_anchor";
  instructions: [
    {
      name: "initialize";
      accounts: [
        { name: "newAccount"; isMut: true; isSigner: true },
        { name: "signer"; isMut: true; isSigner: true },
        { name: "systemProgram"; isMut: false; isSigner: false }
      ];
      args: [{ name: "data"; type: "u64" }];
    }
  ];
  accounts: [
    {
      name: "NewAccount";
      type: { kind: "struct"; fields: [{ name: "data"; type: "u64" }] };
    }
  ];
};

export const IDL: IDLType = {
  version: "0.1.0",
  name: "hello_anchor",
  instructions: [
    {
      name: "initialize",
      accounts: [
        { name: "newAccount", isMut: true, isSigner: true },
        { name: "signer", isMut: true, isSigner: true },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [{ name: "data", type: "u64" }],
    },
  ],
  accounts: [
    {
      name: "NewAccount",
      type: { kind: "struct", fields: [{ name: "data", type: "u64" }] },
    },
  ],
};
