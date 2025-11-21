"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryItemSweepItem = exports.HonamiStoryDragItemFrameItem = exports.HonamiStoryItemGridPlacementItem = exports.HonamiStoryItemSellValueItem = exports.HonamiStoryItemSellAllItem = exports.HonamiStoryItemLockStateItem = exports.HonamiStorySlotLockStateItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const HonamiStoryDefine_1 = require("../../../HonamiStoryDefine");
const HonamiStoryUtil_1 = require("../../../HonamiStoryUtil");
class HonamiStorySlotLockStateItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Rjt = undefined;
    this.Vrm = undefined;
    this.owe = undefined;
    this.SPe = undefined;
    this.zdm = false;
    this.Dlu = e => {
      if (e === "Hide") {
        this.SetUiActive(false);
      } else if (e === "Show" && this.zdm) {
        this.zdm = false;
        this.SPe?.PlayLevelSequenceByName("Tips_Square");
      }
    };
    this.Jdm = e => {
      if (e === "EmptyGridUnlock" && this.SPe.IsPlayingSequence("Show")) {
        e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_GridIconAdd");
        this.SetSpriteByPath(e, this.GetSprite(0), false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UINiagara]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.Dlu);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.Jdm);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.Jdm);
  }
  RefreshState(e, t, i) {
    if (e) {
      this.RootItem?.SetUIActive(e);
      if (i && i !== this.owe && t) {
        if (this.Vrm === undefined || this.Vrm) {
          if (!this.SPe.IsPlayingSequence("Tips_Square")) {
            this.SPe?.PlayLevelSequenceByName("Tips_Square");
          }
        } else {
          this.zdm = true;
        }
      } else if (!i) {
        this.GetUiNiagara(1)?.SetUIActive(false);
      }
      this.owe = i && t;
    }
    if (e || this.Rjt !== true) {
      this.RefreshUnlockState(t);
    } else {
      this.GetUiNiagara(1)?.SetUIActive(false);
      if (!this.SPe.IsPlayingSequence("Hide")) {
        this.SPe?.PlayLevelSequenceByName("Hide");
      }
    }
    this.Rjt = e;
  }
  RefreshUnlockState(e = false) {
    var t;
    if (this.Vrm !== undefined && !this.Vrm && e) {
      if (!this.SPe.IsPlayingSequence("Show")) {
        this.SPe?.PlayLevelSequenceByName("Show");
      }
    } else {
      t = e ? "SP_GridIconAdd" : "SP_GridIconLock";
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
      this.SetSpriteByPath(t, this.GetSprite(0), false);
    }
    this.Vrm = e;
  }
}
exports.HonamiStorySlotLockStateItem = HonamiStorySlotLockStateItem;
class HonamiStoryItemLockStateItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  RefreshMask(e, t, i) {
    var s;
    this.GetSprite(0)?.SetUIActive(e);
    if (e) {
      e = this.RootItem;
      s = ModelManager_1.ModelManager.HonamiStoryModel;
      i = HonamiStoryDefine_1.HonamiBackpackTypeMap.get(i);
      s = s.GetBackPackData(i);
      i = t.GetGridWidth();
      t = t.GetGridHeight();
      i = s.GetCellWidth() * i + (i - 1) * s.GetCellHorizontalInterval();
      t = s.GetCellHeight() * t + (t - 1) * s.GetCellVerticalInterval();
      e.SetWidth(i);
      e.SetHeight(t);
    }
  }
}
exports.HonamiStoryItemLockStateItem = HonamiStoryItemLockStateItem;
class HonamiStoryItemSellAllItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  SetSelected(e) {
    this.GetSprite(0)?.SetUIActive(e);
  }
}
exports.HonamiStoryItemSellAllItem = HonamiStoryItemSellAllItem;
class HonamiStoryItemSellValueItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    var e = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryActivityConfig(e).OutCoinItemId;
    this.SetItemIcon(this.GetTexture(0), e);
  }
  Refresh(e) {
    e = e.GetSellPrice();
    this.GetText(1)?.SetText(HonamiStoryUtil_1.HonamiStoryUtil.GetPriceNumFormat(e));
  }
}
exports.HonamiStoryItemSellValueItem = HonamiStoryItemSellValueItem;
class HonamiStoryItemGridPlacementItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite]];
  }
  Refresh() {
    var e = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState();
    if (e === 2 || e === 6) {
      this.GetItem(0)?.SetUIActive(e === 2);
      this.GetSprite(1)?.SetUIActive(e === 6);
    }
  }
}
exports.HonamiStoryItemGridPlacementItem = HonamiStoryItemGridPlacementItem;
class HonamiStoryDragItemFrameItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    if (!this.SPe.IsPlayingSequence("Loop")) {
      this.SPe.PlayLevelSequenceByName("Loop");
    }
  }
}
exports.HonamiStoryDragItemFrameItem = HonamiStoryDragItemFrameItem;
class HonamiStoryItemSweepItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.opm = undefined;
    this.Dlu = e => {
      this.opm?.(e);
      this.tRm(false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UITexture]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.Dlu);
  }
  BindSeqEndCb(e) {
    this.opm = e;
  }
  SetData(i, s) {
    if (i) {
      var o = ModelManager_1.ModelManager.HonamiStoryModel;
      var n = i.GetIsCross();
      var r = i.GetBaseGridWidth(n);
      var i = i.GetBaseGridHeight(n);
      let e = 0;
      let t = 0;
      t = s !== 3 ? (n = HonamiStoryDefine_1.HonamiBackpackTypeMap.get(s), s = o.GetBackPackData(n), e = s.GetCellWidth() * r + (r - 1) * s.GetCellHorizontalInterval(), s.GetCellHeight() * i + (i - 1) * s.GetCellVerticalInterval()) : (n = o.GetPlayerBackpackData(), e = n.GetCellWidth() * r + (r - 1) * n.GetCellHorizontalInterval(), n.GetCellHeight() * i + (i - 1) * n.GetCellVerticalInterval());
      this.RootItem?.SetWidth(e);
      this.RootItem?.SetHeight(t);
    }
  }
  PlaySequenceByNamePurely(e) {
    this.tRm(true);
    this.SPe?.PlaySequencePurely(e);
  }
  ClearSequence() {
    this.SPe?.StopCurrentSequence(false, true);
    this.tRm(false);
    this.iRm(false);
  }
  tRm(e) {
    this.GetTexture(0)?.SetUIActive(e);
    this.GetTexture(1)?.SetUIActive(e);
  }
  iRm(e) {
    this.GetTexture(2)?.SetUIActive(e);
  }
  OnBeforeShow() {
    this.tRm(false);
  }
  OnBeforeHide() {
    this.tRm(false);
  }
}
exports.HonamiStoryItemSweepItem = HonamiStoryItemSweepItem;
//# sourceMappingURL=HonamiStoryGridDynamic.js.map