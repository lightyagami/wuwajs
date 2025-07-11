"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssRankView = exports.DangoAbyssRankData = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const DangoAbyssRankItem_1 = require("./DangoAbyssRankItem");
const CD = 1000;
class DangoAbyssRankData {
  constructor() {
    this.OpenChallengeId = 0;
    this.DangoAbyssData = [];
  }
}
exports.DangoAbyssRankData = DangoAbyssRankData;
class DangoAbyssRankView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.yUc = undefined;
    this.SUc = undefined;
    this.bj_ = 0;
    this.MUc = 0;
    this.EUc = 0;
    this.Isc = undefined;
    this.Tsc = undefined;
    this.Mt1 = 0;
    this.f4_ = undefined;
    this.g4_ = undefined;
    this.A5e = () => {
      if (!(Date.now() - this.Mt1 < CD)) {
        this.Mt1 = Date.now();
        this.Et1();
      }
      return false;
    };
    this.AMo = () => {
      this.CloseMe();
    };
    this.bsc = () => {
      return new DangoAbyssRankItem_1.DangoAbyssRankItem(false);
    };
    this.IUc = t => {
      this.bj_ = 0;
      this.TUc();
      this.Psc(false);
    };
    this.bUc = t => {
      this.bj_ = 1;
      this.TUc();
      this.Psc(this.bj_ === 1);
    };
    this.LUc = () => {
      this.MUc = Math.max(this.MUc - 1, 0);
      this.Svt();
      this.Olt();
      this.Psc(this.bj_ === 1, () => {
        this.g4_?.Play();
      });
      this.xsc();
    };
    this.wUc = () => {
      this.MUc = Math.min(this.MUc + 1, this.EUc);
      this.Svt();
      this.Olt();
      this.Psc(this.bj_ === 1, () => {
        this.f4_?.Play();
      });
      this.xsc();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIExtendToggle], [2, UE.UIText], [3, UE.UILoopScrollViewComponent], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UIExtendToggle], [10, UE.UIItem]];
    this.BtnBindInfo = [[0, this.IUc], [1, this.bUc], [5, this.LUc], [6, this.wUc], [7, this.AMo]];
  }
  GetLoopAudioEventSwitch() {
    return !ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance();
  }
  async OnBeforeStartAsync() {
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentOpenAbyssActivityData()?.Id ?? 0;
    if (t > 0) {
      await ControllerHolder_1.ControllerHolder.DangoAbyssController.RequestAbyssRankList(t);
      await ControllerHolder_1.ControllerHolder.DangoAbyssController.RequestAbyssSelfRank(t);
    }
    await this.Lsc();
    this.Rsc();
    this.GetExtendToggle(9)?.CanExecuteChange.Bind(this.A5e);
    var i = this.GetItem(10)?.GetOwner()?.K2_GetComponentsByClass(UE.UIInturnAnimController.StaticClass());
    if (i) {
      for (let t = 0; t < i.Num(); t++) {
        var s = i.Get(t);
        if (s.AnimName === "PreRight") {
          this.f4_ = s;
          this.f4_.PlayFromIndex = 1;
        }
        if (s.AnimName === "PreLeft") {
          this.g4_ = s;
          this.g4_.PlayFromIndex = 1;
        }
      }
    }
  }
  async Et1() {
    var t = this.yUc.DangoAbyssData[this.MUc].GetConfig().Id;
    var i = ModelManager_1.ModelManager.DangoAbyssModel.GetChallengeAnonymousNameState(t);
    if (await ControllerHolder_1.ControllerHolder.DangoAbyssController.RequestSetAbyssShowName(t, !i)) {
      this.xsc();
      this.Psc(this.bj_ === 1);
    }
  }
  async Lsc() {
    this.Tsc = new DangoAbyssRankItem_1.DangoAbyssRankItem(true);
    await this.Tsc.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
  }
  Rsc() {
    this.Isc = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(3), this.GetItem(4).GetOwner(), this.bsc);
  }
  TUc() {
    var t = this.bj_ === 0 ? 1 : 0;
    this.GetExtendToggle(0)?.SetToggleState(t);
    var t = this.bj_ === 1 ? 1 : 0;
    this.GetExtendToggle(1)?.SetToggleState(t);
  }
  Svt() {
    var t = this.MUc > 0;
    this.GetButton(5)?.RootUIComp.SetUIActive(t);
    var t = this.MUc < this.EUc;
    this.GetButton(6)?.RootUIComp.SetUIActive(t);
  }
  OnBeforeShow() {
    this.yUc = this.OpenParam;
    this.SUc = ModelManager_1.ModelManager.DangoAbyssModel.GetChallengeRankInfo();
    this.EUc = this.yUc.DangoAbyssData.length - 1;
    var i = this.yUc.DangoAbyssData.length;
    for (let t = 0; t < i; t++) {
      if (this.yUc.DangoAbyssData[t].GetConfig()?.Id === this.yUc.OpenChallengeId) {
        this.MUc = t;
        break;
      }
    }
    this.RUc();
    this.Psc(this.bj_ === 1);
    this.Olt();
    this.Svt();
    this.xsc();
  }
  xsc() {
    var t = this.GetExtendToggle(9);
    var i = this.yUc.DangoAbyssData[this.MUc].GetConfig().Id;
    var i = ModelManager_1.ModelManager.DangoAbyssModel.GetChallengeAnonymousNameState(i);
    t.SetToggleStateForce(i ? 0 : 1);
  }
  RUc() {
    var t = this.yUc.DangoAbyssData[this.MUc].GetConfig().Id;
    this.SUc?.RefreshAllPassDataRank(t);
    var t = this.SUc.IsOwnSingleBestScore(t);
    this.bj_ = t ? 0 : 1;
    this.TUc();
  }
  Olt() {
    var t = this.yUc.DangoAbyssData[this.MUc].GetConfig().Title;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t);
  }
  async Psc(t, i = undefined) {
    var s = this.yUc.DangoAbyssData[this.MUc].GetConfig().Id;
    this.SUc?.RefreshAllPassDataRank(s);
    var s = this.SUc.GetRankDataListByOnlineType(t);
    var e = s.length > 0;
    this.Isc.SetTargetRootComponentActive(e);
    if (s.length > 0) {
      var h = new Array();
      for (const r of s) {
        const a = new DangoAbyssRankItem_1.DangoRankItemData();
        a.AbyssChallengeInfo = r;
        h.push(a);
      }
      await this.Isc.RefreshByDataAsync(h);
      i?.();
    }
    e = this.SUc.GetSelfRankDataByTabType(t);
    const a = new DangoAbyssRankItem_1.DangoRankItemData();
    a.AbyssChallengeInfo = e;
    this.Tsc.Refresh(a, false, 0, false);
  }
}
exports.DangoAbyssRankView = DangoAbyssRankView;
//# sourceMappingURL=DangoAbyssRankView.js.map