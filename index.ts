import 'dotenv/config';
import { payToStripeConnect } from "#config/cron/paytoStripeConnect.js";
import { payoutStripeToDelivery } from "#config/cron/payoutStripeToDelivery.js";
import server from "./src/app.js";

const port = "3000";

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

payToStripeConnect();
payoutStripeToDelivery();