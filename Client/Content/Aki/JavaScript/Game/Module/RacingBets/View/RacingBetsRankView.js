"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsRankView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const RacingBetsController_1 = require("../RacingBetsController");
const RacingBetsRankItem_1 = require("./Item/RacingBetsRankItem");
class RacingBetsRankView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.de1 = undefined;
    this.me1 = undefined;
    this.g$1 = false;
    this.C$1 = 0;
    this.Nn1 = () => {
      return new RacingBetsRankItem_1.RacingBetsRankItem();
    };
    this.Jvt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIArtText], [5, UE.UITexture], [6, UE.UIText], [7, UE.UIText], [8, UE.UIText], [9, UE.UIButtonComponent], [10, UE.UIItem], [11, UE.UIText], [12, UE.UIText]];
    this.BtnBindInfo = [[9, this.Jvt]];
  }
  OnStart() {
    this.me1 = this.GetLoopScrollViewComponent(0).RootUIComp;
    this.de1 = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.Nn1);
  }
  OnBeforeShow() {
    this.Og();
    this.GetLoopScrollViewComponent(0).Content.GetComponentByClass(UE.UIInturnAnimController.StaticClass())?.Play();
    this.C$1 = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData().GetNextRankUpdateTime();
  }
  OnTick(i) {
    if (this.C$1 < 0) {
      this.GetText(12)?.SetUIActive(false);
    } else {
      const t = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
      var e = TimeUtil_1.TimeUtil.GetServerTime();
      if (this.C$1 - e >= 0) {
        this.g$1 = false;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), "Dango_RankPage_Countdown", TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(this.C$1 - e)?.CountDownText ?? "");
      } else if (!this.g$1) {
        RacingBetsController_1.RacingBetsController.RacingBetsRankRequest(t.Id, () => {
          this.Og();
          this.C$1 = t.GetNextRankUpdateTime();
        });
        this.g$1 = true;
      }
      this.GetText(12)?.SetUIActive(true);
    }
  }
  Og() {
    var i = ModelManager_1.ModelManager.RacingBetsModel.GetRankData();
    var e = i.length;
    this.GetItem(10).SetUIActive(e === 0);
    this.me1?.SetUIActive(e > 0);
    if (e > 0) {
      this.de1.RefreshByData(i);
    }
    this.Ce1();
  }
  Ce1() {
    var i;
    var e;
    var t = ModelManager_1.ModelManager.RacingBetsModel.GetSelfRank();
    if (t) {
      this.GetText(6).SetText(t.Name);
      this.GetText(7).SetText("" + t.HitNum);
      this.GetText(8).SetText("" + t.CashNum);
      i = this.GetTexture(5);
      if ((e = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(t.HeadIcon)) !== undefined) {
        this.SetTextureShowUntilLoaded(e.GetRoleHeadIconCircle(), i);
      }
      e = t?.RankStatus;
      this.GetItem(2)?.SetUIActive(e === Protocol_1.Aki.Protocol.R8c.cJ_);
      this.GetItem(3)?.SetUIActive(e === Protocol_1.Aki.Protocol.R8c.Proto_UnRank);
      this.GetText(11)?.SetUIActive(false);
      if (e === Protocol_1.Aki.Protocol.R8c.Proto_Top1) {
        this.GetText(11)?.SetUIActive(true);
        this.GetText(11)?.ShowTextNew("Dango_RankPage_Top1Percent");
      } else if (e === Protocol_1.Aki.Protocol.R8c.Proto_Top50) {
        this.GetText(11)?.SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), "Dango_RankPage_Top50Percent", t.RankNum);
      } else if (e === Protocol_1.Aki.Protocol.R8c.cJ_) {
        this.GetText(11)?.SetUIActive(false);
        this.GetArtText(4)?.SetText(t.RankNum.toString());
      }
    } else {
      this.GetItem(2)?.SetUIActive(false);
      this.GetItem(3)?.SetUIActive(true);
      this.GetText(11)?.SetUIActive(false);
    }
  }
}
exports.RacingBetsRankView = RacingBetsRankView;
//# sourceMappingURL=RacingBetsRankView.js.map