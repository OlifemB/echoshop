'use client'

import { Input, Select } from 'antd'
import { useState } from 'react'
import {ProductCard} from "@/components/product/ProductCard";
import {mockProducts} from "@/mock/products";

export default function HomePage() {
  const [search, setSearch] = useState('')
  const filtered = mockProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-4 space-y-4">
      <Input.Search placeholder="Поиск товаров" onChange={e => setSearch(e.target.value)} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}