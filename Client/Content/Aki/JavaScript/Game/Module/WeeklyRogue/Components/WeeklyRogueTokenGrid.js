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
const RoguelikeDefine_1 = require("../../Roguelike/Define/RoguelikeDefine");
class WeeklyRogueTokenGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.Data = undefined;
  }
  OnRefresh(e, i, t) {
    this.Data = e;
    var o = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(e.v9n);
    if (o) {
      var n = e.BN_;
      if (n === undefined) {
        const s = {
          Type: 4,
          Data: e,
          IconPath: o.BuffIcon,
          QualityId: o.Quality,
          QualityType: "MediumItemGridQualitySpritePath"
        };
        this.Apply(s);
      } else {
        var r = ModelManager_1.ModelManager.InventoryModel?.GetItemCountByConfigId(RoguelikeDefine_1.INSIDE_CURRENCY_ID) ?? 0;
        var a = n !== undefined && n.qN_ !== n.kN_;
        var r = {
          CurPrice: n.qN_,
          OriginalPrice: n.kN_,
          CurrencyNotEnough: r < n.qN_
        };
        const s = {
          Type: 4,
          Data: e,
          IconPath: o.BuffIcon,
          QualityId: o.Quality,
          QualityType: "MediumItemGridQualitySpritePath",
          IsRogueFinish: n.O2s,
          ItemPrice: r
        };
        this.Apply(s);
        e = this.RefreshComponent(WeeklyRogueGridComponent_1.WeeklyRougeShopDiscountTag, true, n);
        this.SetComponentVisible(e, a);
      }
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
  OnRefresh(e, i, t) {
    if ((this.Data = e) === 0) {
      const n = {
        Type: 3,
        Data: e,
        IsPhantomLock: true,
        BottomTextId: "WeRogueMisssingToken"
      };
      this.Apply(n);
      this.SetToggleInteractive(false);
    } else {
      var o = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(e);
      if (o) {
        const n = {
          Type: 4,
          Data: e,
          IconPath: o.BuffIcon,
          QualityId: o.Quality,
          QualityType: "MediumItemGridQualitySpritePath",
          BottomTextId: o.BuffName
        };
        this.Apply(n);
        this.SetToggleInteractive(true);
      }
    }
  }
  OnExtendToggleStateChanged(e) {
    this.OnSelectedChange?.(this.Data, e === 1);
  }
  OnSelected(e) {
    this.SetSelected(true);
    if (e) {
      this.OnSelectedChange?.(this.Data, true);
    }
  }
  OnDeselected(e) {
    this.SetSelected(false);
  }
  GetKey(e, i) {
    return this.Data;
  }
}
exports.WeeklyRogueTokenInfoGrid = WeeklyRogueTokenInfoGrid;
//# sourceMappingURL=WeeklyRogueTokenGrid.js.map