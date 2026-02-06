"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashLevelUpTabView = exports.CalabashAttributeContentItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const ConditionGroupById_1 = require("../../../../../Core/Define/ConfigQuery/ConditionGroupById");
const PropRewardConfById_1 = require("../../../../../Core/Define/ConfigQuery/PropRewardConfById");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const FormationAttributeController_1 = require("../../../Abilities/FormationAttributeController");
const AutoAttachItem_1 = require("../../../AutoAttach/AutoAttachItem");
const NoCircleAttachView_1 = require("../../../AutoAttach/NoCircleAttachView");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const RoleDefine_1 = require("../../../RoleUi/RoleDefine");
const RoleLevelUpSuccessController_1 = require("../../../RoleUi/RoleLevel/RoleLevelUpSuccessController");
const LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CalabashController_1 = require("../../CalabashController");
const CalabashDefine_1 = require("../../CalabashDefine");
const CalabashLevelUpRewardItemGrid_1 = require("./CalabashLevelUpRewardItemGrid");
class CalabashGridData {
  constructor() {
    this.Level = 0;
    this.OverFlowExp = 0;
    this.LimitExp = 0;
    this.MaxExp = 0;
    this.IsMaxLevel = false;
    this.HasOverFlowExpReach = false;
  }
}
const tempVector = new UE.Vector();
class CalabashGrid extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments);
    this.ButtonFunction = undefined;
    this.ItemCurve = undefined;
    this.Xpt = () => {
      this.ButtonFunction?.(this.CurrentShowItemIndex);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIButtonComponent], [13, UE.UIItem], [14, UE.UINiagara], [15, UE.UITexture], [16, UE.UITexture]];
    this.BtnBindInfo = [[12, this.Xpt]];
  }
  OnRefreshItem(t) {
    var e = t.Level;
    var i = ModelManager_1.ModelManager.CalabashModel.GetReceiveRewardStateByLevel(e);
    var a = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel();
    var r = e <= a;
    this.GetItem(2)?.SetUIActive(r);
    this.GetItem(1)?.SetUIActive(!r);
    this.GetItem(4).SetUIActive(i === 2);
    this.GetItem(10).SetUIActive(i === 3);
    this.GetItem(11).SetUIActive(e > 0 && i !== 3);
    if (t.IsMaxLevel) {
      this.GetItem(5).SetUIActive(false);
    } else {
      this.GetItem(5).SetUIActive(true);
      r = t.MaxExp;
      i = t.OverFlowExp;
      this.GetSprite(6).SetFillAmount(i / r);
      this.GetSprite(7).SetFillAmount(t.LimitExp / r);
    }
    this.GetItem(8)?.SetUIActive(t.HasOverFlowExpReach);
    this.GetItem(9)?.SetUIActive(!t.HasOverFlowExpReach);
    var i = this.GetCurrentSelectedState();
    this.SetSelectState(i);
    this.Olt(a, e);
    this.W2m(a, e);
  }
  W2m(t, e) {
    var i = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(e);
    if (i && (t = e <= t && e >= CalabashDefine_1.CALABASH_SPECIALUI_LEVEL, this.GetItem(13)?.SetUIActive(t), t)) {
      if (!StringUtils_1.StringUtils.IsEmpty(i.TexPatternStatePath)) {
        this.TrySetTextureByPath(i.TexPatternStatePath, this.GetTexture(15));
      }
      if (!StringUtils_1.StringUtils.IsEmpty(i.TexAddLight)) {
        this.TrySetTextureByPath(i.TexAddLight, this.GetTexture(16));
      }
    }
  }
  Olt(t, e) {
    var i = this.GetText(3);
    if (i && (t = e <= t, i.SetText(e.toString()), e = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(e))) {
      i.SetChangeColor(t, UE.Color.FromHex(e.ReachTextChangeColor));
      i.SetFontOutlineColor(UE.Color.FromHex(e.ReachTextOutlineColor));
      i.outlineSize = t ? e.ReachTextOutlineSize : 0;
    }
  }
  OnSelect() {
    this.SetSelectState(true);
    this.Xpt();
  }
  OnUnSelect() {
    this.SetSelectState(false);
  }
  SetSelectState(t) {}
  OnMoveItem() {
    var t = this.GetCurrentMovePercentage();
    var t = this.ItemCurve.GetFloatValue(t);
    tempVector.X = t;
    tempVector.Y = t;
    tempVector.Z = 1;
    this.GetItem(0)?.SetUIItemScale(tempVector);
    tempVector.X = 1 / t;
    tempVector.Y = 1 / t;
    tempVector.Z = 1;
    this.GetItem(4)?.SetUIItemScale(tempVector);
  }
}
class CalabashAttributeData {
  constructor() {
    this.Type = -1;
    this.Name = undefined;
    this.Value = undefined;
    this.IsUp = false;
    this.IsCost = false;
    this.CostCount = 0;
    this.CurrentSelect = false;
    this.CurrentSelectLevel = 0;
    this.ClickCallBack = undefined;
    this.IsToggleRaycast = false;
  }
}
class CalabashAttributeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.gNe = undefined;
    this.$pt = undefined;
    this.Pe = undefined;
    this.Ypt = false;
    this.kqe = () => {
      this.Pe?.ClickCallBack?.(this.Pe);
    };
    this.sGe = () => {
      return new CalabashAttributeContentItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIVerticalLayout], [8, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(false);
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.gNe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(7), this.sGe);
  }
  Jpt(t) {
    this.GetItem(3)?.SetUIActive(false);
    var e = this.GetText(2);
    e?.SetUIActive(true);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, t.Value.TextKey, ...t.Value.Params);
    this.GetItem(6)?.SetUIActive(false);
  }
  zpt(t) {
    this.GetItem(3)?.SetUIActive(false);
    var e = this.GetText(2);
    e?.SetUIActive(true);
    if (t.Value) {
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(e, t.Value.TextKey, ...t.Value.Params);
    }
    var e = new Array();
    let i = new CalabashAttributeContentData();
    i.Type = 0;
    i.StringKey = "UpAbsorptionTarget";
    i.StringValue = new LguiUtil_1.TableTextArgNew("UpAbsorptionTargetName");
    e.push(i);
    (i = new CalabashAttributeContentData()).Type = 0;
    i.StringKey = "UpAbsorptionTimeText";
    var t = t.CurrentSelectLevel;
    var a = ModelManager_1.ModelManager.CalabashModel?.GetLeftIntensifyCaptureGuarantee() ?? 0;
    var t = ConfigManager_1.ConfigManager.CalabashConfig?.GetCalabashConfigByLevel(t)?.IntensifyCaptureGuarantee ?? 0;
    i.StringValue = new LguiUtil_1.TableTextArgNew("UpAbsorptionTimeDescText", a.toString(), t.toString());
    e.push(i);
    this.gNe?.RefreshByData(e);
  }
  Q2m(t) {
    this.GetItem(3)?.SetUIActive(false);
    var e = this.GetText(2);
    e?.SetUIActive(true);
    if (t.Value) {
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(e, t.Value.TextKey, ...t.Value.Params);
    }
    var e = new Array();
    let i = new CalabashAttributeContentData();
    i.Type = 0;
    i.StringKey = "UpAbsorptionTarget";
    i.StringValue = new LguiUtil_1.TableTextArgNew("UpAbsorptionTargetName_Junior");
    e.push(i);
    (i = new CalabashAttributeContentData()).Type = 0;
    i.StringKey = "UpAbsorptionTimeText";
    var t = t.CurrentSelectLevel;
    var a = ModelManager_1.ModelManager.CalabashModel?.GetLeftLowCostIntensifyCaptureGuarantee() ?? 0;
    var t = ConfigManager_1.ConfigManager.CalabashConfig?.GetCalabashConfigByLevel(t)?.LowCostIntensifyCaptureGuarantee ?? 0;
    i.StringValue = new LguiUtil_1.TableTextArgNew("UpAbsorptionTimeDescText", a.toString(), t.toString());
    e.push(i);
    this.gNe?.RefreshByData(e);
  }
  Zpt(t) {
    this.GetItem(3)?.SetUIActive(true);
    this.GetText(4)?.SetText(t.CostCount.toString());
    this.GetText(2)?.SetUIActive(false);
    this.GetItem(6)?.SetUIActive(false);
  }
  evt(t) {
    this.GetItem(3)?.SetUIActive(false);
    var e = this.GetText(2);
    e?.SetUIActive(true);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, t.Value.TextKey, ...t.Value.Params);
    var e = t.CurrentSelectLevel;
    var t = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(e)?.QualityDropWeight;
    this.GetItem(6)?.SetUIActive(true);
    const a = new Array();
    t?.forEach((t, e) => {
      var i;
      if (t > 0) {
        (i = new CalabashAttributeContentData()).Type = 2;
        i.Key = e;
        i.Value = t;
        a.push(i);
      }
    });
    this.gNe?.RefreshByData(a);
  }
  tvt() {
    if (this.Pe?.CurrentSelect) {
      this.GetExtendToggle(0)?.SetToggleState(1);
    } else {
      this.GetExtendToggle(0)?.SetToggleState(0);
    }
  }
  Refresh(t, e, i) {
    this.Pe = t;
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), t.Name);
    this.GetItem(5)?.SetUIActive(t.Type === 3 && t.IsUp);
    this.tvt();
    this.K2m(t.IsToggleRaycast);
    switch (t.Type) {
      case 0:
        this.Jpt(t);
        break;
      case 1:
        this.zpt(t);
        break;
      case 2:
        this.Q2m(t);
        break;
      case 4:
        this.Zpt(t);
        break;
      case 3:
        this.evt(t);
    }
    if (this.Ypt !== t.CurrentSelect) {
      this.Ypt = t.CurrentSelect;
      this.ivt(this.Ypt);
    }
  }
  K2m(t) {
    this.GetExtendToggle(0)?.RootUIComp.SetRaycastTarget(t);
  }
  ivt(t) {
    this.$pt?.PlaySequencePurely(t ? "Show" : "Hide");
  }
}
class CalabashAttributeContentData {
  constructor() {
    this.Type = -1;
    this.Key = 0;
    this.Value = 0;
    this.StringKey = undefined;
    this.StringValue = undefined;
  }
}
class CalabashAttributeContentItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  Refresh(t, e, i) {
    var a;
    if (t.Type === 0) {
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(0), t.StringKey);
      if (t.StringValue) {
        LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), t.StringValue.TextKey, ...t.StringValue.Params);
      }
      this.GetText(0)?.SetColor(UE.Color.FromHex("ECE5D8BF"));
      this.GetText(1)?.SetColor(UE.Color.FromHex("ECE5D8BF"));
    } else if (t.Type === 2) {
      a = t.Key;
      t = t.Value;
      a = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(a);
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(0), a?.Name);
      this.GetText(0)?.SetColor(UE.Color.FromHex(a.DropColor));
      this.GetText(1)?.SetText(StringUtils_1.StringUtils.Format("{0}%", t.toString()));
      this.GetText(1)?.SetColor(UE.Color.FromHex(a.DropColor));
    }
  }
}
exports.CalabashAttributeContentItem = CalabashAttributeContentItem;
class CalabashLevelUpTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.ovt = undefined;
    this.rvt = undefined;
    this.nvt = undefined;
    this.svt = [];
    this.X2m = [];
    this.H3e = undefined;
    this.xsm = 0;
    this.avt = [];
    this.hvt = undefined;
    this.lvt = 0;
    this._vt = -1;
    this.Hra = true;
    this.dpt = () => {
      var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(160);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    };
    this.uvt = (t, e, i) => {
      var a = new CalabashGrid();
      a.CreateThenShowByActor(t);
      a.ButtonFunction = this.cvt;
      a.ItemCurve = this.hvt;
      return a;
    };
    this.rOe = () => new CalabashLevelUpRewardItemGrid_1.CalabashLevelUpRewardItemGrid();
    this.mvt = () => new CalabashAttributeItem();
    this.g6e = () => {
      var t = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel();
      var t = Array.from({
        length: t + 1
      }, (t, e) => e).filter(t => ModelManager_1.ModelManager.CalabashModel.GetReceiveRewardStateByLevel(t) === 2);
      CalabashController_1.CalabashController.RequestMultiCalabashLevelReward(t);
    };
    this.dvt = e => {
      if (e === "CommonRewardView") {
        e = CommonParamById_1.configCommonParamById.GetIntConfig("StrengthItemId");
        if (this.xsm !== 0) {
          e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e);
          if (e && e.Parameters) {
            let t = 0;
            for (var [, i] of e.Parameters) {
              t = i;
              break;
            }
            if (t !== 0) {
              var a;
              var e = PropRewardConfById_1.configPropRewardConfById.GetConfig(t);
              if (e) {
                let t = 0;
                for (const r of e.Props) {
                  if (r.Id === RoleDefine_1.STRENGTH_MAX_ID) {
                    t = r.Value * this.xsm;
                    break;
                  }
                }
                if (t !== 0) {
                  e = FormationAttributeController_1.FormationAttributeController.GetBaseMax(1);
                  a = {
                    Name: (a = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(RoleDefine_1.STRENGTH_MAX_ID)).Name,
                    IconPath: a.Icon,
                    ShowArrow: true,
                    PreText: Math.floor((e - t) / 100).toString(),
                    CurText: Math.floor(e / 100).toString()
                  };
                  e = {
                    Title: "PrefabTextItem_HuluStaminaUp_Text",
                    StrengthUpgradeData: {
                      AttributeId: 1,
                      SingleStrengthValue: CommonParamById_1.configCommonParamById.GetIntConfig("SingleStrengthValue"),
                      MaxSingleStrengthItemCount: CommonParamById_1.configCommonParamById.GetIntConfig("MaxSingleStrengthItemCount"),
                      MaxStrength: e
                    },
                    AttributeInfo: [a]
                  };
                  RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(e);
                  this.Bsm();
                }
              }
            }
          }
        }
      }
    };
    this.cvt = t => {
      this.lvt = t;
      if (this.ovt.GetCurrentSelectIndex() !== t) {
        this.ovt.AttachToIndex(t);
      }
      this.Cvt();
    };
    this.gvt = t => {
      this._vt = t.Type === this._vt ? -1 : t.Type;
      this.fvt();
    };
    this.pvt = () => {
      this.vvt();
      this.Mvt();
      this.Evt();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIText], [4, UE.UIVerticalLayout], [5, UE.UIHorizontalLayout], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIText], [11, UE.UIText], [12, UE.UIItem]];
    this.BtnBindInfo = [[6, this.g6e], [2, this.dpt]];
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GetCalabashReward, this.pvt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.dvt);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GetCalabashReward, this.pvt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.dvt);
  }
  async OnCreateAsync() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CalabashCurve");
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat);
    this.hvt = await t.Promise;
  }
  OnStart() {
    this._vt = -1;
    this.ovt = new NoCircleAttachView_1.NoCircleAttachView(this.GetItem(0).GetOwner());
    var t = this.GetItem(1);
    t.SetUIActive(false);
    this.ovt.CreateItems(t.GetOwner(), 0, this.uvt);
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(5), this.rOe);
    this.nvt = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(4), this.mvt);
  }
  OnBeforeShow() {
    this.vvt(this.Hra);
    this.Hra = false;
    this.Evt();
  }
  Cvt() {
    this.Mvt();
    this.Bsm();
  }
  Mvt() {
    this.jqe();
    this.Svt();
    this.fvt();
  }
  Evt() {
    var t = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), "PrefabTextItem_HuluCurrentLv_Text", t);
    var e = ModelManager_1.ModelManager.CalabashModel.GetCalabashAllSchedule();
    var i = ModelManager_1.ModelManager.CalabashModel.GetCalabashOwnSchedule();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), "Phanton_CollectNum", i, e);
    this.Phf(t);
  }
  jqe() {
    var t = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(this.lvt).RewardId;
    if (t <= 0) {
      this.H3e?.SetActive(false);
      this.GetItem(12).SetUIActive(true);
    } else {
      var t = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(t);
      this.H3e?.SetActive(true);
      this.GetItem(12).SetUIActive(false);
      var i = ModelManager_1.ModelManager.CalabashModel.GetReceiveRewardStateByLevel(this.lvt);
      let e = 0;
      for (const a of t) {
        let t = undefined;
        if (e < this.avt.length) {
          t = this.avt[e];
        } else {
          t = new CalabashLevelUpRewardItemGrid_1.CalabashRewardItemData();
          this.avt.push(t);
        }
        t.ReceiveState = i;
        t.ItemData = [{
          ItemId: a[0],
          IncId: 0
        }, a[1]];
        e++;
      }
      this.H3e?.RefreshByData(this.avt);
    }
  }
  Bsm() {
    this.xsm = 0;
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("StrengthItemId");
    var i = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel();
    for (let t = 0; t <= i; t++) {
      if (ModelManager_1.ModelManager.CalabashModel.GetReceiveRewardStateByLevel(t) === 2) {
        var a = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(t).RewardId;
        if (!(a <= 0)) {
          for (const r of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(a)) {
            if (e === r[0]) {
              this.xsm += r[1];
              break;
            }
          }
        }
      }
    }
  }
  Svt() {
    var t;
    var e = ModelManager_1.ModelManager.CalabashModel.GetReceiveRewardStateByLevel(this.lvt);
    this.GetButton(6).RootUIComp.SetUIActive(e === 2);
    this.GetItem(8).SetUIActive(e === 1);
    this.GetItem(7).SetUIActive(e === 3);
    if (e === 1) {
      e = this.GetText(9);
      if (this.rvt[this.lvt].HasOverFlowExpReach) {
        t = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(this.lvt);
        t = ConditionGroupById_1.configConditionGroupById.GetConfig(t.LevelUpCondition);
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, t.HintText);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, "PrefabTextItem_HuluLvNotEnough_Text");
      }
    }
  }
  fvt() {
    this.Y2m();
    this.z2m();
    this.J2m();
    this.Z2m();
    this.ekm();
    this.tkm();
    this.svt.forEach(t => {
      t.ClickCallBack = this.gvt;
      t.CurrentSelect = this._vt === t.Type;
      t.CurrentSelectLevel = this.lvt;
    });
    this.nvt?.RefreshByData(this.svt);
  }
  z2m() {
    var t = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel();
    var e = t >= this.lvt;
    var i = this.ikm();
    i.Type = 0;
    i.Name = "PrefabTextItem_1948060625_Text";
    i.IsCost = false;
    i.IsUp = false;
    var a = ModelManager_1.ModelManager.CalabashModel.GetCatchGainByLevel(this.lvt);
    i.Value = new LguiUtil_1.TableTextArgNew("Text_ExplorationDegree_Text", Math.ceil(a / 10));
    i.IsToggleRaycast = false;
    if (!e) {
      e = ModelManager_1.ModelManager.CalabashModel.GetCatchGainByLevel(t);
      i.IsUp = e < a;
    }
  }
  J2m() {
    var t;
    var e;
    var i;
    var a;
    var r = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel();
    var s = ConfigManager_1.ConfigManager.CalabashConfig?.GetCalabashConfigByLevel(r);
    if (s) {
      i = ConfigManager_1.ConfigManager.CalabashConfig?.GetCalabashConfigByLevel(this.lvt);
      t = r >= this.lvt;
      if (i) {
        (e = this.ikm()).Type = 1;
        e.Name = "UpAbsorptionTarget_Advanced";
        e.IsCost = false;
        e.IsUp = false;
        e.IsToggleRaycast = true;
        a = ModelManager_1.ModelManager.CalabashModel.GetCatchGainByLevel(this.lvt);
        if ((i = i.TempCatchGain) <= a) {
          e.Value = new LguiUtil_1.TableTextArgNew("PrefabTextItem_HuluTempCatchGainDisable_Text");
        } else {
          e.Value = new LguiUtil_1.TableTextArgNew("Text_ExplorationDegree_Text", Math.ceil(i / 10));
          if (!t) {
            a = s.TempCatchGain;
            e.IsUp = a < i;
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Calabash", 87, "找不到对应等级的配置信息", ["CurrentSelectedLevel", this.lvt]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Calabash", 87, "找不到对应等级的配置信息", ["curLevel", r]);
    }
  }
  Z2m() {
    var t;
    var e = ConfigManager_1.ConfigManager.CalabashConfig?.GetCalabashConfigByLevel(this.lvt);
    if (e) {
      if ((e = e.LowCostTempCatchGain) > 0) {
        (t = this.ikm()).Type = 2;
        t.Name = "UpAbsorptionTarget_Junior";
        t.IsCost = false;
        t.IsUp = false;
        t.IsToggleRaycast = true;
        t.Value = new LguiUtil_1.TableTextArgNew("Text_ExplorationDegree_Text", Math.ceil(e / 10));
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Calabash", 87, "找不到对应等级的配置信息", ["CurrentSelectedLevel", this.lvt]);
    }
  }
  ekm() {
    var t;
    var e;
    var i;
    var a = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel();
    var r = ConfigManager_1.ConfigManager.CalabashConfig?.GetCalabashConfigByLevel(a);
    if (r) {
      e = ConfigManager_1.ConfigManager.CalabashConfig?.GetCalabashConfigByLevel(this.lvt);
      i = a >= this.lvt;
      if (e) {
        (t = this.ikm()).Type = 3;
        t.Name = "PrefabTextItem_3681645418_Text";
        t.IsCost = false;
        t.IsUp = false;
        e = e.QualityDescription;
        t.Value = new LguiUtil_1.TableTextArgNew(e);
        if (!i) {
          i = r.QualityDescription;
          t.IsUp = e !== i;
        }
        t.IsToggleRaycast = true;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Calabash", 87, "找不到对应等级的配置信息", ["CurrentSelectedLevel", this.lvt]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Calabash", 87, "找不到对应等级的配置信息", ["curLevel", a]);
    }
  }
  tkm() {
    var t;
    var e;
    var i;
    var a = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel();
    var r = ConfigManager_1.ConfigManager.CalabashConfig?.GetCalabashConfigByLevel(a);
    if (r) {
      e = ConfigManager_1.ConfigManager.CalabashConfig?.GetCalabashConfigByLevel(this.lvt);
      i = a >= this.lvt;
      if (e) {
        (t = this.ikm()).Type = 4;
        t.Name = "PrefabTextItem_HuluCostLimit_Text";
        t.IsCost = true;
        t.IsUp = false;
        e = e.Cost;
        t.CostCount = e;
        if (!i) {
          i = r.Cost;
          t.IsUp = i < e;
        }
        t.IsToggleRaycast = false;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Calabash", 87, "找不到对应等级的配置信息", ["CurrentSelectedLevel", this.lvt]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Calabash", 87, "找不到对应等级的配置信息", ["curLevel", a]);
    }
  }
  Y2m() {
    for (const t of this.svt) {
      this.X2m.push(t);
    }
    this.svt.length = 0;
  }
  ikm() {
    let t = this.X2m.shift();
    t = t || new CalabashAttributeData();
    this.svt.push(t);
    return t;
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var e;
    if (t.length === 1 || isNaN(Number(t[0]))) {
      if (e = this.nvt?.GetItemByIndex(Number(t[0]))) {
        return [e, e];
      } else {
        return undefined;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 53, "聚焦引导extraParam项配置有误", ["configParams", t]);
    }
  }
  vvt(t = false) {
    var r = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel();
    var s = ModelManager_1.ModelManager.CalabashModel.GetCurrentExp();
    var o = ModelManager_1.ModelManager.CalabashModel.GetCalabashMaxLevel();
    this.rvt ||= new Array(o);
    let h = 0;
    for (let a = 0; a <= o; a++) {
      var n = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(a).LevelUpExp;
      let t = 0;
      let e = 0;
      if (a < r) {
        t = n;
        e = n;
      } else {
        t = Math.min(n, s - h);
        e = 0;
        h += n;
      }
      let i = this.rvt[a];
      if (!i) {
        i = new CalabashGridData();
        this.rvt[a] = i;
      }
      i.Level = a;
      i.OverFlowExp = t;
      i.LimitExp = e;
      i.MaxExp = n;
      i.IsMaxLevel = a === o;
      if (a === 0) {
        i.HasOverFlowExpReach = true;
      } else {
        n = this.rvt[a - 1];
        i.HasOverFlowExpReach = n.OverFlowExp === n.MaxExp;
      }
    }
    if (t) {
      this.ovt.ReloadView(this.rvt.length, this.rvt);
      this.ovt.AttachToIndex(r, true);
    } else {
      for (const e of this.ovt.GetItems()) {
        e.SetData(this.rvt);
        e.RefreshItem();
      }
    }
  }
  Phf(t) {
    var e;
    if (ModelManager_1.ModelManager.CalabashModel.GetCalabashMaxLevel() <= t) {
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(3), "DataBankLevelTips_Max");
    } else {
      e = ModelManager_1.ModelManager.CalabashModel.GetCurrentExp();
      t = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(t)?.LevelUpExp;
      this.GetText(3)?.SetText(e + "/" + t);
    }
  }
}
exports.CalabashLevelUpTabView = CalabashLevelUpTabView;
//# sourceMappingURL=CalabashLevelUpTabView.js.map