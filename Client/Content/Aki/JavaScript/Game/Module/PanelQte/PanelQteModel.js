"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelQteModel = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const TimeUtil_1 = require("../../Common/TimeUtil");
const PanelQteController_1 = require("./PanelQteController");
const PanelQteResultHandler_1 = require("./PanelQteResultHandler");
const PanelQteTimeDilation_1 = require("./PanelQteTimeDilation");
class PanelQteModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.s1t = new PanelQteTimeDilation_1.PanelQteTimeDilation();
    this.IsInQte = undefined;
    this.hJ = undefined;
    this.EOi = -0;
    this.SOi = -0;
    this.yOi = undefined;
    this.nx = undefined;
    this.IOi = undefined;
    this.IsHideAllBattleUi = false;
    this.HideBattleUiChildren = undefined;
    this.DisableFightInput = false;
    this.CurRoleEntity = undefined;
  }
  OnInit() {
    this.IsInQte = false;
    this.hJ = 0;
    this.s1t.Init();
    this.IOi = new PanelQteResultHandler_1.PanelQteResultHandler();
    return true;
  }
  OnLeaveLevel() {
    return !(this.yOi = undefined);
  }
  OnClear() {
    this.IsInQte = undefined;
    this.hJ = undefined;
    this.s1t.Clear();
    return !(this.IOi = undefined);
  }
  StartQte(e) {
    this.hJ++;
    this.IsInQte = true;
    (this.nx = e).QteHandleId = this.hJ;
    this.s1t.Start(e);
    if (e.Config.Duration > 0) {
      this.EOi = e.Config.Duration * TimeUtil_1.TimeUtil.InverseMillisecond;
      if ((e = this.s1t.GetWorldTimeDilation()) !== 0) {
        this.SOi = Time_1.Time.WorldTime + this.EOi * e;
      }
    } else {
      this.EOi = 0;
      this.SOi = 0;
    }
    return this.hJ;
  }
  StopQte(e) {
    return !!this.IsInQte && this.hJ === e && !(this.IsInQte = false, this.s1t.Stop(), 0);
  }
  ForceStopQte() {
    this.StopQte(this.hJ);
  }
  GetContext() {
    return this.nx;
  }
  GetWorldTimeDilation() {
    return this.s1t.GetWorldTimeDilation();
  }
  GetLeftTime() {
    return this.EOi;
  }
  GetLeftTimeNoScale() {
    var e;
    if (!(this.EOi <= 0) && this.IsInQte) {
      if ((e = this.s1t.GetWorldTimeDilation()) === 0) {
        return this.EOi;
      } else {
        return this.EOi / e;
      }
    } else {
      return 0;
    }
  }
  ResetLeftTime(e) {
    if (this.hJ === e) {
      if (this.EOi > 0) {
        if ((e = this.s1t.GetWorldTimeDilation()) !== 0) {
          this.SOi = Time_1.Time.WorldTime + this.EOi * e;
        }
      } else {
        this.SOi = 0;
      }
    }
  }
  UpdateTime(e) {
    if (!(this.EOi <= 0)) {
      if (this.IsInQte && (this.s1t.GetWorldTimeDilation() === 0 ? this.EOi -= e : this.EOi = this.SOi - Time_1.Time.WorldTime, this.EOi <= 0)) {
        PanelQteController_1.PanelQteController.StopQte(this.hJ);
      }
    }
  }
  GetPanelQteConfig(e) {
    this.yOi ||= ResourceSystem_1.ResourceSystem.GetLoadedAsset("/Game/Aki/Data/Fight/UI/DT_PanelQte.DT_PanelQte", UE.DataTable);
    var t = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.yOi, e.toString());
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PanelQte", 17, "找不到界面QTE配置", ["qteId", e]);
      }
    }
    return t;
  }
  SetQteResult(e, t) {
    return this.hJ === e && (this.nx.Success = t, true);
  }
  HandleResult() {
    this.IOi.Handle(this.nx);
  }
  IsQteSuccess() {
    return this.nx?.Success ?? false;
  }
}
exports.PanelQteModel = PanelQteModel;
//# sourceMappingURL=PanelQteModel.js.map