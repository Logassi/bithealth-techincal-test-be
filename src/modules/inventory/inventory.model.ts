export interface Inventory {
  id: number;
  goods_name: string;
  goods_quantity: number;
  // price: number;
  created_at: Date;
  updated_at: Date;
  created_by: number; // User ID
}

export interface InventoryLogs {
  id: number;
  goods_id: number; // Inventory ID
  user_id: number; // User ID
  action: "incoming" | "outgoing";
  quantity_changed: number;
  created_at: Date;
}
