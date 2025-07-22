import { Product } from "@/common/types"
import Dexie from 'dexie'


export const DB_NAME = 'ecommerce_db'
export const PRODUCTS_STORE_NAME = 'products_store'
export const FAVORITES_STORE_NAME = 'favorites_store'
export const CART_ITEMS_STORE_NAME = 'cart_items_store'
export const DB_VERSION = 4

export class MyDatabase extends Dexie {
  products_store!: Dexie.Table<Product, string>
  favorites_store!: Dexie.Table<Product, string>
  cart_items_store!: Dexie.Table<{ productId: string; product: Product; quantity: number }, string>

  constructor() {
    super(DB_NAME)
    this.version(DB_VERSION).stores({
      products_store: 'id',
      favorites_store: 'id',
      cart_items_store: 'productId',
    })
    this.products_store = this.table('products_store')
    this.favorites_store = this.table('favorites_store')
    this.cart_items_store = this.table('cart_items_store')
  }
}

const db = new MyDatabase()

export async function getStoreData<T>(storeName: string): Promise<T[]> {
  try {
    const data = await db.table<T, string>(storeName).toArray()
    return data
  } catch (error) {
    return []
  }
}

export async function putStoreData<T>(storeName: string, data: T[]): Promise<void> {
  try {
    const table = db.table<T, string>(storeName)
    await table.clear()

    if (storeName === CART_ITEMS_STORE_NAME) {
      const cartData = data as Array<{ product: Product; quantity: number }>
      const formattedCartData = cartData.map(item => ({
        productId: item.product.id,
        product: item.product,
        quantity: item.quantity
      }))
      await table.bulkAdd(formattedCartData as never[])
    } else {
      await table.bulkAdd(data as never[])
    }

  } catch (error) {
    throw error
  }
}
