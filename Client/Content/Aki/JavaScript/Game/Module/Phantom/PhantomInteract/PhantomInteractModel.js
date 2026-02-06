"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomInteractModel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const GameSettingsDeviceRender_1 = require("../../../GameSettings/GameSettingsDeviceRender");
const Global_1 = require("../../../Global");
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
    this.$Sf = 0;
    this.gGf = 0;
    this.CGf = 0;
    this.zRg = new Map();
    this.uxg = new Set();
    this.TDe = undefined;
    this.z3g = false;
    this.WSf = e => {
      var t = e.SelectedGridData;
      let o = 0;
      var n = e.SelectedItemData?.MonsterId ?? 0;
      var t = (o = t && t.MonsterId !== n ? t.MonsterId : o) <= 0 ? -1 : this.InteractInfoData.EquippedVisionData.findIndex(e => e.MonsterId === o);
      if (n > 0 && t >= 0) {
        this.SetEquippedPhantom(t, n);
      }
      this.SetEquippedPhantom(e.SelectedItemIndex, o);
      e.SelectItem(e.SelectedItemIndex);
      PhantomInteractController_1.PhantomInteractController.UpdateEquippedPhantom();
    };
    this.Qbf = e => {
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
    this.Kbf = e => {
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
    return this.$Sf;
  }
  get OpenSkillInfo() {
    return [this.CGf, this.gGf];
  }
  SetSummonMonsterId(e) {
    this.$Sf = e;
  }
  InitEditViewModel(e) {
    this.EditViewModel = new PhantomInteractViewModel_1.PhantomInteractEditViewModel();
    this.EditViewModel.InitData(this.InteractInfoData, e);
    this.EditViewModel.SetConfirmEquipHandler(this.WSf);
    this.EditViewModel.SetEquipRecommendHandler(this.Qbf);
    this.EditViewModel.SetMoveNextSkinHandler(this.Kbf);
  }
  CacheOpenSkillInfo(e, t) {
    this.CGf = e;
    this.gGf = t;
  }
  DisableAutoExposureOnViewOpen() {
    this._1o();
    if (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsAutoExposureOn()) {
      this.z3g = true;
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.AutoExposure 0");
    }
  }
  ReEnableAutoExposureOnViewClose() {
    if (this.z3g) {
      this.TDe = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.AutoExposure 1");
        this.TDe = undefined;
        this.z3g = false;
      }, REOPEN_AUTO_EXPOSURE_DELAY);
    }
  }
  Xbf(e) {
    var t = this.InteractInfoData.EquippedVisionData[e];
    var o = t.MonsterId;
    this.InteractInfoData.EquippedMonsterIdMap.delete(o);
    var n = this.InteractInfoData.GridItemDataMap.get(o);
    if (n) {
      n.InSlotIndex = -1;
    }
    this.InteractInfoData.EquippedMonsterIdMap.delete(o);
    t.LoadEmpty(e);
  }
  Ybf(e, t) {
    var o = this.InteractInfoData.EquippedVisionData[e];
    var n = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(t);
    if (n && n[0] && (o.LoadData(e, t), this.InteractInfoData.EquippedMonsterIdMap.set(t, e), n = this.InteractInfoData.GridItemDataMap.get(t))) {
      n.InSlotIndex = e;
    }
  }
  SetEquippedPhantom(e, t) {
    var o = this.InteractInfoData.EquippedVisionData[e];
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("PhantomInteraction", 95, "声骸装配编辑", ["位置", e], ["原有怪物ID", o.MonsterId], ["新怪物ID", t]);
    }
    if (o && t !== o.MonsterId) {
      if ((o = this.InteractInfoData.EquippedVisionData.findIndex(e => e.MonsterId === t)) >= 0) {
        this.Xbf(o);
      }
      this.Xbf(e);
      if (!(t <= 0)) {
        this.Ybf(e, t);
      }
    }
  }
  FullReplaceEquippedPhantoms(o) {
    let n = 0;
    for (let t = 0; t < this.InteractInfoData.EquippedVisionData.length; t++) {
      let e = 0;
      for (; n < o.length; n++) {
        e = o[n];
        if (this.InteractInfoData.GridItemDataMap.get(e)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("PhantomInteraction", 95, "声骸装配推荐替换", ["input id", o[n]]);
          }
          break;
        }
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("PhantomInteraction", 95, "声骸装配推荐替换-未解锁", ["input id", e]);
        }
        e = 0;
      }
      this.SetEquippedPhantom(t, e);
      n++;
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
  _1o() {
    if (this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  OnClear() {
    this._1o();
    return true;
  }
  AddVisionDisplayTargetPoint(e, t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("PhantomInteraction", 93, "增加挂点记录", ["entityId", e], ["pointLocation", t]);
    }
    this.zRg.set(e, t);
  }
  RemoveVisionDisplayTargetPoint(e) {
    if (this.zRg.has(e)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("PhantomInteraction", 93, "移除挂点记录", ["entityId", e]);
      }
      this.zRg.delete(e);
    }
  }
  GetClosetVisionDisplayTargetPoint() {
    var e = Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy;
    let t = undefined;
    let o = 0;
    for (const i of this.zRg.values()) {
      var n = MathUtils_1.MathUtils.VectorDistance(e, i);
      if (t === undefined || n < o) {
        t = i;
        o = n;
      }
    }
    if (t && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("PhantomInteraction", 93, "获取最近挂点", ["playerLocation", e], ["point", t], ["distance", o]);
    }
    return t;
  }
  AddVisionDisplayHighlightExploreType(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("PhantomInteraction", 93, "记录高亮声骸显像类型", ["type", e]);
    }
    this.uxg.add(e);
  }
  RemoveVisionDisplayHighlightExploreType(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("PhantomInteraction", 93, "移除高亮声骸显像类型", ["type", e]);
    }
    this.uxg.delete(e);
  }
  GetVisionDisplayHighlightExploreTypes() {
    return Array.from(this.uxg);
  }
}
exports.PhantomInteractModel = PhantomInteractModel;
//# sourceMappingURL=PhantomInteractModel.js.map