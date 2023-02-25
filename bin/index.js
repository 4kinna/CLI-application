#!/usr/bin/env node

import { parse } from "csv";
import { createReadStream } from "fs";

const listOfCarOrders = createReadStream("./car_orders.csv");

//Amount of orders per company,in descending order.

if (process.argv[2] === "--by_company") {
  const carList = [];

  listOfCarOrders
    .pipe(parse({ delimiter: ";", from_line: 2 }))
    .on("data", function (row) {
      carList.push({
        company_id: parseInt(row[0]),
        region: row[1],
        aoumnt_of_orders: 0,
      });
    })
    .on("end", function () {
      const mergedCarList = [];

      carList.forEach((item) => {
        if (
          !mergedCarList.some((val, index) => {
            if (val.company_id == item.company_id) {
              mergedCarList[index].aoumnt_of_orders++;
            }
            return val.company_id == item.company_id;
          })
        ) {
          mergedCarList.push(item);
        }
      });

      console.log(
        mergedCarList.sort(
          (r1, r2) => r2.aoumnt_of_orders - r1.aoumnt_of_orders
        )
      );
    })
    .on("error", function (error) {
      console.log(error.message);
    });
}

// Amount of orders per brand, in descending order.

if (process.argv[2] === "--by_brand") {
  const carList = [];

  listOfCarOrders
    .pipe(parse({ delimiter: ";", from_line: 2 }))
    .on("data", function (row) {
      carList.push({
        car: row[2],
        aoumnt_of_orders: 0,
      });
    })
    .on("end", function () {
      const mergedCarList = [];

      carList.forEach((item) => {
        if (
          !mergedCarList.some((val, index) => {
            if (val.car == item.car) {
              mergedCarList[index].aoumnt_of_orders++;
            }
            return val.car == item.car;
          })
        ) {
          mergedCarList.push(item);
        }
      });

      console.log(
        mergedCarList.sort(
          (r1, r2) => r2.aoumnt_of_orders - r1.aoumnt_of_orders
        )
      );
    })
    .on("error", function (error) {
      console.log(error.message);
    });
}

//Populäraste bilmärket per företag sorterat efter företag
//Not completed
