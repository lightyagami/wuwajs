"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResonanceChainView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const RoleController_1 = require("../RoleController");
const RoleDefine_1 = require("../RoleDefine");
const ResonanceChainInfoItem_1 = require("./ResonanceChainInfoItem");
const ResonanceChainItem_1 = require("./ResonanceChainItem");
const RESONANCE_FIRST_ITEM_ANGLE = -60;
const RESONANCE_PER_ITEM_ANGLE = 30;
const RESONANCE_ITEM_COUNT = 6;
class ResonanceChainView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.d1o = undefined;
    this.Nco = undefined;
    this.Oco = undefined;
    this.kco = undefined;
    this.Fco = undefined;
    this.xKt = undefined;
    this.$pt = undefined;
    this.Vco = -1;
    this.owt = e => {
      var t;
      if (e === "CamLef" || e === "CamRig") {
        t = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
        this.$pt.SetActorTag(e, RoleDefine_1.UI_SCENE_ROLE_TAG, t);
        this.$pt.SetRelativeTransform(e, RenderModuleController_1.RenderModuleController.GetKuroCurrentUiSceneTransform());
      }
    };
    this.Hco = () => {
      this.jco();
      var e;
      var t;
      var i = this.d1o.GetCurRoleResonanceGroupIndex() - 1;
      const s = this.kco[i];
      if (s && (s.PlayActivateSequence(() => {
        s.SetUiActive(false);
        s.SetSelectState(false);
      }), e = this.Nco[i], t = this.d1o.GetCurSelectRoleId(), e.SetSelectState(true), e.Update(t, s.GetResonanceId()), e.SetUiActive(true), (this.kco[i] = e).PlayActivateSequence(), (t = 1 + i) < this.kco.length)) {
        this.kco[t].RefreshRedDot();
      }
    };
    this.Kco = e => {
      this.PlayMontageStart();
      this.$pt.PlayOrReplaySequenceByName("Start");
      this.bl();
      this.ShowItems();
    };
    this.Qco = () => {
      this.Xco();
      this.$pt.PlayOrReplaySequenceByName("CamLef");
      this.$co();
    };
    this.Yco = e => {
      var t = this.Vco;
      let i = undefined;
      if (t >= 0) {
        i = this.Jco(t);
      }
      t = e;
      let s = undefined;
      if (t >= 0) {
        this.Vco = t;
        s = this.Jco(t);
      }
      i?.SetSelectState(false);
      i?.RefreshToggleState();
      s?.SetSelectState(true);
      s?.RefreshToggleState(true);
      if (this.d1o.RoleViewState === 0) {
        this.zco();
      }
      this.jco();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.d1o = this.ExtraParams;
    if (this.d1o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 58, "RoleViewAgent为空", ["界面名称", "ResonanceChainView"]);
      }
    } else {
      this.Fq();
      this.Zco();
      var t = [];
      for (let e = 0; e < RESONANCE_ITEM_COUNT; e++) {
        t.push(this.mcm(e));
        t.push(this.fcm(e));
      }
      this.xKt = new ResonanceChainInfoItem_1.ResonanceChainInfoItem();
      t.push(this.xKt.CreateByResourceIdAsync("UIItem_ResonanceChainInfo", this.RootItem));
      await Promise.all(t);
    }
  }
  Fq() {
    this.Fco = new Array(RESONANCE_ITEM_COUNT);
    this.Nco = new Array(RESONANCE_ITEM_COUNT);
    this.Oco = new Array(RESONANCE_ITEM_COUNT);
    this.kco = new Array(RESONANCE_ITEM_COUNT);
    for (let e = 0; e < RESONANCE_ITEM_COUNT; e++) {
      this.Fco[e] = this.GetItem(0 + e);
    }
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.$pt.BindSequenceStartEvent(this.owt);
  }
  Zco() {
    this.Vco = -1;
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdateRoleResonanceDetailView, this.Hco);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleSystemChangeRole, this.Kco);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleInternalViewQuit, this.Qco);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdateRoleResonanceDetailView, this.Hco);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleSystemChangeRole, this.Kco);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleInternalViewQuit, this.Qco);
  }
  OnBeforeShow() {
    this.PlayMontageStart();
    this.bl();
    this.ShowItems();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FinishGuideStepByEvent, "ResonanceChainGuide");
  }
  ShowItems() {
    this.kco.forEach(e => {
      e.ShowItem();
    });
  }
  zco() {
    this.emo();
    this.$pt.StopSequenceByKey("CamRig");
    this.$pt.PlayLevelSequenceByName("CamRig");
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleInternalViewEnter);
  }
  PlayMontageStart() {
    RoleController_1.RoleController.PlayRoleMontage(7);
  }
  emo() {
    this.xKt?.SetUiActive(true);
    this.xKt.ShowItem();
  }
  Xco() {
    this.xKt?.SetUiActive(false);
    this.xKt.HideItem();
  }
  tmo(e) {
    if (!(e < 0) && !(e >= RESONANCE_ITEM_COUNT)) {
      return RESONANCE_FIRST_ITEM_ANGLE + e * RESONANCE_PER_ITEM_ANGLE;
    }
  }
  async mcm(e) {
    var t = new ResonanceChainItem_1.ResonanceChainLockedItem();
    await (this.Oco[e] = t).CreateByResourceIdAsync("UIItem_ResonanceChainLockedItem", this.Fco[e]);
    t.BindToggleCallBack(this.Yco);
    t.SetIconRotation(this.tmo(e));
    return t;
  }
  async fcm(e) {
    var t = new ResonanceChainItem_1.ResonanceChainActivatedItem();
    await (this.Nco[e] = t).CreateByResourceIdAsync("UIItem_ResonanceChainActivatedItem", this.Fco[e]);
    t.BindToggleCallBack(this.Yco);
    t.SetIconRotation(this.tmo(e));
    return t;
  }
  Jco(e) {
    e = ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceById(e);
    if (e) {
      e = e.GroupIndex - 1;
      if (e >= 0 && e < RESONANCE_ITEM_COUNT) {
        return this.kco[e];
      }
    }
  }
  bl() {
    const n = this.d1o.GetCurRoleResonanceGroupIndex();
    var e = this.d1o.GetCurRoleResonanceConfigList();
    const r = this.d1o.GetCurSelectRoleId();
    this.kco.forEach(e => {
      e?.SetUiActive(false);
    });
    if (e && e.length > 0) {
      e.forEach(e => {
        let t = undefined;
        var i = e.GroupIndex;
        var s = i - 1;
        if (s < RESONANCE_ITEM_COUNT) {
          (t = (i <= n ? this.Nco : this.Oco)[s]).SetUiActive(true);
          t.Update(r, e.Id);
          this.kco[s] = t;
        }
      });
    }
  }
  $co() {
    var e = this.Vco;
    let t = undefined;
    if (e >= 0) {
      t = this.Jco(e);
    }
    this.Vco = -1;
    t?.SetSelectState(false);
    t?.RefreshToggleState(true);
  }
  jco() {
    var e = this.d1o.GetCurSelectRoleData();
    this.xKt.Update(e.GetDataId(), this.Vco, e.IsTrialRole());
  }
  OnBeforeDestroy() {
    this.Nco.forEach(e => {
      e?.Destroy();
    });
    this.Oco.forEach(e => {
      e?.Destroy();
    });
    this.Nco = undefined;
    this.Oco = undefined;
    this.kco = undefined;
    this.Fco = undefined;
    this.$pt = undefined;
    this.Zco();
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 16, "共鸣链聚焦引导extraParam字段配置错误", ["configParams", e]);
      }
    } else {
      var t = this.omo(e[0]);
      if (t) {
        return [t, t];
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Guide", 16, "共鸣链聚焦引导extraParam字段配置错误, 找不到对应的共鸣链界面UI节点", ["configParams", e]);
      }
    }
  }
  omo(e) {
    let t = undefined;
    var i = Number(e);
    if (i) {
      t = this.Oco[--i]?.GetUiItemForGuide();
    } else if (e === "btn") {
      t = this.xKt?.GetUiItemForGuide();
    }
    return t;
  }
}
exports.ResonanceChainView = ResonanceChainView;
//# sourceMappingURL=ResonanceChainView.js.map