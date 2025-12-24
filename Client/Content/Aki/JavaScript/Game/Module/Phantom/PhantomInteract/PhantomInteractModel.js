"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomInteractModel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const PhantomInteractController_1 = require("./PhantomInteractController");
const PhantomInteractDefine_1 = require("./PhantomInteractDefine");
const PhantomInteractViewModel_1 = require("./PhantomInteractViewModel");
const phantomInteractExploreIdSet = new Set([1007, 6008]);
const REOPEN_AUTO_EXPOSURE_DELAY = 2000;
class PhantomInteractModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.InteractInfoData = new PhantomInteractDefine_1.PhantomInteractInfoData();
    this.EditViewModel = new PhantomInteractViewModel_1.PhantomInteractEditViewModel();
    this.ngf = 0;
    this.BUf = 0;
    this.kUf = 0;
    this.lGf = 0;
    this.sgf = e => {
      var t = e.SelectedGridData;
      let o = 0;
      var r = e.SelectedItemData?.MonsterId ?? 0;
      var t = (o = t && t.MonsterId !== r ? t.MonsterId : o) <= 0 ? -1 : this.InteractInfoData.EquippedVisionData.findIndex(e => e.MonsterId === o);
      if (r > 0 && t >= 0) {
        this.SetEquippedPhantom(t, r);
      }
      this.SetEquippedPhantom(e.SelectedItemIndex, o);
      e.SelectItem(e.SelectedItemIndex);
      PhantomInteractController_1.PhantomInteractController.UpdateEquippedPhantom();
    };
    this.fEf = e => {
      const t = e.GetFilteredRecommendedIdList();
      var o;
      if (t.length !== 0) {
        (o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(424)).FunctionMap.set(2, () => {
          this.FullReplaceEquippedPhantoms(t);
          e.SelectItem(0);
          e.EquipRecommendCallback();
          PhantomInteractController_1.PhantomInteractController.UpdateEquippedPhantom();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
      }
    };
    this.gEf = e => {
      var t;
      if (e.SelectedGridData) {
        if ((e.SelectedGridData?.SkinIds.length ?? 0) > 1) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("PhantomDisplay_AppearanceChanged");
          [e, t] = this.GridMoveToNextSkin(e.SelectedGridData.MonsterId);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("PhantomInteraction", 95, "声骸皮肤切换", ["MonsterId", e], ["NewSkinId", t]);
          }
          if (!(e < 0) && !(t < 0)) {
            PhantomInteractController_1.PhantomInteractController.UpdateEquippedPhantomSkin(e, t);
          }
        } else {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("PhantomDisplay_AppearanceLocked");
        }
      }
    };
  }
  get SummonMonsterId() {
    return this.ngf;
  }
  get OpenSkillInfo() {
    return [this.kUf, this.BUf];
  }
  SetSummonMonsterId(e) {
    this.ngf = e;
  }
  InitEditViewModel(e) {
    this.EditViewModel = new PhantomInteractViewModel_1.PhantomInteractEditViewModel();
    this.EditViewModel.InitData(this.InteractInfoData, e);
    this.EditViewModel.SetConfirmEquipHandler(this.sgf);
    this.EditViewModel.SetEquipRecommendHandler(this.fEf);
    this.EditViewModel.SetMoveNextSkinHandler(this.gEf);
  }
  CacheOpenSkillInfo(e, t) {
    this.kUf = e;
    this.BUf = t;
  }
  DisableAutoExposureOnViewOpen() {
    this.lGf++;
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.AutoExposure 0");
  }
  ReEnableAutoExposureOnViewClose() {
    var e = this.lGf;
    this._Gf(e);
  }
  async _Gf(e) {
    await TimerSystem_1.GameplayTimerSystem.Wait(REOPEN_AUTO_EXPOSURE_DELAY);
    if (this.lGf === e) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.AutoExposure 1");
    }
  }
  CEf(e) {
    var t = this.InteractInfoData.EquippedVisionData[e];
    var o = t.MonsterId;
    this.InteractInfoData.EquippedMonsterIdMap.delete(o);
    var r = this.InteractInfoData.GridItemDataMap.get(o);
    if (r) {
      r.InSlotIndex = -1;
    }
    this.InteractInfoData.EquippedMonsterIdMap.delete(o);
    t.LoadEmpty(e);
  }
  pEf(e, t) {
    var o = this.InteractInfoData.EquippedVisionData[e];
    var r = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(t);
    if (r && r[0] && (o.LoadData(e, t), this.InteractInfoData.EquippedMonsterIdMap.set(t, e), r = this.InteractInfoData.GridItemDataMap.get(t))) {
      r.InSlotIndex = e;
    }
  }
  SetEquippedPhantom(e, t) {
    var o = this.InteractInfoData.EquippedVisionData[e];
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("PhantomInteraction", 95, "声骸装配编辑", ["位置", e], ["原有怪物ID", o.MonsterId], ["新怪物ID", t]);
    }
    if (o && t !== o.MonsterId) {
      if ((o = this.InteractInfoData.EquippedVisionData.findIndex(e => e.MonsterId === t)) >= 0) {
        this.CEf(o);
      }
      this.CEf(e);
      if (!(t <= 0)) {
        this.pEf(e, t);
      }
    }
  }
  FullReplaceEquippedPhantoms(o) {
    let r = 0;
    for (let t = 0; t < this.InteractInfoData.EquippedVisionData.length; t++) {
      let e = 0;
      for (; r < o.length; r++) {
        e = o[r];
        if (this.InteractInfoData.GridItemDataMap.get(e)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("PhantomInteraction", 95, "声骸装配推荐替换", ["input id", o[r]]);
          }
          break;
        }
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("PhantomInteraction", 95, "声骸装配推荐替换-未解锁", ["input id", e]);
        }
        e = 0;
      }
      this.SetEquippedPhantom(t, e);
      r++;
      PhantomInteractModel.SetPhantomInteractUnlockRedDot(e, false);
    }
  }
  GridMoveToNextSkin(e) {
    const t = this.InteractInfoData.GridItemDataMap.get(e);
    var o;
    if (!t || t.SkinIds.length <= 1 || (o = t.SkinIds.findIndex(e => e === t.EquippedSkin)) < 0) {
      return [-1, -1];
    } else {
      o = (o + 1) % t.SkinIds.length;
      o = t.SkinIds[o];
      t.LoadSkinId(o);
      return [e, o];
    }
  }
  static CheckPhantomInteractUnlockRedDot(e) {
    return !(e <= 0) && ((LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomInteractNewUnlock) ?? new Map()).get(e) ?? false);
  }
  CheckAnyPhantomInteractUnlockRedDot() {
    for (const e of this.InteractInfoData.GridItemDataList) {
      if (PhantomInteractModel.CheckPhantomInteractUnlockRedDot(e.MonsterId)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("PhantomInteraction", 95, "存在声骸交互解锁红点", ["id", e.MonsterId]);
        }
        return true;
      }
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("PhantomInteraction", 95, "没有存在声骸交互解锁红点");
    }
    return false;
  }
  static SetPhantomInteractUnlockRedDot(e, t) {
    var o;
    if (!(e <= 0)) {
      (o = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomInteractNewUnlock) ?? new Map()).set(e, t);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PhantomInteractNewUnlock, o);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("PhantomInteraction", 95, "设置声骸交互解锁红点", ["id", e], ["value", t]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomInteractNewUnlock, e);
    }
  }
  static CheckIsPhantomInteractExploreTool(e) {
    return phantomInteractExploreIdSet.has(e);
  }
}
exports.PhantomInteractModel = PhantomInteractModel;
//# sourceMappingURL=PhantomInteractModel.js.map