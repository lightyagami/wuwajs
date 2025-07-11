"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsGamePlayView = undefined;
const UE = require("ue");
const Time_1 = require("../../../../Core/Common/Time");
const ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const CameraController_1 = require("../../../Camera/CameraController");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const UiCameraAnimationController_1 = require("../../UiCameraAnimation/UiCameraAnimationController");
const UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const RacingBetsController_1 = require("../RacingBetsController");
const RacingBetsDefine_1 = require("../RacingBetsDefine");
const RacingBetsBulletScreenPanel_1 = require("./Item/RacingBetsBulletScreenPanel");
const RacingBetsDangoDiceItem_1 = require("./Item/RacingBetsDangoDiceItem");
const RacingBetsDangoOrderItem_1 = require("./Item/RacingBetsDangoOrderItem");
const RacingBetsDangoRankPanel_1 = require("./Item/RacingBetsDangoRankPanel");
const RacingBetsIconBulletScreenItem_1 = require("./Item/RacingBetsIconBulletScreenItem");
const RacingBetsTextBulletScreenItem_1 = require("./Item/RacingBetsTextBulletScreenItem");
const DANGO_ORDER_ITEM_START_INDEX = 24;
const DANGO_ORDER_ITEM_COUNT = 6;
const DANGO_DICE_ITEM_START_INDEX = 37;
const DANGO_DICE_ITEM_COUNT = 6;
class RacingBetsGamePlayView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.z01 = false;
    this.J01 = false;
    this.dx1 = false;
    this.Z01 = 0;
    this.ep1 = 0;
    this.ty1 = 0;
    this.vU1 = false;
    this.iy1 = [];
    this.tt1 = undefined;
    this.Ckc = [];
    this.LT1 = undefined;
    this.ZFc = undefined;
    this.eNc = undefined;
    this.YT1 = [];
    this.nw1 = [];
    this.tNc = () => {
      var e = new RacingBetsIconBulletScreenItem_1.RacingBetsIconBulletScreenItem();
      e.BindClickBulletScreenCallBack(this.tp1);
      return e;
    };
    this.iNc = () => {
      var e = new RacingBetsTextBulletScreenItem_1.RacingBetsTextBulletScreenItem();
      e.BindClickBulletScreenCallBack(this.tp1);
      return e;
    };
    this.zT1 = (e, i, t) => {
      this.JT1(e, i, t);
    };
    this.ZT1 = (e, i) => {
      this.eb1(e, i);
    };
    this.it1 = (e, i) => {
      this.tt1.PushBulletScreen(e, i);
    };
    this.an1 = e => {
      this.wT1(e);
    };
    this.mmo = e => {
      if (e.ViewName === "RacingBetsGamePlayView") {
        UiCameraAnimationController_1.UiCameraAnimationController.ExitUiCameraMode();
      }
    };
    this.Akc = e => {
      this.tt1.SetActive(e !== 1);
    };
    this.ip1 = () => {
      var e = !this.J01;
      this.GetButton(30).RootUIComp.SetUIActive(e);
      this.Jk1(e);
      this.Zk1(false);
      this.eO1(false);
    };
    this.rp1 = () => {
      var e = !this.z01;
      this.GetButton(30).RootUIComp.SetUIActive(e);
      this.eO1(e);
      this.Zk1(false);
      this.Jk1(false);
    };
    this.op1 = e => {
      this.GetExtendToggle(9).SetToggleStateForce(1);
      this.GetExtendToggle(10).SetToggleStateForce(0);
      var i = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsBulletScreen(2);
      this.eNc.RefreshByData(i);
    };
    this.sNc = e => {
      this.GetExtendToggle(9).SetToggleStateForce(0);
      this.GetExtendToggle(10).SetToggleStateForce(1);
      var i = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsBulletScreen(3);
      this.eNc.RefreshByData(i);
    };
    this.ay1 = () => {
      this.ty1 = (this.ty1 + 1) % this.iy1.length;
      var e = this.iy1[this.ty1];
      UE.GameplayStatics.SetGlobalTimeDilation(GlobalData_1.GlobalData.World, e);
      this.GetText(23).SetText("×" + e.toFixed(1));
    };
    this.mx1 = () => {
      this.Zk1(false);
      this.Jk1(false);
      this.eO1(false);
      this.GetButton(30).RootUIComp.SetUIActive(false);
    };
    this.fx1 = e => {
      e = Math.floor(e);
      ModelManager_1.ModelManager.RacingBetsModel.SetRacingBetsBulletScreenAlpha(e);
      this.GetText(33).SetText(e + "%");
      this.tt1.GetRootItem().SetAlpha(e / 100);
    };
    this.gx1 = () => {
      var e = !this.dx1;
      this.GetButton(30).RootUIComp.SetUIActive(e);
      this.Zk1(e);
      this.Jk1(false);
      this.eO1(false);
    };
    this.Cx1 = e => {
      ModelManager_1.ModelManager.RacingBetsModel.SetRacingBetsBulletScreenShowType(2);
      this.tt1.SetBulletScreenShowType(2);
      this.GetExtendToggle(36).SetToggleStateForce(0);
    };
    this.px1 = e => {
      ModelManager_1.ModelManager.RacingBetsModel.SetRacingBetsBulletScreenShowType(1);
      this.tt1.SetBulletScreenShowType(1);
      this.GetExtendToggle(35).SetToggleStateForce(0);
    };
    this.lyt = () => {
      var e;
      if (this.vU1) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Dango_InGame_ExitError");
      } else {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(308)).FunctionMap.set(2, () => {
          ModelManager_1.ModelManager.RacingBetsModel.RacingBetsAbortDungeon();
          this.vU1 = true;
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      }
    };
    this.Dkc = () => {
      UiManager_1.UiManager.OpenView("RacingBetsDangoSkillView", this.Ckc);
    };
    this.tp1 = e => {
      if (this.ep1 > TimeUtil_1.TimeUtil.GetServerTimeStamp()) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Dango_BulletChat_SendError");
      } else {
        this.ep1 = TimeUtil_1.TimeUtil.GetServerTimeStamp() + this.Z01;
        RacingBetsController_1.RacingBetsController.RacingBetsBulletScreenRequest(e.Id);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIExtendToggle], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UIExtendToggle], [10, UE.UIExtendToggle], [12, UE.UIScrollViewWithScrollbarComponent], [11, UE.UIScrollViewWithScrollbarComponent], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UITexture], [16, UE.UIItem], [17, UE.UIHorizontalLayout], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIText], [21, UE.UIHorizontalLayout], [22, UE.UIButtonComponent], [23, UE.UIText], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIItem], [30, UE.UIButtonComponent], [31, UE.UIButtonComponent], [32, UE.UIItem], [33, UE.UIText], [34, UE.UISliderComponent], [35, UE.UIExtendToggle], [36, UE.UIExtendToggle], [37, UE.UIItem], [38, UE.UIItem], [39, UE.UIItem], [40, UE.UIItem], [41, UE.UIItem], [42, UE.UIItem], [43, UE.UISprite]];
    this.BtnBindInfo = [[2, this.Akc], [3, this.ip1], [4, this.rp1], [6, this.lyt], [7, this.Dkc], [9, this.op1], [10, this.sNc], [22, this.ay1], [30, this.mx1], [31, this.gx1], [34, this.fx1], [35, this.Cx1], [36, this.px1]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.Ckc = ModelManager_1.ModelManager.RacingBetsModel.GetDungeonDangoList();
    this.LT1 = new RacingBetsDangoRankPanel_1.RacingBetsDangoRankPanel();
    await this.LT1.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    await this.LT1.InitAsync(this.Ckc);
    this.ZFc = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(12), this.tNc);
    var i = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsBulletScreen(1);
    e.push(this.ZFc.RefreshByDataAsync(i));
    this.eNc = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(11), this.iNc);
    var i = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsBulletScreen(2);
    e.push(this.eNc.RefreshByDataAsync(i));
    this.tt1 = new RacingBetsBulletScreenPanel_1.RacingBetsBulletScreenPanel();
    e.push(this.tt1.CreateThenShowByActorAsync(this.GetItem(14).GetOwner()));
    e.push(this.tb1());
    e.push(this.sw1());
    await Promise.all(e);
    this.Z01 = CommonParamById_1.configCommonParamById.GetIntConfig("DangoRaceBulletChatCoolDown");
    this.iy1 = ConfigCommon_1.ConfigCommon.ToList(CommonParamById_1.configCommonParamById.GetIntArrayConfig("DangoRaceReplaySpeed"));
    this.vx1();
    this.Hqe();
  }
  async tb1() {
    var i = [];
    for (let e = 0; e < DANGO_ORDER_ITEM_COUNT; e++) {
      var t = this.GetItem(DANGO_ORDER_ITEM_START_INDEX + e);
      var s = new RacingBetsDangoOrderItem_1.RacingBetsDangoOrderItem();
      i.push(s.CreateThenShowByActorAsync(t.GetOwner()));
      this.YT1.push(s);
    }
    await Promise.all(i);
  }
  async sw1() {
    var i = [];
    for (let e = 0; e < DANGO_DICE_ITEM_COUNT; e++) {
      var t = this.GetItem(DANGO_DICE_ITEM_START_INDEX + e);
      var s = new RacingBetsDangoDiceItem_1.RacingBetsDangoDiceItem();
      i.push(s.CreateThenShowByActorAsync(t.GetOwner()));
      this.nw1.push(s);
    }
    await Promise.all(i);
  }
  vx1() {
    this.z01 = false;
    this.J01 = false;
    this.dx1 = false;
    this.GetItem(5).SetUIActive(false);
    this.GetItem(8).SetUIActive(false);
    this.GetItem(32).SetUIActive(false);
    this.GetButton(30).RootUIComp.SetUIActive(false);
    var e = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsBulletScreenAlpha();
    var i = this.GetSlider(34);
    i.MaxValue = RacingBetsDefine_1.RACING_BETS_BULLET_SCREEN_MAX_ALPHA;
    i.MinValue = RacingBetsDefine_1.RACING_BETS_BULLET_SCREEN_MIN_ALPHA;
    i.Value = e;
    this.tt1.GetRootItem().SetAlpha(e / 100);
    var i = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsBulletScreenShowType();
    var t = i === 2;
    var s = this.GetExtendToggle(35);
    var n = this.GetExtendToggle(36);
    s.SetToggleStateForce(t ? 1 : 0);
    s.bLockStateOnSelect = true;
    n.SetToggleStateForce(t ? 0 : 1);
    n.bLockStateOnSelect = true;
    this.tt1.SetBulletScreenShowType(i);
    this.GetText(33).SetText(e + "%");
  }
  Hqe() {
    var e = ModelManager_1.ModelManager.RacingBetsModel.IsReplayDungeon;
    this.GetItem(13).SetUIActive(false);
    this.GetExtendToggle(9).SetToggleStateForce(1);
    this.GetExtendToggle(10).SetToggleStateForce(0);
    this.z01 = false;
    this.J01 = false;
    this.GetItem(5).SetUIActive(false);
    this.GetItem(8).SetUIActive(false);
    this.GetButton(22).RootUIComp.SetUIActive(e);
    const i = this.GetSprite(43);
    i.SetUIActive(false);
    var t = e ? "SP_RaceScheduleTitleBgRec" : "SP_RaceScheduleTitleBg";
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetSpriteByPath(t, i, false, undefined, e => {
      i.SetUIActive(e);
    });
    if (e) {
      t = this.iy1[this.ty1];
      UE.GameplayStatics.SetGlobalTimeDilation(GlobalData_1.GlobalData.World, t);
      this.GetText(23).SetText("×" + t.toFixed(1));
    }
  }
  ib1(i) {
    for (let e = 0; e < i.length; e++) {
      this.YT1[e].Refresh(i[e]);
      this.YT1[e].SetActive(true);
    }
    if (this.YT1.length > i.length) {
      for (let e = i.length; e < this.YT1.length; e++) {
        this.YT1[e].SetActive(false);
      }
    }
  }
  aw1(i) {
    for (let e = 0; e < i.length; e++) {
      this.nw1[e].Refresh(i[e]);
    }
    if (this.nw1.length > i.length) {
      for (let e = i.length; e < this.nw1.length; e++) {
        this.nw1[e].SetActive(false);
      }
    }
  }
  Zk1(e) {
    if (this.dx1 !== e) {
      if (this.dx1 = e) {
        if (this.UiViewSequence.HasSequenceNameInPlaying("FuncHide03")) {
          this.UiViewSequence.StopSequenceByKey("FuncHide03");
        }
        this.PlaySequence("FuncShow03");
      } else {
        if (this.UiViewSequence.HasSequenceNameInPlaying("FuncShow03")) {
          this.UiViewSequence.StopSequenceByKey("FuncShow03");
        }
        this.PlaySequence("FuncHide03");
      }
    }
  }
  Jk1(e) {
    if (this.J01 !== e) {
      if (this.J01 = e) {
        if (this.UiViewSequence.HasSequenceNameInPlaying("FuncHide02")) {
          this.UiViewSequence.StopSequenceByKey("FuncHide02");
        }
        this.PlaySequence("FuncShow02");
      } else {
        if (this.UiViewSequence.HasSequenceNameInPlaying("FuncShow02")) {
          this.UiViewSequence.StopSequenceByKey("FuncShow02");
        }
        this.PlaySequence("FuncHide02");
      }
    }
  }
  eO1(e) {
    if (this.z01 !== e) {
      if (this.z01 = e) {
        if (this.UiViewSequence.HasSequenceNameInPlaying("FuncHide01")) {
          this.UiViewSequence.StopSequenceByKey("FuncHide01");
        }
        this.PlaySequence("FuncShow01");
      } else {
        if (this.UiViewSequence.HasSequenceNameInPlaying("FuncShow01")) {
          this.UiViewSequence.StopSequenceByKey("FuncShow01");
        }
        this.PlaySequence("FuncHide01");
      }
    }
  }
  PushCameraHandle(e, i, t) {
    UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(e, i, true);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsDiceAnim, this.ZT1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsDangoOrderRefresh, this.zT1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsPushBulletScreen, this.it1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsDungeonDangoRankChange, this.an1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsDiceAnim, this.ZT1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsDangoOrderRefresh, this.zT1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsPushBulletScreen, this.it1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsDungeonDangoRankChange, this.an1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle, this.mmo);
  }
  PopCameraHandle(e, i, t, s) {
    UiCameraAnimationController_1.UiCameraAnimationController.DeepCopyCamera(CameraController_1.CameraController.FreeCamera.DisplayComponent.CameraActor);
    CameraController_1.CameraController.SetViewTarget(UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera?.GetCameraActor(), "RacingBetsGamePlayView");
    UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(e, i, t, s);
  }
  OnBeforeDestroy() {
    UE.GameplayStatics.SetGlobalTimeDilation(GlobalData_1.GlobalData.World, 1);
  }
  async JT1(e, i, t) {
    this.GetText(20).SetText(e.toString().padStart(2, "0"));
    this.ib1(i);
    this.GetItem(18).SetUIActive(true);
    if (i.length === RacingBetsDefine_1.RACING_BETS_FOUR_DANGO) {
      await this.PlaySequenceAsync("OrderInB", false, false, Time_1.Time.TimeDilation);
    } else {
      await this.PlaySequenceAsync("OrderInA", false, false, Time_1.Time.TimeDilation);
    }
    this.GetItem(18).SetUIActive(false);
    this.aw1(i);
    t.SetResult(undefined);
  }
  async eb1(e, i) {
    var t = [];
    t.push(this.PlaySequenceAsync("DiceAnim", false, false, Time_1.Time.TimeDilation));
    if (e === RacingBetsDefine_1.RACING_BETS_FOUR_DANGO) {
      t.push(this.PlaySequenceAsync("OrderOutB", false, false, Time_1.Time.TimeDilation));
    } else {
      t.push(this.PlaySequenceAsync("OrderOutA", false, false, Time_1.Time.TimeDilation));
    }
    await Promise.all(t);
    i.SetResult(undefined);
  }
  async wT1(e) {
    await this.LT1.RefreshRankItemAsync();
    e.SetResult(undefined);
  }
}
exports.RacingBetsGamePlayView = RacingBetsGamePlayView;
//# sourceMappingURL=RacingBetsGamePlayView.js.map