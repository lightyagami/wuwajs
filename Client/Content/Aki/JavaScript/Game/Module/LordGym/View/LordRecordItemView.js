"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadRecordItemView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
const EditFormationDefine_1 = require("../../EditFormation/EditFormationDefine");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
class LoadRecordItemView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
    this.tFe = undefined;
    this.uyi = () => new RoleItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIHorizontalLayout], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UITexture]];
    this.BtnBindInfo = [];
  }
  OnStart() {
    this.tFe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.uyi);
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  Refresh(e, t, i) {
    var r;
    var o;
    var n;
    var a = e.MonsterList[0];
    if (a) {
      r = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterBigIcon(a);
      this.SetTextureByPath(r, this.GetTexture(7));
      r = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterName(a);
      this.GetText(0).SetText(r);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "Text_InstanceDungeonRecommendLevel_Text", e.MonsterLevel.toString());
      a = ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(e.Id);
      r = ModelManager_1.ModelManager.LordGymModel.GetLastGymFinish(e.Id);
      this.GetItem(5).SetUIActive(!a || !r);
      n = (o = ModelManager_1.ModelManager.LordGymModel.LordGymRecord.get(e.Id)) !== undefined;
      this.GetText(2).SetUIActive(n && a);
      this.GetText(4).SetUIActive(!n && a && r);
      this.tFe.SetActive(n);
      if (a && n) {
        this.GetText(2)?.SetText(TimeUtil_1.TimeUtil.GetTimeString(o.Qxs));
        this.tFe.RefreshByData(this.cyi(o));
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneGameplay", 49, "领主挑战缺少对应怪物配置", ["id", e.Id]);
    }
  }
  cyi(t) {
    var i = Array(EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM);
    for (let e = 0; e < EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++) {
      i[e] = t.C5n[e] ?? {
        RoleId: -1,
        Level: 1
      };
    }
    return i;
  }
  GetKey(e, t) {
    return this.GridIndex;
  }
}
exports.LoadRecordItemView = LoadRecordItemView;
class RoleItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.myi = undefined;
  }
  async OnCreateAsync() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("UiItem_ItemBNoneRole");
    var e = await this.LoadPrefabAsync(e, this.RootItem);
    this.myi = e.GetComponentByClass(UE.UIItem.StaticClass());
  }
  OnRefresh(e, t, i) {
    var r;
    var o = e.Q6n;
    if (!o || o < 0) {
      this.ApplyEmptyWithoutAddSmallItemGrid({
        Type: 1
      });
      this.myi?.SetUIActive(true);
    } else {
      this.myi?.SetUIActive(false);
      o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(o);
      r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_InstanceDungeonRecommendLevel_Text");
      r = StringUtils_1.StringUtils.Format(r, e.F6n.toString());
      e = {
        Data: e,
        ElementId: o.ElementId,
        Type: 2,
        ItemConfigId: o.Id,
        BottomText: r,
        QualityId: o.QualityId
      };
      this.Apply(e);
    }
  }
}
//# sourceMappingURL=LordRecordItemView.js.map