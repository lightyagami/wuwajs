"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingBuffProgress = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const Queue_1 = require("../../../../../../Core/Container/Queue");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../../Ui/Base/UiAsyncTask");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const MowingBuffIntroduce_1 = require("./MowingBuffIntroduce");
const MowingBuffUnit_1 = require("./MowingBuffUnit");
class BuffNodeTweenData {
  constructor(i, e) {
    this.Percentage = i;
    this.BuffNodeItem = e;
  }
}
class MowingBuffProgress extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.f9a = [];
    this.u9a = undefined;
    this.ujr = undefined;
    this.Delegate = undefined;
    this.Tweener = undefined;
    this.T6_ = false;
    this.b6_ = 0;
    this.L6_ = 0;
    this.w6_ = new Queue_1.Queue();
    this.OAn = i => {
      var e;
      this.GetSprite(1).SetFillAmount(i);
      if (this.w6_.Size !== 0 && (e = this.w6_.Front) && i >= e.Percentage) {
        e.BuffNodeItem.PlayUnlockSequence();
        this.w6_.Pop();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var i = new MowingBuffIntroduce_1.MowingBuffIntroduce();
    await i.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
    this.u9a = i;
    this.GetItem(3)?.SetUIActive(false);
    this.GetItem(4)?.SetUIActive(false);
    this.ujr = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Delegate = (0, puerts_1.toManualReleaseDelegate)(this.OAn);
  }
  async gDo(i) {
    var e = i % 2 == 0 ? 3 : 4;
    var e = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(e), this.GetHorizontalLayout(2).RootUIComp);
    var s = new MowingBuffUnit_1.MowingBuffUnit();
    await (this.f9a[i] = s).CreateThenShowByActorAsync(e.GetOwner());
  }
  RefreshByCustomData(i) {
    var e = new UiAsyncTask_1.UiAsyncTask("MowingBuffProgress.RefreshByCustomDataAsync", async () => {
      await this.RefreshByCustomDataAsync(i);
    });
    this.RunAsyncTask(e);
  }
  async RefreshByCustomDataAsync(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.CountTextId, ...e.CountTextArgs);
    var i;
    var s;
    var t = e.SuperBuffList;
    if (this.f9a.length < t.length) {
      var r = [];
      for (let i = this.f9a.length; i < t.length; i++) {
        r.push(this.gDo(i));
      }
      await Promise.all(r);
    }
    for ([i, s] of this.f9a.entries()) {
      if (t.length > i) {
        s.RefreshByCustomData(t[i]);
      } else {
        s.SetUiActive(false);
      }
    }
    this.u9a.RefreshByCustomData(e.IntroduceData);
    var a = ModelManager_1.ModelManager.MowingRiskModel;
    var h = a.GetProgressPanelBasicBuffCountRecord();
    var n = e.CurBasicBuffCount;
    if (h === n) {
      this.T6_ = false;
      this.GetSprite(1).SetFillAmount(e.ProgressPercentage);
    } else {
      a.RecordProgressPanelBasicBuffCount(n);
      var o = a.GetProgressOverallPercentage(e.ArtifactId, h);
      var u = e.ProgressPercentage;
      if (MathUtils_1.MathUtils.IsNearlyEqual(o, u)) {
        this.T6_ = false;
        this.GetSprite(1).SetFillAmount(e.ProgressPercentage);
      } else {
        this.R6_();
        this.GetSprite(1).SetFillAmount(o);
        this.T6_ = true;
        this.b6_ = o;
        this.L6_ = u;
        this.w6_.Clear();
        for (let i = 0; i < t.length; i++) {
          var f;
          var U = t[i].ThresholdCount;
          if (h < U && U <= n) {
            U = a.GetProgressOverallPercentage(e.ArtifactId, U);
            f = this.f9a[i];
            U = new BuffNodeTweenData(U, f);
            f.UpdateUnlockState(false);
            this.w6_.Push(U);
          }
        }
      }
    }
  }
  async PlayStartSequenceAsync() {
    await this.ujr.LitePlayAsync("Start", true);
  }
  async PlayProgressTween() {
    if (this.T6_) {
      const i = new CustomPromise_1.CustomPromise();
      this.R6_();
      this.Tweener = UE.LTweenBPLibrary.FloatTo(this.RootItem, this.Delegate, this.b6_, this.L6_, 0.2);
      this.Tweener?.OnCompleteCallBack.Bind(() => {
        i.SetResult(true);
      });
      await i.Promise;
    }
  }
  R6_() {
    if (this.Tweener && this.Tweener.IsValid()) {
      this.Tweener.Kill();
    }
    this.Tweener = undefined;
  }
  OnBeforeDestroy() {
    (0, puerts_1.releaseManualReleaseDelegate)(this.OAn);
    this.R6_();
  }
}
exports.MowingBuffProgress = MowingBuffProgress;
//# sourceMappingURL=MowingBuffProgress.js.map