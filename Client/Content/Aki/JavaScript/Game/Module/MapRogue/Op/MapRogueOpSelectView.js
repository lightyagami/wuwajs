"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueOpSelectView = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const UiManager_1 = require("../../../Ui/UiManager");
const MapRogueOp_1 = require("./MapRogueOp");
class MapRogueOpSelectView extends MapRogueOp_1.MapRogueOp {
  constructor() {
    super(...arguments);
    this.CloseViewFunc = undefined;
    this.UpdateViewFunc = undefined;
    this.StepSize = 1;
    this.MaxSelectCount = 0;
    this.CurrentSelectCount = 0;
    this.CanGiveUp = false;
    this.Ujt = false;
  }
  get IsMax() {
    return this.CurrentSelectCount >= this.MaxSelectCount;
  }
  ToString() {
    return `[SelectView] IncId:${this.IncId} Type:${this.Data.GEc?.QEc?.hIc} Cur:${this.CurrentSelectCount} Max:${this.MaxSelectCount} Lock:${this.Ujt}`;
  }
  OnUpdate() {
    var e = this.Data.GEc.QEc;
    this.MaxSelectCount = e.po1;
    this.CurrentSelectCount = e.vo1;
    this.CanGiveUp = e.lkc;
    this.UpdateViewFunc?.();
    this.Ujt = false;
  }
  GetGainDataList() {
    return this.Data.GEc?.QEc?.fIc ?? [];
  }
  Select(e) {
    if (!this.Ujt) {
      this.Ujt = true;
      this.OpExecuteClientId = e;
      this.ExecuteOp(e => {
        if (!e) {
          this.Ujt = false;
        }
      });
    }
  }
  SelectAll(e) {
    if (!this.Ujt) {
      this.Ujt = true;
      this.ExecuteOpMultiSelect(e, e => {
        if (!e) {
          this.Ujt = false;
        }
      });
    }
  }
  OnStartExecute(e) {
    var t = this.Data.GEc.QEc;
    if (t) {
      switch (t.hIc) {
        case Protocol_1.Aki.Protocol.hIc.Proto_Complex:
          UiManager_1.UiManager.OpenView("MapRogueRewardView", this.IncId);
          break;
        case Protocol_1.Aki.Protocol.hIc.RUs:
          UiManager_1.UiManager.OpenView("RogueBattleBuyRoleView", this.IncId);
          break;
        case Protocol_1.Aki.Protocol.hIc.Proto_RoleBuff:
          UiManager_1.UiManager.OpenView("RogueBattleRoleBuffSelectView", this.IncId);
          break;
        case Protocol_1.Aki.Protocol.hIc.$9n:
          UiManager_1.UiManager.OpenView("RogueBattleSelectTokenView", this.IncId);
      }
    }
  }
  OnExecute(e) {}
  OnFinish(e) {}
  OnDelete(e) {
    this.CloseViewFunc?.();
  }
}
exports.MapRogueOpSelectView = MapRogueOpSelectView;
//# sourceMappingURL=MapRogueOpSelectView.js.map