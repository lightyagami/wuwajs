"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseSpecialRewardData = undefined;
const DropPackageById_1 = require("../../../../../Core/Define/ConfigQuery/DropPackageById");
const TrapDefenseDefine_1 = require("../../TrapDefenseDefine");
class TrapDefenseSpecialRewardData {
  constructor() {
    this.Lo = undefined;
    this.Id = 0;
    this.Desc = "";
    this.ItemList = [];
    this.CurrentProgress = 0;
    this.TotalProgress = 0;
    this.State = 2;
  }
  static Create(e) {
    var t = new TrapDefenseSpecialRewardData();
    t.Lo = e;
    t.AU();
    return t;
  }
  UpdateByServerData(e) {
    this.State = TrapDefenseDefine_1.trapDefenseRewardServerState2ClientState[e.Wm1.H6n];
    this.CurrentProgress = e.Wm1.lMs;
    this.TotalProgress = e.Wm1.j6n;
  }
  AU() {
    this.Id = this.Lo.Id;
    this.Desc = this.Lo.Desc;
    this.v9c();
  }
  v9c() {
    this.ItemList = [];
    var e;
    var t;
    var i = DropPackageById_1.configDropPackageById.GetConfig(this.Lo.RewardId);
    if (i) {
      for ([e, t] of i.DropPreview) {
        this.ItemList.push([{
          ItemId: e,
          IncId: 0
        }, t]);
      }
    }
  }
}
exports.TrapDefenseSpecialRewardData = TrapDefenseSpecialRewardData;
//# sourceMappingURL=TrapDefenseSpecialRewardData.js.map