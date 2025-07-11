"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueOpRoleBuffBondLinkId = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const MapRogueOp_1 = require("./MapRogueOp");
class MapRogueOpRoleBuffBondLinkId extends MapRogueOp_1.MapRogueOp {
  constructor() {
    super(...arguments);
    this.UpdateViewFunc = undefined;
    this.StepSize = 2;
    this.MaxSelectCount = 0;
    this.CurrentSelectCount = 0;
    this.Priority = 0;
    this.Ujt = false;
    this.zHc = undefined;
  }
  ToString() {
    return `[RoleBuff] IncId:${this.IncId} Type:${this.Data.LE1?.QEc?.hIc} Cur:${this.CurrentSelectCount} Max:${this.MaxSelectCount} Lock:${this.Ujt}`;
  }
  OnUpdate() {
    this.UpdateViewFunc?.();
    this.Ujt = false;
  }
  OnStartExecute(e) {
    if (this.Data.LE1.QEc) {
      this.JHc("RogueBattleRoleBuffSelectView");
    }
  }
  GetGainDataList() {
    return this.Data.LE1?.QEc?.fIc ?? [];
  }
  OnExecute(e) {
    if (this.CurrentStep === 1) {
      var i = this.Data.LE1.Al1;
      var s = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(i.zm1);
      var o = i.Zm1 - i.Jm1;
      let t = false;
      for (const r of s.BondIds) {
        let e = i.Pl1.find(e => e.v9n === r);
        e = e || ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(r);
        if (ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondPreviewDataById(e.v9n, o, e.F6n, e.Whc).F6n !== e.F6n) {
          t = true;
          break;
        }
      }
      if (t) {
        this.JHc("RogueBattleRoleStarUpView");
      } else {
        this.Execute(e);
      }
    } else if (this.CurrentStep === 2) {
      if (this.Data.LE1.On1.length === 0) {
        this.Execute(e);
      } else {
        this.JHc("RogueBattleLinkUnlockView");
      }
    } else if (this.CurrentStep === 3) {
      this.ExecuteOp(e => {
        if (!e) {
          this.Ujt = false;
        }
      });
    }
  }
  JHc(t) {
    UiManager_1.UiManager.OpenView(t, this.IncId, e => {
      this.ZHc();
      if (e) {
        this.zHc = t;
      }
    });
  }
  ZHc() {
    if (this.zHc) {
      if (UiManager_1.UiManager.IsViewOpen(this.zHc) || UiManager_1.UiManager.IsViewHide(this.zHc)) {
        UiManager_1.UiManager.CloseView(this.zHc);
      }
      this.zHc = undefined;
    }
  }
  Select(e) {
    if (!this.Ujt) {
      this.Ujt = true;
      this.OpExecuteClientId = e;
    }
  }
  OnFinish(e) {}
  OnDelete(e) {
    this.ZHc();
  }
  OnBeforeStartExecuteCheck(e) {
    for (const t of ModelManager_1.ModelManager.MapRogueModel.GetOpDataByType(Protocol_1.Aki.Protocol.OEc.Proto_RollBuffBondLinkId)) {
      if (t.IsStartExecute) {
        return false;
      }
    }
    return true;
  }
}
exports.MapRogueOpRoleBuffBondLinkId = MapRogueOpRoleBuffBondLinkId;
//# sourceMappingURL=MapRogueOpRoleBuffBondLinkId.js.map