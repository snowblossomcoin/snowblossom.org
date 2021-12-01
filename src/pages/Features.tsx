import '../scss/Features.scss';

function Features() {
    return (
      <div className="features main-page">
        <h1>Sharding</h1>
        <p>For a long time we in the cryptocurrency space have been arguing how to scale.  It basically comes down to, in order to be safe and consistent we need all transactions to go into a block chain that everyone can verify and check.  But if all transactions are going into blocks, doesn’t that mean big blocks very fast?  Doesn’t that at some point make it more work to check and validate that one computer can reasonably do?  The answer is, absolutely.  We need to solve this and there are a bunch of solutions.  For example, with Bitcoin (BTC) the solution is to move small transactions onto a secondary layer (L2) with Lightning.  This is a cool technology but has a lot of downsides.  The Bitcoin Cash (BCH) solution is to for now just make larger blocks and improve the node software to handle larger blocks faster.  This works quite well and is likely to buy us all a lot of time.  However, a complete solution would be to break up the block chain into shards so that no one computer needs to process all the transactions.</p>
        <p>
        Snowblossom has a solution for this, which we call Snowblossom Braid.  It is basically a system where there are somewhat independent blockchains, called shards, that link to each other in a sort of braid.  It starts with a single chain, and as transaction load starts to fill blocks new shards will be created.  Any particular UTXO lives only on a single shard and can only be spent on that chain, but a transaction may send an output to any shard.
        To a user, none of this will matter.  Their client might end up connecting to several nodes to get visibility into the full network state, but the user doesn’t need to care.  A mining pool will need to decide to cover only some shards or have as much computing power as needed to validate and build blocks on all shards, which will allow them to always select the most profitable shard to mine (which will change).
        </p>
        <p>
        The end result is that we can have a very high transactions per second rate with a modest block size.  For more technical details (link to Book of Snowblossom Braid Section)
        </p><p>
        Snowblossom Braid is working right now.  You can observe it on the testnet:<br></br>
        <a href='https://test-b.snowblossom.org/'>
        https://test-b.snowblossom.org/
        </a><br></br>
        <a href='https://test-b.snowblossom.org/static/shard-visual.html'>
        https://test-b.snowblossom.org/static/shard-visual.html
        </a>
        </p><p>
        The visualization shows that blocks on the two shards include blocks from the other shard.
        </p><p>
        A larger test group is on the testshard network:<br></br>
        <a href='https://snow-testshard.1209k.com/'>
        https://snow-testshard.1209k.com/
        </a><br></br><a href='https://snow-testshard.1209k.com/static/shard-visual.html'>
        https://snow-testshard.1209k.com/static/shard-visual.html
        </a>
        </p><p>
        Here you can see the 16 shards each including the header data from other shards as they are made.
        </p><p>
        If you want to run a network yourself to see how it works in more detail, there are some scripts and tools here:<br></br><a href='https://github.com/snowblossomcoin/shard-load-test'>https://github.com/snowblossomcoin/shard-load-test</a>.
        </p>
        <p>
        (todo: insert pretty shard testing images)
        </p>
        <h2>
        Quantum
        </h2>
        <p>
        Honestly, we don’t know if large enough quantum computers to break standard elliptic curve keys will ever be a thing.  It could be just like fusion power, always a decade or so away (<a href='https://xkcd.com/678/'>https://xkcd.com/678/</a>).  But if someone does build a powerful enough quantum computer we need to be ready.  So in Snowblossom we have two main avenues.  One is a key type which we call Q-Hard which should require a much larger quantum computer to break.  This is usable now, although at the cost of seeds don’t work with it so you need to backup your wallet file like it is the year 2010.  The other approach is that Snowblossom has a modular key system that allows for more signing methods to be easily added later.  We are closely watching the progress of the NIST Post Quantum Computing work and will add new signing algorithms as they become recommended.  Then users will have to switch to the new signing algorithms (making a new wallet) and move funds.
        </p><p>
        The roadmap for such an upgrade would be as follows:
        <ul>
        <li>
        NIST recommends a post-quantum algorithm for signing
        </li><li>
        Bouncy Castle cryptography library adds NIST recommended algorithm
        </li><li>
        Snowblossom Upgrades to newer Bouncy Castle library
        </li><li>
        Snowblossom integrates new algorithm with unit tests and such, exposes new algorithm as an option for wallet generation
        </li><li>
        Proposal to adopt and allow new signing algorithm on the network is floated and voted on by the miners.  If adopted, the new signing algorithm will be allowed as a specified future block.
        </li>
        </ul>
        </p><p>
        The overall speed of this process will depend on the urgency.  If Bouncy Castle folks are quick (and they probably will be) we could do this in a week or two.  However, a year is a more likely timeline.
        </p><p>
        <a href='https://wiki.snowblossom.org/index.php/Quantum_Tough'>
        https://wiki.snowblossom.org/index.php/Quantum_Tough
        </a>
        </p>
        <h2>
        UTXO
        </h2>
        <p>
        One of the most important things a cryptocurrency does is track the Unspent Transaction Outputs (UTXOs).  Simply put, the UTXO set is the set of all funds that could be spent and which keys they can be spent by.  Snowblossom uses a database called a Hashed Trie (<a href='https://wiki.snowblossom.org/index.php/Hashed_Trie'>https://wiki.snowblossom.org/index.php/Hashed_Trie</a>) to store the UTXO.  This allows a number of neat features.
        </p>
        <ul>
          <li>
          Ability to easily handle reorgs.  The copy-on-write nature of the hashed trie database means it is trivial to build new blocks on top of older blocks.  This makes block reorgs easy to process without error.
        </li>
        <li>
          Ability to prove completeness of results to light clients.  When a light client that doesn’t have the full block database connects and wants to know what funds it has to spend, it has to ask another node.  Using the Snowblossom UTXO structure the light client can validate that the answer it receives is not only true but also the complete truth (the full node can’t withhold results without that being obvious).  In more technical terms, the full nodes returns the asked for results but also enough of the intermediate UTXO trie nodes such that the light client can validate those nodes and the results with the merkle hash stored in the block header.
        </li>
        </ul>
      </div>
    );
  }
  
  export default Features;