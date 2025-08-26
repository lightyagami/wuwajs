"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueArtifactItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WeeklyRogueTagItem_1 = require("./WeeklyRogueTagItem");
class WeeklyRogueArtifactItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ESc = undefined;
    this.Pe = undefined;
    this.Mne = 0;
    this.OnSelectedChange = undefined;
    this.eTt = () => {
      var e = this.GetExtendToggle(0).GetToggleState() === 1 ? this.GridIndex : undefined;
      this.OnSelectedChange?.(e);
    };
    this.iV_ = () => {
      if (this.Mne !== 0) {
        this.Pqe();
      }
    };
    this.$$c = () => {
      return new WeeklyRogueTagItem_1.WeeklyRogueTagItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIHorizontalLayout], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  OnStart() {
    this.ESc = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.$$c);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WeeklyRogueDescModeChange, this.iV_);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeeklyRogueDescModeChange, this.iV_);
  }
  Refresh(e, t, i) {
    this.Pe = e;
    this.UpdateByConfigId(e.v9n);
  }
  OnSelected(e) {
    this.GetExtendToggle(0).SetToggleState(1);
    ModelManager_1.ModelManager.WeeklyRogueModel.SelectEntry = this.Pe;
  }
  OnDeselected(e) {
    this.GetExtendToggle(0).SetToggleState(0);
    ModelManager_1.ModelManager.WeeklyRogueModel.SelectEntry = undefined;
  }
  Pqe() {
    var e = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(this.Mne);
    if (e) {
      if (ModelManager_1.ModelManager.WeeklyRogueModel?.DescMode === 0) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.BuffDescSimple, ...ModelManager_1.ModelManager.WeeklyRogueModel.GetRogueWeeklyBuffDescParam(this.Mne));
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.BuffDesc, ...ModelManager_1.ModelManager.WeeklyRogueModel.GetRogueWeeklyBuffDescParam(this.Mne));
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("WeeklyRogue", 34, "刷新周常肉鸽信物格子失败，找不到对应的配置", ["ConfigId", this.Mne]);
    }
  }
  UpdateByConfigId(e) {
    this.Mne = e;
    var t = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(e);
    if (t) {
      this.GetItem(6).SetUIActive(this.Pe?.DN_?.dws ?? false);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.BuffName);
      this.Pqe();
      this.SetTextureByPath(t.BuffIcon, this.GetTexture(1));
      this.ESc.RefreshByData(ModelManager_1.ModelManager.WeeklyRogueModel.GetRogueWeeklyBuffTagIdList(e));
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("WeeklyRogue", 34, "刷新周常肉鸽信物格子失败，找不到对应的配置", ["ConfigId", e]);
    }
  }
  SetInteractive(e) {
    this.GetExtendToggle(0).SetSelfInteractive(e);
  }
}
exports.WeeklyRogueArtifactItem = WeeklyRogueArtifactItem;
//# sourceMappingURL=WeeklyRogueArtifactItem.js.map