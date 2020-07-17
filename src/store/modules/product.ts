import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '../index';
import { ProductState } from '../../services/interfaces/ProductState';
import { IError } from '../../services/interfaces/Error';
import { productsCollection } from '../../services/firebase';

@Module({ name: 'product', store, dynamic: true })
class Product extends VuexModule implements ProductState {
  public error: IError | null = null;
  public id = '';
  public title = '';
  public description = '';
  public price = 0;
  public currency = '';
  public imageUrl = '';
  public tag = '';
  public founded = '';
  public products: ProductState[] = [];

  get hasProduct(): boolean {
    return !!this.id;
  }

  @Mutation
  private SET_ERROR(error: IError | null): void {
    this.error = error;
  }

  @Mutation
  private SET_PRODUCTS(products: ProductState[] | undefined): void {
    this.products = products || [];
  }

  @Mutation
  private SET_PRODUCT(product: ProductState | undefined): void {
    if (product) {
      this.id = product.id;
      this.title = product.title;
      this.description = product.description;
      this.price = product.price;
      this.currency = product.currency;
      this.imageUrl = product.imageUrl || '';
      this.tag = product.tag || '';
      this.founded = product.founded || '';
    }
  }

  @Action
  public GetProducts(): void {
    productsCollection
      .get()
      .then((productsSnapshot) => productsSnapshot.docs)
      .then((docs) => {
        const products = docs.map((doc) => Object.assign({}, { id: doc.id }, doc.data())) as ProductState[];
        this.SET_PRODUCTS(products);
      })
      .catch((error: IError) => {
        this.SET_ERROR(error);
      });
  }

  @Action
  public GetProductById(id: string): void {
    productsCollection
      .doc(id)
      .get()
      .then((doc) => {
        const product = Object.assign({}, { id: doc.id }, doc.data()) as ProductState;
        this.SET_PRODUCT(product);
      })
      .catch((error: IError) => {
        this.SET_ERROR(error);
      });
  }

  @Action({ commit: 'SET_PRODUCT' })
  public ResetProduct() {
    return {
      id: '',
      title: '',
      description: '',
      currency: '',
      price: ''
    };
  }

  @Action({ commit: 'SET_ERROR' })
  public ClearError() {
    this.SET_ERROR(null);
  }
}

export const ProductModule = getModule(Product);
