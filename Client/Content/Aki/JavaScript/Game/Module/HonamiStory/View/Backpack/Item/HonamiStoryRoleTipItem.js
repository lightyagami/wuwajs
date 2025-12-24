"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryRoleTipItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const HonamiStoryUtil_1 = require("../../../HonamiStoryUtil");
const HonamiStoryWeaponSuitInfoItem_1 = require("../../Items/HonamiStoryWeaponSuitInfoItem");
const HonamiStoryWeaponTagItem_1 = require("../../Items/HonamiStoryWeaponTagItem");
const HonamiStoryTipsPropertyItem_1 = require("./HonamiStoryTipsPropertyItem");
class HonamiStoryRoleTipItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$Yd = undefined;
    this.XYd = undefined;
    this.SkillLayout = undefined;
    this.PropertyLayout = undefined;
    this.ESc = undefined;
    this.LevelSequencePlayer = undefined;
    this.PNo = undefined;
    this.JYd = () => new HonamiStoryWeaponSuitInfoItem_1.HonamiStoryWeaponSuitInfoItem();
    this.yId = () => new HonamiStoryTipsPropertyItem_1.HonamiStoryTipsTextItem();
    this.i0m = () => new HonamiStoryTipsPropertyItem_1.HonamiStoryTipsPropertyItem();
    this.ySc = () => new HonamiStoryWeaponTagItem_1.HonamiStoryWeaponTagItem();
    this.UFe = () => {
      ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic()?.CloseTips();
      this.GetExtendToggle(15)?.RootUIComp.SetUIActive(false);
    };
    this.r0m = () => {
      if (this.PNo) {
        this.PNo();
      }
      this.ShowTips(false);
    };
    this.JNm = () => {
      this.s8l();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [0, UE.UIItem], [3, UE.UIVerticalLayout], [4, UE.UIItem], [2, UE.UIItem], [5, UE.UIItem], [6, UE.UIVerticalLayout], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIVerticalLayout], [10, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [11, UE.UIButtonComponent], [14, UE.UIItem], [15, UE.UIExtendToggle], [16, UE.UIScrollViewWithScrollbarComponent], [17, UE.UIItem], [18, UE.UIMultiTemplateLayout], [19, UE.UIItem]];
    this.BtnBindInfo = [[11, this.r0m], [15, this.UFe]];
  }
  async OnBeforeStartAsync() {
    this.XYd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.JYd);
    this.SkillLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(6), this.yId);
    this.PropertyLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(9), this.i0m);
    this.ESc = new GenericLayout_1.GenericLayout(this.GetMultiTemplateLayout(18), this.ySc);
    await super.OnBeforeStartAsync();
  }
  OnStart() {
    var e = {
      UiText: this.GetText(1),
      ViewType: 0,
      ReportType: 11
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(e);
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    e = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic().GetTipsOpen();
    this.GetExtendToggle(15)?.RootUIComp.SetUIActive(e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStorySkillDescModeChange, this.JNm);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStorySkillDescModeChange, this.JNm);
  }
  Refresh(e) {
    this.GetScrollViewWithScrollbar(16)?.ScrollToTop(undefined, this.GetItem(0), true);
    this.$Yd = e;
    this.RefreshItemTipsOpen();
    this.s8l();
    this.o0m();
    this.ShowTips(true);
  }
  RefreshItemTipsOpen() {
    var e;
    if (this.IsUiActiveInHierarchy()) {
      e = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic().GetTipsOpen();
      this.GetExtendToggle(15)?.RootUIComp.SetUIActive(e);
    }
  }
  s8l() {
    if (this.$Yd) {
      var e = this.$Yd.GetWeaponId();
      var t = e !== 0;
      if (t) {
        var e = ModelManager_1.ModelManager.HonamiStoryModel.GetWeaponData(e);
        var i = ModelManager_1.ModelManager.HonamiStoryModel.GetSkillDescMode();
        var r = i ? e.DescSimple : e.Desc;
        var i = i ? e.DescSimpleArgs : e.DescArgs;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), r, ...i);
        var r = e.SuitId;
        var s = [];
        for (const o of r) {
          s.push({
            SuitId: o,
            EquipData: this.$Yd
          });
        }
        this.XYd?.RefreshByData(s);
        this.ESc?.RefreshByData(e.PluginTags);
      }
      this.GetItem(0)?.SetUIActive(t);
      this.GetItem(2)?.SetUIActive(t);
      this.GetItem(12)?.SetUIActive(!t);
      this.GetItem(17)?.SetUIActive(t);
    }
  }
  o0m() {
    var e = this.$Yd.GetPluginList();
    var t = e && e.some(e => e !== undefined);
    if (t) {
      var i = new Map();
      var r = new Map();
      for (const n of e) {
        if (n) {
          for (const a of n.GetBuffTempIdList()) {
            if (!a.RoleId || !!HonamiStoryUtil_1.HonamiStoryUtil.CheckRolePowerValid(a.RoleId, this.$Yd.GetParentRoleId())) {
              i.set(a.BuffId, a);
            }
          }
          for (const h of n.GetMainPropList()) {
            var s;
            var o = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryProp(h);
            if (o) {
              if (r.has(h)) {
                (s = r.get(h)).PropertyNumber ??= 0;
                s.PropertyNumber += o.StandardProperty;
              } else {
                r.set(h, {
                  PropId: h,
                  PropertyNumber: o.StandardProperty
                });
              }
            }
          }
        }
      }
      e = Array.from(i.values());
      this.SkillLayout?.RefreshByData(e);
      this.PropertyLayout?.RefreshByData(Array.from(r.values()));
    }
    this.GetItem(5)?.SetUIActive(t);
    this.GetItem(8)?.SetUIActive(t);
    this.GetItem(13)?.SetUIActive(!t);
  }
  RegisterCloseCallback(e) {
    this.PNo = e;
  }
  ShowTips(e) {
    this.SetActive(e);
    if (this.LevelSequencePlayer.IsPlayingSequence("In")) {
      this.LevelSequencePlayer.StopSequenceByKey("In");
    }
    if (e) {
      this.LevelSequencePlayer.PlayOrReplaySequenceByName("In");
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t;
    if (e.length !== 0 && e[0] === "SuitDesc" && (e = Number(e[1]), e = this.XYd.GetItemByIndex(e), t = this.GetItem(2), this.GetScrollViewWithScrollbar(16)?.StopMovement(), this.GetScrollViewWithScrollbar(16)?.ScrollTo(t, true), e)) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.HonamiStoryRoleTipItem = HonamiStoryRoleTipItem;
//# sourceMappingURL=HonamiStoryRoleTipItem.js.map