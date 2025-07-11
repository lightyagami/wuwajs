"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonItemSimpleGridExFinish = undefined;
const UE = require("ue");
const CommonItemSimpleGrid_1 = require("./CommonItemSimpleGrid");
class CommonItemSimpleGridExFinish extends CommonItemSimpleGrid_1.CommonItemSimpleGrid {
  constructor(e) {
    super();
    if (e) {
      this.CreateThenShowByActor(e);
    }
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([5, UE.UIItem]);
  }
  SetReceived(e) {
    this.GetItem(5).SetUIActive(e);
  }
}
exports.CommonItemSimpleGridExFinish = CommonItemSimpleGridExFinish;
//# sourceMappingURL=CommonItemSimpleGridExFinish.js.map