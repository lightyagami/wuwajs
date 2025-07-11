"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceTipGrid = undefined;
const ue_1 = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController");
const CommonItemSmallItemGrid_1 = require("../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../Util/LguiUtil");
class InstanceTipGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.NUe = 0;
    this.jO1 = false;
    this.sOe = undefined;
    this.s_i = true;
    this.a_i = false;
    this.h_i = [];
  }
  Initialize(t) {
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIText], [1, ue_1.UIItem], [2, ue_1.UIItem], [3, ue_1.UIButtonComponent], [4, ue_1.UIItem]];
  }
  OnBeforeDestroy() {
    for (const t of this.h_i) {
      t.Destroy();
    }
    this.h_i.length = 0;
  }
  Refresh(t) {
    if (t) {
      this.NUe = t.InstanceId;
    }
    this.jO1 = t?.IsDouble ?? false;
    this.Yli();
    this.l_i();
    this.__i();
  }
  ClearGrid() {
    for (const t of this.h_i) {
      t.Destroy();
    }
    this.h_i.length = 0;
  }
  Yli() {
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.NUe);
    var t = ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(t.CustomTypes);
    this.GetItem(4).SetUIActive(t !== undefined || this.jO1);
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceRewardId(this.NUe);
    var t = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(t);
    this.sOe = t;
    this.a_i = this.sOe && this.sOe.length > 0;
    var i = this.GetItem(2).GetOwner();
    var e = this.GetItem(1);
    let r = 0;
    var s = ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(this.NUe) || ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstanceCompatible(this.NUe);
    for (const o of this.sOe) {
      let t = this.h_i[r++];
      if (!t) {
        (t = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()).Initialize(LguiUtil_1.LguiUtil.DuplicateActor(i, e));
        this.h_i.push(t);
      }
      t.Refresh(o);
      t.SetReceivedVisible(s);
      t.SetActive(true);
    }
    for (let t = this.sOe.length; t < this.h_i.length; ++t) {
      this.h_i[t].SetActive(false);
    }
    this.GetItem(2).SetUIActive(false);
  }
  l_i() {
    this.RootItem.SetUIActive(this.a_i && this.s_i);
  }
  __i() {
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.NUe);
    if (t.InstSubType === 11) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.MapName);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Text_ProbReward_Text");
    }
  }
}
exports.InstanceTipGrid = InstanceTipGrid;
//# sourceMappingURL=InstanceTipGrid.js.map