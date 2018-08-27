class Mushroom extends BaseProps {
    constructor(sticketObj){
        super();
        this.createPropSkin(MushroomSkin,'mushroom_down');
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
    public TYPE_NAME = 'mushroomProp';
    public JUMP_DISTANCE:number = 300;
    public sticketSelfSkill(){
        let self = this;
        this.mySkinObj.changeBaseImg('mushroom_up');
        setTimeout(()=>{
            this.mySkinObj.changeBaseImg('mushroom_down');
        },300)
       
    }
    
}