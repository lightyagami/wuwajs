"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DangoAbyssRankView = exports.DangoAbyssRankData = void 0;
const UE = require("ue"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  DangoAbyssRankItem_1 = require("./DangoAbyssRankItem"),
  CD = 1e3;
class DangoAbyssRankData {
  constructor() {
    this.OpenChallengeId = 0, this.DangoAbyssData = []
  }
}
exports.DangoAbyssRankData = DangoAbyssRankData;
class DangoAbyssRankView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.yUc = void 0, this.SUc = void 0, this.bj_ = 0, this.MUc = 0, this.EUc = 0, this.Isc = void 0, this.Tsc = void 0, this.rt1 = 0, this.f4_ = void 0, this.g4_ = void 0, this.A5e = () => (Date.now() - this.rt1 < CD || (this.rt1 = Date.now(), this.ot1()), !1), this.AMo = () => {
      this.CloseMe()
    }, this.bsc = () => {
      return new DangoAbyssRankItem_1.DangoAbyssRankItem(!1)
    }, this.IUc = t => {
      this.bj_ = 0, this.TUc(), this.Psc(!1)
    }, this.bUc = t => {
      this.bj_ = 1, this.TUc(), this.Psc(1 === this.bj_)
    }, this.LUc = () => {
      this.MUc = Math.max(this.MUc - 1, 0), this.Svt(), this.Olt(), this.Psc(1 === this.bj_, () => {
        this.g4_?.Play()
      }), this.xsc()
    }, this.wUc = () => {
      this.MUc = Math.min(this.MUc + 1, this.EUc), this.Svt(), this.Olt(), this.Psc(1 === this.bj_, () => {
        this.f4_?.Play()
      }), this.xsc()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIExtendToggle],
      [2, UE.UIText],
      [3, UE.UILoopScrollViewComponent],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UIItem],
      [9, UE.UIExtendToggle],
      [10, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.IUc],
      [1, this.bUc],
      [5, this.LUc],
      [6, this.wUc],
      [7, this.AMo]
    ]
  }
  GetLoopAudioEventSwitch() {
    return !ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance()
  }
  async OnBeforeStartAsync() {
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentOpenAbyssActivityData()?.Id ?? 0,
      i = (0 < t && (await ControllerHolder_1.ControllerHolder.DangoAbyssController.RequestAbyssRankList(t), await ControllerHolder_1.ControllerHolder.DangoAbyssController.RequestAbyssSelfRank(t)), await this.Lsc(), this.Rsc(), this.GetExtendToggle(9)?.CanExecuteChange.Bind(this.A5e), this.GetItem(10)?.GetOwner()?.K2_GetComponentsByClass(UE.UIInturnAnimController.StaticClass()));
    if (i)
      for (let t = 0; t < i.Num(); t++) {
        var s = i.Get(t);
        "PreRight" === s.AnimName && (this.f4_ = s, this.f4_.PlayFromIndex = 1), "PreLeft" === s.AnimName && (this.g4_ = s, this.g4_.PlayFromIndex = 1)
      }
  }
  async ot1() {
    var t = this.yUc.DangoAbyssData[this.MUc].GetConfig().Id,
      i = ModelManager_1.ModelManager.DangoAbyssModel.GetChallengeAnonymousNameState(t);
    await ControllerHolder_1.ControllerHolder.DangoAbyssController.RequestSetAbyssShowName(t, !i) && (this.xsc(), this.Psc(1 === this.bj_))
  }
  async Lsc() {
    this.Tsc = new DangoAbyssRankItem_1.DangoAbyssRankItem(!0), await this.Tsc.CreateThenShowByActorAsync(this.GetItem(8).GetOwner())
  }
  Rsc() {
    this.Isc = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(3), this.GetItem(4).GetOwner(), this.bsc)
  }
  TUc() {
    var t = 0 === this.bj_ ? 1 : 0,
      t = (this.GetExtendToggle(0)?.SetToggleState(t), 1 === this.bj_ ? 1 : 0);
    this.GetExtendToggle(1)?.SetToggleState(t)
  }
  Svt() {
    var t = 0 < this.MUc,
      t = (this.GetButton(5)?.RootUIComp.SetUIActive(t), this.MUc < this.EUc);
    this.GetButton(6)?.RootUIComp.SetUIActive(t)
  }
  OnBeforeShow() {
    this.yUc = this.OpenParam, this.SUc = ModelManager_1.ModelManager.DangoAbyssModel.GetChallengeRankInfo(), this.EUc = this.yUc.DangoAbyssData.length - 1;
    var i = this.yUc.DangoAbyssData.length;
    for (let t = 0; t < i; t++)
      if (this.yUc.DangoAbyssData[t].GetConfig()?.Id === this.yUc.OpenChallengeId) {
        this.MUc = t;
        break
      } this.RUc(), this.Psc(1 === this.bj_), this.Olt(), this.Svt(), this.xsc()
  }
  xsc() {
    var t = this.GetExtendToggle(9),
      i = this.yUc.DangoAbyssData[this.MUc].GetConfig().Id,
      i = ModelManager_1.ModelManager.DangoAbyssModel.GetChallengeAnonymousNameState(i);
    t.SetToggleStateForce(i ? 0 : 1)
  }
  RUc() {
    var t = this.yUc.DangoAbyssData[this.MUc].GetConfig().Id,
      t = (this.SUc?.RefreshAllPassDataRank(t), this.SUc.IsOwnSingleBestScore(t));
    this.bj_ = t ? 0 : 1, this.TUc()
  }
  Olt() {
    var t = this.yUc.DangoAbyssData[this.MUc].GetConfig().Title;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t)
  }
  async Psc(t, i = void 0) {
    var s = this.yUc.DangoAbyssData[this.MUc].GetConfig().Id,
      s = (this.SUc?.RefreshAllPassDataRank(s), this.SUc.GetRankDataListByOnlineType(t)),
      e = 0 < s.length;
    if (this.Isc.SetTargetRootComponentActive(e), 0 < s.length) {
      var h = new Array;
      for (const r of s) {
        const a = new DangoAbyssRankItem_1.DangoRankItemData;
        a.AbyssChallengeInfo = r, h.push(a)
      }
      await this.Isc.RefreshByDataAsync(h), i?.()
    }
    e = this.SUc.GetSelfRankDataByTabType(t);
    const a = new DangoAbyssRankItem_1.DangoRankItemData;
    a.AbyssChallengeInfo = e, this.Tsc.Refresh(a, !1, 0, !1)
  }
}
exports.DangoAbyssRankView = DangoAbyssRankView;
//# sourceMappingURL=DangoAbyssRankView.js.map