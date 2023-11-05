import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import { FC, useEffect, useState } from "react";
import idl from "../idl.json";
export interface Props {
    counter;
    setTransactionUrl;
}

export const Instructions: FC<Props> = ({ counter, setTransactionUrl }) => {
    const [count, setCount] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [program, setProgram] = useState<anchor.Program>();
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    useEffect(() => {
        let provider: anchor.Provider;
        try {
            provider = anchor.getProvider();
        } catch (err) {
            provider = new anchor.AnchorProvider(connection, wallet, {});
            anchor.setProvider(provider);
        }

        const program = new anchor.Program(
            idl as anchor.Idl,
            idl.metadata.address
        );
        setProgram(program);
        refreshCount(program);
    }, []);

    const incrementCount = async () => {
        try {
            const tx = await program.methods
                .increment()
                .accounts({
                    myAccount: counter,
                })
                .rpc();

            setTransactionUrl(
                `https://explorer.solana.com/tx/${tx}?cluster=devnet`
            );
            await refreshCount(program);
        } catch (err) {
            console.log("Error incrementing the count", err);
        }
    };

    const decrementCount = async () => {
        try {
            const tx = await program.methods
                .decrement()
                .accounts({
                    myAccount: counter,
                })
                .rpc();

            setTransactionUrl(
                `https://explorer.solana.com/tx/${tx}?cluster=devnet`
            );
            await refreshCount(program);
        } catch (err) {
            console.log("Error decrementing the count", err);
        }
    };

    const resetCount = async () => {
        try {
            const tx = await program.methods
                .reset()
                .accounts({
                    myAccount: counter,
                })
                .rpc();

            setTransactionUrl(
                `https://explorer.solana.com/tx/${tx}?cluster=devnet`
            );
            await refreshCount(program);
        } catch (err) {
            console.log("Error resetting the count", err);
        }
    };

    const updateCount = async () => {
        try {
            const tx = await program.methods
                .update(new anchor.BN(inputValue || 1234))
                .accounts({
                    myAccount: counter,
                })
                .rpc();

            setTransactionUrl(
                `https://explorer.solana.com/tx/${tx}?cluster=devnet`
            );
            await refreshCount(program);
        } catch (err) {
            console.log("Error updating the count", err);
        }
    };

    const refreshCount = async (program) => {
        try {
            const account = await program.account.myAccount.fetch(counter);
            const myAccountData = account.data.toNumber();
            setCount(myAccountData);
        } catch (err) {
            console.log("Error refreshing Count: ", err);
        }
    };

    return (
        <div>
            <div style={{ display: "flex " }}>
                <button onClick={incrementCount} className="button">
                    Increment
                </button>
                <button onClick={decrementCount} className="button">
                    Decrement
                </button>
                <button onClick={resetCount} className="button">
                    Reset
                </button>
                <button onClick={updateCount} className="button">
                    Update
                </button>
                <input
                    type="number"
                    className="input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>

            <div style={{ color: "white" }}>Count: {count}</div>
        </div>
    );
};
