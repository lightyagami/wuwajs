"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillTreeInfoItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const RoleBackgroundMusicSwitchItem_1 = require("../Component/RoleBackgroundMusicSwitchItem");
const CostMediumItemGrid_1 = require("../RoleBreach/CostMediumItemGrid");
const RoleController_1 = require("../RoleController");
const CommonAttributeData_1 = require("../View/ViewData/CommonAttributeData");
const RoleSkillInputPanel_1 = require("./RoleSkillInputPanel");
const RoleSkillTreeAttributeItem_1 = require("./RoleSkillTreeAttributeItem");
const RoleSkillTreeInfoItemData_1 = require("./RoleSkillTreeInfoItemData");
class RoleSkillTreeInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.BWd = new RoleSkillTreeInfoItemData_1.RoleSkillTreeInfoItemData();
    this.Bmo = undefined;
    this.bmo = undefined;
    this.wmo = 0;
    this.B9l = 0;
    this.G9l = 0;
    this.ESo = undefined;
    this.O9l = undefined;
    this.qmo = undefined;
    this.Gmo = undefined;
    this.lqe = undefined;
    this.p9t = undefined;
    this.Nmo = undefined;
    this.RoleBackgroundMusicSwitchItem = undefined;
    this.vmo = false;
    this.Omo = false;
    this.kmo = 1;
    this.Fmo = [];
    this.Vmo = [];
    this.SPe = undefined;
    this.OnBackBtnCallBack = undefined;
    this.Dcl = 0;
    this.owm = undefined;
    this.OnCommonItemCountAnyChange = () => {
      this.Refresh();
    };
    this.pFe = () => {
      this.OnBackBtnCallBack?.();
    };
    this.Wmo = t => {
      if (this.Omo = t) {
        this.kmo = 2;
        this.ShowLeftPanelByTabType(this.kmo);
      } else {
        this.Kmo(this.kmo, t);
      }
      this.Qmo(t);
    };
    this.Pcl = t => {
      if (this.Dcl === 1) {
        ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc = t;
      } else {
        ModelManager_1.ModelManager.RoleModel.IsShowSkillResume = t;
      }
      this.Update(this.BWd);
    };
    this.Xmo = () => {
      this.Omo = false;
      this.GetExtendToggle(19).SetToggleState(0);
      this.$mo();
      this.Qmo(false);
    };
    this.Ymo = () => {
      this.Omo = false;
      this.GetExtendToggle(19).SetToggleState(0);
      this.Jmo();
      this.Qmo(false);
    };
    this.zmo = () => {
      this.kmo = 1;
      this.ShowLeftPanelByTabType(this.kmo);
    };
    this.Zmo = () => {
      this.kmo = 2;
      this.ShowLeftPanelByTabType(this.kmo);
    };
    this.edo = () => {
      var t = this.Bmo.GetSkillNodeLevel(this.bmo);
      var t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillTreeConsume(this.BWd.SkillNodeId, t + 1);
      if (t) {
        for (var [i, e] of t) {
          if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i) < e) {
            i = {
              SelectedItemList: this.cum(),
              ClickConfirm: () => {
                this.fum();
              },
              BelongView: "RoleSkillTreeInfoView"
            };
            UiManager_1.UiManager.OpenView("SynthesisTipsInfoView", i, (t, i) => {
              if (t) {
                UiManager_1.UiManager.GetViewByName("RoleSkillTreeInfoView")?.AddChildViewById(i);
              }
            });
            return;
          }
        }
      }
      this.fum();
    };
    this.tdo = () => {
      var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(172);
      const i = this.BWd.RoleId;
      t.FunctionMap.set(2, () => {
        UiManager_1.UiManager.CloseView("RoleSkillTreeInfoView");
        UiManager_1.UiManager.NormalResetToView("RoleRootView");
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SelectRoleTabOutside, "RoleAttributeTabView", i);
      });
      t.IsEscViewTriggerCallBack = false;
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    };
    this.ido = () => {
      var t = new CostMediumItemGrid_1.CostMediumItemGrid();
      t.BindOnExtendToggleClicked(t => {
        t = t.Data;
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(t.ItemId);
        ModelManager_1.ModelManager.ComposeModel.ComposeSelectItem = t;
        ModelManager_1.ModelManager.ComposeModel.ComposeSkipSourceView = "RoleSkillTreeInfoView";
        ModelManager_1.ModelManager.InventoryModel.SetItemNeedCount(t.Count - t.SelectedCount);
      });
      t.BindOnCanExecuteChange(() => false);
      return t;
    };
    this.OWe = (t, i, e) => {
      var i = new RoleSkillTreeAttributeItem_1.RoleSkillTreeAttributeItem(i);
      var s = this.Fmo[e];
      var h = e < this.Vmo.length ? this.Vmo[e] : undefined;
      i.Refresh(s, h);
      i.SetNextLevelItem(this.Omo);
      return {
        Key: e,
        Value: i
      };
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [9, UE.UIText], [3, UE.UIText], [4, UE.UIExtendToggle], [5, UE.UIExtendToggle], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIText], [10, UE.UIText], [11, UE.UIHorizontalLayout], [12, UE.UITexture], [13, UE.UIText], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIText], [17, UE.UIItem], [18, UE.UIText], [19, UE.UIExtendToggle], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIButtonComponent], [25, UE.UIButtonComponent], [26, UE.UIButtonComponent], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIButtonComponent], [30, UE.UIExtendToggle], [31, UE.UIItem], [32, UE.UIText], [33, UE.UIText], [34, UE.UIItem]];
    this.BtnBindInfo = [[4, this.zmo], [5, this.Zmo], [19, this.Wmo], [24, this.pFe], [25, this.Xmo], [26, this.tdo], [29, this.Ymo], [30, this.Pcl]];
  }
  async OnBeforeStartAsync() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.Nmo = new RoleSkillInputPanel_1.RoleSkillInputPanel();
    var t = this.GetItem(28).GetOwner();
    this.RoleBackgroundMusicSwitchItem = new RoleBackgroundMusicSwitchItem_1.RoleBackgroundMusicSwitchItem();
    var i = this.GetItem(34).GetOwner();
    await Promise.all([this.Nmo.CreateThenShowByActorAsync(t), this.RoleBackgroundMusicSwitchItem.CreateThenShowByActorAsync(i)]);
  }
  OnStart() {
    this.qmo = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(11), this.ido);
    this.Gmo = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(8), this.OWe);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(21));
    this.lqe.SetCurrencyItemList([ItemDefines_1.EItemId.Gold]);
    this.lqe.SetCurrencyItemVisible(true);
    this.p9t = new ButtonItem_1.ButtonItem(this.GetItem(14));
    this.p9t.SetFunction(this.edo);
    this.GetItem(20).SetUIActive(false);
    this.SetItemIcon(this.GetTexture(12), ItemDefines_1.EItemId.Gold);
    this.xcl();
    var t = this.OpenParam;
    this.BWd = t;
    this.kmo = 1;
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlink(this.GetText(10), 1, 4, 2);
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(10));
  }
  xcl() {
    var t;
    this.Dcl = ModelManager_1.ModelManager.RoleModel.GetRoleSkillDescType();
    if (this.Dcl === 1) {
      t = ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc ? 1 : 0;
      this.GetExtendToggle(30).SetToggleState(t);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(33), "MultiplayerSkillDescription_text");
    } else {
      t = ModelManager_1.ModelManager.RoleModel.IsShowSkillResume ? 1 : 0;
      this.GetExtendToggle(30).SetToggleState(t);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(33), "SkillBriefDescription_text");
    }
  }
  fum() {
    var t = this.bmo.NodeType;
    if (t === 1 || t === 2) {
      RoleController_1.RoleController.SendPbUpLevelSkillRequest(this.BWd.RoleId, this.BWd.SkillNodeId);
    } else {
      RoleController_1.RoleController.SendRoleActivateSkillRequest(this.BWd.RoleId, this.BWd.SkillNodeId);
    }
  }
  cum() {
    return this.owm ?? [];
  }
  Update(t) {
    this.BWd = t;
    this.bmo = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(this.BWd.SkillNodeId);
    this.wmo = this.bmo.SkillId;
    this.B9l = ModelManager_1.ModelManager.RoleModel.GetUpgradeSkillIdIfUpgraded(this.wmo, this.BWd.RoleId);
    this.G9l = this.B9l > 0 ? this.B9l : this.wmo;
    this.ESo = this.wmo > 0 ? ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(this.wmo) : undefined;
    this.O9l = this.G9l > 0 ? ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(this.G9l) : undefined;
    let i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.BWd.RoleId);
    i = i || ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.BWd.RoleId);
    this.Bmo = i.GetSkillData();
    this.Nmo?.Refresh(i.GetRoleId(), i.IsTrialRole(), true);
    this.Refresh();
    if (i.IsTrialRole()) {
      this.rdo();
    }
  }
  Refresh() {
    switch (ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(this.BWd.SkillNodeId).NodeType) {
      case 4:
        this.ndo();
        break;
      case 3:
        this.sdo();
        break;
      case 2:
        this.ado();
        break;
      case 1:
        this.hdo();
    }
    this.RefreshRoleBackgroundMusicSwitchItem();
  }
  rdo() {
    this.GetItem(22).SetUIActive(false);
    this.GetItem(17).SetUIActive(false);
    this.GetItem(15).SetUIActive(false);
    this.p9t.SetActive(false);
    this.GetExtendToggle(19).RootUIComp.SetUIActive(false);
    this.lqe.SetCurrencyItemVisible(false);
  }
  ndo() {
    this.vmo = true;
    this.kmo = 1;
    this.GetText(3).SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetExtendToggle(19).RootUIComp.SetUIActive(false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "SkillType_AttributeNode_TypeName");
    var t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(this.BWd.SkillNodeId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.PropertyNodeTitle);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), t.PropertyNodeDescribe, ...t.PropertyNodeParam);
    this.GetText(10).bBestFit = false;
    this.ldo();
    this._do();
  }
  sdo() {
    this.vmo = false;
    this.kmo = 1;
    this.GetText(3).SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetExtendToggle(19).RootUIComp.SetUIActive(false);
    this.Jlo();
    this.ldo();
    this._do();
  }
  hdo() {
    this.vmo = false;
    this.udo();
    this._do();
  }
  ado() {
    this.vmo = false;
    this.udo();
    this._do();
  }
  udo() {
    this.GetText(3).SetUIActive(true);
    this.GetItem(6).SetUIActive(true);
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(this.BWd.RoleId, this.BWd.SkillNodeId);
    var i = this.ESo.MaxSkillLevel;
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "RoleResonanceLevel", t);
    if (t === i) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(32), "PrefabTextItem_3463157315_Text");
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(32), "PrefabTextItem_SkillNext_Text");
    }
    this.Jlo();
    this.cdo();
  }
  Jlo() {
    var t;
    var i;
    if (this.O9l) {
      t = this.O9l;
      if (i = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTypeNameLocalText(t.SkillType)) {
        this.GetText(2).SetText(i);
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.SkillName);
      i = this.GetText(10);
      if (this.Dcl === 1) {
        if (ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(i, t.MultiSkillDescribe, ...t.MultiSkillDetailNum);
        } else {
          LguiUtil_1.LguiUtil.SetLocalTextNew(i, t.SkillDescribe, ...t.SkillDetailNum);
        }
      } else if (ModelManager_1.ModelManager.RoleModel.IsShowSkillResume) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, t.SkillResume, ...t.SkillResumeNum);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, t.SkillDescribe, ...t.SkillDetailNum);
      }
      i.bBestFit = false;
    }
  }
  _do() {
    let t = undefined;
    t = this.O9l ? this.O9l.Icon : this.bmo.PropertyNodeIcon;
    var i = this.GetTexture(1);
    var e = this.GetSprite(0);
    if (this.vmo) {
      i.SetUIActive(true);
      e.SetUIActive(false);
      this.SetTextureByPath(t, i);
    } else {
      i.SetUIActive(false);
      e.SetUIActive(true);
      this.SetSpriteByPath(t, e, false);
    }
  }
  Pke(i = 1) {
    i = ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillTreeConsume(this.BWd.SkillNodeId, i);
    if (i && i.size !== 0) {
      this.GetItem(22).SetUIActive(true);
      this.GetItem(23).SetUIActive(true);
      var e;
      var s;
      var h;
      var r = [];
      let t = 0;
      for ([e, s] of i) {
        if (e === ItemDefines_1.EItemId.Gold) {
          t = s;
        } else {
          h = {
            ItemId: e,
            IncId: 0,
            Count: s,
            SelectedCount: ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(e)
          };
          r.push(h);
        }
      }
      this.owm = r.map(t => ({
        ...t
      }));
      if (t > 0) {
        this.owm.push({
          ItemId: ItemDefines_1.EItemId.Gold,
          IncId: 0,
          Count: t,
          SelectedCount: ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(ItemDefines_1.EItemId.Gold)
        });
      }
      var i = this.GetText(13);
      i.SetText(t.toString());
      var o = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(ItemDefines_1.EItemId.Gold);
      i.SetChangeColor(o < t, i.changeColor);
      this.qmo.RefreshByData(r);
    } else {
      this.GetItem(22).SetUIActive(false);
      this.GetItem(23).SetUIActive(false);
    }
  }
  dum(t) {
    var i = this.Bmo.GetSkillNodeLevel(this.bmo);
    var i = ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillTreeConsume(this.BWd.SkillNodeId, i + 1);
    if (i) {
      for (var [e, s] of i) {
        if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) < s) {
          if (e = ModelManager_1.ModelManager.ComposePopupModel.CheckOpenResult(this.cum())) {
            this.p9t?.SetShowText("AutoSynthesis_MaterialReplenishBtn_Text");
          } else {
            this.p9t?.SetShowText("AutoSynthesis_MaterialMissingBtn_Text");
          }
          this.p9t?.SetEnableClick(e);
          return;
        }
      }
    }
    this.p9t?.SetLocalText(t);
    this.p9t?.SetEnableClick(true);
  }
  ldo() {
    var t = this.Bmo.GetSkillTreeNodeState(this.bmo, this.BWd.RoleId);
    this.p9t.SetActive(t === 2);
    this.GetItem(22).SetUIActive(t === 2);
    this.GetItem(23).SetUIActive(t === 2);
    this.GetItem(17).SetUIActive(t === 1);
    this.GetItem(15).SetUIActive(t === 3);
    if (t === 3) {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(16), "Actived");
    } else {
      this.Pke();
      if (t === 2) {
        this.dum("RoleResonActive");
      } else if (t === 1) {
        t = this.Bmo.GetUnlockConditionTextId(this.bmo);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(18), t);
      }
      t = this.Bmo.GetSkillTreeUnsatisfiedCondition(this.bmo);
      this.GetButton(26).RootUIComp.SetUIActive(t?.ConditionType !== 2);
    }
  }
  cdo() {
    var t;
    var i = this.Bmo.GetSkillTreeNodeState(this.bmo, this.BWd.RoleId);
    this.p9t.SetActive(i === 2);
    this.GetItem(22).SetUIActive(i !== 3);
    this.GetItem(23).SetUIActive(i !== 3);
    this.GetItem(17).SetUIActive(i === 1);
    this.GetItem(15).SetUIActive(i === 3);
    this.GetExtendToggle(19).RootUIComp.SetUIActive(true);
    this.mdo();
    if (i === 3) {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(16), "RoleAlreadyMax");
    } else {
      t = this.Bmo.GetSkillNodeLevel(this.bmo);
      this.Pke(t + 1);
      if (i === 2) {
        this.dum("RoleLevelUp");
      } else if (i === 1) {
        t = this.Bmo.GetUnlockConditionTextId(this.bmo);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(18), t);
      }
      i = this.Bmo.GetSkillTreeUnsatisfiedCondition(this.bmo);
      this.GetButton(26).RootUIComp.SetUIActive(i?.ConditionType !== 2);
    }
  }
  ddo(t) {
    var i = new CommonAttributeData_1.CommonAttributeData();
    var e = ModelManager_1.ModelManager.RoleModel.GetSkillAttributeNameByOneSkillEffect(t);
    i.AttrNameText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
    i.AttrBaseValue = ModelManager_1.ModelManager.RoleModel.GetSkillAttributeDescriptionByOneSkillEffect(t);
    return i;
  }
  mdo() {
    this.Fmo.length = 0;
    this.Vmo.length = 0;
    var i = ModelManager_1.ModelManager.RoleModel.RoleSkillResponseData.GetSkillEffect().EffectDescList;
    var e = i !== undefined ? i.length : 0;
    var s = ModelManager_1.ModelManager.RoleModel.RoleSkillResponseData.GetNextLevelSkillEffect()?.EffectDescList;
    for (let t = 0; t < e; t++) {
      this.Fmo.push(this.ddo(i[t]));
      if (s) {
        this.Vmo.push(this.ddo(s[t]));
      }
    }
    this.Gmo.RefreshByData(this.Fmo);
  }
  ShowLeftPanelByTabType(t) {
    if (t === 1) {
      this.odo();
    } else {
      this.Cdo();
    }
  }
  odo(t = 0) {
    this.GetExtendToggle(4).SetToggleState(1);
    this.GetExtendToggle(5).SetToggleState(0);
    this.GetItem(7).SetUIActive(true);
    this.GetScrollViewWithScrollbar(8).GetRootComponent().SetUIActive(false);
    this.$mo();
    this.Kmo(this.kmo, this.Omo);
  }
  Cdo() {
    this.GetExtendToggle(4).SetToggleState(0);
    this.GetExtendToggle(5).SetToggleState(1);
    this.GetItem(7).SetUIActive(false);
    this.GetScrollViewWithScrollbar(8).GetRootComponent().SetUIActive(true);
    this.Jmo();
    this.Kmo(this.kmo, this.Omo);
  }
  Kmo(t, i) {
    if (this.kmo === 2) {
      if (i) {
        this.gdo();
      } else {
        this.$mo();
      }
    } else if (i) {
      this.fdo();
    } else {
      this.Jmo();
    }
  }
  fdo() {
    this.GetItem(27).SetUIActive(true);
  }
  Jmo() {
    this.GetItem(27).SetUIActive(false);
  }
  gdo() {
    this.GetItem(20).SetUIActive(true);
    for (const t of this.Gmo.GetScrollItemList()) {
      t.SetNextLevelItem(true);
    }
  }
  $mo() {
    this.GetItem(20).SetUIActive(false);
    for (const t of this.Gmo.GetScrollItemList()) {
      t.SetNextLevelItem(false);
    }
  }
  Qmo(t) {
    if (t) {
      this.SPe.PlayOrReplaySequenceByName("ViewShow");
    } else {
      this.SPe.PlayOrReplaySequenceByName("ViewHide");
    }
  }
  PlayItemSequence(t) {
    this.SPe.PlayOrReplaySequenceByName(t);
  }
  async PlayItemSequenceAsync(t) {
    await this.SPe.PlaySequenceAsync(t, new CustomPromise_1.CustomPromise());
  }
  RefreshRoleBackgroundMusicSwitchItem() {
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.BWd.RoleId);
    if (t === undefined || t.IsTrialRole() || !t.GetRoleConfig().EnableOperateSelfBgm) {
      this.GetItem(34).SetUIActive(false);
    } else {
      this.GetItem(34).SetUIActive(true);
      this.RoleBackgroundMusicSwitchItem?.RefreshByRoleData(t);
    }
  }
  OnHide() {
    this.Omo = false;
    this.kmo = 1;
    this.ShowLeftPanelByTabType(this.kmo);
  }
  GetCurSkillTabShowType() {
    return this.kmo;
  }
}
exports.RoleSkillTreeInfoItem = RoleSkillTreeInfoItem;
//# sourceMappingURL=RoleSkillTreeInfoItem.js.map