export const formatPhone = (value) => {
  let digits = value.replace(/\D/g, "");

  if (!digits.startsWith("380")) {
    if (digits.startsWith("0")) digits = "380" + digits.slice(1);
    else digits = "380" + digits;
  }

  // Limit max digits
  digits = digits.slice(0, 12);

  // Apply spacing: +380 XX XXX XXXX
  const country = digits.slice(0, 3); // 380
  const op = digits.slice(3, 5);
  const block1 = digits.slice(5, 8);
  const block2 = digits.slice(8, 12);

  let formatted = `+${country}`;
  if (op) formatted += ` ${op}`;
  if (block1) formatted += ` ${block1}`;
  if (block2) formatted += ` ${block2}`;

  return formatted;
};
