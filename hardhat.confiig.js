// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x" + "0".repeat(64);
const BASESCAN_API_KEY = process.env.BASESCAN_API_KEY || "";

module.exports = {
  solidity: {
    version: "0.8.30",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    base: {
      url: "https://mainnet.base.org",
      chainId: 8453,
      accounts: [PRIVATE_KEY],
      gasPrice: "auto",
    },
    baseSepolia: {
      url: "https://sepolia.base.org",
      chainId: 84532,
      accounts: [PRIVATE_KEY],
      gasPrice: "auto",
    },
  },
  etherscan: {
    apiKey: {
      base: BASESCAN_API_KEY,
      baseSepolia: BASESCAN_API_KEY,
    },
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      },
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org"
        }
      }
    ]
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};

// package.json
/*
{
  "name": "blan-token-v2",
  "version": "2.0.0",
  "description": "Enhanced BLAN token with advanced mining and governance",
  "main": "index.js",
  "scripts": {
    "test": "hardhat test",
    "test:gas": "REPORT_GAS=true hardhat test",
    "coverage": "hardhat coverage",
    "compile": "hardhat compile",
    "deploy:local": "hardhat run scripts/deploy.js --network localhost",
    "deploy:testnet": "hardhat run scripts/deploy.js --network baseSepolia",
    "deploy:mainnet": "hardhat run scripts/deploy.js --network base",
    "verify:testnet": "hardhat verify --network baseSepolia",
    "verify:mainnet": "hardhat verify --network base",
    "interact": "hardhat run scripts/interact.js --network",
    "propose": "hardhat run scripts/propose.js --network",
    "vote": "hardhat run scripts/vote.js --network",
    "monitor": "hardhat run scripts/monitor.js --network",
    "node": "hardhat node",
    "clean": "hardhat clean",
    "flatten": "hardhat flatten"
  },
  "keywords": [
    "ethereum",
    "base",
    "erc20",
    "defi",
    "mining",
    "governance"
  ],
  "author": "",
  "license": "MIT",
  "devDependencies": {
    "@nomicfoundation/hardhat-chai-matchers": "^2.0.0",
    "@nomicfoundation/hardhat-ethers": "^3.0.0",
    "@nomicfoundation/hardhat-network-helpers": "^1.0.0",
    "@nomicfoundation/hardhat-toolbox": "^4.0.0",
    "@nomicfoundation/hardhat-verify": "^2.0.0",
    "@typechain/ethers-v6": "^0.5.0",
    "@typechain/hardhat": "^9.0.0",
    "chai": "^4.3.7",
    "ethers": "^6.4.0",
    "hardhat": "^2.19.0",
    "hardhat-gas-reporter": "^1.0.9",
    "solidity-coverage": "^0.8.5",
    "typechain": "^8.3.0"
  },
  "dependencies": {
    "@openzeppelin/contracts": "^5.0.0",
    "dotenv": "^16.3.1"
  }
}
*/

// .env.example
/*
# Private key for deployment (without 0x prefix)
PRIVATE_KEY=your_private_key_here

# BaseScan API key for contract verification
BASESCAN_API_KEY=your_basescan_api_key

# Liquidity wallet address
LIQUIDITY_WALLET=0x...

# RPC URLs (optional, defaults provided)
BASE_RPC_URL=https://mainnet.base.org
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
*/

// .gitignore
/*
node_modules
.env
coverage
coverage.json
typechain
typechain-types

# Hardhat files
cache
artifacts

# Deployment files
deployments/*.json
!deployments/.gitkeep

# IDE
.idea
.vscode
*.swp
*.swo

# OS
.DS_Store
*/

// Directory structure guide
/*
project-root/
├── contracts/
│   ├── BLANTokenV2.sol
│   ├── BLANGovernance.sol
│   └── interfaces/
├── scripts/
│   ├── deploy.js
│   ├── interact.js
│   ├── propose.js
│   ├── vote.js
│   └── monitor.js
├── test/
│   ├── BLANToken.test.js
│   └── Governance.test.js
├── deployments/
│   └── .gitkeep
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── MiningDashboard.jsx
│   │   └── App.jsx
│   └── package.json
├── hardhat.config.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
*/

