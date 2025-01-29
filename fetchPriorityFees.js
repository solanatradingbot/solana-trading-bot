const axios = require("axios");

(async () => {
  try {
    const SOLANA_PRIORITY_FEE_API = process.env.SOLANA_PRIORITY_FEE_API || "https://lingering-spring-reel.solana-mainnet.quiknode.pro/54d3be0593edda91ced37946a5a0c6aa51242d22/";

    const response = await axios.post(SOLANA_PRIORITY_FEE_API, {
      method: "qn_estimatePriorityFees",
      params: [{ last_n_blocks: 100, api_version: 2 }],
      id: 1,
      jsonrpc: "2.0",
    });

    console.log("Priority Fee Estimates:", response.data.result);
  } catch (error) {
    console.error("Error fetching priority fees:", error);
  }
})();
