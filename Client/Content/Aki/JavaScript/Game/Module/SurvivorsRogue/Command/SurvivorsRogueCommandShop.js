"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCommandShop = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SurvivorsRogueCommandBase_1 = require("./SurvivorsRogueCommandBase");
class SurvivorsRogueCommandShop extends SurvivorsRogueCommandBase_1.SurvivorsRogueCommandBase {
  constructor() {
    super(...arguments);
    this.StepSize = 1;
  }
  ToString() {
    return `[Shop] Count: ${this.lbd().IEd.length} RefreshCost: ${this.lbd().fm1}`;
  }
  lbd() {
    return this.Data.vEd.MEd;
  }
  Back2Fore() {
    if (!this.ViewProxy) {
      this.OpenView("SurvivorsRogueShopView", false);
    }
  }
  Fore2Back() {}
  OnStartExecute() {
    this.OpenView("SurvivorsRogueShopView", false);
  }
  OnExecute() {}
  OnFinish() {
    this.RequestCommand([Protocol_1.Aki.Protocol.wEd.Proto_GiveUp]);
  }
  OnDelete() {}
  RequestLock(e, r, o) {
    if (this.InForeground) {
      ControllerHolder_1.ControllerHolder.SurvivorsRogueController.RequestDataLock(this.IncId, e, r, e => {
        o?.(e);
        if (e) {
          if (r) {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SurvivorsCard_LockTips");
          } else {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SurvivorsCard_UnLockTips");
          }
        }
      });
    }
  }
  GetViewInfo() {
    var e = this.lbd();
    return {
      DataList: e.IEd,
      RefreshItemId: e.mm1,
      RefreshCost: e.fm1
    };
  }
  IsShopPurchaseAvailable() {
    var e = ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.GetCurrencyCount();
    for (const r of this.lbd().IEd) {
      if (!r.O2s && r.qN_ <= e) {
        return true;
      }
    }
    return false;
  }
}
exports.SurvivorsRogueCommandShop = SurvivorsRogueCommandShop;
//# sourceMappingURL=SurvivorsRogueCommandShop.js.map