// Installation & Setup Commands
/*
# Initialize project
npm init -y
npm install --save-dev hardhat
npx hardhat init

# Install dependencies
npm install --save-dev @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-verify
npm install @openzeppelin/contracts dotenv

# Create directories
mkdir -p contracts scripts test deployments frontend/src/components

# Setup environment
cp .env.example .env
# Edit .env with your keys

# Compile contracts
npm run compile

# Run tests
npm test

# Deploy to testnet
npm run deploy:testnet

# Verify contracts
npm run verify:testnet [CONTRACT_ADDRESS] [CONSTRUCTOR_ARGS]

# Interact with contract
npm run interact baseSepolia

# Start local node
npm run node

# In another terminal, deploy to local
npm run deploy:local
*/

// Additional test script - governance tests
/*
// test/Governance.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("BLANGovernance", function () {
  let blanToken, governance;
  let owner, proposer, voter1, voter2;
  
  beforeEach(async function () {
    [owner, proposer, voter1, voter2] = await ethers.getSigners();
    
    // Deploy token
    const BLANToken = await ethers.getContractFactory("BLANTokenV2");
    blanToken = await BLANToken.deploy(
      owner.address,
      ethers.parseEther("1000")
    );
    
    // Deploy governance
    const BLANGovernance = await ethers.getContractFactory("BLANGovernance");
    governance = await BLANGovernance.deploy(await blanToken.getAddress());
    
    // Distribute tokens
    await blanToken.transfer(proposer.address, ethers.parseEther("20000"));
    await blanToken.transfer(voter1.address, ethers.parseEther("300000"));
    await blanToken.transfer(voter2.address, ethers.parseEther("200000"));
  });
  
  describe("Proposal Creation", function () {
    it("Should create difficulty change proposal", async function () {
      const newDiff = ethers.parseEther("1100");
      const desc = "Adjust difficulty";
      
      const tx = await governance.connect(proposer).proposeDifficultyChange(
        newDiff,
        desc
      );
      
      await expect(tx).to.emit(governance, "ProposalCreated");
      
      const proposal = await governance.getProposal(0);
      expect(proposal.proposer).to.equal(proposer.address);
      expect(proposal.description).to.equal(desc);
    });
    
    it("Should reject proposal below threshold", async function () {
      await expect(
        governance.connect(voter2).proposeDifficultyChange(
          ethers.parseEther("1100"),
          "Test"
        )
      ).to.be.revertedWith("Below proposal threshold");
    });
  });
  
  describe("Voting", function () {
    beforeEach(async function () {
      await governance.connect(proposer).proposeDifficultyChange(
        ethers.parseEther("1100"),
        "Test proposal"
      );
      
      await time.increase(1 * 24 * 60 * 60 + 1); // Skip voting delay
    });
    
    it("Should cast vote successfully", async function () {
      await governance.connect(voter1).castVote(0, 1); // Vote FOR
      
      const vote = await governance.getVote(0, voter1.address);
      expect(vote.hasVoted).to.be.true;
      expect(vote.support).to.equal(1);
    });
    
    it("Should prevent double voting", async function () {
      await governance.connect(voter1).castVote(0, 1);
      
      await expect(
        governance.connect(voter1).castVote(0, 1)
      ).to.be.revertedWith("Already voted");
    });
    
    it("Should reach quorum and succeed", async function () {
      await governance.connect(voter1).castVote(0, 1); // FOR
      
      await time.increase(7 * 24 * 60 * 60 + 1); // Skip voting period
      
      await governance.finalizeProposal(0);
      
      const proposal = await governance.getProposal(0);
      expect(proposal.status).to.equal(2); // Succeeded
    });
  });
  
  describe("Execution", function () {
    beforeEach(async function () {
      // Transfer ownership to governance
      await blanToken.transferOwnership(await governance.getAddress());
      
      // Create and pass proposal
      await governance.connect(proposer).proposeDifficultyChange(
        ethers.parseEther("1100"),
        "Test"
      );
      
      await time.increase(1 * 24 * 60 * 60 + 1);
      await governance.connect(voter1).castVote(0, 1);
      await time.increase(7 * 24 * 60 * 60 + 1);
      await governance.finalizeProposal(0);
    });
    
    it("Should execute successful proposal", async function () {
      await time.increase(2 * 24 * 60 * 60 + 1); // Execution delay
      
      await governance.executeProposal(0);
      
      const proposal = await governance.getProposal(0);
      expect(proposal.executed).to.be.true;
    });
    
    it("Should reject execution before delay", async function () {
      await expect(
        governance.executeProposal(0)
      ).to.be.revertedWith("Execution delay not met");
    });
  });
});
*/