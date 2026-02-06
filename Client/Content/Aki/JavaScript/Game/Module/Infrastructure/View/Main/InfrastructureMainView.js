"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrastructureMainView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../../Core/Common/Info");
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
    this.zig = new InfrastructureMissionPanel_1.InfrastructureMissionPanel();
    this.O5m = new InfrastructureFireExpPanel_1.InfrastructureFireExpPanel();
    this.sQm = new ButtonItem_1.ButtonItem();
    this.aQm = new ButtonItem_1.ButtonItem();
    this.hQm = new ButtonItem_1.ButtonItem();
    this.Jng = false;
    this.Zng = false;
    this.Hea = undefined;
    this.wNo = undefined;
    this.hJ = ResourceSystem_1.ResourceSystem.InvalidId;
    this.G5m = () => {
      UiManager_1.UiManager.OpenView("InfrLimitTaskMainView", {
        OpenSource: 1
      });
    };
    this.F5m = () => {
      UiManager_1.UiManager.OpenView("InfrastructureShopMainView", {
        OpenSource: 1
      });
    };
    this.N5m = () => {
      UiManager_1.UiManager.OpenView("InfrArchiveMainView", {
        OpenSource: 1
      });
    };
    this.V5m = e => {
      this.O5m.UpdateExp();
    };
    this.j5m = () => {
      UiManager_1.UiManager.OpenView("InfrRoadNetworkMainView");
    };
    this.yct = e => {
      if (e === "Refresh" || e === "Completed") {
        UiManager_1.UiManager.OpenView("InfrastructureSettleView", this.OpenParam.SettleInfo);
      }
    };
    this.iQf = () => {
      this._Qm();
    };
    this.rQf = () => {
      this.vHm();
    };
    this.Kgg = () => {
      this.Xgg();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIText], [11, UE.UISprite], [12, UE.UIText], [13, UE.UIItem], [14, UE.UIText], [16, UE.UIButtonComponent], [15, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [20, UE.UIItem], [21, UE.UITexture], [22, UE.UIItem]];
    this.BtnBindInfo = [[16, this.j5m]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InfrastructureFireExpAdd, this.V5m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshGoods, this.iQf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InfrastructureActivityTaskDataUpdate, this.rQf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UIViewPortSizeChanged, this.Kgg);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InfrastructureFireExpAdd, this.V5m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshGoods, this.iQf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InfrastructureActivityTaskDataUpdate, this.rQf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UIViewPortSizeChanged, this.Kgg);
  }
  async OnBeforeStartAsync() {
    this.wNo = new MediaPlayer_1.MediaPlayer(this.GetTexture(21));
    await Promise.all([InfrastructureController_1.InfrastructureController.RequestInfrastructureInfoRequest(), this.H5m(), this.Jig(), this.e7a(), this.$5m(), this.oQm(), this.nQm(), this.lQm()]);
    if (Info_1.Info.PlatformType === 2) {
      await this.A_g();
    }
    var e = ModelManager_1.ModelManager.InfrastructureModel.FireLevel;
    var e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetLevelConfigById(e);
    await Promise.all([this.cQa(), this.wNo.LoadVideoAndPlay(e.VideoName, e.VideoPath, true)]);
  }
  async e7a() {
    await this.dqc.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  async H5m() {
    await this.Xut.CreateByActorAsync(this.GetItem(2).GetOwner());
  }
  async Jig() {
    await this.zig.CreateByActorAsync(this.GetItem(20).GetOwner());
  }
  async $5m() {
    await this.O5m.CreateThenShowByActorAsync(this.GetItem(15).GetOwner());
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
  async oQm() {
    await this.sQm.CreateThenShowByActorAsync(this.GetButton(3).GetOwner());
    this.sQm.SetFunction(this.G5m);
  }
  async nQm() {
    await this.aQm.CreateThenShowByActorAsync(this.GetButton(4).GetOwner());
    this.aQm.SetFunction(this.F5m);
  }
  async lQm() {
    await this.hQm.CreateThenShowByActorAsync(this.GetButton(5).GetOwner());
    this.hQm.SetFunction(this.N5m);
    this.hQm.SetTextShowState(false);
  }
  async A_g() {
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
    this.esg();
    this.hBf();
    this.Q5m();
    this.K5m();
    this.zag();
  }
  Xgg() {
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
    this.W5m();
    this.vHm();
    this._Qm();
    this.zag();
    if (ModelManager_1.ModelManager.InfrastructureModel.NeedHighlightTrackedRoad || this.Zng) {
      this.Zng = false;
      this.zig.PlayFocusSequence();
      ModelManager_1.ModelManager.InfrastructureModel.SetNeedHighlightTrackedRoad(false);
    }
    this.Xgg();
  }
  OnAfterShow() {
    ModelManager_1.ModelManager.InfrastructureModel.CloseLoadingPanel();
    if (this.Jng) {
      this.Jng = false;
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
  esg() {
    this.Jng = this.OpenParam?.NeedPlayBuildSuccessSeq ?? false;
    this.Zng = this.OpenParam?.NeedFocusBuildQuest ?? false;
  }
  hBf() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(18));
    this.Hea.BindSequenceCloseEvent(this.yct);
  }
  W5m() {
    var e = ModelManager_1.ModelManager.InfrastructureModel;
    var t = e.FireLevel;
    let i = true;
    if (ConfigManager_1.ConfigManager.InfrastructureConfig.GetLevelConfigById(t) && t < ConfigManager_1.ConfigManager.InfrastructureConfig.GetMaxLevel()) {
      this.Xut.Refresh({
        Index: 0
      });
      this.Xut.SetUiActive(true);
    } else {
      this.Xut.SetUiActive(false);
      i = false;
    }
    t = CommonParamById_1.configCommonParamById.GetIntConfig("InfrTeachStageEndQuestId");
    t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t) === 3;
    let r = true;
    if (e.TracedRoadId === 0 && e.RecommendRoadId === 0 || !t) {
      this.zig.SetUiActive(false);
      r = false;
    } else {
      this.zig.Refresh({
        Index: 1
      });
      this.zig.SetUiActive(true);
    }
    this.GetItem(22).SetUIActive(i || r);
  }
  Q5m() {
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
  vHm() {
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
        this.sQm.SetText(t + "/" + e.length);
        this.sQm.BindRedDot("InfrLimitedTask");
      }
    } else {
      this.GetItem(6).SetUIActive(false);
    }
  }
  _Qm() {
    var e = ModelManager_1.ModelManager.InfrastructureModel;
    var t = e.GetAllShopCurrencyNum();
    this.aQm.SetText(e.MoneyHistorySpent + "/" + t);
    this.aQm.BindRedDot("InfrShop");
  }
  zag() {
    this.hQm.BindRedDot("InfrArchive");
  }
  K5m() {
    this.O5m.SetOnClickHelpCb(() => {
      var e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetHelpIdRoadProcess();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e);
    });
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0 && e[0] === "Mission" && ((e = Number(e[1])) === 0 || e === 1) && (e = (e === 0 ? this.Xut : this.zig).GetRootItem())) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.InfrastructureMainView = InfrastructureMainView;
//# sourceMappingURL=InfrastructureMainView.js.map