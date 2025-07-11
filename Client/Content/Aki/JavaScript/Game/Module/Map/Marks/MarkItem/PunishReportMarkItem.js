"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PunishReportMarkItem = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MapLogger_1 = require("../../Misc/MapLogger");
const PunishReportMarkItemView_1 = require("../MarkItemView/PunishReportMarkItemView");
const ConfigMarkItem_1 = require("./ConfigMarkItem");
class PunishReportMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, t, r, i, n, s = 1) {
    super(e, t, r, i, n, s);
    this.nlh = undefined;
    this.bir = () => {
      this.nlh = this.GetPunishReportTarget();
      this.yn_();
    };
  }
  GetMarkItemViewType() {
    return 19;
  }
  CreateView() {
    return new PunishReportMarkItemView_1.PunishReportMarkItemView(this);
  }
  OnInitialize() {
    super.OnInitialize();
    this.yn_();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnReceivePlayerVar, this.bir);
  }
  OnDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnReceivePlayerVar, this.bir);
    super.OnDestroy();
  }
  GetPunishMarkState() {
    this.nlh ||= this.GetPunishReportTarget();
    let e = 1;
    for (const t of this.nlh.States) {
      if (t !== 1) {
        e = 0;
      }
    }
    return e;
  }
  IsPunishReportFinish() {
    return this.GetPunishMarkState() === 1;
  }
  yn_() {
    var e = this.GetPunishMarkState();
    this.MarkItemEntity.GetComponent(10).GamePlayState = e === 1 ? 2 : 0;
  }
  CanGetReward() {
    let e = 0;
    var t = this.GetPunishReportTarget();
    for (const r of t.States) {
      if (r === 1) {
        e += 1;
      }
    }
    return e > t.GetBoxNum;
  }
  GetPunishReportTarget() {
    var e = {
      States: [],
      ConditionTxtIds: [],
      GetBoxNum: 0
    };
    var t = this.MarkConfig.RelativeId;
    var r = ConfigManager_1.ConfigManager.WorldMapConfig.GetPunishReportConfig(t);
    if (r === undefined) {
      MapLogger_1.MapLogger.ErrorOnce(t, 63, "[地图系统]->讨伐报告标记获取配置失败", ["levelPlayId", t]);
    } else {
      for (const s of [ModelManager_1.ModelManager.WorldModel.GetWorldStateGeneric(r.Cond1Key), ModelManager_1.ModelManager.WorldModel.GetWorldStateGeneric(r.Cond2ey), ModelManager_1.ModelManager.WorldModel.GetWorldStateGeneric(r.Cond3Key)]) {
        if (s) {
          e.States.push(1);
        } else {
          e.States.push(0);
        }
      }
      var t = r.CondDescription1;
      var i = r.CondDescription2;
      var n = r.CondDescription3;
      e.ConditionTxtIds.push(t);
      e.ConditionTxtIds.push(i);
      e.ConditionTxtIds.push(n);
      var t = ModelManager_1.ModelManager.WorldModel.GetWorldStateGeneric(r.GetBoxKey) ?? 0;
      e.GetBoxNum = t;
    }
    return e;
  }
  InitIcon() {
    this.UpdateIconPath();
  }
  UpdateIconPath() {
    this.IconPath = this.MarkConfig.UnlockMarkPic;
  }
  GamePlayIsFinish() {
    return this.IsPunishReportFinish();
  }
}
exports.PunishReportMarkItem = PunishReportMarkItem;
//# sourceMappingURL=PunishReportMarkItem.js.map