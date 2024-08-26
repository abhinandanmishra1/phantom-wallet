export const splitPublicKey = (publicKey) => {
  if (!publicKey) return { startHalf: "", endHalf: "" };
  
  const startHalf = publicKey.startsWith("0x")
    ? publicKey.substring(0, 6)
    : publicKey.substring(0, 4);
  const endHalf = publicKey.startsWith("0x")
    ? publicKey.substring(6, 10)
    : publicKey.substring(4, 8);

  return {
    startHalf,
    endHalf,
  };
};
