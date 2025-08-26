"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChipHandBookView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioController_1 = require("../../../Core/Audio/AudioController");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../Ui/UiManager");
const LguiUtil_1 = require("../Util/LguiUtil");
const DynScrollView_1 = require("../Util/ScrollView/DynScrollView");
const ChipHandBookItem_1 = require("./ChipHandBookItem");
const HandBookController_1 = require("./HandBookController");
const HandBookDefine_1 = require("./HandBookDefine");
const HandBootChipDynamicItem_1 = require("./HandBootChipDynamicItem");
class ChipHandBookView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.VZt = undefined;
    this.hXn = undefined;
    this.lXn = -1;
    this._Xn = -1;
    this.HandBookCommonItemDataList = [];
    this.QZt = undefined;
    this.XZt = new AudioController_1.PlayResult();
    this.$Zt = 8;
    this.YZt = undefined;
    this.JZt = 1000;
    this.IRe = undefined;
    this.zZt = -0;
    this.oUe = -0;
    this.ZZt = 1000;
    this.eei = undefined;
    this.tei = [];
    this.lqe = undefined;
    this.iei = 60;
    this.oei = 10;
    this.zji = undefined;
    this.Refresh = () => {
      this.InitScrollView();
      this.RefreshCollectText();
    };
    this.OnHandBookRead = (i, t) => {
      if (i === 6) {
        var e = this.tei.length;
        for (let i = 0; i < e; i++) {
          this.tei[i].RefreshNewState();
        }
      }
    };
    this.rei = (i, t, e) => {
      var s = new ChipHandBookItem_1.ChipHandBookItem();
      s.BindToggleCallback(this.nei);
      s.BindChildToggleCallback(this.sei);
      this.tei.push(s);
      return s;
    };
    this.nei = i => {
      this.lXn = i;
      i = this.uXn();
      this.VZt?.RefreshByData(i, true);
      this.VZt?.BindLateUpdate(() => {
        this.VZt?.ScrollToItemIndex(this._Xn);
        this.VZt?.UnBindLateUpdate();
      });
    };
    this.sei = (i, t) => {
      this.QZt = i;
      this.zji?.SetToggleStateForce(0, false);
      this.zji = t;
      var e;
      var s;
      var h;
      var t = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(6, this.QZt.Id);
      var o = t === undefined;
      if (o) {
        this.RefreshLockState(o);
      } else {
        s = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(this.QZt.Id);
        this.GetText(4).SetText(s);
        s = ConfigManager_1.ConfigManager.HandBookConfig.GetChipTypeConfig(i.Type);
        this.GetText(5).ShowTextNew(s.TypeDescription);
        h = (s = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(this.QZt.Id)).length > 0;
        e = this.GetItem(17);
        if (h) {
          e.SetUIActive(true);
          this.SetTextureByPath(s[0], this.GetTexture(7));
        } else {
          e.SetUIActive(false);
        }
        h = s.length;
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(8), "RoleExp", 1, h);
        e = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(this.QZt.Id).length > 0;
        this.GetItem(16).SetUIActive(e);
        this.GetText(11).ShowTextNew(i.VoiceDescrtption);
        this.GetButton(12).RootUIComp.SetUIActive(false);
        this.GetButton(13).RootUIComp.SetUIActive(true);
        h = (s = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(this.QZt.Id))?.length > 0;
        this.GetItem(20).SetUIActive(h);
        this.GetText(21).SetText(s);
        this.GetItem(18).SetUIActive(false);
        if (t !== undefined && !t.IsRead) {
          HandBookController_1.HandBookController.SendIllustratedReadRequest(6, this.QZt.Id);
        }
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "DateOfAcquisition", o ? "" : t.CreateTime);
      }
    };
    this.aei = (i, t) => i.Id - t.Id;
    this.lyt = () => {
      UiManager_1.UiManager.CloseView("ChipHandBookView");
    };
    this.hei = () => {
      this.GetButton(12).RootUIComp.SetUIActive(true);
      this.GetButton(13).RootUIComp.SetUIActive(false);
      this.YZt ||= (0, puerts_1.toManualReleaseDelegate)(this.lei);
      var i = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(this.QZt.Id);
      AudioController_1.AudioController.PostEventByUi(i, this.XZt, this.$Zt, this.YZt);
    };
    this._ei = () => {
      this.GetButton(12).RootUIComp.SetUIActive(false);
      this.GetButton(13).RootUIComp.SetUIActive(true);
      if (this.QZt) {
        this.uei();
        this.zZt = 0;
        AudioController_1.AudioController.StopEvent(this.XZt);
        this.eei.SetText("");
      }
    };
    this.cei = () => {
      var i = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(this.QZt.Id);
      var t = this.QZt.Type;
      var t = ConfigManager_1.ConfigManager.HandBookConfig.GetChipTypeConfig(t);
      var e = new HandBookDefine_1.HandBookPhotoData();
      var s = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(this.QZt.Id);
      var h = [];
      h.push(s);
      var s = [];
      s.push(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.TypeDescription));
      var t = [];
      var o = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(this.QZt.Id);
      t.push(o);
      e.DescrtptionText = h;
      e.TypeText = s;
      e.NameText = t;
      e.HandBookType = 6;
      e.Index = 0;
      e.TextureList = i;
      UiManager_1.UiManager.OpenView("HandBookPhotoView", e);
    };
    this.lei = (i, t) => {
      if (i === 3) {
        this.oUe = Math.ceil(t.Duration / this.JZt);
        this.IRe = TimerSystem_1.GameplayTimerSystem.Loop(() => {
          var i;
          var t;
          var e;
          var s;
          this.zZt = this.zZt + 1;
          if (this.zZt > this.oUe) {
            this._ei();
          } else {
            i = this.zZt % this.iei;
            t = Math.floor(this.zZt / this.iei);
            e = this.oUe % this.iei;
            s = Math.floor(this.oUe / this.iei);
            this.SetVoiceProgress(i, t, e, s);
          }
        }, this.ZZt, this.oUe + 1);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIDynScrollViewComponent], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UITexture], [8, UE.UIText], [9, UE.UIText], [10, UE.UIText], [11, UE.UIText], [12, UE.UIButtonComponent], [13, UE.UIButtonComponent], [14, UE.UIButtonComponent], [15, UE.UIText], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIText], [22, UE.UIItem]];
    this.BtnBindInfo = [[12, this._ei], [13, this.hei], [14, this.cei]];
  }
  OnStart() {
    this.InitCommonTabTitle();
    this.Refresh();
    this.RefreshLockText();
    this.eei = this.GetText(10);
  }
  RefreshLockState(i) {
    this.GetText(4).SetUIActive(!i);
    this.GetText(5).SetUIActive(!i);
    this.GetText(6).SetUIActive(!i);
    this.GetTexture(7).SetUIActive(!i);
    this.GetText(8).SetUIActive(!i);
    this.GetText(9).SetUIActive(!i);
    this.GetText(10).SetUIActive(!i);
    this.GetText(11).SetUIActive(!i);
    this.GetButton(12).RootUIComp.SetUIActive(false);
    this.GetButton(13).RootUIComp.SetUIActive(!i);
    this.GetButton(14).RootUIComp.SetUIActive(!i);
    this.GetText(15).SetUIActive(i);
    this.GetItem(22).SetUIActive(i);
    this.GetItem(19).SetUIActive(!i);
    this.GetItem(20).SetUIActive(!i);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHandBookDataInit, this.Refresh);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHandBookDataUpdate, this.Refresh);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHandBookRead, this.OnHandBookRead);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHandBookDataInit, this.Refresh);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHandBookDataUpdate, this.Refresh);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHandBookRead, this.OnHandBookRead);
  }
  async OnBeforeStartAsync() {
    this.hXn = new HandBootChipDynamicItem_1.HandBootChipDynamicItem();
    this.VZt = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(2), this.GetItem(3), this.hXn, this.rei);
    await this.VZt.Init();
  }
  InitScrollView() {
    var t = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.HandBookConfig.GetChipTypeConfigList());
    t.sort(this.aei);
    var e = t.length;
    this.HandBookCommonItemDataList = [];
    for (let i = 0; i < e; i++) {
      var s = t[i];
      var h = new HandBookDefine_1.HandBookCommonItemData();
      var o = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(6, s.Id);
      var n = o === undefined;
      var o = o !== undefined && !o.IsRead;
      h.Icon = s.Icon;
      h.Title = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s.TypeDescription);
      h.Config = s;
      h.IsLock = n;
      h.IsNew = o;
      this.HandBookCommonItemDataList.push(h);
    }
    var i = this.uXn();
    this.VZt?.RefreshByData(i);
  }
  RefreshLockText() {
    var i = ConfigManager_1.ConfigManager.TextConfig.GetTextById("ChipHandBookLock");
    this.GetText(15).SetText(i);
  }
  InitCommonTabTitle() {
    var i = ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(6);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.lyt);
    this.lqe.SetTitleLocalText(i.Name);
    this.lqe.SetTitleIcon(i.TitleIcon);
  }
  uei() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.IRe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.IRe);
    }
    this.IRe = undefined;
  }
  SetVoiceProgress(i, t, e, s) {
    LguiUtil_1.LguiUtil.SetLocalText(this.eei, "VoiceProgress", this.TimeFormat(t), this.TimeFormat(i), this.TimeFormat(s), this.TimeFormat(e));
  }
  TimeFormat(i) {
    if (i < this.oei) {
      return "0" + String(i);
    } else {
      return String(i);
    }
  }
  RefreshCollectText() {
    var i = HandBookController_1.HandBookController.GetCollectProgress(6);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "RoleExp", i[0], i[1]);
  }
  OnBeforeDestroy() {
    if (this.VZt) {
      this.VZt.ClearChildren();
      this.VZt = undefined;
    }
    if (this.YZt) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.lei);
      this.YZt = undefined;
    }
    AudioController_1.AudioController.StopEvent(this.XZt);
    this.zZt = 0;
    this.oUe = 0;
    this.eei = undefined;
    this.tei = [];
    this.HandBookCommonItemDataList = [];
    this.QZt = undefined;
  }
  uXn() {
    if (this.lXn === -1) {
      this.lXn = this.HandBookCommonItemDataList[0].Config.Id;
    }
    var t = [];
    for (const h of this.HandBookCommonItemDataList) {
      var i = this.lXn === h.Config.Id;
      var e = new HandBookDefine_1.HandBookChipDynamicData();
      e.HandBookCommonItemData = h;
      e.IsShowContent = i;
      t.push(e);
      if (i) {
        this._Xn = this.HandBookCommonItemDataList.indexOf(h);
        let i = true;
        for (const o of ConfigManager_1.ConfigManager.HandBookConfig.GetChipHandBookConfigList(h.Config.Id)) {
          var s = new HandBookDefine_1.HandBookChipDynamicData();
          s.HandBookChipConfigId = o.Id;
          s.IsShowContent = i;
          t.push(s);
          i = false;
        }
      }
    }
    return t;
  }
}
exports.ChipHandBookView = ChipHandBookView;
//# sourceMappingURL=ChipHandBookView.js.map