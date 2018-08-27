class Monster extends BaseProps {
    constructor(skinName){
        super();
        this.createPropSkin(MonsterSkin,skinName);
        // this.setChildXY(sticketObj);
    }
    protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
    protected childrenCreated():void
	{
		super.childrenCreated();

	}
    public TYPE_NAME = 'monsterProp';
    public JUMP_DISTANCE:number = 200;
    public IS_OVER:boolean = false;
        
    public resertData(){
        this.visible = true;
        this.IS_OVER = false;
    }
    /**
     * 怪兽死亡的运动
     */
    public sticketSelfSkill(){
        let tw = egret.Tween.get(this);
        this.IS_OVER = true;
        tw.to({y:this.stage.$stageHeight+this.height},200,egret.Ease.circIn).call( ()=>{
            this.visible = false;
            
        } )
    }
}