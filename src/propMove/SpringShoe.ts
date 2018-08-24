class SpringShoe extends BaseProps {
    constructor(sticketObj){
        super();
        this.createPropSkin(SpringShoeSkin,'springShoeSkin');
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
    public TYPE_NAME = 'springShoeProp';
    public JUMP_DISTANCE:number = 120;

}