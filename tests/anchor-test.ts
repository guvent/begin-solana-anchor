import * as anchor from "@coral-xyz/anchor";
import {Program} from "@coral-xyz/anchor";
import {AnchorTest} from "../target/types/anchor_test";

describe("anchor-test", () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.AnchorProvider.env());

    let provider = anchor.getProvider();

    let counter= anchor.web3.Keypair.generate();

    console.log("Provider Pub Key:", provider.publicKey);

    const program = anchor.workspace.AnchorTest as Program<AnchorTest>;

    it("Is initialized!", async () => {
        // Add your test here.
        const tx = await program.methods
            .initialize(
                new anchor.BN(0) // <- data params on contract;
                // "pub fn initialize(ctx: Context<Initialize>, data: u64) -> Result<()>"
            )
            .accounts({
                user: provider.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId
            })
            // .signers([counter])
            .rpc();
        console.log("Your transaction signature", tx);
    });
});
