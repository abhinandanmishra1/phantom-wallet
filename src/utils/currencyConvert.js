async function getConversionRates() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,solana&vs_currencies=usd"
  );
  const data = await response.json();

  return {
    ethToUsd: data.ethereum.usd,
    solToUsd: data.solana.usd,
  };
}

export async function convertToUsd({
  eth,
  sol
}) {
  try {
    const rates = await getConversionRates();

    const ethUsdValue = eth * rates.ethToUsd;
    const solUsdValue = sol * rates.solToUsd;
    
    return ethUsdValue + solUsdValue
  } catch (error) {
    console.error("Error fetching conversion rates:", error);
    return null;
  }
}
