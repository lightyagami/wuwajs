"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryItemTipsBase = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../../Core/Common/Info");
const Log_1 = require("../../../../../../Core/Common/Log");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../../../Common/PublicUtil");
const GlobalData_1 = require("../../../../../GlobalData");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../../../Ui/Base/UiViewSequence");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../../Common/Button/ButtonItem");
const ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const HonamiStoryController_1 = require("../../../HonamiStoryController");
const HonamiStoryDefine_1 = require("../../../HonamiStoryDefine");
const HonamiStoryItemTipsSideButton_1 = require("./HonamiStoryItemTipsSideButton");
const HonamiStoryTipsPropertyItem_1 = require("./HonamiStoryTipsPropertyItem");
const RIGHT_OFFSET = 60;
const PROPERTY_MAX_COUNT = 3;
const BUFF_MAX_COUNT = 1;
class HonamiStoryItemTipsBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ActivityOpen = false;
    this.SideButtonWidth = 0;
    this.PropertyLayout = undefined;
    this.SkillLayout = undefined;
    this.MaskButton = undefined;
    this.TipsState = 0;
    this.ConfirmQuick = undefined;
    this.ConfirmRight = undefined;
    this.ItemData = undefined;
    this.BackpackType = 0;
    this.BottomOffset = 200;
    this.CurrentPos = -1;
    this.ButtonRightA = undefined;
    this.ButtonRightB = undefined;
    this.ButtonLeftA = undefined;
    this.ButtonLeftB = undefined;
    this.SideButtonActive = false;
    this.OnHideCb = undefined;
    this.GridLoc = undefined;
    this.GridSize = undefined;
    this.UpdateHeight = 0;
    this.yvm = undefined;
    this.cUu = () => {
      const t = this.ItemData.IsLock();
      var i = HonamiStoryDefine_1.HonamiBackpackTypeMap.get(this.BackpackType);
      HonamiStoryController_1.HonamiStoryController.RequestHonamiStoryLockItem(this.ItemData.GetIncId(), i, !t).then(i => {
        i = i !== t ? 0 : 1;
        this.GetExtendToggle(6)?.SetToggleState(i);
        this.ItemData?.SetIsLock(!t);
        ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic()?.RefreshItemLockState(this.ItemData, this.BackpackType);
      });
    };
    this.OnClickedMask = () => {
      ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogicState(0);
      this.SetTipsVisible(false);
    };
    this.vId = () => new HonamiStoryTipsPropertyItem_1.HonamiStoryTipsPropertyItem();
    this.yId = () => new HonamiStoryTipsPropertyItem_1.HonamiStoryTipsTextItem();
    this.vHd = () => {
      if (this.BackpackType === 3) {
        var i = this.TipsState === 0 ? 2 : 1;
        if (!ModelManager_1.ModelManager.HonamiStoryModel.SetItemIntoBag(this.ItemData, 4, i)) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_NoEnoughSpace");
          return;
        }
      } else if (this.BackpackType !== 1 && this.BackpackType !== 0 || this.ItemData.GetItemType() !== 1) {
        if (this.BackpackType === 2) {
          ModelManager_1.ModelManager.HonamiStoryModel.QuickPickUpFromPickUpBox(this.ItemData, this.CurrentPos);
        }
      } else if (!ModelManager_1.ModelManager.HonamiStoryModel.QuickEquipFromBackpack(this.ItemData, this.CurrentPos)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("HonamiStory_ShowTips_CantQuickEquip");
        return;
      }
      this.SetTipsVisible(false);
      ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogicState(0);
    };
    this.iGu = () => {
      var i;
      if (this.TipsState === 0) {
        this.OnDiscardItem();
      } else if (this.TipsState === 1) {
        i = this.BackpackType === 0 ? 1 : 4;
        ModelManager_1.ModelManager.HonamiStoryModel.SellSingleItem(this.ItemData, i).then(i => {
          if (i) {
            this.SetTipsVisible(false);
            ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogicState(0);
          }
        });
      }
    };
    this.yHd = () => {
      var i = this.BackpackType === 3 ? 4 : 3;
      var t = this.TipsState === 0 ? 2 : 1;
      if (ModelManager_1.ModelManager.HonamiStoryModel.SetItemIntoBag(this.ItemData, i, t)) {
        this.SetTipsVisible(false);
        ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogicState(0);
      }
    };
    this.SHd = () => {
      var i = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic();
      var t = HonamiStoryDefine_1.HonamiBackpackTypeMap.get(this.BackpackType);
      i?.SetLogicState(3, this.ItemData, t);
      this.SetTipsVisible(false);
    };
    this.zIm = () => {
      this.SetEnable(true);
    };
    this.JIm = () => {
      this.SetEnable(false);
    };
    this.OnLayoutUpdate = () => {
      var i = this.RootItem.GetHeight();
      if (i !== this.UpdateHeight) {
        this.UpdateHeight = i;
        this.SetAutoLocation(this.GridLoc, this.GridSize);
      }
    };
    this.JNm = i => {
      var t;
      if (this.ItemData && this.ItemData.GetItemType() !== 2 && (t = this.ItemData)) {
        t = t.GetBuffTempIdList();
        this.SkillLayout?.RefreshByDataDirectlySync(t);
      }
    };
    this.Etl = (i, t) => {
      this.z_f();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIText], [4, UE.UITexture], [5, UE.UIText], [6, UE.UIExtendToggle], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIVerticalLayout], [10, UE.UIItem], [11, UE.UIVerticalLayout], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UITexture], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIText]];
    this.BtnBindInfo = [[6, this.cUu]];
  }
  OnBeforeCreateImplement() {
    this.yvm = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.yvm);
    this.yvm.AddSequenceFinishEvent("Close", this.JIm);
    this.yvm.AddSequenceStartEvent("Start", this.zIm);
  }
  async OnBeforeStartAsync() {
    var i = [];
    this.ActivityOpen = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData(false)?.GetPreGuideQuestFinishState() ?? false;
    this.InitButtonState();
    this.ButtonRightA = new HonamiStoryItemTipsSideButton_1.HonamiStoryItemTipsSideButton();
    this.ButtonRightA.OnClickedCb = this.SHd;
    i.push(this.ButtonRightA.CreateThenShowByActorAsync(this.GetItem(17).GetOwner()));
    this.ButtonRightB = new HonamiStoryItemTipsSideButton_1.HonamiStoryItemTipsSideButton();
    this.ButtonRightB.OnClickedCb = this.yHd;
    i.push(this.ButtonRightB.CreateThenShowByActorAsync(this.GetItem(18).GetOwner()));
    this.ButtonLeftA = new HonamiStoryItemTipsSideButton_1.HonamiStoryItemTipsSideButton();
    this.ButtonLeftA.OnClickedCb = this.SHd;
    i.push(this.ButtonLeftA.CreateThenShowByActorAsync(this.GetItem(20).GetOwner()));
    this.ButtonLeftB = new HonamiStoryItemTipsSideButton_1.HonamiStoryItemTipsSideButton();
    this.ButtonLeftB.OnClickedCb = this.yHd;
    i.push(this.ButtonLeftB.CreateThenShowByActorAsync(this.GetItem(21).GetOwner()));
    this.PropertyLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(9), this.vId);
    i.push(this.PropertyLayout.LoadGrid(PROPERTY_MAX_COUNT));
    this.SkillLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(11), this.yId);
    i.push(this.SkillLayout.LoadGrid(BUFF_MAX_COUNT));
    await Promise.all(i);
    this.PropertyLayout.BindLateUpdate(this.OnLayoutUpdate);
    this.SkillLayout.BindLateUpdate(this.OnLayoutUpdate);
    var i = this.TipsState === 0;
    var t = i ? "SP_TipsBtnBIcon1" : "SP_TipsBtnBIcon2";
    this.ButtonRightB.SetSpriteByResourceId(t);
    this.ButtonLeftB.SetSpriteByResourceId(t);
    var t = i ? "HonamiStory_Tips_Backpack" : "HonamiStory_Tips_Inventory";
    this.ButtonRightB.SetLocalTextNew(t);
    this.ButtonLeftB.SetLocalTextNew(t);
    this.ButtonLeftA.SetSpriteByResourceId("SP_TipsBtnBIcon3");
    this.ButtonRightA.SetSpriteByResourceId("SP_TipsBtnBIcon3");
    this.ButtonLeftA.SetLocalTextNew("HonamiStory_Tips_Instead");
    this.ButtonRightA.SetLocalTextNew("HonamiStory_Tips_Instead");
    var i = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData(false)?.GetPreGuideQuestFinishState();
    this.GetTexture(4)?.SetUIActive(i === true);
    this.GetText(5)?.SetUIActive(i === true);
    if (i) {
      t = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData().Id;
      i = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryActivityConfig(t);
      this.SetItemIcon(this.GetTexture(4), i.OutCoinItemId);
    }
  }
  OnStart() {
    this.SideButtonWidth = this.GetItem(19)?.Width ?? 0;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStorySkillDescModeChange, this.JNm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerMainTypeChange, this.Etl);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStorySkillDescModeChange, this.JNm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerMainTypeChange, this.Etl);
    this.ButtonRightA = undefined;
    this.ButtonLeftA = undefined;
    this.ButtonLeftB = undefined;
    this.ButtonRightB = undefined;
  }
  InitButtonState() {
    this.ConfirmQuick = new ButtonItem_1.ButtonItem(this.GetItem(15));
    this.ConfirmQuick.SetFunction(this.vHd);
    this.ConfirmQuick.SetLocalTextNew("HonamiStory_Tips_QuickEquipped");
    this.ConfirmRight = new ButtonItem_1.ButtonItem(this.GetItem(14));
    this.ConfirmRight.SetFunction(this.iGu);
    var i = this.TipsState === 0 ? "HonamiStory_Tips_Drop" : "HonamiStory_Tips_Sell";
    this.ConfirmRight.SetLocalTextNew(i);
  }
  RefreshButton(i, t) {
    var s;
    this.GetExtendToggle(6)?.RootUIComp.SetUIActive(t !== 2);
    if (t !== 2) {
      s = i.IsLock() ? 0 : 1;
      this.GetExtendToggle(6)?.SetToggleState(s);
    }
    this.RefreshConfirmButton(i, t);
    this.RefreshSideButton(i, t);
  }
  RefreshConfirmButton(t, s) {
    if (this.TipsState === 2) {
      this.ConfirmRight?.SetUiActive(false);
      this.ConfirmQuick?.SetUiActive(false);
      this.GetItem(23)?.SetUIActive(false);
    } else {
      let i = true;
      var e;
      var t = t.GetItemType();
      this.ConfirmQuick?.SetUiActive(e = t === 1 || s === 2);
      if (s === 2) {
        this.ConfirmRight?.SetUiActive(false);
        i = false;
        this.ConfirmQuick?.SetLocalTextNew("HonamiStory_Tips_QuickPickUp");
      } else {
        if (s !== 1 && s !== 0 || t !== 1) {
          if (s === 3) {
            this.ConfirmQuick?.SetLocalTextNew("HonamiStory_Tips_QuickUnload");
          }
        } else {
          this.ConfirmQuick?.SetLocalTextNew("HonamiStory_Tips_QuickEquipped");
        }
        i = this.TipsState === 0 || this.ActivityOpen;
        this.ConfirmRight?.SetUiActive(i);
      }
      this.GetItem(23)?.SetUIActive(i || e);
    }
  }
  RefreshSideButton(i, t) {
    i = i.GetItemType() === 1 && t !== 3;
    this.ButtonLeftA.SetUiActive(i);
    this.ButtonRightA.SetUiActive(i);
    t = t !== 1 && t !== 0;
    this.ButtonLeftB.SetUiActive(t);
    this.ButtonRightB.SetUiActive(t);
    this.SideButtonActive = t || i;
  }
  Refresh(i, t, s, e, o, h) {
    var r = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic();
    if (i === this.ItemData) {
      this.ItemData = undefined;
      this.OnClickedMask();
      return false;
    }
    if (this.OnHideCb) {
      this.OnHideCb();
    }
    this.GridLoc = o;
    this.GridSize = h;
    this.OnHideCb = e;
    this.SetTipsVisible(true);
    o = i.GetItemType() === 1 ? 2 : 1;
    h = i.GetItemType() === 1 ? i : undefined;
    e = HonamiStoryDefine_1.HonamiBackpackTypeMap.get(t);
    r.SetLogicState(o, h, e);
    this.CurrentPos = s;
    this.ItemData = i;
    this.BackpackType = t;
    this.RefreshButton(i, t);
    this.z_f();
    r = i.GetName();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), r);
    o = i.GetDesc();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), o);
    this.GetItem(7)?.SetUIActive(false);
    h = i.GetItemType() === 1 ? "SP_TipsTypeIcon1" : "SP_TipsTypeIcon2";
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(h);
    this.SetSpriteByPath(e, this.GetSprite(2), false);
    let n = PublicUtil_1.PublicUtil.GetConfigTextByKey(i.GetItemTypeText());
    if (!Info_1.Info.IsBuildShipping) {
      n += " ID:" + i.GetItemId();
      if (i.GetItemType() === 1) {
        s = i;
        n += ` Type:${i.GetSubType()} Power:${s.GetBaseEnhance()}`;
      }
    }
    this.GetText(3)?.SetText(n);
    t = this.GetTexture(22);
    this.SetItemIcon(t, i.GetItemId());
    r = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryQuality(i.GetQuality());
    this.SetSpriteByPath(r.Bg, this.GetSprite(1), false);
    this.GetText(5)?.SetText("" + i.GetSellPrice());
    o = i.GetItemType();
    this.UpdateHeight = 0;
    if (o !== 2) {
      h = i;
      if (!h) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("HonamiStory", 77, "SDC Data Transform Fail", ["Id", i.GetItemId()]);
        }
        return false;
      }
      var a = [];
      for (const _ of h.GetMainPropList()) {
        a.push({
          PropId: _
        });
      }
      e = h.GetBuffTempIdList();
      this.PropertyLayout?.RefreshByDataDirectlySync(a);
      this.SkillLayout?.RefreshByDataDirectlySync(e);
    } else {
      this.PropertyLayout?.RefreshByDataDirectlySync([]);
      this.SkillLayout?.RefreshByDataDirectlySync([]);
    }
    return true;
  }
  SetAutoLocation(i, t) {
    var s = this.RootItem.GetWidth();
    var e = this.RootItem.GetHeight();
    var o = this.RootItem.GetUIWorldPosition();
    var h = UE.WidgetLayoutLibrary.GetViewportSize(GlobalData_1.GlobalData.World);
    var r = UE.WidgetLayoutLibrary.GetViewportScale(GlobalData_1.GlobalData.World);
    var n = h.X / r / 2;
    var h = h.Y / r / 2;
    var r = i.X + t.X / 2;
    var a = i.Y;
    var _ = this.SideButtonActive ? this.SideButtonWidth : 0;
    var l = Info_1.Info.IsMobileInputModel() ? 0 : RIGHT_OFFSET;
    var _ = r + s + _ + l < n;
    let m = 0;
    let u = 0;
    m = _ ? r + s / 2 + l : i.X - t.X / 2 - s / 2;
    u = 100 - h < a - e ? a + t.Y / 2 : -h + e + this.BottomOffset;
    if (Info_1.Info.IsInGamepad()) {
      this.GetItem(19)?.SetUIActive(false);
      this.GetItem(16)?.SetUIActive(false);
    } else if (Info_1.Info.IsMobileInputModel()) {
      let i = false;
      if (this.SideButtonActive) {
        if (i = r + s / 2 + this.SideButtonWidth > 0) {
          if (!_) {
            m -= this.SideButtonWidth;
          }
        } else {
          m += this.SideButtonWidth;
        }
      }
      this.GetItem(19)?.SetUIActive(!i && this.SideButtonActive);
      this.GetItem(16)?.SetUIActive(i && this.SideButtonActive);
    } else {
      this.GetItem(19)?.SetUIActive(false);
      this.GetItem(16)?.SetUIActive(this.SideButtonActive);
      if (!_ && this.SideButtonActive) {
        m -= this.SideButtonWidth;
      }
    }
    n = Vector_1.Vector.Create(m, o.Y, u).ToUeVectorOld();
    this.RootItem.SetUIWorldLocation(n);
  }
  SetMaskAttach(i) {
    this.MaskButton = i;
  }
  SetTipsVisible(i) {
    this.MaskButton.RootUIComp.SetUIActive(i);
    if (i) {
      this.yvm?.PlaySequence("Start");
    } else {
      this.yvm?.PlaySequence("Close");
    }
    if (!i) {
      this.ItemData = undefined;
      ModelManager_1.ModelManager.HonamiStoryModel.GetInteractController().OnClickedItem(false, -1, undefined);
      if (this.OnHideCb) {
        this.OnHideCb();
      }
      this.OnHideCb = undefined;
    }
  }
  SetItemDataOut(i) {
    this.ItemData = i;
  }
  GetItemDataOut() {
    return this.ItemData;
  }
  SetTipsState(i) {
    this.TipsState = i;
  }
  SetBottomOffset(i) {
    this.BottomOffset = i;
  }
  OnDiscardItem() {
    var i;
    if (this.ItemData.IsLock()) {
      this.SetTipsVisible(false);
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_TryDiscardLockItem");
      ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogicState(0);
    } else {
      i = this.BackpackType === 1 ? 2 : 4;
      if (!ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic().IsBackpackView()) {
        if (ModelManager_1.ModelManager.HonamiStoryModel.SetItemIntoBag(this.ItemData, i, 3)) {
          this.SetTipsVisible(false);
          ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogicState(0);
        }
      } else {
        HonamiStoryController_1.HonamiStoryController.RequestDiscardItem(this.ItemData, i);
        this.SetTipsVisible(false);
        ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogicState(0);
      }
    }
  }
  z_f() {
    if (Info_1.Info.IsInGamepad()) {
      this.GetItem(24)?.SetUIActive(false);
    } else {
      var t = this.ItemData.GetItemType() === 2;
      var s = UiManager_1.UiManager.GetViewByName("HonamiStoryBackpackView") === undefined;
      if ((this.BackpackType === 0 || this.BackpackType === 1 && !s) && t) {
        this.GetItem(24)?.SetUIActive(false);
      } else {
        this.GetItem(24)?.SetUIActive(true);
        let i = "";
        i = this.BackpackType === 3 ? "HonamiStory_DoubleClickTip_UnloadPlugin" : s ? this.BackpackType !== 2 ? "HonamiStory_DoubleClickTip_Discard" : t ? "HonamiStory_DoubleClickTip_Pick" : "HonamiStory_DoubleClickTip_PickPlugin" : "HonamiStory_DoubleClickTip_Equip";
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(25), i);
      }
    }
  }
  SetEnable(i) {
    this.SetUiActive(i);
    this.GetOriginalItem()?.SetUIActive(i);
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (i[0] === "SkillRoleText") {
      i = Number(i[1]);
      if (i = this.SkillLayout?.GetLayoutItemByIndex(i)?.GetGuideUiItem("0")) {
        return [i, i];
      } else {
        return undefined;
      }
    }
  }
}
exports.HonamiStoryItemTipsBase = HonamiStoryItemTipsBase;
//# sourceMappingURL=HonamiStoryItemTipsBase.js.map