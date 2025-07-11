"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GachaTagItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
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
  SetSelected(t) {
    if (t) {
      this.GetExtendToggle(3).SetToggleState(1);
    } else {
      this.GetExtendToggle(3).SetToggleState(0);
    }
  }
  RefreshRedDot() {
    this.GetItem(2)?.SetUIActive(ModelManager_1.ModelManager.GachaModel.CheckNewGachaPoolById(this.GachaId));
  }
  InitData() {
    var t;
    var i;
    if (this.Data) {
      t = this.Data.PoolInfo.Id;
      if (t = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(t)) {
        this.SetSpriteByPath(t.TagNotSelectedSpritePath, this.GetSprite(0), false);
        this.SetSpriteByPath(t.TagSelectedSpritePath, this.GetSprite(1), false);
        this.GetItem(4).SetUIActive(true);
        t = t.Type;
        if ((i = (t = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewTypeConfig(t)).TagText) && !StringUtils_1.StringUtils.IsBlank(i)) {
          this.GetItem(4).SetUIActive(true);
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t.TagText);
          i = UE.Color.FromHex(t.TagColor);
          this.GetSprite(5).SetColor(i);
        } else {
          this.GetItem(4).SetUIActive(false);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Gacha", 34, "获取抽卡界面信息失败，请检查GachaViewInfo表，GachaId:" + this.GachaId);
      }
    }
  }
  Refresh(t, i, e) {
    this.Data = t;
    this.InitData();
    this.RefreshRedDot();
    if (i) {
      this.OnSelected(false);
    } else {
      this.OnDeselected(false);
    }
  }
  GetKey(t, i) {
    return this.GachaId;
  }
  OnSelected(t) {
    this.SetSelected(true);
  }
  OnDeselected(t) {
    this.SetSelected(false);
  }
}
exports.GachaTagItem = GachaTagItem;
//# sourceMappingURL=GachaTagItem.js.map