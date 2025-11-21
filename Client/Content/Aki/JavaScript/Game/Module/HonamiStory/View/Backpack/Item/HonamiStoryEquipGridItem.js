"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryEquipGridItem = undefined;
const Info_1 = require("../../../../../../Core/Common/Info");
const Log_1 = require("../../../../../../Core/Common/Log");
const StringBuilder_1 = require("../../../../../../Core/Utils/StringBuilder");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../../../ConfirmBox/ConfirmBoxDefine");
const HonamiStoryController_1 = require("../../../HonamiStoryController");
const HonamiStoryDefine_1 = require("../../../HonamiStoryDefine");
const HonamiStoryUtil_1 = require("../../../HonamiStoryUtil");
const HonamiStoryEquipItemGridItem_1 = require("./HonamiStoryEquipItemGridItem");
const HonamiStoryGridDynamic_1 = require("./HonamiStoryGridDynamic");
const HonamiStoryGridItemBase_1 = require("./HonamiStoryGridItemBase");
class HonamiStoryEquipGridItem extends HonamiStoryGridItemBase_1.HonamiStoryGridItemBase {
  constructor() {
    super(...arguments);
    this.cC = 0;
    this.Vrm = false;
    this.Xim = undefined;
    this.$nm = undefined;
    this.OnBtnPointDown = () => {};
  }
  GetPosition() {
    if (this.Data !== undefined) {
      return this.Data.GetPosition();
    } else {
      return this.cC;
    }
  }
  GetIsUnlock() {
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetRoleItemDataByPosition(this.GetPosition());
    return t.GetSlotList()[t.GetHonamiStoryPluginIndex(this.GetPosition())].GetIsUnlock();
  }
  GetSlotUnlockConfig() {
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData(false);
    var i = ModelManager_1.ModelManager.HonamiStoryModel.GetRoleItemDataByPosition(this.GetPosition());
    var e = i.GetSlotList();
    var i = i.GetHonamiStoryPluginIndex(this.GetPosition());
    var o = e[i];
    var t = t?.GetPreGuideQuestFinishState() ?? false;
    var e = !o.GetIsUnlock() && (i === 0 || e[i - 1].GetIsUnlock());
    var i = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
    var t = t && e && !i;
    return [o.GetIsUnlock(), t];
  }
  SetPosition(t) {
    this.cC = t;
  }
  Refresh(t, i) {
    if ((this.Data = t) === undefined) {
      this.ItemGridItem?.SetUiActive(false);
      var [e, o] = this.GetSlotUnlockConfig();
      this.Vrm = o;
      this.SpriteBg.SetUIActive(e);
      this.SetLockEnable(!e, o);
      if (e) {
        this.RefreshState();
      }
      this.ClearSequence();
    } else {
      this.SetLockEnable(false, false);
      this.SetCanPlaceEnable(false);
      o = ModelManager_1.ModelManager.HonamiStoryModel.GetRoleItemDataByPosition(this.GetPosition());
      if (o) {
        const r = o.CheckRoleItemBuffIsActive(t);
        if (this.ItemGridItem) {
          this.ItemGridItem?.SetUiActive(true);
          e = t.GetQualityConfig();
          this.ItemGridItem.Refresh(t, i !== -1);
          this.SetSpriteByPath(e.GridBg, this.SpriteBg, false);
          this.PlayNewlyPickedUpSweepAnimation(t);
          this.Avm(r);
        } else {
          this.InitItemGridItem(t, -1).then(() => {
            this.PlayNewlyPickedUpSweepAnimation(t);
            this.Avm(r);
          });
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 77, "获取位置失败", ["GetPos", this.GetPosition()], ["DataPos", t.GetPosition()], ["incId", t.GetIncId()], ["id", t.GetItemId()]);
      }
    }
  }
  Avm(t) {
    if (t) {
      this.PlaySequenceByName("Activate");
    } else {
      this.ClearSequence();
    }
  }
  CreateGridItem(t) {
    return new HonamiStoryEquipItemGridItem_1.HonamiStoryEquipItemGridItem(t);
  }
  SetLockEnable(t, i) {
    if (t || this.Xim) {
      if (this.Xim) {
        if (!this.Xim.InAsyncLoading()) {
          this.RefreshLockState();
        }
      } else {
        this.Xim = new HonamiStoryGridDynamic_1.HonamiStorySlotLockStateItem();
        this.Xim.CreateThenShowByResourceIdAsync("UiItem_HonamiStoryItemStateAdd", this.RootItem).then(() => {
          this.RefreshLockState();
        });
      }
    }
  }
  RefreshLockState() {
    var t;
    var i;
    var e;
    var o;
    if (this.Xim) {
      [t, i] = this.GetSlotUnlockConfig();
      o = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
      e = (e = ModelManager_1.ModelManager.HonamiStoryModel.GetRoleItemDataByPosition(this.GetPosition())).GetSlotList()[e.GetHonamiStoryPluginIndex(this.GetPosition())];
      e = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetSlotUnlockConfig(e.GetSlotId());
      o = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryActivityConfig(o).OutCoinItemId;
      e = e.ConsumeItems.get(o);
      o = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(o);
      this.Xim.RefreshState(!t, i, e <= o);
    }
  }
  SetCanPlaceEnable(t) {
    this.$nm?.SetUiActive(t);
    if (t) {
      this.$nm?.Refresh();
    }
    if (t && !this.$nm) {
      this.$nm = new HonamiStoryGridDynamic_1.HonamiStoryItemGridPlacementItem();
      this.$nm.CreateThenShowByResourceIdAsync("UiItem_HonamiStoryItemStatePut", this.RootItem).then(() => {
        var t = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState();
        var t = t === 2 || t === 6;
        this.$nm?.SetUiActive(t);
        if (t) {
          this.$nm?.Refresh();
        }
      });
    }
  }
  DoClickedGridButton() {
    var t;
    var i = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState();
    if (i === 0) {
      if (!this.GetIsUnlock()) {
        if (this.Vrm) {
          this.jrm();
        } else {
          t = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData(false)?.GetPreGuideQuestFinishState() ?? false;
          if (!HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon() && t) {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_CantUnlockLastSlot");
          }
        }
      }
    } else if (i === 2 || i === 3) {
      if (this.GetIsUnlock()) {
        ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic().DoTipsWithPluginsInstead(this.GetPosition(), undefined);
      } else {
        ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic().CloseTips();
      }
    }
  }
  SetIsEnable(t) {
    this.ItemGridItem?.SetIsEnable(t);
  }
  jrm() {
    var t = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    const i = ModelManager_1.ModelManager.HonamiStoryModel.GetRoleItemDataByPosition(this.GetPosition());
    const e = i.GetSlotList()[i.GetHonamiStoryPluginIndex(this.GetPosition())];
    var o = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetSlotUnlockConfig(e.GetSlotId());
    const r = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryActivityConfig(t).OutCoinItemId;
    const n = o.ConsumeItems.get(r);
    t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(r);
    let a = "";
    if (t && t.IconSmall) {
      a = t.IconSmall;
    }
    o = new StringBuilder_1.StringBuilder();
    o.Append("<texture=");
    o.Append(a);
    o.Append("/>");
    t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(389);
    t.FunctionMap.set(2, () => {
      var t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(r);
      if (n > t) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_NoEnoughMoney");
      } else {
        HonamiStoryController_1.HonamiStoryController.RequestHonamiStoryUnlockSlot(e, i.GetPosition()).then(t => {
          if (t) {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_SlotUnlock");
          }
        });
      }
    });
    t.SetTextArgs(n.toString(), o.ToString());
    o = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(r);
    if (o < n) {
      t.SetTipsBgRed = true;
      t.SetTableTextArgNew("Text_NotEnoughItem_Text");
      t.InteractionMap.set(1, false);
    }
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
  }
  RefreshState() {
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState();
    if (t === 0) {
      this.SetSpriteByPath(HonamiStoryDefine_1.HONAMI_EMPTY_GRID_BG, this.SpriteBg, false);
      this.SetCanPlaceEnable(false);
    } else if (t === 2 || t === 6) {
      this.SetCanPlaceEnable(!Info_1.Info.IsInGamepad());
    } else if (t === 1) {
      this.SetCanPlaceEnable(false);
    } else if (t === 3) {
      this.SetCanPlaceEnable(true);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t.length !== 0) {
      var t = t[0];
      if (t === "AddBtn") {
        if (this.Xim?.IsUiActiveInHierarchy() && this.Vrm) {
          if (t = this.GetBtnItem()) {
            return [t, t];
          } else {
            return undefined;
          }
        }
      }
    }
  }
}
exports.HonamiStoryEquipGridItem = HonamiStoryEquipGridItem;
//# sourceMappingURL=HonamiStoryEquipGridItem.js.map