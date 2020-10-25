import { ArrayClassUnique } from "@src/validation/ArrayClassUnique";
import { IsNanoid } from "@src/validation/IsNanoid";
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Max,
  ValidateNested,
} from "class-validator";

export class CartItem {
  @IsString()
  @IsNotEmpty()
  public itemId!: string;

  @IsPositive()
  @IsInt()
  @Max(100)
  public amount!: number;

  constructor(data: CartItem) {
    Object.assign(this, data);
  }
}

export class Cart {
  @IsNanoid()
  public userId!: string;

  @ValidateNested({ each: true })
  @IsArray()
  @ArrayClassUnique(CartItem, (i) => i.itemId)
  public items!: CartItem[];

  constructor({ userId, items }: Cart) {
    this.userId = userId;
    items = Array.isArray(items) ? items : [items];
    this.items = items.map((i) =>
      i instanceof CartItem ? i : i && new CartItem(i),
    );
  }
}

export interface Order {
  _id: string;
  userId: string;
  address: string;
  items: (CartItem & {
    name: string;
    itemCostInUSD: number;
  })[];
  costInUSD: number;
  dateCreated: Date;
}
