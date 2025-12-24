"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrastructureMainView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const MediaPlayer_1 = require("../../../Common/MediaPlayer");
const InfrastructureController_1 = require("../../InfrastructureController");
const InfrastructureDefine_1 = require("../../InfrastructureDefine");
const InfrastructureFireExpPanel_1 = require("./InfrastructureFireExpPanel");
const InfrastructureMissionPanel_1 = require("./InfrastructureMissionPanel");
class InfrastructureMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.dqc = new PopupCaptionItem_1.PopupCaptionItem();
    this.Xut = new InfrastructureMissionPanel_1.InfrastructureMissionPanel();
    this.Ujf = new InfrastructureMissionPanel_1.InfrastructureMissionPanel();
    this.v4m = new InfrastructureFireExpPanel_1.InfrastructureFireExpPanel();
    this.h$m = new ButtonItem_1.ButtonItem();
    this.l$m = new ButtonItem_1.ButtonItem();
    this._$m = new ButtonItem_1.ButtonItem();
    this.XWf = false;
    this.YWf = false;
    this.Hea = undefined;
    this.wNo = undefined;
    this.hJ = ResourceSystem_1.ResourceSystem.InvalidId;
    this.y4m = () => {
      UiManager_1.UiManager.OpenView("InfrLimitTaskMainView", {
        OpenSource: 1
      });
    };
    this.S4m = () => {
      UiManager_1.UiManager.OpenView("InfrastructureShopMainView", {
        OpenSource: 1
      });
    };
    this.M4m = () => {
      UiManager_1.UiManager.OpenView("InfrArchiveMainView", {
        OpenSource: 1
      });
    };
    this.E4m = e => {
      this.v4m.UpdateExp();
    };
    this.I4m = () => {
      UiManager_1.UiManager.OpenView("InfrRoadNetworkMainView");
    };
    this.yct = e => {
      if (e === "Refresh" || e === "Completed") {
        UiManager_1.UiManager.OpenView("InfrastructureSettleView", this.OpenParam.SettleInfo);
      }
    };
    this.M5f = () => {
      this.c$m();
    };
    this.E5f = () => {
      this.hjm();
    };
    this.eJf = () => {
      this.tJf();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIText], [11, UE.UISprite], [12, UE.UIText], [13, UE.UIItem], [14, UE.UIText], [16, UE.UIButtonComponent], [15, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [20, UE.UIItem], [21, UE.UITexture]];
    this.BtnBindInfo = [[16, this.I4m]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InfrastructureFireExpAdd, this.E4m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshGoods, this.M5f);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InfrastructureActivityTaskDataUpdate, this.E5f);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UIViewPortSizeChanged, this.eJf);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InfrastructureFireExpAdd, this.E4m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshGoods, this.M5f);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InfrastructureActivityTaskDataUpdate, this.E5f);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UIViewPortSizeChanged, this.eJf);
  }
  async OnBeforeStartAsync() {
    this.wNo = new MediaPlayer_1.MediaPlayer(this.GetTexture(21));
    await Promise.all([InfrastructureController_1.InfrastructureController.RequestInfrastructureInfoRequest(), this.T4m(), this.xjf(), this.e7a(), this.b4m(), this.s$m(), this.a$m(), this.u$m(), this.SXf()]);
    var e = ModelManager_1.ModelManager.InfrastructureModel.FireLevel;
    var e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetLevelConfigById(e);
    await Promise.all([this.cQa(), this.wNo.LoadVideoAndPlay(e.VideoName, e.VideoPath, true)]);
  }
  async e7a() {
    await this.dqc.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  async T4m() {
    await this.Xut.CreateByActorAsync(this.GetItem(2).GetOwner());
  }
  async xjf() {
    await this.Ujf.CreateByActorAsync(this.GetItem(20).GetOwner());
  }
  async b4m() {
    await this.v4m.CreateThenShowByActorAsync(this.GetItem(15).GetOwner());
  }
  async cQa() {
    this.dqc.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.dqc.SetHelpCallBack(() => {
      var e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetHelpIdActivity();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e);
    });
    await this.dqc.SetCurrencyItemList([InfrastructureDefine_1.INFR_BATTLE_MATERIAL_ID, InfrastructureDefine_1.INFR_COLLECTION_MATERIAL_ID, InfrastructureDefine_1.INFR_QUEST_MATERIAL_ID]);
  }
  async s$m() {
    await this.h$m.CreateThenShowByActorAsync(this.GetButton(3).GetOwner());
    this.h$m.SetFunction(this.y4m);
  }
  async a$m() {
    await this.l$m.CreateThenShowByActorAsync(this.GetButton(4).GetOwner());
    this.l$m.SetFunction(this.S4m);
  }
  async u$m() {
    await this._$m.CreateThenShowByActorAsync(this.GetButton(5).GetOwner());
    this._$m.SetFunction(this.M4m);
    this._$m.SetTextShowState(false);
  }
  async SXf() {
    const t = new CustomPromise_1.CustomPromise();
    this.X3i();
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("M_VideoTexture");
    this.hJ = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.MaterialInterface, e => {
      this.GetTexture(21).SetCustomUIMaterial(e);
      t.SetResult();
    }, 102, this.MemoryTag);
    await t.Promise;
  }
  X3i() {
    if (this.hJ !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.hJ);
      this.hJ = ResourceSystem_1.ResourceSystem.InvalidId;
    }
  }
  OnStart() {
    this.zWf();
    this.zRf();
    this.w4m();
    this.L4m();
    this.tKf();
  }
  tJf() {
    var e = UiLayer_1.UiLayer.UiRootItem.GetWidth();
    var t = UiLayer_1.UiLayer.UiRootItem.GetHeight();
    var i = CommonParamById_1.configCommonParamById.GetIntArrayConfig("InfMainVideoAspect");
    var i = i[0] / i[1];
    var r = this.GetTexture(21);
    if (e / t < i) {
      r.SetHeight(t);
      r.SetWidth(t * i);
    } else {
      r.SetHeight(e / i);
      r.SetWidth(e);
    }
  }
  OnBeforeShow() {
    this.R4m();
    this.hjm();
    this.c$m();
    this.tKf();
    if (ModelManager_1.ModelManager.InfrastructureModel.NeedHighlightTrackedRoad || this.YWf) {
      this.YWf = false;
      this.Ujf.PlayFocusSequence();
      ModelManager_1.ModelManager.InfrastructureModel.SetNeedHighlightTrackedRoad(false);
    }
    this.tJf();
  }
  OnAfterShow() {
    ModelManager_1.ModelManager.InfrastructureModel.CloseLoadingPanel();
    if (this.XWf) {
      this.XWf = false;
      if (ModelManager_1.ModelManager.InfrastructureModel.FireLevel === ConfigManager_1.ConfigManager.InfrastructureConfig.GetMaxLevel()) {
        this.Hea.PlayLevelSequenceByName("Completed");
      } else {
        this.Hea.PlayLevelSequenceByName("Refresh");
      }
    }
  }
  OnBeforeDestroy() {
    this.wNo?.Clear();
    this.wNo = undefined;
    this.X3i();
  }
  zWf() {
    this.XWf = this.OpenParam?.NeedPlayBuildSuccessSeq ?? false;
    this.YWf = this.OpenParam?.NeedFocusBuildQuest ?? false;
  }
  zRf() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(18));
    this.Hea.BindSequenceCloseEvent(this.yct);
  }
  R4m() {
    var e = ModelManager_1.ModelManager.InfrastructureModel;
    var t = e.FireLevel;
    if (ConfigManager_1.ConfigManager.InfrastructureConfig.GetLevelConfigById(t) && t < ConfigManager_1.ConfigManager.InfrastructureConfig.GetMaxLevel()) {
      this.Xut.Refresh({
        Index: 0
      });
      this.Xut.SetUiActive(true);
    } else {
      this.Xut.SetUiActive(false);
    }
    var t = CommonParamById_1.configCommonParamById.GetIntConfig("InfrTeachStageEndQuestId");
    var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t) === 3;
    if (e.TracedRoadId === 0 && e.RecommendRoadId === 0 || !t) {
      this.Ujf.SetUiActive(false);
    } else {
      this.Ujf.Refresh({
        Index: 1
      });
      this.Ujf.SetUiActive(true);
    }
  }
  w4m() {
    var e = ModelManager_1.ModelManager.InfrastructureModel.FireLevel;
    var t = ModelManager_1.ModelManager.InfrastructureModel.FireExp;
    var i = ConfigManager_1.ConfigManager.InfrastructureConfig.GetLevelConfigById(e);
    var r = ConfigManager_1.ConfigManager.InfrastructureConfig.GetMaxLevel() <= e;
    this.GetItem(9).SetUIActive(!r);
    this.GetItem(13).SetUIActive(r);
    this.GetText(10).ShowTextNew(i.Name);
    if (r) {
      r = new Date(ModelManager_1.ModelManager.InfrastructureModel.FireLevelReachTime * TimeUtil_1.TimeUtil.InverseMillisecond);
      this.GetText(14).SetText(TimeUtil_1.TimeUtil.DateFormat3(r));
    } else {
      r = ConfigManager_1.ConfigManager.InfrastructureConfig.GetLevelConfigById(e + 1);
      e = Math.min(1, (t - i.Exp) / (r.Exp - i.Exp));
      this.GetText(12).SetText(Math.floor(e * 100) + "%");
      this.GetSprite(11).SetFillAmount(e);
    }
  }
  hjm() {
    var e;
    var t = ModelManager_1.ModelManager.InfrastructureModel.GetActivityData();
    if (t) {
      if ((e = t.GetActivityCountDownData()).RemainingTime <= 0) {
        this.GetItem(6).SetUIActive(false);
        this.GetButton(3).RootUIComp.SetUIActive(false);
      } else {
        if (t.EndOpenTime <= 0) {
          this.GetItem(6).SetUIActive(false);
        }
        this.GetText(7).SetText(e.CountDownText ?? "");
        t = (e = t.GetActivityTaskDataList()).filter(e => e.Status === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken).length;
        this.h$m.SetText(t + "/" + e.length);
        this.h$m.BindRedDot("InfrLimitedTask");
      }
    } else {
      this.GetItem(6).SetUIActive(false);
    }
  }
  c$m() {
    var e = ModelManager_1.ModelManager.InfrastructureModel;
    var t = e.GetAllShopCurrencyNum();
    this.l$m.SetText(e.MoneyHistorySpent + "/" + t);
    this.l$m.BindRedDot("InfrShop");
  }
  tKf() {
    this._$m.BindRedDot("InfrArchive");
  }
  L4m() {
    this.v4m.SetOnClickHelpCb(() => {
      var e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetHelpIdRoadProcess();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e);
    });
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0 && e[0] === "Mission" && ((e = Number(e[1])) === 0 || e === 1) && (e = (e === 0 ? this.Xut : this.Ujf).GetRootItem())) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.InfrastructureMainView = InfrastructureMainView;
//# sourceMappingURL=InfrastructureMainView.js.map