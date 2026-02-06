"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityPreWarmMainView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const LogReportDefine_1 = require("../../../LogReport/LogReportDefine");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivityPreWarmDefine_1 = require("./ActivityPreWarmDefine");
const STAYTIMETHRESHOLD = 1000;
class ActivityPreWarmMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.QYt = undefined;
    this.XYt = undefined;
    this.GZi = undefined;
    this.NZi = undefined;
    this.NHe = 0;
    this.Emm = false;
    this.Imm = 0;
    this.LOe = 0;
    this.Pln = 0;
    this.Do1 = () => {
      this.XYt.Stop();
      this.QYt.SetSelectorOffset(0);
    };
    this.Tmm = i => {
      this.NHe += i;
      this.nOe();
      if (this.UiViewSequence?.HasSequenceNameInPlaying("Switch")) {
        this.UiViewSequence.ReplaySequence("Switch");
      } else {
        this.UiViewSequence?.PlaySequence("Switch");
      }
    };
    this.syd = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("ActivityPreWarm", 87, "点击跳过,设置5倍数");
      }
      this.XYt?.GetPlayTween()?.GetTweener()?.SetSpeed(ActivityPreWarmDefine_1.SKIPTIMESPEED);
      this.RootActor?.GetSequencePlayerByKey("Start01")?.SequencePlayer?.SetPlayRate(ActivityPreWarmDefine_1.SKIPTIMESPEED);
    };
    this.AMo = () => {
      this.CloseMe();
    };
    this.bmm = () => {
      this.Rmm(true);
    };
    this.wmm = () => {
      this.Rmm(false);
    };
    this.Ko1 = () => {
      this.uwm();
      this.Tmm(-1);
    };
    this.Xo1 = () => {
      this.uwm();
      this.Tmm(1);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIText], [3, UE.UITexture], [4, UE.UITexture], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UIButtonComponent], [10, UE.UIButtonComponent], [11, UE.UIButtonComponent], [12, UE.UIButtonComponent], [13, UE.UITexture]];
    this.BtnBindInfo = [[8, this.Ko1], [9, this.Xo1], [10, this.bmm], [11, this.wmm], [12, this.syd]];
  }
  async OnBeforeStartAsync() {
    var i = this.OpenParam;
    this.NHe = i.Id;
    this.Emm = i.IsParsing ?? false;
    this.LOe = i.ActivityId ?? 0;
    if (this.Emm) {
      await this.pah();
    }
  }
  async pah() {
    const t = new CustomPromise_1.CustomPromise();
    var i = ModelManager_1.ModelManager.ActivityPreWarmModel?.GetCollectItemDataById(this.NHe)?.GetParsingMatPath();
    if (i) {
      ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.MaterialInterface, i => {
        this.GetTexture(13)?.SetCustomUIMaterial(i);
        t.SetResult();
      }, 102, this.MemoryTag);
      await t.Promise;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ActivityPreWarm", 87, "获取活动预热收集项解析材质路径失败", ["Id", this.NHe]);
    }
  }
  gCt() {
    this.QYt = this.GetText(5).GetOwner().GetComponentByClass(UE.UIEffectTextAnimation.StaticClass());
    this.XYt = this.GetText(5).GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    this.QYt?.SetSelectorOffset(1);
    this.GZi = (0, puerts_1.toManualReleaseDelegate)(this.Do1);
    this.NZi = this.XYt.GetPlayTween().RegisterOnComplete(this.GZi);
    this.GetText(5).SetUIActive(false);
  }
  P9e() {
    if (this.QYt && this.XYt) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("ActivityPreWarm", 87, "播放打字动画", ["时长", this.Imm]);
      }
      this.QYt.SetSelectorOffset(1);
      this.XYt.GetPlayTween().duration = this.Imm;
      this.XYt.Play();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ActivityPreWarm", 87, "打字机组件未初始化");
    }
  }
  OnStart() {
    this.U3e();
    this.gCt();
  }
  OnBeforeShow() {
    var i;
    var t;
    if (this.Emm) {
      this.PlaySequence("Start01", () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("ActivityPreWarm", 87, "解析动画播放完成");
        }
        this.lqe?.SetCloseBtnActive(true);
        this.GetItem(6)?.SetUIActive(false);
      });
      if (t = this.RootActor?.GetSequencePlayerByKey("Start01")?.SequencePlayer?.GetDuration()) {
        i = t.Time.FrameNumber.Value + t.Time.SubFrame;
        t = t.Rate.Denominator / t.Rate.Numerator;
        this.Imm = i * t;
      }
    } else {
      this.GetItem(6)?.SetUIActive(false);
      this.PlaySequence("Start02");
    }
    this.nOe();
  }
  U3e() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.AMo);
    this.lqe.SetCloseBtnActive(!this.Emm);
  }
  nOe() {
    this.mGe();
    this.Lmm();
    this.RefreshLeftRightBtnState();
    this.Pqe();
    this.Pmm();
    this.Pln = Time_1.Time.Now;
  }
  mGe() {
    var i = ModelManager_1.ModelManager.ActivityPreWarmModel?.GetCollectItemDataById(this.NHe);
    this.TrySetSpriteByPath(i?.GetTitleNumIconPath(), this.GetSprite(1), false);
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(2), i?.GetTitle());
  }
  Pqe() {
    var i = ModelManager_1.ModelManager.ActivityPreWarmModel?.GetCollectItemDataById(this.NHe);
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(5), i?.GetDesc());
    this.GetText(5)?.SetUIActive(true);
    if (this.Emm) {
      this.P9e();
    }
  }
  Lmm() {
    var i = ModelManager_1.ModelManager.ActivityPreWarmModel?.GetCollectItemDataById(this.NHe);
    this.TrySetTextureByPath(i?.GetBgPath(), this.GetTexture(3));
  }
  Pmm() {
    var i;
    if (this.Emm) {
      i = ModelManager_1.ModelManager.ActivityPreWarmModel?.GetCollectItemDataById(this.NHe);
      this.TrySetTextureByPath(i?.GetShadowIconPath(), this.GetTexture(4));
    }
  }
  Rmm(i) {
    this.GetButton(10)?.RootUIComp.SetUIActive(!i);
    this.GetButton(11)?.RootUIComp.SetUIActive(i);
    this.UiViewSequence?.StopSequenceByKey(i ? "InfoHide" : "InfoShow");
    this.UiViewSequence?.PlaySequence(i ? "InfoShow" : "InfoHide");
  }
  RefreshLeftRightBtnState() {
    if (this.Emm) {
      this.GetButton(8)?.RootUIComp.SetUIActive(false);
      this.GetButton(9)?.RootUIComp.SetUIActive(false);
    } else {
      this.GetButton(8)?.RootUIComp.SetUIActive(this.NHe > 1);
      this.GetButton(9)?.RootUIComp.SetUIActive(this.NHe < (ModelManager_1.ModelManager.ActivityPreWarmModel?.GetLastFinishedId() ?? 1));
    }
  }
  OnBeforeDestroy() {
    if (this.NZi) {
      this.XYt?.GetPlayTween()?.UnregisterOnComplete(this.NZi);
      this.NZi = undefined;
    }
    (0, puerts_1.releaseManualReleaseDelegate)(this.Do1);
    this.GZi = undefined;
    this.uwm();
  }
  uwm() {
    var i;
    var t;
    if (this.Pln !== 0 && !((i = Time_1.Time.Now - this.Pln) <= STAYTIMETHRESHOLD)) {
      (t = new LogReportDefine_1.ActivityPreWarmStayLogEvent()).i_activity_id = this.LOe;
      t.i_chapter_id = this.NHe;
      t.i_cost_time = i * TimeUtil_1.TimeUtil.Millisecond;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(t);
    }
  }
}
exports.ActivityPreWarmMainView = ActivityPreWarmMainView;
//# sourceMappingURL=ActivityPreWarmMainView.js.map