class BaseMovieClip extends eui.Component {
    constructor(){
        super();
        // this.createMoveObj(dataName,dataWH);
    }
    public createChildren() {
        super.createChildren();
    }
    public movePesticide:egret.MovieClip;
    public skinType:string='default';
    public skinList:Object = {
        'default':''
    }
    public createMoveObj(dataName:string,dataWH:{
        width:number,
        height:number
    }){
         let data = RES.getRes(dataName+"_png");
         let textr = RES.getRes(dataName+"_json");
         let mcFactory = new egret.MovieClipDataFactory(textr,data);
         this.movePesticide = new egret.MovieClip(mcFactory.generateMovieClipData(dataName));
         this.addChild(this.movePesticide);
         this.width = dataWH.width;
         this.height = dataWH.height;
        //  return movePesticide;
    }
}