"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchShopTask = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchDailyTaskBase_1 = require("./FloroRanchDailyTaskBase");
class FloroRanchShopTask extends FloroRanchDailyTaskBase_1.FloroRanchDailyTaskBase {
  constructor(a) {
    super();
    this.TAu = undefined;
    this.TAu = a;
  }
  OnExecute() {
    var a = {
      ShopData: this.TAu,
      CloseCallback: () => {
        this.Complete();
      }
    };
    ModelManager_1.ModelManager.FloroRanchGamePlayModel.OpenAndRecordView("FloroRanchShopView", a);
  }
}
exports.FloroRanchShopTask = FloroRanchShopTask;
//# sourceMappingURL=FloroRanchShopTask.js.map