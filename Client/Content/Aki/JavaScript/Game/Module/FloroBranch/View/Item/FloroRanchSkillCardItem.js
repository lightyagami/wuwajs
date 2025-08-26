"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchSkillCardItem = undefined;
const UE = require("ue");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class FloroRanchSkillCardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Bmo = undefined;
    this.CanSelect = false;
    this.OnToggleCallBack = undefined;
    this.OnCanExecuteChangeFunc = undefined;
    this.gke = () => {
      this.GetItem(10)?.SetUIActive(false);
      if (this.CanSelect && this.Bmo.IsUnLock) {
        return !this.OnCanExecuteChangeFunc || this.OnCanExecuteChangeFunc(this.Bmo.Id);
      } else {
        return false;
      }
    };
    this.kqe = () => {
      this.GetItem(10)?.SetUIActive(false);
      if (this.OnToggleCallBack) {
        this.OnToggleCallBack(this.Bmo.Id);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIExtendToggle], [10, UE.UIItem]];
    this.BtnBindInfo = [[9, this.kqe]];
  }
  OnStart() {
    var e = this.GetExtendToggle(9);
    e.CanExecuteChange.Bind(this.gke);
    e.bToggleOnSelect = this.CanSelect;
    var e = {
      UiText: this.GetText(5),
      ViewType: 0,
      ReportType: 8,
      Style: 2
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(e);
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(5));
  }
  Refresh(e, t, i) {
    this.Bmo = e;
    this.SetTextureByPath(e.Icon, this.GetTexture(1));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.Desc);
    this.GetText(5).bBestFit = false;
    this.GetSprite(3).useChangeColor = e.IsActiveSkill;
    var r = e.IsActiveSkill ? "FloroRanchActiveSkill" : "FloroRanchPassiveSkill";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), r);
    var r = !e.IsUnLock;
    this.GetItem(6).SetUIActive(r);
    if (r) {
      r = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(e.ConditionId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), r);
    }
    var r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchSkillId);
    this.GetItem(8).SetUIActive(r === e.Id);
    var r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchSkillRedDot) ?? new Set();
    this.GetItem(10)?.SetUIActive(e.IsUnLock && !r.has(e.Id));
  }
  GetKey(e, t) {
    return e.Id;
  }
  SetToggleState(e) {
    e = e ? 1 : 0;
    this.GetExtendToggle(9).SetToggleState(e);
  }
  OnSelected(e) {
    this.SetToggleState(true);
  }
  OnDeselected(e) {
    this.SetToggleState(false);
  }
}
exports.FloroRanchSkillCardItem = FloroRanchSkillCardItem;
//# sourceMappingURL=FloroRanchSkillCardItem.js.map