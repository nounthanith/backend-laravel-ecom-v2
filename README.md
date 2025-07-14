## Dir Structure

```
Directory structure:
└── nounthanith-laravel-ecom-v2/
    ├── README.md
    ├── artisan
    ├── composer.json
    ├── composer.lock
    ├── package.json
    ├── phpunit.xml
    ├── vite.config.js
    ├── .editorconfig
    ├── .env.example
    ├── app/
    │   ├── Http/
    │   │   └── Controllers/
    │   │       ├── AddressController.php
    │   │       ├── AuthController.php
    │   │       ├── CartController.php
    │   │       ├── CartItemController.php
    │   │       ├── CategoryController.php
    │   │       ├── Controller.php
    │   │       ├── OrderController.php
    │   │       ├── OrderItemController.php
    │   │       └── ProductController.php
    │   ├── Models/
    │   │   ├── Address.php
    │   │   ├── Cart.php
    │   │   ├── CartItem.php
    │   │   ├── Category.php
    │   │   ├── Order.php
    │   │   ├── OrderItem.php
    │   │   ├── Product.php
    │   │   └── User.php
    │   └── Providers/
    │       └── AppServiceProvider.php
    ├── bootstrap/
    │   ├── app.php
    │   ├── providers.php
    │   └── cache/
    │       └── .gitignore
    ├── config/
    │   ├── app.php
    │   ├── auth.php
    │   ├── cache.php
    │   ├── database.php
    │   ├── filesystems.php
    │   ├── logging.php
    │   ├── mail.php
    │   ├── queue.php
    │   ├── sanctum.php
    │   ├── services.php
    │   └── session.php
    ├── database/
    │   ├── .gitignore
    │   ├── factories/
    │   │   ├── AddressFactory.php
    │   │   ├── CardFactory.php
    │   │   ├── CardItemFactory.php
    │   │   ├── CartFactory.php
    │   │   ├── CartItemFactory.php
    │   │   ├── CategoryFactory.php
    │   │   ├── OrderFactory.php
    │   │   ├── OrderItemFactory.php
    │   │   ├── ProductFactory.php
    │   │   └── UserFactory.php
    │   ├── migrations/
    │   │   ├── 0001_01_01_000000_create_users_table.php
    │   │   ├── 0001_01_01_000001_create_cache_table.php
    │   │   ├── 0001_01_01_000002_create_jobs_table.php
    │   │   ├── 2025_06_30_142126_create_personal_access_tokens_table.php
    │   │   ├── 2025_07_01_142049_create_categories_table.php
    │   │   ├── 2025_07_01_142131_create_products_table.php
    │   │   ├── 2025_07_07_141133_create_addresses_table.php
    │   │   ├── 2025_07_07_143337_create_orders_table.php
    │   │   ├── 2025_07_07_143342_create_order_items_table.php
    │   │   ├── 2025_07_09_020659_create_carts_table.php
    │   │   └── 2025_07_09_020747_create_cart_items_table.php
    │   └── seeders/
    │       ├── AddressSeeder.php
    │       ├── CardItemSeeder.php
    │       ├── CartItemSeeder.php
    │       ├── CartSeeder.php
    │       ├── DatabaseSeeder.php
    │       ├── OrderItemSeeder.php
    │       ├── OrderSeeder.php
    │       └── ProductSeeder.php
    ├── public/
    │   ├── index.php
    │   ├── robots.txt
    │   └── .htaccess
    ├── resources/
    │   ├── css/
    │   │   └── app.css
    │   ├── js/
    │   │   ├── app.js
    │   │   └── bootstrap.js
    │   └── views/
    │       └── welcome.blade.php
    ├── routes/
    │   ├── api.php
    │   ├── console.php
    │   └── web.php
    ├── storage/
    │   ├── app/
    │   │   ├── .gitignore
    │   │   ├── private/
    │   │   │   └── .gitignore
    │   │   └── public/
    │   │       └── .gitignore
    │   ├── framework/
    │   │   ├── .gitignore
    │   │   ├── cache/
    │   │   │   ├── .gitignore
    │   │   │   └── data/
    │   │   │       └── .gitignore
    │   │   ├── sessions/
    │   │   │   └── .gitignore
    │   │   ├── testing/
    │   │   │   └── .gitignore
    │   │   └── views/
    │   │       └── .gitignore
    │   └── logs/
    │       └── .gitignore
    └── tests/
        ├── TestCase.php
        ├── Feature/
        │   └── ExampleTest.php
        └── Unit/
            └── ExampleTest.php

```