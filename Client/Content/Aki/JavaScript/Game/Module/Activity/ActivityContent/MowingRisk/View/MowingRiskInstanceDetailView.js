"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingRiskInstanceDetailView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../../Common/Button/ButtonItem");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class MowingRiskInstanceDetailView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.nvt = undefined;
    this.q9a = undefined;
    this.s$a = undefined;
    this.fuo = undefined;
    this.O9a = () => {
      UiManager_1.UiManager.OpenView("InstanceDungeonMonsterPreView", ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId);
    };
    this.mvt = () => new MowingRiskInstanceDetailAttributeGridItem();
    this.qLn = () => {};
    this.GLn = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnClickEnterInstanceSingle);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIVerticalLayout], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIText]];
    this.BtnBindInfo = [[4, this.O9a]];
  }
  async OnBeforeStartAsync() {
    this.nvt = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(5), this.mvt);
    this.q9a = new ButtonItem_1.ButtonItem(this.GetItem(7));
    this.s$a = new ButtonItem_1.ButtonItem(this.GetItem(8));
    this.q9a.SetFunction(this.qLn);
    this.s$a.SetFunction(this.GLn);
    this.s$a.SetLocalTextNew("PrefabTextItem_2770983895_Text");
    var t = new MowingRiskInstanceDetailLockItem();
    await t.CreateByActorAsync(this.GetItem(9).GetOwner());
    this.fuo = t;
    this.GetText(11)?.SetUIActive(false);
  }
  OnStart() {
    this.GetItem(1)?.SetUIActive(false);
    this.GetItem(7)?.SetUIActive(false);
  }
  NFe(t) {
    if (t) {
      this.s$a.SetUiActive(false);
      this.fuo.SetUiActive(true);
      this.fuo.RefreshExternalByData(t);
    } else {
      this.s$a.SetUiActive(true);
      this.fuo.SetUiActive(false);
    }
  }
  async RefreshExternalByDataAsync(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.TitleTextId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.ContentTextId);
    await this.nvt.RefreshByDataAsync(t.AttributeList);
    this.NFe(t.LockData);
  }
  RefreshLockItemExternalByData(t) {
    this.NFe(t);
  }
}
exports.MowingRiskInstanceDetailView = MowingRiskInstanceDetailView;
class MowingRiskInstanceDetailAttributeGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  Refresh(t, e, i) {
    var s = this.GetTexture(0);
    if (t.IconPath) {
      s?.SetUIActive(true);
      this.SetTextureByPath(t.IconPath, s);
    } else {
      s?.SetUIActive(false);
    }
    var s = this.GetText(1);
    if (t.AttributeTextId) {
      s?.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(s, t.AttributeTextId);
    } else {
      s?.SetUIActive(false);
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
}
class MowingRiskInstanceDetailLockItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent]];
  }
  RefreshExternalByData(t) {
    var e = this.GetText(1);
    if (t.LockDescriptionTextId) {
      e?.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, t.LockDescriptionTextId, t.LockDescriptionTextArgs);
    } else {
      e?.SetUIActive(false);
    }
  }
}
//# sourceMappingURL=MowingRiskInstanceDetailView.js.map