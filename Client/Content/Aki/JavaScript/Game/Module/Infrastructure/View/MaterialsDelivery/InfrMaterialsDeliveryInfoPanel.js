"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrMaterialsDeliveryInfoPanel = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const ConditionGroupById_1 = require("../../../../../Core/Define/ConfigQuery/ConditionGroupById");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const WorldMapController_1 = require("../../../WorldMap/WorldMapController");
const InfrastructureController_1 = require("../../InfrastructureController");
const InfrastructureDefine_1 = require("../../InfrastructureDefine");
const InfrMaterialsDeliveryConsumeItem_1 = require("./InfrMaterialsDeliveryConsumeItem");
const InfrMaterialsDeliveryEffectItem_1 = require("./InfrMaterialsDeliveryEffectItem");
const InfrMaterialsDeliveryLockItem_1 = require("./InfrMaterialsDeliveryLockItem");
class InfrMaterialsDeliveryInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.D4m = 0;
    this.U4m = 0;
    this.x4m = Protocol_1.Aki.Protocol.VNm.Proto_Road;
    this.pji = undefined;
    this.B4m = undefined;
    this.k4m = new ButtonItem_1.ButtonItem();
    this.q4m = new ButtonItem_1.ButtonItem();
    this.O4m = new ButtonItem_1.ButtonItem();
    this.G4m = new ButtonItem_1.ButtonItem();
    this.BZa = new InfrMaterialsDeliveryLockItem_1.InfrMaterialsDeliveryLockItem();
    this.F4m = new InfrMaterialsDeliveryLockItem_1.InfrMaterialsDeliveryLockItem();
    this.N4m = new InfrMaterialsDeliveryLockItem_1.InfrMaterialsDeliveryDoneItem();
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    this.V4m = false;
    this.j4m = undefined;
    this.YYm = undefined;
    this.Q4m = () => {
      this.ljm();
    };
    this.K4m = () => {
      this.Pkf();
    };
    this.X4m = () => {
      var t;
      if (this.x4m === Protocol_1.Aki.Protocol.VNm.Proto_Road) {
        if (this.h5m().Status === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusLock) {
          t = CommonParamById_1.configCommonParamById.GetIntConfig("InfrTeachStageEndQuestId");
          UiManager_1.UiManager.OpenView("QuestView", t);
        } else {
          UiManager_1.UiManager.OpenView("QuestView", this.t5m()?.BuildQuest);
        }
      }
    };
    this.Y4m = () => {
      this.j4m?.();
    };
    this.I5t = () => {
      this.YYm?.();
    };
    this.z4m = () => {
      this.V4m = false;
      this.J4m();
    };
    this.Z4m = () => {
      this.V4m = true;
      this.J4m();
    };
    this.zYm = () => {
      this.YYm?.();
    };
    this.e5m = () => {};
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIItem], [12, UE.UISprite], [13, UE.UISprite], [14, UE.UISprite], [15, UE.UIText], [16, UE.UIItem], [17, UE.UIHorizontalLayout], [18, UE.UIItem], [19, UE.UIText], [20, UE.UIVerticalLayout], [21, UE.UIItem], [22, UE.UIText], [23, UE.UIItem], [24, UE.UIButtonComponent], [25, UE.UIText], [26, UE.UIButtonComponent], [27, UE.UIText], [28, UE.UIItem], [29, UE.UITexture], [30, UE.UIItem], [31, UE.UIItem], [32, UE.UIItem], [33, UE.UIButtonComponent], [34, UE.UIButtonComponent], [35, UE.UIButtonComponent], [36, UE.UIButtonComponent], [37, UE.UIText], [38, UE.UIText], [39, UE.UIItem], [40, UE.UISprite], [41, UE.UIText]];
    this.BtnBindInfo = [[4, this.z4m], [35, this.Z4m], [36, this.I5t]];
  }
  t5m() {
    return ConfigManager_1.ConfigManager.InfrastructureConfig.GetRoadConfigById(this.U4m);
  }
  i5m() {
    return ConfigManager_1.ConfigManager.InfrastructureConfig.GetLevelConfigById(ModelManager_1.ModelManager.InfrastructureModel.FireLevel);
  }
  r5m() {
    if (this.x4m === Protocol_1.Aki.Protocol.VNm.Proto_Road) {
      return Array.from(this.t5m().Requirement.entries()).sort((t, i) => t[0] - i[0]);
    } else {
      return Array.from(this.i5m().Requirement.entries()).sort((t, i) => t[0] - i[0]);
    }
  }
  o5m() {
    var t;
    var i;
    if (this.x4m !== Protocol_1.Aki.Protocol.VNm.Proto_Observatory && (t = this.t5m(), this.h5m().Status === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusProgress)) {
      i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.EffectDes[0]);
      return [StringUtils_1.StringUtils.Format(i, t.FireExpReward.toString())];
    } else {
      return [];
    }
  }
  eBn() {
    return (this.x4m === Protocol_1.Aki.Protocol.VNm.Proto_Road ? this.t5m() : this.i5m()).Name;
  }
  n5m() {
    if (this.x4m === Protocol_1.Aki.Protocol.VNm.Proto_Road) {
      if (this.h5m().Status === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusComplete) {
        return this.t5m().BuildDoneDes;
      } else {
        return this.t5m().Description;
      }
    } else {
      return this.i5m().StageDescription;
    }
  }
  s5m() {
    if (this.x4m === Protocol_1.Aki.Protocol.VNm.Proto_Road) {
      return this.t5m().Length;
    } else {
      return 0;
    }
  }
  a5m() {
    return (this.x4m === Protocol_1.Aki.Protocol.VNm.Proto_Road ? this.t5m() : this.i5m()).InfoPicturePath;
  }
  h5m() {
    return ModelManager_1.ModelManager.InfrastructureModel.GetRoadDataByRoadId(this.U4m);
  }
  get l5m() {
    var t = this.r5m();
    const e = ModelManager_1.ModelManager.InventoryModel;
    return t.every(([t, i]) => e.GetItemCountByConfigId(t) >= i);
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.e7a(), this._5m(), this.u5m(), this.c5m(), this.d5m(), this.m5m(), this.f5m(), this.g5m()]);
    this.C5m();
    this.p5m();
  }
  async e7a() {
    await this.Qyi.CreateThenShowByActorAsync(this.GetItem(39).GetOwner());
    await this.Qyi.SetCurrencyItemList([InfrastructureDefine_1.INFR_BATTLE_MATERIAL_ID, InfrastructureDefine_1.INFR_COLLECTION_MATERIAL_ID, InfrastructureDefine_1.INFR_QUEST_MATERIAL_ID]);
  }
  C5m() {
    this.pji = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(17), () => new InfrMaterialsDeliveryConsumeItem_1.InfrMaterialsDeliveryConsumeItem());
  }
  p5m() {
    this.B4m = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(20), () => new InfrMaterialsDeliveryEffectItem_1.InfrMaterialsDeliveryEffectItem());
  }
  async _5m() {
    await this.k4m.CreateByActorAsync(this.GetButton(24).GetOwner());
    this.k4m.SetFunction(this.Q4m);
  }
  async u5m() {
    await this.q4m.CreateByActorAsync(this.GetButton(26).GetOwner());
    this.q4m.SetFunction(this.K4m);
  }
  async c5m() {
    await this.O4m.CreateByActorAsync(this.GetButton(33).GetOwner());
    this.O4m.SetFunction(this.X4m);
  }
  async d5m() {
    await this.G4m.CreateByActorAsync(this.GetButton(34).GetOwner());
    this.G4m.SetFunction(this.Y4m);
  }
  async m5m() {
    await this.BZa.CreateByActorAsync(this.GetItem(31).GetOwner());
  }
  async g5m() {
    await this.N4m.CreateByActorAsync(this.GetItem(32).GetOwner());
  }
  async f5m() {
    await this.F4m.CreateByActorAsync(this.GetItem(30).GetOwner());
    this.F4m.SetOnClickFunction(this.e5m);
  }
  OnStart() {
    this.Refresh(this.OpenParam);
  }
  Refresh(t) {
    this.Fq(t);
    if (this.x4m !== Protocol_1.Aki.Protocol.VNm.Proto_Road || this.U4m !== 0) {
      this.cQa();
      this.mGe();
      this.J4m();
      this.y5m();
      this.pB1();
      this._jm();
      this.Pke();
      this.S5m();
      this.M5m();
    }
  }
  Fq(t) {
    this.U4m = t?.RoadId ?? 0;
    this.x4m = t?.DeliveryType ?? Protocol_1.Aki.Protocol.VNm.Proto_Road;
    this.D4m = t?.OpenSource ?? 1;
    this.V4m = true;
  }
  cQa() {
    if (this.D4m === 0) {
      this.Qyi.SetHelpCallBack(() => {
        var t = ConfigManager_1.ConfigManager.InfrastructureConfig.GetHelpIdActivity();
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(t);
      });
      this.Qyi.SetCloseCallBack(this.zYm);
    } else {
      this.Qyi.SetUiActive(false);
    }
    this.GetButton(36).RootUIComp.SetUIActive(false);
  }
  mGe() {
    this.GetText(0).ShowTextNew(this.eBn());
    this.GetSprite(40).SetUIActive(false);
    this.GetText(41).SetUIActive(false);
    var t;
    var i = ModelManager_1.ModelManager.InfrastructureModel;
    if (this.x4m === Protocol_1.Aki.Protocol.VNm.Proto_Road) {
      this.GetText(1).SetText(this.s5m() + "m");
      if (this.U4m === i.TracedRoadId) {
        this.GetSprite(40).SetUIActive(true);
        t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_InfrastructureMapMark1");
        this.SetSpriteByPath(t, this.GetSprite(40), false);
      } else if (this.U4m === i.RecommendRoadId) {
        this.GetSprite(40).SetUIActive(true);
        t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_InfrastructureMapMark2");
        this.SetSpriteByPath(t, this.GetSprite(40), false);
      }
    } else {
      this.GetText(41).SetUIActive(false);
      this.GetText(41).ShowTextNew(this.i5m().Description);
      this.GetText(1).SetUIActive(false);
    }
    if (this.D4m === 1 && this.a5m()) {
      this.SetTextureByPath(this.a5m(), this.GetTexture(29));
    } else {
      this.GetTexture(29).SetUIActive(false);
    }
  }
  J4m() {
    this.GetText(3).ShowTextNew(this.n5m());
    this.GetText(6).ShowTextNew(this.n5m());
    this.GetText(8).ShowTextNew(this.n5m());
    this.GetText(8).GetRealSize();
    if (this.GetText(8).GetRenderLineNum() > InfrastructureDefine_1.MAX_INFR_MARK_INFO_LINE_NUM) {
      this.GetItem(2).SetUIActive(this.V4m);
      this.GetItem(5).SetUIActive(false);
      this.GetItem(7).SetUIActive(!this.V4m);
    } else {
      this.GetItem(2).SetUIActive(false);
      this.GetItem(5).SetUIActive(true);
      this.GetItem(7).SetUIActive(false);
    }
  }
  y5m() {
    if (this.x4m === Protocol_1.Aki.Protocol.VNm.Proto_Road) {
      this.dqf();
    } else {
      this.mqf();
    }
  }
  dqf() {
    this.GetItem(9).SetUIActive(true);
    var t = this.t5m();
    var i = this.h5m();
    var e = i?.Status ?? Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusLock;
    this.GetItem(11).SetUIActive(e !== Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusComplete);
    this.GetText(15).SetUIActive(e === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusComplete);
    var r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(InfrastructureDefine_1.difficultySpriteResourceId[t.Difficulty]).Path;
    this.SetSpriteByPath(r, this.GetSprite(12), true);
    this.GetSprite(12).SetUIActive(t.Difficulty >= 1);
    this.GetSprite(13).SetUIActive(false);
    this.GetSprite(14).SetUIActive(false);
    var r = new Date((i?.CompleteTime ?? 0) * TimeUtil_1.TimeUtil.InverseMillisecond);
    this.GetText(15).SetText(TimeUtil_1.TimeUtil.DateFormat3(r));
    if (e === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusComplete) {
      this.GetText(10).ShowTextNew("Build_CompleteTime");
    } else {
      this.GetText(10).ShowTextNew("Build_BuildingDiff");
    }
  }
  mqf() {
    var t;
    if (ModelManager_1.ModelManager.InfrastructureModel.FireLevel < ConfigManager_1.ConfigManager.InfrastructureConfig.GetMaxLevel()) {
      this.GetItem(9).SetUIActive(false);
    } else {
      this.GetText(10).ShowTextNew("Build_CompleteTime");
      t = new Date(ModelManager_1.ModelManager.InfrastructureModel.FireLevelReachTime * TimeUtil_1.TimeUtil.InverseMillisecond);
      this.GetItem(11).SetUIActive(false);
      this.GetText(15).SetUIActive(true);
      this.GetText(15).SetText(TimeUtil_1.TimeUtil.DateFormat3(t));
    }
  }
  Pke() {
    var t = this.r5m().sort((t, i) => t[0] - i[0]).map(([t, i]) => [{
      ItemId: t,
      IncId: 0
    }, i]);
    this.pji.RefreshByData(t);
    if (t.length === 0) {
      this.GetItem(16).SetUIActive(false);
    } else if (this.x4m === Protocol_1.Aki.Protocol.VNm.Proto_Road) {
      t = this.h5m()?.Status ?? Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusLock;
      this.GetItem(16).SetUIActive(t === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusProgress);
    } else {
      this.GetItem(16).SetUIActive(ModelManager_1.ModelManager.InfrastructureModel.FireLevel < ConfigManager_1.ConfigManager.InfrastructureConfig.GetMaxLevel());
    }
  }
  pB1() {
    var t;
    if (this.x4m === Protocol_1.Aki.Protocol.VNm.Proto_Observatory || this.h5m().Status !== Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusProgress) {
      this.GetItem(18).SetUIActive(false);
    } else {
      t = this.o5m();
      this.GetItem(18).SetUIActive(t.length > 0);
      this.B4m.RefreshByData(this.o5m());
    }
  }
  _jm() {
    if (this.x4m === Protocol_1.Aki.Protocol.VNm.Proto_Road || ModelManager_1.ModelManager.InfrastructureModel.FireLevel >= ConfigManager_1.ConfigManager.InfrastructureConfig.GetMaxLevel()) {
      this.GetItem(21).SetUIActive(false);
    } else {
      this.GetItem(21).SetUIActive(true);
      this.GetText(22).ShowTextNew("Observatory_FunctionOpenDesc");
    }
  }
  S5m() {
    var t;
    this.mGe();
    this.GetButton(33).RootUIComp.SetUIActive(false);
    this.GetButton(34).RootUIComp.SetUIActive(false);
    this.GetButton(26).RootUIComp.SetUIActive(false);
    this.GetButton(24).RootUIComp.SetUIActive(false);
    this.GetItem(31).SetUIActive(false);
    this.GetItem(30).SetUIActive(false);
    this.GetItem(32).SetUIActive(false);
    if (this.x4m === Protocol_1.Aki.Protocol.VNm.Proto_Road) {
      t = this.h5m()?.Status ?? Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusLock;
      this.E5m(t);
    } else {
      this.I5m(ModelManager_1.ModelManager.InfrastructureModel.FireStatus);
    }
  }
  E5m(t) {
    var i;
    if (t === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusLock) {
      this.GetItem(31).SetUIActive(true);
      i = ConditionGroupById_1.configConditionGroupById.GetConfig(this.t5m().ConditionId);
      this.BZa.Refresh({
        LockDescriptionTextId: i.HintText
      });
      this.GetButton(33).RootUIComp.SetUIActive(true);
    } else if (t === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusProgress) {
      (this.D4m === 0 ? (this.GetButton(24).RootUIComp.SetUIActive(!this.t5m().DisableMark), this.GetButton(26)) : this.GetButton(34)).RootUIComp.SetUIActive(true);
      this.k4m.SetLocalTextNew(ModelManager_1.ModelManager.InfrastructureModel.TracedRoadId === this.U4m ? "BuildRoadNet_RoadButton_2" : "BuildRoadNet_RoadButton_1");
      if (this.l5m) {
        this.G4m.SetEnableClick(true);
      } else {
        this.GetItem(31).SetUIActive(true);
        this.BZa.Refresh({
          LockDescriptionTextId: "BuildRoad_MaterialShortageTips"
        });
        this.G4m.SetEnableClick(false);
      }
    } else {
      this.GetButton(26).RootUIComp.SetUIActive(true);
    }
  }
  I5m(t) {
    var i = ConfigManager_1.ConfigManager.InfrastructureConfig;
    var e = i.GetMaxLevel();
    if (ModelManager_1.ModelManager.InfrastructureModel.FireLevel >= e) {
      this.GetButton(26).RootUIComp.SetUIActive(true);
    } else if (t === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusLock) {
      this.GetItem(31).SetUIActive(true);
      e = ConditionGroupById_1.configConditionGroupById.GetConfig(this.i5m().ConditionId);
      this.BZa.Refresh({
        LockDescriptionTextId: e.HintText
      });
      this.GetButton(33).RootUIComp.SetUIActive(true);
    } else if (t === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusProgress) {
      this.GetButton(26).RootUIComp.SetUIActive(true);
      t = (e = ModelManager_1.ModelManager.InfrastructureModel).FireExp >= i.GetLevelConfigById(e.FireLevel + 1).Exp;
      if (this.D4m === 1) {
        this.GetButton(34).RootUIComp.SetUIActive(true);
      }
      if (this.l5m && t) {
        this.G4m.SetEnableClick(true);
      } else {
        this.GetItem(31).SetUIActive(true);
        this.G4m.SetEnableClick(false);
        this.BZa.Refresh({
          LockDescriptionTextId: "BuildRoad_ObserMaterialShortageTips"
        });
      }
    } else {
      this.GetButton(26).RootUIComp.SetUIActive(true);
    }
  }
  M5m() {
    if (this.x4m === Protocol_1.Aki.Protocol.VNm.Proto_Road) {
      this.GetItem(23).SetUIActive(false);
    } else {
      this.GetItem(23).SetUIActive(ModelManager_1.ModelManager.InfrastructureModel.FireLevel >= ConfigManager_1.ConfigManager.InfrastructureConfig.GetMaxLevel());
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(37), "BuildRoad_CompleteDes_1", MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.eBn()) ?? "");
    }
  }
  SetClickBtnBuildCb(t) {
    this.j4m = t;
  }
  SetClickCaptionCloseBtnCb(t) {
    this.YYm = t;
  }
  async ljm() {
    if (ModelManager_1.ModelManager.InfrastructureModel.TracedRoadId === this.U4m) {
      await InfrastructureController_1.InfrastructureController.RequestInfrManualCancelTraceRoadRequest();
      this.S5m();
    } else {
      await InfrastructureController_1.InfrastructureController.RequestInfrastructureManualSwitchTraceRoad(this.U4m);
      if (ModelManager_1.ModelManager.InfrastructureModel.TracedRoadId === this.U4m) {
        if (this.D4m === 0) {
          UiManager_1.UiManager.CloseView("InfrRoadNetworkInfoView");
          UiManager_1.UiManager.CloseView("InfrRoadNetworkMainView");
          ModelManager_1.ModelManager.InfrastructureModel.SetNeedHighlightTrackedRoad(true);
        } else {
          InfrastructureController_1.InfrastructureController.OpenInfrastructureMainView({
            NeedFocusBuildQuest: true,
            NeedPlayBuildSuccessSeq: false
          });
        }
      }
    }
  }
  async Pkf() {
    var t;
    var i;
    if (this.x4m === Protocol_1.Aki.Protocol.VNm.Proto_Road && this.h5m().Status === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusProgress && ModelManager_1.ModelManager.InfrastructureModel.TracedRoadId !== this.U4m && !this.t5m().DisableMark) {
      await InfrastructureController_1.InfrastructureController.RequestInfrastructureManualSwitchTraceRoad(this.U4m);
    }
    if (this.x4m === Protocol_1.Aki.Protocol.VNm.Proto_Road) {
      t = this.t5m();
      if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t.BuildConditionQuestId) === 3) {
        i = {
          MarkType: 43,
          MarkId: this.t5m().MarkId
        };
        WorldMapController_1.WorldMapController.OpenView(2, false, i);
      } else {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(t.JumpId);
      }
    } else if (this.i5m().JumpId !== 0) {
      SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.i5m().JumpId);
    }
  }
}
exports.InfrMaterialsDeliveryInfoPanel = InfrMaterialsDeliveryInfoPanel;
//# sourceMappingURL=InfrMaterialsDeliveryInfoPanel.js.map