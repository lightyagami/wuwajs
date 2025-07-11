"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonResultView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../Util/LguiUtil");
const CommonItemSimpleGrid_1 = require("../ItemGrid/CommonItemSimpleGrid");
const CommonResultButton_1 = require("./CommonResultButton");
const TIMERGAP = 1000;
class CommonResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ButtonMap = undefined;
    this.ButtonItemMap = undefined;
    this._bt = new Array();
    this.RewardLayout = undefined;
    this.ubt = undefined;
    this.cbt = 0;
    this.mbt = (t, e, i) => {
      e = new CommonItemSimpleGrid_1.CommonItemSimpleGrid(e.GetOwner());
      e.RefreshItem(t[0].ItemId, t[1]);
      return {
        Key: i,
        Value: e
      };
    };
    this.j3 = () => {
      this._bt.forEach(t => {
        t.DoTimerCallBack(this.cbt);
      });
      this.cbt++;
      this.OnTimer();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UISprite]];
  }
  OnStart() {
    this.GetText(2).SetUIActive(false);
    this.SetResultText("ChallengeGetReward");
    this.GetItem(3).SetUIActive(false);
    this.ButtonMap = new Map();
    this.ButtonItemMap = new Map();
    this.SetupButtonFormat();
    this.RewardLayout = new GenericLayoutNew_1.GenericLayoutNew(this.GetHorizontalLayout(0), this.mbt);
    this.P3e();
  }
  OnBeforeDestroy() {
    this.jm();
    this.dbt();
    this.RewardLayout.ClearChildren();
    this.RewardLayout = undefined;
  }
  SetupButtonFormat() {}
  Cbt(t) {
    var e = this.GetItem(3);
    var i = this.GetItem(4);
    var e = LguiUtil_1.LguiUtil.CopyItem(e, i);
    var i = new CommonResultButton_1.CommonResultButton(e);
    i.SetData(t);
    return i;
  }
  dbt() {
    for (const t of this.ButtonMap.values()) {
      t.Destroy();
    }
    this.ButtonMap.clear();
    this.ButtonItemMap.clear();
  }
  RefreshButtonList(e) {
    this._bt.forEach((t, e) => {
      t.ResetData();
      t.SetActive(false);
    });
    var i;
    var s = e.length;
    var r = this._bt;
    var o = r.length;
    for (let t = 0; t < s; t++) {
      (t < o ? ((i = r[t]).SetData(e[t]), i) : (i = this.Cbt(e[t]), this._bt.push(i), i)).SetActive(true);
    }
    this._bt.forEach(t => {
      t.DoRefreshCallBack();
    });
  }
  SetResultText(t) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), t);
  }
  SetTipsText(t) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), t);
    this.GetText(2).SetUIActive(true);
  }
  P3e() {
    this.ubt = TimerSystem_1.GameplayTimerSystem.Forever(this.j3, TIMERGAP);
  }
  OnTimer() {}
  jm() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.ubt)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.ubt);
    }
    this.ubt = undefined;
  }
}
exports.CommonResultView = CommonResultView;
//# sourceMappingURL=CommonResultView.js.map