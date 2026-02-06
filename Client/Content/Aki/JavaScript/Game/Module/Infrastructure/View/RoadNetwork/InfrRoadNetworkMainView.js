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
    this.YVm = new InfrRoadNetworkMapPanel_1.InfrRoadNetworkMapPanel();
    this.O5m = new InfrastructureFireExpPanel_1.InfrastructureFireExpPanel();
    this.MHm = undefined;
    this.o4o = undefined;
    this.ZoomIn = undefined;
    this.ZoomOut = undefined;
    this.JVm = false;
    this.IRe = undefined;
    this.ZVm = Protocol_1.Aki.Protocol.a4m.Proto_Road;
    this.e6m = 0;
    this.euf = false;
    this.dzf = 1;
    this.mzf = [0, 0];
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
      this.YVm.RefreshMarkScale(this.o4o.MapScale);
    };
    this.t6m = () => {
      if (this.JVm) {
        this.JVm = false;
        this.MHm = undefined;
        UiManager_1.UiManager.CloseView("InfrRoadNetworkInfoView");
        this.YVm.DeselectMark();
        this.PlaySequence("ShowView");
        t = CommonParamById_1.configCommonParamById.GetFloatConfig("InfrRoadNetworkFocalTime");
        this.o4o.ScaleToTarget(this.dzf, this.mzf, 0, t, 0);
      }
      var t = this.YVm.GetRootItem().GetAnchorOffset();
      this.mzf = [-t.X / this.dzf, -t.Y / this.dzf];
      this.fzf();
    };
    this.i6m = t => {
      if (!this.MHm) {
        this.PlaySequence("SweepCarrier");
      }
      this.MHm = t;
      this.JVm = true;
      var i = {
        InfoParam: t,
        BuildCb: () => {
          this.XVm();
        },
        CloseCb: () => {
          this.t6m();
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
      this.dzf = this.o4o.MapScale;
      var i = this.YVm.GetRootItem().GetAnchorOffset();
      this.mzf = [-i.X / this.dzf, -i.Y / this.dzf];
      var i = CommonParamById_1.configCommonParamById.GetFloatConfig("InfrRoadNetworkFocalTime");
      let e = undefined;
      e = t.DeliveryType === Protocol_1.Aki.Protocol.a4m.Proto_Road ? this.YVm.GetMarkUiPosition(t.RoadId) : this.YVm.GetObservatoryMarkUiPosition();
      var t = this.GetItem(12).GetUIWorldPosition();
      var s = CommonParamById_1.configCommonParamById.GetFloatConfig("InfrRoadNetworkFoaclScale");
      e = [e[0] - t.X / s, e[1] - t.Y / s];
      this.o4o.ScaleToTarget(s, e, 0, i, 1);
      this.fzf();
    };
    this.o6m = t => {
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
    this.tPf = () => {
      this.YVm.RefreshAllMarks();
    };
    this.D1c = () => {
      this.t6m();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UISliderComponent], [8, UE.UIText], [9, UE.UIDraggableComponent], [10, UE.UIText], [11, UE.UITexture], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIButtonComponent]];
    this.BtnBindInfo = [[15, this.D1c]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InfrastructureRoadNoticeUpdate, this.o6m);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InfrastructureTraceRoadUpdate, this.tPf);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InfrastructureRoadNoticeUpdate, this.o6m);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InfrastructureTraceRoadUpdate, this.tPf);
  }
  async OnBeforeStartAsync() {
    this.h6m(this.OpenParam);
    await InfrastructureController_1.InfrastructureController.RequestInfrastructureInfoRequest();
    await Promise.all([this.e7a(), this.n6m(), this.s6m()]);
    await this.cQa();
  }
  h6m(t) {
    if (t) {
      this.ZVm = t.DeliveryType;
      this.e6m = t.RoadId;
      this.euf = t.NeedPlayFinishSeq ?? false;
    }
  }
  async e7a() {
    await this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  async n6m() {
    await this.YVm.CreateThenShowByActorAsync(this.GetDraggable(9).GetOwner(), this.OpenParam);
    this.YVm.SetOnClickMarkCb(this.i6m);
  }
  async s6m() {
    await this.O5m.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
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
    this.a6m();
    this.l6m();
    this.fHs();
    this.o6m([]);
    this.gzf();
  }
  OnBeforeShow() {
    this.YVm.RefreshMarkScale(this.o4o.MapScale);
    this.o4o.BindTouch();
    this.o4o.AddGamepadEvent();
    this.IHm();
  }
  OnAfterHide() {
    this.o4o.UnbindTouch();
    this.o4o.RemoveGamepadEvent();
  }
  OnAfterPlayStartSequence() {
    this.YVm.ShowMarkUnlock(this.euf, () => {
      this.tuf();
    });
  }
  a6m() {
    this.o4o = new BuildingMapMoveComponent_1.BuildingMapMoveComponent(this.GetDraggable(9));
    var t = CommonParamById_1.configCommonParamById.GetFloatArrayConfig("InfrRoadNetworkMapSizeParam");
    this.o4o.SetScaleSafeArea(t[0], t[1]);
    this.o4o.PointerBeginDragExtraCallBack = this.t6m;
    this.o4o.PointerUpExtraCallBack = this.t6m;
    this.o4o.SetChangeScaleCallback(this.Xjs);
  }
  fHs() {
    var t = this.GetSlider(7);
    t.SetMinValue(this.o4o.MapScaleSafeArea.Min, false, false);
    t.SetMaxValue(this.o4o.MapScaleSafeArea.Max, false, false);
    t.OnValueChangeCb.Bind(this.CHs);
    this.ZoomIn = new LongPressButton_1.LongPressButton(this.GetButton(5), this.w4o);
    this.ZoomOut = new LongPressButton_1.LongPressButton(this.GetButton(6), this.P4o);
  }
  l6m() {
    this.O5m.SetOnClickHelpCb(() => {
      var t = ConfigManager_1.ConfigManager.InfrastructureConfig.GetHelpIdRoadProcess();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(t);
    });
    if (this.euf) {
      this.O5m.RefreshExpBeforeRoadBuilt(this.e6m);
    }
  }
  IHm() {
    var t = this.OpenParam;
    if (t && !t.NeedPlayFinishSeq) {
      this.YVm.SelectMark(this.ZVm, this.e6m);
    }
  }
  tuf() {
    if (this.euf) {
      const t = () => {
        if (this.euf) {
          this.euf = false;
          this.GetTexture(11).SetUIActive(false);
          UiManager_1.UiManager.OpenView("InfrastructureSettleView", {
            DeliveryType: this.ZVm,
            RoadId: this.e6m
          });
        }
      };
      this.O5m.SetOnDigitSequenceFinishCb(t);
      this.YVm.RefreshFinishTextureLine(this.e6m);
      this.PlaySequence("Finish", () => {
        this.YVm.ShowMarkFinishSeq(this.ZVm, this.e6m, () => {
          if (!this.O5m.UpdateExp()) {
            t();
          }
        });
      });
    } else {
      this.GetTexture(11).SetUIActive(false);
    }
  }
  gzf() {
    var t = CommonParamById_1.configCommonParamById.GetFloatConfig("InfrRoadNetworkMapDefaultSize");
    var i = CommonParamById_1.configCommonParamById.GetIntArrayConfig("InfrRoadNetworkMapDefaultPos");
    this.dzf = t;
    this.mzf = i;
    if (this.euf) {
      let t = undefined;
      t = this.ZVm === Protocol_1.Aki.Protocol.a4m.Proto_Road ? this.YVm.GetMarkUiPosition(this.e6m) : this.YVm.GetObservatoryMarkUiPosition();
      var e = CommonParamById_1.configCommonParamById.GetFloatConfig("InfrRoadNetworkFoaclScale");
      this.o4o.SetScale(e, 5);
      this.o4o.MoveToTarget(t, 0, 0);
    } else {
      this.o4o.SetScale(t, 5);
      this.o4o.MoveToTarget(i, 0, 0);
    }
  }
  fzf() {
    this.Qyi.SetUiActive(!this.JVm);
    this.GetItem(3).SetUIActive(!this.JVm);
    this.GetButton(15).RootUIComp.SetUIActive(this.JVm);
    if (this.JVm && !UiManager_1.UiManager.IsViewOpen("InfrRoadNetworkInfoView")) {
      UiManager_1.UiManager.OpenView("InfrRoadNetworkInfoView", {
        InfoParam: this.MHm,
        BuildCb: () => {
          this.XVm();
        },
        CloseCb: () => {
          this.t6m();
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
  async XVm() {
    if (this.MHm) {
      if (this.MHm.DeliveryType === Protocol_1.Aki.Protocol.a4m.Proto_Road) {
        await InfrastructureController_1.InfrastructureController.RequestInfrastructureRoadBuild(this.MHm.RoadId);
      } else {
        await InfrastructureController_1.InfrastructureController.RequestInfrastructureLevelUp();
      }
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t.length !== 0 && t[0] === "RoadMark") {
      return this.YVm?.GetGuideUiItemAndUiItemForShowEx(t);
    } else {
      return undefined;
    }
  }
}
exports.InfrRoadNetworkMainView = InfrRoadNetworkMainView;
//# sourceMappingURL=InfrRoadNetworkMainView.js.map