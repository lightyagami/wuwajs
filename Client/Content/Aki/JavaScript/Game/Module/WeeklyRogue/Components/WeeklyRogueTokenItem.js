"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueTokenItem = undefined;
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
class WeeklyRogueTokenItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ESc = undefined;
    this.Pe = undefined;
    this.Mne = 0;
    this.OnSelectedChange = undefined;
    this.eTt = () => {
      var e = this.GetExtendToggle(4).GetToggleState() === 1 ? this.GridIndex : undefined;
      this.OnSelectedChange?.(e);
    };
    this.iV_ = () => {
      var e;
      if (this.Mne !== 0) {
        if (e = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(this.Mne)) {
          if (ModelManager_1.ModelManager.WeeklyRogueModel?.DescMode === 0) {
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.BuffDescSimple);
          } else {
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.BuffDesc, ...e.BuffDescParam);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("WeeklyRogue", 34, "刷新周常肉鸽信物格子失败，找不到对应的配置", ["ConfigId", this.Mne]);
        }
      }
    };
    this.$$c = () => {
      return new WeeklyRogueTagItem_1.WeeklyRogueTagItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIExtendToggle], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIHorizontalLayout], [10, UE.UIItem], [11, UE.UIItem]];
    this.BtnBindInfo = [[4, this.eTt]];
  }
  OnStart() {
    this.ESc = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(9), this.$$c);
    this.GetItem(11).SetUIActive(false);
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
    this.GetItem(11).SetUIActive(e.Z8u);
  }
  OnSelected(e) {
    this.GetExtendToggle(4).SetToggleState(1);
    ModelManager_1.ModelManager.WeeklyRogueModel.SelectEntry = this.Pe;
  }
  OnDeselected(e) {
    this.GetExtendToggle(4).SetToggleState(0);
    ModelManager_1.ModelManager.WeeklyRogueModel.SelectEntry = undefined;
  }
  UpdateByConfigId(e) {
    this.Mne = e;
    var t;
    var i = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(e);
    if (i) {
      this.GetItem(5).SetUIActive(false);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.BuffName);
      if (ModelManager_1.ModelManager.WeeklyRogueModel?.DescMode === 0) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.BuffDescSimple);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.BuffDesc, ...i.BuffDescParam);
      }
      this.SetTextureByPath(i.BuffIcon, this.GetTexture(1));
      if (t = ConfigManager_1.ConfigManager.WeeklyRogueConfig?.GetRogueWeeklyQualityConfig(i.Quality)) {
        this.SetTextureByPath(t.TokenBgNew, this.GetTexture(0));
      }
      this.GetSprite(6).SetColor(UE.Color.FromHex(t.TokenColor));
      this.GetItem(7).SetUIActive(i.Quality === 6);
      this.GetItem(8).SetUIActive(i.Quality === 5);
      this.ESc.RefreshByData(ModelManager_1.ModelManager.WeeklyRogueModel.GetRogueWeeklyBuffTagIdList(e));
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("WeeklyRogue", 34, "刷新周常肉鸽信物格子失败，找不到对应的配置", ["ConfigId", e]);
    }
  }
  SetInteractive(e) {
    this.GetExtendToggle(4).SetSelfInteractive(e);
  }
}
exports.WeeklyRogueTokenItem = WeeklyRogueTokenItem;
//# sourceMappingURL=WeeklyRogueTokenItem.js.map