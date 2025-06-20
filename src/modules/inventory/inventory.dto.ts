interface AddGoodsDto {
  goods_name: string;
  goods_quantity: number;
}

interface UpdateGoodsDto {
  goods_name?: string;
  goods_quantity?: number;
  action: "incoming" | "outgoing";
}

interface GetAllGoodsDto {
  page?: number;
  limit?: number;
  search?: string;
}
