"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapAreaRewardPanel = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const CommonRewardPopup_1 = require("../../Common/CommonRewardPopup");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MapAreaRewardItem_1 = require("./MapAreaRewardItem");
const PROGRESS_ANIMATE_TIME = 0.5;
const REWARD_WIDTH = 120;
class MapAreaRewardPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.bOl = undefined;
    this.H3e = undefined;
    this.t2t = undefined;
    this.qte = 0;
    this.i2t = 0;
    this.o2t = 0;
    this.r2t = false;
    this.n2t = -0;
    this.s2t = [];
    this.qOl = new Map();
    this.h2t = 0;
    this.l2t = 0;
    this._2t = 0;
    this.u2t = 0;
    this.S2t = undefined;
    this.d2t = () => {
      var t = this.GetSprite(2);
      var i = this.GetItem(1);
      var s = this.GetItem(5);
      var h = this.GetSprite(6);
      LguiUtil_1.LguiUtil.CopyItem(h, s);
      LguiUtil_1.LguiUtil.CopyItem(t, i);
      return new MapAreaRewardItem_1.MapAreaRewardItem(this.bOl.GetRewardCallback, this.BOl);
    };
    this.BOl = t => {
      this.S2t.Refresh(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UISprite], [3, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UISprite]];
  }
  OnStart() {
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.d2t);
    var t = this.GetItem(0);
    this.l2t = t.GetWidth();
    this.t2t = this.GetItem(0);
  }
  OnBeforeDestroy() {
    this.t2t = undefined;
    this.s2t = undefined;
    this.S2t = undefined;
  }
  Init(t) {
    this.ChangeParamData(t);
  }
  InitCommonRewardPopup(t) {
    this.S2t = new CommonRewardPopup_1.CommonRewardPopup(t);
  }
  ChangeParamData(i) {
    this.bOl = i;
    this.qte = i.InitValue;
    this.h2t = 0;
    this.qOl.clear();
    for (let t = 0; t < i.RewardDataList.length; t++) {
      var s = i.RewardDataList[t];
      if (s.State !== 2) {
        this.h2t++;
      }
      this.qOl.set(s.Id, t);
    }
    this.H3e.RefreshByData(i.RewardDataList);
    this.GetSprite(2).SetUIActive(false);
    this.GetSprite(6).SetUIActive(false);
    if (i.RewardDataList.length === 0) {
      this.RootItem?.SetUIActive(false);
    } else {
      this._2t = REWARD_WIDTH;
      this.u2t = (this.l2t - this._2t * (i.RewardDataList.length - 1)) / i.RewardDataList.length;
      this.C2t(this.qte / i.MaxValue);
    }
  }
  OnTickRefresh(t) {
    if (this.r2t && (this.n2t += t * TimeUtil_1.TimeUtil.Millisecond, t = MathUtils_1.MathUtils.Clamp(this.n2t / PROGRESS_ANIMATE_TIME, 0, 1), this.qte = MathUtils_1.MathUtils.Lerp(this.o2t, this.i2t, t), t = MathUtils_1.MathUtils.Clamp(this.qte / this.bOl.MaxValue, 0, 1), this.f2t(this.qte), this.C2t(t), this.qte === this.i2t)) {
      this.p2t();
    }
  }
  RefreshProgressBarDynamic(i) {
    if (!(i <= this.qte)) {
      if (this.r2t) {
        this.p2t();
      }
      this.s2t = [];
      this.bOl.RewardDataList.forEach(t => {
        if (this.qte < t.Goal && t.Goal <= i) {
          this.s2t?.push([t.Goal, t.Id]);
        }
      });
      this.v2t(i);
    }
  }
  UpdateRewardIds(t) {
    for (const i of t) {
      this.sqe(i);
    }
  }
  OnBeforeHide() {
    this.S2t?.SetActive(false);
  }
  g2t() {
    let t = 0;
    for (const i of this.H3e.GetLayoutItemList()) {
      i.RefreshSelf();
      if (i.DailyActiveState !== 2) {
        t++;
      }
    }
    this.h2t = t;
  }
  sqe(t) {
    t = this.qOl.get(t);
    if (t !== undefined) {
      this.H3e.GetLayoutItemByIndex(t)?.RefreshSelf();
    }
  }
  f2t(t) {
    var i;
    if (this.s2t.length !== 0 && (i = this.s2t[0])[0] <= t) {
      this.sqe(i[1]);
      this.s2t.shift();
      this.h2t++;
    }
  }
  C2t(t) {
    var i = this.bOl.RewardDataList.length;
    var s = Math.min(this.h2t, i - 1) * this._2t;
    var i = this.u2t * i * Math.min(t, 1);
    var t = this.l2t - s - i;
    this.t2t.SetStretchRight(t);
  }
  v2t(t) {
    this.i2t = t;
    this.o2t = this.qte;
    this.n2t = 0;
    this.r2t = true;
  }
  p2t() {
    this.r2t = false;
    this.qte = this.i2t;
    var t = MathUtils_1.MathUtils.Clamp(this.i2t / this.bOl.MaxValue, 0, 1);
    this.g2t();
    this.C2t(t);
  }
}
exports.MapAreaRewardPanel = MapAreaRewardPanel;
//# sourceMappingURL=MapAreaRewardPanel.js.map