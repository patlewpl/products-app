import { createI18n } from "vue-i18n";

const messages = {
  EN: {
    welcome: "Welcome!",
    about: "This is website for manage your products.",
    about2: "Please login if you want to continue.",
    advantages: "See our advantages below:",
    advantage1: "Fast updating data",
    advantage2: "1000+ Customers",
    advantage3: "Help 24/7",
    footer_text: "If you want test our app, feel free to",
    contact_us: "Contact Us",
    confirm: "Confirm",
    close: "Close",
    edit: "Edit",
    delete: "Delete",
    add_product: "Add product",
    product_list: "Product List",
    all_products: "products",
    products: "Products",
    login: "Login",
    logout: "Logout",
    update: "Update",
    add: "Add",
    product_name: "Product Name",
    product_price: "Price",
    product_description: "Description",
    product_category: "Category",
    product_image: "Image",
    email: "Email",
    password: "Password",
    invalid_login: "Invalid email or password!",
  },
  PL: {
    welcome: "Cześć!",
    about: "Znajdujesz się na stronie do zarządzania produktami.",
    about2: "Zaloguj się, aby przejść dalej.",
    advantages: "Poznaj nasze zalety:",
    advantage1: "Szybka wymiana danych",
    advantage2: "1000+ Klientów",
    advantage3: "Pomoc 24/7",
    footer_text: "Jeśli chcesz wersję testową aplikacji, przejdź do ",
    contact_us: "Kontakt",
    confirm: "Potwierdź",
    close: "Zamknij",
    edit: "Edytuj",
    delete: "Usuń",
    add_product: "Dodaj produkt",
    product_list: "Lista produktów",
    all_products: "wszystkich produktów",
    products: "Produkty",
    login: "Zaloguj się",
    logout: "Wyloguj",
    update: "Edycja",
    add: "Dodaj",
    product_name: "Nazwa produktu",
    product_price: "Cena",
    product_description: "Opis",
    product_category: "Kategoria",
    product_image: "Zdjęcie",
    email: "E-mail",
    password: "Hasło",
    invalid_login: "Nieprawidłowy email lub hasło!",
  },
};

const i18n = createI18n({
  legacy: false,
  locale: "EN",
  fallbackLocale: "PL",
  messages,
});

export default i18n;
