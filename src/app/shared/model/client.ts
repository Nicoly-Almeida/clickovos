export class Client{
    id?: string;
    name?: string;
    email?: string;
    phone_number?: string;
    password?: string;
    city?: string;
    neighborhood?: string;
    number?: number;
    street?: string;
    repeat_password?: string;
  
    constructor(id?: string, client: Client = {}) {
      this.id = id;
      this.name = client.name;
      this.phone_number = client.phone_number
      this.email = client.email;
      this.city = client.city;
      this.neighborhood = client.neighborhood;
      this.number = client.number
      this.street = client.street
      this.password = client.password;
      this.repeat_password = client.repeat_password;
    }
  }