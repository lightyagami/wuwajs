"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GachaTagItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class GachaTagItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.SelectCallback = undefined;
    this.CanExecuteChange = undefined;
    this.uWt = () => {
      this.SelectCallback?.(this.GridIndex);
    };
  }
  get GachaId() {
    return this.Data.GachaInfo.Id;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UIExtendToggle], [4, UE.UIItem], [5, UE.UISprite], [6, UE.UIText]];
    this.BtnBindInfo = [[3, this.uWt]];
  }
  OnStart() {
    this.GetExtendToggle(3).CanExecuteChange.Bind(() => !this.CanExecuteChange || this.CanExecuteChange(this.GridIndex));
  }
  SetSelected(e) {
    if (e) {
      this.GetExtendToggle(3).SetToggleState(1);
      (e = new LogReportDefine_1.OnClickGachaScrollLogEvent()).i_gacha_id = this.GachaId;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
    } else {
      this.GetExtendToggle(3).SetToggleState(0);
    }
  }
  RefreshRedDot() {
    let e = ModelManager_1.ModelManager.GachaModel.CheckNewGachaPoolById(this.GachaId);
    var t;
    var i;
    if (!e) {
      if ((t = ModelManager_1.ModelManager.GachaModel.GetGachaInfo(this.GachaId))?.GetFirstValidPool()?.UiType === 5) {
        t = t?.UsePoolId === 0;
        i = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FirstOpenCommonWeaponSelect, false) ?? false;
        e = t && !i;
      }
    }
    this.GetItem(2)?.SetUIActive(e);
  }
  InitData() {
    var e;
    var t;
    if (this.Data) {
      e = this.Data.PoolInfo.Id;
      if (e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(e)) {
        this.SetSpriteByPath(e.TagNotSelectedSpritePath, this.GetSprite(0), false);
        this.SetSpriteByPath(e.TagSelectedSpritePath, this.GetSprite(1), false);
        this.GetItem(4).SetUIActive(true);
        e = e.Type;
        if ((t = (e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewTypeConfig(e)).TagText) && !StringUtils_1.StringUtils.IsBlank(t)) {
          this.GetItem(4).SetUIActive(true);
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.TagText);
          t = UE.Color.FromHex(e.TagColor);
          this.GetSprite(5).SetColor(t);
        } else {
          this.GetItem(4).SetUIActive(false);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Gacha", 34, "获取抽卡界面信息失败，请检查GachaViewInfo表，GachaId:" + this.GachaId);
      }
    }
  }
  Refresh(e, t, i) {
    this.Data = e;
    this.InitData();
    this.RefreshRedDot();
    if (t) {
      this.OnSelected(false);
    } else {
      this.OnDeselected(false);
    }
  }
  GetKey(e, t) {
    return this.GachaId;
  }
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false);
  }
}
exports.GachaTagItem = GachaTagItem;
//# sourceMappingURL=GachaTagItem.js.map