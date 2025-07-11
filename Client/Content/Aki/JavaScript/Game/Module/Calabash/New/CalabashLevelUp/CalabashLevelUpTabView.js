"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashLevelUpTabView = exports.CalabashAttributeContentItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const ConditionGroupById_1 = require("../../../../../Core/Define/ConfigQuery/ConditionGroupById");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
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
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIButtonComponent]];
    this.BtnBindInfo = [[12, this.Xpt]];
  }
  OnRefreshItem(t) {
    var e = t.Level;
    var i = ModelManager_1.ModelManager.CalabashModel.GetReceiveRewardStateByLevel(e);
    var r = e <= ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel();
    this.GetItem(2)?.SetUIActive(r);
    this.GetItem(1)?.SetUIActive(!r);
    var s = this.GetText(3);
    s.SetText(e.toString());
    s.SetChangeColor(r, s.changeColor);
    this.GetItem(4).SetUIActive(i === 2);
    this.GetItem(10).SetUIActive(i === 3);
    this.GetItem(11).SetUIActive(e > 0 && i !== 3);
    if (t.IsMaxLevel) {
      this.GetItem(5).SetUIActive(false);
    } else {
      this.GetItem(5).SetUIActive(true);
      r = t.MaxExp;
      s = t.OverFlowExp;
      this.GetSprite(6).SetFillAmount(s / r);
      this.GetSprite(7).SetFillAmount(t.LimitExp / r);
    }
    this.GetItem(8)?.SetUIActive(t.HasOverFlowExpReach);
    this.GetItem(9)?.SetUIActive(!t.HasOverFlowExpReach);
    var e = this.GetCurrentSelectedState();
    this.SetSelectState(e);
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
    this.GetExtendToggle(0)?.RootUIComp.SetRaycastTarget(false);
  }
  zpt(t) {
    this.GetItem(3)?.SetUIActive(false);
    var e = this.GetText(2);
    e?.SetUIActive(true);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, t.Value.TextKey, ...t.Value.Params);
    var e = new Array();
    let i = new CalabashAttributeContentData();
    i.Type = 0;
    i.StringKey = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("UpAbsorptionTarget");
    i.StringValue = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("UpAbsorptionTargetName");
    e.push(i);
    (i = new CalabashAttributeContentData()).Type = 0;
    i.StringKey = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("UpAbsorptionTimeText");
    t = ModelManager_1.ModelManager.CalabashModel.GetLeftIntensifyCaptureGuarantee();
    i.StringValue = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("UpAbsorptionTimeDescText"), t.toString(), ConfigManager_1.ConfigManager.CalabashConfig.GetIntensifyCaptureGuarantee().toString());
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
    this.GetExtendToggle(0)?.RootUIComp.SetRaycastTarget(true);
    const r = new Array();
    t?.forEach((t, e) => {
      var i;
      if (t > 0) {
        (i = new CalabashAttributeContentData()).Type = 2;
        i.Key = e;
        i.Value = t;
        r.push(i);
      }
    });
    this.gNe?.RefreshByData(r);
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
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Name);
    this.GetItem(5)?.SetUIActive(t.Type === 2 && t.IsUp);
    this.tvt();
    switch (t.Type) {
      case 0:
        this.Jpt(t);
        break;
      case 1:
        this.zpt(t);
        break;
      case 3:
        this.Zpt(t);
        break;
      case 2:
        this.evt(t);
    }
    if (this.Ypt !== t.CurrentSelect) {
      this.Ypt = t.CurrentSelect;
      this.ivt(this.Ypt);
    }
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
    this.StringKey = "";
    this.StringValue = "";
  }
}
class CalabashAttributeContentItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  Refresh(t, e, i) {
    var r;
    var s;
    if (t.Type === 0) {
      this.GetText(0)?.SetText(t.StringKey);
      this.GetText(1)?.SetText(t.StringValue);
    } else if (t.Type === 2) {
      r = t.Key;
      t = t.Value;
      r = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(r);
      s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.Name);
      this.GetText(0)?.SetText(s);
      this.GetText(0)?.SetColor(UE.Color.FromHex(r.DropColor));
      this.GetText(1)?.SetText(StringUtils_1.StringUtils.Format("{0}%", t.toString()));
      this.GetText(1)?.SetColor(UE.Color.FromHex(r.DropColor));
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
    this.svt = undefined;
    this.H3e = undefined;
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
      var r = new CalabashGrid();
      r.CreateThenShowByActor(t);
      r.ButtonFunction = this.cvt;
      r.ItemCurve = this.hvt;
      return r;
    };
    this.rOe = () => new CalabashLevelUpRewardItemGrid_1.CalabashLevelUpRewardItemGrid();
    this.mvt = () => new CalabashAttributeItem();
    this.g6e = () => {
      CalabashController_1.CalabashController.RequestCalabashLevelReward(this.lvt);
    };
    this.dvt = e => {
      if (e === "CommonRewardView") {
        var i = CommonParamById_1.configCommonParamById.GetIntConfig("StrengthItemId");
        let t = false;
        for (const a of this.avt) {
          if (i === a.ItemData[0].ItemId) {
            t = true;
            break;
          }
        }
        if (t) {
          e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(i);
          if (e && e.Parameters) {
            let t = 0;
            for (var [, r] of e.Parameters) {
              t = r;
              break;
            }
            if (t !== 0) {
              var s;
              var e = PropRewardConfById_1.configPropRewardConfById.GetConfig(t);
              if (e) {
                let t = 0;
                for (const h of e.Props) {
                  if (h.Id === RoleDefine_1.STRENGTH_MAX_ID) {
                    t = h.Value;
                    break;
                  }
                }
                if (t !== 0) {
                  e = FormationAttributeController_1.FormationAttributeController.GetBaseMax(1);
                  s = {
                    Name: (s = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(RoleDefine_1.STRENGTH_MAX_ID)).Name,
                    IconPath: s.Icon,
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
                    AttributeInfo: [s]
                  };
                  RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(e);
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
  }
  Mvt() {
    this.jqe();
    this.Svt();
    this.fvt();
  }
  Evt() {
    var t = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel();
    var e = ModelManager_1.ModelManager.CalabashModel.GetCurrentExp();
    var i = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(t)?.LevelUpExp;
    this.GetText(3)?.SetText(e + "/" + i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), "PrefabTextItem_HuluCurrentLv_Text", t);
    var e = ModelManager_1.ModelManager.CalabashModel.GetCalabashAllSchedule();
    var i = ModelManager_1.ModelManager.CalabashModel.GetCalabashOwnSchedule();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), "Phanton_CollectNum", i, e);
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
      for (const r of t) {
        let t = undefined;
        if (e < this.avt.length) {
          t = this.avt[e];
        } else {
          t = new CalabashLevelUpRewardItemGrid_1.CalabashRewardItemData();
          this.avt.push(t);
        }
        t.ReceiveState = i;
        t.ItemData = [{
          ItemId: r[0],
          IncId: 0
        }, r[1]];
        e++;
      }
      this.H3e?.RefreshByData(this.avt);
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
    if (!this.svt) {
      this.svt = new Array(4);
      for (let t = 0; t < this.svt.length; t++) {
        this.svt[t] = new CalabashAttributeData();
      }
    }
    var t = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel();
    var e = t >= this.lvt;
    let i = this.svt[0];
    i.Type = 0;
    i.Name = "PrefabTextItem_1948060625_Text";
    i.IsCost = false;
    i.IsUp = false;
    var r = ModelManager_1.ModelManager.CalabashModel.GetCatchGainByLevel(this.lvt);
    i.Value = new LguiUtil_1.TableTextArgNew("Text_ExplorationDegree_Text", Math.ceil(r / 10));
    if (!e) {
      s = ModelManager_1.ModelManager.CalabashModel.GetCatchGainByLevel(t);
      i.IsUp = s < r;
    }
    var s = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(t);
    var t = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(this.lvt);
    (i = this.svt[1]).Type = 1;
    i.Name = "PrefabTextItem_HuluTempCatchGain_Text";
    i.IsCost = false;
    i.IsUp = false;
    var a = t.TempCatchGain;
    if (a <= r) {
      i.Value = new LguiUtil_1.TableTextArgNew("PrefabTextItem_HuluTempCatchGainDisable_Text");
    } else {
      i.Value = new LguiUtil_1.TableTextArgNew("Text_ExplorationDegree_Text", Math.ceil(a / 10));
      if (!e) {
        r = s.TempCatchGain;
        i.IsUp = r < a;
      }
    }
    (i = this.svt[2]).Type = 2;
    i.Name = "PrefabTextItem_3681645418_Text";
    i.IsCost = false;
    i.IsUp = false;
    var r = t.QualityDescription;
    i.Value = new LguiUtil_1.TableTextArgNew(r);
    if (!e) {
      a = s.QualityDescription;
      i.IsUp = r !== a;
    }
    (i = this.svt[3]).Type = 3;
    i.Name = "PrefabTextItem_HuluCostLimit_Text";
    i.IsCost = true;
    i.IsUp = false;
    var r = t.Cost;
    i.CostCount = r;
    if (!e) {
      a = s.Cost;
      i.IsUp = a < r;
    }
    this.svt.forEach(t => {
      t.ClickCallBack = this.gvt;
      t.CurrentSelect = this._vt === t.Type;
      t.CurrentSelectLevel = this.lvt;
    });
    this.nvt?.RefreshByData(this.svt);
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
    var s = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel();
    var a = ModelManager_1.ModelManager.CalabashModel.GetCurrentExp();
    var h = ModelManager_1.ModelManager.CalabashModel.GetCalabashMaxLevel();
    this.rvt ||= new Array(h);
    let o = 0;
    for (let r = 0; r <= h; r++) {
      var n = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(r).LevelUpExp;
      let t = 0;
      let e = 0;
      if (r < s) {
        t = n;
        e = n;
      } else {
        t = Math.min(n, a - o);
        e = 0;
        o += n;
      }
      let i = this.rvt[r];
      if (!i) {
        i = new CalabashGridData();
        this.rvt[r] = i;
      }
      i.Level = r;
      i.OverFlowExp = t;
      i.LimitExp = e;
      i.MaxExp = n;
      i.IsMaxLevel = r === h;
      if (r === 0) {
        i.HasOverFlowExpReach = true;
      } else {
        n = this.rvt[r - 1];
        i.HasOverFlowExpReach = n.OverFlowExp === n.MaxExp;
      }
    }
    if (t) {
      this.ovt.ReloadView(this.rvt.length, this.rvt);
      this.ovt.AttachToIndex(s, true);
    } else {
      for (const e of this.ovt.GetItems()) {
        e.SetData(this.rvt);
        e.RefreshItem();
      }
    }
  }
}
exports.CalabashLevelUpTabView = CalabashLevelUpTabView;
//# sourceMappingURL=CalabashLevelUpTabView.js.map