export const adminChartData = [
  { day: "Seg", revenue: 4200, orders: 24 },
  { day: "Ter", revenue: 5900, orders: 31 },
  { day: "Qua", revenue: 4800, orders: 28 },
  { day: "Qui", revenue: 7200, orders: 39 },
  { day: "Sex", revenue: 9100, orders: 46 },
  { day: "Sab", revenue: 12800, orders: 58 },
  { day: "Dom", revenue: 10400, orders: 44 },
];

export const adminOrders = [
  { id: "#JK-1048", customer: "Marina Costa", status: "Pago", total: 639.8, date: "Hoje", channel: "PIX" },
  { id: "#JK-1047", customer: "Bruno Alves", status: "Enviado", total: 319.9, date: "Ontem", channel: "Cartao" },
  { id: "#JK-1046", customer: "Rafaela Nunes", status: "Pendente", total: 249.9, date: "22 maio", channel: "PIX" },
  { id: "#JK-1045", customer: "Caio Lima", status: "Pago", total: 889.7, date: "21 maio", channel: "Cartao" },
  { id: "#JK-1044", customer: "Bianca Torres", status: "Cancelado", total: 179.9, date: "20 maio", channel: "PIX" },
] as const;
