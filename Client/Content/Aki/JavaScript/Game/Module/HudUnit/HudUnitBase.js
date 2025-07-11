"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HudUnitBase = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const UiLayer_1 = require("../../Ui/UiLayer");
const VisibleStateUtil_1 = require("../BattleUi/VisibleStateUtil");
class HudUnitBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ResourceId = undefined;
    this.VisibleState = 0;
    this.TweenAnimMap = undefined;
  }
  async Initialize(i, t, e) {
    this.ResourceId = i;
    e = UiLayer_1.UiLayer.GetBattleViewUnit(e ? 3 : 1);
    if (t) {
      await this.CreateThenShowByResourceIdAsync(i, e, true);
    } else {
      await this.CreateByResourceIdAsync(i, e, true);
    }
  }
  Tick(i) {}
  AfterTick(i) {}
  SetVisible(i, t = 0) {
    var e = this.GetVisible();
    this.VisibleState = VisibleStateUtil_1.VisibleStateUtil.SetVisible(this.VisibleState, i, t);
    var t = this.GetVisible();
    if (e !== t || this.GetActive() !== t) {
      this.SetActive(i);
    }
  }
  GetVisible() {
    return VisibleStateUtil_1.VisibleStateUtil.GetVisible(this.VisibleState);
  }
  OnBeforeDestroy() {
    this.TweenAnimMap?.clear();
  }
  SetAnchorOffset(i, t) {
    if (this.RootItem) {
      this.RootItem.SetAnchorOffsetX(i);
      this.RootItem.SetAnchorOffsetY(t);
    }
  }
  InitTweenAnim(i) {
    var t = [];
    var e = this.GetItem(i).GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    var s = e.Num();
    for (let i = 0; i < s; i++) {
      t.push(e.Get(i));
    }
    this.TweenAnimMap ||= new Map();
    this.TweenAnimMap.set(i, t);
  }
  PlayTweenAnim(i) {
    i = this.TweenAnimMap.get(i);
    if (i) {
      for (const t of i) {
        t.Play();
      }
    }
  }
  StopTweenAnim(i) {
    i = this.TweenAnimMap.get(i);
    if (i) {
      for (const t of i) {
        t.Stop();
      }
    }
  }
}
exports.HudUnitBase = HudUnitBase;
//# sourceMappingURL=HudUnitBase.js.map