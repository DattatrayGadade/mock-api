const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// ✅ DYNAMIC ENDPOINT
server.all([
    "/api/v1.2/merchants/:merchantKey/tables/:tableNumber/bill",
    "/api/v1.2/order-management/merchants/:merchantKey/tables/:tableNumber/bill",
  ], (req, res) => {
    const { merchantKey, tableNumber } = req.params;

    res.status(200).json({
      "aggregator_code": "",
      "app_type": "SMART_WEB",
      "bill": {
        "grand_total": "5.00",
        "sub_total": "6.00",
        "balance_amount": "1.10",
        "currency": "HKD",
        "payment": null,
        "adjustments": {
          "tax": [
            {
              "tax_amount": "0",
              "tax_name": "No Tax 1",
              "tax_percentage": "0"
            }
          ],
          "service_charges": [],
          "discounts": [],
          "tip_amount": "",
          "rounding_amount": "0.0",
          "total_tax": "0.00",
          "tax_flag": "exclusive",
          "total_discounts": "1",
          "total_service_charges": "0"
        }
      },
      "buzzer_number": "0011",
      "country": "Hong Kong",
      "customer": {
        "name": "Guest Customer",
        "phone": "",
        "email": "support@tabsquare.com",
        "address": "",
        "customer_id": ""
      },
      "delivery_info": null,
      "items": [
        {
          "plu": "Y9901884",
          "sku_name": "Y9901884",
          "item_description": "Y9901884",
          "kp_name": "",
          "is_combo": true,
          "price": "1.00",
          "base_price_with_tax": null,
          "category": "",
          "total_item_price": "6",
          "quantity": 6,
          "remarks": "",
          "discounts": [
            {
              "amount": "1",
              "code": "OGORIYOSHI",
              "name": "ITEM DISCOUNT",
              "percentage": "",
              "quantity": 2
            }
          ],
          "tax": [],
          "customisations": [],
          "is_retail": false
        }
      ],

      // 🔁 DYNAMIC VALUES IN RESPONSE
      "merchant_key": merchantKey,
      "merchant_details": {
        "contact_details": "6.9",
        "gst_number": "6.9",
        "merchant_address": "6.9",
        "merchant_name": `Mock Store ${merchantKey}`
      },

      "order_id": "795644884",
      "order_time": new Date().toISOString(),
      "order_type": "DINE_IN",
      "pax": 3,
      "pickup_info": {
        "pickup_start_time": "",
        "pickup_end_time": ""
      },
      "queue_number": "0011",
      "remarks": "",
      "server_name": "",
      "service_type": "TABLE",
      "session_id": "MockSession",
      "signature": "mock-signature",

      // 🔁 TABLE NUMBER FROM URL
      "table_number": tableNumber,
      "table_open_time": "2022-08-17T09:45:55.000Z"
    });
  }
);

// Optional fallback routes
server.use(router);

const PORT = process.env.PORT || 4250;
server.listen(PORT, () => {
  console.log("Mock API running on port", PORT);
});
