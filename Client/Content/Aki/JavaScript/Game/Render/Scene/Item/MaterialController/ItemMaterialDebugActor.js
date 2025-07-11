"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const ItemMaterialManager_1 = require("./ItemMaterialManager");
class ItemMaterialDebugActor extends UE.KuroEffectActor {
  constructor() {
    super(...arguments);
    this.GlobalNum = 0;
    this.Actor = undefined;
    this.SimpleScalarNameTest = undefined;
    this.SimpleScalarValueTest = 0;
    this.SimpleVectorNameTest = undefined;
    this.SimpleVectorValueTest = undefined;
    this.GlobalMaterialData = undefined;
    this.MaterialData = undefined;
    this.ActorMaterialControllerNum = 0;
    this.GlobalItemMaterialController = undefined;
    this.Controllers = [];
  }
  Constructor() {
    this.GlobalNum = 0;
    this.GlobalItemMaterialController = undefined;
    this.Controllers = [];
  }
  EditorTick(t) {
    ItemMaterialManager_1.ItemMaterialManager.Tick(t * CommonDefine_1.MILLIONSECOND_PER_SECOND);
    this.SimpleMaterialControllerUpdate();
  }
  DisableAllActorData() {
    ItemMaterialManager_1.ItemMaterialManager.DisableAllActorData();
  }
  DisableActorData() {
    ItemMaterialManager_1.ItemMaterialManager.DisableActorData(this.ActorMaterialControllerNum);
  }
  EnableActorData() {
    this.Controllers ||= [];
    if (this.Actor && this.MaterialData) {
      ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(this.Actor, this.MaterialData);
    }
  }
  SimpleMaterialControllerDisable() {
    ItemMaterialManager_1.ItemMaterialManager.DisableSimpleMaterialController(this.ActorMaterialControllerNum);
  }
  SimpleMaterialControllerUpdate() {
    var t;
    var e;
    if (this.Actor && this.SimpleScalarNameTest && this.SimpleScalarValueTest && this.SimpleVectorNameTest && this.SimpleVectorValueTest) {
      t = new Map();
      e = new Map();
      t.set(this.SimpleScalarNameTest, this.SimpleScalarValueTest);
      e.set(this.SimpleVectorNameTest, this.SimpleVectorValueTest);
      ItemMaterialManager_1.ItemMaterialManager.AddSimpleMaterialController(this.Actor, t, e);
    }
  }
}
exports.default = ItemMaterialDebugActor;
//# sourceMappingURL=ItemMaterialDebugActor.js.map