"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryWeaponSelectView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const ActivityFunctionalTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const HonamiStoryController_1 = require("../HonamiStoryController");
const HonamiStoryDefine_1 = require("../HonamiStoryDefine");
const HonamiStoryUtil_1 = require("../HonamiStoryUtil");
const HonamiStorySkillDescToggle_1 = require("./Backpack/Item/HonamiStorySkillDescToggle");
const HonamiStoryWeaponPanelItem_1 = require("./Items/HonamiStoryWeaponPanelItem");
const HonamiStoryWeaponSuitInfoItem_1 = require("./Items/HonamiStoryWeaponSuitInfoItem");
const HonamiStoryWeaponTagItem_1 = require("./Items/HonamiStoryWeaponTagItem");
class HonamiStoryWeaponSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.PopupCaption = undefined;
    this.dYd = undefined;
    this.Nim = undefined;
    this.Vim = [];
    this.fYd = undefined;
    this.ESc = undefined;
    this.CYd = undefined;
    this.p9t = undefined;
    this.wVl = undefined;
    this.abm = undefined;
    this.pYd = () => {
      var t = new HonamiStoryWeaponPanelItem_1.HonamiStoryWeaponPanelItem();
      t.BindWeaponToggleClick(this.vYd);
      return t;
    };
    this.ySc = () => new HonamiStoryWeaponTagItem_1.HonamiStoryWeaponTagItem();
    this.yYd = () => new HonamiStoryWeaponSuitInfoItem_1.HonamiStoryWeaponSuitInfoItem();
    this.vYd = t => {
      if (this.Nim !== t) {
        this.Nim?.OnDeselected();
        this.Nim = t;
        this.Nim.OnSelected();
        this.SYd();
      }
    };
    this.p5t = () => {
      var t = ModelManager_1.ModelManager.HonamiStoryModel.CheckSelectWeaponState(this.Nim.WeaponId, this.dYd);
      let e = 0;
      switch (t) {
        case 1:
        case 2:
          e = this.Nim.WeaponId;
          break;
        case 0:
          e = 0;
      }
      var t = ModelManager_1.ModelManager.HonamiStoryModel.GetWeaponEquipState(e) ?? this.Nim?.GetEquipData();
      if (t && t.GetRoleId() !== 0 && this.dYd?.GetRoleId() !== t.GetRoleId()) {
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(421)).FunctionMap.set(2, () => {
          this.VLm(e, this.dYd.GetPosition());
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      } else {
        this.VLm(e, this.dYd.GetPosition());
      }
    };
    this.VLm = (t, e) => {
      HonamiStoryController_1.HonamiStoryController.SendHonamiStoryWeaponDressRequest(t, e, () => {
        this.SYd();
        for (const t of this.Vim) {
          if (t) {
            t.RefreshItem();
            t.RefreshCurSelectLightSprite(this.dYd);
          }
        }
      });
    };
    this._5e = () => {
      this.CloseMe();
    };
    this.sbm = t => {
      this.SYd();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIText], [8, UE.UIText], [9, UE.UIText], [10, UE.UIMultiTemplateLayout], [11, UE.UIItem], [12, UE.UIText], [13, UE.UIVerticalLayout], [14, UE.UIItem], [15, UE.UIText], [16, UE.UIText], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStorySkillDescModeChange, this.sbm);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStorySkillDescModeChange, this.sbm);
  }
  async OnBeforeStartAsync() {
    this.Fq();
    this.eQt();
    this.wVl = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    await this.wVl.CreateThenShowByActorAsync(this.GetItem(20).GetOwner());
    var t = [];
    for (const e of ModelManager_1.ModelManager.HonamiStoryModel.GetWeaponTypeList()) {
      t.push(e);
    }
    await this.fYd?.RefreshByDataAsync(t);
    this.jim();
    this.abm = new HonamiStorySkillDescToggle_1.HonamiStorySkillDescToggle();
    await this.abm.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    var t = {
      UiText: this.GetText(8),
      ViewType: 0,
      ReportType: 11
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(t);
  }
  OnBeforeShow() {
    this.GetItem(19)?.SetUIActive(false);
    this.SYd();
  }
  OnBeforeHide() {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStoryWeaponUnlockSet) ?? new Set();
    t.clear();
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStoryWeaponUnlockSet, t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryBackpackClickWeapon);
  }
  SYd() {
    if (this.Nim) {
      var t = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
      var e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10123);
      var i = ModelManager_1.ModelManager.HonamiStoryModel.GetWeaponData(this.Nim.WeaponId);
      if (i !== undefined) {
        var o = i.IsUnlock;
        this.GetItem(18)?.SetUIActive(o);
        this.GetItem(17)?.SetUIActive(o);
        this.GetItem(3)?.SetUIActive(o && !t && e);
        this.wVl.SetActive(!o);
        var t = i.Config;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t.Name);
        var e = ModelManager_1.ModelManager.HonamiStoryModel.GetSkillDescMode();
        var n = e ? t.AttributesDescriptionSimple : t.AttributesDescription;
        var e = e ? t.AttributesDescriptionSimpleArgs : t.AttributesDescriptionArgs;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), n, ...e);
        this.GetText(16)?.ShowTextNew(t.GetWayDes);
        if (o) {
          this.ESc?.RefreshByData(t.PluginTags);
          var r = [];
          for (const s of t.SuitId) {
            r.push({
              SuitId: s,
              EquipData: this.dYd
            });
          }
          this.CYd?.RefreshByData(r);
        } else {
          this.wVl.SetTextByTextId(i.Config.LockDescription);
        }
        this.M3e();
      }
    }
  }
  M3e() {
    switch (ModelManager_1.ModelManager.HonamiStoryModel.CheckSelectWeaponState(this.Nim.WeaponId, this.dYd)) {
      case 1:
        this.p9t.SetLocalTextNew("HonamiStory_Equip");
        break;
      case 2:
        this.p9t.SetLocalTextNew("HonamiStory_Change");
        break;
      case 0:
        this.p9t.SetLocalTextNew("HonamiStory_Remove");
    }
  }
  Fq() {
    this.dYd = this.OpenParam;
  }
  eQt() {
    this.fYd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.pYd, this.GetItem(2).GetOwner(), true);
    this.ESc = new GenericLayout_1.GenericLayout(this.GetMultiTemplateLayout(10), this.ySc);
    this.CYd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(13), this.yYd);
    this.PopupCaption = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(4));
    this.PopupCaption.SetCloseCallBack(this._5e);
    this.PopupCaption.SetHelpBtnActive(true);
    this.PopupCaption.SetHelpCallBack(() => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(HonamiStoryDefine_1.HONAMI_HELP_WEAPONSELECT);
    });
    this.p9t = new ButtonItem_1.ButtonItem(this.GetItem(3));
    this.p9t.SetFunction(this.p5t);
  }
  jim() {
    if (this.Nim) {
      this.Nim.OnDeselected();
      this.Nim = undefined;
    }
    var t = this.dYd.GetWeaponId();
    for (const e of this.fYd.GetLayoutItemList()) {
      for (const i of e.GetWeaponToggleList()) {
        this.Vim.push(i);
        i.RefreshCurSelectLightSprite(this.dYd);
        if (i.WeaponId === t) {
          this.Nim = i;
        }
      }
    }
    this.Nim ||= this.Vim[0];
    this.Nim.OnSelected();
  }
}
exports.HonamiStoryWeaponSelectView = HonamiStoryWeaponSelectView;
//# sourceMappingURL=HonamiStoryWeaponSelectView.js.map