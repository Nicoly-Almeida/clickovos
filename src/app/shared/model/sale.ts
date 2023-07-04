export class Sale{
    id?: string;
    address?: {
        city?: string
        street?: string
        neighborhood?: string
        number?: number
    };
    client?: {
        name?: string
        email?: string
        phone?: string
    };
    items?:{
        quantity?: number
        name?: string
        value?: number
    }
  
    constructor(id?: string, sale: Sale = {}) {
        this.id = id;
        this.address = {
          city: sale.address?.city,
          street: sale.address?.street,
          neighborhood: sale.address?.neighborhood,
          number: sale.address?.number,
        };
        this.client = {
          name: sale.client?.name,
          email: sale.client?.email,
          phone: sale.client?.phone,
        };
        this.items = {
          quantity: sale.items?.quantity,
          name: sale.items?.name,
          value: sale.items?.value,
        };
    }
}
    