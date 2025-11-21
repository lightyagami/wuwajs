"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadIconEnergyBarBase = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const CharacterAttributeTypes_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const VisibleStateUtil_1 = require("../../VisibleStateUtil");
const BattleUiTweenAnimPlayer_1 = require("../BattleUiTweenAnimPlayer");
const HeadIconEnergyBarPercentMachine_1 = require("./HeadIconEnergyBarPercentMachine");
class HeadIconEnergyBarBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RoleData = undefined;
    this.Config = undefined;
    this.PlayIncreaseEffect = false;
    this.VisibleState = 0;
    this.PercentMachine = new HeadIconEnergyBarPercentMachine_1.HeadIconEnergyBarPercentMachine();
    this.AttributeId = 0;
    this.MaxAttributeId = 0;
    this.AttributeComponent = undefined;
    this.TagComponent = undefined;
    this.TagTaskMap = undefined;
    this.TweenAnimPlayer = undefined;
    this.GYe = new Map();
    this.TargetPercentChanged = (t, i) => {
      this.OnTargetPercentChanged();
    };
    this.pdt = (t, i, e) => {
      this.OnAttributeChanged();
    };
    this.vdt = (t, i, e) => {
      this.OnMaxAttributeChanged();
    };
  }
  SetVisible(t, i = 0) {
    var e = this.GetVisible();
    this.VisibleState = VisibleStateUtil_1.VisibleStateUtil.SetVisible(this.VisibleState, t, i);
    var i = this.GetVisible();
    if (e !== i || this.GetActive() !== i) {
      this.SetActive(t);
    }
  }
  GetVisible() {
    return VisibleStateUtil_1.VisibleStateUtil.GetVisible(this.VisibleState);
  }
  InitData(t, i) {
    this.RoleData = t;
    this.Config = i;
    this.PlayIncreaseEffect = i.PlayIncreaseEffect;
    this.AttributeComponent = this.RoleData.AttributeComponent;
    this.TagComponent = this.RoleData.GameplayTagComponent;
    this.AttributeId = i.AttributeId;
    this.MaxAttributeId = CharacterAttributeTypes_1.attributeIdsWithMax.get(this.AttributeId) ?? 0;
  }
  InitByPath(t, i) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "加载头像能量条", ["path", i]);
    }
    this.CreateByPathAsync(i, t);
  }
  ChangeParent(t) {
    if (this.ParentUiItem !== t) {
      this.ParentUiItem = t;
      this.GetOriginalItem().SetUIParent(t, true);
    }
  }
  Tick(t) {
    if (this.IsShowOrShowing && this.PercentMachine.Update(t)) {
      this.OnBarPercentChanged();
    }
  }
  OnStart() {
    super.OnStart();
    this.PercentMachine.Init(this.GetTargetAttributePercent(), 0, 400, this.TargetPercentChanged);
  }
  OnBeforeShow() {
    this.AddEvents();
    if (this.GetTargetAttributePercent() !== this.PercentMachine.GetTargetPercent()) {
      this.PercentMachine.SetTargetPercent(this.GetTargetAttributePercent());
      this.OnBarPercentChanged();
    }
  }
  OnBeforeHide() {
    this.RemoveEvents();
  }
  OnBeforeDestroy() {
    this.kYe();
    this.Xcd();
    this.ClearAllTweenAnim();
  }
  AddEvents() {
    this.ListenForAttributeChanged(this.AttributeId, this.pdt);
    this.ListenForAttributeChanged(this.MaxAttributeId, this.vdt);
  }
  RemoveEvents() {
    this.RemoveListenAttributeChanged(this.AttributeId, this.pdt);
    this.RemoveListenAttributeChanged(this.MaxAttributeId, this.vdt);
  }
  OnAttributeChanged() {
    this.PercentMachine.SetTargetPercent(this.GetTargetAttributePercent());
    this.OnBarPercentChanged();
  }
  OnMaxAttributeChanged() {
    this.PercentMachine.SetTargetPercent(this.GetTargetAttributePercent());
    this.OnBarPercentChanged();
  }
  OnTargetPercentChanged() {}
  OnBarPercentChanged() {}
  GetTargetAttributePercent() {
    var t = this.AttributeComponent.GetCurrentValue(this.AttributeId);
    var i = this.AttributeComponent.GetCurrentValue(this.MaxAttributeId);
    let e = i > 0 ? t / i : 0;
    return e;
  }
  ListenForAttributeChanged(t, i) {
    var e = this.RoleData?.AttributeComponent;
    if (e) {
      e.AddListener(t, i);
      this.GYe.set(t, i);
    }
  }
  RemoveListenAttributeChanged(t, i) {
    var e = this.AttributeComponent;
    if (e) {
      e.RemoveListener(t, i);
      this.GYe.delete(t);
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
  ListenForTagAddOrRemoveChanged(t, i) {
    var e = this.TagComponent;
    if (e) {
      e = e.ListenForTagAddOrRemove(t, i);
      this.TagTaskMap ||= new Map();
      this.TagTaskMap.set(t, e);
    }
  }
  RemoveListenTagAddOrRemove(t) {
    this.TagTaskMap?.get(t)?.EndTask();
    this.TagTaskMap?.delete(t);
  }
  Xcd() {
    if (this.TagTaskMap) {
      for (const t of this.TagTaskMap.values()) {
        t.EndTask();
      }
      this.TagTaskMap.clear();
    }
  }
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
}
exports.HeadIconEnergyBarBase = HeadIconEnergyBarBase;
//# sourceMappingURL=HeadIconEnergyBarBase.js.map