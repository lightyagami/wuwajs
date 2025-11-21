"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvanceNoticeViewModel = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const LogReportDefine_1 = require("../../../LogReport/LogReportDefine");
const AdvanceNoticeDefine_1 = require("./AdvanceNoticeDefine");
const AdvanceNoticeThumbItemData_1 = require("./AdvanceNoticeThumbItemData");
class AdvanceNoticeViewModel {
  constructor() {
    this.DefaultSelectedTabId = 0;
    this.TabIndex = 0;
    this.CurrentSubTabIndex = 0;
    this.TabList = [];
    this.SubTabIdList = [];
    this.CurrentTabView = "AdvanceNoticeNewRoleTabView";
    this.AdvanceNoticeThumbItemDataList = [];
    this.dwm = new Map();
    this.ActivityId = 0;
    this.OnSwitchSubTabDelegate = undefined;
  }
  get TabId() {
    return this.TabList[this.TabIndex];
  }
  get CurrentSubTabId() {
    return this.AdvanceNoticeThumbItemDataList[this.CurrentSubTabIndex].SubTabId;
  }
  UpdateTabDataOnTabChange(e) {
    this.TabIndex = e;
    var e = this.TabList[e];
    var t = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingTabInfoById(e);
    this.SubTabIdList = t.SubTabIdList;
    this.CurrentSubTabIndex = 0;
    this.AdvanceNoticeThumbItemDataList.length = 0;
    this.dwm.clear();
    this.CurrentTabView = AdvanceNoticeDefine_1.advanceNoticeTabTypeToTabViewName[t.Type];
    for (const i of t.SubTabIdList) {
      var a = this.mym(t.Type, i);
      this.AdvanceNoticeThumbItemDataList.push(a);
    }
    this.mwm();
  }
  mym(e, t) {
    var a = new AdvanceNoticeThumbItemData_1.AdvanceNoticeThumbItemData();
    let i = undefined;
    switch (e) {
      case 1:
        i = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingTabCharacterById(t);
        a.BgTexturePath = i.ThumbnailPic;
        a.NameTextId = i.ThumbnailText;
        break;
      case 2:
        i = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingTabStoryById(t);
        a.BgTexturePath = i.ThumbnailPic;
        a.NameTextId = i.ThumbnailText;
        break;
      case 3:
        i = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingTabRegionById(t);
        a.BgTexturePath = i.ThumbnailPic;
        a.NameTextId = i.ThumbnailText;
        break;
      case 4:
        i = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingTabCostumeById(t);
        a.BgTexturePath = i.ThumbnailPic;
        a.NameTextId = i.ThumbnailText;
        break;
      case 5:
        i = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingTabEnemyById(t);
        a.BgTexturePath = i.ThumbnailPic;
        a.NameTextId = i.ThumbnailText;
        this.dwm?.set(i.Type, a);
        break;
      case 6:
        i = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingTabActivityById(t);
        a.BgTexturePath = i.ThumbnailPic;
        a.NameTextId = i.ThumbnailText;
        break;
      case 7:
        i = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingTabSystemById(t);
        a.BgTexturePath = i.ThumbnailPic;
        a.NameTextId = i.ThumbnailText;
    }
    a.TabId = this.TabId;
    a.SubTabId = t;
    return a;
  }
  mwm() {
    let e = 0;
    var t = this.dwm?.size;
    for (const a of this.dwm) {
      if (++e === t) {
        break;
      }
      a[1].ShowLine = true;
    }
  }
  OnSwitchSubTab(e) {
    this.CurrentSubTabIndex = e;
    this.OnSwitchSubTabDelegate?.(e);
  }
  ClickTabLogEvent() {
    var e = new LogReportDefine_1.NextVersionContentLogEvent();
    e.i_activity_id = this.ActivityId;
    e.i_second_tab = this.TabId;
    e.i_third_tab = this.CurrentSubTabId;
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
  }
}
exports.AdvanceNoticeViewModel = AdvanceNoticeViewModel;
//# sourceMappingURL=AdvanceNoticeViewModel.js.map