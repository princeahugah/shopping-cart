import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '../index';
import { CartItemState } from '../../services/interfaces/CartItemState';
import { IError } from '../../services/interfaces/Error';
import { ProductState } from '../../services/interfaces/ProductState';

@Module({ name: 'cart', store, dynamic: true })
class Cart extends VuexModule implements CartItemState {
  public error: IError | null = null;
  public productId = '';
  public productTitle = '';
  public price = 0;
  public currency = '';
  public quantity = 0;
  public cartItems: CartItemState[] = [];

  get totalCartQuantity(): number {
    return this.cartItems.reduce((acc, item) => {
      acc += item.quantity;
      return acc;
    }, 0);
  }

  get totalCartAmount(): number {
    const value = this.cartItems.reduce((acc, item) => {
      acc += item.quantity * item.price;
      return acc;
    }, 0);
    return parseFloat(Number(value).toFixed(2));
  }

  get cartItemCurrency(): string {
    return this.cartItems[0]?.currency ?? '$';
  }

  get hasProducts(): boolean {
    return this.cartItems.length > 0;
  }

  @Mutation
  private SET_ERROR(error: IError | null): void {
    this.error = error;
  }

  @Mutation
  private PUSH_PRODUCT_TO_CART(product: ProductState): void {
    this.cartItems.push({
      productId: product.id,
      productTitle: product.title,
      price: product.price,
      currency: product.currency,
      quantity: 1
    });
  }

  @Mutation
  private REMOVE_PRODUCT_FROM_CART(cartItemIndex: number): void {
    this.cartItems.splice(cartItemIndex, 1);
  }

  @Mutation
  private INCREASE_PRODUCT_QUANTITY(cartItem: CartItemState): void {
    cartItem.quantity += 1;
  }

  @Mutation
  private DECREASE_PRODUCT_QUANTITY(cartItem: CartItemState): void {
    cartItem.quantity -= 1;
  }

  @Mutation
  private CLEAR_CART(): void {
    this.cartItems = [];
  }

  @Action
  public AddProductToCart(product: ProductState): void {
    const cartItem = this.cartItems.find((item) => item.productId === product.id);
    if (cartItem) {
      this.INCREASE_PRODUCT_QUANTITY(cartItem);
    } else {
      this.PUSH_PRODUCT_TO_CART(product);
    }
  }

  @Action
  public IncreaseProductQuantity(productId: string): void {
    const cartItem = this.cartItems.find((item) => item.productId === productId);
    if (cartItem) {
      this.INCREASE_PRODUCT_QUANTITY(cartItem);
    }
  }

  @Action
  public DecreaseProductQuantity(productId: string): void {
    const cartItemIndex = this.cartItems.findIndex((item) => item.productId === productId);
    if (cartItemIndex >= 0) {
      if (this.cartItems[cartItemIndex].quantity > 1) {
        this.DECREASE_PRODUCT_QUANTITY(this.cartItems[cartItemIndex]);
      } else if (this.cartItems[cartItemIndex].quantity === 1) {
        this.REMOVE_PRODUCT_FROM_CART(cartItemIndex);
      }
    }
  }

  @Action
  public RemoveAllCartItems(): void {
    this.CLEAR_CART();
  }

  @Action({ commit: 'SET_ERROR' })
  public ClearError() {
    this.SET_ERROR(null);
  }
}

export const CartModule = getModule(Cart);
