
### Init project and build

```
anchor init project-name
yarn
anchor build
```

### Generate a wallet on file

```
solana address -k target/deploy/project_name-keypair.json
```

### Deploy contract to devnet
```
anchor deploy --provider.cluster devnet
```

Example outputs;
```
Deploying cluster: https://api.devnet.solana.com
Upgrade authority: /Users/<username>/.config/solana/id.json
Deploying program "<project_name>"...
Program path: /Users/<username>/RustroverProjects/<project-name>/target/deploy/<project_name>.so...
Blockhash expired. 4 retries remaining
Program Id: EKodWKwwnJeYCYvdD5cBzvEch8ZDTTM6KyBGxhmP7id8

```

And check deployed contract transaction with this website:
https://explorer.solana.com/?cluster=devnet


---
If seen this error;

error: not a directory: '/Users/<username>/.local/share/solana/install/releases/<version>/solana-release/bin/sdk/sbf/dependencies/platform-tools/rust/lib'

Go to this directory and remove all items...

---

If seen this error;

Error: Dynamic program error: No default signer found, run "solana-keygen new -o /Users/<username>/.config/solana/id.json" to create a new one

Run this "solana-keygen new ..." command.

---

### Phantom Wallet integration to File
#### For deploy contract

```
solana-keygen verify <PUBKEY> 'prompt://?full-path=m/44/501/0/0'

> write seed phrase (recovery words) and enter button
> blank empty and enter button

See -> Verification for public key: <PUBKEY>: Success


solana-keygen recover 'prompt://?full-path=m/44/501/0/0'

> write seed phrase (recovery words) and enter button
> blank empty and enter button
> Recovered pubkey `"<PUBKEY>"`. Continue? (y/n): y and enter button

See -> Wrote recovered keypair to /Users/<username>/.config/solana/id.json

```

### Faucet
```
solana airdrop 5 <PUBKEY> -u testnet

or

solana airdrop 5 <PUBKEY> -u devnet
```

or visit this website: https://faucet.solana.com/


### Derivation Path

#### The most common derivation paths used are:

```
* BIP 44: m/44'/0'/0' (for 1addresses)
* BIP 49: m/49'/0'/0' (for 3addresses)
* BIP 84: m/84'/0'/0' (for bc1addresses)
```

#### Notation

This ' just saves us having to write the full index numbers for hardened children

```
0 - Normal Child (index 0)
0' - Hardened Child (index 2147483648)
```

#### Wallet Structure

```
For example "m/44/501/0/0/0"

m/purpose'/coin_type'/account'/change/index
m/44      /501       /0       /0     /0
```

For more info [click here](https://learnmeabitcoin.com/technical/derivation-paths)

Good luck :)
