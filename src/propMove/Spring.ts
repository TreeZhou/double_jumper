class Spring extends BaseProps {
    constructor(sticketObj){
        super();
        this.createPropSkin(SpringSkin,'');
        this.setChildXY(sticketObj);
    }
    protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
    protected childrenCreated():void
	{
		super.childrenCreated();

	}
    public TYPE_NAME = 'springProp';
    public JUMP_DISTANCE:number = 200;
    public resertData(){
        this.visible = true;
        this.mySkinObj.movePesticide.gotoAndStop(1);
    }
    public sticketSelfSkill(){
        let self = this;
        this.mySkinObj.movePesticide.play();
        this.mySkinObj.movePesticide.addEventListener('complete',function(){
            self.visible = false;
		},this)
    }
}