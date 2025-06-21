"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RacingBetsRankView = void 0;
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  RacingBetsController_1 = require("../RacingBetsController"),
  RacingBetsRankItem_1 = require("./Item/RacingBetsRankItem");
class RacingBetsRankView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this._jc = void 0, this.cjc = void 0, this.DH1 = !1, this.UH1 = 0, this.Sn1 = () => {
      return new RacingBetsRankItem_1.RacingBetsRankItem
    }, this.Jvt = () => {
      this.CloseMe()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIArtText],
      [5, UE.UITexture],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIButtonComponent],
      [10, UE.UIItem],
      [11, UE.UIText],
      [12, UE.UIText]
    ], this.BtnBindInfo = [
      [9, this.Jvt]
    ]
  }
  OnStart() {
    this.cjc = this.GetLoopScrollViewComponent(0).RootUIComp, this._jc = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.Sn1)
  }
  OnBeforeShow() {
    this.Og(), this.GetLoopScrollViewComponent(0).Content.GetComponentByClass(UE.UIInturnAnimController.StaticClass())?.Play(), this.UH1 = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData().GetNextRankUpdateTime()
  }
  OnTick(i) {
    if (this.UH1 < 0) this.GetText(12)?.SetUIActive(!1);
    else {
      const t = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
      var e = TimeUtil_1.TimeUtil.GetServerTime();
      0 <= this.UH1 - e ? (this.DH1 = !1, LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), "Dango_RankPage_Countdown", TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(this.UH1 - e)?.CountDownText ?? "")) : this.DH1 || (RacingBetsController_1.RacingBetsController.RacingBetsRankRequest(t.Id, () => {
        this.Og(), this.UH1 = t.GetNextRankUpdateTime()
      }), this.DH1 = !0), this.GetText(12)?.SetUIActive(!0)
    }
  }
  Og() {
    var i = ModelManager_1.ModelManager.RacingBetsModel.GetRankData(),
      e = i.length;
    this.GetItem(10).SetUIActive(0 === e), this.cjc?.SetUIActive(0 < e), 0 < e && this._jc.RefreshByData(i), this.mjc()
  }
  mjc() {
    var i, e, t = ModelManager_1.ModelManager.RacingBetsModel.GetSelfRank();
    t ? (this.GetText(6).SetText(t.Name), this.GetText(7).SetText("" + t.HitNum), this.GetText(8).SetText("" + t.CashNum), i = this.GetTexture(5), void 0 !== (e = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(t.HeadIcon)) && this.SetTextureShowUntilLoaded(e.GetRoleHeadIconCircle(), i), e = t?.RankStatus, this.GetItem(2)?.SetUIActive(e === Protocol_1.Aki.Protocol.R8c.cJ_), this.GetItem(3)?.SetUIActive(e === Protocol_1.Aki.Protocol.R8c.Proto_UnRank), this.GetText(11)?.SetUIActive(!1), e === Protocol_1.Aki.Protocol.R8c.Proto_Top1 ? (this.GetText(11)?.SetUIActive(!0), this.GetText(11)?.ShowTextNew("Dango_RankPage_Top1Percent")) : e === Protocol_1.Aki.Protocol.R8c.Proto_Top50 ? (this.GetText(11)?.SetUIActive(!0), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), "Dango_RankPage_Top50Percent", t.RankNum)) : e === Protocol_1.Aki.Protocol.R8c.cJ_ && (this.GetText(11)?.SetUIActive(!1), this.GetArtText(4)?.SetText(t.RankNum.toString()))) : (this.GetItem(2)?.SetUIActive(!1), this.GetItem(3)?.SetUIActive(!0), this.GetText(11)?.SetUIActive(!1))
  }
}
exports.RacingBetsRankView = RacingBetsRankView;
//# sourceMappingURL=RacingBetsRankView.js.map