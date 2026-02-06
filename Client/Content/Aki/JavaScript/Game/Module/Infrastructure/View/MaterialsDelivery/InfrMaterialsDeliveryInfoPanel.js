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
    this.z5m = 0;
    this.J5m = 0;
    this.Z5m = Protocol_1.Aki.Protocol.a4m.Proto_Road;
    this.pji = undefined;
    this.eVm = undefined;
    this.tVm = new ButtonItem_1.ButtonItem();
    this.iVm = new ButtonItem_1.ButtonItem();
    this.rVm = new ButtonItem_1.ButtonItem();
    this.oVm = new ButtonItem_1.ButtonItem();
    this.BZa = new InfrMaterialsDeliveryLockItem_1.InfrMaterialsDeliveryLockItem();
    this.nVm = new InfrMaterialsDeliveryLockItem_1.InfrMaterialsDeliveryLockItem();
    this.sVm = new InfrMaterialsDeliveryLockItem_1.InfrMaterialsDeliveryDoneItem();
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    this.aVm = false;
    this.hVm = undefined;
    this.TZm = undefined;
    this.cVm = () => {
      this.yHm();
    };
    this.dVm = () => {
      this.T3f();
    };
    this.mVm = () => {
      var t;
      if (this.Z5m === Protocol_1.Aki.Protocol.a4m.Proto_Road) {
        if (this.RVm().Status === Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusLock) {
          t = CommonParamById_1.configCommonParamById.GetIntConfig("InfrTeachStageEndQuestId");
          UiManager_1.UiManager.OpenView("QuestView", t);
        } else {
          UiManager_1.UiManager.OpenView("QuestView", this.yVm()?.BuildQuest);
        }
      }
    };
    this.fVm = () => {
      this.hVm?.();
    };
    this.I5t = () => {
      this.TZm?.();
    };
    this.gVm = () => {
      this.aVm = false;
      this.CVm();
    };
    this.pVm = () => {
      this.aVm = true;
      this.CVm();
    };
    this.bZm = () => {
      this.TZm?.();
    };
    this.vVm = () => {};
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIItem], [12, UE.UISprite], [13, UE.UISprite], [14, UE.UISprite], [15, UE.UIText], [16, UE.UIItem], [17, UE.UIHorizontalLayout], [18, UE.UIItem], [19, UE.UIText], [20, UE.UIVerticalLayout], [21, UE.UIItem], [22, UE.UIText], [23, UE.UIItem], [24, UE.UIButtonComponent], [25, UE.UIText], [26, UE.UIButtonComponent], [27, UE.UIText], [28, UE.UIItem], [29, UE.UITexture], [30, UE.UIItem], [31, UE.UIItem], [32, UE.UIItem], [33, UE.UIButtonComponent], [34, UE.UIButtonComponent], [35, UE.UIButtonComponent], [36, UE.UIButtonComponent], [37, UE.UIText], [38, UE.UIText], [39, UE.UIItem], [40, UE.UISprite], [41, UE.UIText]];
    this.BtnBindInfo = [[4, this.gVm], [35, this.pVm], [36, this.I5t]];
  }
  yVm() {
    return ConfigManager_1.ConfigManager.InfrastructureConfig.GetRoadConfigById(this.J5m);
  }
  SVm() {
    return ConfigManager_1.ConfigManager.InfrastructureConfig.GetLevelConfigById(ModelManager_1.ModelManager.InfrastructureModel.FireLevel);
  }
  MVm() {
    if (this.Z5m === Protocol_1.Aki.Protocol.a4m.Proto_Road) {
      return Array.from(this.yVm().Requirement.entries()).sort((t, i) => t[0] - i[0]);
    } else {
      return Array.from(this.SVm().Requirement.entries()).sort((t, i) => t[0] - i[0]);
    }
  }
  EVm() {
    var t;
    var i;
    if (this.Z5m !== Protocol_1.Aki.Protocol.a4m.Proto_Observatory && (t = this.yVm(), this.RVm().Status === Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusProgress)) {
      i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.EffectDes[0]);
      return [StringUtils_1.StringUtils.Format(i, t.FireExpReward.toString())];
    } else {
      return [];
    }
  }
  eBn() {
    return (this.Z5m === Protocol_1.Aki.Protocol.a4m.Proto_Road ? this.yVm() : this.SVm()).Name;
  }
  IVm() {
    if (this.Z5m === Protocol_1.Aki.Protocol.a4m.Proto_Road) {
      if (this.RVm().Status === Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusComplete) {
        return this.yVm().BuildDoneDes;
      } else {
        return this.yVm().Description;
      }
    } else {
      return this.SVm().StageDescription;
    }
  }
  TVm() {
    if (this.Z5m === Protocol_1.Aki.Protocol.a4m.Proto_Road) {
      return this.yVm().Length;
    } else {
      return 0;
    }
  }
  bVm() {
    return (this.Z5m === Protocol_1.Aki.Protocol.a4m.Proto_Road ? this.yVm() : this.SVm()).InfoPicturePath;
  }
  RVm() {
    return ModelManager_1.ModelManager.InfrastructureModel.GetRoadDataByRoadId(this.J5m);
  }
  get wVm() {
    var t = this.MVm();
    const e = ModelManager_1.ModelManager.InventoryModel;
    return t.every(([t, i]) => e.GetItemCountByConfigId(t) >= i);
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.e7a(), this.LVm(), this.PVm(), this.AVm(), this.DVm(), this.UVm(), this.xVm(), this.BVm()]);
    this.kVm();
    this.qVm();
  }
  async e7a() {
    await this.Qyi.CreateThenShowByActorAsync(this.GetItem(39).GetOwner());
    await this.Qyi.SetCurrencyItemList([InfrastructureDefine_1.INFR_BATTLE_MATERIAL_ID, InfrastructureDefine_1.INFR_COLLECTION_MATERIAL_ID, InfrastructureDefine_1.INFR_QUEST_MATERIAL_ID]);
  }
  kVm() {
    this.pji = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(17), () => new InfrMaterialsDeliveryConsumeItem_1.InfrMaterialsDeliveryConsumeItem());
  }
  qVm() {
    this.eVm = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(20), () => new InfrMaterialsDeliveryEffectItem_1.InfrMaterialsDeliveryEffectItem());
  }
  async LVm() {
    await this.tVm.CreateByActorAsync(this.GetButton(24).GetOwner());
    this.tVm.SetFunction(this.cVm);
  }
  async PVm() {
    await this.iVm.CreateByActorAsync(this.GetButton(26).GetOwner());
    this.iVm.SetFunction(this.dVm);
  }
  async AVm() {
    await this.rVm.CreateByActorAsync(this.GetButton(33).GetOwner());
    this.rVm.SetFunction(this.mVm);
  }
  async DVm() {
    await this.oVm.CreateByActorAsync(this.GetButton(34).GetOwner());
    this.oVm.SetFunction(this.fVm);
  }
  async UVm() {
    await this.BZa.CreateByActorAsync(this.GetItem(31).GetOwner());
  }
  async BVm() {
    await this.sVm.CreateByActorAsync(this.GetItem(32).GetOwner());
  }
  async xVm() {
    await this.nVm.CreateByActorAsync(this.GetItem(30).GetOwner());
    this.nVm.SetOnClickFunction(this.vVm);
  }
  OnStart() {
    this.Refresh(this.OpenParam);
  }
  Refresh(t) {
    this.Fq(t);
    if (this.Z5m !== Protocol_1.Aki.Protocol.a4m.Proto_Road || this.J5m !== 0) {
      this.cQa();
      this.mGe();
      this.CVm();
      this.GVm();
      this.pB1();
      this.SHm();
      this.Pke();
      this.FVm();
      this.NVm();
    }
  }
  Fq(t) {
    this.J5m = t?.RoadId ?? 0;
    this.Z5m = t?.DeliveryType ?? Protocol_1.Aki.Protocol.a4m.Proto_Road;
    this.z5m = t?.OpenSource ?? 1;
    this.aVm = true;
  }
  cQa() {
    if (this.z5m === 0) {
      this.Qyi.SetHelpCallBack(() => {
        var t = ConfigManager_1.ConfigManager.InfrastructureConfig.GetHelpIdActivity();
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(t);
      });
      this.Qyi.SetCloseCallBack(this.bZm);
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
    if (this.Z5m === Protocol_1.Aki.Protocol.a4m.Proto_Road) {
      this.GetText(1).SetText(this.TVm() + "m");
      if (this.J5m === i.TracedRoadId) {
        this.GetSprite(40).SetUIActive(true);
        t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_InfrastructureMapMark1");
        this.SetSpriteByPath(t, this.GetSprite(40), false);
      } else if (this.J5m === i.RecommendRoadId) {
        this.GetSprite(40).SetUIActive(true);
        t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_InfrastructureMapMark2");
        this.SetSpriteByPath(t, this.GetSprite(40), false);
      }
    } else {
      this.GetText(41).SetUIActive(false);
      this.GetText(41).ShowTextNew(this.SVm().Description);
      this.GetText(1).SetUIActive(false);
    }
    if (this.z5m === 1 && this.bVm()) {
      this.SetTextureByPath(this.bVm(), this.GetTexture(29));
    } else {
      this.GetTexture(29).SetUIActive(false);
    }
  }
  CVm() {
    this.GetText(3).ShowTextNew(this.IVm());
    this.GetText(6).ShowTextNew(this.IVm());
    this.GetText(8).ShowTextNew(this.IVm());
    this.GetText(8).GetRealSize();
    if (this.GetText(8).GetRenderLineNum() > InfrastructureDefine_1.MAX_INFR_MARK_INFO_LINE_NUM) {
      this.GetItem(2).SetUIActive(this.aVm);
      this.GetItem(5).SetUIActive(false);
      this.GetItem(7).SetUIActive(!this.aVm);
    } else {
      this.GetItem(2).SetUIActive(false);
      this.GetItem(5).SetUIActive(true);
      this.GetItem(7).SetUIActive(false);
    }
  }
  GVm() {
    if (this.Z5m === Protocol_1.Aki.Protocol.a4m.Proto_Road) {
      this.SVf();
    } else {
      this.MVf();
    }
  }
  SVf() {
    this.GetItem(9).SetUIActive(true);
    var t = this.yVm();
    var i = this.RVm();
    var e = i?.Status ?? Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusLock;
    this.GetItem(11).SetUIActive(e !== Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusComplete);
    this.GetText(15).SetUIActive(e === Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusComplete);
    var r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(InfrastructureDefine_1.difficultySpriteResourceId[t.Difficulty]).Path;
    this.SetSpriteByPath(r, this.GetSprite(12), true);
    this.GetSprite(12).SetUIActive(t.Difficulty >= 1);
    this.GetSprite(13).SetUIActive(false);
    this.GetSprite(14).SetUIActive(false);
    var r = new Date((i?.CompleteTime ?? 0) * TimeUtil_1.TimeUtil.InverseMillisecond);
    this.GetText(15).SetText(TimeUtil_1.TimeUtil.DateFormat3(r));
    if (e === Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusComplete) {
      this.GetText(10).ShowTextNew("Build_CompleteTime");
    } else {
      this.GetText(10).ShowTextNew("Build_BuildingDiff");
    }
  }
  MVf() {
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
    var t = this.MVm().sort((t, i) => t[0] - i[0]).map(([t, i]) => [{
      ItemId: t,
      IncId: 0
    }, i]);
    this.pji.RefreshByData(t);
    if (t.length === 0) {
      this.GetItem(16).SetUIActive(false);
    } else if (this.Z5m === Protocol_1.Aki.Protocol.a4m.Proto_Road) {
      t = this.RVm()?.Status ?? Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusLock;
      this.GetItem(16).SetUIActive(t === Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusProgress);
    } else {
      this.GetItem(16).SetUIActive(ModelManager_1.ModelManager.InfrastructureModel.FireLevel < ConfigManager_1.ConfigManager.InfrastructureConfig.GetMaxLevel());
    }
  }
  pB1() {
    var t;
    if (this.Z5m === Protocol_1.Aki.Protocol.a4m.Proto_Observatory || this.RVm().Status !== Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusProgress) {
      this.GetItem(18).SetUIActive(false);
    } else {
      t = this.EVm();
      this.GetItem(18).SetUIActive(t.length > 0);
      this.eVm.RefreshByData(this.EVm());
    }
  }
  SHm() {
    if (this.Z5m === Protocol_1.Aki.Protocol.a4m.Proto_Road || ModelManager_1.ModelManager.InfrastructureModel.FireLevel >= ConfigManager_1.ConfigManager.InfrastructureConfig.GetMaxLevel()) {
      this.GetItem(21).SetUIActive(false);
    } else {
      this.GetItem(21).SetUIActive(true);
      this.GetText(22).ShowTextNew("Observatory_FunctionOpenDesc");
    }
  }
  FVm() {
    var t;
    this.mGe();
    this.GetButton(33).RootUIComp.SetUIActive(false);
    this.GetButton(34).RootUIComp.SetUIActive(false);
    this.GetButton(26).RootUIComp.SetUIActive(false);
    this.GetButton(24).RootUIComp.SetUIActive(false);
    this.GetItem(31).SetUIActive(false);
    this.GetItem(30).SetUIActive(false);
    this.GetItem(32).SetUIActive(false);
    if (this.Z5m === Protocol_1.Aki.Protocol.a4m.Proto_Road) {
      t = this.RVm()?.Status ?? Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusLock;
      this.VVm(t);
    } else {
      this.jVm(ModelManager_1.ModelManager.InfrastructureModel.FireStatus);
    }
  }
  VVm(t) {
    var i;
    if (t === Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusLock) {
      this.GetItem(31).SetUIActive(true);
      i = ConditionGroupById_1.configConditionGroupById.GetConfig(this.yVm().ConditionId);
      this.BZa.Refresh({
        LockDescriptionTextId: i.HintText
      });
      this.GetButton(33).RootUIComp.SetUIActive(true);
    } else if (t === Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusProgress) {
      (this.z5m === 0 ? (this.GetButton(24).RootUIComp.SetUIActive(!this.yVm().DisableMark), this.GetButton(26)) : this.GetButton(34)).RootUIComp.SetUIActive(true);
      this.tVm.SetLocalTextNew(ModelManager_1.ModelManager.InfrastructureModel.TracedRoadId === this.J5m ? "BuildRoadNet_RoadButton_2" : "BuildRoadNet_RoadButton_1");
      if (this.wVm) {
        this.oVm.SetEnableClick(true);
      } else {
        this.GetItem(31).SetUIActive(true);
        this.BZa.Refresh({
          LockDescriptionTextId: "BuildRoad_MaterialShortageTips"
        });
        this.oVm.SetEnableClick(false);
      }
    } else {
      this.GetButton(26).RootUIComp.SetUIActive(true);
    }
  }
  jVm(t) {
    var i = ConfigManager_1.ConfigManager.InfrastructureConfig;
    var e = i.GetMaxLevel();
    if (ModelManager_1.ModelManager.InfrastructureModel.FireLevel >= e) {
      this.GetButton(26).RootUIComp.SetUIActive(true);
    } else if (t === Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusLock) {
      this.GetItem(31).SetUIActive(true);
      e = ConditionGroupById_1.configConditionGroupById.GetConfig(this.SVm().ConditionId);
      this.BZa.Refresh({
        LockDescriptionTextId: e.HintText
      });
      this.GetButton(33).RootUIComp.SetUIActive(true);
    } else if (t === Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusProgress) {
      this.GetButton(26).RootUIComp.SetUIActive(true);
      t = (e = ModelManager_1.ModelManager.InfrastructureModel).FireExp >= i.GetLevelConfigById(e.FireLevel + 1).Exp;
      if (this.z5m === 1) {
        this.GetButton(34).RootUIComp.SetUIActive(true);
      }
      if (this.wVm && t) {
        this.oVm.SetEnableClick(true);
      } else {
        this.GetItem(31).SetUIActive(true);
        this.oVm.SetEnableClick(false);
        this.BZa.Refresh({
          LockDescriptionTextId: "BuildRoad_ObserMaterialShortageTips"
        });
      }
    } else {
      this.GetButton(26).RootUIComp.SetUIActive(true);
    }
  }
  NVm() {
    if (this.Z5m === Protocol_1.Aki.Protocol.a4m.Proto_Road) {
      this.GetItem(23).SetUIActive(false);
    } else {
      this.GetItem(23).SetUIActive(ModelManager_1.ModelManager.InfrastructureModel.FireLevel >= ConfigManager_1.ConfigManager.InfrastructureConfig.GetMaxLevel());
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(37), "BuildRoad_CompleteDes_1", MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.eBn()) ?? "");
    }
  }
  SetClickBtnBuildCb(t) {
    this.hVm = t;
  }
  SetClickCaptionCloseBtnCb(t) {
    this.TZm = t;
  }
  async yHm() {
    if (ModelManager_1.ModelManager.InfrastructureModel.TracedRoadId === this.J5m) {
      await InfrastructureController_1.InfrastructureController.RequestInfrManualCancelTraceRoadRequest();
      this.FVm();
    } else {
      await InfrastructureController_1.InfrastructureController.RequestInfrastructureManualSwitchTraceRoad(this.J5m);
      if (ModelManager_1.ModelManager.InfrastructureModel.TracedRoadId === this.J5m) {
        if (this.z5m === 0) {
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
  async T3f() {
    var t;
    var i;
    if (this.Z5m === Protocol_1.Aki.Protocol.a4m.Proto_Road && this.RVm().Status === Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusProgress && ModelManager_1.ModelManager.InfrastructureModel.TracedRoadId !== this.J5m && !this.yVm().DisableMark) {
      await InfrastructureController_1.InfrastructureController.RequestInfrastructureManualSwitchTraceRoad(this.J5m);
    }
    if (this.Z5m === Protocol_1.Aki.Protocol.a4m.Proto_Road) {
      t = this.yVm();
      if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t.BuildConditionQuestId) === 3) {
        i = {
          MarkType: 43,
          MarkId: this.yVm().MarkId
        };
        WorldMapController_1.WorldMapController.OpenView(2, false, i);
      } else {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(t.JumpId);
      }
    } else if (this.SVm().JumpId !== 0) {
      SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.SVm().JumpId);
    }
  }
}
exports.InfrMaterialsDeliveryInfoPanel = InfrMaterialsDeliveryInfoPanel;
//# sourceMappingURL=InfrMaterialsDeliveryInfoPanel.js.map