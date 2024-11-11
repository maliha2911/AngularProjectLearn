import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgForOf } from "@angular/common";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Product[] = [];
  product: Product = { id: 0, name: '', price: 0, description: '' };
  isEditing: boolean = false;
  filter: string = ''; // Filter criteria for name or description
  minPrice: number | null = null; // Min price filter
  maxPrice: number | null = null; // Max price filter
  sortBy: keyof Product = 'name'; // Default sorting key


  saveProduct() {
    if (this.isEditing) {
      const index = this.products.findIndex(p => p.id === this.product.id);
      if (index !== -1) {
        this.products[index] = { ...this.product };
      }
    } else {
      this.product.id = new Date().getTime();
      this.products.push({ ...this.product });
    }
    this.resetForm();
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.isEditing = true;
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.products = this.products.filter(p => p.id !== id);
    }
  }

  resetForm() {
    this.product = { id: 0, name: '', price: 0, description: '' };
    this.isEditing = false;
  }

  get filteredProducts() {
    return this.products.filter(product => {
      const matchesName = product.name.toLowerCase().includes(this.filter.toLowerCase());
      const matchesDescription = product.description.toLowerCase().includes(this.filter.toLowerCase());
      const matchesPrice = (this.minPrice === null || product.price >= this.minPrice) &&
                           (this.maxPrice === null || product.price <= this.maxPrice);

      return (matchesName || matchesDescription) && matchesPrice;
    });
  }

  sortProducts() {
    this.products.sort((a, b) => {
      if (a[this.sortBy] < b[this.sortBy]) {
        return -1;
      } else if (a[this.sortBy] > b[this.sortBy]) {
        return 1;
      }
      return 0;
    });
  }

}
