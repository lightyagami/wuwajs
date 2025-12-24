"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrRoadNetworkMainView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const BuildingMapMoveComponent_1 = require("../../../Activity/ActivityContent/MoonChasing/Main/Build/BuildingMapMoveComponent");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LongPressButton_1 = require("../../../Util/LongPressButton");
const InfrastructureController_1 = require("../../InfrastructureController");
const InfrastructureDefine_1 = require("../../InfrastructureDefine");
const InfrastructureFireExpPanel_1 = require("../Main/InfrastructureFireExpPanel");
const InfrRoadNetworkMapPanel_1 = require("./InfrRoadNetworkMapPanel");
class InfrRoadNetworkMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    this.A5m = new InfrRoadNetworkMapPanel_1.InfrRoadNetworkMapPanel();
    this.v4m = new InfrastructureFireExpPanel_1.InfrastructureFireExpPanel();
    this.ujm = undefined;
    this.o4o = undefined;
    this.ZoomIn = undefined;
    this.ZoomOut = undefined;
    this.U5m = false;
    this.IRe = undefined;
    this.x5m = Protocol_1.Aki.Protocol.VNm.Proto_Road;
    this.B5m = 0;
    this.klf = false;
    this.e6f = 1;
    this.t6f = [0, 0];
    this.P4o = () => {
      this.o4o.LongPressScroll(-this.o4o.ScaleStep);
    };
    this.w4o = () => {
      this.o4o.LongPressScroll(this.o4o.ScaleStep);
    };
    this.CHs = t => {
      this.o4o.SliderScroll(t);
    };
    this.Xjs = t => {
      this.GetSlider(7).SetValue(this.o4o.MapScale, true);
      this.A5m.RefreshMarkScale(this.o4o.MapScale);
    };
    this.k5m = () => {
      if (this.U5m) {
        this.U5m = false;
        this.ujm = undefined;
        UiManager_1.UiManager.CloseView("InfrRoadNetworkInfoView");
        this.A5m.DeselectMark();
        this.PlaySequence("ShowView");
        t = CommonParamById_1.configCommonParamById.GetFloatConfig("InfrRoadNetworkFocalTime");
        this.o4o.ScaleToTarget(this.e6f, this.t6f, 0, t, 0);
      }
      var t = this.A5m.GetRootItem().GetAnchorOffset();
      this.t6f = [-t.X / this.e6f, -t.Y / this.e6f];
      this.i6f();
    };
    this.q5m = t => {
      if (!this.ujm) {
        this.PlaySequence("SweepCarrier");
      }
      this.ujm = t;
      this.U5m = true;
      var i = {
        InfoParam: t,
        BuildCb: () => {
          this.P5m();
        },
        CloseCb: () => {
          this.k5m();
        }
      };
      if (UiManager_1.UiManager.IsViewOpen("InfrRoadNetworkInfoView")) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructureSelectRoadNetworkMark, i);
      } else {
        UiManager_1.UiManager.OpenView("InfrRoadNetworkInfoView", i, (t, i) => {
          if (t) {
            this.AddChildViewById(i);
          }
        });
      }
      this.e6f = this.o4o.MapScale;
      var i = this.A5m.GetRootItem().GetAnchorOffset();
      this.t6f = [-i.X / this.e6f, -i.Y / this.e6f];
      var i = CommonParamById_1.configCommonParamById.GetFloatConfig("InfrRoadNetworkFocalTime");
      let e = undefined;
      e = t.DeliveryType === Protocol_1.Aki.Protocol.VNm.Proto_Road ? this.A5m.GetMarkUiPosition(t.RoadId) : this.A5m.GetObservatoryMarkUiPosition();
      var t = this.GetItem(12).GetUIWorldPosition();
      var s = CommonParamById_1.configCommonParamById.GetFloatConfig("InfrRoadNetworkFoaclScale");
      e = [e[0] - t.X / s, e[1] - t.Y / s];
      this.o4o.ScaleToTarget(s, e, 0, i, 1);
      this.i6f();
    };
    this.O5m = () => {
      InfrastructureController_1.InfrastructureController.RequestInfrastructureFireNotice();
    };
    this.G5m = t => {
      var i;
      var e;
      if (t.length === 0) {
        this.GetText(8).ShowTextNew("BuildRoadNet_SmsNotReceived");
        this.GetText(10).SetUIActive(false);
      } else {
        this.GetText(10).SetUIActive(true);
        t = t.sort((t, i) => i.CreateTime - t.CreateTime)[0];
        i = ConfigManager_1.ConfigManager.InfrastructureConfig.GetInfrPasserConfigById(t.PasserId);
        e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetRoadConfigById(t.RoadId);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "BuildRoad_InfrPasser", new LguiUtil_1.TableTextArgNew(i.Name), new LguiUtil_1.TableTextArgNew(e.Name), t.GiftCount);
      }
    };
    this.mTf = () => {
      this.A5m.RefreshAllMarks();
    };
    this.D1c = () => {
      this.k5m();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UISliderComponent], [8, UE.UIText], [9, UE.UIDraggableComponent], [10, UE.UIText], [11, UE.UITexture], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIButtonComponent]];
    this.BtnBindInfo = [[15, this.D1c]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InfrastructureRoadNoticeUpdate, this.G5m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InfrastructureTraceRoadUpdate, this.mTf);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InfrastructureRoadNoticeUpdate, this.G5m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InfrastructureTraceRoadUpdate, this.mTf);
  }
  async OnBeforeStartAsync() {
    this.j5m(this.OpenParam);
    await InfrastructureController_1.InfrastructureController.RequestInfrastructureInfoRequest();
    await Promise.all([this.e7a(), this.F5m(), this.N5m()]);
    await this.cQa();
  }
  j5m(t) {
    if (t) {
      this.x5m = t.DeliveryType;
      this.B5m = t.RoadId;
      this.klf = t.NeedPlayFinishSeq ?? false;
    }
  }
  async e7a() {
    await this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  async F5m() {
    await this.A5m.CreateThenShowByActorAsync(this.GetDraggable(9).GetOwner(), this.OpenParam);
    this.A5m.SetOnClickMarkCb(this.q5m);
  }
  async N5m() {
    await this.v4m.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
  }
  async cQa() {
    this.Qyi.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.Qyi.SetHelpCallBack(() => {
      var t = ConfigManager_1.ConfigManager.InfrastructureConfig.GetHelpIdActivity();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(t);
    });
    await this.Qyi.SetCurrencyItemList([InfrastructureDefine_1.INFR_BATTLE_MATERIAL_ID, InfrastructureDefine_1.INFR_COLLECTION_MATERIAL_ID, InfrastructureDefine_1.INFR_QUEST_MATERIAL_ID]);
  }
  OnStart() {
    this.V5m();
    this.H5m();
    this.fHs();
    this.$5m();
    this.djm();
    this.O5m();
    this.G5m([]);
    this.r6f();
  }
  OnBeforeShow() {
    this.A5m.RefreshMarkScale(this.o4o.MapScale);
    this.o4o.BindTouch();
    this.o4o.AddGamepadEvent();
  }
  OnAfterHide() {
    this.o4o.UnbindTouch();
    this.o4o.RemoveGamepadEvent();
  }
  OnAfterPlayStartSequence() {
    this.A5m.ShowMarkUnlock(this.klf, () => {
      this.qlf();
    });
  }
  V5m() {
    this.o4o = new BuildingMapMoveComponent_1.BuildingMapMoveComponent(this.GetDraggable(9));
    var t = CommonParamById_1.configCommonParamById.GetFloatArrayConfig("InfrRoadNetworkMapSizeParam");
    this.o4o.SetScaleSafeArea(t[0], t[1]);
    this.o4o.PointerBeginDragExtraCallBack = this.k5m;
    this.o4o.PointerUpExtraCallBack = this.k5m;
    this.o4o.SetChangeScaleCallback(this.Xjs);
  }
  $5m() {
    var t = CommonParamById_1.configCommonParamById.GetIntConfig("InfrRoadNetworkMessageInterval");
    this.IRe = TimerSystem_1.GameplayTimerSystem.Forever(this.O5m, t * TimeUtil_1.TimeUtil.InverseMillisecond);
  }
  fHs() {
    var t = this.GetSlider(7);
    t.SetMinValue(this.o4o.MapScaleSafeArea.Min, false, false);
    t.SetMaxValue(this.o4o.MapScaleSafeArea.Max, false, false);
    t.OnValueChangeCb.Bind(this.CHs);
    this.ZoomIn = new LongPressButton_1.LongPressButton(this.GetButton(5), this.w4o);
    this.ZoomOut = new LongPressButton_1.LongPressButton(this.GetButton(6), this.P4o);
  }
  H5m() {
    this.v4m.SetOnClickHelpCb(() => {
      var t = ConfigManager_1.ConfigManager.InfrastructureConfig.GetHelpIdRoadProcess();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(t);
    });
    if (this.klf) {
      this.v4m.RefreshExpBeforeRoadBuilt(this.B5m);
    }
  }
  djm() {
    var t = this.OpenParam;
    if (t && !t.NeedPlayFinishSeq) {
      this.A5m.SelectMark(this.x5m, this.B5m);
    }
  }
  qlf() {
    if (this.klf) {
      const t = () => {
        if (this.klf) {
          this.klf = false;
          this.GetTexture(11).SetUIActive(false);
          UiManager_1.UiManager.OpenView("InfrastructureSettleView", {
            DeliveryType: this.x5m,
            RoadId: this.B5m
          });
        }
      };
      this.v4m.SetOnDigitSequenceFinishCb(t);
      this.A5m.RefreshFinishTextureLine(this.B5m);
      this.PlaySequence("Finish", () => {
        this.A5m.ShowMarkFinishSeq(this.x5m, this.B5m, () => {
          if (!this.v4m.UpdateExp()) {
            t();
          }
        });
      });
    } else {
      this.GetTexture(11).SetUIActive(false);
    }
  }
  r6f() {
    var t = CommonParamById_1.configCommonParamById.GetFloatConfig("InfrRoadNetworkMapDefaultSize");
    var i = CommonParamById_1.configCommonParamById.GetIntArrayConfig("InfrRoadNetworkMapDefaultPos");
    this.e6f = t;
    this.t6f = i;
    if (this.klf) {
      let t = undefined;
      t = this.x5m === Protocol_1.Aki.Protocol.VNm.Proto_Road ? this.A5m.GetMarkUiPosition(this.B5m) : this.A5m.GetObservatoryMarkUiPosition();
      var e = CommonParamById_1.configCommonParamById.GetFloatConfig("InfrRoadNetworkFoaclScale");
      this.o4o.SetScale(e, 5);
      this.o4o.MoveToTarget(t, 0, 0);
    } else {
      this.o4o.SetScale(t, 5);
      this.o4o.MoveToTarget(i, 0, 0);
    }
  }
  i6f() {
    this.Qyi.SetUiActive(!this.U5m);
    this.GetItem(3).SetUIActive(!this.U5m);
    this.GetButton(15).RootUIComp.SetUIActive(this.U5m);
    if (this.U5m && !UiManager_1.UiManager.IsViewOpen("InfrRoadNetworkInfoView")) {
      UiManager_1.UiManager.OpenView("InfrRoadNetworkInfoView", {
        InfoParam: this.ujm,
        BuildCb: () => {
          this.P5m();
        },
        CloseCb: () => {
          this.k5m();
        }
      }, (t, i) => {
        if (t) {
          this.AddChildViewById(i);
        }
      });
    }
  }
  OnBeforeDestroy() {
    this.o4o.Destroy();
    if (this.IRe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.IRe);
      this.IRe = undefined;
    }
  }
  async P5m() {
    if (this.ujm) {
      if (this.ujm.DeliveryType === Protocol_1.Aki.Protocol.VNm.Proto_Road) {
        await InfrastructureController_1.InfrastructureController.RequestInfrastructureRoadBuild(this.ujm.RoadId);
      } else {
        await InfrastructureController_1.InfrastructureController.RequestInfrastructureLevelUp();
      }
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t.length !== 0 && t[0] === "RoadMark") {
      return this.A5m?.GetGuideUiItemAndUiItemForShowEx(t);
    } else {
      return undefined;
    }
  }
}
exports.InfrRoadNetworkMainView = InfrRoadNetworkMainView;
//# sourceMappingURL=InfrRoadNetworkMainView.js.map