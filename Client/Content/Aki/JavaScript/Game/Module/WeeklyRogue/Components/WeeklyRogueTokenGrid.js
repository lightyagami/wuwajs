"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueTokenInfoGrid = exports.WeeklyRogueTokenGrid = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController");
const WeeklyRogueGridComponent_1 = require("./WeeklyRogueGridComponent");
class WeeklyRogueTokenGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.Data = undefined;
  }
  OnRefresh(e, t, i) {
    this.Data = e;
    var o;
    var n = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(e.v9n);
    if (n && (n = {
      Type: 4,
      Data: e,
      IconPath: n.BuffIcon,
      QualityId: n.Quality,
      QualityType: "MediumItemGridQualitySpritePath",
      IsDisable: !!e.BN_ && e.BN_.O2s
    }, this.Apply(n), e.BN_)) {
      n = this.RefreshComponent(WeeklyRogueGridComponent_1.WeeklyRougeShopDiscountTag, true, e.BN_);
      o = e.BN_.qN_ !== e.BN_.kN_;
      this.SetComponentVisible(n, o);
      n = this.RefreshComponent(WeeklyRogueGridComponent_1.WeeklyRogueShopDiscount, true, e.BN_);
      this.SetComponentVisible(n, true);
    }
  }
  OnExtendToggleStateChanged(e) {
    if (e === 1) {
      this.OnSelected(true);
    }
  }
  OnSelected(e) {
    this.SetSelected(true);
    ModelManager_1.ModelManager.WeeklyRogueModel.SelectEntry = this.Data;
    if (e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeeklyRogueShopSelect, this.GridIndex, this.Data);
    }
    UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(this.GetItemGridExtendToggle().RootUIComp);
  }
  OnDeselected(e) {
    this.SetSelected(false);
    ModelManager_1.ModelManager.WeeklyRogueModel.SelectEntry = undefined;
  }
}
exports.WeeklyRogueTokenGrid = WeeklyRogueTokenGrid;
class WeeklyRogueTokenInfoGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.Data = 0;
    this.OnSelectedChange = undefined;
  }
  OnRefresh(e, t, i) {
    this.Data = e;
    var o = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(e);
    if (o) {
      e = {
        Type: 4,
        Data: e,
        IconPath: o.BuffIcon,
        QualityId: o.Quality,
        QualityType: "MediumItemGridQualitySpritePath",
        BottomTextId: o.BuffName
      };
      this.Apply(e);
    }
  }
  OnExtendToggleStateChanged(e) {
    if (e === 1) {
      this.OnSelectedChange?.(this.GridIndex, this.Data);
    }
  }
  OnSelected(e) {
    this.SetSelected(true);
    if (e) {
      this.OnSelectedChange?.(this.GridIndex, this.Data);
    }
  }
  OnDeselected(e) {
    this.SetSelected(false);
  }
}
exports.WeeklyRogueTokenInfoGrid = WeeklyRogueTokenInfoGrid;
//# sourceMappingURL=WeeklyRogueTokenGrid.js.map