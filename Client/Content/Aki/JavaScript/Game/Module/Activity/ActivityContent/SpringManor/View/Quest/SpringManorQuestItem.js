"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorQuestItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
class SpringManorQuestItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.FRe = 0;
    this.ToggleClickCallback = undefined;
    this.OZt = () => {
      this.ToggleClickCallback?.(this.GridIndex, this.FRe);
      this.RefreshRedDot();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OZt]];
  }
  Refresh(t, e, i) {
    this.UpdateItem(t);
  }
  RefreshWithoutData() {
    this.UpdateItem(this.FRe);
  }
  RefreshRedPoint(t) {
    this.GetItem(1)?.SetUIActive(t);
  }
  UpdateItem(t) {
    this.FRe = t;
    this.UpdateTrackIconActive();
    t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.FRe);
    if (t) {
      this.Sno();
      this.yno(t);
      this.lct(t);
      this.Ino(this.FRe);
      this.RefreshRedDot();
    } else {
      this.wke();
    }
  }
  RefreshRedDot() {
    var t;
    var e = this.GetItem(1);
    if (ModelManager_1.ModelManager.SpringManorModel.IsSubQuest(this.FRe)) {
      t = ModelManager_1.ModelManager.SpringManorModel?.ActivityData.HasSubQuestRedDot(this.FRe);
      e?.SetUIActive(t ?? false);
    } else {
      e?.SetUIActive(false);
    }
  }
  wke() {
    var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(this.FRe);
    this.GetSprite(2)?.SetUIActive(true);
    this.GetItem(7)?.SetUIActive(false);
    this.GetText(5)?.ShowTextNew(t.TidName);
    this.GetText(6)?.SetUIActive(false);
  }
  Sno() {
    var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestLockIconPath(this.FRe);
    var e = this.GetSprite(2);
    if (StringUtils_1.StringUtils.IsEmpty(t) || ModelManager_1.ModelManager.SpringManorModel.IsCurrentTrackQuest(this.FRe)) {
      e.SetUIActive(false);
    } else {
      this.SetSpriteByPath(t, e, true);
      e.SetUIActive(true);
    }
  }
  yno(t) {
    this.SetSpriteByPath(ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMark(t.QuestMarkId), this.GetSprite(4), false);
  }
  UpdateTrackIconActive() {
    this.GetSprite(4).SetUIActive(ModelManager_1.ModelManager.SpringManorModel.IsCurrentTrackQuest(this.FRe));
  }
  lct(t) {
    this.GetText(5).SetText(t.Name);
  }
  Ino(t) {
    var e = ModelManager_1.ModelManager.SpringManorModel;
    var i = e.IsSubQuest(t);
    var s = e.IsCurrentTrackQuest(t);
    var r = this.GetText(6);
    if (i && !s) {
      r.SetUIActive(false);
    } else {
      i = e.GetQuestTrackDistanceText(t);
      r.SetUIActive(i !== undefined);
      if (i !== undefined) {
        r.SetText(i);
      }
    }
  }
  OnDeselected(t) {
    this.SetToggleSelect(false, false);
  }
  SetToggleSelect(t, e) {
    this.GetExtendToggle(0)?.SetToggleStateForce(t ? 1 : 0, e);
  }
}
exports.SpringManorQuestItem = SpringManorQuestItem;
//# sourceMappingURL=SpringManorQuestItem.js.map