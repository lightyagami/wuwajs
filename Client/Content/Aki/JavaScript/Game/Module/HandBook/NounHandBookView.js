"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NounHandBookView = undefined;
const UE = require("ue");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../Ui/UiManager");
const LguiUtil_1 = require("../Util/LguiUtil");
const DynScrollView_1 = require("../Util/ScrollView/DynScrollView");
const HandBookController_1 = require("./HandBookController");
const HandBookDefine_1 = require("./HandBookDefine");
const HandBootNounDynamicItem_1 = require("./HandBootNounDynamicItem");
const NounHandBookItem_1 = require("./NounHandBookItem");
class NounHandBookView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.VZt = undefined;
    this.R8a = undefined;
    this.U8a = -1;
    this._Xn = -1;
    this.HandBookCommonItemDataList = [];
    this.QZt = undefined;
    this.x8a = [];
    this.lqe = undefined;
    this.zji = undefined;
    this.Refresh = () => {
      this.InitScrollView();
      this.RefreshCollectText();
    };
    this.OnHandBookRead = (i, t) => {
      if (i === 11) {
        var e = this.x8a.length;
        for (let i = 0; i < e; i++) {
          this.x8a[i].RefreshNewState();
        }
      }
    };
    this.P8a = (i, t, e) => {
      var n = new NounHandBookItem_1.NounHandBookItem();
      n.BindToggleCallback(this.w8a);
      n.BindChildToggleCallback(this.B8a);
      this.x8a.push(n);
      return n;
    };
    this.w8a = i => {
      this.U8a = i;
      i = this.uXn();
      this.VZt?.RefreshByData(i, true);
      this.VZt?.BindLateUpdate(() => {
        this.VZt?.ScrollToItemIndex(this._Xn);
        this.VZt?.UnBindLateUpdate();
      });
    };
    this.B8a = (i, t) => {
      this.QZt = i;
      if (this.zji !== t) {
        this.zji?.SetToggleStateForce(0, false);
        this.zji = t;
      }
      var e;
      var n;
      var t = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(11, this.QZt.Id);
      var s = t === undefined;
      this.RefreshLockState(s);
      if (!s) {
        n = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(this.QZt.Id);
        this.GetText(4).SetText(n);
        n = ConfigManager_1.ConfigManager.HandBookConfig.GetNounTypeConfig(i.Type);
        this.GetText(5).ShowTextNew(n.TypeDescription);
        n = (i = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(this.QZt.Id)).length > 0;
        e = this.GetItem(17);
        if (n) {
          e.SetUIActive(true);
          this.SetTextureByPath(i[0], this.GetTexture(7));
        } else {
          e.SetUIActive(false);
        }
        n = i.length;
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(8), "RoleExp", 1, n);
        e = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(this.QZt.Id).length > 0;
        this.GetItem(16).SetUIActive(e);
        n = (i = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(this.QZt.Id))?.length > 0;
        this.GetItem(20).SetUIActive(n);
        this.GetText(21).SetText(i);
        this.GetItem(18).SetUIActive(false);
        if (t !== undefined && !t.IsRead) {
          HandBookController_1.HandBookController.SendIllustratedReadRequest(11, this.QZt.Id);
        }
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "DateOfAcquisition", s ? "" : t.CreateTime);
      }
    };
    this.aei = (i, t) => i.Id - t.Id;
    this.lyt = () => {
      UiManager_1.UiManager.CloseView("NounHandBookView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIDynScrollViewComponent], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UITexture], [8, UE.UIText], [9, UE.UIText], [10, UE.UIText], [11, UE.UIText], [12, UE.UIButtonComponent], [13, UE.UIButtonComponent], [14, UE.UIButtonComponent], [15, UE.UIText], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIText], [22, UE.UIItem]];
  }
  OnStart() {
    this.GetText(11).SetUIActive(false);
    this.GetText(10).SetUIActive(false);
    this.GetButton(13).RootUIComp.SetUIActive(false);
    this.GetButton(14).RootUIComp.SetUIActive(false);
    this.GetButton(12).RootUIComp.SetUIActive(false);
    this.InitCommonTabTitle();
    this.Refresh();
    this.RefreshLockText();
  }
  RefreshLockState(i) {
    this.GetText(4).SetUIActive(!i);
    this.GetText(5).SetUIActive(!i);
    this.GetText(6).SetUIActive(!i);
    this.GetTexture(7).SetUIActive(!i);
    this.GetText(8).SetUIActive(!i);
    this.GetText(9).SetUIActive(!i);
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
    this.R8a = new HandBootNounDynamicItem_1.HandBootNounDynamicItem();
    this.VZt = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(2), this.GetItem(3), this.R8a, this.P8a);
    await this.VZt.Init();
  }
  InitScrollView() {
    var t = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.HandBookConfig.GetNounTypeConfigList());
    t.sort(this.aei);
    var e = t.length;
    this.HandBookCommonItemDataList = [];
    for (let i = 0; i < e; i++) {
      var n = t[i];
      var s = new HandBookDefine_1.HandBookCommonItemData();
      var o = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(11, n.Id);
      var h = o === undefined;
      var o = o !== undefined && !o.IsRead;
      s.Icon = n.Icon;
      s.Title = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.TypeDescription);
      s.Config = n;
      s.IsLock = h;
      s.IsNew = o;
      this.HandBookCommonItemDataList.push(s);
    }
    var i = this.uXn();
    this.VZt?.RefreshByData(i);
  }
  RefreshLockText() {
    var i = ConfigManager_1.ConfigManager.TextConfig.GetTextById("ChipHandBookLock");
    this.GetText(15).SetText(i);
  }
  InitCommonTabTitle() {
    var i = ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(11);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.lyt);
    this.lqe.SetTitleLocalText(i.Name);
    this.lqe.SetTitleIcon(i.TitleIcon);
  }
  RefreshCollectText() {
    var i = HandBookController_1.HandBookController.GetCollectProgress(11);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "RoleExp", i[0], i[1]);
    this.GetText(1)?.SetUIActive(false);
  }
  OnBeforeDestroy() {
    if (this.VZt) {
      this.VZt.ClearChildren();
      this.VZt = undefined;
    }
    this.x8a = [];
    this.HandBookCommonItemDataList = [];
    this.QZt = undefined;
  }
  uXn() {
    if (this.U8a === -1) {
      this.U8a = this.HandBookCommonItemDataList[0].Config.Id;
    }
    var t = [];
    for (const s of this.HandBookCommonItemDataList) {
      var i = this.U8a === s.Config.Id;
      var e = new HandBookDefine_1.HandBookNounDynamicData();
      e.HandBookCommonItemData = s;
      e.IsShowContent = i;
      t.push(e);
      if (i) {
        this._Xn = this.HandBookCommonItemDataList.indexOf(s);
        let i = true;
        for (const o of ConfigManager_1.ConfigManager.HandBookConfig.GetNounHandBookConfigList(s.Config.Id)) {
          var n = new HandBookDefine_1.HandBookNounDynamicData();
          n.HandBookNounConfigId = o.Id;
          n.IsShowContent = i;
          t.push(n);
          i = false;
        }
      }
    }
    return t;
  }
}
exports.NounHandBookView = NounHandBookView;
//# sourceMappingURL=NounHandBookView.js.map