"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideStepViewData = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class GuideStepViewData {
  constructor(t) {
    this._zt = true;
    this.xqe = undefined;
    this.OQt = undefined;
    this.uzt = undefined;
    this._wm = undefined;
    this.czt = undefined;
    this.IsAttachToBattleView = false;
    this.mzt = undefined;
    this.dzt = undefined;
    this.OQt = t;
  }
  get IsMultiAttach() {
    return !!this._wm;
  }
  get ViewConf() {
    switch (this.OQt.Config.ContentType) {
      case 4:
        this.uzt = ConfigManager_1.ConfigManager.GuideConfig.GetGuideFocus(this.OQt.Id);
        break;
      case 1:
        this.uzt = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTips(this.OQt.Id);
        break;
      case 3:
        this.uzt = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorial(this.OQt.Id);
    }
    if (!this.uzt) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 16, "引导步骤id找不到引导类型数据, 清检查配置", ["this.Owner!.Id", this.OQt.Id]);
      }
    }
    return this.uzt;
  }
  GetAttachedUiItem() {
    return this.mzt;
  }
  ResetAttachedUiItem() {
    this.mzt = undefined;
  }
  GetAttachedUiItemForShow() {
    return this.dzt ?? this.mzt;
  }
  GetMultiAttachItems() {
    return this._wm;
  }
  SetAttachedUiItem(t) {
    if (this.OQt.Config.ContentType !== 4) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 16, `引导步骤 ${this.OQt.Id} 的界面类型不是聚焦引导, 无法添加依附的Ui节点`);
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Guide", 95, "聚焦引导找到AttachedUiItem", ["Name", t?.GetDisplayName()]);
      }
      this.mzt = t;
    }
  }
  SetAttachedUiItemForShow(t) {
    if (this.OQt.Config.ContentType !== 4) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 16, `引导步骤 ${this.OQt.Id} 的界面类型不是聚焦引导, 无法添加依附的Ui节点(显示用)`);
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Guide", 95, "聚焦引导找到AttachedUiItemForShow", ["Name", t?.GetDisplayName()]);
      }
      this.dzt = t;
    }
  }
  SetMultiAttachItems(t) {
    if (this.OQt.Config.ContentType !== 4) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 16, `引导步骤 ${this.OQt.Id} 的界面类型不是聚焦引导, 无法添加依附的Ui节点`);
      }
    } else {
      this._wm = t;
    }
  }
  TryLockScrollView(t) {
    this.xqe = t;
    this._zt = this.xqe.GetEnable();
    this.xqe.SetEnable(false);
  }
  TryUnLockScrollView() {
    if (this.xqe) {
      this.xqe.SetEnable(this._zt);
    }
  }
  GetAttachedView() {
    return this.czt;
  }
  SetAttachedView(t) {
    this.czt = t;
  }
  Clear() {
    this.TryUnLockScrollView();
    this.czt = undefined;
    this.mzt = undefined;
    this.dzt = undefined;
    this.xqe = undefined;
  }
}
exports.GuideStepViewData = GuideStepViewData;
//# sourceMappingURL=GuideViewData.js.map