"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleAttrListScrollItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const RoleDefine_1 = require("../RoleDefine");
class RoleAttrListScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, i) {
    super();
    this.SPe = undefined;
    this.Pe = undefined;
    this.pHe = () => {
      return !!ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(this.Pe.Id).Dec;
    };
    this.ToggleEvent = e => {
      e = e === 1;
      this.GetText(8).SetUIActive(e);
      this.GetItem(7).SetUIActive(e);
      e = e ? "Show" : "Hide";
      if (this.SPe) {
        this.SPe.StopCurrentSequence();
        this.SPe.PlayLevelSequenceByName(e);
      }
    };
    this.E9 = i;
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText]];
    this.BtnBindInfo = [[0, this.ToggleEvent]];
  }
  OnStart() {
    var e = this.GetExtendToggle(0);
    e.RootUIComp.SetUIActive(true);
    e.CanExecuteChange.Unbind();
    e.CanExecuteChange.Bind(this.pHe);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetItem(7).SetUIActive(false);
  }
  OnBeforeDestroy() {
    if (this.SPe) {
      this.SPe.Clear();
      this.SPe = undefined;
    }
  }
  ShowTemp(e, i) {
    this.GetSprite(1).useChangeColor = i % 2 == 1;
    i = e;
    this.Pe = i;
    this.SetAttrValue(i);
    e = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(i.Id);
    if (e) {
      this.GetText(3).ShowTextNew(e.Name);
      this.SetTextureByPath(e.Icon, this.GetTexture(2));
      if (e.Dec) {
        this.GetItem(6).SetUIActive(true);
        this.GetText(8).ShowTextNew(e.Dec);
      } else {
        this.GetItem(6).SetUIActive(false);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Role", 37, "属性表中找不到对应的属性ID配置数据");
    }
  }
  SetAttrValue(e) {
    let i = undefined;
    let t = undefined;
    var s;
    var r;
    if (e.Id === RoleDefine_1.HP_ATTR_ID || e.Id === RoleDefine_1.ATTACK_ATTR_ID || e.Id === RoleDefine_1.DEF_ATTR_ID) {
      i = e.BaseValue;
      t = e.AddValue;
    } else {
      i = e.Id === RoleDefine_1.STRENGTH_MAX_ID ? (e.BaseValue + e.AddValue) / 100 : e.BaseValue + e.AddValue;
    }
    if (this.E9 === 1) {
      s = e.BaseValue + e.AddValue;
      t = e.Id === RoleDefine_1.STRENGTH_MAX_ID ? s / 100 : s;
      this.GetText(4).SetText(ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(e.Id, t));
      this.GetText(5).SetUIActive(false);
    } else {
      this.GetText(4).SetText(ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(e.Id, i, e.IsRatio));
      s = this.GetText(5);
      if (t) {
        r = t >= 0 ? "+" : StringUtils_1.EMPTY_STRING;
        s.SetText(r + ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(e.Id, e.AddValue, e.IsRatio));
        s.SetUIActive(true);
      } else {
        s.SetUIActive(false);
      }
    }
  }
}
exports.RoleAttrListScrollItem = RoleAttrListScrollItem;
//# sourceMappingURL=RoleAttrListScrollItem.js.map