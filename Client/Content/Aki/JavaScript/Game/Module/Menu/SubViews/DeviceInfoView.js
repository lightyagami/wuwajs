"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeviceInfoView = exports.DeviceInfoItem = exports.DeviceInfoItemData = undefined;
const UE = require("ue");
const DeviceInfoAll_1 = require("../../../../Core/Define/ConfigQuery/DeviceInfoAll");
const GameSettingsDeviceRender_1 = require("../../../GameSettings/GameSettingsDeviceRender");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
class DeviceInfoItemData {
  constructor(e, i, t, s) {
    this.Id = undefined;
    this.Name = undefined;
    this.LowText = undefined;
    this.GetInfoFunction = undefined;
    this.Id = e;
    this.Name = i;
    this.LowText = t;
    this.GetInfoFunction = s;
  }
}
exports.DeviceInfoItemData = DeviceInfoItemData;
class DeviceInfoItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText]];
  }
  Refresh(e, i, t) {
    this.Pe = e;
    this.aHd();
  }
  aHd() {
    var e;
    var i;
    if (this.Pe && this.Pe.Name && this.Pe.GetInfoFunction && (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), this.Pe.Name), [i, e] = this.Pe.GetInfoFunction(), this.GetText(1)?.SetText(i), this.Pe.LowText && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), this.Pe.LowText), i = this.GetText(2))) {
      i.SetUIActive(e);
    }
  }
}
exports.DeviceInfoItem = DeviceInfoItem;
class DeviceInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.lqe = undefined;
    this.Jfg = () => new DeviceInfoItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await this.U3e();
    this.Jfo();
  }
  async U3e() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.lqe.SetCloseBtnActive(true);
    this.lqe.SetCloseBtnShowState(true);
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
  }
  Jfo() {
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.Jfg);
  }
  OnStart() {
    this.iXi();
  }
  iXi() {
    var e = DeviceInfoAll_1.configDeviceInfoAll.GetConfigList();
    if (e) {
      var i = this.Zfg();
      var t = [];
      for (const r of e) {
        var s = i.get(r.Id);
        if (s) {
          s = new DeviceInfoItemData(r.Id, r.Name, r.LowTips, s);
          t.push(s);
        }
      }
      this.xqe?.RefreshByData(t, undefined, true);
    }
  }
  Zfg() {
    var e = new Map();
    e.set(1, () => GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetCPUInformation());
    e.set(3, () => GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetGPUInformation());
    e.set(5, () => GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetGraphicDriverVersion());
    e.set(7, () => GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetGraphicAPI());
    e.set(2, () => GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetMemoryInformation());
    e.set(4, () => GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetVideoMemoryInformation());
    e.set(6, () => GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetGameInstallPath());
    e.set(8, () => GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetWindowsVersion());
    return e;
  }
}
exports.DeviceInfoView = DeviceInfoView;
//# sourceMappingURL=DeviceInfoView.js.map