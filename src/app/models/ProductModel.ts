export class ProductModel {
  id!: string;
  ProductName!: string;
  ProductIMG1!: string;
  ProductIMG2!: string;
  ProductIMG3!: string;
  ProductIMG4!: string;
  ProductDescription!: string;
  ProductAdress!: string;
  ProductLocation!: string;
  ProductSellerName!: string;
  ProductSellerCellPhone!: string;
  ProductPrice!: string;
  TypeId!: number;
  Clicks: number = 0;
  regDate!: string;
  editDate!: string;
  IsActive!: string;
  IsDiscount!: string;
  DiscountPrice!: string;
}
