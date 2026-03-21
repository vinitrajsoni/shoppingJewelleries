export const fmt = n => "₹" + Number(n).toLocaleString("en-IN");

export const metalColor = m => ({
  gold:"#C9A84C",
  silver:"#A0A8B0",
  artificial:"#B07CC6"
}[m]);

export const metalLabel = m => ({
  gold:"Gold",
  silver:"Silver",
  artificial:"Artificial"
}[m]);