"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarBase = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const BattleUiControl_1 = require("../../BattleUiControl");
const VisibleStateUtil_1 = require("../../VisibleStateUtil");
const BattleUiTweenAnimPlayer_1 = require("../BattleUiTweenAnimPlayer");
const SpecialEnergyBarKeyItem_1 = require("./SpecialEnergyBarKeyItem");
const SpecialEnergyBarNumItem_1 = require("./SpecialEnergyBarNumItem");
const SpecialEnergyBarPercentMachine_1 = require("./SpecialEnergyBarPercentMachine");
class SpecialEnergyBarBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Destroyed = false;
    this.PrefabPath = "";
    this.RoleData = undefined;
    this.Config = undefined;
    this.AttributeId = 0;
    this.MaxAttributeId = 0;
    this.AttributeComponent = undefined;
    this.TagComponent = undefined;
    this.BuffComponent = undefined;
    this.TagTaskList = [];
    this.HasKeyEnableTag = false;
    this.NiagaraList = [];
    this.NeedInitKeyItem = true;
    this.KeyItem = undefined;
    this.ExtraKeyItemList = [];
    this.NeedInitNumItem = false;
    this.NumItem = undefined;
    this.PercentMachine = new SpecialEnergyBarPercentMachine_1.SpecialEnergyBarPercentMachine();
    this.TweenAnimPlayer = undefined;
    this.GYe = new Map();
    this.VisibleState = 0;
    this.pdt = (t, i, e) => {
      this.OnAttributeChanged();
    };
    this.vdt = (t, i, e) => {
      this.OnMaxAttributeChanged();
    };
    this.OnKeyEnableTagChanged = (t, i) => {
      this.HasKeyEnableTag = i;
      this.OnKeyEnableChanged();
    };
  }
  async InitByPathAsync(t, i) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "加载特殊能量条", ["path", i]);
    }
    this.PrefabPath = i;
    i = await BattleUiControl_1.BattleUiControl.Pool.LoadActorNoCache(i, t);
    if (this.Destroyed) {
      ActorSystem_1.ActorSystem.Put("SpecialEnergyBar Has Destroyed", i);
    } else {
      await this.CreateByActorAsync(i);
      this.AddEvents();
      this.RefreshVisible();
    }
  }
  async InitByActorAsync(t) {
    await this.CreateByActorAsync(t);
    this.AddEvents();
    this.RefreshVisible();
  }
  InitData(t, i, e = true) {
    this.NeedInitKeyItem = e;
    if (!this.Destroyed && t) {
      if (this.RoleData) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 17, "能量条设置了多次角色的数据");
        }
        this.kYe();
        this.FYe();
      }
      this.RoleData = t;
      this.Config = i;
      this.AttributeId = i.AttributeId;
      this.MaxAttributeId = i.MaxAttributeId;
      this.AttributeComponent = this.RoleData.AttributeComponent;
      this.TagComponent = this.RoleData.GameplayTagComponent;
      this.BuffComponent = this.RoleData.BuffComponent;
      this.OnInitData();
      this.PercentMachine.Init(this.GetTargetAttributePercent());
      this.InitKeyEnableTag();
    }
  }
  OnInitData() {}
  AddEvents() {
    this.ListenForAttributeChanged(this.AttributeId, this.pdt);
    this.ListenForAttributeChanged(this.MaxAttributeId, this.vdt);
  }
  RemoveEvents() {
    this.RemoveListenAttributeChanged(this.AttributeId, this.pdt);
    this.RemoveListenAttributeChanged(this.MaxAttributeId, this.vdt);
  }
  SetVisible(t, i = 0) {
    this.VisibleState = VisibleStateUtil_1.VisibleStateUtil.SetVisible(this.VisibleState, t, i);
    this.RefreshVisible();
  }
  RefreshVisible() {
    var t;
    if (!this.InAsyncLoading() && !this.IsRegister && !this.IsCreateOrCreating) {
      if (t = this.VisibleState === 0) {
        if (!this.IsShowOrShowing) {
          this.Show();
        }
      } else if (this.IsShowOrShowing) {
        this.Hide();
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "改变特殊能量条显隐", ["visible", t], ["entityId", this.RoleData?.EntityHandle?.Id]);
      }
    }
  }
  DestroyOverride() {
    return !(this.Destroyed = true);
  }
  OnBeforeDestroy() {
    if (!this.InAsyncLoading()) {
      this.RemoveEvents();
    }
    this.ClearAllTweenAnim();
    this.kYe();
    this.FYe();
    if (this.NeedInitKeyItem) {
      this.NeedInitKeyItem = false;
      this.KeyItem?.Destroy();
      this.KeyItem = undefined;
    }
    for (const t of this.ExtraKeyItemList) {
      t?.Destroy();
    }
    this.ExtraKeyItemList.length = 0;
    if (this.NeedInitNumItem) {
      this.NeedInitNumItem = false;
      this.NumItem?.Destroy();
      this.NumItem = undefined;
    }
    this.RoleData = undefined;
    this.AttributeComponent = undefined;
    this.TagComponent = undefined;
    this.BuffComponent = undefined;
  }
  GetEntityId() {
    return this.RoleData?.EntityHandle?.Id;
  }
  Tick(t) {
    if (this.PercentMachine.Update(t)) {
      this.OnBarPercentChanged();
    }
  }
  OnAttributeChanged() {
    this.PercentMachine.SetTargetPercent(this.GetTargetAttributePercent());
    this.OnBarPercentChanged();
  }
  OnMaxAttributeChanged() {
    this.PercentMachine.SetTargetPercent(this.GetTargetAttributePercent());
    this.OnBarPercentChanged();
  }
  OnBarPercentChanged() {}
  ListenForAttributeChanged(t, i) {
    var e;
    if (!(t <= 0)) {
      if (e = this.RoleData?.AttributeComponent) {
        e.AddListener(t, i);
        this.GYe.set(t, i);
      }
    }
  }
  RemoveListenAttributeChanged(t, i) {
    var e;
    if (!(t <= 0)) {
      if (e = this.AttributeComponent) {
        e.RemoveListener(t, i);
        this.GYe.delete(t);
      }
    }
  }
  kYe() {
    var t = this.AttributeComponent;
    if (t) {
      for (var [i, e] of this.GYe) {
        t.RemoveListener(i, e);
      }
      this.GYe.clear();
    }
  }
  ListenForTagCountChanged(t, i) {
    var e = this.TagComponent;
    if (e) {
      e = e.ListenForTagAnyCountChanged(t, i);
      this.TagTaskList.push(e);
    }
  }
  FYe() {
    if (this.TagTaskList) {
      for (const t of this.TagTaskList) {
        t.EndTask();
      }
      this.TagTaskList.length = 0;
    }
  }
  ListenForTagAddOrRemoveChanged(t, i) {
    var e = this.TagComponent;
    if (e) {
      e = e.ListenForTagAddOrRemove(t, i);
      this.TagTaskList.push(e);
    }
  }
  GetBuffCountByBuffId(t) {
    return this.BuffComponent.GetBuffTotalStackById(t);
  }
  async LoadEffects() {
    if (this.Config) {
      var i = [];
      var e = this.Config.NiagaraPathList.length;
      for (let t = 0; t < e; t++) {
        var s = this.Config.NiagaraPathList[t];
        i.push(this.YIn(s, t, this.NiagaraList));
      }
      await Promise.all(i);
    }
  }
  async YIn(t, i, e) {
    const s = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.NiagaraSystem, t => {
      e[i] = t;
      s.SetResult();
    }, 103);
    return s.Promise;
  }
  async InitKeyItem(t) {
    if (!!this.NeedInitKeyItem && !Info_1.Info.IsInTouch() && !(this.Config.KeyInfoList.length <= 0)) {
      this.KeyItem = new SpecialEnergyBarKeyItem_1.SpecialEnergyBarKeyItem();
      this.KeyItem.SetConfig(this.Config);
      await this.KeyItem.CreateThenShowByResourceIdAsync("UiItem_EnergyBarHotKey", t);
    }
  }
  async InitNumItem(t) {
    if (this.NeedInitNumItem) {
      this.NumItem = new SpecialEnergyBarNumItem_1.SpecialEnergyBarNumItem();
      await this.NumItem.CreateThenShowByResourceIdAsync("UiItem_EnergyBarTxtNum", t);
    }
  }
  InitKeyEnableTag() {
    var t = this.Config.KeyEnableTagId;
    if (t !== 0) {
      this.HasKeyEnableTag = this.TagComponent?.HasTag(t) ?? false;
      this.ListenForTagAddOrRemoveChanged(t, this.OnKeyEnableTagChanged);
    }
  }
  GetTargetAttributePercent() {
    var t = this.AttributeComponent.GetCurrentValue(this.AttributeId);
    var i = this.AttributeComponent.GetCurrentValue(this.MaxAttributeId);
    let e = i > 0 ? t / i : 0;
    return e;
  }
  GetKeyEnable() {
    return !(this.PercentMachine.GetCurPercent() < this.Config.DisableKeyOnPercent) && (this.Config.KeyEnableTagId === 0 || !!this.HasKeyEnableTag);
  }
  OnKeyEnableChanged() {}
  OnChangeVisibleByTagChange(t) {}
  ReplaceFullEffect(t) {}
  RevertFullEffect() {}
  InitTweenAnim(t) {
    this.TweenAnimPlayer ||= new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer();
    this.TweenAnimPlayer.InitTweenAnim(t, this.GetItem(t));
  }
  PlayTweenAnim(t) {
    this.TweenAnimPlayer?.PlayTweenAnim(t);
  }
  StopTweenAnim(t) {
    this.TweenAnimPlayer?.StopTweenAnim(t);
  }
  ClearAllTweenAnim() {
    this.TweenAnimPlayer?.Clear();
  }
  SetTweenTimeScale(t, i) {
    this.TweenAnimPlayer?.SetTweenTimeScale(t, i);
  }
}
exports.SpecialEnergyBarBase = SpecialEnergyBarBase;
//# sourceMappingURL=SpecialEnergyBarBase.js.map