export class Stock {
  id: number;
  src: string;
  title: string;
  text: string;
  description: string;
  about: string;
  advantages: string[];
  contacts: {
      phone: string;
      website: string;
      hours: string;
  };
  headerStyle: string;
  toastStyle: string;
}