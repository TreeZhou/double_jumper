var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CalculateUI = (function () {
    // public stageW:number;
    // public stageH:number;
    // public objW:number;
    // public objH:number;
    function CalculateUI() {
    }
    // public setInitData(obj:{
    //     stageW:number,
    //     stageH:number,
    //     objW:number,
    //     objH:number
    // }){
    //     this.stageW = obj.stageW;
    //     this.stageH = obj.stageH;
    //     this.objW = obj.objW;
    //     this.objH = obj.objH;
    // }
    CalculateUI.prototype.randomObjX = function (stageWidth, objWidth) {
        var randomX = 0;
        randomX = Math.random() * (stageWidth - objWidth);
        return randomX;
    };
    return CalculateUI;
}());
__reflect(CalculateUI.prototype, "CalculateUI");
//# sourceMappingURL=CalculateUI.js.map